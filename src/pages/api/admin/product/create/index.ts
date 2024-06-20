import getUid from "get-uid";
import { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../../../database/models/productSchema";
import db from "../../../../../database/connection/dbConnection";
import { Product as ProductType } from "../../../../../types";
import ImageService from "../../../../../services/imageService";
import { generateImagePublicId } from "../../../../../utils/getTransactionReference";
import getValidAuthentication from "../../../../../utils/middleware/validateAPIRequest";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  if (method !== "POST") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // Req Body
  const {
    title,
    image,
    brand,
    price,
    category,
    weight,
    description,
    countInStock,
  } = req.body as ProductType;

  // Check image type first
  if (typeof image !== "string") {
    res.status(400);
    res.json({
      error:
        "Image type should be an array buffer or a string of base64encoded characters",
    });
    return;
  }

  const productNumber = Number(getUid()); /* 360423267 */
  const productId = generateImagePublicId();

  // Upload Image to Cloud
  const { secure_url } = await ImageService.uploadImage(image, productId);
  // eslint-disable-next-line no-console
  console.log("Image was uploaded!");

  try {
    const newProduct = await Product.create({
      title,
      image: secure_url,
      brand,
      price,
      category,
      weight,
      description,
      countInStock,
      productId,
      productNumber,
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
  const error = {
    title: "",
    image: "",
    brand: "",
    price: "",
    description: "",
    countInStock: "",
  };

  // Evalute error parameter 'e'
  if (e.message.includes("Product validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
}
