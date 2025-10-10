// routes/ranpaud.js - FIXED VERSION - Using MongoDB database
const express = require("express");
const RanPaud = require("../models/RanPaud");
const {
  authenticate,
  authorize,
  requireKLAccess,
} = require("../middleware/auth");
const {
  restrictToOwnKL,
  filterByKL,
  validateDataAccess,
  validateBulkKLAccess,
  getKLFilter,
} = require("../middleware/klAccessControl");

const router = express.Router();

// Helper to sanitize indikator/tahunData payload to satisfy schema
const toNumberOrZero = (v) => {
  if (v === null || v === undefined || v === '') return 0;
  const n = typeof v === 'string' ? parseFloat(v.replace(/,/g, '.')) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

const normalizeKategori = (k) => {
  if (!k) return 'BELUM LAPORAN';
  const up = String(k).toUpperCase().trim();
  const allowed = ['TERCAPAI', 'TIDAK TERCAPAI', 'BELUM LAPORAN'];
  return allowed.includes(up) ? up : 'BELUM LAPORAN';
};

const sanitizeRanPaudPayload = (payload) => {
  if (!payload || !Array.isArray(payload.indikators)) return payload;
  const safe = { ...payload };
  safe.indikators = payload.indikators.map((indikator) => {
    const ind = { ...indikator };
    if (!ind.targetSatuan) ind.targetSatuan = "Unit";
    ind.jumlahRO = toNumberOrZero(ind.jumlahRO);
    if (Array.isArray(ind.tahunData)) {
      ind.tahunData = ind.tahunData.map((td) => {
        const tahunData = { ...td };
        // Coerce tahun to number when possible
        if (tahunData.tahun !== undefined && tahunData.tahun !== null) {
          const t = parseInt(tahunData.tahun, 10);
          tahunData.tahun = isNaN(t) ? tahunData.tahun : t;
        }
        // Treat '-' as not reported (BELUM LAPORAN) and keep 0 values
        const targetRaw = tahunData.target;
        const realRaw = tahunData.realisasi;
        const isNotReported = (v) => v === '-' || v === undefined || v === null || v === '';

        tahunData.target = isNotReported(targetRaw) ? 0 : toNumberOrZero(targetRaw);
        tahunData.realisasi = isNotReported(realRaw) ? 0 : toNumberOrZero(realRaw);
        // If both are not reported (i.e., were '-') mark as BELUM LAPORAN regardless of numbers
        if (isNotReported(targetRaw) && isNotReported(realRaw)) {
          tahunData.persentase = 0;
          tahunData.kategori = 'BELUM LAPORAN';
        } else if (tahunData.target === 0 && tahunData.realisasi === 0) {
          tahunData.persentase = 0;
          tahunData.kategori = 'BELUM LAPORAN';
        } else if (tahunData.target > 0) {
          // Compute percentage if target is positive
          const pct = Math.round((tahunData.realisasi / Math.max(1, tahunData.target)) * 100);
          tahunData.persentase = toNumberOrZero(pct);
          tahunData.kategori = normalizeKategori(
            pct >= 100 ? 'TERCAPAI' : (pct > 0 ? 'TIDAK TERCAPAI' : 'BELUM LAPORAN')
          );
        } else {
          // Non-positive target but some values present → keep as BELUM LAPORAN
          tahunData.persentase = 0;
          tahunData.kategori = 'BELUM LAPORAN';
        }
        return tahunData;
      });
    }
    return ind;
  });
  return safe;
};

// GET /api/ran-paud - Get all RAN PAUD data (authenticated)
router.get("/", authenticate, async (req, res) => {
  try {
    console.log("📊 RAN PAUD GET request received");
    const { page = 1, limit = 10, search, klId, status } = req.query;
    
    let query = { isActive: true };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { program: { $regex: search, $options: 'i' } },
        { klName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by KL if specified
    if (klId) {
      query.klId = klId;
    }
    
    // Filter by status if specified
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const ranPaud = await RanPaud.find(query)
      .populate("createdBy", "fullName email klName")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await RanPaud.countDocuments(query);

    res.json({
      success: true,
      data: ranPaud,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("❌ RAN PAUD GET error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data RAN PAUD",
      error: error.message,
    });
  }
});

// POST /api/ran-paud - Create new RAN PAUD data
router.post("/", authenticate, restrictToOwnKL, async (req, res) => {
  try {
    console.log("📝 Creating new RAN PAUD data...");
    console.log("Request body:", req.body);

    // Validate required fields
    if (!req.body.klId || !req.body.program) {
      return res.status(400).json({
        success: false,
        message: "K/L dan Program harus diisi",
      });
    }

    // Validate indikators array
    if (
      !req.body.indikators ||
      !Array.isArray(req.body.indikators) ||
      req.body.indikators.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimal satu indikator harus diisi",
      });
    }

    // Validate each indikator
    for (let i = 0; i < req.body.indikators.length; i++) {
      const indikator = req.body.indikators[i];
      if (!indikator.indikator || !indikator.targetSatuan) {
        return res.status(400).json({
          success: false,
          message: `Indikator #${
            i + 1
          }: Indikator dan Target/Satuan harus diisi`,
        });
      }
    }

    // ✅ Sanitize payload & set default status to draft for new entries
    const sanitizedBody = sanitizeRanPaudPayload(req.body);
    // Compute top-level jumlahRO as sum of indikator.jumlahRO (fallback to 0)
    const totalRO = Array.isArray(sanitizedBody.indikators)
      ? sanitizedBody.indikators.reduce((sum, ind) => sum + (Number.isFinite(Number(ind.jumlahRO)) ? Number(ind.jumlahRO) : 0), 0)
      : 0;

    const ranPaudData = {
      ...sanitizedBody,
      jumlahRO: totalRO,
      status: req.body.status || "draft", // Default to draft for new entries
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    const newRanPaud = new RanPaud(ranPaudData);
    const savedData = await newRanPaud.save();

    console.log("✅ Data saved to database. ID:", savedData._id);

    res.status(201).json({
      success: true,
      message: "Data RAN PAUD berhasil dibuat",
      data: savedData,
    });
  } catch (error) {
    console.error("❌ RAN PAUD POST error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat membuat data RAN PAUD HI",
      error: error.message,
    });
  }
});

// PUT /api/ran-paud/:id - Update RAN PAUD data
router.put("/:id", authenticate, validateDataAccess("RanPaud"), restrictToOwnKL, async (req, res) => {
  try {
    console.log("🔄 Updating RAN PAUD data...");
    console.log("ID:", req.params.id);
    console.log("Request body:", req.body);

    // Validate required fields
    if (!req.body.klId || !req.body.program) {
      return res.status(400).json({
        success: false,
        message: "K/L dan Program harus diisi",
      });
    }

    // Validate indikators array
    if (
      !req.body.indikators ||
      !Array.isArray(req.body.indikators) ||
      req.body.indikators.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimal satu indikator harus diisi",
      });
    }

    // Validate each indikator
    for (let i = 0; i < req.body.indikators.length; i++) {
      const indikator = req.body.indikators[i];
      if (!indikator.indikator || !indikator.targetSatuan) {
        return res.status(400).json({
          success: false,
          message: `Indikator #${
            i + 1
          }: Indikator dan Target/Satuan harus diisi`,
        });
      }
    }

    // Sanitize then compute jumlahRO from indikator array on update
    const sanitizedUpdate = sanitizeRanPaudPayload(req.body);
    const totalUpdateRO = Array.isArray(sanitizedUpdate.indikators)
      ? sanitizedUpdate.indikators.reduce((sum, ind) => sum + (Number.isFinite(Number(ind.jumlahRO)) ? Number(ind.jumlahRO) : 0), 0)
      : 0;

    const updateData = {
      ...sanitizedUpdate,
      jumlahRO: totalUpdateRO,
      updatedBy: req.user._id,
    };

    const updatedData = await RanPaud.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan",
      });
    }

    console.log("✅ Data updated successfully");

    res.json({
      success: true,
      message: "Data RAN PAUD berhasil diperbarui",
      data: updatedData,
    });
  } catch (error) {
    console.error("❌ RAN PAUD PUT error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat memperbarui data RAN PAUD HI",
      error: error.message,
    });
  }
});

