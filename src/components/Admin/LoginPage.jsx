// components/Admin/LoginPage.jsx

import React, { useState } from 'react';
import { Shield, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi input
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('❌ Email dan password harus diisi.');
      setLoading(false);
      return;
    }

    // Validasi format email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('❌ Format email tidak valid.');
      setLoading(false);
      return;
    }

    // Validasi panjang minimum password
    if (trimmedPassword.length < 6) {
      setError('❌ Password harus minimal 6 karakter.');
      setLoading(false);
      return;
    }

    // --- Simulasi Panggilan API ---
    // Di aplikasi nyata, Anda akan memanggil API backend di sini.
    // Contoh:
    // fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
    // })
    // .then(res => {
    //   if (!res.ok) {
    //     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    //   }
    //   return res.json();
    // })
    // .then(data => {
    //   if (data.token) {
    //     localStorage.setItem('authToken', data.token); // Simpan token
    //     window.location.href = '/admin/dashboard'; // Arahkan ke dashboard
    //   } else {
    //     setError(data.message || '❌ Login gagal.');
    //   }
    // }).catch((err) => {
    //   console.error('Login error:', err);
    //   setError('❌ Terjadi kesalahan pada server. Silakan coba lagi.');
    // }).finally(() => {
    //   setLoading(false);
    // });
    
    // Untuk sekarang, kita simulasi saja:
    setTimeout(() => {
      if (trimmedEmail === 'admin@paudhi.go.id' && trimmedPassword === 'admin123') {
        localStorage.setItem('authToken', 'dummy-token-berhasil-login');
        localStorage.setItem('user', JSON.stringify({ 
          email: trimmedEmail, 
          name: 'Admin PAUD HI',
          loginTime: new Date().toISOString()
        }));
        window.location.href = '/admin/dashboard';
      } else {
        setError('❌ Email atau password salah. Gunakan: admin@paudhi.go.id / admin123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <div className="text-center">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Admin Login</h1>
          <p className="mt-2 text-gray-600">SISMONEV PAUD HI Dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;