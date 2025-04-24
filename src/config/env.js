require("dotenv").config();

module.exports = {
  // NODE ENV
  NODE_ENV: process.env.NODE_ENV || "development",

  // GATEWAY CONFIG
  API_GATEWAY_SIGNATURE:
    process.env.API_GATEWAY_SIGNATURE || "taskmaster@gateway",

  // SERVER CONFIG
  PORT: process.env.PORT || 4000,

  // SERVICE ENDPOINTS
  SERVICES: {
    AUTH_URL: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
  },

  // JWT CONFIG
  JWT_SECRET: process.env.JWT_SECRET || "auth-service-secret-key",

  // CORS CONFIG
  CORS: {
    origin: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(",")
      : ["http://localhost:3000"],
    methods: process.env.CORS_ALLOWED_METHODS
      ? process.env.CORS_ALLOWED_METHODS.split(",")
      : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS
      ? process.env.CORS_ALLOWED_HEADERS.split(",")
      : ["Content-Type", "Authorization"],
    credentials: true,
  },

  // SSL CONFIG
  SSL: {
    enabled: process.env.SSL_ENABLED === "true",
    key: process.env.SSL_KEY_PATH || "ssl/key.pem",
    cert: process.env.SSL_CERT_PATH || "ssl/cert.pem",
    port: process.env.SSL_PORT || 4443,
  },

  // RATE LIMITING
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
    MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100, // 100 requests per minute
  },

  // LOGGING
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
