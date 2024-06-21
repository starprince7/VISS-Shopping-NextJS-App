import jwt from "jsonwebtoken";

const max_age = 24 * 60 * 60;
const {TOKEN_SECRET} = process.env;

type VerificationReturnType = { error: any; verified: boolean; decode: any };

const createToken = (id: string) => {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: max_age });
};

export const verifyToken = (token: string): VerificationReturnType => {
  return jwt.verify(token, TOKEN_SECRET, (e, token_decoded) => {
    if (e) {
      return { error: e, verified: false, decode: null };
    }
    return { error: null, verified: true, decode: token_decoded };
  });
};

export default createToken;
