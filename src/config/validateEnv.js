// config/validateEnv.js
const Joi = require("joi");

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),

  // SERVER
  PORT: Joi.number().port().default(4000),

  // GATEWAY
  API_GATEWAY_SIGNATURE: Joi.string().default("taskmaster@gateway"),
  SYSTEM_TOKEN: Joi.string().default("taskmaster@system"),

  // SERVICES
  AUTH_SERVICE_URL: Joi.string().uri().default("https://localhost:4001"),
  TODO_SERVICE_URL: Joi.string().uri().default("https://localhost:4002"),
  EMAIL_SERVICE_URL: Joi.string().uri().default("https://localhost:4009"),

  // JWT CONFIG
  JWT_SECRET: Joi.string().required(),

  // SSL CONFIG
  SSL_ENABLED: Joi.boolean().truthy("true").falsy("false").default(false),
  SSL_KEY_PATH: Joi.string().default("ssl/key.pem"),
  SSL_CERT_PATH: Joi.string().default("ssl/cert.pem"),
  SSL_PORT: Joi.number().port().default(443),

  // CORS CONFIG
  CORS_ALLOWED_ORIGINS: Joi.string().default("https://127.0.0.1"),
  CORS_ALLOWED_METHODS: Joi.string().default("GET,POST,PUT,DELETE,OPTIONS"),
  CORS_ALLOWED_HEADERS: Joi.string().default("Content-Type,Authorization"),

  // RATE LIMITING
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15000),
  RATE_LIMIT_MAX: Joi.number().default(100),

  // LOGGING
  LOG_LEVEL: Joi.string()
    .valid("error", "warn", "info", "http", "verbose", "debug", "silly")
    .default("info"),
  LOG_DIR: Joi.string().default("../logs"),
  LOG_DATE_PATTERN: Joi.string().default("YYYY-MM-DD"),
  LOG_MAX_SIZE: Joi.string().default("20m"),
  LOG_MAX_FILES: Joi.string().default("14d"),
  LOG_SERVICE_NAME: Joi.string().default("taskmaster-ms-gateway"),
})
  .unknown() // allow other vars
  .required();

function validateEnv(env = process.env) {
  const { error, value: validated } = envSchema.validate(env, {
    abortEarly: false,
    convert: true,
  });

  if (error) {
    console.error(
      "\n❌ Environment validation error(s):\n" +
        error.details.map((d) => ` • ${d.message}`).join("\n") +
        "\n"
    );
    process.exit(1);
  }

  return validated;
}

module.exports = validateEnv;
