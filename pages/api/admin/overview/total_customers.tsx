import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await db.connectDB();

  switch (method) {
    case "GET":
      const result = await Customer.aggregate([
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({ data: result });
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
