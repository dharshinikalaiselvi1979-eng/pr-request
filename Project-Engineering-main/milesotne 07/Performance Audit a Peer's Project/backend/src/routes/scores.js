const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// FIX B1: Add Pagination
// FIX B2: Remove unnecessary strategyNote field
router.get('/', async (req, res) => {
  try {
    // Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Total records
    const total = await prisma.score.count();

    // Optimized query
    const scores = await prisma.score.findMany({
      skip,
      take: limit,
      orderBy: { date: 'desc' },

      // FIX B2: Select only required fields
      select: {
        id: true,
        game: true,
        player: true,
        score: true,
        date: true,
      },
    });

    // Response with metadata
    res.json({
      data: scores,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching scores:', error);

    res.status(500).json({
      error: 'Failed to fetch scores',
    });
  }
});

module.exports = router;