const rateLimit = require("express-rate-limit");
const STATUS = require("../utils/statusCodes");
const config = require("../config/env");
// Rate limiter configuration
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: true,
  handler: (req, res) => {
    return res.error(
      `Too many requests from this IP, please try again after ${Math.ceil(
        res.getHeader("Retry-After") / 60
      )} minutes.`,
      STATUS.TOO_MANY_REQUESTS
    );
  },
});

module.exports = limiter;
