import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../database/connection/dbConnection";
import Customer from "../../../database/models/customerSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // connect DB
  await db.connectDB();

  //   User id
  const { userId } = req.query;
  const userDetail = await Customer.findById(userId).select(
    "-password, -verification_code",
  );

  // No userDetail found
  if (!userDetail) {
    res.status(404);
    res.json({ msg: "Account does not exits" });
    res.end();
    return;
  }

  res.status(200);
  res.json(userDetail);
  res.end();
};
