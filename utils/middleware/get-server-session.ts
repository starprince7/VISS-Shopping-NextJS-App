import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";
import { CustomerType } from "../../types";

const TOKEN_SECRET = process.env.TOKEN_SECRET;


type Request = GetServerSidePropsContext["req"];

// function-Type-Definition
type FuncParams = (req: Request) => CustomerType;

// Main Function
const getServerSession: FuncParams = (req) => {
    const token = req.cookies.session_token;
    let session: CustomerType | null

    if (!token) {
        return session = null;
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        return session = decodedToken;
    } catch (e) {
        return session = null;
    }
};

export default getServerSession;
