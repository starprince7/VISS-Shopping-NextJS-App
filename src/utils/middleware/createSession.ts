import jwt from "jsonwebtoken";

import { CustomerType } from "../../types";

const SECRET = process.env.TOKEN_SECRET;

const createSessionToken = (
  customer: CustomerType,
): ReturnType<typeof jwt.sign> => {
  return jwt.sign(customer, SECRET, { expiresIn: 24 * 60 * 60 });
};

export default createSessionToken;
