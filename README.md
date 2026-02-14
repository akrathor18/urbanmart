# UrbanMart — Full‑Stack E‑commerce Starter

>A compact full‑stack e‑commerce example with a Vite + React client and an Express + Prisma (Postgres) server. Includes cart, wishlist, orders, and Razorpay payment integration.

---

## Table of contents
- [What the project does](#what-the-project-does)
- [Why it’s useful](#why-its-useful)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Server setup](#server-setup)
  - [Client setup](#client-setup)
  - [Run (development)](#run-development)
- [Environment variables](#environment-variables)
- [API overview (quick)](#api-overview-quick)
- [Where to get help](#where-to-get-help)
- [Maintainers & contributing](#maintainers--contributing)

---

## What the project does

UrbanMart is a small e‑commerce reference application demonstrating a production‑style separation between a Vite + React frontend and an Express backend using Prisma + PostgreSQL. It implements user accounts, cart & wishlist, order creation, and Razorpay payment handling.

## Why it’s useful

- Full example of a modern JS stack (Vite, React, Zustand, Express).
- Prisma models demonstrate typical e‑commerce data (users, products, cart, orders).
- Payment integration example using Razorpay.
- Ready to fork and extend for prototypes or learning.

## Tech stack

- Client: React (Vite), Tailwind CSS, Zustand, React Router
- Server: Node.js, Express, Prisma (Postgres), Razorpay
- DB: PostgreSQL (Prisma ORM)

## Getting started

Follow these steps to run the app locally (development).

### Prerequisites

- Node.js (LTS, tested on Node 18+)
- PostgreSQL database
- Optional: Razorpay account and API keys for payment flows

### Server setup

1. Open a terminal and install server dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file in `server/` (see **Environment variables** below).

3. Run database migrations and seed the DB (Prisma is configured to use `prisma/seed.js`):

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

4. Start the server in development mode:

```bash
npm run dev
```

The server listens on `process.env.PORT` or `5000` by default.

### Client setup

1. In a separate terminal, install client dependencies and start the dev server:

```bash
cd client
npm install
npm run dev
```

The Vite dev server uses `http://localhost:5173` by default.

### Run (development)

Open two terminals (one for the server, one for the client) and run the commands above. The frontend expects the backend at `http://localhost:5000` (set `FRONTEND_URL` / `CORS` as needed in `.env`).

## Environment variables

Create `server/.env` with at least the following variables:

- `DATABASE_URL` — Postgres connection string (e.g., `postgresql://user:pass@localhost:5432/dbname`)
- `RAZORPAY_KEY_ID` — Razorpay key id (optional for non‑payment testing)
- `RAZORPAY_KEY_SECRET` — Razorpay key secret
- `FRONTEND_URL` — frontend origin used in CORS when `NODE_ENV=production`
- `PORT` — server listen port (optional)

See `server/prisma/schema.prisma` for the database model used by the application.

## API overview (quick)

This is a short list of important endpoints implemented in the server (see source for full routes):

- `GET /` — basic health check
- `GET /health` — deployment health endpoint
- `POST /auth/*` — authentication routes (signin/signup)
- `GET /api/*` — product & category APIs
- `POST /orders` and `GET /orders/*` — order endpoints
- `POST /api/payment/*` — payment endpoints (Razorpay integration)
- `GET|POST /cart`, `/wishlist`, `/user` — cart, wishlist, and profile routes

Example: fetch products from the API (replace host/port if needed):

```bash
curl http://localhost:5000/api/products
```

For detailed API usage, refer to the controller files under `server/src/controllers`.

## Where to get help

- Open an issue in this repository for bugs or feature requests.
- Open a discussion/PR with a reproduction.