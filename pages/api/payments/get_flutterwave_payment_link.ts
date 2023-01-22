import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import generateTransactionReference from "../../../utils/getTransactionReference";
import Orders from "../../../database/models/orderSchema";
import db from "../../../database/dbUtils/dbConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { sumTotal, customer, processingFee, orderDetails, shippingFee } =
    req.body;

  if (!sumTotal || !customer || !processingFee || !orderDetails)
    return res.status(400).json({ error: "Incomplete request parameters" });

  const transactionRef = generateTransactionReference();

  const transactionDetails = {
    tx_ref: transactionRef,
    amount: sumTotal,
    currency: "NGN",
    redirect_url:
      process.env.VERCEL_ENV !== "production" ||
      process.env.NODE_ENV !== "production"
        ? "https://webhook.site/f8d06e4e-5591-4d1d-bff1-d1ec081f2381"
        : `https://${process.env.VERCEL_URL}/api/payments/verify_flutterwave_payment`,
    customer: {
      email: customer.email,
      phonenumber: customer.shippingInfo.phoneNumber,
      name: customer.fullName,
    },
    customizations: {
      title: "VISS STORE",
      logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    },
    subaccounts: [
      {
        id: "RS_6BEEF3F40BAD1BE9357898421A4BA536",
        transaction_charge_type: "flat",
        transaction_charge: processingFee,
      },
    ],
  };

  await db.connectDB();

  // ==> Create New Order;
  try {
    await Orders.create({ ...req.body, transactionRef });
  } catch (e) {
    res.status(400);
    res.json({ error: "Something went wrong, couldn't create an order!" });
    // console.log("Error creating an Order ::> ", e);
  }

  const createdPayment = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    transactionDetails,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_TEST_SECRET_KEY}`,
      },
    },
  );

  if (createdPayment.data.status === "success")
    res.status(200).json(createdPayment.data);
  else res.status(400).json(createdPayment.data);
};
