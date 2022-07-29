import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../database/models/products";
import db from "../../../../database/utils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400);
    res.json({ msg: "Bad request" });
    return;
  }

  // Connect DB
  await db.connectDB();

  const newProduct = await Product.create(req.body);
  res.status(201);
  res.json({ msg: "Success", product: newProduct });
  res.end();
}
