import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../database/models/products";
import db from "../../../../database/utils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400);
    res.json({ msg: "Bad request" });
    return;
  }

  // Connect DB
  await db.connectDB();

  try{
    const newProduct = await Product.create(req.body);
    res.status(201);
    res.json({ msg: "Success", product: newProduct });
    res.end();
  }
  catch (e) {
    const descriptiveError = formatError(e)
    res.status(400)
    res.json(descriptiveError)
    res.end()
  }
}


// Handles Err with descriptive information.
function formatError(e) {
  let error = {
    title: null,
    image: null,
    brand: null,
    price: null,
    description: null,
    countInStock: null
  }

  // Evalute error parameter 'e'
  if (e.message.includes('Product validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message
    })
  }

  return error
}