import { NextApiRequest, NextApiResponse } from "next";
import Customer from "../../../database/models/customerSchema";
import db from "../../../database/dbUtils/dbConnection";
import createToken from "../../../utils/createToken";
import logIn from "../../../utils/loginHelper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  // Req Body
  const { email, password, cart } = req.body;

<<<<<<< HEAD
<<<<<<< HEAD
  // Validate request body parameters.
  if (!email)
    return res.status(400).json({ error: "Please provide your email address" });
  if (!password) return res.status(400).json({ error: "Enter your password" });

  // lOG USER IN.
  const { error, customer } = await logIn(email, password);

  // Check for login err
  if (error) {
    res.status(401);
    res.json({ error });
    res.end();
    return;
  }

  if (customer) await Customer.findByIdAndUpdate(customer._id, { cart });

  // Give token to client
  const token = createToken(customer._id);
  res.status(200);
  res.setHeader("authorization", token);
  res.json({ customer, auth_token: token });
  res.end();
=======
  switch (req.method) {
    case "POST":
      if (!email) {
        res.status(400).json({ error: "Please provide your email address" });
        break;
      }
      if (!password) {
        res.status(400).json({ error: "Enter your password" });
        break;
      }

      const { error, customer } = await logIn(email, password);
      if (error) {
        res.status(401).json({ error });
        res.end();
        break;
      }
      // Give token to client
      if (customer) {
        const token = createToken(customer._id);
        res.status(200);
        res.setHeader("authorization", token);
        res.json({ customer, auth_token: token });
        res.end();
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
>>>>>>> 29809952d3835a755e2324214ac44a9897e8e348
=======
  switch (req.method) {
    case "POST":
      if (!email) {
        res.status(400).json({ error: "Please provide your email address" });
        break;
      }
      if (!password) {
        res.status(400).json({ error: "Enter your password" });
        break;
      }

      const { error, customer } = await logIn(email, password);
      if (error) {
        res.status(401).json({ error });
        res.end();
        break;
      }
      // Give token to client
      if (customer) {
        const token = createToken(customer._id);
        res.status(200);
        res.setHeader("authorization", token);
        res.json({ customer, auth_token: token });
        res.end();
      }
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
>>>>>>> 29809952d3835a755e2324214ac44a9897e8e348
};
