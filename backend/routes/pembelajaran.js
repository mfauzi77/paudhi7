// routes/pembelajaran.js - Backend Routes untuk Pembelajaran
const express = require("express");
const router = express.Router();
const Pembelajaran = require("../models/Pembelajaran");
const { authenticate, requireKLAccess } = require("../middleware/auth");
const {
  restrictToOwnKL,
  filterByKL,
  validateDataAccess,
} = require("../middleware/klAccessControl");

// ===== GET ALL PEMBELAJARAN =====
router.get("/", async (req, res) => {
  try {
    const {
      type,
      page = 1,
      limit = 10,
      search,
      category,
      aspect,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    console.log("📚 GET /pembelajaran - Query params:", req.query);

    // Build filter
    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = new RegExp(category, "i");
    if (aspect) filter.aspect = aspect;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    console.log("🔍 Filter applied:", filter);

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Pembelajaran.countDocuments(filter);
    const data = await Pembelajaran.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    console.log(`✅ Found ${data.length} pembelajaran items (${total} total)`);

    res.json({
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("❌ Get pembelajaran error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== GET PEMBELAJARAN BY ID =====
router.get("/:id", async (req, res) => {
  try {
    console.log(`📖 GET /pembelajaran/${req.params.id}`);

    const pembelajaran = await Pembelajaran.findById(req.params.id);
    if (!pembelajaran) {
      console.log("❌ Pembelajaran not found");
      return res.status(404).json({ message: "Pembelajaran tidak ditemukan" });
    }

    console.log("✅ Pembelajaran found:", pembelajaran.title);
    res.json(pembelajaran);
  } catch (error) {
    console.error("❌ Get pembelajaran by ID error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== CREATE PEMBELAJARAN =====
router.post("/", authenticate, restrictToOwnKL, async (req, res) => {
  try {
    console.log("📝 POST /pembelajaran - Creating new pembelajaran");
    console.log("📦 Request body:", req.body);

    const {
      title,
      description,
      type,
      category,
      author,
      ageGroup,
      aspect,
      tags,
      stakeholder,
      thumbnail,
      publishDate,
      isActive = true,
      // Panduan specific
      pages,
      pdfUrl,
      // Video specific
      youtubeId,
      duration,
      // Tools specific
      format,
      features,
      usage,
    } = req.body;

    // Validation
    if (!title || !description || !type || !category || !author) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        message: "Field wajib: title, description, type, category, author",
      });
    }

    // Type specific validation
    if (type === "panduan" && !pdfUrl) {
      return res.status(400).json({ message: "PDF URL wajib untuk panduan" });
    }
    if (type === "video" && !youtubeId) {
      return res.status(400).json({ message: "YouTube ID wajib untuk video" });
    }
    if (type === "tools" && !format) {
      return res.status(400).json({ message: "Format wajib untuk tools" });
    }

    // Create pembelajaran
    const pembelajaran = new Pembelajaran({
      title: title.trim(),
      description: description.trim(),
      type,
      category: category.trim(),
      author: author.trim(),
      ageGroup,
      aspect,
      tags: Array.isArray(tags) ? tags : [],
      stakeholder,
      thumbnail,
      publishDate: publishDate || new Date(),
      isActive,
      // Stats
      views: 0,
      downloads: 0,
      likes: 0,
      rating: 0,
      // User info
      createdBy: req.user.email,
      createdByFullName: req.user.fullName,
      createdByKL: req.user.klName,
      // Type specific fields
      ...(type === "panduan" && {
        pages: pages ? parseInt(pages) : undefined,
        pdfUrl,
      }),
      ...(type === "video" && {
        youtubeId,
        duration,
      }),
      ...(type === "tools" && {
        format,
        features: Array.isArray(features) ? features : [],
        usage,
      }),
    });

    const savedPembelajaran = await pembelajaran.save();

    console.log(
      "✅ Pembelajaran created successfully:",
      savedPembelajaran.title
    );

    res.status(201).json({
      message: "Pembelajaran berhasil dibuat",
      pembelajaran: savedPembelajaran,
    });
  } catch (error) {
    console.error("❌ Create pembelajaran error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// ===== UPDATE PEMBELAJARAN =====
router.put("/:id", authenticate, validateDataAccess("Pembelajaran"), restrictToOwnKL, async (req, res) => {
  try {
    console.log(
      `📝 PUT /pembelajaran/${req.params.id} - Updating pembelajaran`
    );

    const pembelajaran = await Pembelajaran.findById(req.params.id);
    if (!pembelajaran) {
      console.log("❌ Pembelajaran not found for update");
      return res.status(404).json({ message: "Pembelajaran tidak ditemukan" });
    }

    // Update fields
    const allowedFields = [
      "title",
      "description",
      "category",
      "author",
      "ageGroup",
      "aspect",
      "tags",
      "stakeholder",
      "thumbnail",
      "publishDate",
      "isActive",
      "pages",
      "pdfUrl",
      "youtubeId",
      "duration",
      "format",
      "features",
      "usage",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        pembelajaran[field] = req.body[field];
      }
    });

    pembelajaran.updatedAt = new Date();
    const savedPembelajaran = await pembelajaran.save();

    console.log(
      "✅ Pembelajaran updated successfully:",
      savedPembelajaran.title
    );

    res.json({
      message: "Pembelajaran berhasil diupdate",
      pembelajaran: savedPembelajaran,
    });
  } catch (error) {
    console.error("❌ Update pembelajaran error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// ===== DELETE PEMBELAJARAN =====
router.delete("/:id", authenticate, validateDataAccess("Pembelajaran"), async (req, res) => {
  try {
    console.log(`🗑️ DELETE /pembelajaran/${req.params.id}`);

    const pembelajaran = await Pembelajaran.findById(req.params.id);
    if (!pembelajaran) {
      console.log("❌ Pembelajaran not found for delete");
      return res.status(404).json({ message: "Pembelajaran tidak ditemukan" });
    }

    await Pembelajaran.findByIdAndDelete(req.params.id);

    console.log("✅ Pembelajaran deleted successfully:", pembelajaran.title);

    res.json({ message: "Pembelajaran berhasil dihapus" });
  } catch (error) {
    console.error("❌ Delete pembelajaran error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== TOGGLE STATUS =====
router.patch("/:id/toggle", async (req, res) => {
  try {
    console.log(`🔄 PATCH /pembelajaran/${req.params.id}/toggle`);

    const pembelajaran = await Pembelajaran.findById(req.params.id);
    if (!pembelajaran) {
      console.log("❌ Pembelajaran not found for toggle");
      return res.status(404).json({ message: "Pembelajaran tidak ditemukan" });
    }

    pembelajaran.isActive = !pembelajaran.isActive;
    pembelajaran.updatedAt = new Date();

    const savedPembelajaran = await pembelajaran.save();

    console.log(
      `✅ Pembelajaran status toggled: ${
        pembelajaran.isActive ? "active" : "inactive"
      }`
    );

    res.json({
      message: `Pembelajaran berhasil ${
        pembelajaran.isActive ? "diaktifkan" : "dinonaktifkan"
      }`,
      pembelajaran: savedPembelajaran,
    });
  } catch (error) {
    console.error("❌ Toggle status error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== BULK OPERATIONS =====
router.post("/bulk", async (req, res) => {
  try {
    console.log("📦 POST /pembelajaran/bulk - Bulk operation");
    console.log("📦 Request body:", req.body);

    const { type, ids } = req.body;

    if (!type || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Type dan IDs wajib diisi" });
    }

    let result;
    switch (type) {
      case "delete":
        result = await Pembelajaran.deleteMany({ _id: { $in: ids } });
        console.log(`✅ Bulk delete: ${result.deletedCount} items deleted`);
        res.json({
          message: `${result.deletedCount} pembelajaran berhasil dihapus`,
          deletedCount: result.deletedCount,
        });
        break;

      case "activate":
        result = await Pembelajaran.updateMany(
          { _id: { $in: ids } },
          { isActive: true, updatedAt: new Date() }
        );
        console.log(
          `✅ Bulk activate: ${result.modifiedCount} items activated`
        );
        res.json({
          message: `${result.modifiedCount} pembelajaran berhasil diaktifkan`,
          modifiedCount: result.modifiedCount,
        });
        break;

      case "deactivate":
        result = await Pembelajaran.updateMany(
          { _id: { $in: ids } },
          { isActive: false, updatedAt: new Date() }
        );
        console.log(
          `✅ Bulk deactivate: ${result.modifiedCount} items deactivated`
        );
        res.json({
          message: `${result.modifiedCount} pembelajaran berhasil dinonaktifkan`,
          modifiedCount: result.modifiedCount,
        });
        break;

      default:
        return res.status(400).json({ message: "Type tidak valid" });
    }
  } catch (error) {
    console.error("❌ Bulk operation error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== UPDATE STATS (views, downloads, likes) =====
router.patch("/:id/stats", async (req, res) => {
  try {
    console.log(`📊 PATCH /pembelajaran/${req.params.id}/stats`);

    const { type } = req.body; // 'view', 'download', 'like'

    const pembelajaran = await Pembelajaran.findById(req.params.id);
    if (!pembelajaran) {
      console.log("❌ Pembelajaran not found for stats update");
      return res.status(404).json({ message: "Pembelajaran tidak ditemukan" });
    }

    switch (type) {
      case "view":
        pembelajaran.views = (pembelajaran.views || 0) + 1;
        console.log(`👀 View count updated: ${pembelajaran.views}`);
        break;
      case "download":
        pembelajaran.downloads = (pembelajaran.downloads || 0) + 1;
        console.log(`📥 Download count updated: ${pembelajaran.downloads}`);
        break;
      case "like":
        pembelajaran.likes = (pembelajaran.likes || 0) + 1;
        console.log(`❤️ Like count updated: ${pembelajaran.likes}`);
        break;
      default:
        return res.status(400).json({ message: "Type stats tidak valid" });
    }

    pembelajaran.updatedAt = new Date();
    const savedPembelajaran = await pembelajaran.save();

    res.json({
      message: `${type} berhasil diupdate`,
      pembelajaran: savedPembelajaran,
    });
  } catch (error) {
    console.error("❌ Update stats error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== GET POPULAR PEMBELAJARAN =====
router.get("/popular/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 10 } = req.query;

    console.log(`🔥 GET /pembelajaran/popular/${type}`);

    const data = await Pembelajaran.getPopular(type, parseInt(limit));

    console.log(`✅ Found ${data.length} popular ${type} items`);

    res.json({
      data,
      type,
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error("❌ Get popular pembelajaran error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== SEARCH PEMBELAJARAN =====
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { type } = req.query;

    console.log(`🔍 GET /pembelajaran/search/${query}?type=${type || "all"}`);

    const data = await Pembelajaran.search(query, type);

    console.log(`✅ Search results: ${data.length} items found`);

    res.json({
      data,
      query,
      type: type || "all",
      count: data.length,
    });
  } catch (error) {
    console.error("❌ Search pembelajaran error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ===== GET STATS SUMMARY =====
router.get("/stats/summary", async (req, res) => {
  try {
    console.log("📊 GET /pembelajaran/stats/summary");

    const totalCount = await Pembelajaran.countDocuments();
    const activeCount = await Pembelajaran.countDocuments({ isActive: true });
    const typeStats = await Pembelajaran.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          totalDownloads: { $sum: "$downloads" },
          totalLikes: { $sum: "$likes" },
        },
      },
    ]);

    const stats = {
      total: totalCount,
      active: activeCount,
      inactive: totalCount - activeCount,
      byType: typeStats.reduce((acc, item) => {
        acc[item._id] = {
          count: item.count,
          views: item.totalViews,
          downloads: item.totalDownloads,
          likes: item.totalLikes,
        };
        return acc;
      }, {}),
    };

    console.log("✅ Stats summary generated:", stats);

    res.json(stats);
  } catch (error) {
    console.error("❌ Get stats summary error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
