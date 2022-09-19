import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Customer from "../../../../database/models/customerSchema";
import db from "../../../../database/dbUtils/dbConnection";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // ::>~Middleware Route Guard.
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return;

  if (auth_req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // ::> Req Body
  const { id, oldPassword, newPassword } = auth_req.body;

  // Check if verification-code matches
  const { password } = await Customer.findById(id);

  // 1. Check if password matches
  const passwordMatched = await bcrypt.compare(oldPassword, password);
  if (!passwordMatched) {
    res.status(404);
    res.json({ error: "Your current password is incorrect." });
    return;
  }

  // 2. Password length must be 6 characters
  if (newPassword.length < 6) {
    res.status(400);
    res.json({ error: "Password length must be more than 6 characters long" });
    return;
  }

  // 3. Hash password, before saving to database.
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  // Update new password
  await Customer.findByIdAndUpdate(
    id,
    {
      password: passwordHash,
    },
    { new: true }
  );

  res.status(200);
  res.json({ msg: "Password was successfully changed" });
};
