import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// return-Type-Definition
type Validation = {
  error: string | null;
  auth_req: NextApiRequest | null;
};

// function-Type-Definition
type GetValidAuth = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Validation;

// Main Function
const getValidAuthentication: GetValidAuth = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401);
    res.json({ msg: "Unauthorized request" });
    return { error: "Unauthorized request", auth_req: null };
  }

  // Check if token is a valid one
  return jwt.verify(token, process.env.TOKEN_SECRET, (e, token_decoded) => {
    if (e) {
      res.status(401);
      res.json({ error: "Authorization failed" });
      return { error: "Authorization failed", auth_req: null };
    }

    // Successful Authentication!
    return { error: null, auth_req: req };
  });
};

export default getValidAuthentication;
