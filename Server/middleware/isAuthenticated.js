const jwt = require("jsonwebtoken");
const errorFunction = require("../utils/errorFunction");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    errorFunction("Not Authenticated", 401);
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "mysupersecretsecret");
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
  if (!decodedToken) {
    errorFunction("Not Authenticated!", 401);
  } else {
    req.userId = decodedToken.userId;
    next();
  }
};
