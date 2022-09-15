/* ***
 * This Route Handler handles both `GET` and `DELETE` request for "/admin/orders" 
 */

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Orders from "../../../../database/models/orderSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect DB
  await db.connectDB();

  // Grab Order ID
  const orderId = req.query.id;

  if (req.method === "GET") FetchOrderHandler();
  else if (req.method === "DELETE") deleteOrderHandler();
  else {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // ::> Handle Fetching single Order detail.
  async function FetchOrderHandler() {
    const orderDetails = await Orders.findById(orderId);

    // No orderDetail found
    if (!orderDetails) {
      res.status(404);
      res.json({ msg: "Order was not found" });
      res.end();
      return;
    }

    res.status(200);
    res.json(orderDetails);
    res.end();
  }
  //>

  /* ::> Handle Order Delete Processing. */
  async function deleteOrderHandler() {
    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    // No Order found
    if (!deletedOrder) {
      res.status(404);
      res.json({ error: "Order was not found" });
      res.end();
      return;
    }

    res.status(200);
    res.json({ msg: "Order deleted successfully", order: deletedOrder });
    res.end();
  }
};
