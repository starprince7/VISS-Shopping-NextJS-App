import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Middleware
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return;

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

  // This will return a customer Obj with the Array of shipping info.
  const customer_with_shippingInfo = await Customer.findByIdAndUpdate(
    id,
    {
      $push: { shippingInfo: shipping_information },
    },
    { new: true },
  ).select("shippingInfo");

  // No customer_with_shippingInfo found
  if (!customer_with_shippingInfo) {
    res.status(404);
    res.json({
      error:
        "Failed to add shipping information, this account was not found on record.",
    });
    res.end();
    return;
  }

  res.status(200);
  res.json({
    msg: "Shipping information added successfully.",
    customerShippingInfo: customer_with_shippingInfo,
  });
  res.end();
};
