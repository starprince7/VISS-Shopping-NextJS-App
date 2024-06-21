import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import createSessionToken from "../../../utils/middleware/createSession";
import Customer from "../../../database/models/customerSchema";
import schemaErrorHandler from "../../../database/db-utils/schema-error";
import db from "../../../database/connection/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await db.connectDB();

  const { method } = req;

  switch (method) {
    case "POST":
      {
        const { email, password, fullName } = req.body;
        const firstname = fullName?.split(" ")[0];
        const lastname = fullName?.split(" ")[1];

        if (!email) {
          res.status(401).json({ message: "Provide an email", error: true });
        }
        if (!password) {
          res.status(401).json({ message: "Provide a password", error: true });
        }

        // here generate a random customer name for every new signup
        const { customerId } = generateRandomIdentity();
        let newCustomerAccount;

        try {
          newCustomerAccount = await Customer.create({
            ...req.body,
            name: {
              firstname,
              lastname,
            },
            customerId,
          });
        } catch (e: any) {
          console.log("The  sign up error:", e.message);
          const handledError = schemaErrorHandler(e);
          res.status(400).json({
            error: true,
            message: "Validation Error",
            validationError: handledError,
          });
        } finally {
          const plainCustomerObj = newCustomerAccount.toObject();
          const token = createSessionToken(plainCustomerObj); // these information are stored in the session token.
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
            customerId: newCustomerAccount?.customerId,
          });
        }
      }
      break;
    default: {
      res.status(409).json({ error: true, message: "Method not allowed!" });
    }
  }
}

const generateRandomIdentity = () => {
  const firstNames = [
    "John",
    "Jane",
    "Alex",
    "Emily",
    "Chris",
    "Katie",
    "Michael",
    "Sarah",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
  ];
  const adjectives = [
    "Clever",
    "Brave",
    "Calm",
    "Witty",
    "Loyal",
    "Honest",
    "Kind",
    "Bold",
  ];
  const numbers = Array.from({ length: 1000 }, (_, i) => i + 1); // Generate numbers from 1 to 1000

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  return {
    customerId: `${randomAdjective}${randomFirstName}${randomNumber}`,
    firstname: `${randomAdjective}${randomFirstName}${randomNumber}`,
    lastname: `${randomLastName}`,
  };
};