// DELETE /api/ran-paud/:id - Delete individual RAN PAUD data
router.delete("/:id", authenticate, validateDataAccess("RanPaud"), async (req, res) => {
  try {
    console.log("🗑️ Deleting RAN PAUD data...");
    console.log("ID:", req.params.id);

    const deletedData = await RanPaud.findByIdAndDelete(req.params.id);

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan",
      });
    }

    console.log("✅ Data deleted successfully");

    res.json({
      success: true,
      message: "Data RAN PAUD berhasil dihapus",
      data: deletedData,
    });
  } catch (error) {
    console.error("❌ RAN PAUD DELETE error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat menghapus data RAN PAUD HI",
      error: error.message,
    });
  }
});



// POST /api/ran-paud/bulk - Bulk operations (delete, update)
router.post("/bulk", authenticate, validateBulkKLAccess, async (req, res) => {
  try {
    console.log("🔄 Bulk operation:", req.body.operation);
    console.log("Items:", req.body.items);

    const { operation, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required",
      });
    }

    let result;

    switch (operation) {
      case "delete":
        result = await RanPaud.deleteMany({ _id: { $in: items } });
        console.log(`✅ Deleted ${result.deletedCount} items`);
        break;

      case "update":
        const { updateData } = req.body;
        result = await RanPaud.updateMany(
          { _id: { $in: items } },
          {
            ...updateData,
            updatedBy: req.user.email || "admin@paudhi.kemenko.go.id",
          }
        );
        console.log(`✅ Updated ${result.modifiedCount} items`);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid operation",
        });
    }

    res.json({
      success: true,
      message: `Bulk ${operation} completed successfully`,
      result,
    });
  } catch (error) {
    console.error("❌ RAN PAUD BULK error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat melakukan bulk operation",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-list - Get K/L list
router.get("/kl-list", authenticate, async (req, res) => {
  try {
    console.log("📋 Getting K/L list...");

    const klList = RanPaud.getKLList();

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

// GET /api/ran-paud/dashboard - Get dashboard data (legacy route for compatibility)
router.get("/dashboard", async (req, res) => {
  try {
    console.log("📊 Dashboard request received (legacy route)");
    const { year } = req.query;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();

    console.log(`📅 Processing dashboard data for year: ${selectedYear}`);

    // Get all active RAN PAUD data
    const allData = await RanPaud.find({ isActive: true });

    // Calculate stats based on tahunData kategori
    let totalTercapai = 0;
    let totalProgress = 0;
    let totalBelum = 0;
    let totalRO = 0;
    let totalProgram = allData.length;

    allData.forEach((item) => {
      totalRO += item.jumlahRO || 0;

      // Count by tahunData kategori
      if (item.indikators && item.indikators.length > 0) {
        item.indikators.forEach((indikator) => {
          if (indikator.tahunData && indikator.tahunData.length > 0) {
            indikator.tahunData.forEach((tahunData) => {
              if (tahunData.tahun === selectedYear) {
                if (tahunData.kategori === "TERCAPAI") {
                  totalTercapai++;
                } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                  totalProgress++;
                } else {
                  totalBelum++;
                }
              }
            });
          }
        });
      } else {
        // Legacy support for old structure
        if (item.tahunData && item.tahunData.length > 0) {
          item.tahunData.forEach((tahunData) => {
            if (tahunData.tahun === selectedYear) {
              if (tahunData.kategori === "TERCAPAI") {
                totalTercapai++;
              } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                totalProgress++;
              } else {
                totalBelum++;
              }
            }
          });
        }
      }
    });

    // Get KL summary
    const summary = await RanPaud.getSummaryByKL();

    console.log("✅ Dashboard stats calculated:", {
      totalProgram,
      totalTercapai,
      totalProgress,
      totalBelum,
      totalRO,
    });

    res.json({
      success: true,
      message: "Data dashboard RAN PAUD HI berhasil diambil",
      data: {
        klSummary: summary,
        totalRO,
        totalProgram,
        totalDone: totalTercapai,
        totalProgress,
        totalBelum,
        year: selectedYear
      }
    });
  } catch (error) {
    console.error("❌ Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data dashboard",
      error: error.message,
    });
  }
});

// ✅ Fixed: GET /api/ran-paud/summary - Get summary statistics with proper calculation
router.get("/summary", authenticate, async (req, res) => {
  try {
    console.log("📈 RAN PAUD summary stats request");

    // Get all active RAN PAUD data
    const allData = await RanPaud.find({ isActive: true });

    // Calculate stats based on tahunData kategori
    let totalTercapai = 0;
    let totalProgress = 0;
    let totalBelum = 0;
    let totalRO = 0;
    let totalProgram = allData.length;

    allData.forEach((item) => {
      totalRO += item.jumlahRO || 0;

      // Count by tahunData kategori
      if (item.indikators && item.indikators.length > 0) {
        item.indikators.forEach((indikator) => {
          indikator.tahunData.forEach((tahunData) => {
            if (tahunData.kategori === "TERCAPAI") {
              totalTercapai++;
            } else if (tahunData.kategori === "TIDAK TERCAPAI") {
              totalProgress++;
            } else {
              totalBelum++;
            }
          });
        });
      } else {
        // Legacy support for old structure
        if (item.tahunData && item.tahunData.length > 0) {
          item.tahunData.forEach((tahunData) => {
            if (tahunData.kategori === "TERCAPAI") {
              totalTercapai++;
            } else if (tahunData.kategori === "TIDAK TERCAPAI") {
              totalProgress++;
            } else {
              totalBelum++;
            }
          });
        }
      }
    });

    const summary = await RanPaud.getSummaryByKL();

    console.log("✅ Summary stats calculated:", {
      totalProgram,
      totalTercapai,
      totalProgress,
      totalBelum,
      totalRO,
    });

    res.json({
      success: true,
      message: "Data summary RAN PAUD HI berhasil diambil",
      data: {
        klSummary: summary,
        totalRO,
        totalProgram,
        totalDone: totalTercapai,
        totalProgress,
        totalBelum,
      },
    });
  } catch (error) {
    console.error("❌ Summary stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil summary statistics",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/export - Export RAN PAUD data
router.post("/export", authenticate, async (req, res) => {
  try {
    console.log("📤 RAN PAUD export request");
    console.log("Export params:", req.body);

    const { format = "excel", filters = {} } = req.body;

    // Build query based on filters
    const query = { isActive: true };

    if (filters.klId && filters.klId !== "select") {
      query.klId = filters.klId;
    }

    if (filters.status && filters.status !== "all") {
      query.statusPelaporan = filters.status;
    }

    if (filters.search) {
      query.$or = [
        { program: { $regex: filters.search, $options: "i" } },
        { indikator: { $regex: filters.search, $options: "i" } },
        { klName: { $regex: filters.search, $options: "i" } },
      ];
    }

    const data = await RanPaud.find(query).sort({ createdAt: -1 });

    console.log(`✅ Export data retrieved: ${data.length} records`);

    if (format === "preview") {
      // Return preview data as JSON
      res.json({
        success: true,
        message: "Data preview berhasil dibuat",
        data: {
          format,
          filters,
          records: data,
          totalRecords: data.length,
          exportDate: new Date().toISOString(),
        },
      });
    } else {
      // Generate actual file for download
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("RAN PAUD Data");

      // Add headers
      worksheet.columns = [
        { header: "K/L ID", key: "klId", width: 15 },
        { header: "K/L Name", key: "klName", width: 20 },
        { header: "Program", key: "program", width: 30 },
        { header: "Indikator", key: "indikator", width: 30 },
        { header: "Target/Satuan", key: "targetSatuan", width: 20 },
        { header: "Jumlah RO", key: "jumlahRO", width: 15 },
        { header: "Status", key: "statusPelaporan", width: 20 },
        { header: "Notes", key: "notes", width: 30 },
        { header: "Created At", key: "createdAt", width: 20 },
      ];

      // Add data rows
      data.forEach((item) => {
        worksheet.addRow({
          klId: item.klId,
          klName: item.klName,
          program: item.program,
          indikator: item.indikator,
          targetSatuan: item.targetSatuan,
          jumlahRO: item.jumlahRO,
          statusPelaporan: item.statusPelaporan,
          notes: item.notes || "",
          createdAt: new Date(item.createdAt).toLocaleDateString("id-ID"),
        });
      });

      // Style the header
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE0E0E0" },
      };

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `ran-paud-export-${timestamp}.xlsx`;

      // Set response headers for file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      // Write to response
      await workbook.xlsx.write(res);
      res.end();
    }
  } catch (error) {
    console.error("❌ Export error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat export data",
      error: error.message,
    });
  }
});

// POST /api/ran-paud/import - Import RAN PAUD data
router.post("/import", authenticate, async (req, res) => {
  try {
    console.log("📥 RAN PAUD import request");
    console.log("Import params:", req.body);

    const { data, overwrite = false } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "Data array is required",
      });
    }

    let importedCount = 0;
    let updatedCount = 0;
    let errors = [];

    for (const item of data) {
      try {
        const importData = {
          ...item,
          createdBy: req.user.email || "admin@paudhi.kemenko.go.id",
          updatedBy: req.user.email || "admin@paudhi.kemenko.go.id",
        };

        if (overwrite && item._id) {
          // Update existing record
          const result = await RanPaud.findByIdAndUpdate(item._id, importData, {
            new: true,
          });
          if (result) {
            updatedCount++;
          }
        } else {
          // Create new record
          const newRecord = new RanPaud(importData);
          await newRecord.save();
          importedCount++;
        }
      } catch (error) {
        errors.push({
          item: item.program || "Unknown",
          error: error.message,
        });
      }
    }

    console.log(
      `✅ Import completed: ${importedCount} imported, ${updatedCount} updated`
    );

    res.json({
      success: true,
      message: "Import data berhasil",
      data: {
        importedCount,
        updatedCount,
        totalProcessed: data.length,
        errors,
      },
    });
  } catch (error) {
    console.error("❌ Import error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat import data",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/achievement/:tahun - Get achievement by year
router.get("/achievement/:tahun", authenticate, async (req, res) => {
  try {
    console.log(
      `🏆 RAN PAUD achievement request for year: ${req.params.tahun}`
    );

    const tahun = parseInt(req.params.tahun);

    if (isNaN(tahun)) {
      return res.status(400).json({
        success: false,
        message: "Invalid year parameter",
      });
    }

    const achievement = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$tahunData" },
      { $match: { "tahunData.tahun": tahun } },
      {
        $group: {
          _id: "$klId",
          klName: { $first: "$klName" },
          totalRO: { $sum: "$jumlahRO" },
          tercapai: {
            $sum: {
              $cond: [{ $eq: ["$tahunData.kategori", "TERCAPAI"] }, 1, 0],
            },
          },
          tidakTercapai: {
            $sum: {
              $cond: [{ $eq: ["$tahunData.kategori", "TIDAK TERCAPAI"] }, 1, 0],
            },
          },
          belumLapor: {
            $sum: {
              $cond: [{ $eq: ["$tahunData.kategori", "BELUM LAPORAN"] }, 1, 0],
            },
          },
          avgPersentase: { $avg: "$tahunData.persentase" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.log(`✅ Achievement data retrieved for year ${tahun}`);

    res.json({
      success: true,
      message: `Data achievement tahun ${tahun} berhasil diambil`,
      data: achievement,
    });
  } catch (error) {
    console.error("❌ Achievement error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data achievement",
      error: error.message,
    });
  }
});

// PATCH /api/ran-paud/:id/status - Update status (Super Admin only)
router.patch("/:id/status", authenticate, authorize(["super_admin"]), async (req, res) => {
  try {
    console.log("🔄 Updating RAN PAUD status...");
    console.log("ID:", req.params.id);
    console.log("New status:", req.body.status);

    const { status } = req.body;

    // Validate status
    if (!status || !["draft", "submitted", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status harus salah satu dari: draft, submitted, approved, rejected",
      });
    }

    const ranPaud = await RanPaud.findById(req.params.id);

    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan",
      });
    }

    // Update status
    ranPaud.status = status;
    ranPaud.updatedBy = req.user._id;
    await ranPaud.save();

    console.log("✅ Status updated successfully");

    res.json({
      success: true,
      message: `Status berhasil diubah menjadi ${status}`,
      data: ranPaud,
    });
  } catch (error) {
    console.error("❌ Status update error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengubah status",
      error: error.message,
    });
  }
});

// PATCH /api/ran-paud/bulk-status - Bulk update status (Super Admin only)
router.patch("/bulk-status", authenticate, authorize(["super_admin"]), async (req, res) => {
  try {
    console.log("🔄 Bulk updating RAN PAUD status...");
    console.log("Request body:", req.body);

    const { ids, status } = req.body;

    // Validate inputs
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "IDs harus berupa array yang tidak kosong",
      });
    }

    if (!status || !["draft", "submitted", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status harus salah satu dari: draft, submitted, approved, rejected",
      });
    }

    // Update multiple records
    const result = await RanPaud.updateMany(
      { _id: { $in: ids }, isActive: true },
      { 
        status: status,
        updatedBy: req.user._id,
        updatedAt: new Date()
      }
    );

    console.log(`✅ Bulk status update completed: ${result.modifiedCount} records updated`);

    res.json({
      success: true,
      message: `Status berhasil diubah menjadi ${status} untuk ${result.modifiedCount} data`,
      data: {
        modifiedCount: result.modifiedCount,
        totalRequested: ids.length,
      },
    });
  } catch (error) {
    console.error("❌ Bulk status update error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengubah status secara bulk",
      error: error.message,
    });
  }
});

