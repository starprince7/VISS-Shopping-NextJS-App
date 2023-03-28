import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import Admin from "../../../../database/models/adminSchema";
import createToken from "../../../../utils/createToken";
import sendAdminSignupLinkOverEmail from "../../../../utils/mailer/adminCreationLinkMailer";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;
  const { email, adminId } = req.body;

  await db.connectDB();

  switch (method) {
    case "POST":
      if (!adminId) {
        res.status(400).json({ error: "Provide an 'adminId' field." });
        break;
      }
      if (!email) {
        res.status(400).json({ error: "Provide a valid email address." });
        break;
      }

      const adminProfile = await Admin.findById(adminId);
      if (!adminProfile) {
        res.status(403).json({ error: "You are not an administrator." });
        break;
      }

      if (!adminProfile.isSuperAdmin) {
        res
          .status(403)
          .json({ error: "Action failed, you are not a super admin!" });
        break;
      }

      const token = createToken(email);
      console.log("Token Created : ", token);
      if (token) {
        const SECURE_URL = `https://${process.env.VERCEL_URL}/admin/signup/${token}`;
        // email secure url
        await sendAdminSignupLinkOverEmail(email, SECURE_URL);
        res
          .status(200)
          .json({ msg: "A sign up invitation was sent successfully." });
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
