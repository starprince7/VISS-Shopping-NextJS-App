import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/connection/dbConnection";
import ImageService from "../../../../../services/imageService";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // product ID
  const { id } = req.query;

  // Req Body
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

  // Image link
  let imageLink;

  // Check for Image first, then check Image type.
  if (image) {
    if (typeof image !== "string") {
      res.status(400);
      res.json({
        error: "Image type should be an ArrayBuffer of base64encoding",
      });
      return;
    }

    const product = await Product.findById(id);
    // Uplaod Image to cloud
    const { secure_url } = await ImageService.uploadImage(
      image,
      product.productId,
    );
    imageLink = secure_url;
  }

  const data_update = {
    title,
    image: imageLink,
    price,
    brand,
    catregory,
    reviews,
    description,
    countInStock,
  };

  const newProduct = await Product.findByIdAndUpdate(id, data_update, {
    new: true,
  });
  res.status(201);
  res.json({ msg: "Success", product: newProduct });
  res.end();
}
