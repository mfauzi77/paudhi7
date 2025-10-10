// routes/users.js
const express = require("express");
const User = require("../models/User");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Middleware to check if user is admin_utama or admin/super_admin
const requireAdminUtama = (req, res, next) => {
  if (!["admin_utama", "admin", "super_admin"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message:
        "Akses ditolak. Hanya Admin Utama yang dapat mengakses fitur ini.",
    });
  }
  next();
};

// GET /api/users - Get all users (admin_utama only)
router.get("/", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("👥 Users GET request");

    const { page = 1, limit = 10, search, role, status } = req.query;

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    if (role && role !== "all") {
      query.role = role;
    }

    if (status && status !== "all") {
      query.isActive = status === "active";
    }

    // Execute query
    const users = await User.find(query)
      .select("-password") // Don't send passwords
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    console.log(`✅ Found ${users.length} users, total: ${total}`);

    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("❌ Users GET error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data users",
      error: error.message,
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get("/:id", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("👤 User GET by ID:", req.params.id);

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    console.log("✅ User retrieved");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("❌ User GET error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data user",
      error: error.message,
    });
  }
});

// POST /api/users - Create new user
router.post("/", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("👤 Creating new user...");
    console.log("Request body:", req.body);

    const userData = {
      ...req.body,
      createdBy: req.user.email || "admin@paudhi.kemenko.go.id",
    };

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username atau email sudah digunakan",
      });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    console.log("✅ User created successfully");

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: userResponse,
    });
  } catch (error) {
    console.error("❌ User POST error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat membuat user",
      error: error.message,
    });
  }
});

// PUT /api/users/:id - Update user
router.put("/:id", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("🔄 Updating user...");
    console.log("ID:", req.params.id);
    console.log("Request body:", req.body);

    const updateData = {
      ...req.body,
      updatedBy: req.user.email || "admin@paudhi.kemenko.go.id",
    };

    // If password is empty, don't update it
    if (!updateData.password) {
      delete updateData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    console.log("✅ User updated successfully");

    res.json({
      success: true,
      message: "User berhasil diperbarui",
      data: updatedUser,
    });
  } catch (error) {
    console.error("❌ User PUT error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat memperbarui user",
      error: error.message,
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete("/:id", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("🗑️ Deleting user...");
    console.log("ID:", req.params.id);

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    console.log("✅ User deleted successfully");

    res.json({
      success: true,
      message: "User berhasil dihapus",
      data: { _id: deletedUser._id },
    });
  } catch (error) {
    console.error("❌ User DELETE error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat menghapus user",
      error: error.message,
    });
  }
});

// PATCH /api/users/:id/toggle-status - Toggle user status
router.patch(
  "/:id/toggle-status",
  authenticate,
  requireAdminUtama,
  async (req, res) => {
    try {
      console.log("🔄 Toggling user status...");
      console.log("ID:", req.params.id);

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      user.isActive = !user.isActive;
      user.updatedBy = req.user.email || "admin@paudhi.kemenko.go.id";
      await user.save();

      console.log(
        `✅ User status toggled to ${user.isActive ? "active" : "inactive"}`
      );

      res.json({
        success: true,
        message: `User berhasil ${
          user.isActive ? "diaktifkan" : "dinonaktifkan"
        }`,
        data: {
          _id: user._id,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      console.error("❌ User status toggle error:", error);
      res.status(500).json({
        success: false,
        message: "Error saat mengubah status user",
        error: error.message,
      });
    }
  }
);

// GET /api/users/kl-list - Get K/L list for user creation
router.get("/kl-list", authenticate, requireAdminUtama, async (req, res) => {
  try {
    console.log("📋 Getting K/L list for user creation...");

    const klList = User.getKLList();

    console.log("✅ K/L list retrieved");

    res.json({
      success: true,
      message: "Daftar K/L berhasil diambil",
      data: klList,
    });
  } catch (error) {
    console.error("❌ K/L list error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil daftar K/L",
      error: error.message,
    });
  }
});

module.exports = router;
