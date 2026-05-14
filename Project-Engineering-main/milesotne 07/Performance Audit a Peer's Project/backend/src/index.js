const express = require('express');
const cors = require('cors');
const compression = require('compression'); // FIX B3: Add compression
const scoreRoutes = require('./routes/scores');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// FIX B3: Enable gzip compression
app.use(compression());

// Routes
app.use('/api/scores', scoreRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});