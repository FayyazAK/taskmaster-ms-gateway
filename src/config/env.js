const path = require("path");
const dotenv = require("dotenv");
const validateEnv = require("./validateEnv");

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || "development"}`
  ),
});

// Validate and sanitize environment variables
const env = validateEnv(process.env);

module.exports = {
  nodeEnv: env.NODE_ENV,

  server: {
    port: env.PORT,
  },

  gateway: {
    signature: env.API_GATEWAY_SIGNATURE,
    systemToken: env.SYSTEM_TOKEN,
    url: env.GATEWAY_URL,
  },

  services: {
    auth: env.AUTH_SERVICE_URL,
    todo: env.TODO_SERVICE_URL,
    email: env.EMAIL_SERVICE_URL,
  },

  cors: {
    allowedOrigins: env.CORS_ALLOWED_ORIGINS.split(","),
    allowedMethods: env.CORS_ALLOWED_METHODS.split(","),
    allowedHeaders: env.CORS_ALLOWED_HEADERS.split(","),
  },

  ssl: {
    enabled: env.SSL_ENABLED,
    keyPath: env.SSL_KEY_PATH,
    certPath: env.SSL_CERT_PATH,
    port: env.SSL_PORT,
  },

  jwt: {
    secret: env.JWT_SECRET,
  },

  log: {
    level: env.LOG_LEVEL,
    dir: env.LOG_DIR,
    datePattern: env.LOG_DATE_PATTERN,
    maxSize: env.LOG_MAX_SIZE,
    maxFiles: env.LOG_MAX_FILES,
    service: env.LOG_SERVICE_NAME,
  },

  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },
};
