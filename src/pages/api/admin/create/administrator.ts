import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../database/connection/dbConnection";
import Admin from "../../../../database/models/adminSchema";
import createToken from "../../../../utils/createToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // Connect database
  await db.connectDB();

  switch (method) {
    case "POST":
      try {
        const newAdmin = await Admin.create(req.body);
        // Give token to client
        const token = createToken(newAdmin._id);
        res.status(201);
        res.setHeader("authorization", token);
        res.json({
          msg: "Account was created successfully",
          _id: newAdmin._id,
          auth_token: token,
        });
        res.end();
      } catch (e) {
        const descriptiveError = formatCustomerSignUpError(e);
        res.status(400);
        res.json({ error: descriptiveError });
        res.end();
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};

// Handles Err with descriptive information.
function formatCustomerSignUpError(e) {
  const error = {
    fullName: "",
    email: "",
    password: "",
  };

  // check for duplicate email signup.
  if (e.code === 11000) {
    error.email = "This email is already registered";
  }

  // Evalute error parameter 'e'
  if (e.message.includes("Admin validation failed")) {
    Object.values(e.errors).forEach(({ properties }: any) => {
      if (properties.path === "email" || properties.path === "password") {
        error[properties.path] = properties.message;
      }
    });
  }

  return error;
}
