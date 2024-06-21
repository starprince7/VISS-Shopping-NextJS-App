import { NextApiRequest, NextApiResponse } from "next";

import Orders, {
  OrderStatus,
  PaymentStatus,
} from "../../../database/models/orderSchema";

export default async function CreateOrder(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { transactionId, transactionReference } = req.body;
  /**
   * Handles:
   * 1.
   * 2. Creating of order. (This is how we can tell a number of downloads of a particular Beat.)
   */

  try {
    const order = await Orders.create({
      ...req.body,
      paymentStatus: PaymentStatus.PENDING,
      orderStatus: OrderStatus.PENDING,
    });
    return res.send({ error: false, message: "Order created", order });
  } catch (e: any) {
    console.log("Error creating order:", e);
    res
      .status(500)
      .send({ error: true, message: e.message || "Something went wrong" });
  }
}
