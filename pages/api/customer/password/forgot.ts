import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import Customer from "../../../../database/models/customerSchema";
import sendEmailVerificationCode from "../../../../utils/mailer/sendVerificationCode";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { email } = req.body;

  const customer = await Customer.findOne({ email });
  //   customer not found
  if (!customer) {
    res.status(404);
    res.json({ msg: "This account does not exits" });
    return;
  }

  /*  
        Here customer account is found
        Generate 4 digit code for authentication
    */
  const generated_code = Number(
    (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
  );

  //  store auth code
  const recovered_acct = await Customer.findByIdAndUpdate(customer._id, {
    verification_code: generated_code,
  });

  //   Send 4 digit code to email
  await sendEmailVerificationCode(recovered_acct.email, generated_code);

  res.status(200);
  res.json({ msg: "Enter the verfication code sent to your email address." });

  // Remove verification code
  setTimeout(async () => {
    await Customer.findByIdAndUpdate(customer._id, {
      verification_code: null,
    });
  }, 30000);
};
