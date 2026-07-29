# Portfolio Microservices — Deployment Guide

> **Stack**: Spring Boot · React/Vite · MongoDB Atlas · Cloudinary · Kafka (Upstash) · Redis (Upstash) · Render · Vercel

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Required Environment Variables](#required-environment-variables)
3. [Prerequisites](#prerequisites)
4. [Render Deployment Order](#render-deployment-order)
5. [MongoDB Atlas Setup](#mongodb-atlas-setup)
6. [Cloudinary Setup](#cloudinary-setup)
7. [Kafka Setup (Upstash)](#kafka-setup-upstash)
8. [Redis Setup (Upstash)](#redis-setup-upstash)
9. [Vercel Configuration](#vercel-configuration)
10. [Health Check URLs](#health-check-urls)
11. [Common Deployment Issues](#common-deployment-issues)
12. [Post-Deployment Verification Checklist](#post-deployment-verification-checklist)

---

## Architecture Overview

```
Vercel (Frontend)
    │  HTTPS
    ▼
Render (API Gateway)  ◄─── JWT Auth Filter
    │  lb://service-name via Eureka
    ├──► Render (Auth Service)
    ├──► Render (Profile Content Service)
    ├──► Render (Media Service)
    ├──► Render (Notification Service)  ◄─── Kafka Consumer
    └──► Render (Analytics Service)     ◄─── Kafka Consumer
              │
     Eureka Server (Render) — service registry
              │
    ┌─────────┼─────────┐
    │         │         │
MongoDB   Cloudinary  Kafka/Redis
 Atlas              (Upstash)
```

---

## Required Environment Variables

Set these on each Render service. Use `SPRING_PROFILES_ACTIVE=prod` for production.

### All Backend Services (Common)

| Variable | Description | Example |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `prod` |
| `EUREKA_SERVER_URL` | Full Eureka URL with `/eureka` | `https://eureka-xxxx.onrender.com/eureka` |
| `PORT` | Auto-assigned by Render | *(set automatically by Render)* |

### eureka-server

*(No additional env vars beyond Common above)*

### gateway-service

| Variable | Description |
|---|---|
| `JWT_SECRET` | Same secret as auth-service (min 32 chars) |
| `REDIS_HOST` | Upstash Redis hostname |
| `REDIS_PORT` | Upstash Redis port (default: 6379) |
| `REDIS_PASSWORD` | Upstash Redis password |
| `FRONTEND_URL` | Your Vercel URL, e.g. `https://your-portfolio.vercel.app` |
| `FRONTEND_URL_ALT` | Optional additional origin (e.g. custom domain) |

### auth-service

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas URI for `portfolio_auth` DB |
| `JWT_SECRET` | Secret key (min 32 chars hex string) |
| `JWT_ACCESS_TOKEN_EXPIRY_MS` | Default: `900000` (15 min) |
| `JWT_REFRESH_TOKEN_EXPIRY_MS` | Default: `604800000` (7 days) |
| `ADMIN_USERNAME` | Admin username for initial seed |
| `ADMIN_PASSWORD` | Admin password for initial seed |
| `ADMIN_EMAIL` | Admin email for initial seed |

### profile-content-service

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas URI for `portfolio_content` DB |
| `KAFKA_BOOTSTRAP_SERVERS` | Upstash Kafka bootstrap URL |

### media-service

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas URI for `portfolio_media` DB |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### notification-service

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas URI for `portfolio_notifications` DB |
| `KAFKA_BOOTSTRAP_SERVERS` | Upstash Kafka bootstrap URL |
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (e.g. `587`) |
| `SMTP_USERNAME` | Gmail/email address |
| `SMTP_PASSWORD` | Gmail App Password (not your account password!) |
| `SMTP_TO_EMAIL` | Recipient email for contact form submissions |

### analytics-service

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas URI for `portfolio_analytics` DB |
| `KAFKA_BOOTSTRAP_SERVERS` | Upstash Kafka bootstrap URL |

### contact-service (legacy)

| Variable | Description |
|---|---|
| `SMTP_USERNAME` | Gmail/email address |
| `SMTP_PASSWORD` | Gmail App Password |

---

## Prerequisites

Before deploying, ensure you have accounts on:
- [Render](https://render.com) — for all backend services
- [Vercel](https://vercel.com) — for the frontend
- [MongoDB Atlas](https://cloud.mongodb.com) — for databases
- [Cloudinary](https://cloudinary.com) — for media storage
- [Upstash](https://upstash.com) — for Kafka and Redis (free tier available)

---

## Render Deployment Order

> **Critical**: Deploy in this exact order. Each service depends on the previous one being available.

### Step 1 — Deploy Eureka Server

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Set **Root Directory**: `eureka-server`
4. Set **Runtime**: `Docker`
5. Set **Dockerfile Path**: `Dockerfile`
6. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
7. Deploy and wait for health check at `/actuator/health`
8. **Copy the Render URL** (e.g. `https://eureka-xxxx.onrender.com`) — you'll need this for all other services

### Step 2 — Deploy Gateway Service

1. Create a new **Web Service**
2. **Root Directory**: `gateway-service`
3. **Runtime**: `Docker`
4. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `JWT_SECRET` = *(your generated secret)*
   - `REDIS_HOST` = *(Upstash Redis host)*
   - `REDIS_PORT` = *(Upstash Redis port)*
   - `REDIS_PASSWORD` = *(Upstash Redis password)*
   - `FRONTEND_URL` = `https://your-portfolio.vercel.app`
5. Deploy and note the URL (e.g. `https://gateway-xxxx.onrender.com`)

### Step 3 — Deploy Auth Service

1. **Root Directory**: `auth-service`
2. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `MONGO_URI` = *(Atlas URI for `portfolio_auth` DB)*
   - `JWT_SECRET` = *(same secret as gateway)*
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL`

### Step 4 — Deploy Profile Content Service

1. **Root Directory**: `profile-content-service`
2. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `MONGO_URI` = *(Atlas URI for `portfolio_content` DB)*
   - `KAFKA_BOOTSTRAP_SERVERS` = *(Upstash Kafka URL)*

### Step 5 — Deploy Media Service

1. **Root Directory**: `media-service`
2. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `MONGO_URI` = *(Atlas URI for `portfolio_media` DB)*
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Step 6 — Deploy Analytics Service

1. **Root Directory**: `analytics-service`
2. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `MONGO_URI` = *(Atlas URI for `portfolio_analytics` DB)*
   - `KAFKA_BOOTSTRAP_SERVERS` = *(Upstash Kafka URL)*

### Step 7 — Deploy Notification Service

1. **Root Directory**: `notification-service`
2. **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `EUREKA_SERVER_URL` = `https://eureka-xxxx.onrender.com/eureka`
   - `MONGO_URI` = *(Atlas URI for `portfolio_notifications` DB)*
   - `KAFKA_BOOTSTRAP_SERVERS` = *(Upstash Kafka URL)*
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_TO_EMAIL`

---

## MongoDB Atlas Setup

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Go to **Database Access** → Create a database user with `readWrite` role
3. Go to **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — Render IPs change)
4. Get the **connection string** from **Clusters → Connect → Drivers**
5. Create **separate databases** for each service:

| Service | Database Name |
|---|---|
| auth-service | `portfolio_auth` |
| profile-content-service | `portfolio_content` |
| media-service | `portfolio_media` |
| analytics-service | `portfolio_analytics` |
| notification-service | `portfolio_notifications` |

6. Format each MONGO_URI as:
```
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&maxPoolSize=50
```

> **Critical Note on maxPoolSize**: The `maxPoolSize=50` parameter is mandatory for MongoDB Atlas Free Tier (M0). The free tier enforces a strict 500-connection limit across the entire cluster. With 6 microservices running, the Spring Boot default of 100 connections per service would quickly breach the limit and crash the databases.

---

## Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Set these as environment variables on the `media-service` Render deployment

---

## Kafka Setup (Upstash)

> Upstash offers a serverless Kafka service with a free tier, ideal for this architecture.

1. Sign up at [upstash.com](https://upstash.com)
2. Create a **Kafka cluster** (select the region closest to your Render services)
3. Create a **topic** named `portfolio-events` (or whatever your services use)
4. From the cluster details page, copy the **Bootstrap URL** in this format:
   ```
   your-cluster.upstash.io:9092
   ```
5. Set `KAFKA_BOOTSTRAP_SERVERS` to this URL on all Kafka-consuming services:
   - `profile-content-service`
   - `notification-service`
   - `analytics-service`

> **Note**: If Upstash Kafka requires SASL authentication, you may need to add these properties to the Kafka consumer/producer config in your service's `application-prod.yml`. Check Upstash documentation for the exact SASL configuration.

---

## Redis Setup (Upstash)

> Used by `gateway-service` for rate limiting via Spring Cloud Gateway's `RequestRateLimiter`.

1. In Upstash, create a **Redis database**
2. Copy the **Endpoint**, **Port**, and **Password**
3. Set on `gateway-service`:
   - `REDIS_HOST` = Upstash Redis endpoint
   - `REDIS_PORT` = Upstash Redis port
   - `REDIS_PASSWORD` = Upstash Redis password

---

## Vercel Configuration

### Deploy Frontend

1. Import your repository to [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend-service`
3. Set **Framework Preset** to `Vite`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`

### Environment Variables on Vercel

In Vercel Project Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://gateway-xxxx.onrender.com/api` |
| `VITE_CONTACT_API_URL` | `https://gateway-xxxx.onrender.com/api/notifications/contact` |

### Vercel Rewrites (vercel.json)

Create a `vercel.json` at the root of `frontend-service/` to handle SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### CORS — Update Gateway

After deploying to Vercel, set `FRONTEND_URL` on the `gateway-service` Render deployment to your Vercel URL:
```
FRONTEND_URL=https://your-portfolio.vercel.app
```

---

## Health Check URLs

After deployment, verify each service is healthy via its Render URL:

| Service | Health Check URL |
|---|---|
| eureka-server | `https://eureka-xxxx.onrender.com/actuator/health` |
| gateway-service | `https://gateway-xxxx.onrender.com/actuator/health` |
| auth-service | `https://auth-xxxx.onrender.com/actuator/health` |
| profile-content-service | `https://profile-xxxx.onrender.com/actuator/health` |
| media-service | `https://media-xxxx.onrender.com/actuator/health` |
| analytics-service | `https://analytics-xxxx.onrender.com/actuator/health` |
| notification-service | `https://notification-xxxx.onrender.com/actuator/health` |
| Eureka Dashboard | `https://eureka-xxxx.onrender.com` |

---

## Common Deployment Issues

### 1. Services fail to register with Eureka

**Cause**: `EUREKA_SERVER_URL` is wrong or Eureka isn't started yet.
**Fix**: Ensure Eureka is fully deployed and healthy *before* deploying other services. Verify the URL includes `/eureka` at the end.

### 2. Gateway returns 503 for all routes

**Cause**: No services registered in Eureka — Gateway uses `lb://` (load balancer) which requires Eureka.
**Fix**: Check Eureka dashboard to see if services are listed. If not, check `EUREKA_SERVER_URL` env var on each service.

### 3. CORS errors in the browser

**Cause**: `FRONTEND_URL` on gateway-service doesn't match the actual Vercel URL.
**Fix**: Set `FRONTEND_URL` exactly as it appears in the browser address bar (including `https://`, no trailing slash).

### 4. MongoDB connection refused

**Cause**: Atlas IP whitelist is blocking Render's IPs.
**Fix**: In MongoDB Atlas → Network Access, add `0.0.0.0/0` to allow all IPs (Render uses dynamic IPs).

### 5. JWT validation fails across services

**Cause**: `JWT_SECRET` is different between `auth-service` and `gateway-service`.
**Fix**: Ensure the exact same `JWT_SECRET` value is set on both services.

### 6. Kafka consumer not receiving events

**Cause**: Upstash Kafka requires SASL authentication but it's not configured.
**Fix**: Add SASL config to `application-prod.yml` for Kafka services. See Upstash docs for the exact properties.

### 7. Redis connection fails for rate limiting

**Cause**: Upstash Redis requires a password but `REDIS_PASSWORD` is empty.
**Fix**: Set the correct `REDIS_PASSWORD` from your Upstash dashboard.

### 8. Render free tier — services sleep

**Cause**: Render's free tier puts services to sleep after 15 minutes of inactivity.
**Fix**: Upgrade to a paid plan, or add a health check ping service (e.g. UptimeRobot) to keep services alive.

### 9. Contact-service SMTP authentication error

**Cause**: Using your Google account password instead of an App Password.
**Fix**: In your Google account, enable 2FA, then go to Security → App Passwords → generate one specifically for this app. Use that as `SMTP_PASSWORD`.

### 10. Build fails in Render — cannot find JAR

**Cause**: Old single-stage Dockerfiles expected a pre-built JAR in `target/`.
**Fix**: All Dockerfiles are now multi-stage and build the JAR inside Docker. No JAR needs to be committed.

---

## Post-Deployment Verification Checklist

### Infrastructure
- [ ] MongoDB Atlas cluster is running and accessible
- [ ] Upstash Redis is created and credentials are correct
- [ ] Upstash Kafka is created and `portfolio-events` topic exists
- [ ] Cloudinary account is configured

### Backend Services (check in order)
- [ ] `eureka-server` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `eureka-server` dashboard shows at least one registered service
- [ ] `gateway-service` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `auth-service` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `auth-service` → POST `/api/auth/login` with admin credentials returns tokens
- [ ] `profile-content-service` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `profile-content-service` → GET `/api/content/projects` returns data (or empty array)
- [ ] `media-service` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `notification-service` → `/actuator/health` returns `{"status":"UP"}`
- [ ] `analytics-service` → `/actuator/health` returns `{"status":"UP"}`

### Frontend
- [ ] Vercel deployment builds successfully
- [ ] Public portfolio page loads without errors
- [ ] Admin login (`/login`) works with admin credentials
- [ ] Admin dashboard loads after login
- [ ] Content (projects, skills, etc.) is visible on the public page
- [ ] Media upload in admin panel works (Cloudinary integration)
- [ ] Contact form submission sends an email
- [ ] No CORS errors in the browser console

### Security
- [ ] `.env` file is NOT committed to git (verify with `git log --all -- .env`)
- [ ] `JWT_SECRET` is a strong, unique value (not the placeholder)
- [ ] Admin password is changed from the default
- [ ] Cloudinary API secret is not exposed in frontend code
