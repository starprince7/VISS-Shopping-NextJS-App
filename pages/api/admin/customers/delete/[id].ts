import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../database/dbUtils/dbConnection";
import Customer from "../../../../../database/models/customerSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  //   User id
  const customerId = req.query.id;
  const deletedUser = await Customer.findByIdAndDelete(customerId);

  // No User found
  if (!deletedUser) {
    res.status(404);
    res.json({ error: "User was not found" });
    res.end();
    return;
  }

  res.status(200);
  res.json({ msg: "Deleted successfully", user: deletedUser });
  res.end();
};
