import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/connection/dbConnection";
import Product from "../../../database/models/productSchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await db.connectDB();

  const { query } = req.body;

  switch (method) {
    case "POST":
      if (!query) {
        return res.status(401).json({ error: "No query parameter found" });
      }
      const results = Product.find({ $text: { $search: query } }).sort({
        score: { $meta: "textScore" },
      });
      res.status(200).json({ data: results });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
