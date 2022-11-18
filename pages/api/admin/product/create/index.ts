import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/dbUtils/dbConnection";
import uploadImage from "../../../../../services/cloudinary/imageUploader";
import { Product as ProductType } from "../../../../../types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // Req Body
  const { title, image, brand, price, weight, description, countInStock } =
    req.body as ProductType;

  // Check image type first
  if (typeof image !== "string") {
    res.status(400);
    res.json({
      error:
        "Image type should be an array buffer or a string of base64encoded characters",
    });
    return;
  }
  // Upload Image to Cloud
  const { secure_url } = await uploadImage(image);
  console.log("Image was uploaded!");

  try {
    const newProduct = await Product.create({
      title,
      image: secure_url,
      brand,
      price,
      weight,
      description,
      countInStock,
    });

    res.status(201);
    res.json({ msg: "Success", product: newProduct });
    res.end();
  } catch (e) {
    const descriptiveError = formatCreateProductError(e);
    res.status(400);
    res.json(descriptiveError);
    res.end();
  }
}

// Handles Err with descriptive information.
function formatCreateProductError(e) {
  let error = {
    title: null,
    image: null,
    brand: null,
    price: null,
    description: null,
    countInStock: null,
  };

  // Evalute error parameter 'e'
  if (e.message.includes("Product validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
}
