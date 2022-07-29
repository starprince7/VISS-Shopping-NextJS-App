import { NextApiResponse, NextApiRequest } from "next";
import Product from "../../../database/models/products";
import db from "../../../database/utils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(400);
    res.json({ msg: "Bad request" });
    return;
  }

  // connect DB
  await db.connectDB();

  const productId = req.query.id;

  const productDetails = await Product.findById(productId);
  res.status(200);
  res.json(productDetails);
  res.end();
}
