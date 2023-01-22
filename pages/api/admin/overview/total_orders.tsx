import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Orders from "../../../../database/models/orderSchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await db.connectDB();

  switch (method) {
    case "GET":
      const result = await Orders.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
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
