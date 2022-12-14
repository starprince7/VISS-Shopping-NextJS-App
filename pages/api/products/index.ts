import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../database/models/productSchema";
import db from "../../../database/dbUtils/dbConnection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(400)
        res.json({ msg: 'Bad request' })
        return
    }

    // Connect DB
    await db.connectDB()
    
    const products = await Product.find()
    res.status(200)
    res.json(products)
    res.end()
}