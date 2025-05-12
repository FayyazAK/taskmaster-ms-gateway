const jwt = require("jsonwebtoken");
const config = require("../config/env");

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = { verifyToken };
