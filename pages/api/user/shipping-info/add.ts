import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let auth_req = req;
  /* 
  // Middleware
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return; 
  */

  // checking request type before processing
  if (auth_req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // connect DB
  await db.connectDB();

  const { id, homeAddress, country, state, zipcode, city, phoneNumber } =
    auth_req.body;

  const shipping_information = {
    phoneNumber,
    homeAddress,
    country,
    state,
    zipcode,
    city,
  };

  const customer = await Customer.findByIdAndUpdate(
    id,
    {
      // @ts-ignore
      $push: { shippingInfo: shipping_information },
    },
    { new: true }
  );

  // No customer found
  if (!customer) {
    res.status(404);
    res.json({
      error:
        "Failed to add shipping information, this account was not found on record.",
    });
    res.end();
    return;
  }

  res.status(200);
  res.json({ msg: "Added new shipping detail" });
  res.end();
};
