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
* **toast notification system (queue, animations, pause on hover)**

---

## Architecture Highlights

* **Next.js App Router (SSR + hydration)**
* **Redux Toolkit (global state)**
* **Feature-based structure (entities / widgets / shared / providers)**
* **API layer with auto-refresh logic**
* **Modal system with stack & lazy loading**
* **Event-driven UI (eventBus for cross-component communication)**

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

## Infrastructure

The application is containerized using Docker Compose and includes:

- PostgreSQL database
- NestJS backend
- Next.js frontend
- Nginx reverse proxy

Nginx is used to route HTTP requests and handle WebSocket connections.

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
├── app/
├── entities/
├── widgets/
├── providers/
├── shared/

backend/
├── auth/
├── orders/
├── product-types/
├── prisma/
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

##  Notes

This project intentionally goes beyond the basic requirements and demonstrates **junior+ → middle-level capabilities**, including:

* SSR architecture
* token refresh flow
* modular frontend design
* real-time features
