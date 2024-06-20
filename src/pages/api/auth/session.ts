import jwt from "jsonwebtoken";

export default async function (req, res) {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) {
    return res.status(401).json({ session: null });
  }

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.TOKEN_SECRET);
    return res.status(200).json({ session: decodedToken });
  } catch (error) {
    return res.status(401).json({ session: null });
  }
}
