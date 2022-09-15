import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Orders from "../../../database/models/orderSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { paidAmount, orderDetails, customerDetails } = req.body;

  if (!paidAmount && !orderDetails && !customerDetails) {
    res.status(401).json({ error: "Incomplete request-body parameter" });
    return;
  }

  try {
    await Orders.create(req.body);
    res.status(200).json({
      msg: "Your order was successfully received, and processing has begun.",
    });
  } catch (e) {
    res.status(400);
    res.json({ error: "Something went wrong, couldn't create an order!" });
    console.log("Error creating an Order ::> ", e);
  }
};
