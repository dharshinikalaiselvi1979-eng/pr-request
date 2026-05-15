// src/config/db.js
// Prisma client configuration

const { PrismaClient } = require("@prisma/client");

// ============================================================
// FIX:
// Read database connection string from environment variables
// instead of hardcoding credentials.
// ============================================================

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

module.exports = prisma;