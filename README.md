# Orders & Products SPA

## Overview

Full-stack SPA for managing orders and products, built with **Next.js (SSR)** and **NestJS**.

The project demonstrates:

* scalable frontend architecture
* secure authentication flow (JWT + refresh tokens)
* real-time updates via WebSocket
* SSR + client state synchronization

---

## Features

### Orders

* orders list with totals (multi-currency)
* open/close order details panel
* create & delete orders
* real-time calculated totals

### Products

* full products list
* filtering by type
* create & delete products
* guarantee period display

### Authentication & Security (Advanced Flow)

* **Dual Token Strategy**: Separate secrets for Access (short-lived) and Refresh (long-lived) tokens.
* **Refresh Token Rotation**: Each refresh cycle invalidates the old token and issues a new one, preventing replay attacks.
* **Database-backed Sessions**: Refresh tokens are stored in PostgreSQL with a session limit (max 5 active devices per user).
* **Hybrid Validation**:
    * **Middleware (SSR)**: Token verification on the edge for instant redirects.
    * **Client Interceptor**: Recursive `apiClient` logic to handle 401 errors seamlessly.
* **Security**: Tokens are stored in `HttpOnly` cookies with `SameSite=Lax`. `Secure` cookies are used in HTTPS environments.

### Real-time

* active sessions counter (WebSocket)
* each tab = separate session

### UX Enhancements

* i18n (EN / RU / UA)
* dark / light theme (persisted)
* lazy-loaded modals
* animations between routes
* toast notification system (queue, animations, pause on hover)
* user avatar upload with persistent storage

---

## Responsive Support

The application is optimized for desktop usage.
Mobile responsiveness was not a primary requirement for this test task, so the UI is focused on desktop and tablet layouts where order and product management workflows are easier to use.
Core functionality remains available, but the best experience is expected on desktop screens.

---

## Architecture Highlights

* **Next.js App Router (SSR + hydration)**
* **Redux Toolkit (global state)**
* **Feature-based structure (entities / widgets / shared / providers)**
* **API layer with auto-refresh logic**
* **Modal system with stack & lazy loading**
* **Event-driven UI (eventBus for cross-component communication)**
* **GraphQL endpoint for user profile data**
* **file upload flow with persistent avatar storage**

---

## Tech Stack

### Frontend

* Next.js 16 (App Router, SSR)
* React 19
* TypeScript
* Redux Toolkit
* Recharts (charts)
* Socket.io-client
* **Jose** (Lightweight JWT verification in Edge Runtime)

### Backend

* NestJS
* Prisma + PostgreSQL
* JWT (access + refresh)
* Argon2 (password hashing)
* WebSocket (Socket.io)
* GraphQL (Apollo)
* Multer (file uploads)

## Infrastructure

The application is containerized using Docker Compose and includes:

- PostgreSQL database
- NestJS backend
- Next.js frontend
- Nginx reverse proxy

* **Docker Health Checks**: Configured service dependencies (Frontend waits for Backend, Backend waits for DB).
* **Nginx Reverse Proxy**: Single entry point with automatic reconnection for WebSockets.
* **Resilient Connection**: Backend includes logic to reconnect to Prisma/PostgreSQL on transient network failures.

Nginx is used to route HTTP requests and handle WebSocket connections.
Uploaded avatars are stored in a bind-mounted directory (`backend/public/avatars`) and survive container rebuilds.

## Deployment

The application is deployed on a VPS using Docker and Nginx.

- Production: http://204.168.241.227
- Staging: http://204.168.241.227:81/

Nginx is used as a reverse proxy to route HTTP and WebSocket traffic.

## CI/CD

Deployment is automated using GitHub Actions.

Pipeline includes:

- install dependencies
- run tests
- build application
- copy files to server via SSH
- run Docker Compose

Environments:

- `main` → production
- `staging` → staging

### Other

* Docker / Docker Compose
* Bootstrap (layout)
* BEM (CSS structure)

---

##  WebSocket

