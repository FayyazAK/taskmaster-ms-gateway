const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const config = require("./config/env");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const responseHandler = require("./middleware/responseHandler");
const routes = require("./routes");
const rateLimiter = require("./middleware/rateLimiter");
const { checkAllServices } = require("./utils/healthCheck");

const app = express();

// SSL Redirect Middleware
if (config.ssl.enabled) {
  app.use((req, res, next) => {
    if (!req.secure) {
      const httpsUrl = `https://${req.headers.host.split(":")[0]}:${
        config.ssl.port
      }${req.url}`;
      logger.info(`Redirecting to HTTPS: ${httpsUrl}`);
      return res.redirect(301, httpsUrl);
    }
    next();
  });
}

app.set("trust proxy", 1);

// Middleware
app.use(cors(config.cors));
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom response handler
app.use(responseHandler);

// Rate limiter
app.use(rateLimiter);

// API Routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", async (req, res) => {
  const healthStatus = await checkAllServices();
  return res.success(healthStatus, "API Gateway is running", 200);
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.url}`);
  return res.error("Not Found - The requested resource does not exist", 404);
});

// Error handler
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  errorHandler(err, req, res, next);
});

module.exports = app;
