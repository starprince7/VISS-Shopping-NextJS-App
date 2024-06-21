/* ***
    Total sales can be gotten from the orders collection with the status of fulfilled.
*/
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;
  await db.connectDB();

  const { month } = req.body;

  switch (method) {
    case "POST":
      if (!month) return res.status(401).json({ error: "No month specified!" });

      const result = await Orders.aggregate([
        {
          $match: {
            isOrderFulfilled: true,
            orderIsFulfilledAt: {
              $gte: new Date(new Date().setUTCMonth(month - 1)),
              $lt: new Date(new Date().setUTCMonth(month)),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalProductSold: { $sum: 1 },
            totalSales: { $sum: "$sumTotal" },
          },
        },
      ]);
      res.status(200).json(result);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
