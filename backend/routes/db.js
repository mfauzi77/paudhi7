const express = require("express");
const mongoose = require("mongoose");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// POST /api/db/test-connection
// Body: { uri?: string }
// Only super_admin may run this in production to avoid leaking details
router.post(
  "/test-connection",
  authenticate,
  authorize(["super_admin"]),
  async (req, res) => {
    const uriFromBody = (req.body && req.body.uri) || "";
    const uri = uriFromBody.trim() || process.env.MONGODB_TEST_URI || process.env.MONGODB_URI;

    if (!uri) {
      return res.status(400).json({
        success: false,
        message: "MongoDB URI tidak ditemukan. Kirim 'uri' di body atau set MONGODB_TEST_URI/MONGODB_URI.",
      });
    }

    let tempConn;
    const startedAt = Date.now();
    try {
      tempConn = await mongoose.createConnection(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      }).asPromise();

      // Run a ping to validate auth/permissions
      const admin = tempConn.db.admin();
      const pingResult = await admin.ping();

      const elapsedMs = Date.now() - startedAt;
      await tempConn.close();

      return res.status(200).json({
        success: true,
        message: "Koneksi MongoDB berhasil",
        elapsedMs,
        ping: pingResult,
      });
    } catch (error) {
      const elapsedMs = Date.now() - startedAt;
      if (tempConn) {
        try { await tempConn.close(); } catch (_) {}
      }
      return res.status(500).json({
        success: false,
        message: "Gagal konek ke MongoDB",
        elapsedMs,
        error: error && error.message ? error.message : String(error),
        code: error && (error.code || error.name),
      });
    }
  }
);

module.exports = router;



