import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Customer from "../../../database/models/customerSchema";
import Orders from "../../../database/models/orderSchema";
import FlutterWave from "../../../services/flutterwave/flutterwave.config";
import sendFailedOrderEmail from "../../../utils/mailer/failedOrderEmail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const {
    status,
    transaction_id,
    transactionRef,
    sumTotal,
    customer,
    processingFee,
    orderDetails,
    shippingFee,
  } = req.body;

  if (!status && !transactionRef && !transaction_id) {
    res.status(401).json({ error: "Complete payment first" });
    return;
  }

  if (!sumTotal && !orderDetails && !customer) {
    res.status(401).json({
      error:
        "Failed, incomplete body provide the required fields, 'sumTotal', 'orderDetails', 'customer'.",
    });
    return;
  }

  // ::> Quick verification of payment before creating order.
  const response = await FlutterWave.Transaction.verify({
    id: transaction_id,
  });

  if (response.status !== "success") {
    await sendFailedOrderEmail(customer, transactionRef); // Inform the customer their payment was unsuccessful
    res.end({
      status: "Error",
      message: "Payment failed for this order.",
      error: "Payment failed for this order.",
    });
    return;
  }

  try {
    await Orders.create({ ...req.body, paymentStatus: "SUCCESS" });
    // :: Clear customers cart
    await Customer.findOneAndUpdate({ email: customer.email }, { cart: [] });
    res.status(200).json({
      msg: "Your order was successfully received, and processing has begun.",
    });
  } catch (e) {
    res.status(400);
    res.json({ error: "Something went wrong, couldn't create an order!" });
    console.log("Error creating an Order ::> ", e);
  }
};
