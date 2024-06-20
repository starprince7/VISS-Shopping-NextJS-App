import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../database/connection/dbConnection";
import Category from "../../../../../database/models/categorySchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // category ID
  const { categoryId } = req.query;

  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  // No Category found
  if (!deletedCategory) {
    res.status(404);
    res.json({ error: "Category was not found" });
    res.end();
    return;
  }

  res.status(200);
  res.json({ msg: "Category deleted successfully", category: deletedCategory });
  res.end();
}
