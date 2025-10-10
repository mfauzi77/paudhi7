const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =================
// HELPER FUNCTIONS
// =================

// Helper function to fix permissions structure
const fixPermissionsStructure = (user) => {
  try {
    // If permissions is an array (old format), convert to object
    if (Array.isArray(user.permissions)) {
      console.log('🔧 Converting array permissions to object for user:', user.email);
      
      const newPermissions = {
        ranPaud: { create: true, read: true, update: true, delete: true },
        news: { create: true, read: true, update: true, delete: true },
        pembelajaran: { create: true, read: true, update: true, delete: true },
        faq: { create: true, read: true, update: true, delete: true },
        users: { create: false, read: false, update: false, delete: false }
      };
      
      // Map old permissions if they exist
      user.permissions.forEach(perm => {
        if (perm.module && perm.actions && Array.isArray(perm.actions)) {
          const moduleMap = {
            'ran_paud': 'ranPaud',
            'ranPaud': 'ranPaud',
            'news': 'news',
            'pembelajaran': 'pembelajaran',
            'faq': 'faq',
            'users': 'users'
          };
          
          const moduleName = moduleMap[perm.module] || perm.module;
          
          if (newPermissions[moduleName]) {
            newPermissions[moduleName] = {
              create: perm.actions.includes('create'),
              read: perm.actions.includes('read'),
              update: perm.actions.includes('update'),
              delete: perm.actions.includes('delete')
            };
          }
        }
      });
      
      // Set based on role
      if (['super_admin'].includes(user.role)) {
        newPermissions.users = { create: true, read: true, update: true, delete: true };
      }
      
      user.permissions = newPermissions;
      console.log('✅ Permissions converted successfully');
    }
    
    // If permissions is missing or null, set defaults
    if (!user.permissions || typeof user.permissions !== 'object') {
      console.log('🔧 Setting default permissions for user:', user.email);
      
      const defaultPermissions = {
        ranPaud: { create: true, read: true, update: true, delete: true },
        news: { create: true, read: true, update: true, delete: true },
        pembelajaran: { create: true, read: true, update: true, delete: true },
        faq: { create: true, read: true, update: true, delete: true },
        users: { create: false, read: false, update: false, delete: false }
      };
      
      if (['super_admin'].includes(user.role)) {
        defaultPermissions.users = { create: true, read: true, update: true, delete: true };
      }
      
      user.permissions = defaultPermissions;
      console.log('✅ Default permissions set');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error fixing permissions structure:', error);
    return false;
  }
};

// =================
// AUTHENTICATION ROUTES
// =================

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password diperlukan",
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // ===== FIX: Konversi permissions array ke object jika perlu =====
    const permissionsFixed = fixPermissionsStructure(user);
    if (!permissionsFixed) {
      console.error('❌ Failed to fix permissions structure');
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan sistem permissions",
      });
    }
    // ===== END FIX =====

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Akun tidak aktif",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Generate JWT token with updated role
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role, // This will be the updated role
        klId: user.klId || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Convert old roles to new roles if needed - FIXED FOR SISMONEV PAUD HI
    let roleUpdated = false;
    if (user.role === "admin") {
      user.role = "admin"; // Keep as admin, don't convert
      roleUpdated = true;
    }
    // ❌ REMOVED: admin_utama role no longer exists
    // All admin_utama users will be converted to super_admin via migration script
    // Superadmin role must remain super_admin for SISMONEV PAUD HI

    // Update last login and save (with try-catch to handle potential save errors)
    try {
      user.lastLogin = new Date();
      await user.save();
      console.log('✅ User data saved successfully');
    } catch (saveError) {
      console.error('❌ Error saving user data:', saveError);
      // Continue with login even if save fails
      console.log('⚠️ Continuing login despite save error');
    }

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: user.role, // This will be the updated role
      klId: user.klId,
      klName: user.klName,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      permissions: user.permissions // Include fixed permissions
    };

    console.log('✅ Login successful for:', user.email, `(${user.role})`);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login",
      error: error.message,
    });
  }
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, username, fullName, role, klId } = req.body;

    // Validation
    if (!email || !password || !username || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Semua field diperlukan",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email atau username sudah terdaftar",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      username,
      fullName,
      role: role || "user",
      klId: klId || null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
        klId: newUser.klId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data (without password)
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      fullName: newUser.fullName,
      role: newUser.role,
      klId: newUser.klId,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat registrasi",
      error: error.message,
    });
  }
});

// POST /api/auth/logout
router.post("/logout", async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat logout",
      error: error.message,
    });
  }
});

// GET /api/auth/verify
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    // ===== FIX: Apply permissions fix for verify route too =====
    fixPermissionsStructure(user);
    // ===== END FIX =====

    res.status(200).json({
      success: true,
      message: "Token valid",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        klId: user.klId,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        permissions: user.permissions
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Token tidak valid",
      error: error.message,
    });
  }
});

// GET /api/auth/profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // ===== FIX: Apply permissions fix for profile route too =====
    fixPermissionsStructure(user);
    // ===== END FIX =====

    res.status(200).json({
      success: true,
      message: "Profile berhasil diambil",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        klId: user.klId,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        permissions: user.permissions
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil profile",
      error: error.message,
    });
  }
});

// PUT /api/auth/profile
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // ===== FIX: Apply permissions fix before save =====
    fixPermissionsStructure(user);
    // ===== END FIX =====

    const { fullName, username, email } = req.body;

    // Update fields
    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (email) user.email = email.toLowerCase();

    user.updatedAt = new Date();
    
    // Save with try-catch to handle potential save errors
    try {
      await user.save();
      console.log('✅ Profile updated successfully');
    } catch (saveError) {
      console.error('❌ Error saving profile update:', saveError);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat menyimpan profile",
        error: saveError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile berhasil diupdate",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        klId: user.klId,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        updatedAt: user.updatedAt,
        permissions: user.permissions
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat update profile",
      error: error.message,
    });
  }
});

// POST /api/auth/change-password
router.post("/change-password", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // ===== FIX: Apply permissions fix before save =====
    fixPermissionsStructure(user);
    // ===== END FIX =====

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password dan new password diperlukan",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password salah",
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    
    // Save with try-catch to handle potential save errors
    try {
      await user.save();
      console.log('✅ Password changed successfully');
    } catch (saveError) {
      console.error('❌ Error saving password change:', saveError);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat menyimpan password baru",
        error: saveError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengubah password",
      error: error.message,
    });
  }
});

module.exports = router;