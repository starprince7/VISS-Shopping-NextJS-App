import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../database/connection/dbConnection";
import Customer from "../../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../../utils/middleware/validateAPIRequest";
import hashPassword from "../../../../../utils/passwordHashing";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  if (method !== "PUT") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect DB
  await db.connectDB();

  // User ID
  const customerId = req.query.id;

  //   Req Body
  const { name, email, password } = req.body;

  let password_hash;

  // Password hashing
  if (password) {
    // Check password length
    if (password.length < 6) {
      res.status(400);
      res.json({ error: "Password length must be more than 6 characters" });
      return;
    }
    password_hash = await hashPassword(password);
  }

  const data_update = {
    name,
    email,
    password: password_hash,
  };

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    data_update,
    {
      new: true,
    },
  );
  res.status(201);
  res.json({ msg: "Success", customer: updatedCustomer });
  res.end();
};
