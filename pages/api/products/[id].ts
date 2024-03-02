import { NextApiResponse, NextApiRequest } from "next";
import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import Product from "../../../database/models/productSchema";
import db from "../../../database/connection/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // connect DB
  await db.connectDB();

  const productId = req.query.id;

  // Find with either the `_id` field or `productId` field.
  const productDetails = await Product.findOne({
    $or: [
      { productId },
      {
        _id: isValidObjectId(productId)
          ? new mongoose.Types.ObjectId(productId as string)
          : null,
      },
    ],
  });

  // No productDetail found
  if (!productDetails) {
    res.status(404);
    res.json({ msg: "Product was not found" });
    res.end();
    return;
  }

  res.status(200);
  res.json(productDetails);
  res.end();
}
