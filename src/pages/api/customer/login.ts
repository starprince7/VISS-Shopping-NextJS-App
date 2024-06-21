import { NextApiRequest, NextApiResponse } from "next";

import Customer from "../../../database/models/customerSchema";
import db from "../../../database/connection/dbConnection";
import createToken from "../../../utils/createToken";
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

  switch (req.method) {
    case "POST":
      if (!email) {
        res.status(400).json({ error: "Please provide an email address" });
        break;
      }
      if (!password) {
        res.status(400).json({ error: "Enter a password" });
        break;
      }

      const { error, customer } = await logIn(email, password);
      if (error) {
        res.status(401).json({ error });
        res.end();
        break;
      }
      // Give token to client
      if (customer) {
        const token = createToken(customer._id);
        res.status(200);
        res.setHeader("authorization", token);
        res.json({ customer, auth_token: token });
        res.end();
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
