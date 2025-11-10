// pages/UserManagement.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Building,
  UserCheck,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  UserPlus,
} from "lucide-react";
import apiService from "../utils/apiService";
import regionData from "../data/dataprovkabkota.json";

const UserManagement = ({ setActiveTab }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "admin_kl",
    klId: "",
    klName: "",
    province: "",
    city: "",
    regionName: "",
    regionNote: "",
    isActive: true,
  });

  const [availableCities, setAvailableCities] = useState([]);

  const klList = [
    {
      id: "KEMENKO_PMK",
      name: "Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan",
    },
    {
      id: "KEMENDIKDASMEN",
      name: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
    },
    { id: "KEMENAG", name: "Kementerian Agama" },
    {
      id: "KEMENDES_PDT",
      name: "Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi",
    },
    { id: "KEMENKES", name: "Kementerian Kesehatan" },
    {
      id: "KEMENDUKBANGGA",
      name: "Kementerian Pembangunan Kependudukan dan Keluarga Berencana Nasional",
    },
    { id: "KEMENSOS", name: "Kementerian Sosial" },
    {
      id: "KPPPA",
      name: "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak",
    },
    { id: "KEMENDAGRI", name: "Kementerian Dalam Negeri" },
    { id: "BAPPENAS", name: "Badan Perencanaan Pembangunan Nasional" },
    { id: "BPS", name: "Badan Pusat Statistik" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-set klName when klId changes
    if (field === "klId") {
      const selectedKL = klList.find((kl) => kl.id === value);
      setFormData((prev) => ({
        ...prev,
        klName: selectedKL ? selectedKL.name : "",
      }));
    }

    // Auto-set regionName when province or city changes
    if (field === "province") {
      setFormData((prev) => {
        let regionName = "";
        if (value) {
          regionName = prev.city ? `${value} - ${prev.city}` : value;
        }
        return {
          ...prev,
          province: value,
          city: "", // reset city when province changes
          regionName,
        };
      });
    } else if (field === "city") {
      setFormData((prev) => {
        const province = prev.province;
        let regionName = "";
        if (province) {
          regionName = value ? `${province} - ${value}` : province;
        }
        return {
          ...prev,
          city: value,
          regionName,
        };
      });
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      role: "admin_kl",
      klId: "",
      klName: "",
      province: "",
      city: "",
      regionName: "",
      regionNote: "",
      isActive: true,
    });
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: jika admin_kl, klId dan klName wajib diisi
    if (formData.role === "admin_kl" && (!formData.klId || !formData.klName)) {
      alert("Untuk role Admin KL, K/L wajib dipilih!");
      return;
    }

    try {
      if (editingUser) {
        await apiService.updateUser(editingUser._id, formData);
        alert("User berhasil diupdate!");
      } else {
        await apiService.createUser(formData);
        alert("User berhasil dibuat!");
      }

      setShowForm(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error: " + (error.message || "Gagal menyimpan user"));
    }
  };

  const handleEdit = (user) => {
    const regionName = user.regionName || "";
    const parts = regionName.split(" - ");
    const province = parts[0] || "";
    const city = parts[1] || "";

    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "", // Don't show password
      fullName: user.fullName,
      role: user.role,
      klId: user.klId || "",
      klName: user.klName || "",
      province,
      city,
      regionName,
      regionNote: user.regionNote || "",
      isActive: user.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (user) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus user "${user.fullName}"?`
      )
    ) {
      try {
        await apiService.deleteUser(user._id);
        alert("User berhasil dihapus!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error: " + (error.message || "Gagal menghapus user"));
      }
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await apiService.updateUser(user._id, { isActive: !user.isActive });
      alert(`User ${user.isActive ? "dinonaktifkan" : "diaktifkan"}!`);
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Error: " + (error.message || "Gagal mengubah status user"));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case "admin_utama":
        return "bg-purple-100 text-purple-700";
      case "admin_kl":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin_utama":
        return "Admin Utama";
      case "admin_kl":
        return "Admin K/L";
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Manajemen Pengguna
              </h2>
              <p className="text-gray-600">Memuat data user...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-100 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Manajemen Pengguna
              </h2>
              <p className="text-gray-600">
                Kelola user dan akses untuk sistem RAN PAUD HI
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Role</option>
              <option value="admin_utama">Admin Utama</option>
              <option value="admin_kl">Admin K/L</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchUsers}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleFormChange("username", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser
                    ? "Password Baru (kosongkan jika tidak diubah)"
                    : "Kata Sandi"}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  required={!editingUser}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFormChange("fullName", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleFormChange("role", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="admin_kl">Admin K/L</option>
                  <option value="admin_daerah">Admin Daerah</option>
                  <option value="admin_utama">Admin Utama</option>
                </select>
              </div>

              {formData.role === "admin_kl" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    K/L
                  </label>
                  <select
                    value={formData.klId}
                    onChange={(e) => handleFormChange("klId", e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Pilih K/L</option>
                    {klList.map((kl) => (
                      <option key={kl.id} value={kl.id}>
                        {kl.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.role === "admin_daerah" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provinsi
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) =>
                        handleFormChange("province", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Pilih Provinsi</option>
                      {regionData.map((item) => (
                        <option key={item.provinsi} value={item.provinsi}>
                          {item.provinsi}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kabupaten/Kota (opsional)
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleFormChange("city", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={!formData.province}
                    >
                      <option value="">Pilih Kabupaten/Kota</option>
                      {formData.province &&
                        regionData
                          .find((item) => item.provinsi === formData.province)
                          ?.kabupaten_kota.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keterangan Tambahan (opsional)
                    </label>
                    <textarea
                      value={formData.regionNote}
                      onChange={(e) =>
                        handleFormChange("regionNote", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleFormChange("isActive", e.target.checked)
                  }
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Pengguna Aktif
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingUser ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  K/L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">
                        @{user.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "admin_daerah" ? (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {user.regionName || "-"}
                        </span>
                      </div>
                    ) : user.klName ? (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {user.klName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {user.isActive ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm ${
                          user.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.isActive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={
                          user.isActive
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                      >
                        {user.isActive ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada user
            </h3>
            <p className="text-gray-500">
              Tidak ada user yang sesuai dengan filter yang dipilih.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
