import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/dbUtils/dbConnection";
import logInAdmin from "../../../../utils/adminLoginHelper";
import createToken from "../../../../utils/createToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { email, password } = req.body;

  switch (req.method) {
    case "POST":
      if (!email) {
        res.status(400).json({ error: "Please provide an email address" });
        break;
      }
      if (!password) {
        res.status(400).json({ error: "Enter a password" });
        break;
      }

      const { error, admin } = await logInAdmin(email, password);
      if (error) {
        res.status(401).json({ error });
        res.end();
        break;
      }
      // Give token to client
      if (admin) {
        const token = createToken(admin._id as string);
        res.status(200);
        res.setHeader("authorization", token);
        res.json({ _id: admin._id, auth_token: token });
        res.end();
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
