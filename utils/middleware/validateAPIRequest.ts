import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// return-Type-Definition
type Validation = {
  error: string | null;
  auth_req: NextApiRequest;
};

// function-Type-Definition
type GetValidAuth = (req: NextApiRequest, res: NextApiResponse) => Validation;

// Main Function
const getValidAuthentication: GetValidAuth = (req, res) => {
  const token = req.headers.authorization?.includes("Bearer")
    ? req.headers.authorization?.split(" ")[1]
    : req.headers.authorization;
  console.log("The Token secret : ", TOKEN_SECRET);
  console.log("The Token Value : ", token);

  if (!token) {
    res.status(401);
    res.json({ error: "Unauthenticated request" });
    return { error: "Unauthenticated request", auth_req: null };
  }

  // Check if token is a valid one
  return jwt.verify(token, TOKEN_SECRET, (e, token_decoded) => {
    if (e) {
      res.status(401);
      res.json({ error: "Authentication failed" });
      return { error: "Authentication failed", auth_req: null };
    }

    // Successful Authentication!
    return { error: null, auth_req: req };
  });
};

export default getValidAuthentication;
