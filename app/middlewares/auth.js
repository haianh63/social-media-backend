import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.sendStatus(403);
  }
};

const verifyUser = (req, res, next) => {
  if (req.userId != req.params.id) {
    return res.sendStatus(403);
  }
  next();
};
export { verifyToken, verifyUser };
