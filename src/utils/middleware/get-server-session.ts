import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

import { CustomerType } from "../../types";

const { TOKEN_SECRET } = process.env;

type Request = GetServerSidePropsContext["req"];

// function-Type-Definition
type FuncParams = (req: Request) => CustomerType | null;

// Main Function
const getServerSession: FuncParams = (req) => {
  const token = req.cookies.session_token;
  let session: CustomerType | null;

  if (!token) {
    (session = null);
    return session
  }

  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    (session = decodedToken);
    return session
  } catch (e) {
    (session = null);
    return session
  }
};

export default getServerSession;
