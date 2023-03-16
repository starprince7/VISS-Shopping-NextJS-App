/***
 * @Desc Get list of orders that are not yet delivered.
 * Returns an order list with status of not delivered.
 */
import query from "query-string";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Orders, { OrderStatus } from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth_req = req;
  /* 
  // Middleware
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`s
  if (error) return;
 */

  // connect DB
  await db.connectDB();

  const { method } = req;

  let { page, limit, status } = query.parse(req.url?.split("?")[1] as string, {
    parseNumbers: true,
  });

  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!status) status = OrderStatus.PENDING;

  switch (method) {
    case "GET":
      // Run a sum func on the orders collection to get a total count.
      const totalCount = await Orders.aggregate([
        { $match: { orderStatus: status } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);

      // Get all-Orders
      const orders = await Orders.find({ orderStatus: status })
        .sort({ orderDate: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec();
      res.status(200);
      res.json({ orders, page, totalCount: totalCount[0]?.count || 0 });
      res.end();
      break;
    default:
      res.status(405);
      res.json({ msg: "Method not allowed" });
      break;
  }
};
