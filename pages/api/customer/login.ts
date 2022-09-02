import { NextApiRequest, NextApiResponse } from "next";
import Customer from "../../../database/models/customerSchema";
import db from "../../../database/dbUtils/dbConnection";
import createToken from "../../../utils/createToken"
import logIn from "../../../utils/loginHelper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { email, password } = req.body;

  // Validate request body parameters.
  if(!email) return res.status(400).json({ error: "Please provide your email address" })
  if(!password) return res.status(400).json({ error: "Enter your password" })

  // lOG USER IN.
  const { error, customer } = await logIn(email, password);

  // Check for login err
  if (error) {
    res.status(401);
    res.json({ error });
    res.end();
    return
  }

  // Give token to client
  const token = createToken(customer._id)
  res.status(200);
  res.setHeader("authorization", token);
  res.json({ customer, auth_token: token });
  res.end();
};
