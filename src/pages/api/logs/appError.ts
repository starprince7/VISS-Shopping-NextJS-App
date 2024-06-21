import { NextApiRequest, NextApiResponse } from "next";

import sendEmailWithError from "../../../utils/mailer/sendError";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const {
    error = {
      error:
        "This is an error placeholder because there were no error object recieved.",
    },
  } = req.body;

  switch (method) {
    case "POST":
      if (!error) {
        return res.status(400).json({ error: "No query parameter found" });
      }
      const errorToString = JSON.stringify(error);
      await sendEmailWithError("princeagezinweke@gmail.com", errorToString);
      console.log("Error Email Sent!!!");
      res.status(200).end();
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
