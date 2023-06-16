const jwt = require("jsonwebtoken");
const SEKRET_KEY = process.env.SEKRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header.authorization;
  console.log(token);

  if (!token) {
    return res.status(403).json({
      error: "Token not provied",
    });
  }

  jwt.verify(token, SEKRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Invalid Token",
      });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  verifyToken,
};
