# 🌐 TaskMaster Gateway Service

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)
![Gateway](https://img.shields.io/badge/API-Gateway-purple.svg)

The TaskMaster Gateway Service is the central entry point for all client requests in the TaskMaster ecosystem, responsible for routing, load balancing, and managing communication between services.

## ✨ Features

### API Gateway

- Request routing to appropriate microservices
- Load balancing across service instances
- Service discovery and health checks
- Request/response transformation
- Protocol translation
- Circuit breaker implementation
- Request/response caching
- Rate limiting and throttling
- Request validation
- Error handling and transformation

### Security

- JWT validation and verification
- API key management
- CORS configuration
- IP whitelisting
- Request sanitization
- SSL/TLS termination
- DDoS protection
- Security headers management

### Monitoring

- Request logging
- Performance metrics
- Error tracking
- Service health monitoring
- Traffic analytics
- Latency monitoring

## 🛠️ Technical Stack

- **Backend**: Node.js, Express.js 5.x
- **Gateway**: Express Gateway
- **Caching**: Redis
- **Monitoring**: Prometheus, Grafana
- **Logging**: Winston with daily rotation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Redis (v6.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/taskmaster-ms-gateway.git
   cd taskmaster-ms-gateway
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file using `.env-example` as template

4. Start the service:
   ```bash
   # Development mode
   npm start
   ```

## 🌐 API Routes

### Authentication Service

- `POST /api/auth/*` - Authentication endpoints
- `GET /api/auth/*` - Authentication endpoints

### Todo Service

- `GET /api/lists/*` - List management
- `POST /api/lists/*` - List management
- `GET /api/tasks/*` - Task management
- `POST /api/tasks/*` - Task management

### Email Service

- `POST /api/email/*` - Email operations

## 🔄 Service Discovery

- Dynamic service registration
- Health check endpoints
- Service status monitoring
- Automatic failover
- Load balancing strategies

## 📊 Monitoring

- Request/response metrics
- Error rates
- Latency tracking
- Service health status
- Traffic patterns
- Resource utilization

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

Made with ❤️ by Fayyaz AK
