import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Building,
  Filter,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle,
  AlertTriangle,
  Printer,
  Mail,
  Share2,
  Settings,
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Edit,
} from "lucide-react";
import apiService from "../../utils/apiService";

const RanPaudReports = ({ setActiveTab }) => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportHistory, setReportHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    klId: "",
    tahunMulai: "2020",
    tahunSelesai: "2024",
    statusPelaporan: "",
    kategori: "",
    includeCharts: true,
    includeSummary: true,
    includeDetail: true,
    reportType: "comprehensive",
  });

  const [klList, setKlList] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportPreview, setReportPreview] = useState(null);

  const reportTypes = [
    {
      id: "comprehensive",
      name: "Laporan Komprehensif",
      description: "Laporan lengkap dengan semua data, chart, dan analisis",
      icon: FileText,
      color: "blue",
      estimatedTime: "2-3 menit",
    },
    {
      id: "summary",
      name: "Ringkasan Eksekutif",
      description: "Ringkasan singkat dengan highlights dan key metrics",
      icon: BarChart3,
      color: "green",
      estimatedTime: "30 detik",
    },
    {
      id: "progress",
      name: "Laporan Progress",
      description: "Fokus pada pencapaian dan trend perkembangan",
      icon: TrendingUp,
      color: "purple",
      estimatedTime: "1-2 menit",
    },
    {
      id: "kl_specific",
      name: "Laporan per K/L",
      description: "Detail data dan progress untuk K/L tertentu",
      icon: Building,
      color: "orange",
      estimatedTime: "1 menit",
    },
  ];

  const exportFormats = [
    {
      id: "pdf",
      name: "PDF",
      icon: FileText,
      description: "Format PDF untuk presentasi",
    },
    {
      id: "excel",
      name: "Excel",
      icon: Download,
      description: "Spreadsheet dengan data mentah",
    },
    {
      id: "powerpoint",
      name: "PowerPoint",
      icon: Printer,
      description: "Slide presentasi siap pakai",
    },
    {
      id: "word",
      name: "Word",
      icon: Edit,
      description: "Dokumen Word untuk editing",
    },
  ];

  useEffect(() => {
    fetchInitialData();
    loadReportHistory();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [klResponse, summaryResponse] = await Promise.all([
        apiService.getRanPaudKLList(),
        apiService.getRanPaudSummary(),
      ]);

      setKlList(klResponse.data || []);
      setSummaryStats(summaryResponse.data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadReportHistory = () => {
    const history = JSON.parse(
      localStorage.getItem("ranpaud_report_history") || "[]"
    );
    setReportHistory(history);
  };

  const saveReportHistory = (reportInfo) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: filters.reportType,
      klId: filters.klId,
      klName: filters.klId
        ? klList.find((kl) => kl.id === filters.klId)?.name
        : "Semua K/L",
      period: `${filters.tahunMulai}-${filters.tahunSelesai}`,
      format: reportInfo.format,
      status: "completed",
      fileSize: reportInfo.fileSize || "Unknown",
    };

    const history = JSON.parse(
      localStorage.getItem("ranpaud_report_history") || "[]"
    );
    history.unshift(newEntry);
    history.splice(20); // Keep only last 20 reports
    localStorage.setItem("ranpaud_report_history", JSON.stringify(history));
    setReportHistory(history);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateReport = async (format = "excel") => {
    try {
      setGeneratingReport(true);

      // Validate filters
      if (filters.klId === "select") {
        alert("Silakan pilih K/L terlebih dahulu");
        return;
      }

      if (parseInt(filters.tahunMulai) > parseInt(filters.tahunSelesai)) {
        alert("Tahun mulai tidak boleh lebih besar dari tahun selesai");
        return;
      }

      // Prepare export parameters
      const exportParams = {
        klId: filters.klId !== "select" ? filters.klId : undefined,
        status:
          filters.statusPelaporan !== "all"
            ? filters.statusPelaporan
            : undefined,
        search: filters.search || undefined,
      };

      // Call the actual export API
      const response = await apiService.exportRanPaudData(format, exportParams);

      if (format === "preview") {
        setReportPreview(response.data);
        return;
      }

      // Create download link for the file
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        response.filename ||
        `ran-paud-export-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Save to history
      saveReportHistory({
        format: format,
        fileSize: "2.5 MB",
      });

      alert(
        `Laporan ${format.toUpperCase()} berhasil digenerate dan didownload!`
      );
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error: " + error.message);
    } finally {
      setGeneratingReport(false);
    }
  };

  const simulateReportGeneration = async (params, format) => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Report generated with params:", params);
        console.log("Format:", format);
        resolve();
      }, 2000);
    });
  };

  const previewReport = async () => {
    try {
      setLoading(true);

      // Fetch sample data for preview
      const response = await apiService.exportRanPaudData("preview", {
        klId: filters.klId,
        tahun: filters.tahunSelesai,
        status: filters.statusPelaporan,
      });

      setReportPreview(response.data);
    } catch (error) {
      console.error("Error generating preview:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getReportTypeColor = (type) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };
    return colors[type] || colors.blue;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "generating":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-100 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Generate Laporan RAN PAUD HI
              </h2>
              <p className="text-gray-600">
                Export data dan analytics ke berbagai format untuk reporting dan
                presentasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("ran-paud-dashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("ran-paud-data")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Kelola Data
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {summaryStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Data</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summaryStats.totalRO}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">K/L Aktif</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summaryStats.totalKL}
                </p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tercapai</p>
                <p className="text-2xl font-bold text-green-600">
                  {summaryStats.yearlyProgress?.find(
                    (p) => p._id === "TERCAPAI"
                  )?.count || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reports Generated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportHistory.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Types */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Jenis Laporan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleFilterChange("reportType", type.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    filters.reportType === type.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getReportTypeColor(
                        type.color
                      )} flex items-center justify-center`}
                    >
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {type.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {type.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {type.estimatedTime}
                        </span>
                      </div>
                    </div>
                    {filters.reportType === type.id && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Data
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kementerian/Lembaga
                </label>
                <select
                  value={filters.klId}
                  onChange={(e) => handleFilterChange("klId", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Semua K/L</option>
                  {klList.map((kl) => (
                    <option key={kl.id} value={kl.id}>
                      {kl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Pelaporan
                </label>
                <select
                  value={filters.statusPelaporan}
                  onChange={(e) =>
                    handleFilterChange("statusPelaporan", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Semua Status</option>
                  <option value="DONE">Done</option>
                  <option value="ON PROGRESS">On Progress</option>
                  <option value="BELUM PELAPORAN">Belum Pelaporan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Mulai
                </label>
                <select
                  value={filters.tahunMulai}
                  onChange={(e) =>
                    handleFilterChange("tahunMulai", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Selesai
                </label>
                <select
                  value={filters.tahunSelesai}
                  onChange={(e) =>
                    handleFilterChange("tahunSelesai", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            {/* Content Options */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Konten Laporan</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.includeSummary}
                    onChange={(e) =>
                      handleFilterChange("includeSummary", e.target.checked)
                    }
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Ringkasan Eksekutif
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.includeCharts}
                    onChange={(e) =>
                      handleFilterChange("includeCharts", e.target.checked)
                    }
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Charts dan Visualisasi
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.includeDetail}
                    onChange={(e) =>
                      handleFilterChange("includeDetail", e.target.checked)
                    }
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Detail Data per K/L
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Export Formats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Export Format
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => generateReport(format.id)}
                  disabled={generatingReport}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <format.icon className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">
                    {format.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {format.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={previewReport}
                disabled={loading}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Preview
                  </>
                )}
              </button>

              {generatingReport && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating report...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Report Preview */}
          {reportPreview && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview Data
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-medium">{reportPreview.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium">
                    {filters.tahunMulai}-{filters.tahunSelesai}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">K/L:</span>
                  <span className="font-medium">
                    {filters.klId
                      ? klList.find((kl) => kl.id === filters.klId)?.name
                      : "Semua K/L"}
                  </span>
                </div>
              </div>

              {reportPreview.slice(0, 3).map((item, index) => (
                <div key={index} className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    {item.klName}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {item.program}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Report History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Riwayat Laporan
            </h3>

            {reportHistory.length === 0 ? (
              <div className="text-center py-4">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Belum ada laporan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reportHistory.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {reportTypes.find((t) => t.id === report.type)?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {report.klName} • {report.period}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(report.timestamp).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.format.toUpperCase()}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {report.fileSize}
                      </div>
                    </div>
                  </div>
                ))}

                {reportHistory.length > 5 && (
                  <button className="w-full text-center text-sm text-green-600 hover:text-green-700 py-2">
                    Lihat Semua ({reportHistory.length})
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  handleFilterChange("reportType", "summary");
                  setTimeout(() => generateReport("pdf"), 100);
                }}
                className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Quick Summary
                    </div>
                    <div className="text-xs text-gray-600">
                      Generate ringkasan eksekutif
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 ml-auto" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab("ran-paud-dashboard")}
                className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      View Dashboard
                    </div>
                    <div className="text-xs text-gray-600">
                      Lihat visualisasi real-time
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 ml-auto" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab("ran-paud-data")}
                className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Manage Data
                    </div>
                    <div className="text-xs text-gray-600">
                      Edit dan update data
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RanPaudReports;
