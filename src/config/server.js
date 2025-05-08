const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const config = require("./env");
const logger = require("../utils/logger");

function createServers(app) {
  const servers = {};

  if (config.ssl.enabled) {
    try {
      // HTTPS Server
      const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, "..", config.ssl.key)),
        cert: fs.readFileSync(path.join(__dirname, "..", config.ssl.cert)),
      };

      servers.https = https.createServer(httpsOptions, app);
      servers.https.listen(config.ssl.port);
      logger.info(`HTTPS server running on port ${config.ssl.port}`);

      // HTTP Server (for redirecting to HTTPS)
      servers.http = http.createServer((req, res) => {
        const httpsUrl = `https://${req.headers.host.split(":")[0]}:${
          config.ssl.port
        }${req.url}`;
        res.writeHead(301, { Location: httpsUrl });
        res.end();
      });
      servers.http.listen(config.server.port);
      logger.info(
        `HTTP server running on port ${config.server.port} (redirecting to HTTPS)`
      );
    } catch (error) {
      logger.error(`Failed to start HTTPS server: ${error.message}`);
      logger.warn("Falling back to HTTP server only");
      servers.http = app.listen(config.server.port);
      logger.info(`HTTP server running on port ${config.server.port}`);
    }
  } else {
    // HTTP Server only
    servers.http = app.listen(config.server.port);
    logger.info(`HTTP server running on port ${config.server.port}`);
  }

  return servers;
}

module.exports = createServers;
