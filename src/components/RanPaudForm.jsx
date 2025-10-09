// RAN PAUD Form - Status field HIDDEN (Auto calculated based on achievement percentage)
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Target,
  Edit,
  Calendar,
  Building,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../pages/contexts/AuthContext";

const RanPaudForm = ({ item, onSave, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    klId: "",
    klName: "",
    program: "",
    indikators: [
      {
        indikator: "",
        targetSatuan: "",
        jumlahRO: 1,
        catatan: "",
        tahunData: [
          {
            tahun: 2020,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
          {
            tahun: 2021,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
          {
            tahun: 2022,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
          {
            tahun: 2023,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
          {
            tahun: 2024,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
          {
            tahun: 2025,
            target: null,
            realisasi: null,
            anggaran: "[ISI DISINI]",
            persentase: 0,
            kategori: "BELUM LAPORAN",
          },
        ],
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(2025); // Default to 2025
  const [expandedIndikators, setExpandedIndikators] = useState(new Set([0])); // Default expand first indikator

  // Set default values based on user role
  useEffect(() => {
    console.log("🔍 User data in useEffect:", user);
    if (user) {
      if (user.role === "superadmin") {
        // Superadmin can select any KL
        console.log("👑 Superadmin detected, allowing KL selection");
        setFormData(prev => ({
          ...prev,
          klId: prev.klId || "",
          klName: prev.klName || ""
        }));
      } else {
        // Regular user (admin_kl, user, etc.) is restricted to their KL
        console.log("👤 Regular user detected, setting KL to:", user.klId);
        if (user.klId) {
          setFormData(prev => ({
            ...prev,
            klId: user.klId,
            klName: user.klName || user.klId
          }));
        } else {
          console.error("❌ User does not have klId:", user);
        }
      }
    }
  }, [user]);

  // ✅ Fixed: Initialize klOptions as array and add 2025 support
  const klOptions = [
    { id: "KEMENKO_PMK", name: "Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan" },
    { id: "KEMENDIKDASMEN", name: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi" },
    { id: "KEMENAG", name: "Kementerian Agama" },
    { id: "KEMENDES_PDT", name: "Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi" },
    { id: "KEMENKES", name: "Kementerian Kesehatan" },
    { id: "KEMENDUKBANGGA", name: "Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional" },
    { id: "KEMENSOS", name: "Kementerian Sosial" },
    { id: "KPPPA", name: "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak" },
    { id: "KEMENDAGRI", name: "Kementerian Dalam Negeri" },
    { id: "BAPPENAS", name: "Badan Perencanaan Pembangunan Nasional" },
    { id: "BPS", name: "Badan Pusat Statistik" },
  ];

  // ✅ Fixed: Filter KL options berdasarkan role user with array safety
  const getAvailableKLOptions = () => {
    // Ensure klOptions is always an array
    if (!Array.isArray(klOptions)) {
      console.warn("⚠️ klOptions is not an array, using default options");
      return [
        { id: "KEMENKO_PMK", name: "Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan" },
        { id: "KEMENDIKDASMEN", name: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi" },
        { id: "KEMENAG", name: "Kementerian Agama" },
        { id: "KEMENDES_PDT", name: "Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi" },
        { id: "KEMENKES", name: "Kementerian Kesehatan" },
        { id: "KEMENDUKBANGGA", name: "Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional" },
        { id: "KEMENSOS", name: "Kementerian Sosial" },
        { id: "KPPPA", name: "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak" },
        { id: "KEMENDAGRI", name: "Kementerian Dalam Negeri" },
        { id: "BAPPENAS", name: "Badan Perencanaan Pembangunan Nasional" },
        { id: "BPS", name: "Badan Pusat Statistik" },
      ];
    }

    if (user?.role === "admin_kl") {
      return klOptions.filter((kl) => kl.id === user.klId);
    }
    return klOptions;
  };

  useEffect(() => {
    if (item) {
      // Migrate legacy data to new structure
      if (
        item.indikator &&
        (!item.indikators || item.indikators.length === 0)
      ) {
        setFormData({
          ...item,
          indikators: [
            {
              indikator: item.indikator,
              targetSatuan: item.targetSatuan,
              jumlahRO: item.jumlahRO,
              catatan: item.notes || "",
              tahunData: item.tahunData,
            },
          ],
        });
      } else {
        setFormData(item);
      }
    }
  }, [item]);

  useEffect(() => {
    if (user && user.role !== "superadmin" && user.klId) {
      setFormData((prev) => ({ ...prev, klId: user.klId }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-set klName when klId changes
    if (name === "klId") {
      const selectedKL = klOptions.find((kl) => kl.id === value);
      setFormData((prev) => ({
        ...prev,
        klId: value,
        klName: selectedKL ? selectedKL.name : "",
      }));
    }
  };

  const handleIndikatorChange = (indikatorIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      indikators: prev.indikators.map((indikator, index) =>
        index === indikatorIndex ? { ...indikator, [field]: value } : indikator
      ),
    }));
  };

  // ✅ Fixed: Calculate percentage and category automatically with better logic
  const calculatePercentageAndCategory = (target, realisasi) => {
    // If both target and realisasi are empty, return default
    if (!target && !realisasi) {
      return { persentase: 0, kategori: "BELUM LAPORAN" };
    }

    // If only one is filled, treat as incomplete
    if (!target || !realisasi) {
      return { persentase: 0, kategori: "BELUM LAPORAN" };
    }

    // Explicitly treat '-' as not reported
    if (target === '-' || realisasi === '-') {
      return { persentase: 0, kategori: "BELUM LAPORAN" };
    }

    const targetNum = parseFloat(target);
    const realisasiNum = parseFloat(realisasi);

    // Check for valid numbers
    if (isNaN(targetNum) || isNaN(realisasiNum)) {
      return { persentase: 0, kategori: "BELUM LAPORAN" };
    }

    // Check for zero target
    if (targetNum === 0) {
      return { persentase: 0, kategori: "BELUM LAPORAN" };
    }

    // Calculate percentage
    const persentase = Math.round((realisasiNum / targetNum) * 100);

    // Determine category based on percentage
    let kategori = "BELUM LAPORAN";
    if (persentase >= 100) {
      kategori = "TERCAPAI";
    } else if (persentase > 0) {
      kategori = "TIDAK TERCAPAI";
    }

    console.log("🔢 Calculation:", {
      target,
      realisasi,
      targetNum,
      realisasiNum,
      persentase,
      kategori,
    });

    return { persentase, kategori };
  };

  const handleTahunDataChange = (indikatorIndex, tahun, field, value) => {
    setFormData((prev) => ({
      ...prev,
      indikators: prev.indikators.map((indikator, index) =>
        index === indikatorIndex
          ? {
              ...indikator,
              tahunData: indikator.tahunData.map((tahunData) => {
                if (tahunData.tahun === tahun) {
                  const updatedTahunData = { ...tahunData, [field]: value };

                  // ✅ Fixed: Auto-calculate percentage and category when target or realisasi changes
                  if (field === "target" || field === "realisasi") {
                    const targetValue =
                      field === "target" ? value : tahunData.target;
                    const realisasiValue =
                      field === "realisasi" ? value : tahunData.realisasi;

                    console.log(
                      "🔄 Updating calculation for year",
                      tahun,
                      ":",
                      { targetValue, realisasiValue }
                    );

                    const { persentase, kategori } =
                      calculatePercentageAndCategory(
                        targetValue,
                        realisasiValue
                      );
                    updatedTahunData.persentase = persentase;
                    updatedTahunData.kategori = kategori; // Auto-calculated, not manual

                    console.log("✅ Updated tahunData:", updatedTahunData);
                  }
                  
                  // ✅ HIDDEN: Prevent manual status changes
                  if (field === "kategori") {
                    console.log("🚫 Manual status change blocked - status is auto-calculated");
                    return tahunData; // Return unchanged data
                  }

                  return updatedTahunData;
                }
                return tahunData;
              }),
            }
          : indikator
      ),
    }));
  };

  const addIndikator = () => {
    const newIndikator = {
      indikator: "",
      targetSatuan: "",
      jumlahRO: 1,
      catatan: "",
      tahunData: [
        {
          tahun: 2020,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
        {
          tahun: 2021,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
        {
          tahun: 2022,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
        {
          tahun: 2023,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
        {
          tahun: 2024,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
        {
          tahun: 2025,
          target: null,
          realisasi: null,
          anggaran: "[ISI DISINI]",
          persentase: 0,
          kategori: "BELUM LAPORAN",
        },
      ],
    };

    setFormData((prev) => ({
      ...prev,
      indikators: [...prev.indikators, newIndikator],
    }));

    // Auto-expand new indikator
    setExpandedIndikators(
      (prev) => new Set([...prev, formData.indikators.length])
    );
  };

  const removeIndikator = (index) => {
    if (formData.indikators.length > 1) {
      setFormData((prev) => ({
        ...prev,
        indikators: prev.indikators.filter((_, i) => i !== index),
      }));

      // Remove from expanded set
      setExpandedIndikators((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const toggleIndikatorExpansion = (index) => {
    setExpandedIndikators((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Debug log untuk troubleshooting
    console.log("🔍 Validating form data:", {
      klId: formData.klId,
      klName: formData.klName,
      program: formData.program,
      userRole: user?.role,
      userKlId: user?.klId
    });
    
    // Validate program info
    if (!formData.klId || formData.klId.trim() === "") {
      if (user?.role === "superadmin") {
        newErrors.klId = "Kementerian/Lembaga harus dipilih";
      } else {
        newErrors.klId = "Kementerian/Lembaga tidak ditemukan untuk user ini. User ID: " + user?.id;
      }
    }
    
    if (!formData.program || formData.program.trim() === "") {
      newErrors.program = "Nama Program/Kegiatan harus diisi";
    }
    // Validate indikators: at least 1 indikator with at least 1 tahun diisi
    let validIndikatorCount = 0;
    formData.indikators.forEach((indikator, index) => {
      // TahunData: at least 1 tahun diisi (target/realisasi/anggaran)
      const tahunFilled = indikator.tahunData.filter(
        (td) => td.target || td.realisasi || td.anggaran
      ).length;
      if (!indikator.indikator) {
        newErrors[`indikator_${index}`] = "Indikator/Output harus diisi";
      }
      if (!indikator.targetSatuan) {
        newErrors[`targetSatuan_${index}`] = "Target/Satuan harus diisi";
      }
      if (tahunFilled === 0) {
        newErrors[`tahunData_${index}`] =
          "Minimal 1 tahun harus diisi untuk setiap indikator/output";
      } else {
        validIndikatorCount++;
      }
    });
    if (validIndikatorCount === 0) {
      newErrors.indikator =
        "Minimal 1 indikator/output dengan tahun terisi wajib ada";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
          // Additional validation before submission
      if (!formData.klId || !formData.program) {
        console.error("❌ Validation failed:", {
          klId: formData.klId,
          program: formData.program,
          userRole: user?.role,
          userKlId: user?.klId,
          userKlName: user?.klName
        });
        alert("K/L dan Program harus diisi. Silakan periksa form Anda.");
        return;
      }
    
    setLoading(true);
    try {
      // K/L logic: for superadmin, use selected klId; for regular user, use user.klId
      let klId = formData.klId;
      let klName = formData.klName;
      let selectedKL = null;
      
      if (user?.role === "superadmin") {
        // Superadmin can select any KL
        selectedKL = klOptions.find((kl) => kl.id === klId);
        klName = selectedKL?.name || klName;
        console.log("👑 Superadmin - selected KL:", { klId, klName });
      } else {
        // Regular user (admin_kl, user, etc.) must use their assigned KL
        klId = user?.klId;
        klName = user?.klName || user?.klId;
        selectedKL = { id: klId, name: klName };
        console.log("👤 Regular user - using assigned KL:", { klId, klName, userRole: user?.role });
        
        // Additional check for user klId
        if (!klId) {
          console.error("❌ User does not have klId:", {
            userId: user?.id,
            userRole: user?.role,
            userEmail: user?.email
          });
        }
      }

      // Debug log
      console.log("🔍 Debug K/L:", {
        userRole: user?.role,
        formDataKlId: formData.klId,
        userKlId: user?.klId,
        finalKlId: klId,
        selectedKL,
        klName,
      });

      // Prepare data: only send tahunData that is filled, and only indikator with at least 1 tahun diisi
      const cleanIndikators = formData.indikators
        .map((indikator) => {
          const cleanTahunData = indikator.tahunData.filter(
            (td) => td.target || td.realisasi || td.anggaran
          );
          if (cleanTahunData.length === 0) return null;
          return {
            ...indikator,
            tahunData: cleanTahunData.map((tahunData) => {
              const { persentase, kategori } = calculatePercentageAndCategory(
                tahunData.target,
                tahunData.realisasi
              );
              return {
                ...tahunData,
                persentase,
                kategori,
              };
            }),
            jumlahRO: 1, // Set jumlahRO = 1 per indikator/output
          };
        })
        .filter(Boolean);
      // Fallback error if user.id missing
      if (!user.id) {
        alert("User ID tidak ditemukan. Silakan login ulang.");
        setLoading(false);
        return;
      }
      // Final validation before sending to API
      if (!klId || !klName || !formData.program) {
        console.error("❌ Final validation failed:", {
          klId,
          klName,
          program: formData.program
        });
        alert("Data tidak lengkap. K/L dan Program harus diisi.");
        setLoading(false);
        return;
      }

      const dataToSave = {
        klId,
        klName,
        program: formData.program,
        indikators: cleanIndikators,
        createdBy: user.id,
        updatedBy: user.id,
      };
      console.log("💾 Saving data with filtered tahunData:", dataToSave);
      console.log("🔍 Data yang akan dikirim ke backend:", {
        klId: dataToSave.klId,
        klName: dataToSave.klName,
        program: dataToSave.program,
        indikatorsCount: dataToSave.indikators.length,
        userRole: user?.role,
        userId: user?.id
      });
      
      // Final check before sending
      if (!dataToSave.klId || !dataToSave.program) {
        console.error("❌ Data validation failed before sending:", dataToSave);
        alert("Data tidak valid. K/L dan Program harus diisi.");
        setLoading(false);
        return;
      }
      
      await onSave(dataToSave);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "TERCAPAI":
        return "text-green-600 bg-green-100";
      case "TIDAK TERCAPAI":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPersentaseColor = (persentase) => {
    if (persentase >= 100) return "text-green-600";
    if (persentase >= 80) return "text-yellow-600";
    if (persentase >= 50) return "text-orange-600";
    return "text-red-600";
  };

  console.log("User context:", user);
  if (!user) {
    return (
      <div className="text-center text-gray-500 py-8">
        Sedang memuat data user... Silakan login ulang jika tidak muncul.
      </div>
    );
  }
  
  if (!user.id) {
    console.error("❌ User ID not found:", user);
    return (
      <div className="text-center text-gray-500 py-8">
        User ID tidak ditemukan. Silakan login ulang.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {item ? "Edit Data RAN PAUD HI" : "Tambah Data RAN PAUD HI"}
            </h2>
            <p className="text-gray-600">
              Formulir input data RAN PAUD Holistik Integratif
            </p>
          </div>
        </div>
        {user.role !== "superadmin" && (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>

      {/* BAGIAN 1: INFORMASI UMUM PROGRAM */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5" />
          Informasi Umum Program
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kementerian/Lembaga */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kementerian/Lembaga <span className="text-red-500">*</span>
            </label>
            <select
              name="klId"
              value={formData.klId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.klId ? "border-red-500" : "border-gray-300"
              }`}
              disabled={user?.role === "admin_kl"}
            >
              <option value="">Pilih K/L</option>
              {getAvailableKLOptions().map((kl) => (
                <option key={kl.id} value={kl.id}>
                  {kl.name}
                </option>
              ))}
            </select>
            {errors.klId && (
              <p className="text-red-500 text-sm mt-1">{errors.klId}</p>
            )}
          </div>

          {/* Nama Program/Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Program/Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.program ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama program/kegiatan"
            />
            {errors.program && (
              <p className="text-red-500 text-sm mt-1">{errors.program}</p>
            )}
          </div>
        </div>
      </div>

      {/* BAGIAN 2: DAFTAR INDIKATOR/OUTPUT */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Daftar Indikator/Output
          </h3>
          <button
            onClick={addIndikator}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Indikator/Output
          </button>
        </div>

        {formData.indikators.map((indikator, index) => (
          <div key={index} className="mb-6 border border-gray-200 rounded-lg">
            {/* Indikator Header */}
            <div className="bg-gray-50 px-4 py-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleIndikatorExpansion(index)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {expandedIndikators.has(index) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                <span className="font-medium text-gray-900">
                  Indikator/Output #{index + 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {formData.indikators.length > 1 && (
                  <button
                    onClick={() => removeIndikator(index)}
                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Hapus Indikator"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Indikator Content */}
            {expandedIndikators.has(index) && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Indikator/Output */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Indikator/Output <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={indikator.indikator}
                      onChange={(e) =>
                        handleIndikatorChange(
                          index,
                          "indikator",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`indikator_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      rows="3"
                      placeholder="Deskripsi indikator atau output yang diharapkan"
                    />
                    {errors[`indikator_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`indikator_${index}`]}
                      </p>
                    )}
                  </div>

                  {/* Target/Satuan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target/Satuan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={indikator.targetSatuan}
                      onChange={(e) =>
                        handleIndikatorChange(
                          index,
                          "targetSatuan",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`targetSatuan_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Contoh: Provinsi, Kabupaten/Kota"
                    />
                    {errors[`targetSatuan_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`targetSatuan_${index}`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jumlah RO */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah RO <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={indikator.jumlahRO}
                      onChange={(e) =>
                        handleIndikatorChange(
                          index,
                          "jumlahRO",
                          parseInt(e.target.value)
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`jumlahRO_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`jumlahRO_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`jumlahRO_${index}`]}
                      </p>
                    )}
                  </div>

                  {/* Catatan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan (opsional)
                    </label>
                    <textarea
                      value={indikator.catatan}
                      onChange={(e) =>
                        handleIndikatorChange(index, "catatan", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      placeholder="Catatan tambahan spesifik untuk indikator ini"
                    />
                  </div>
                </div>

                {/* Data Pelaksanaan per Tahun */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data Pelaksanaan per Tahun
                  </h4>

                  {/* Year Tabs */}
                  <div className="flex space-x-1 mb-4">
                    {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          activeYear === year
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  {/* Year Data Form */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">
                      Data untuk Tahun {activeYear}
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Target
                        </label>
                        <input
                          type="text"
                          value={
                            indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.target || ""
                          }
                          onChange={(e) =>
                            handleTahunDataChange(
                              index,
                              activeYear,
                              "target",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Masukkan target"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Realisasi
                        </label>
                        <input
                          type="text"
                          value={
                            indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.realisasi || ""
                          }
                          onChange={(e) =>
                            handleTahunDataChange(
                              index,
                              activeYear,
                              "realisasi",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Masukkan realisasi"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Anggaran
                        </label>
                        <input
                          type="text"
                          value={
                            indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.anggaran || "[ISI DISINI]"
                          }
                          onChange={(e) =>
                            handleTahunDataChange(
                              index,
                              activeYear,
                              "anggaran",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Masukkan anggaran"
                        />
                      </div>
                    </div>

                    {/* ✅ Fixed: Achievement Display */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Achievement (%)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={
                              indikator.tahunData.find(
                                (t) => t.tahun === activeYear
                              )?.persentase || 0
                            }
                            onChange={(e) =>
                              handleTahunDataChange(
                                index,
                                activeYear,
                                "persentase",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      </div>

                      {/* Status field HIDDEN - Auto calculated based on percentage */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={
                            indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.kategori || "BELUM LAPORAN"
                          }
                          onChange={(e) =>
                            handleTahunDataChange(
                              index,
                              activeYear,
                              "kategori",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="BELUM LAPORAN">Belum Laporan</option>
                          <option value="TIDAK TERCAPAI">Tidak Tercapai</option>
                          <option value="TERCAPAI">Tercapai</option>
                        </select>
                      </div> */}
                    </div>

                    {/* ✅ Fixed: Achievement Summary - Status Auto Calculated */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Achievement Summary (Auto Calculated):
                        </span>
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-sm font-medium ${getPersentaseColor(
                              indikator.tahunData.find(
                                (t) => t.tahun === activeYear
                              )?.persentase || 0
                            )}`}
                          >
                            {indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.persentase || 0}
                            %
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getKategoriColor(
                              indikator.tahunData.find(
                                (t) => t.tahun === activeYear
                              )?.kategori || "BELUM LAPORAN"
                            )}`}
                            title="Status dihitung otomatis berdasarkan persentase pencapaian"
                          >
                            {indikator.tahunData.find(
                              (t) => t.tahun === activeYear
                            )?.kategori || "BELUM LAPORAN"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        💡 Status akan otomatis berubah berdasarkan persentase pencapaian target
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-medium text-red-900">
              Terdapat kesalahan dalam formulir:
            </h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.values(errors).map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RanPaudForm;
