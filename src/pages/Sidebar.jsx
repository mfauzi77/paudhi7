import React, { useState } from "react";
import {
  User,
  FileText,
  MessageSquare,
  BarChart3,
  BookOpen,
  Play,
  Download,
  ChevronDown,
  ChevronRight,
  LogOut,
  Target,
  Edit,
  TrendingUp,
  FileSpreadsheet,
  Home,
  Users,
  Settings,
  Activity,
  Eye,
  MessageCircle,
  Brain,
  GraduationCap,
} from "lucide-react";
import apiService from "../utils/apiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "../components/ToastContext";
import LogoutConfirmModal from '../components/LogoutConfirmModal';

const Sidebar = ({ user, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { success } = useToast();
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home }, // HIDDEN
    { id: "news", label: "Berita", icon: FileText },
    // FAQ HIDDEN dari sidebar admin
    // ...(!["admin_kl"].includes(user?.role)
    //   ? [{ id: "faq", label: "FAQ", icon: MessageCircle }]
    //   : []),
    {
      id: "pembelajaran",
      label: "Pembelajaran",
      icon: GraduationCap,
      submenu: [
        {
          id: "pembelajaran-panduan",
          label: "Panduan Holistik",
          icon: BookOpen,
          color: "blue",
        },
        {
          id: "pembelajaran-video",
          label: "Video Integratif",
          icon: Play,
          color: "red",
        },
        {
          id: "pembelajaran-tools",
          label: "Tools & Assessment",
          icon: Download,
          color: "emerald",
        },
      ],
    },
    // HIDDEN: Grup RAN PAUD HI, jadikan "Input Data" top-level
    { id: "ran-paud-data", label: "Input Data", icon: Edit },
    // Users Management
    { id: "users", label: "Pengguna", icon: Users },
    // Analytics hanya untuk admin_utama dan super_admin
    // ...(["admin_utama", "super_admin"].includes(user?.role)
    //   ? [{ id: "analytics", label: "Analytics", icon: Activity }]
    //   : []),
    // Settings
    
  ];

  // ✅ PERBAIKAN: handleLogout menggunakan modal konfirmasi
  const handleLogout = async () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await logout(); // Gunakan AuthContext logout
      success('Keluar berhasil! Sampai jumpa.');
      navigate("/login"); // Redirect ke login page
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback jika AuthContext logout gagal
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const handleMenuClick = (item) => {
    if (item.submenu) {
      // Toggle submenu
      const newExpanded = new Set(expandedMenus);
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpandedMenus(newExpanded);
    } else {
      // Navigate to menu
      setActiveTab(item.id);
    }
  };

  const handleSubmenuClick = (subItem) => {
    setActiveTab(subItem.id);
  };

  const isMenuActive = (menuId) => {
    if (menuId === "pembelajaran") {
      return activeTab.startsWith("pembelajaran-");
    }
    if (menuId === "ran-paud") {
      return activeTab.startsWith("ran-paud-");
    }
    return activeTab === menuId;
  };

  const isSubmenuActive = (submenuId) => {
    return activeTab === submenuId;
  };

  const getSubmenuColorClasses = (color, isActive) => {
    const colorClasses = {
      blue: isActive
        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600",
      red: isActive
        ? "bg-red-100 text-red-700 border-l-4 border-red-500"
        : "text-gray-600 hover:bg-red-50 hover:text-red-600",
      emerald: isActive
        ? "bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500"
        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600",
      purple: isActive
        ? "bg-purple-100 text-purple-700 border-l-4 border-purple-500"
        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600",
      green: isActive
        ? "bg-green-100 text-green-700 border-l-4 border-green-500"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600",
      orange: isActive
        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600",
    };
    return colorClasses[color] || colorClasses.blue;
  };

  const getMenuBadge = (item) => {
    if (!item.badge) return null;

    const badgeClasses = {
      NEW: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium animate-pulse",
      HOT: "bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-medium",
      BETA: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-2 py-0.5 rounded-full font-medium",
    };

    return (
      <span className={badgeClasses[item.badge] || badgeClasses.NEW}>
        {item.badge}
      </span>
    );
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);

    // Handle analytics navigation
    if (newTab === 'analytics') {
      navigate('/admin/analytics');
      return;
    }

    // You can add analytics tracking here
    if (typeof gtag !== "undefined") {
      gtag("event", "admin_tab_change", {
        tab_name: newTab,
      });
    }
  };

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-15 border-b border-gray-200 mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin PAUD HI</h1>
            <p className="text-xs text-gray-600">Halo, {user?.fullName}</p>
            {/* Tambahkan info role dan instansi */}
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                {user?.role === "super_admin" && "Super Admin"}
                {user?.role === "admin_kl" &&
                  `${user.klName} Admin`}
                {user?.role === "admin" && "Admin"}
                {user?.role === "viewer" && "Viewer"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.filter(item => item.id !== "dashboard", "settings").map((item) => (
            <li key={item.id}>
              {/* Main Menu Item */}
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isMenuActive(item.id)
                    ? item.id === "ran-paud"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {getMenuBadge(item)}
                </div>

                {/* Chevron for submenu */}
                {item.submenu && (
                  <div className="flex-shrink-0">
                    {expandedMenus.has(item.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedMenus.has(item.id) && (
                <ul className="mt-2 ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <button
                        onClick={() => handleSubmenuClick(subItem)}
                        className={`w-full flex items-start gap-3 px-4 py-2 rounded-lg text-left text-sm transition-all duration-200 ${getSubmenuColorClasses(
                          subItem.color,
                          isSubmenuActive(subItem.id)
                        )}`}
                        title={subItem.description}
                      >
                        <subItem.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{subItem.label}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                              {subItem.description}
                            </div>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* RAN PAUD HI Info Box */}
        {expandedMenus.has("ran-paud") && (
          <div className="mt-6 mx-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">
                RAN PAUD HI 2020-2024
              </span>
            </div>
            <p className="text-xs text-purple-700 leading-relaxed">
              Sistem pelaporan dan monitoring pelaksanaan Rencana Aksi Nasional
              PAUD Holistik Integratif untuk 11 K/L.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-purple-600">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Real-time Dashboard</span>
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {/* Quick Stats untuk RAN PAUD */}
        {activeTab.startsWith("ran-paud") && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Quick Stats
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center">
                <div className="font-bold text-blue-600">11</div>
                <div className="text-gray-500">K/L</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-emerald-600">99+</div>
                <div className="text-gray-500">RO</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>

        {/* Version Info */}
        <div className="mt-2 text-center text-xs text-gray-500">
          <div>Admin Panel v1.0.0</div>
          {activeTab.startsWith("ran-paud") && (
            <div className="text-purple-600 font-medium">RAN PAUD Module</div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default Sidebar;
