import { NextApiRequest, NextApiResponse } from "next";
import query from "query-string";

import Product from "../../../database/models/productSchema";
import db from "../../../database/dbUtils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  let { page, limit } = query.parse(req.url?.split("?")[1] as string, {
    parseNumbers: true,
  });

  if (!page) page = 1;
  if (!limit) limit = 10;

  // Connect DB
  await db.connectDB();

  switch (method) {
    case "GET":
      const totalCount = await Product.aggregate([
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);

      const products = await Product.find()
        .sort({ date_created: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec();
      res.status(200);
      res.json({ products, totalCount: totalCount[0].count, page });
      break;
    default:
      res.status(405);
      res.json({
        msg: "Method is rejected, not allowed.",
        error: "Bad request, not allowed.",
      });
      break;
  }
}
