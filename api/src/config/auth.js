const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401).json({ message: "unauthorized access" });
  }

  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: error });
    }

    req.user = user.userId;
    next();
  });
};

module.exports = authenticate;
