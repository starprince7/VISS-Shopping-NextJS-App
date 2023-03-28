/* ***
 * Verifies if Admin signup URL is valid and authorized by an existing admin.
 */
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import query from "query-string";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { token: t } = query.parse(req.url?.split("?")[1] as string, {
    parseNumbers: false,
  });

  switch (method) {
    case "GET":
      const token = (t as string)?.trim();

      if (!!token) {
        jwt.verify(token, TOKEN_SECRET, (e, token_decoded) => {
          if (e) {
            res.status(403);
            res.json({ error: true, msg: "Verification failed" });
            return;
          }

          // Successfully Verified!
          res.json({ error: false, msg: "OK", verified: true });
        });
      }
      break;
    default:
      res.status(405);
      res.json({ error: true, msg: "Method not allowed" });
      break;
  }
};