// ==================== DASHBOARD ENDPOINTS ====================

// GET /api/ran-paud/dashboard-summary - Get dashboard summary data by year
router.get("/dashboard-summary", async (req, res) => {
  try {
    console.log("📊 Dashboard summary request received");
    const { year } = req.query;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();

    console.log(`📅 Processing data for year: ${selectedYear}`);

    // Get summary data for the selected year
    const summaryData = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          tercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TERCAPAI"] }, 1, 0]
            }
          },
          tidakTercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TIDAK TERCAPAI"] }, 1, 0]
            }
          },
          belumLaporan: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "BELUM LAPORAN"] }, 1, 0]
            }
          },
          avgProgress: { $avg: "$indikators.tahunData.persentase" }
        }
      }
    ]);

    // Get KL statistics
    const klStats = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: "$klId",
          klName: { $first: "$klName" },
          total: { $sum: 1 },
          tercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TERCAPAI"] }, 1, 0]
            }
          },
          tidakTercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TIDAK TERCAPAI"] }, 1, 0]
            }
          },
          belumLaporan: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "BELUM LAPORAN"] }, 1, 0]
            }
          },
          avgProgress: { $avg: "$indikators.tahunData.persentase" }
        }
      },
      { $sort: { klName: 1 } }
    ]);

    const summary = summaryData[0] || {
      total: 0,
      tercapai: 0,
      tidakTercapai: 0,
      belumLaporan: 0,
      avgProgress: 0
    };

    // Transform data for frontend
    const rekap = {
      total: summary.total || 0,
      onTrack: summary.tercapai || 0,
      atRisk: summary.tidakTercapai || 0,
      behind: summary.belumLaporan || 0,
      progress: Math.round(summary.avgProgress || 0),
      klData: klStats.map(kl => ({
        name: kl.klName,
        total: kl.total,
        onTrack: kl.tercapai,
        atRisk: kl.tidakTercapai,
        behind: kl.belumLaporan,
        progress: Math.round(kl.avgProgress || 0)
      }))
    };

    // Transform klData to object with KL ID as key
    const klDataObject = {};
    klStats.forEach(kl => {
      const klId = kl._id;
      klDataObject[klId] = {
        name: kl.klName,
        total: kl.total,
        onTrack: kl.tercapai,
        atRisk: kl.tidakTercapai,
        behind: kl.belumLaporan,
        progress: Math.round(kl.avgProgress || 0)
      };
    });

    console.log(`✅ Dashboard summary generated for year ${selectedYear}`);

    res.json({
      success: true,
      data: {
        rekap,
        klData: klDataObject,
        year: selectedYear
      }
    });
  } catch (error) {
    console.error("❌ Dashboard summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data dashboard summary",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/dashboard-summary-unified - Get unified dashboard summary data (same as dashboard RAN)
router.get("/dashboard-summary-unified", async (req, res) => {
  try {
    console.log("📊 Unified dashboard summary request received");
    const { year } = req.query;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();

    console.log(`📅 Processing unified data for year: ${selectedYear}`);

    // Get all active RAN PAUD data
    const allData = await RanPaud.find({ isActive: true });

    // Calculate stats based on tahunData kategori (same logic as dashboard RAN)
    let totalTercapai = 0;
    let totalProgress = 0;
    let totalBelum = 0;
    let totalRO = 0;
    let totalProgram = allData.length;

    allData.forEach((item) => {
      totalRO += item.jumlahRO || 0;

      // Count by tahunData kategori
      if (item.indikators && item.indikators.length > 0) {
        item.indikators.forEach((indikator) => {
          if (indikator.tahunData && indikator.tahunData.length > 0) {
            indikator.tahunData.forEach((tahunData) => {
              if (tahunData.tahun === selectedYear) {
                if (tahunData.kategori === "TERCAPAI") {
                  totalTercapai++;
                } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                  totalProgress++;
                } else {
                  totalBelum++;
                }
              }
            });
          }
        });
      } else {
        // Legacy support for old structure
        if (item.tahunData && item.tahunData.length > 0) {
          item.tahunData.forEach((tahunData) => {
            if (tahunData.tahun === selectedYear) {
              if (tahunData.kategori === "TERCAPAI") {
                totalTercapai++;
              } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                totalProgress++;
              } else {
                totalBelum++;
              }
            }
          });
        }
      }
    });

    // Get KL summary (same as dashboard RAN)
    const summary = await RanPaud.getSummaryByKL();

    console.log("✅ Unified summary stats calculated:", {
      totalProgram,
      totalTercapai,
      totalProgress,
      totalBelum,
      totalRO,
    });

    res.json({
      success: true,
      message: "Data summary RAN PAUD HI berhasil diambil",
      data: {
        klSummary: summary,
        totalRO,
        totalProgram,
        totalDone: totalTercapai,
        totalProgress,
        totalBelum,
        year: selectedYear
      }
    });
  } catch (error) {
    console.error("❌ Unified dashboard summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil unified dashboard summary",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-statistics - Get KL statistics by year
router.get("/kl-statistics", authenticate, async (req, res) => {
  try {
    console.log("📊 KL statistics request received");
    const { year } = req.query;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();

    const klStats = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: "$klId",
          klName: { $first: "$klName" },
          totalPrograms: { $addToSet: "$_id" },
          totalIndikators: { $sum: 1 },
          tercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TERCAPAI"] }, 1, 0]
            }
          },
          tidakTercapai: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "TIDAK TERCAPAI"] }, 1, 0]
            }
          },
          belumLaporan: {
            $sum: {
              $cond: [{ $eq: ["$indikators.tahunData.kategori", "BELUM LAPORAN"] }, 1, 0]
            }
          },
          avgProgress: { $avg: "$indikators.tahunData.persentase" }
        }
      },
      {
        $project: {
          klName: 1,
          totalPrograms: { $size: "$totalPrograms" },
          totalIndikators: 1,
          tercapai: 1,
          tidakTercapai: 1,
          belumLaporan: 1,
          avgProgress: 1,
          progress: { $round: ["$avgProgress", 0] }
        }
      },
      { $sort: { klName: 1 } }
    ]);

    console.log(`✅ KL statistics generated for year ${selectedYear}`);

    res.json({
      success: true,
      data: klStats
    });
  } catch (error) {
    console.error("❌ KL statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data statistik KL",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/available-years - Get available years from data
router.get("/available-years", async (req, res) => {
  try {
    console.log("📅 Available years request received");

    const years = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      {
        $group: {
          _id: "$indikators.tahunData.tahun"
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          year: "$_id"
        }
      }
    ]);

    const availableYears = years.map(y => y.year);

    console.log(`✅ Available years: ${availableYears.join(', ')}`);

    res.json({
      success: true,
      data: availableYears.length > 0 ? availableYears : [2020, 2021, 2022, 2023, 2024, 2025]
    });
  } catch (error) {
    console.error("❌ Available years error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data tahun yang tersedia",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-mapping - Get KL mapping
router.get("/kl-mapping", async (req, res) => {
  try {
    console.log("🏛️ KL mapping request received");

    const klMapping = {
      'KEMENKO_PMK': 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      'KEMENDIKBUDRISTEK': 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
      'KEMENAG': 'Kementerian Agama',
      'KEMENDES_PDTT': 'Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi',
      'KEMENKES': 'Kementerian Kesehatan',
      'KEMENDUKBANGGA': 'Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional',
      'KEMENSOS': 'Kementerian Sosial',
      'KEMENPPPA': 'Kementerian Pemberdayaan Perempuan dan Perlindungan Anak',
      'KEMENDAGRI': 'Kemendagri',
      'BAPPENAS': 'Badan Perencanaan Pembangunan Nasional',
      'BPS': 'Badan Pusat Statistik'
    };

    console.log("✅ KL mapping returned");

    res.json({
      success: true,
      data: klMapping
    });
  } catch (error) {
    console.error("❌ KL mapping error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data mapping KL",
      error: error.message,
    });
  }
});

// ==================== PUBLIC ENDPOINTS (NO AUTHENTICATION) ====================

// GET /api/ran-paud/public - Get all RAN PAUD data (public access)
router.get("/public", async (req, res) => {
  try {
    console.log("📊 RAN PAUD PUBLIC GET request received");
    console.log("Query params:", req.query);

    const {
      page = 1,
      limit = 50,
      sortBy = "createdAt",
      sortOrder = "desc",
      klId,
      status,
      search,
      year,
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (klId) {
      query.klId = klId;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { program: { $regex: search, $options: "i" } },
        { klName: { $regex: search, $options: "i" } },
        { "indikators.indikator": { $regex: search, $options: "i" } },
        { "indikators.targetSatuan": { $regex: search, $options: "i" } },
        { indikator: { $regex: search, $options: "i" } },
        { targetSatuan: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by year if provided
    if (year) {
      const selectedYear = parseInt(year);
      if (!isNaN(selectedYear)) {
        query["indikators.tahunData.tahun"] = selectedYear;
      }
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query
    const data = await RanPaud.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await RanPaud.countDocuments(query);

    console.log(`✅ PUBLIC: Found ${data.length} records, total: ${total}`);

    res.json({
      success: true,
      data,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("❌ RAN PAUD PUBLIC GET error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data RAN PAUD",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/achievement/:year/public - Get achievement data by year (public)
router.get("/achievement/:year/public", async (req, res) => {
  try {
    const { year } = req.params;
    const selectedYear = parseInt(year);

    console.log(`📊 Achievement data request for year ${selectedYear} (PUBLIC)`);

    if (isNaN(selectedYear)) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak valid"
      });
    }

    const achievementData = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: {
            klId: "$klId",
            klName: "$klName",
            program: "$program"
          },
          target: { $first: "$indikators.tahunData.target" },
          realisasi: { $first: "$indikators.tahunData.realisasi" },
          persentase: { $first: "$indikators.tahunData.persentase" },
          kategori: { $first: "$indikators.tahunData.kategori" }
        }
      },
      {
        $project: {
          _id: 0,
          klId: "$_id.klId",
          klName: "$_id.klName",
          program: "$_id.program",
          target: 1,
          realisasi: 1,
          persentase: 1,
          kategori: 1
        }
      }
    ]);

    console.log(`✅ PUBLIC: Achievement data generated for year ${selectedYear}`);

    res.json({
      success: true,
      data: achievementData
    });
  } catch (error) {
    console.error("❌ PUBLIC Achievement error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data pencapaian",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/dashboard-summary/:year/public - Get dashboard summary (public)
router.get("/dashboard-summary/:year/public", async (req, res) => {
  try {
    const { year } = req.params;
    const selectedYear = parseInt(year);

    console.log(`📊 Dashboard summary request for year ${selectedYear} (PUBLIC)`);

    if (isNaN(selectedYear)) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak valid"
      });
    }

    // Get rekap data
    const rekapData = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          tercapai: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "TERCAPAI"] },
                1,
                0
              ]
            }
          },
          tidakTercapai: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "TIDAK TERCAPAI"] },
                1,
                0
              ]
            }
          },
          belumLaporan: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "BELUM LAPORAN"] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Get KL data
    const klData = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: {
            klId: "$klId",
            klName: "$klName"
          },
          total: { $sum: 1 },
          tercapai: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "TERCAPAI"] },
                1,
                0
              ]
            }
          },
          tidakTercapai: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "TIDAK TERCAPAI"] },
                1,
                0
              ]
            }
          },
          belumLaporan: {
            $sum: {
              $cond: [
                { $eq: ["$indikators.tahunData.kategori", "BELUM LAPORAN"] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          klId: "$_id.klId",
          klName: "$_id.klName",
          total: 1,
          tercapai: 1,
          tidakTercapai: 1,
          belumLaporan: 1,
          progress: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ["$tercapai", { $max: ["$total", 1] }]
                  },
                  100
                ]
              },
              0
            ]
          }
        }
      }
    ]);

    // Transform KL data to object format
    const klDataObj = {};
    klData.forEach(kl => {
      klDataObj[kl.klId] = {
        name: kl.klName,
        total: kl.total,
        tercapai: kl.tercapai,
        tidakTercapai: kl.tidakTercapai,
        belumLaporan: kl.belumLaporan,
        progress: kl.progress
      };
    });

    const rekap = rekapData[0] || {
      total: 0,
      tercapai: 0,
      tidakTercapai: 0,
      belumLaporan: 0
    };

    console.log(`✅ PUBLIC: Dashboard summary generated for year ${selectedYear}`);

    res.json({
      success: true,
      data: {
        rekap,
        klData: klDataObj
      }
    });
  } catch (error) {
    console.error("❌ PUBLIC Dashboard summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data ringkasan dashboard",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/dashboard-summary-unified/public - Get unified dashboard summary (public)
router.get("/dashboard-summary-unified/public", async (req, res) => {
  try {
    const { year } = req.query;
    const isAllYears = year === "all";
    const selectedYear = isAllYears ? new Date().getFullYear() : (year ? parseInt(year) : new Date().getFullYear());

    console.log(`📊 Unified dashboard summary request for year ${year} (isAllYears: ${isAllYears}) (PUBLIC)`);

    if (!isAllYears && isNaN(selectedYear)) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak valid"
      });
    }

    // Get all active RAN PAUD data for accurate calculation
    const allData = await RanPaud.find({ isActive: true });

    // Calculate accurate totals
    let totalTercapai = 0;
    let totalProgress = 0;
    let totalBelum = 0;
    let totalRO = 0;
    let totalProgram = allData.length; // Count actual programs

    // Create KL summary with accurate data
    const klMap = new Map();

    allData.forEach((item) => {
      const klId = item.klId;
      if (!klMap.has(klId)) {
        klMap.set(klId, {
          _id: klId,
          klName: item.klName,
          tercapai: 0,
          tidakTercapai: 0,
          belumLapor: 0,
          totalRO: 0,
          programCount: 0
        });
      }

      const klData = klMap.get(klId);
      klData.totalRO += item.jumlahRO || 0;
      klData.programCount += 1;

      // Count indicators by tahunData kategori
      if (item.indikators && item.indikators.length > 0) {
        item.indikators.forEach((indikator) => {
          if (indikator.tahunData && indikator.tahunData.length > 0) {
            indikator.tahunData.forEach((tahunData) => {
              // Filter by year if not "all"
              if (isAllYears || tahunData.tahun === selectedYear) {
                if (tahunData.kategori === "TERCAPAI") {
                  totalTercapai++;
                  klData.tercapai++;
                } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                  totalProgress++;
                  klData.tidakTercapai++;
                } else {
                  totalBelum++;
                  klData.belumLapor++;
                }
              }
            });
          }
        });
      } else {
        // Legacy support
        if (item.tahunData && item.tahunData.length > 0) {
          item.tahunData.forEach((tahunData) => {
            // Filter by year if not "all"
            if (isAllYears || tahunData.tahun === selectedYear) {
              if (tahunData.kategori === "TERCAPAI") {
                totalTercapai++;
                klData.tercapai++;
              } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                totalProgress++;
                klData.tidakTercapai++;
              } else {
                totalBelum++;
                klData.belumLapor++;
              }
            }
          });
        }
      }
    });

    const klSummary = Array.from(klMap.values());

    console.log("✅ PUBLIC: Accurate dashboard data calculated:", {
      totalProgram,
      totalTercapai,
      totalProgress,
      totalBelum,
      totalRO: klSummary.reduce((sum, kl) => sum + kl.totalRO, 0),
      klSummaryCount: klSummary.length,
      isAllYears,
      selectedYear
    });

    res.json({
      success: true,
      message: "Data summary RAN PAUD HI berhasil diambil",
      data: {
        klSummary: klSummary,
        totalRO: klSummary.reduce((sum, kl) => sum + kl.totalRO, 0),
        totalProgram,
        totalDone: totalTercapai,
        totalProgress,
        totalBelum,
        year: isAllYears ? "all" : selectedYear.toString()
      }
    });
  } catch (error) {
    console.error("❌ PUBLIC Unified dashboard summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil unified dashboard summary",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-statistics/:year/public - Get KL statistics (public)
router.get("/kl-statistics/:year/public", async (req, res) => {
  try {
    const { year } = req.params;
    const selectedYear = parseInt(year);

    console.log(`📊 KL statistics request for year ${selectedYear} (PUBLIC)`);

    if (isNaN(selectedYear)) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak valid"
      });
    }

    const klStats = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      { $match: { "indikators.tahunData.tahun": selectedYear } },
      {
        $group: {
          _id: {
            klId: "$klId",
            klName: "$klName"
          },
          totalPrograms: { $sum: 1 },
          avgProgress: {
            $avg: "$indikators.tahunData.persentase"
          }
        }
      },
      {
        $project: {
          _id: 0,
          klId: "$_id.klId",
          klName: "$_id.klName",
          totalPrograms: 1,
          progress: { $round: ["$avgProgress", 0] }
        }
      },
      { $sort: { klName: 1 } }
    ]);

    console.log(`✅ PUBLIC: KL statistics generated for year ${selectedYear}`);

    res.json({
      success: true,
      data: klStats
    });
  } catch (error) {
    console.error("❌ PUBLIC KL statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data statistik KL",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/:id/public - Get program by ID (public)
router.get("/:id/public", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Program detail request for ID ${id} (PUBLIC)`);

    const program = await RanPaud.findOne({ _id: id, isActive: true });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program tidak ditemukan"
      });
    }

    console.log(`✅ PUBLIC: Program detail returned for ID ${id}`);

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error("❌ PUBLIC Program detail error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil detail program",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/years/public - Get available years (public)
router.get("/years/public", async (req, res) => {
  try {
    console.log("📅 Available years request (PUBLIC)");

    const years = await RanPaud.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$indikators" },
      { $unwind: "$indikators.tahunData" },
      {
        $group: {
          _id: "$indikators.tahunData.tahun"
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          year: "$_id"
        }
      }
    ]);

    const availableYears = years.map(y => y.year);

    console.log(`✅ PUBLIC: Available years: ${availableYears.join(', ')}`);

    res.json({
      success: true,
      data: availableYears.length > 0 ? availableYears : [2020, 2021, 2022, 2023, 2024, 2025]
    });
  } catch (error) {
    console.error("❌ PUBLIC Available years error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data tahun yang tersedia",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-mapping/public - Get KL mapping (public)
router.get("/kl-mapping/public", async (req, res) => {
  try {
    console.log("🏛️ KL mapping request (PUBLIC)");

    const klMapping = {
      'KEMENKO_PMK': 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      'KEMENDIKBUDRISTEK': 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
      'KEMENAG': 'Kementerian Agama',
      'KEMENDES_PDTT': 'Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi',
      'KEMENKES': 'Kementerian Kesehatan',
      'KEMENDUKBANGGA': 'Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional',
      'KEMENSOS': 'Kementerian Sosial',
      'KEMENPPPA': 'Kementerian Pemberdayaan Perempuan dan Perlindungan Anak',
      'KEMENDAGRI': 'Kemendagri',
      'BAPPENAS': 'Badan Perencanaan Pembangunan Nasional',
      'BPS': 'Badan Pusat Statistik'
    };

    console.log("✅ PUBLIC: KL mapping returned");

    res.json({
      success: true,
      data: klMapping
    });
  } catch (error) {
    console.error("❌ PUBLIC KL mapping error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data mapping KL",
      error: error.message,
    });
  }
});

// ==================== APPROVAL SYSTEM FOR RAN PAUD ====================

// GET /api/ran-paud/pending - Get pending approvals (admin only)
router.get("/pending", authenticate, authorize(["admin_utama", "super_admin"]), async (req, res) => {
  try {
    console.log("📊 Pending RAN PAUD approvals request received");
    
    const pendingData = await RanPaud.find({ 
      isActive: true, 
      status: 'pending' 
    }).populate("createdBy", "fullName email klName");
    
    res.json({
      success: true,
      message: "Data RAN PAUD pending approval berhasil diambil",
      data: pendingData
    });
  } catch (error) {
    console.error("❌ Error fetching pending RAN PAUD approvals:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data pending approvals",
      error: error.message
    });
  }
});

// POST /api/ran-paud/:id/submit - Submit RAN PAUD for approval
router.post("/:id/submit", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Submit for approval request for RAN PAUD ID: ${id}`);
    
    const ranPaud = await RanPaud.findById(id);
    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan"
      });
    }
    
    // Check if user owns the data or is admin
    if (ranPaud.createdBy?.toString() !== req.user._id.toString() && 
        !["admin_utama", "super_admin"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki akses untuk submit data ini"
      });
    }
    
    ranPaud.status = 'pending';
    ranPaud.submittedAt = new Date();
    await ranPaud.save();
    
    res.json({
      success: true,
      message: "Data RAN PAUD berhasil di-submit untuk approval",
      data: ranPaud
    });
  } catch (error) {
    console.error("❌ Error submitting RAN PAUD for approval:", error);
    res.status(500).json({
      success: false,
      message: "Error saat submit data untuk approval",
      error: error.message
    });
  }
});

