# Orders & Products SPA

## 📌 Project Description

SPA application for managing orders and products.

Implemented features:

* orders list
* viewing products inside an order
* deleting orders via modal window
* separate products page
* product filtering
* active sessions counter (WebSocket)

---

## 🧩 Implemented Functionality

### Orders

* display list of orders
* display:

    * order title
    * number of products
    * dates (2 formats)
    * total price (2 currencies)
* open order details panel (side view)
* close details panel
* delete order via pop-up

---

### Products

* display all products
* display:

    * name
    * type
    * guarantee dates (2 formats)
    * price (2 currencies)
    * related order
* filtering by product type (select)

---

### Navigation

* menu with routes:

    * Orders
    * Products

---

### TopMenu

* real-time date and time
* active sessions counter (WebSocket)

---

## 🔧 Additional Features

* 🔐 Authentication (Login / Logout)
* 🍪 JWT (HttpOnly cookies)
* 🌙 Dark / Light theme
* 🌍 Language switcher (i18n)
* 💾 WebStorage (saving user preferences like theme)
* ✅ Unit tests

---

## 🔌 WebSocket

* implemented using Socket.io
* each browser tab = отдельная сессия
* server tracks active connections
* clients receive real-time updates

---

## 🛠 Technologies

### Required (by task)

* React (Next.js)
* Redux Toolkit
* Next.js App Router
* WebSocket (Socket.io)
* REST API (Fetch)
* Bootstrap
* BEM (CSS architecture)
* Git
* Docker

---

### Additional (Junior+ level)

* TypeScript
* SSR (Next.js)
* i18n
* JWT (cookies)
* WebStorage
* Lazy loading (modals)
* Unit tests

---

## 🐳 Docker запуск

```bash
docker-compose up --build
```

После запуска:

* Frontend: http://localhost:3001
* Backend: http://localhost:3000

---

## ▶️ Local Setup

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

After запуск:

* Frontend: http://localhost:3001
* Backend: http://localhost:3000

---

## ⚙️ Environment Variables

### frontend/.env

```
NEXT_PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://backend:3000
```

---

### backend/.env

```
DATABASE_URL=postgres://postgres:postgres@postgres:5432/nexus
JWT_SECRET=secret
```

---

## 📁 Project Structure

```
frontend/
├── app/
├── entities/
├── widgets/
├── providers/
├── shared/
```

---

## 🧪 Self-check

The project can be started from scratch:

```bash
docker-compose up --build
```

Working features:

* Orders
* Products
* WebSocket
* filtering
* modals
* authentication
* theme switching
* language switching

---

## 🗄 Database

Database schema is provided in `.mwb` format
Location: `/db/schema.mwb`
(Open using MySQL Workbench)

---
