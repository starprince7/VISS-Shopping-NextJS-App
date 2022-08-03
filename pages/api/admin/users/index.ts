import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // MIDDLEWARE
  const { error, auth_req } = getValidAuthentication(req, res);
  // if validation err
  if (error) return;

  if (auth_req.method !== "GET") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // connect DB
  await db.connectDB();

  // Get all-customers
  const customers = await Customer.find();
  res.status(200);
  res.json(customers);
  res.end();
};
