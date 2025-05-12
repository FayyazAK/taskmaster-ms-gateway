const axios = require("axios");
const config = require("../config/env");
const logger = require("./logger");

const checkServiceHealth = async (serviceName, serviceUrl) => {
  try {
    const response = await axios.get(`${serviceUrl}/health`, {
      timeout: 5000, // 5 seconds timeout
    });

    if (response.status === 200) {
      logger.info(`✅ ${serviceName} service is healthy at ${serviceUrl}`);
      return serviceUrl;
    }
    logger.error(`❌ ${serviceName} service is unhealthy at ${serviceUrl}`);
    return false;
  } catch (error) {
    logger.error(
      `❌ ${serviceName} service health check failed: ${error.message}`
    );
    return false;
  }
};

const checkAllServices = async () => {
  const services = [
    { name: "Auth", url: config.services.auth },
    { name: "Todo", url: config.services.todo },
    { name: "Email", url: config.services.email },
  ];

  logger.info("Starting health check for all services...");

  const results = await Promise.all(
    services.map(async (service) => {
      const isHealthy = await checkServiceHealth(service.name, service.url);
      return { [service.name]: isHealthy ? "Healthy" : "Unhealthy" };
    })
  );

  const healthStatus = Object.assign({}, ...results);

  const allHealthy = Object.values(healthStatus).every(
    (status) => status === "Healthy"
  );

  if (!allHealthy) {
    logger.warn("One or more services are not healthy.");
  } else {
    logger.info("All services are healthy.");
  }

  return healthStatus;
};

module.exports = {
  checkAllServices,
};
