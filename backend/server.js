// server.js - FIXED VERSION untuk RAN PAUD HI (No Duplicate Routes)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const uploadRoutes = require("./routes/upload");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

// Import upload directories creation script
const createUploadDirectories = require("./scripts/createUploadDirs");

const app = express();

// Trust reverse proxy (Apache/Nginx) so req.ip reflects real client IP
app.set('trust proxy', true);

// ✅ CORS configuration - dynamic based on FRONTEND_URL
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.options("*", cors({ origin: allowedOrigin, credentials: true }));

// Security middleware - UNCHANGED
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // ← PENTING untuk images
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "http:", "https:"], // ← Allow images
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Rate limiting - ENHANCED untuk RAN PAUD
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

// 🆕 Pembelajaran-specific limiter (more permissive for public reads)
const pembelajaranLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // allow bursty dashboard reads
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests to pembelajaran, please slow down.",
});

// 🆕 RAN PAUD specific rate limiter
const ranPaudLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 200, // Higher limit for RAN PAUD operations
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many RAN PAUD requests, please slow down.",
});

// Apply limiters (skip general limiter for pembelajaran path)
app.use('/api/pembelajaran', pembelajaranLimiter);
app.use('/api/ran-paud', ranPaudLimiter);
app.use('/api/', (req, res, next) => {
  if (req.path.startsWith('/pembelajaran')) return next();
  return generalLimiter(req, res, next);
});

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ STATIC FILES - UNCHANGED
app.use(
  "/uploads",
  (req, res, next) => {
    // Set CORS headers untuk static files
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Set cache headers
    res.header("Cache-Control", "public, max-age=31536000"); // 1 year cache

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }

    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// ✅ EXPLICIT ROUTES - Enhanced image serving
app.get("/uploads/news/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", "news", filename);
  const fs = require("fs");

  console.log("🖼️ Static file request:", {
    filename: filename,
    filepath: filepath,
    exists: fs.existsSync(filepath),
    origin: req.headers.origin
  });

  // Set CORS headers
  const origin = req.headers.origin || "*";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Check if file exists
  if (!fs.existsSync(filepath)) {
    console.log("❌ File not found:", filepath);
    return res.status(404).json({ 
      success: false,
      message: "Image not found",
      filename: filename 
    });
  }

  // Get content type
  const contentType = getContentType(filename);
  
  console.log("✅ Sending file:", {
    filename: filename,
    contentType: contentType,
    size: fs.statSync(filepath).size
  });
  
  // Send file dengan proper headers
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.setHeader("Access-Control-Allow-Origin", origin);
  
  res.sendFile(filepath, (err) => {
    if (err) {
      console.error("❌ Error sending file:", err);
      if (!res.headersSent) {
        res.status(500).json({ 
          success: false,
          message: "Error serving file",
          error: err.message 
        });
      }
    }
  });
});

// Helper function untuk content type
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

// Database connection and server startup
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

async function start() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected");
    console.log(`📊 Database: ${mongoURI}`);

    // Ping to ensure the connection is healthy
    try {
      const ping = await mongoose.connection.db.admin().ping();
      console.log("📡 MongoDB ping:", ping);
    } catch (pingErr) {
      console.warn("⚠️ MongoDB ping failed:", pingErr?.message || pingErr);
    }

    // Create upload directories after database connection
    try {
      createUploadDirectories();
    } catch (error) {
      console.warn("⚠️ Failed to create upload directories:", error.message);
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("\n🚀 ================================");
      console.log(`🚀 Server berjalan di port ${PORT}`);
      console.log(
        `📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
      );
      console.log(
        `🗄️ Database: ${
          process.env.MONGODB_URI || "NOT SET"
        }`
      );
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🖼️ Static files: ${process.env.BASE_URL || `http://localhost:${PORT}`}/uploads/`);
      console.log("🚀 ================================\n");

      console.log("📋 Available routes:");
      console.log("   ⚕️  GET    /api/health");
      console.log("   🧪 GET    /api/test-cors");
      console.log("   🔐 POST   /api/auth/login");
      console.log("   📰 CRUD   /api/news");
      console.log("   ❓ CRUD   /api/faq");
      console.log("   📚 CRUD   /api/pembelajaran");
      console.log("   🎯 CRUD   /api/ran-paud ← NEW RAN PAUD HI");
      console.log("   📊 GET    /api/ran-paud/dashboard ← Dashboard data");
      console.log("   📈 GET    /api/ran-paud/stats/summary ← Summary stats");
      console.log("   📥 POST   /api/ran-paud/import ← Import Excel");
      console.log("   📤 GET    /api/ran-paud/export/:format ← Export data");
      console.log("   🏢 GET    /api/ran-paud/kl/list ← K/L list");
      console.log("   🔄 POST   /api/ran-paud/bulk ← Bulk operations");
      console.log("   🖼️ POST   /api/upload/image");
      console.log("   🗑️ DELETE /api/upload/image");
      console.log("   📁 GET    /uploads/:category/:filename ← Static images");
      console.log("\n🎯 RAN PAUD HI Module: READY");
      console.log("📊 Enhanced error handling: ACTIVE");
      console.log("🔒 Security & rate limiting: ACTIVE\n");
    });
  } catch (err) {
    console.error("❌ Failed to start server due to MongoDB connection error:", err);
    // Fail fast to respect requirement: ensure DB connection before Express runs
    process.exit(1);
  }
}

