import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Authenticate request.
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;

  // connect DB
  await db.connectDB();

  const { orderId, status } = auth_req.body;

  switch (auth_req.method) {
    case "POST":
      if (!orderId) {
        res.status(400).json({
          error: "Provide an order ID.",
        });
        break;
      }
      if (!orderId || !status) {
        res.status(400).json({
          error:
            "Provide a valid order status-type of the following; 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED', 'RETURNED'",
        });
        break;
      }
      let orderUpdated;
      try {
        if (status === "DELIVERED") {
          orderUpdated = await Orders.findByIdAndUpdate(orderId, {
            orderStatus: status,
            isOrderFulfilled: true,
            orderIsFulfilledAt: new Date(),
          });
        } else {
          orderUpdated = await Orders.findByIdAndUpdate(orderId, {
            orderStatus: status,
          });
        }

        if (!orderUpdated) break;
        res.status(200).json({
          message: `${status}, order status was updated successfully.`,
          order: orderUpdated,
        });
      } catch (error) {
        res.status(404).json({
          status: 404,
          error: "Order not found",
          message: "Order not found",
        });
      }
      break;
    default:
      res.status(405);
      res.json({ msg: "Method not allowed" });
      break;
  }
};
