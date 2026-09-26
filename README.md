# 🍕 Pizza Zone - Enterprise Food Ordering & Management Platform

A high-performance, full-stack food ordering platform designed for high scale, real-time kitchen operations, and seamless customer ordering. Built with **Spring Boot 3**, **PostgreSQL 16**, **Redis 7**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 📐 Architecture Overview

```
                      ┌───────────────────────────┐
                      │    Customer Web App       │
                      │  http://localhost:3000    │
                      └─────────────┬─────────────┘
                                    │ HTTPS/REST + JWT
                                    ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│     Admin Dashboard       │───▶│   Spring Boot 3 REST API  │
│  http://localhost:3001    │   │  http://localhost:8080    │
└───────────────────────────┘   └─────────────┬─────────────┘
  (2FA + Session Security)                    │
                                    ┌─────────┴─────────┐
                                    ▼                   ▼
                            ┌──────────────┐    ┌──────────────┐
                            │ PostgreSQL 16│    │   Redis 7    │
                            │ (DB Port 5432│    │ (Port 6379)  │
                            └──────────────┘    └──────────────┘
```

### Key Architectural Rules
1. **Isolated Apps**: Customer App (`Port 3000`) and Admin Dashboard (`Port 3001`) run as completely separate applications on distinct ports.
2. **REST-Only Communication**: Frontends never interact directly with database or third-party provider credentials; all business logic, pricing rules, inventory validation, and coupon checks are enforced server-side.
3. **Data Integrity**: Orders store explicit JSON snapshots (`address_snapshot`, `variant_snapshot`, `addons_snapshot`) so historical orders are immune to subsequent product price edits.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Customer App** | React 18, Vite, TypeScript, Tailwind CSS, TanStack Query, Zustand, Axios |
| **Admin App** | React 18, Vite, TypeScript, Tailwind CSS, Recharts, TanStack Query, Zustand |
| **Backend API** | Java 21 / 25, Spring Boot 3.3, Spring Security 6, Spring Data JPA, Flyway |
| **Database** | PostgreSQL 16 (Primary Data Store) |
| **Cache & OTP** | Redis 7 (OTP verification, rate limiting, session cache) |
| **DevOps & Containers** | Docker, Docker Compose |

---

## 🚀 Quick Start Guide

### Option 1: Run Infrastructure in Docker, Frontends & Backend Natively (Recommended for Dev)

1. **Start Database & Redis Containers**:
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Start Backend Spring Boot API**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *Backend running on `http://localhost:8080` (Swagger UI at `http://localhost:8080/swagger-ui.html`)*

3. **Start Customer Web App**:
   ```bash
   cd frontend/customer-app
   npm install
   npm run dev
   ```
   *Customer App running on `http://localhost:3000`*

4. **Start Admin Dashboard**:
   ```bash
   cd frontend/admin-app
   npm install
   npm run dev
   ```
   *Admin App running on `http://localhost:3001`*

---

## 📂 Repository Layout

```
pizza-zone/
├── frontend/
│   ├── customer-app/        # Vite + React 18 + TS Customer Web App (Port 3000)
│   └── admin-app/           # Vite + React 18 + TS Admin Dashboard (Port 3001)
├── backend/                 # Spring Boot 3 Java 21 API Service (Port 8080)
│   └── src/main/java/com/pizzazone/
│       ├── auth/            # OTP Auth & Admin 2FA
│       ├── menu/            # Products, Variants, Addons, Today's Special
│       ├── cart/            # Cart management & price rule engine
│       ├── order/           # Order creation & status transition history
│       ├── payment/         # Razorpay integration & webhook signature verification
│       ├── admin/           # Restaurant overrides & store management
│       ├── notification/    # SMS/Email notification provider interface
│       └── common/          # Global exception handler, JWT, ApiResponse DTO
├── database/
│   └── migrations/          # Flyway SQL migration scripts (V1__initial_schema.sql)
├── docker-compose.yml       # PostgreSQL 16, Redis 7 & full container setup
├── .env.example             # Environment variable template
└── README.md
```
