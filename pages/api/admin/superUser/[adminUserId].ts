import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import Admin from "../../../../database/models/adminSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { adminUserId } = req.query;

  // connect DB
  await db.connectDB();

  switch (method) {
    case "GET":
      if (!adminUserId) {
        res.status(400);
        res.json({ msg: "Provide a super user ID param." });
        res.end();
        break;
      }
      const adminAccount = await Admin.findById(adminUserId).select(
        "-password -verification_code",
      );

      // No adminAccount found
      if (!adminAccount) {
        res.status(404);
        res.json({ error: "Account does not exits" });
        res.end();
        break;
      }

      res.status(200);
      res.json(adminAccount);
      res.end();
      break;
    default:
      res.status(405);
      res.json({ msg: "Method not allowed" });
      break;
  }
};