// POST /api/ran-paud/:id/approve - Approve RAN PAUD (admin only)
router.post("/:id/approve", authenticate, authorize(["admin_utama", "super_admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Approve RAN PAUD request for ID: ${id}`);
    
    const ranPaud = await RanPaud.findById(id);
    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan"
      });
    }
    
    if (ranPaud.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: "Data harus dalam status pending untuk dapat diapprove"
      });
    }
    
    ranPaud.status = 'approved';
    ranPaud.approvedBy = req.user._id;
    ranPaud.approvedAt = new Date();
    await ranPaud.save();
    
    res.json({
      success: true,
      message: "Data RAN PAUD berhasil diapprove",
      data: ranPaud
    });
  } catch (error) {
    console.error("❌ Error approving RAN PAUD:", error);
    res.status(500).json({
      success: false,
      message: "Error saat approve data",
      error: error.message
    });
  }
});

// POST /api/ran-paud/:id/reject - Reject RAN PAUD (admin only)
router.post("/:id/reject", authenticate, authorize(["admin_utama", "super_admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    console.log(`📊 Reject RAN PAUD request for ID: ${id}, reason: ${reason}`);
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Alasan penolakan harus diisi"
      });
    }
    
    const ranPaud = await RanPaud.findById(id);
    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan"
      });
    }
    
    if (ranPaud.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: "Data harus dalam status pending untuk dapat ditolak"
      });
    }
    
    ranPaud.status = 'rejected';
    ranPaud.approvedBy = req.user._id;
    ranPaud.approvedAt = new Date();
    ranPaud.rejectionReason = reason;
    await ranPaud.save();
    
    res.json({
      success: true,
      message: "Data RAN PAUD berhasil ditolak",
      data: ranPaud
    });
  } catch (error) {
    console.error("❌ Error rejecting RAN PAUD:", error);
    res.status(500).json({
      success: false,
      message: "Error saat reject data",
      error: error.message
    });
  }
});

