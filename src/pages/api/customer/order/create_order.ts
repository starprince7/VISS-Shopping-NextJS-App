import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import Orders from "../../../../database/models/orderSchema";
import FlutterWave from "../../../../services/flutterwave/flutterwave.config";
import sendFailedOrderEmail from "../../../../utils/mailer/failedOrderEmail";

type PaymentProcessor = "flutterwave" | "paystack";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect database
  await db.connectDB();

  const {
    paymentProcessor,
    status,
    transaction_id,
    transactionRef,
    sumTotal,
    customer,
    processingFee,
    orderDetails,
    shippingFee,
  } = req.body;

  switch (req.method) {
    case "POST":
      if (!status && !transactionRef && !transaction_id && !paymentProcessor) {
        res.status(401).json({ error: "Complete payment first" });
        break;
      }
      if (!sumTotal && !orderDetails && !customer) {
        res.status(401).json({
          error:
            "Failed, incomplete body provide the required fields, 'sumTotal', 'orderDetails', 'customer'.",
        });
        break;
      }

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Payment Verification Start Block >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      let flutterwaveResponse;
      if (paymentProcessor.toLowerCase() === "flutterwave") {
        // Quick! verify payment status before creating an order.
        flutterwaveResponse = await FlutterWave.Transaction.verify({
          id: transaction_id,
        });
      }

      let paystackResponse;
      const options = {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      };
      if (paymentProcessor.toLowerCase() === "paystack") {
        try {
          paystackResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${transactionRef}`,
            options,
          );
        } catch (e) {
          console.log("Paystack Error: ", e);
        }
      }

      // @Failed payment status.
      if (
        (flutterwaveResponse && flutterwaveResponse?.status !== "success") ||
        (paystackResponse && !paystackResponse?.data) ||
        !paystackResponse?.data?.status
      ) {
        await sendFailedOrderEmail(customer, transactionRef); // Inform the customer that their payment was unsuccessful.
        res.end({
          status: "Error",
          message:
            "Payment failed for this order, please check your email for more information.",
          error: "Payment failed for this order.",
        });
        break;
      }

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Payment Verification End Block >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      /**
       * ORDER CREATION BLOCK.
       * CREATE ORDER!
       */
      try {
        const createdOrder = await Orders.create({
          ...req.body,
          paymentStatus: "SUCCESS",
          orderStatus: "PENDING",
        });
        // Clear customers cart.
        await Customer.findOneAndUpdate(
          { email: customer.email },
          {
            cart: [],
            $push: {
              orderHistory: createdOrder,
            },
          },
        );
        res.status(200).json({
          msg: "Your order was successfully received, and is being prepared for shipping.",
        });
      } catch (e) {
        await sendFailedOrderEmail(customer, transactionRef); // Inform the customer that their order was unsuccessful.
        res.status(400);
        res.json({
          error:
            "Something went wrong, we couldn't create an order, contact support! ",
        });
        // eslint-disable-next-line no-console
        console.log("Error creating an Order ::> ", e);
      }
      break;

    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
