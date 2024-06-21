import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../../database/connection/dbConnection";
import Category from "../../../../../database/models/categorySchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // category ID
  const { categoryId } = req.query;

  const categoryUpdated = await Category.findByIdAndUpdate(
    categoryId,
    req.body,
    {
      new: true,
    },
  );
  res.status(201);
  res.json({
    msg: "Category updated successfully.",
    category: categoryUpdated,
  });
  res.end();
}
