const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require('../dbPostgres');
const { v4: uuidv4 } = require('uuid'); // Fallback if not available, used crypto below

// Helper to generate ID if uuid package missing
const generateId = () => {
    try {
        return require('crypto').randomUUID();
    } catch (e) {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};

// =================
// AUTHENTICATION ROUTES (PostgreSQL Version)
// =================

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password diperlukan" });
    }

    // Find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }

    // Check active
    if (!user.is_active) {
      return res.status(401).json({ success: false, message: "Akun tidak aktif" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Generate Token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        klId: user.kl_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Prepare response (camelCase for frontend)
    const userResponse = {
      id: user.id,
      _id: user.id, // Legacy compatibility
      email: user.email,
      username: user.username,
      fullName: user.full_name,
      role: user.role,
      klId: user.kl_id,
      klName: user.kl_name,
      isActive: user.is_active,
      lastLogin: new Date(), // Just updated
      permissions: user.permissions || {}
    };

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat login" });
  }
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, username, fullName, role, klId } = req.body;

    if (!email || !password || !username || !fullName) {
      return res.status(400).json({ success: false, message: "Semua field diperlukan" });
    }

    // Check existing
    const existing = await pool.query(
        'SELECT id FROM users WHERE email = $1 OR username = $2', 
        [email.toLowerCase(), username]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email atau username sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newId = generateId();

    // Default permissions logic could be here, but usually handled by frontend or admin panel. 
    // We'll insert basic structure or empty object, assuming 'user' role defaults.
    // For now, let's keep it simple or default to what schema says ('{}')

    const query = `
        INSERT INTO users (id, username, email, password, full_name, role, kl_id, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING *
    `;
    const values = [
        newId, username, email.toLowerCase(), hashedPassword, fullName, 
        role || 'user', klId || null, true
    ];

    const result = await pool.query(query, values);
    const newUser = result.rows[0];

    // Token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role, klId: newUser.kl_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: {
          id: newUser.id,
          _id: newUser.id, // Legacy compatibility
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.full_name,
          role: newUser.role,
          isActive: newUser.is_active
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat registrasi", error: error.message });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.status(200).json({ success: true, message: "Logout berhasil" });
});

// GET /api/auth/verify (also /profile often used similarly)
router.get("/verify", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "Token tidak ditemukan" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        const user = result.rows[0];

        if (!user || !user.is_active) {
            return res.status(401).json({ success: false, message: "Token/User tidak valid" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                _id: user.id, // Legacy compatibility
                email: user.email,
                username: user.username,
                fullName: user.full_name,
                role: user.role,
                klId: user.kl_id,
                klName: user.kl_name,
                isActive: user.is_active,
                permissions: user.permissions
            }
        });

    } catch (error) {
        res.status(401).json({ success: false, message: "Token tidak valid" });
    }
});

// GET /api/auth/profile
router.get("/profile", async (req, res) => {
    // Same implementation as verify effectively
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "Token tidak ditemukan" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        const user = result.rows[0];

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                _id: user.id, // Legacy compatibility
                email: user.email,
                username: user.username,
                fullName: user.full_name,
                role: user.role,
                klId: user.kl_id,
                isActive: user.is_active,
                permissions: user.permissions,
                createdAt: user.created_at
            }
        });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

// PUT /api/auth/profile
router.put("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "Token missing" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { fullName, username, email } = req.body;
        
        // Dynamic update query
        let fields = [];
        let values = [];
        let idx = 1;

        if (fullName) { fields.push(`full_name = $${idx++}`); values.push(fullName); }
        if (username) { fields.push(`username = $${idx++}`); values.push(username); }
        if (email) { fields.push(`email = $${idx++}`); values.push(email.toLowerCase()); }
        
        if (fields.length === 0) return res.json({ success: true, message: "Nothing to update" });

        fields.push(`updated_at = NOW()`);
        
        // Add ID as last parameter
        values.push(decoded.userId);
        
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
        
        const result = await pool.query(query, values);
        const updated = result.rows[0];

        res.json({
            success: true,
            user: {
                id: updated.id,
                _id: updated.id, // Legacy compatibility
                email: updated.email,
                username: updated.username,
                fullName: updated.full_name,
                // ... include other fields if needed for frontend state update
            }
        });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

// POST /api/auth/change-password
router.post("/change-password", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { currentPassword, newPassword } = req.body;
        if(!currentPassword || !newPassword) return res.status(400).json({success:false, message: "Password required"});

        // Get current hash
        const resUser = await pool.query('SELECT password FROM users WHERE id = $1', [decoded.userId]);
        if (resUser.rows.length === 0) return res.status(404).json({success:false, message: "User not found"});
        
        const user = resUser.rows[0];
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) return res.status(400).json({success:false, message: "Password lama salah"});

        const newHash = await bcrypt.hash(newPassword, 12);
        await pool.query('UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2', [newHash, decoded.userId]);

        res.json({ success: true, message: "Password updated" });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

module.exports = router;