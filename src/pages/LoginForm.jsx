// components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Eye,
  EyeOff,
  Shield,
  Building,
  UserCheck,
  Users,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../pages/contexts/AuthContext";
import { useToast } from "../components/ToastContext";

const LoginForm = () => {
  const { login, loading, error, clearError, user, isAuthenticated } =
    useAuth();
  const navigate = useNavigate();
  const { success, error: toastError, loading: toastLoading } = useToast();

  const [formData, setFormData] = useState({
    email: "admin@paudhi.kemenko.go.id",
    password: "admin123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState("super_admin");

  // ✅ Helper function untuk menentukan redirect path berdasarkan role
  const getRedirectPath = (userRole) => {
    // Semua role diarahkan ke RAN PAUD dashboard
    return "/admin/ran-paud-dashboard";
  };

  // ✅ Auto-redirect ketika sudah authenticated dengan debugging lebih detail
  useEffect(() => {
    console.log(
      "🔍 useEffect triggered - isAuthenticated:",
      isAuthenticated,
      "user:",
      user?.email
    );

    if (isAuthenticated && user) {
      const redirectPath = getRedirectPath(user.role);
      console.log("🔄 Auto-redirecting to:", redirectPath);
      console.log("🔍 Current pathname:", window.location.pathname);

      // ✅ Cek apakah kita masih di halaman login
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/"
      ) {
        try {
          navigate(redirectPath, { replace: true });
          console.log("✅ useEffect navigate called");
        } catch (error) {
          console.error("❌ useEffect navigate error:", error);
          window.location.href = redirectPath;
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

  const demoAccounts = {
    super_admin: {
      email: "admin@paudhi.kemenko.go.id",
      password: "admin123",
      title: "Super Administrator",
      description: "Akses penuh ke semua fitur dan K/L",
      icon: Shield,
      color: "from-purple-500 to-indigo-600",
    },
    admin: {
      email: "admin@kemenko.go.id",
      password: "admin123",
      title: "Administrator",
      description: "Akses penuh kecuali manajemen user",
      icon: UserCheck,
      color: "from-blue-500 to-cyan-600",
    },
    kl_operator_dikdasmen: {
      email: "admin@kemendikdasmen.go.id",
      password: "dikdasmen123",
      title: "Operator Kemendikdasmen",
      description: "Akses terbatas pada K/L Kemendikdasmen",
      icon: Building,
      color: "from-green-500 to-emerald-600",
    },
    kl_operator_kemenkes: {
      email: "admin@kemenkes.go.id",
      password: "kemenkes123",
      title: "Operator Kemenkes",
      description: "Akses terbatas pada K/L Kemenkes",
      icon: Building,
      color: "from-orange-500 to-red-600",
    },
    viewer: {
      email: "viewer@paudhi.kemenko.go.id",
      password: "viewer123",
      title: "Viewer",
      description: "Akses read-only ke semua data",
      icon: Users,
      color: "from-gray-500 to-slate-600",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleDemoSelect = (demoKey) => {
    const demo = demoAccounts[demoKey];
    setSelectedDemo(demoKey);
    setFormData({
      email: demo.email,
      password: demo.password,
    });
    if (error) clearError();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    toastLoading('Memproses login...');
    const result = await login(formData.email, formData.password);

    if (result.success) {
      success('Login berhasil! Selamat datang kembali.');
      
      // ✅ Manual redirect dengan debugging
      const redirectPath = getRedirectPath(result.user.role);

      // ✅ Immediate redirect tanpa setTimeout
      try {
        navigate(redirectPath, { replace: true });

        // ✅ Fallback dengan window.location jika navigate gagal
        setTimeout(() => {
          if (window.location.pathname === "/login") {
            window.location.href = redirectPath;
          }
        }, 500);
      } catch (error) {
        console.error("❌ Navigate error:", error);
        window.location.href = redirectPath;
      }
    } else {
      toastError('Login gagal: ' + (result.error || 'Email atau password salah'));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin PAUD HI
          </h1>
          <p className="text-gray-600">
            Sistem Informasi RAN PAUD Holistik Integratif
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-11"
                placeholder="Enter your email"
                required
              />
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-11 pr-11"
                placeholder="Enter your password"
                required
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm">Login Failed</div>
                <div className="text-sm mt-1">{error}</div>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan - RAN PAUD HI Information System</p>
          <p className="mt-1">Secure • Reliable • Role-based</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
