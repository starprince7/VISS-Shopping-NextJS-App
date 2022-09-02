import bcrypt from "bcrypt";
import Customer, { CustomerType } from "../database/models/customerSchema";

type Login = {
  error: string | null;
  customer: CustomerType
}

async function logIn(email: string, password: string): Promise<Login> {
  const user: CustomerType = await Customer.findOne({ email });

  // check for user, No user found.
  if (!user) {
    return { customer: null, error: "This email address is not registered" }
  } else {
    // Here user found, compare passwords
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) return { error: null, customer: user };
    // Here passwords do not match.
    return { customer: null, error: "You entered an incorrect password" }
  }
}

export default logIn;
