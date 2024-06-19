import jwt from "jsonwebtoken";

export default async function (req, res) {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) {
    res.status(401).json({ session: null });
  } else {
    try {
      const decodedToken = jwt.verify(sessionToken, process.env.TOKEN_SECRET);

      res.status(200).json({ session: decodedToken });
    } catch (error) {
      res.status(403).json({ session: null });
    }
  }
}
