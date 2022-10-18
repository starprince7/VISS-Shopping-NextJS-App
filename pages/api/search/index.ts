import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../database/dbUtils/dbConnection";
import Product from "../../../database/models/productSchema";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405)
        res.json({ error: 'Method not allowed' })
        return
    }

    await db.connectDB()

    const { query } = req.body

    if (!query) {
        res.status(401)
        res.json({error: "No query parameter found"})
        return 
    }

    const results = await Product.find(
        { $text: { $search: query } },
        {score: { $meta: "textScore"} }
    ).sort(
        { score: { $meta: 'textScore'} }
    )
    res.status(200)
    res.json(results)
    return
}