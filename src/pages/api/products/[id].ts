import { NextApiResponse, NextApiRequest } from "next";
import mongoose, { isValidObjectId } from "mongoose";
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

  // Find with either the `_id` field, `productId` field, or `productNumber` field.
  const productDetails = await Product.findOne({
    $or: [
      ...(isValidObjectId(productId) ? [{ _id: new mongoose.Types.ObjectId(productId as string) }] : []),
      {
        $or: [ // Nested $or for multiple fields
          { productId },
          // { productNumber: productId },
        ]
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
