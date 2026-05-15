# ShipAPI — Docker Log

## App Analysis

Start script:

```bash
npm start
```

The `package.json` file contains:

```json
"start": "node src/server.js"
```

Port:
The application runs on port `3000`.

Prisma dependency:
YES — the application uses Prisma ORM with PostgreSQL.

This means the Dockerfile must include:

```bash
COPY prisma ./prisma/
RUN npx prisma generate
```

The Prisma Client must be generated before the application starts, otherwise database operations will fail inside the container.

Environment variables needed:

```env
DATABASE_URL
JWT_SECRET
PORT
```

These variables are loaded from the `.env` file during container runtime using:

```bash
--env-file .env
```

---

## Build Log

Command:

```bash
docker build -t shipapi-backend .
```

Build output (trimmed):

```bash
[+] Building 24.5s (10/10) FINISHED
 => [1/7] FROM docker.io/library/node:20-alpine
 => [2/7] WORKDIR /app
 => [3/7] COPY package*.json ./
 => [4/7] RUN npm ci --only=production
 => [5/7] COPY prisma ./prisma/
 => [6/7] RUN npx prisma generate
 => [7/7] COPY . .
 => exporting to image
 => naming to docker.io/library/shipapi-backend
```

Layer caching evidence (second build output):

```bash
=> CACHED [2/7] WORKDIR /app
=> CACHED [3/7] COPY package*.json ./
=> CACHED [4/7] RUN npm ci --only=production
=> CACHED [5/7] COPY prisma ./prisma/
=> CACHED [6/7] RUN npx prisma generate
```

This confirms Docker reused cached layers and skipped reinstalling dependencies.

---

## Run and Health Check

Run command:

```bash
docker run \
  --env-file .env \
  -p 3000:3000 \
  --name shipapi \
  -d \
  shipapi-backend
```

docker ps output:

```bash
CONTAINER ID   IMAGE              COMMAND                  STATUS          PORTS                    NAMES
7ab23f1cd921   shipapi-backend    "docker-entrypoint.s…"   Up 12 seconds   0.0.0.0:3000->3000/tcp shipapi
```

curl http://localhost:3000/health response:

```json
{"status":"ok","timestamp":"2026-05-14T10:23:41.000Z"}
```

HTTP Status:

```bash
200 OK
```

---

## Observations

If `COPY . .` had been placed before `RUN npm ci`, every source code change would invalidate Docker’s dependency cache. That means Docker would reinstall all dependencies on every build, making builds significantly slower.

By copying `package.json` and `package-lock.json` first, Docker caches the dependency installation layer separately. As long as dependencies do not change, Docker reuses the cached `npm ci` layer, greatly improving CI/CD build performance and local development speed.

The `--env-file .env` flag protects sensitive configuration values like `DATABASE_URL` and `JWT_SECRET` from being hardcoded into the Docker image. This keeps secrets out of version control and allows the same image to run safely across development, staging, and production environments with different configurations.
