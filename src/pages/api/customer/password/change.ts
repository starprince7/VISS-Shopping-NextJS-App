import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import Customer from "../../../../database/models/customerSchema";
import db from "../../../../database/connection/dbConnection";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // ::>~Middleware Route Guard.
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return;

  if (auth_req?.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // ::> Req Body
  const { id, oldPassword, newPassword } = auth_req.body;

  // Check if verification-code matches
  let dbPassword;
  try {
    const { password } = await Customer.findById(id);
    dbPassword = password;
  } catch (e) {
    res.status(404);
    res.json({
      error: `Customer with this "_id: ${id}" was not found on record.`,
    });
    return;
  }

  // 1. Check if dbPassword matches
  const passwordMatched = await bcrypt.compare(oldPassword, dbPassword);
  if (!passwordMatched) {
    res.status(404);
    res.json({ error: "Your current Password is incorrect." });
    return;
  }

  // 2. Password length must be 6 characters
  if (newPassword.length < 6) {
    res.status(400);
    res.json({ error: "Password length must be more than 6 characters long" });
    return;
  }

  // 3. Hash dbPassword, before saving to database.
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  // Update new dbPassword
  await Customer.findByIdAndUpdate(
    id,
    {
      password: passwordHash,
    },
    { new: true },
  );

  res.status(200);
  res.json({ msg: "Password was successfully changed" });
};
