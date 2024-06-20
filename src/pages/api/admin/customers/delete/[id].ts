import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../database/connection/dbConnection";
import Customer from "../../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  // Connect DB
  await db.connectDB();

  //   User id
  const customerId = req.query.id;

  switch (method) {
    case "DELETE":
      const customerToDeleted = await Customer.findByIdAndDelete(customerId);
      // No User found
      if (!customerToDeleted) {
        res.status(404);
        res.json({ error: "This customer does not exist on records." });
        break;
      }
      res.status(200);
      res.json({
        msg: "Deletion complete, customer was removed successfully.",
        user: customerToDeleted,
      });
      res.end();
      break;
    default:
      res.status(405);
      res.json({ error: "Request failed, method not allowed." });
      break;
  }
};
