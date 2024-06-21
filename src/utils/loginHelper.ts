import bcrypt from "bcrypt";

import Customer from "../database/models/customerSchema";
import { CustomerType } from "../types";

type Login = {
  error: string | null;
  customer: CustomerType | null;
};

async function logIn(email: string, password: string): Promise<Login> {
  const user: Login["customer"] = await Customer.findOne({ email });

  // check for user, No user found.
  if (!user) {
    return { customer: null, error: "This email address is not registered" };
  }
  // Here user found, compare passwords
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (passwordMatched) {
    // @ts-ignore
    const customer = user.toObject();
    return { error: null, customer };
  }
  // Here passwords do not match.
  return { customer: null, error: "You entered an incorrect password" };
}

export default logIn;
