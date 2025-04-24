const app = require("./src/app");
const config = require("./src/config/env");
const logger = require("./src/utils/logger");
const createServers = require("./src/config/server");

// Start the server
async function startServer() {
  try {
    // Create HTTP and/or HTTPS servers based on configuration
    const servers = createServers(app);

    if (config.SSL.enabled) {
      logger.info(
        `API Gateway running on HTTPS port ${config.SSL.port} and HTTP port ${config.PORT} (redirecting)`
      );
    } else {
      logger.info(`API Gateway running on HTTP port ${config.PORT}`);
    }

    logger.info(`Environment: ${config.NODE_ENV}`);
    logger.info(`Services: Auth(${config.SERVICES.AUTH_URL})`);
  } catch (error) {
    logger.error("Failed to start API Gateway:", error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();
