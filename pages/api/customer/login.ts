import { NextApiRequest, NextApiResponse } from "next";
import Customer from "../../../database/models/customerSchema";
import db from "../../../database/dbUtils/dbConnection";
import createToken from "../../../utils/createToken"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { email, password } = req.body;

  try {
    // @ts-ignore
    const customer = await Customer.logIn(email, password);
    // Give token to client
    const token = createToken(customer._id)
    res.status(200);
    res.setHeader("authorization", token);
    res.json({ customer, auth_token: token });
    res.end();
  }
  catch (e) {
    res.status(401);
    res.json({ error: e.message });
    res.end();
  }
};
