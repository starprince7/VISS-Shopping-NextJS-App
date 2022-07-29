import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../database/models/products";
import db from "../../../../database/utils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(400);
    res.json({ msg: "Bad request" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // product ID
  const productId = req.query.productId;

  // req body Obj
  const {
    title,
    image,
    price,
    brand,
    catregory,
    reviews,
    description,
    countInStock,
  } = req.body;

  const query = {
    title,
    image,
    price,
    brand,
    catregory,
    reviews,
    description,
    countInStock,
  };

  const newProduct = await Product.findByIdAndUpdate(productId, query, {
    new: true,
  });
  res.status(201);
  res.json({ msg: "Success", product: newProduct });
  res.end();
}
