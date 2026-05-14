// src/index.js
// NoteVault API — Express Server Entry Point

require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// FIX: Validate required environment variables before
// starting the server.
// ============================================================

function validateEnv() {
  const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");

    missingVars.forEach((envVar) => {
      console.error(`- ${envVar}`);
    });

    console.error(
      "\n🛑 Server startup aborted due to missing configuration."
    );

    process.exit(1);
  }
}

// Run validation BEFORE app starts
validateEnv();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "NoteVault API",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    error: "Internal server error.",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 NoteVault API running on port ${PORT}`);
});