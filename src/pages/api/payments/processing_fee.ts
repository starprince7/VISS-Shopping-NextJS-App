import { NextApiRequest, NextApiResponse } from "next";
import getValidAuthentication from "../../../utils/middleware/validateAPIRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, auth_req } = getValidAuthentication(req, res);
  if (error) return;
  const { method } = auth_req;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body;
  const processingPercent = "5%";
  const percent = 5 / 100;

  if (amount) {
    const processingFee = percent * amount;
    processingFee > 10000
      ? res.status(200).json({ processingFee: 9000, processingPercent })
      : res.status(200).json({ processingFee, processingPercent });
  } else res.end();
};