* implemented with Socket.io
* server tracks active connections
* clients receive updates in real-time
* used for active sessions counter

---

### Web Workers

Used to offload product filtering to a separate thread.

> Included as a demonstration of parallel processing. Not required for current data size but prepared for scalability.

---

## Initial Data

The application initializes required reference data on startup.

- Product types (e.g. phone, laptop, monitor) are automatically created
- These values are required for product creation and filtering

Without this data, certain UI features (such as product type selection) will not function correctly.

---

## Run with Docker

The project uses Docker Compose and a separate `.env.compose` file for orchestration.

Run from the root directory:

```bash
docker compose --env-file .env.compose up -d --build
```
> Requires Docker Compose V2 (`docker compose`). The legacy `docker-compose` V1 is not supported.

After start, the application is available through Nginx:

```text
http://localhost
```

If `.env.compose` uses a custom external port:

```env
EXTERNAL_PORT=3001
```

then open:

```text
http://localhost:3001
```

The backend is not exposed directly. API requests are routed through Nginx:

```text
/api
```

---

## Local Setup

Use this mode when running the backend and frontend manually without Docker.

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3001
```

For local development without Docker, frontend environment variables should point directly to the backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://localhost:3000
```

---

## Environment Variables

> ⚠️ Important: Secrets must match between services for signature verification.

### frontend/.env
```env
NEXT_PUBLIC_API_URL=http://localhost/api
INTERNAL_API_URL=http://backend:3000
# Secrets for SSR middleware verification
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```
### backend/.env

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nexus

PORT=3000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/nexus

JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_ACCESS_MAXAGE=900000
COOKIE_REFRESH_MAXAGE=604800000

CORS_ORIGIN=http://localhost
```

### .env.compose

> ⚠️ This file configures the Docker orchestration itself.

* **PROJECT_NAME**: Sets the prefix for containers and networks (default: `nexus-stock`).
* **EXTERNAL_PORT**: The port on which the application will be available via Nginx (default: `80`).
* **NODE_VERSION / POSTGRES_VERSION**: Controlled versions of base images to ensure environment parity.

```env
PROJECT_NAME=nexus-stock
EXTERNAL_PORT=80
NODE_VERSION=22-alpine
POSTGRES_VERSION=15-alpine
```
---

## Project Structure

```
frontend/
    ├── src/
        ├── app/
        ├── config/
        ├── entities/
        ├── providers/
        ├── shared/
        ├── widgets/
         middleware.ts
        

backend/
    ├── src/
        ├── auth/
        ├── common/
        ├── orders/
        ├── prisma/
        ├── product-types/
        ├── shared/
        ├── user/
        ├── websocket/
```

---

## Testing

* unit tests
* integration tests
* basic backend test 

---

##  Database

Schema provided in `.mwb` format
Location: `/db/stock-management-schema.mwb`

---

## Self-check

Project supports full clean run:

```bash
docker compose --env-file .env.compose up -d --build
```
> Requires Docker Compose V2 (`docker compose`). The legacy `docker-compose` V1 is not supported.

Tested features:

* authentication
* orders & products CRUD
* filtering
* WebSocket
* SSR data loading
* i18n
* theme persistence

---

## Quick Test Flow

1. Open Orders page
2. Select an order → details panel opens
3. Delete an order → confirm modal appears
4. Go to Products page
5. Filter products by type
6. Open multiple tabs to test WebSocket session counter
7. Upload a user avatar and refresh the page to verify persistence

##  Notes

This project intentionally goes beyond the basic requirements and demonstrates **junior+ → middle-level capabilities**, including:

* SSR architecture
* token refresh flow
* modular frontend design
* real-time features

**Why Fetch over Axios?**  
Built-in support for Next.js caching and better compatibility with Edge Runtime middleware.

**Why Database for Refresh Tokens?**  
To allow instant session revocation, refresh token rotation, and a limit on concurrent sessions.

**Why Nginx?**  
To handle path-based routing (`/api` -> backend, `/` -> frontend) and provide a single entry point for WebSockets.
