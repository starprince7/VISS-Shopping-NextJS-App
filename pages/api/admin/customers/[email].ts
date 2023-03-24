import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import Customer from "../../../../database/models/customerSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // connect DB
  await db.connectDB();

  //   User id
  const { email } = req.query;

  switch (method) {
    case "GET":
      if (!email) {
        res.status(400).json({
          error:
            "Missing email address, provide a valid customer email address.",
        });
        break;
      }
      const customer = await Customer.findOne({ email }).select(
        "-password, -verification_code",
      );
      // No customer found
      if (!customer) {
        res.status(404);
        res.json({
          error: "No account was found on record.",
        });
        res.end();
        break;
      }
      res.status(200);
      res.json(customer);
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
