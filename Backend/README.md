# DataMart Backend API

A **high-performance Node.js backend** built with **Express, Supabase (PostgreSQL), and Redis**.

This project demonstrates:

- Scalable backend architecture
- Clean code structure
- Redis caching
- Authentication system
- File uploads
- API validation
- Logging and monitoring
- API documentation

---

# Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL)
- Redis (Caching)
- Zod (Validation)
- JWT Authentication
- Winston Logger
- Cloudinary (Image Upload)
- Swagger (API Documentation)
- Jest (Testing)

---

# Project Structure

```
src/
│
├── bootstrap
│   ├── app.bootstrap.js
│   ├── database.bootstrap.js
│   └── server.bootstrap.js
│
├── cache
│   └── cache.service.js
│
├── config
│   ├── app.config.js
│   ├── env.config.js
│   ├── logger.config.js
│   ├── supabase.config.js
│   └── cloudinary.config.js
│
├── constants
│   ├── app.constants.js
│   ├── cacheKeys.js
│   ├── cacheTTL.js
│   ├── errorMessages.js
│   ├── httpStatus.js
│   └── roles.js
│
├── controllers
│   ├── auth.controller.js
│   ├── product.controller.js
│   └── upload.controller.js
│
├── database
│   ├── migrations
│   │   ├── 001_create_products_table.sql
│   │   └── 002_add_product_index.sql
│   │
│   ├── schema
│   │   └── product.schema.sql
│   │
│   ├── seeds
│   │   ├── index.seed.js
│   │   └── product.seed.js
│   │
│   └── database.js
│
├── docs
│   ├── swagger.js
│   └── swagger.json
│
├── jobs
│   ├── cacheCleanup.job.js
│   ├── healthCheck.job.js
│   └── index.jobs.js
│
├── middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── rateLimit.middleware.js
│   ├── requestLogger.middleware.js
│   ├── security.middleware.js
│   ├── upload.middleware.js
│   └── validate.middleware.js
│
├── repositories
│   ├── auth.repository.js
│   ├── product.repository.js
│   └── index.repository.js
│
├── routes
│   ├── auth.routes.js
│   ├── health.routes.js
│   ├── product.routes.js
│   ├── uploadRoutes.js
│   └── index.routes.js
│
├── services
│   ├── auth.service.js
│   ├── product.service.js
│   └── index.service.js
│
├── utils
│   ├── apiResponse.js
│   ├── asyncHandler.js
│   ├── cloudinaryUpload.js
│   ├── hash.js
│   ├── logger.js
│   ├── pagination.js
│   └── removePassword.js
│
├── validations
│   └── product.validation.js
│
├── app.js
└── server.js

logs/
scripts/
tests/
```

---

# Environment Setup

Create a `.env` file in the root folder.

```
NODE_ENV=development
PORT=5000

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

JWT_SECRET=your_secret_key
JWT_EXPIRES=7d

LOG_LEVEL=info

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

FORNTEND_URL=http://localhost:5173
```

⚠ **Never commit `.env` file to GitHub**

---

# Installation

Install dependencies

```
npm install
```

---

# Run Server

Development mode

```
npm run dev
```

Production mode

```
npm start
```

Server runs at

```
http://localhost:5000/api/v1
```

---

# Database Setup

Run this SQL inside Supabase SQL Editor:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile TEXT,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  brand TEXT,
  stock INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  images TEXT[],
  price NUMERIC NOT NULL,
  currency TEXT DEFAULT '$',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---
# FIrst Vsit SUpabase 

--- 

# API Endpoints

Base URL

```
http://localhost:5000/api/v1
```

## Health

| Method | Endpoint | Description |
|------|------|------|
GET | /health | Server health check |

---

## Auth

| Method | Endpoint | Description |
|------|------|------|
POST | /auth/signup | Register user |
POST | /auth/login | Login user |
GET | /auth/me | Get logged user |
PUT | /auth/update | Update user profile |

---

## Products

| Method | Endpoint | Description |
|------|------|------|
GET | /products | Get all products |
GET | /products/:id | Get product by ID |
POST | /products | Create product |
PUT | /products/:id | Update product |
DELETE | /products/:id | Delete product |

---

## Upload

| Method | Endpoint | Description |
|------|------|------|
POST | /upload/me | Upload profile image |

---

# Example Request

POST `/products`

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": "06cd2f61-68fe-4e86-bfb1-f2c553182700",
    "owner_id": "21123d3d-762f-4e47-8f62-b083460bca29",
    "name": "Apple TV 4K",
    "description": "<p>Streaming media player</p>",
    "category": "Entertainment",
    "brand": "Apple",
    "stock": 22,
    "rating": 0,
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db"
    ],
    "price": 179,
    "currency": "$",
    "created_at": "2026-03-10T21:42:14.439075+00:00"
  }
}
```

---

# Performance Features

- Pagination support
- Structured logging
- Input validation
- Rate limiting
- Security middleware
- Background jobs

---

# Testing

Run tests

```
npm test
```

Tests include:

- Unit tests
- Integration tests

---

# Logging

Logs are stored in

```
logs/app.log
```

Logging powered by **Winston**.

---

# Author

**Sohit Mishra**  
Full Stack Developer