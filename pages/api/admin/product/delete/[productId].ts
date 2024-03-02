import { NextApiResponse, NextApiRequest } from "next";
import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/connection/dbConnection";
import ImageService from "../../../../../services/imageService";
import getValidAuthentication from "../../../../../utils/middleware/validateAPIRequest";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  if (method !== "DELETE") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  const { productId } = req.query;
  if (!productId) {
    res.status(400);
    res.json({ error: "Pass a product document ID." });
    return;
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);
  const result = await ImageService.removeUploadedImage(
    deletedProduct.productId,
  );
  console.log("Image removed/deleted from cloud...", result);

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
