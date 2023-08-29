const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");
const { UnauthorizedError } = require("../errors/unauthorized-error");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    const error = new UnauthorizedError("Authorization Error");
    throw error;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    const error = new UnauthorizedError("Authorization Error");
    throw error;
  }
  return next();
};

module.exports = {
  auth,
};
