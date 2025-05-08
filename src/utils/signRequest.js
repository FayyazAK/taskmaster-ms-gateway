// utils/signRequest.js
const crypto = require("crypto");
const config = require("../config/env");

const signRequest = (proxyReq, req) => {
  const timestamp = Date.now().toString();

  // Create signature using components of the request
  const signature = crypto
    .createHmac("sha256", config.gateway.signature)
    .update(`${timestamp}${req.originalUrl}`)
    .digest("hex");

  // Add headers to the proxy request
  proxyReq.setHeader("x-api-gateway-timestamp", timestamp);
  proxyReq.setHeader("x-api-gateway-signature", signature);

  // Pass the entire user object as a JSON string in a header
  if (req.user) {
    proxyReq.setHeader("x-user-data", JSON.stringify(req.user));
  }

  // Pass the token if it exists
  if (req.cookies?.token) {
    proxyReq.setHeader("x-auth-token", req.cookies.token);
  }

  return proxyReq;
};

module.exports = {
  signRequest,
};
