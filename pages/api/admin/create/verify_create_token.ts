/***
 * Verifies if Admin signup URL is valid and authorized by an existing admin.
 **/
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import query from "query-string";
import getValidAuthentication from "../../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  let { token } = query.parse(req.url?.split("?")[1] as string, {
    parseNumbers: true,
  });

  switch (method) {
    case "GET":
      jwt.verify(token, process.env.TOKEN_SECRET, (e, token_decoded) => {
        if (e) {
          res.status(401);
          res.json({ error: "Verification failed" });
          return;
        }

        // Successfully Verified!
        res.json({ error: false, msg: "OK" });
      });
      break;
    default:
      res.status(405);
      res.json({ error: "Method not allowed" });
      break;
  }
};
