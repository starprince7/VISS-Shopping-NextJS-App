import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import Orders from "../../../../database/models/orderSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;
  await db.connectDB();

  switch (method) {
    case "GET":
      const result = await Orders.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(result);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
