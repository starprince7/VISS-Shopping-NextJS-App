import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Customer from "../../../database/models/customerSchema";
import Orders from "../../../database/models/orderSchema";
import Product from "../../../database/models/productSchema";
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

    /* Only when the response of payment verification succeeds, should an order payment-status be confirmed within the system. */
    if (
      response.status === "success" &&
      response.data.amount === pendingOrder.sumTotal &&
      response.data.currency === "NGN"
    ) {
      /* Update customer's payment status */
      const verifiedOrder = await Orders.findOneAndUpdate(
        { transactionRef: tx_ref },
        {
          paymentStatus: "SUCCESS",
        },
        { new: true },
      );

      // Find the owner of an order and update the order `History`
      await Customer.findByIdAndUpdate(verifiedOrder.customer._id, {
        $push: { orderHistory: verifiedOrder },
      });

      /* ***
       * 1. Find the products items in the orders.
       * 2. Search the products collection for those product items.
       * 3. Reduce their stock count!
       */
      const cartItemIds = verifiedOrder.orderDetails.map((order) => order._id);

      for (const itemId of cartItemIds) {
        const product = await Product.findById(itemId);
        if (product.countInStock > 0) {
          product.countInStock -= 1;
          await product.save();
        }
      }

      res.end({ status: "Success", message: "Payment successfully verified" });
    } else {
      await sendFailedOrderEmail(pendingOrder.customer, tx_ref as string); // Inform the customer their payment was unsuccessful.
      res.end({ status: "Error", message: "Payment failed for this order." });
    }
  }
};