start();


// ===== API ROUTES - SINGLE DECLARATION ONLY =====
// 🚨 FIXED: Remove all duplicate route declarations

// Core API routes - DECLARE ONCE ONLY
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));
app.use("/api/faq", require("./routes/faq"));
app.use("/api/pembelajaran", require("./routes/pembelajaran.js"));
app.use("/api/upload", uploadRoutes);
app.use("/api/db", require("./routes/db"));

// 🆕 RAN PAUD HI Routes (with error handling)
try {
  app.use("/api/ran-paud", require("./routes/ranpaud"));
  console.log("✅ RAN PAUD HI routes loaded successfully");
} catch (error) {
  console.warn("⚠️ RAN PAUD routes not found, skipping...", error.message);
  // Don't crash, just log warning
}

// 🆕 User Management Routes (admin_utama only)
try {
  app.use("/api/users", require("./routes/users"));
  console.log("✅ User Management routes loaded successfully");
} catch (error) {
  console.warn(
    "⚠️ User Management routes not found, skipping...",
    error.message
  );
}

// Health check - ENHANCED
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    cors: {
      origin: req.headers.origin,
      allowedOrigins: corsOptions.origin,
    },
    modules: {
      ranPaud: true, // Indicate RAN PAUD module is available
      news: true,
      faq: true,
      pembelajaran: true,
    },
    environment: process.env.NODE_ENV || "development",
  });
});

// Test endpoint untuk cek CORS
app.get("/api/test-cors", (req, res) => {
  res.json({
    message: "CORS test successful",
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
    ranPaudEnabled: true, // ← NEW
  });
});

// Test route untuk debugging
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend API is working!",
    timestamp: new Date().toISOString(),
    headers: req.headers,
    origin: req.headers.origin,
    ranPaudModule: "active", // ← NEW
  });
});

// 404 handler
app.use("*", (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false, // ← Enhanced response format
    message: "Endpoint tidak ditemukan",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handler - ENHANCED
app.use((error, req, res, next) => {
  console.error("🔥 Global error handler:", error);
  console.error("📍 Error stack:", error.stack);

  // Enhanced error logging
  console.error("🌐 Request info:", {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  // Mongoose cast error
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      timestamp: new Date().toISOString(),
    });
  }

  // JWT error
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      timestamp: new Date().toISOString(),
    });
  }

  // Multer error
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File terlalu besar. Maksimal 5MB.",
      timestamp: new Date().toISOString(),
    });
  }

  // MongoDB duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0];
    return res.status(400).json({
      success: false,
      message: field
        ? `Data dengan ${field} "${error.keyValue[field]}" sudah ada`
        : "Data duplikat ditemukan",
      timestamp: new Date().toISOString(),
    });
  }

  // File format error
  if (error.message && error.message.includes("Format file tidak didukung")) {
    return res.status(400).json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  // Generic server error
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// ✅ GRACEFUL SHUTDOWN (Simple version)
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

  mongoose.connection.close(false, (err) => {
    if (err) {
      console.error("❌ Error during MongoDB disconnect:", err);
    } else {
      console.log("✅ MongoDB connection closed");
    }
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection at:", promise, "reason:", reason);
  // Don't exit process for unhandled rejections in development
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

// app.listen now starts only after successful MongoDB connection in start()
