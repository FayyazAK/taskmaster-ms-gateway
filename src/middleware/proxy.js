const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");
const logger = require("../utils/logger");
const STATUS = require("../utils/statusCodes");
const { signRequest } = require("../utils/signRequest");

const createServiceProxy = (
  serviceName,
  serviceUrl,
  preserveHostHeader = false
) => {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^/api/${serviceName}`]: `/api/${serviceName}`, // Rewrite path
    },
    logLevel: "silent",
    onProxyReq: (proxyReq, req, res) => {
      // Log the proxy request
      logger.info(
        `Proxying ${req.method} ${
          req.originalUrl
        } to ${serviceUrl}${req.url.replace(
          `/api/${serviceName}`,
          `/api/${serviceName}`
        )}`
      );
      // Sign the request
      proxyReq = signRequest(proxyReq, req);

      // If the request has a body, we need to rewrite the body
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      logger.debug(
        `Response from ${serviceName} service: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      logger.error(`Proxy error for ${serviceName} service:`, err);

      // Handle proxy errors
      if (err.code === "ECONNREFUSED") {
        res.error(
          `${serviceName} service is currently unavailable. Please try again later.`,
          STATUS.SERVICE_UNAVAILABLE
        );
      } else {
        res.error(
          `Error connecting to ${serviceName} service.`,
          STATUS.INTERNAL_SERVER_ERROR
        );
      }
    },
    // Preserve the host header if needed
    preserveHostHeader,
  });
};

// Create proxies for each service
const authServiceProxy = createServiceProxy("auth", config.SERVICES.AUTH_URL);
const todoServiceProxy = createServiceProxy("todo", config.SERVICES.TODO_URL);

module.exports = {
  authServiceProxy,
  todoServiceProxy,
};
