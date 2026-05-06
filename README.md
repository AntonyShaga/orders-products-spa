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

### Authentication

* login / register
* JWT (HttpOnly cookies)
* refresh token flow
* protected routes

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

Nginx is used to route HTTP requests and handle WebSocket connections.
Uploaded avatars are stored in a persistent Docker volume and survive container rebuilds.

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

```bash
docker-compose up --build
```

After start:

* Frontend: http://localhost:3001
* Backend: http://localhost:3000

---

##  Local Setup

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

> ⚠️ JWT_SECRET must be identical in both frontend and backend.
> It is used to sign tokens on the backend and verify them in Next.js middleware.

### frontend/.env

```
NEXT_PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://backend:3000
JWT_SECRET=secret
```

### backend/.env

```
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/nexus?connect_timeout=5&pool_timeout=5
JWT_SECRET=secret
CORS_ORIGIN=http://localhost:3001
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
        ├── user/
        ├── websoceket/
```

---

## Testing

* unit tests
* integration tests
* basic backend test 

---

##  Database

Schema provided in `.mwb` format
Location: `/db/schema.mwb`

---

## Self-check

Project supports full clean run:

```bash
docker-compose up --build
```

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
