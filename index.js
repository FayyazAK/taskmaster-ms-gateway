const app = require("./src/app");
const config = require("./src/config/env");
const logger = require("./src/utils/logger");
const createServers = require("./src/config/server");
const { checkAllServices } = require("./src/utils/healthCheck");

// Start the server
async function startServer() {
  try {
    logger.info(`Environment: ${config.nodeEnv}`);
    // Check health of all services before starting
    logger.info("Checking health of all services...");
    await checkAllServices();
    logger.info("Proceeding to start the gateway...");

    // Create HTTP and/or HTTPS servers based on configuration
    const servers = createServers(app);

    if (config.ssl.enabled) {
      logger.info(
        `API Gateway running on HTTPS port ${config.ssl.port} and HTTP port ${config.server.port} (redirecting)`
      );
    } else {
      logger.info(`API Gateway running on HTTP port ${config.server.port}`);
    }
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
