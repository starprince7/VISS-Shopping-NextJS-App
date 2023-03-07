import { NextApiResponse, NextApiRequest } from "next";
import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/dbUtils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  const { productId } = req.query;
  console.log("It got to backend. : ", productId);
  if (!productId) {
    res.status(400);
    res.json({ error: "Pass a Product number or ID." });
    return;
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  // No product found
  if (!deletedProduct) {
    res.status(404);
    res.json({ error: "Product was not found" });
    res.end();
    return;
  }

  res.status(200);
  res.json({ msg: "Deleted successfully", product: deletedProduct });
  res.end();
}
