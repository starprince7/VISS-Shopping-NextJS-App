import { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../../database/models/productSchema";
import db from "../../../../database/connection/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  const { categoryName } = req.query;

  const products = await Product.find({ category: categoryName });
  res.status(200);
  res.json(products);
  res.end();
}
