import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/dbUtils/dbConnection";
import uploadImage from "../../../../../utils/cloudinary/imageUploader";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // product ID
  const productId = req.query.productId;

  // Req Body
  const {
    title,
    image,
    price,
    brand,
    catregory,
    reviews,
    description,
    countInStock, } = req.body;
  
  // Image link
  let imageLink;

  // Check for Image first, then check Image type.
  if (image) {
    if (typeof image !== 'string') {
      res.status(400)
      res.json({ error: 'Image type should be an ArrayBuffer of base64encoding' })
      return
    }
    // Uplaod Image to cloud
    const { secure_url } = await uploadImage(image);
    imageLink = secure_url
    console.log("Image was uploaded!");
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

  const newProduct = await Product.findByIdAndUpdate(productId, data_update, {
    new: true,
  });
  res.status(201);
  res.json({ msg: "Success", product: newProduct });
  res.end();
}
