# Portfolio Microservices

A production-grade, cloud-deployed portfolio backend built on **Spring Boot 3.3 + Microservices Architecture**, demonstrating enterprise patterns including service discovery, JWT authentication, event-driven design (optional), rate limiting, media management, and graceful degradation.

**Live Demo**: [portfolio.vercel.app](https://portfolio.vercel.app) | **API Gateway**: [gateway.onrender.com](https://gateway.onrender.com)

---

## Architecture

```
Vercel (React/Vite Frontend)
          │ HTTPS
          ▼
Render (API Gateway — Spring Cloud Gateway)
          │ lb:// via Eureka Service Discovery
          ├──► auth-service          (JWT auth, admin seeding)
          ├──► profile-content-service  (projects, skills, experience)
          ├──► media-service          (image uploads via Cloudinary)
          ├──► notification-service   (contact form, email dispatch)
          └──► analytics-service      (visitor tracking)
                    │
          Eureka Server (Render)
                    │
          ┌─────────┼─────────┐
          │         │         │
      MongoDB    Cloudinary  Upstash Redis
       Atlas               (rate limiting)
```

> **Kafka is OPTIONAL.** By default, Kafka is disabled (`app.features.kafka.enabled=false`). The system uses graceful fallback implementations (NoOp analytics, synchronous local contact processing) instead. Kafka can be enabled to demonstrate full event-driven architecture. See [Enabling Kafka](#enabling-kafka) below.

---

## Services

| Service | Port | Responsibility |
|---|---|---|
| `eureka-server` | 8761 | Service registry (Netflix Eureka) |
| `gateway-service` | 8080 | API gateway, JWT filter, rate limiting, CORS |
| `auth-service` | 8081 | JWT issuance, refresh, admin user seeding |
| `profile-content-service` | 8082 | CRUD for projects, skills, experience, education |
| `media-service` | 8083 | Image upload/delete via Cloudinary |
| `notification-service` | 8084 | Contact form, email dispatch via SMTP |
| `analytics-service` | 8085 | Visitor event tracking, statistics |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.3.4 |
| Cloud | Spring Cloud 2023.0.3 (Eureka, Gateway, OpenFeign) |
| Security | Spring Security, JWT (jjwt 0.12) |
| Database | MongoDB Atlas (separate DB per service) |
| Media | Cloudinary |
| Caching / Rate Limiting | Upstash Redis |
| Event Streaming (optional) | Apache Kafka / Upstash Kafka |
| Email | SMTP (Gmail App Password) |
| Frontend | React 18, Vite, TypeScript |
| Deployment (Backend) | Render (Docker) |
| Deployment (Frontend) | Vercel |

---

## Enterprise Patterns Demonstrated

- **Service Discovery** — Netflix Eureka (client-side load balancing via `lb://`)
- **API Gateway** — Spring Cloud Gateway with JWT filter and `RequestRateLimiter`
- **Strategy Pattern** — `AnalyticsEventPublisher` / `ContactEventPublisher` interfaces for pluggable Kafka vs. local fallback
- **Conditional Beans** — `@ConditionalOnProperty` and `@ConditionalOnMissingBean` for zero-cost feature toggling
- **Graceful Degradation** — services continue operating correctly even when optional infrastructure (Kafka) is absent
- **Dependency Inversion** — controllers depend on interfaces, not concrete Kafka implementations
- **JWT Authentication** — stateless auth with access + refresh token flow
- **Multi-stage Docker builds** — lean production images

---

## Prerequisites (Production)

| Service | Provider | Notes |
|---|---|---|
| MongoDB Atlas | [cloud.mongodb.com](https://cloud.mongodb.com) | Free M0 tier — one cluster, separate DBs per service |
| Cloudinary | [cloudinary.com](https://cloudinary.com) | Free tier — for `media-service` |
| Upstash Redis | [upstash.com](https://upstash.com) | Free tier — for `gateway-service` rate limiting |
| SMTP | Gmail + App Password | For `notification-service` email delivery |
| Render | [render.com](https://render.com) | Free tier — all backend services |
| Vercel | [vercel.com](https://vercel.com) | Free tier — React frontend |

---

## Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/Portfolio_microservices.git
cd Portfolio_microservices

# Copy and fill in your environment values
cp .env.example .env

# Start all services with Docker Compose
docker compose up --build
```

The local stack runs at:
- **Frontend**: `http://localhost:6060`
- **API Gateway**: `http://localhost:6061`
- **Eureka Dashboard**: `http://localhost:8761`

---

## Enabling Kafka (Optional)

By default, Kafka is **disabled**. To enable the full event-driven analytics and notification pipeline:

1. Create a Kafka cluster on [Upstash](https://upstash.com).
2. Set the following environment variables on your deployment (Render or `.env`):
   ```env
   APP_FEATURES_KAFKA_ENABLED=true
   KAFKA_BOOTSTRAP_SERVERS=your-cluster.upstash.io:9092
   KAFKA_USERNAME=your-upstash-username
   KAFKA_PASSWORD=your-upstash-password
   ```

When `APP_FEATURES_KAFKA_ENABLED=true`:
- `profile-content-service` publishes page-view events to Kafka.
- `analytics-service` consumes those events and persists them to MongoDB.
- `notification-service` publishes contact submissions to Kafka for async processing.

When `APP_FEATURES_KAFKA_ENABLED=false` (default):
- Analytics events are **logged and discarded** (NoOp — no connection attempts).
- Contact submissions are **processed synchronously** (saved to DB + email sent inline).
- Zero Kafka beans, zero connections, zero retry logs.

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete step-by-step deployment guide including:
- Render deployment order
- All required environment variables per service
- MongoDB Atlas setup with `maxPoolSize` guidance
- Redis and Kafka (optional) setup
- Vercel frontend configuration

---

## Environment Variables Summary

See [.env.example](./.env.example) for all variables with descriptions.

### Required for every backend service
- `SPRING_PROFILES_ACTIVE=prod`
- `EUREKA_SERVER_URL`

### Additional per service
| Service | Extra Variables |
|---|---|
| `gateway-service` | `JWT_SECRET`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `FRONTEND_URL` |
| `auth-service` | `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL` |
| `profile-content-service` | `MONGO_URI` |
| `media-service` | `MONGO_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| `notification-service` | `MONGO_URI`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_TO_EMAIL` |
| `analytics-service` | `MONGO_URI` |
| Any service (if Kafka enabled) | `APP_FEATURES_KAFKA_ENABLED=true`, `KAFKA_BOOTSTRAP_SERVERS`, `KAFKA_USERNAME`, `KAFKA_PASSWORD` |

---

## Production Audit

See [PRODUCTION_AUDIT.md](./PRODUCTION_AUDIT.md) for a detailed explanation of the Kafka graceful degradation architecture.
