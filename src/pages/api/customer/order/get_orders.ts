/* ***
 * This Route handles both single order `GET` request and `DELETE` request
 * for "/admin/orders/:id"
 */

import query from "query-string";
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  await db.connectDB();
  // eslint-disable-next-line
  let { id, page, limit, status } = query.parse(
    req.url?.split("?")[1] as string,
    {
      parseNumbers: true,
    },
  );

  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!status) status = "PENDING";

  switch (method) {
    case "GET":
      // Run a sum func on the orders collection to get a total count.
      const totalCount = await Orders.aggregate([
        { $match: { orderStatus: status, "customer._id": id } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);

      const orders = await Orders.find({
        "customer._id": id,
        orderStatus: status,
      })
        .sort({ orderDate: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec();

      if (!orders) {
        res.status(404).json({ msg: "No order found." });
        break;
      }
      res
        .status(200)
        .json({ orders, totalCount: totalCount[0]?.count || 0, page });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
};
