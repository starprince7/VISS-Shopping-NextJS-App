import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Customer from "../../../database/models/customerSchema";
import Orders from "../../../database/models/orderSchema";
import FlutterWave from "../../../services/flutterwave/flutterwave.config";
import sendFailedOrderEmail from "../../../utils/mailer/failedOrderEmail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { status, tx_ref, transaction_id } = req.query;

  await db.connectDB();

  if (status === "successful") {
    const pendingOrder = await Orders.findOne({ transactionRef: tx_ref });
    const response = await FlutterWave.Transaction.verify({
      id: transaction_id,
    });

    if (
      response.status === "success" &&
      response.data.amount === pendingOrder.sumTotal &&
      response.data.currency === "NGN"
    ) {
      // Success! Confirm the customer's payment
      const confirmedOrder = await Orders.findOneAndUpdate(
        { transactionRef: tx_ref },
        {
          paymentStatus: "SUCCESS",
        },
        { new: true },
      );

      // Find the owner of an order and update the order `History`
      await Customer.findByIdAndUpdate(confirmedOrder.customer._id, {
        $push: { orderHistory: confirmedOrder },
      });
      res.end({ status: "Success", message: "Payment successfully verified" });
    } else {
      await sendFailedOrderEmail(pendingOrder.customer, tx_ref as string); // Inform the customer their payment was unsuccessful.
      res.end({ status: "Error", message: "Payment failed for this order." });
    }
  }
};
