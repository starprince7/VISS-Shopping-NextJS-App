import { NextApiRequest, NextApiResponse } from "next";
import createToken from "../../../../utils/createToken";
import emailAdminCreationLink from "../../../../utils/mailer/adminCreationLink";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;
  const { email } = req.body;

  switch (method) {
    case "GET":
      if (!email) {
        res.status(400).json({ error: "Provide a valid email address." });
        break;
      }

      const token = createToken(email);
      if (token) {
        const SECURE_URL = `https://${process.env.VERCEL_URL}/admin/signup?token=${token}`;
        // email secure url
        await emailAdminCreationLink(email, SECURE_URL);
        res
          .status(200)
          .json({ msg: "An invitation link was sent successfully." });
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
