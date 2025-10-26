// RAN PAUD Management - Status fields HIDDEN (Auto calculated based on achievement percentage)
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Building,
  FileText,
  Download,
  Upload,
  MoreHorizontal,
  Award,
  BarChart3,
  Activity,
  CheckSquare,
  Square,
  Settings,
} from "lucide-react";
import apiService from "../../utils/apiService";
import debugAPI from "../../utils/debugHelper";
import RanPaudForm from "../../components/RanPaudForm";
import { useAuth } from "../contexts/AuthContext";

// ===== RAN PAUD MANAGEMENT COMPONENT =====
const RanPaudManagement = ({ setActiveTab }) => {
  const { user, hasRole } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKL, setFilterKL] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [klList, setKlList] = useState([]); // Initialize as empty array
  const [summaryStats, setSummaryStats] = useState({});

  // Status management
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("submitted");

  // Debug mode
  const [debugMode, setDebugMode] = useState(false);

  const runDebugTests = async () => {
    console.log("🔧 Running debug tests...");
    try {
      // Test API connection
      const healthCheck = await apiService.healthCheck();
      console.log("✅ Health check:", healthCheck);

      // Test data fetching
      const testData = await apiService.getRanPaudData({ limit: 5 });
      console.log("✅ Test data fetch:", testData);

      // Test KL list
      const klList = await apiService.getRanPaudKLList();
      console.log("✅ KL list:", klList);

      console.log("🎉 All debug tests passed!");
    } catch (error) {
      console.error("❌ Debug test failed:", error);
    }
  };

  useEffect(() => {
    if (debugMode) {
      runDebugTests();
    }
  }, [debugMode]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Paged mode only (remove custom range)
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        klId: filterKL,
        status: filterStatus,
      };

      const response = await apiService.getRanPaudData(params);
      console.log("📊 Fetched RAN PAUD data:", response);

      const rows = response?.data || [];
      const pagination = response?.pagination || {};
      const total = typeof pagination.total === 'number' ? pagination.total : (response.totalItems || response.total || response.count || rows.length);
      const pages = typeof pagination.totalPages === 'number' ? pagination.totalPages : (total && itemsPerPage ? Math.ceil(total / itemsPerPage) : 1);

      setData(rows);
      setTotalItems(total);
      setTotalPages(pages);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchKLList = async () => {
    try {
      const response = await apiService.getRanPaudKLList();
      console.log("📋 KL list response:", response);
      
      // Handle response structure from backend
      let klData = [];
      if (response.success && response.data) {
        klData = response.data;
      } else if (Array.isArray(response)) {
        klData = response;
      } else if (response.data) {
        klData = response.data;
      }
      
      console.log("📋 Fetched KL list:", klData);
      setKlList(klData);
    } catch (error) {
      console.error("❌ Error fetching KL list:", error);
      // Set default KL list if API fails
      setKlList([
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
      ]);
    }
  };

  // ===== Numeric helpers to prevent NaN in UI =====
  const safeNum = (value) => {
    if (value === null || value === undefined || value === "") return 0;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getTotalRO = (item) => {
    if (!item) return 0;
    const hasIndikators = Array.isArray(item.indikators) && item.indikators.length > 0;
    if (hasIndikators) {
      const hasAnySubRO = item.indikators.some(
        (ind) => ind && ind.jumlahRO !== undefined && ind.jumlahRO !== null && ind.jumlahRO !== ""
      );
      if (hasAnySubRO) {
        const subtotal = item.indikators.reduce((sum, ind) => sum + safeNum(ind?.jumlahRO), 0);
        if (subtotal > 0) return subtotal;
      }
    }
    return safeNum(item.jumlahRO);
  };

  // ✅ Fixed: Calculate stats from local data as fallback
  const calculateLocalStats = (data) => {
    let tercapai = 0;
    let progress = 0;
    let belumLapor = 0;
    let totalRO = 0;
    let totalProgram = data.length;

    data.forEach((item) => {
      totalRO += getTotalRO(item);

      // Count by status
      if (item.status === "approved") {
        tercapai++;
      } else if (item.status === "submitted") {
        progress++;
      } else {
        belumLapor++;
      }
    });

    return {
      totalData: totalProgram,
      tercapai,
      progress,
      belumLapor,
      totalRO,
      totalProgram,
      totalDone: tercapai,
      totalProgress: progress,
      totalBelum: belumLapor,
    };
  };

  const fetchSummaryStats = async () => {
    try {
      const response = await apiService.getRanPaudSummary();
      console.log("📊 Summary response:", response);

      // Handle response structure from backend
      let stats = {};
      if (response.success && response.data) {
        stats = response.data;
      } else if (response.data) {
        stats = response.data;
      } else {
        stats = response;
      }

      // Map backend field names to frontend field names
      const mappedStats = {
        totalData: stats.totalProgram || 0,
        tercapai: stats.totalDone || 0,
        progress: stats.totalProgress || 0,
        belumLapor: stats.totalBelum || 0,
        totalRO: stats.totalRO || 0,
        totalProgram: stats.totalProgram || 0,
        totalDone: stats.totalDone || 0,
        totalProgress: stats.totalProgress || 0,
        totalBelum: stats.totalBelum || 0,
      };

      console.log("📊 Mapped stats:", mappedStats);
      setSummaryStats(mappedStats);
    } catch (error) {
      console.error("❌ Error fetching summary stats:", error);
      // ✅ Fixed: Calculate stats from local data as fallback
      const localStats = calculateLocalStats(data);
      console.log("📊 Using local stats:", localStats);
      setSummaryStats(localStats);
    }
  };

  useEffect(() => {
    fetchData();
    fetchKLList();
    fetchSummaryStats();
  }, [currentPage, searchTerm, filterKL, filterStatus]);

  // Reset ke halaman 1 jika filter atau pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterKL, itemsPerPage]);

  // ✅ Fixed: Update stats when data changes
  useEffect(() => {
    if (data.length > 0) {
      const localStats = calculateLocalStats(data);
      console.log("📊 Updated local stats from data:", localStats);
      setSummaryStats(localStats);
    }
  }, [data]);

  const handleSave = async (itemData) => {
    try {
      setLoading(true);
      let response;

      if (editingItem) {
        response = await apiService.updateRanPaud(editingItem._id, itemData);
        console.log("✅ Updated RAN PAUD:", response);
      } else {
        response = await apiService.createRanPaud(itemData);
        console.log("✅ Created RAN PAUD:", response);
      }

      setShowForm(false);
      setEditingItem(null);
      fetchData();
      fetchSummaryStats();
    } catch (error) {
      console.error("❌ Error saving data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      setLoading(true);
      await apiService.deleteRanPaud(item._id);
      console.log("✅ Deleted RAN PAUD:", item._id);
      fetchData();
      fetchSummaryStats();
    } catch (error) {
      console.error("❌ Error deleting data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.map((item) => item._id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;

    if (
      !window.confirm(
        `Apakah Anda yakin ingin menghapus ${selectedItems.size} data yang dipilih?`
      )
    )
      return;

    try {
      setLoading(true);
      await apiService.bulkRanPaudOperation({
        action: "delete",
        itemIds: Array.from(selectedItems),
      });

      setSelectedItems(new Set());
      fetchData();
      fetchSummaryStats();
    } catch (error) {
      console.error("❌ Error bulk delete:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Status management functions
  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      setStatusUpdateLoading(true);
      await apiService.updateRanPaudStatus(itemId, newStatus);
      
      // Update local data
      setData(prevData => 
        prevData.map(item => 
          item._id === itemId 
            ? { ...item, status: newStatus }
            : item
        )
      );
      
      console.log("✅ Status updated successfully");
    } catch (error) {
      console.error("❌ Error updating status:", error);
      setError(error.message);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleBulkStatusUpdate = async () => {
    if (selectedItems.size === 0) {
      setError("Pilih data yang akan diubah statusnya");
      return;
    }

    try {
      setStatusUpdateLoading(true);
      const ids = Array.from(selectedItems);
      await apiService.bulkUpdateRanPaudStatus(ids, selectedStatus);
      
      // Update local data
      setData(prevData => 
        prevData.map(item => 
          selectedItems.has(item._id)
            ? { ...item, status: selectedStatus }
            : item
        )
      );
      
      // Clear selection
      setSelectedItems(new Set());
      setShowStatusModal(false);
      
      console.log("✅ Bulk status update completed");
    } catch (error) {
      console.error("❌ Error updating bulk status:", error);
      setError(error.message);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "text-gray-600 bg-gray-100 border-gray-200";
      case "submitted":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "approved":
        return "text-green-600 bg-green-100 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "TERCAPAI":
        return "text-green-600 bg-green-100 border-green-200";
      case "TIDAK TERCAPAI":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const calculateAverageAchievement = (tahunData) => {
    if (!Array.isArray(tahunData) || tahunData.length === 0) return 0;

    let total = 0;
    let count = 0;

    for (const entry of tahunData) {
      if (entry && entry.persentase !== null && entry.persentase !== undefined) {
        const val = safeNum(entry.persentase);
        if (Number.isFinite(val)) {
          total += val;
          count += 1;
        }
      }
    }

    if (count === 0) return 0;
    return Math.round(total / count);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "-";
    return typeof num === "number" ? num.toLocaleString() : num;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (showForm) {
    return (
      <RanPaudForm
        item={editingItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Manajemen Data RAN PAUD HI
              </h2>
              <p className="text-gray-600 mt-1">
                Kelola data RAN PAUD Holistik Integratif
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Debug button hidden in production */}
            {/* Status Management Buttons - Super Admin Only - HIDDEN */}
            {/* {hasRole("super_admin") && (
              <>
                {selectedItems.size > 0 && (
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all duration-200 shadow-md font-medium"
                  >
                    <Settings className="w-5 h-5" />
                    Ubah Status ({selectedItems.size})
                  </button>
                )}
              </>
            )} */}
            
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200 shadow-md font-medium"
            >
              <Plus className="w-5 h-5" />
              Tambah Data
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats HIDDEN */}
      {/* (disembunyikan sesuai permintaan) */}

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari K/L atau Program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Items per page selector removed per request (fixed 25 per halaman) */}
            <select
              value={filterKL}
              onChange={(e) => setFilterKL(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Semua K/L</option>
              {/* ✅ Fixed: Ensure klList is always an array before mapping */}
              {Array.isArray(klList) && klList.length > 0 ? (
                klList.map((kl) => (
                  <option key={kl.id} value={kl.id}>
                    {kl.name}
                  </option>
                ))
              ) : (
                // Fallback options if klList is empty or not an array
                <>
                                  <option value="KEMENKO_PMK">Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan</option>
                <option value="KEMENDIKDASMEN">Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi</option>
                <option value="KEMENAG">Kementerian Agama</option>
                <option value="KEMENDES_PDT">Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi</option>
                <option value="KEMENKES">Kementerian Kesehatan</option>
                <option value="KEMENDUKBANGGA">Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional</option>
                <option value="KEMENSOS">Kementerian Sosial</option>
                <option value="KPPPA">Kementerian Pemberdayaan Perempuan dan Perlindungan Anak</option>
                <option value="KEMENDAGRI">Kementerian Dalam Negeri</option>
                <option value="BAPPENAS">Badan Perencanaan Pembangunan Nasional</option>
                <option value="BPS">Badan Pusat Statistik</option>
                </>
              )}
            </select>

            {/* Status filter HIDDEN */}
            {/* <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select> */}

            {selectedItems.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all duration-200 shadow-md font-medium"
              >
                <Trash2 className="w-5 h-5" />
                Hapus ({selectedItems.size})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Tidak ada data ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === data.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    K/L
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Indikator
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Target/Satuan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    RO
                  </th>
                  {/* Achievement column HIDDEN */}
                  {false && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Achievement
                    </th>
                  )}
                  {/* Status column HIDDEN */}
                  {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item._id)}
                        onChange={() => handleSelectItem(item._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Building className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {item.klName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 truncate max-w-xs font-medium">
                        {item.program}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 truncate max-w-xs">
                        {item.indikators && item.indikators.length > 0
                          ? item.indikators[0].indikator
                          : item.indikator || "N/A"}
                      </p>
                      {item.indikators && item.indikators.length > 1 && (
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          +{item.indikators.length - 1} indikator lainnya
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-medium">
                        {item.indikators && item.indikators.length > 0
                          ? item.indikators[0].targetSatuan
                          : item.targetSatuan || "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {getTotalRO(item)}
                      </span>
                    </td>
                    {/* Achievement cell HIDDEN */}
                    {false && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-green-500 h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${calculateAverageAchievement(
                                  item.indikators && item.indikators.length > 0
                                    ? item.indikators[0].tahunData
                                    : item.tahunData
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {calculateAverageAchievement(
                              item.indikators && item.indikators.length > 0
                                ? item.indikators[0].tahunData
                                : item.tahunData
                            )}
                            %
                          </span>
                        </div>
                      </td>
                    )}
                    {/* Status column HIDDEN */}
                    {/* <td className="px-6 py-4">
                      {hasRole("super_admin") ? (
                        <div className="relative">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                            disabled={statusUpdateLoading}
                            className={`px-3 py-1 text-xs font-semibold rounded-full border-2 cursor-pointer ${getStatusColor(
                              item.status
                            )} ${statusUpdateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <option value="draft">Draft</option>
                            <option value="submitted">Submitted</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border-2 ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      )}
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
              <span className="ml-2 text-gray-500">(Halaman {currentPage} dari {totalPages})</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 font-medium"
              >
                Sebelumnya
              </button>
              {/* Page numbers (max 7 buttons) */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 4), Math.max(0, currentPage - 4) + 7)
                  .map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border-2 border-gray-300 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                <span className="px-2 text-sm text-gray-600">/ {totalPages}</span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 font-medium"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Management Modal - HIDDEN */}
      {/* {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Ubah Status Data
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Status Baru
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>{selectedItems.size} data</strong> akan diubah statusnya menjadi{" "}
                  <strong className="capitalize">{selectedStatus}</strong>
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleBulkStatusUpdate}
                  disabled={statusUpdateLoading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-200"
                >
                  {statusUpdateLoading ? "Mengubah..." : "Ubah Status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default RanPaudManagement;
