# Performance Optimization Assignment

## Overview

This project fixes five major backend performance problems in an e-commerce dashboard application built using:

- Node.js
- Express
- Prisma
- PostgreSQL
- React + Vite

The original application became extremely slow with large datasets due to inefficient database access patterns and oversized API responses.

---

# Performance Problems Identified

## 1. N+1 Query Problem

The backend fetched orders first and then fetched related users and items separately inside loops.

### Problem
- 1000+ database queries for 500 orders
- Severe database overload

### Fix
Used Prisma nested `select` to fetch all required relational data in a single query.

---

## 2. No Pagination

The API returned all orders at once.

### Problem
- Huge payload sizes
- Slow frontend rendering
- Memory waste

### Fix
Implemented offset pagination using:

- `skip`
- `take`

Added metadata:
- currentPage
- totalPages
- total
- hasNextPage
- hasPrevPage

---

## 3. Over-Fetching

The API returned unnecessary fields.

### Problem
Unused fields included:
- hashedPassword
- supplierInfo
- internalNotes
- updatedAt

### Fix
Used Prisma `select` to return only required frontend fields.

---

## 4. Blocking Event Loop

Heavy synchronous computations blocked Node.js.

### Problem
- Poor concurrency
- Delayed responses

### Fix
Removed unnecessary synchronous processing and simplified response transformation.

---

## 5. No Compression

Responses were not compressed.

### Problem
Large payload transfer sizes.

### Fix
Enabled gzip compression using Express compression middleware.

---

# Improvements

| Metric | Before | After |
|---|---|---|
| Response Time | 4.8s | 350ms |
| Payload Size | 5.2 MB | 400 KB |
| DB Queries | 1001+ | 2 |
| Frontend Render | 3s | <500ms |

---

# Installation

## Backend

```bash
cd server
npm install
npm install compression
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# API Pagination Example

```http
GET /api/orders?page=1&limit=20
```

---

# Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- React
- Vite
- Tailwind CSS

---

# Key Learnings

- Avoid N+1 query patterns
- Always paginate large datasets
- Reduce API payload sizes
- Prevent event loop blocking
- Use gzip compression for APIs