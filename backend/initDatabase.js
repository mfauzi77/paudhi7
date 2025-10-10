// initDatabase.js - Script untuk inisialisasi database dengan user default
const mongoose = require("mongoose");
const User = require("./models/User");

async function initDatabase() {
  try {
    console.log("🔧 Connecting to MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/paudhi", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Check if admin_utama already exists
    const existingAdmin = await User.findOne({ role: "admin_utama" });

    if (existingAdmin) {
      console.log("✅ Admin utama sudah ada:", existingAdmin.email);
    } else {
      // Create default admin_utama user
      const adminUtama = new User({
        username: "admin_utama",
        email: "admin@paudhi.kemenko.go.id",
        password: "admin123",
        fullName: "Administrator Utama PAUD HI",
        role: "admin_utama",
        isActive: true,
        permissions: {
          ranPaud: { create: true, read: true, update: true, delete: true },
          news: { create: true, read: true, update: true, delete: true },
          pembelajaran: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          faq: { create: true, read: true, update: true, delete: true },
          users: { create: true, read: true, update: true, delete: true },
        },
      });

      await adminUtama.save();
      console.log("✅ Admin utama berhasil dibuat:", adminUtama.email);
    }

    // Create some sample KL users
    const klUsers = [
      {
        username: "admin_kemendikbudristek",
        email: "admin@kemendikbudristek.go.id",
        password: "dikbudristek123",
        fullName: "Admin Kemendikbudristek",
        role: "admin_kl",
        klId: "KEMENDIKBUDRISTEK",
        klName: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
        isActive: true,
      },
      {
        username: "admin_kemenkes",
        email: "admin@kemenkes.go.id",
        password: "kemenkes123",
        fullName: "Admin Kementerian Kesehatan",
        role: "admin_kl",
        klId: "KEMENKES",
        klName: "Kementerian Kesehatan",
        isActive: true,
      },
      {
        username: "admin_kemenko",
        email: "admin@kemenko.go.id",
        password: "kemenko123",
        fullName: "Admin Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan",
        role: "admin_kl",
        klId: "KEMENKO_PMK",
        klName: "Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan",
        isActive: true,
      },
    ];

    for (const klUser of klUsers) {
      const existingUser = await User.findOne({ email: klUser.email });
      if (!existingUser) {
        const newUser = new User(klUser);
        await newUser.save();
        console.log(`✅ KL user created: ${klUser.email}`);
      } else {
        console.log(`⚠️ KL user already exists: ${klUser.email}`);
      }
    }

    // Count total users
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users in database: ${totalUsers}`);

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    console.log("✅ Database initialization completed!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

initDatabase();
