import query from "query-string";
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth_req = req;
  /* 
  // Middleware
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return;
 */

  // connect DB
  await db.connectDB();

  const { method } = req;
  let { page, limit } = query.parse(req.url?.split("?")[1] as string, {
    parseNumbers: true,
  });

  if (!page) page = 1;
  if (!limit) limit = 10;

  switch (method) {
    case "GET":
      // Run a sum func on the customers to get a total count.
      const totalCount = await Customer.aggregate([
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);
      // Get all-customers
      const customers = await Customer.find()
        .sort({ date_registered: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec();
      res.status(200);
      res.json({ customers, page, totalCount: totalCount[0].count });
      res.end();
      break;
    default:
      res.status(405);
      res.json({ msg: "Method not allowed" });
      break;
  }
};
