import React, { useState, useEffect } from "react";
import { Search, FileText, Filter, Building2 } from "lucide-react";

// Mock data for provinces and their policy status
const mockPolicyData = [
  {
    id: 1,
    province: "DKI Jakarta",
    regency: "Jakarta Pusat",
    regulationType: "Peraturan Gubernur",
    number: "123/2023",
    year: "2023",
    status: "Sudah",
    documentUrl: "#",
  },
  {
    id: 2,
    province: "Jawa Barat",
    regency: "Bandung",
    regulationType: "Peraturan Daerah",
    number: "45/2024",
    year: "2024",
    status: "Dalam Proses",
    documentUrl: "#",
  },
  {
    id: 3,
    province: "Jawa Timur",
    regency: "Surabaya",
    regulationType: "Peraturan Wali Kota",
    number: "67/2022",
    year: "2022",
    status: "Belum Ada",
    documentUrl: null,
  },
  {
    id: 4,
    province: "Bali",
    regency: "Denpasar",
    regulationType: "Peraturan Gubernur",
    number: "89/2023",
    year: "2023",
    status: "Sudah",
    documentUrl: "#",
  },
  {
    id: 5,
    province: "Sumatera Utara",
    regency: "Medan",
    regulationType: "Peraturan Daerah",
    number: "12/2024",
    year: "2024",
    status: "Dalam Proses",
    documentUrl: "#",
  },
];

// Province coordinates for simple map positioning
const provinceCoordinates = {
  "DKI Jakarta": { x: 75, y: 45 },
  "Jawa Barat": { x: 65, y: 55 },
  "Jawa Timur": { x: 85, y: 65 },
  Bali: { x: 90, y: 75 },
  "Sumatera Utara": { x: 45, y: 25 },
};

function PolicyMapDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(mockPolicyData);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceFilter, setProvinceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let filtered = mockPolicyData.filter(
      (item) =>
        item.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.regency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.regulationType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (provinceFilter) {
      filtered = filtered.filter((item) => item.province === provinceFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchTerm, provinceFilter, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Sudah":
        return "#10B981"; // green
      case "Dalam Proses":
        return "#F59E0B"; // yellow
      case "Belum Ada":
        return "#EF4444"; // red
      default:
        return "#9CA3AF"; // gray
    }
  };

  const getProvinceStatus = (province) => {
    const provinceData = mockPolicyData.filter(
      (item) => item.province === province
    );
    if (provinceData.some((item) => item.status === "Sudah")) return "Sudah";
    if (provinceData.some((item) => item.status === "Dalam Proses"))
      return "Dalam Proses";
    return "Belum Ada";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                SISMONEV – Dashboard Regulasi PAUD HI
              </h1>
              <p className="text-xs text-blue-600 font-medium">
                Sistem Monitoring dan Evaluasi PAUD HI
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-700 mb-1">
                  Sudah Punya Regulasi
                </p>
                <p className="text-3xl font-bold text-green-800">
                  {
                    mockPolicyData.filter((item) => item.status === "Sudah")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl shadow-lg border border-yellow-200 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-700 mb-1">
                  Dalam Proses
                </p>
                <p className="text-3xl font-bold text-yellow-800">
                  {
                    mockPolicyData.filter(
                      (item) => item.status === "Dalam Proses"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl shadow-lg border border-red-200 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-700 mb-1">
                  Belum Ada
                </p>
                <p className="text-3xl font-bold text-red-800">
                  {
                    mockPolicyData.filter((item) => item.status === "Belum Ada")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Kebijakan PAUD HI
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari provinsi, kabupaten/kota, atau jenis regulasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Semua Provinsi</option>
                  {[
                    ...new Set(mockPolicyData.map((item) => item.province)),
                  ].map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Semua Status</option>
                  <option value="Sudah">Sudah</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Belum Ada">Belum Ada</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Provinsi
                  </th>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Kabupaten/Kota
                  </th>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Jenis Regulasi
                  </th>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Nomor
                  </th>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Tahun
                  </th>
                  <th className="text-left px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Status
                  </th>
                  <th className="text-center px-6 py-3 border-b font-medium text-gray-700 text-sm">
                    Tautan Dokumen
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      } hover:bg-blue-50 border-b border-gray-100 transition-colors duration-200`}
                    >
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {item.province}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700">
                        {item.regency}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          {item.regulationType}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-mono text-gray-900">
                        {item.number}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700">
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                          {item.year}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            item.status === "Sudah"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
                              : item.status === "Dalam Proses"
                              ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200"
                              : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              item.status === "Sudah"
                                ? "bg-green-500"
                                : item.status === "Dalam Proses"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {item.documentUrl ? (
                          <a
                            href={item.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg transition-colors duration-200 shadow-sm"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">Lihat</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            Tidak Ada
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500 bg-gray-50"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium">
                          Tidak ada data yang ditemukan
                        </p>
                        <p className="text-sm">
                          Coba ubah kriteria pencarian Anda
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 border-t bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span className="font-medium">
                Total Data: {filteredData.length}
              </span>
              <div className="flex space-x-6">
                <span className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-2 shadow-sm"></div>
                  <span className="font-medium text-green-700">
                    Sudah:{" "}
                    {
                      filteredData.filter((item) => item.status === "Sudah")
                        .length
                    }
                  </span>
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 mr-2 shadow-sm"></div>
                  <span className="font-medium text-yellow-700">
                    Proses:{" "}
                    {
                      filteredData.filter(
                        (item) => item.status === "Dalam Proses"
                      ).length
                    }
                  </span>
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 mr-2 shadow-sm"></div>
                  <span className="font-medium text-red-700">
                    Belum:{" "}
                    {
                      filteredData.filter((item) => item.status === "Belum Ada")
                        .length
                    }
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyMapDashboard;
