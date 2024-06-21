import { NextApiRequest, NextApiResponse } from "next";

import Customer from "../../../database/models/customerSchema";
import db from "../../../database/connection/dbConnection";
import createToken from "../../../utils/createToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  try {
    const newCustomer = await Customer.create(req.body);
    // Give token to client
    const token = createToken(newCustomer._id);
    res.status(201);
    res.setHeader("authorization", token);
    res.json({
      msg: "Account created successfully",
      _id: newCustomer._id,
      auth_token: token,
    });
    res.end();
  } catch (e) {
    const descriptiveError = formatCustomerSignUpError(e);
    res.status(400);
    res.json({ error: descriptiveError });
    res.end();
  }
};

// Handles Err with descriptive information.
function formatCustomerSignUpError(e) {
  const error = {
    name: { firstname: "", lastname: "" },
    email: "",
    password: "",
  };

  // check for duplicate email signup.
  if (e.code === 11000) {
    error.email = "This email is already registered";
  }

  // Evalute error parameter 'e'
  if (e.message.includes("Customer validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      if (properties.path === "email" || properties.path === "password") {
        error[properties.path] = properties.message;
      }

      if (properties.path === "name.lastname") {
        error.name.lastname = properties.message;
      }
      if (properties.path === "name.firstname") {
        error.name.firstname = properties.message;
      }
    });
  }

  return error;
}
