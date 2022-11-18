import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
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
