import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import logIn from "../../../utils/loginHelper";
import createSessionToken from "../../../utils/middleware/createSession";
import db from "../../../database/connection/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await db.connectDB();
  const { method } = req;

  switch (method) {
    case "POST":
      {
        const { email, password } = req.body;
        if (!email) {
          res.status(401).json({ message: "Provide an email", error: true });
        }
        if (!password) {
          res.status(401).json({ message: "Provide a password", error: true });
        }

        const { error, customer } = await logIn(email, password);
        console.log("Logged in customer: ", customer);
        const token = createSessionToken(customer!); // these information are stored in the session token.
        const MAX_AGE = 24 * 60 * 60;

        // Set a cookie
        res.setHeader(
          "Set-Cookie",
          serialize("session_token", token, {
            maxAge: MAX_AGE,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
          }),
        );
        res.status(200).json({
          error: false,
          message: `Welcome back, ${customer?.name?.firstname}!`,
        });
      }
      break;
    default: {
      res.status(409).json({ error: true, message: "Method not allowed!" });
    }
  }
}
