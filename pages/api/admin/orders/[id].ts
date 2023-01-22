/* ***
 * This Route handles both single order `GET` request and `DELETE` request
 * for "/admin/orders/:id"
 */

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Orders from "../../../../database/models/orderSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await db.connectDB();

  // Grab Order ID
  const orderId = req.query.id;

<<<<<<< HEAD
<<<<<<< HEAD
  let orderDetails, deletedOrder;
  switch (method) {
    case "GET":
      orderDetails = await Orders.findById(orderId);
      if (!orderDetails) {
        return res.status(404).json({ msg: "Order was not found" });
      }
      res.status(200).json(orderDetails);
      break;

    case "DELETE":
      deletedOrder = await Orders.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ msg: "Order was not found" });
      }
      res.status(200).json({
        msg: "Order deleted successfully",
        order: deletedOrder,
      });
      break;

=======
  switch (method) {
    case "GET":
      const orderDetails = await Orders.findById(orderId);
      if (!orderDetails) {
        res.status(404).json({ msg: "Order was not found" });
        break;
      }

      res.status(200).json(orderDetails);
      break;
    case "DELETE":
      const deletedOrder = await Orders.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ msg: "Order was not found" });
      }

=======
  switch (method) {
    case "GET":
      const orderDetails = await Orders.findById(orderId);
      if (!orderDetails) {
        res.status(404).json({ msg: "Order was not found" });
        break;
      }

      res.status(200).json(orderDetails);
      break;
    case "DELETE":
      const deletedOrder = await Orders.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ msg: "Order was not found" });
      }

>>>>>>> 29809952d3835a755e2324214ac44a9897e8e348
      res.status(200).json({
        msg: "Order deleted successfully",
        order: deletedOrder,
      });
      break;
<<<<<<< HEAD
>>>>>>> 29809952d3835a755e2324214ac44a9897e8e348
=======
>>>>>>> 29809952d3835a755e2324214ac44a9897e8e348
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
};
