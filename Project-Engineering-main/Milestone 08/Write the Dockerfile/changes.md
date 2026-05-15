# ShipAPI Dockerized Backend

A production-ready Docker setup for the ShipAPI Express + Prisma backend application.

---

# Tech Stack

* Node.js 20
* Express.js
* Prisma ORM
* PostgreSQL
* Docker

---

# Features

* Dockerized Express backend
* Prisma Client generation during build
* Optimized Docker layer caching
* Production dependency installation using `npm ci`
* Environment variable support using `.env`
* Health check endpoint verification
* Lightweight Alpine Linux image

---

# Project Structure

```bash
.
├── prisma/
├── src/
├── Dockerfile
├── .dockerignore
├── DOCKER_LOG.md
├── package.json
└── package-lock.json
```

---

# Dockerfile Highlights

The Dockerfile follows Docker layer caching best practices:

1. Copy dependency files first
2. Install dependencies
3. Copy Prisma schema
4. Generate Prisma client
5. Copy remaining source code
6. Start the application

This significantly improves rebuild times during development and CI/CD pipelines.

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

# Build Docker Image

```bash
docker build -t shipapi-backend .
```

---

# Run Docker Container

```bash
docker run \
  --env-file .env \
  -p 3000:3000 \
  --name shipapi \
  -d \
  shipapi-backend
```

---

# Verify Running Container

```bash
docker ps
```

Expected output:

```bash
shipapi   shipapi-backend   0.0.0.0:3000->3000/tcp
```

---

# Health Check

Test the API health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-05-14T10:23:41.000Z"
}
```

Status Code:

```bash
200 OK
```

---

# Docker Layer Caching Verification

After modifying a source file and rebuilding:

```bash
docker build -t shipapi-backend .
```

Docker should reuse cached dependency layers:

```bash
=> CACHED [4/7] RUN npm ci --only=production
```

This proves dependency installation is cached efficiently.

---

# .dockerignore

The project excludes unnecessary files from the Docker build context:

```bash
node_modules
.env
.env.*
.git
dist
coverage
*.md
npm-debug.log
```

This keeps the image clean and prevents sensitive data from being copied.

---

# Prisma Notes

The Prisma client is generated during the image build using:

```bash
RUN npx prisma generate
```

This ensures Prisma works correctly inside the container.

---

# Common Issues

## Prisma Connection Error

Cause:

* Missing or invalid `DATABASE_URL`

Fix:

* Ensure `.env` contains a valid PostgreSQL connection string.

---

## Port Issues

Cause:

* PORT mismatch between `.env` and Docker mapping

Fix:

* Ensure the app runs on port `3000`.

---

# Author

Dockerized and optimized for production deployment as part of the Project Engineering milestone.
