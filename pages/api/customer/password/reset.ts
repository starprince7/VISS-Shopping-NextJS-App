import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Customer from "../../../../database/models/customerSchema";
import db from "../../../../database/dbUtils/dbConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { auth_code, id, password } = req.body;

  //   Check if verification-code matches
  const { verification_code } = await Customer.findById(id);

  // 1.  Can't get verification code
  if (!verification_code) {
    res.status(404);
    res.json({ error: "Account does not exits, cannot reset password" });
  }

  // 2. Auth code does not match
  if (auth_code != verification_code) {
    res.status(401);
    res.json({ error: "Invalid code" });
    return;
  }

  // 3. Password length must be 6 characters
  if (password.length < 6) {
    res.status(400);
    res.json({ error: "Password length must be more than 6 characters long" });
    return;
  }

  // Hash password, before saving to database.
  const salt = await bcrypt.genSalt(10);
  const new_password = await bcrypt.hash(password, salt);

  // Update new password
  await Customer.findByIdAndUpdate(
    id,
    {
        password: new_password,
        verification_code: null
    },
    { new: true }
  );

  res.status(200);
  res.json({ msg: "Successful, password changed" });
};
