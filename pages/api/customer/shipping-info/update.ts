import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth_req = req;
  /* 
  // Middleware
  const { error, auth_req } = getValidAuthentication(req, res);
  // if not authenticated request `stop`
  if (error) return; 
  */

  // checking request type before processing
  if (auth_req.method !== "PUT") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // connect DB
  await db.connectDB();

  const {
    id,
    shippingInfo_Id,
    homeAddress,
    country,
    state,
    zipcode,
    city,
    phoneNumber,
  } = auth_req.body;

  const shipping_information = {
    phoneNumber,
    homeAddress,
    country,
    state,
    zipcode,
    city,
  };

  const customer = await Customer.findOneAndUpdate(
    { _id: id, "shippingInfo._id": shippingInfo_Id },
    {
      $set: {
        "shippingInfo.$.phoneNumber": phoneNumber,
        "shippingInfo.$.homeAddress": homeAddress,
        "shippingInfo.$.country": country,
        "shippingInfo.$.state": state,
        "shippingInfo.$.zipcode": zipcode,
        "shippingInfo.$.city": city,
      },
    },
    { new: true },
  ).select("shippingInfo");

  // No customer found
  if (!customer) {
    res.status(404);
    res.json({
      error:
        "Could not update shipping information, this account does not exits",
    });
    res.end();
    return;
  }

  res.status(200);
  res.json({
    msg: "Shipping information updated successfully",
    customerShippingInfo: customer,
  });
  res.end();
};