// POST /api/ran-paud/:id/return-draft - Return RAN PAUD to draft (admin only)
router.post("/:id/return-draft", authenticate, authorize(["admin_utama", "super_admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Return to draft request for RAN PAUD ID: ${id}`);
    
    const ranPaud = await RanPaud.findById(id);
    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan"
      });
    }
    
    ranPaud.status = 'draft';
    ranPaud.approvedBy = null;
    ranPaud.approvedAt = null;
    ranPaud.rejectionReason = null;
    ranPaud.submittedAt = null;
    await ranPaud.save();
    
    res.json({
      success: true,
      message: "Data RAN PAUD berhasil dikembalikan ke draft",
      data: ranPaud
    });
  } catch (error) {
    console.error("❌ Error returning RAN PAUD to draft:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengembalikan data ke draft",
      error: error.message
    });
  }
});

// ==================== EXISTING ROUTES ====================

// GET /api/ran-paud/:id - Get RAN PAUD data by ID (authenticated)
router.get("/:id", authenticate, validateDataAccess("RanPaud"), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 RAN PAUD detail request for ID ${id}`);

    const ranPaud = await RanPaud.findOne({ _id: id, isActive: true })
      .populate("createdBy", "fullName email")
      .populate("updatedBy", "fullName email");

    if (!ranPaud) {
      return res.status(404).json({
        success: false,
        message: "Data RAN PAUD tidak ditemukan"
      });
    }

    console.log(`✅ RAN PAUD detail returned for ID ${id}`);

    res.json({
      success: true,
      data: ranPaud
    });
  } catch (error) {
    console.error("❌ RAN PAUD detail error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil detail RAN PAUD",
      error: error.message,
    });
  }
});

// GET /api/ran-paud/kl-detail/:klId - Get detailed data for specific K/L
router.get("/kl-detail/:klId", async (req, res) => {
  try {
    const { klId } = req.params;
    const { year } = req.query;
    const isAllYears = year === "all";
    const selectedYear = isAllYears ? new Date().getFullYear() : (year ? parseInt(year) : new Date().getFullYear());

    console.log(`📊 KL Detail request for ${klId}, year: ${year} (isAllYears: ${isAllYears})`);

    if (!isAllYears && isNaN(selectedYear)) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak valid"
      });
    }

    // Get all data for specific KL
    const klData = await RanPaud.find({ 
      isActive: true, 
      klId: klId 
    });

    if (klData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data K/L tidak ditemukan"
      });
    }

    const klName = klData[0].klName;
    let totalTercapai = 0;
    let totalProgress = 0;
    let totalBelum = 0;
    let totalRO = 0;
    let totalProgram = klData.length;

    // Collect detailed program data
    const programDetails = [];

    klData.forEach((item) => {
      totalRO += item.jumlahRO || 0;

      const programData = {
        programName: item.namaProgram,
        jumlahRO: item.jumlahRO || 0,
        indicators: []
      };

      if (item.indikators && item.indikators.length > 0) {
        item.indikators.forEach((indikator) => {
          if (indikator.tahunData && indikator.tahunData.length > 0) {
            indikator.tahunData.forEach((tahunData) => {
              // Filter by year if not "all"
              if (isAllYears || tahunData.tahun === selectedYear) {
                if (tahunData.kategori === "TERCAPAI") {
                  totalTercapai++;
                } else if (tahunData.kategori === "TIDAK TERCAPAI") {
                  totalProgress++;
                } else {
                  totalBelum++;
                }

                programData.indicators.push({
                  indikator: indikator.indikator,
                  tahun: tahunData.tahun,
                  target: tahunData.target,
                  realisasi: tahunData.realisasi,
                  persentase: tahunData.persentase,
                  kategori: tahunData.kategori
                });
              }
            });
          }
        });
      }

      if (programData.indicators.length > 0) {
        programDetails.push(programData);
      }
    });

    console.log("✅ KL Detail data retrieved:", {
      klName,
      totalProgram,
      totalTercapai,
      totalProgress,
      totalBelum,
      totalRO,
      programCount: programDetails.length
    });

    res.json({
      success: true,
      message: "Data detail K/L berhasil diambil",
      data: {
        klName,
        totalRO,
        totalProgram,
        totalDone: totalTercapai,
        totalProgress,
        totalBelum,
        programDetails,
        year: isAllYears ? "all" : selectedYear.toString()
      }
    });
  } catch (error) {
    console.error("❌ KL Detail error:", error);
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data detail K/L",
      error: error.message,
    });
  }
});

module.exports = router;
