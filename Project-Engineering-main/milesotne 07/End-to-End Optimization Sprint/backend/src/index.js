const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// FIX 4: Enable Gzip Compression
app.use(compression());

// FIXED ENDPOINT
app.get('/api/missions', async (req, res) => {
  console.log('--- GET /api/missions called ---');

  try {
    // FIX 2: Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // Total missions count
    const total = await prisma.mission.count();

    // FIX 1 + FIX 3:
    // - Removed N+1 queries
    // - Removed over-fetching
    // - Using single Prisma query with select
    const missions = await prisma.mission.findMany({
      skip,
      take: limit,

      select: {
        id: true,
        name: true,
        launchDate: true,
        rocket: true,

        // Include only required crew fields
        crew: {
          select: {
            id: true,
            name: true,
            role: true
          }
        },

        // Include only required log fields
        logs: {
          select: {
            id: true,
            event: true,
            timestamp: true
          }
        }
      },

      orderBy: {
        launchDate: 'desc'
      }
    });

    const totalPages = Math.ceil(total / limit);

    console.log(`Executed ONLY 2 database queries for this request.`);

    // Pagination metadata
    res.json({
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      data: missions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch missions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});