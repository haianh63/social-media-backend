import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(403);
  }
};

export default verifyToken;
