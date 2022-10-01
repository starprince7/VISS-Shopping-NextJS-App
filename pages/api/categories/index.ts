import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Category from "../../../database/models/categorySchema";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(400)
        res.json({ error: 'Method not allowed' })
        return
    }

    // Connect DB
    await db.connectDB()
    
    const categories = await Category.find()
    res.status(200)
    res.json(categories)
    res.end()
}