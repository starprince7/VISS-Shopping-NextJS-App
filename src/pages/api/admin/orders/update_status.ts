import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;

  const { method } = auth_req;
  await db.connectDB();

  const { orderId, status } = req.body;

  if (method === "POST") {
    if (!orderId || !status) {
      res.status(400).json({
        error:
          "Provide a valid order status-type of the following; 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED', 'RETURNED'",
      });
      return;
    }

    await updateOrderStatus(orderId, status, res);
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
};

const updateOrderStatus = async (
  orderId: string,
  status: string,
  res: NextApiResponse,
) => {
  try {
    let orderUpdated;

    switch (status) {
      case "DELIVERED":
        orderUpdated = await Orders.findByIdAndUpdate(
          orderId,
          {
            orderStatus: status,
            isOrderFulfilled: true,
            orderIsFulfilledAt: new Date(),
          },
          { new: true },
        );
        break;

      case "CANCELED":
        orderUpdated = await Orders.findByIdAndUpdate(
          orderId,
          { orderStatus: status },
          { new: true },
        );

        if (!orderUpdated) {
          throw new Error("Order not found");
        }

        const customerId = orderUpdated.customer._id;
        const customer = await Customer.findById(customerId);

        if (!customer) {
          throw new Error("Customer not found for refunding");
        }

        await Customer.findByIdAndUpdate(
          customerId,
          { $inc: { wallet: orderUpdated.sumTotal } },
          { new: true },
        );
        break;

      default:
        orderUpdated = await Orders.findByIdAndUpdate(
          orderId,
          { orderStatus: status },
          { new: true },
        );
        break;
    }

    if (!orderUpdated) {
      throw new Error("Order not found");
    }

    res.status(200).json({
      message: `${status}, order status was updated successfully.`,
      order: orderUpdated,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message || "Order not found",
      error: true,
    });
  }
};
