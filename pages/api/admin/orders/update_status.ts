import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Authenticate request.
  // const { error, auth_req } = getValidAuthentication(req, res);
  // if (error) return;
  const { method } = req;

  // connect DB
  await db.connectDB();

  const { orderId, status } = req.body;

  switch (method) {
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
        } else if (status === "CANCELED") {
          /* Return funds back to customer wallet for canceled/failed order. */
          orderUpdated = await Orders.findByIdAndUpdate(orderId, {
            orderStatus: status,
          });

          const id = orderUpdated.customer._id;
          const customer = await Customer.findById(id);
          await Customer.findByIdAndUpdate(id, {
            wallet: customer.wallet + orderUpdated.sumTotal,
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
