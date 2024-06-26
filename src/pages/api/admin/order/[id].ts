/* ***
 * This Route handles both single order `GET` request and `DELETE` request
 * for "/admin/orders/:id"
 */

import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;
  await db.connectDB();

  // Grab Order ID
  const orderNumber = req.query.id as string;

  let orderDetails;
  let deletedOrder;

  switch (method) {
    case "GET":
      orderDetails = await Orders.findOne({ orderNo: orderNumber });
      if (!orderDetails) {
        return res.status(404).json({ msg: "Order was not found" });
      }
      res.status(200).json(orderDetails);
      break;

    case "DELETE":
      deletedOrder = await Orders.findOneAndDelete({ orderNo: orderNumber });
      if (!deletedOrder) {
        return res.status(404).json({ error: "Order was not found" });
      }
      res.status(200).json({
        msg: "Order deleted successfully",
        order: deletedOrder,
      });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
};
