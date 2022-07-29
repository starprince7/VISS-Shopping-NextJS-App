import { NextApiResponse, NextApiRequest } from "next";
import Product from "../../../../database/models/products";
import db from "../../../../database/utils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    res.status(400);
    res.json({ msg: "Bad request" });
    return;
  }

  // Connect DB
  await db.connectDB();

  const productId = req.query.productId;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  // No product found
  if (!deletedProduct) {
    res.status(404);
    res.json({ msg: "Product was not found" });
    res.end();
  }

  res.status(200);
  res.json({ msg: "Delete success", product: deletedProduct });
  res.end();
}
