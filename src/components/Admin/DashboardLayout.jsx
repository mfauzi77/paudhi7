// components/Admin/DashboardLayout.jsx

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Newspaper, BarChart3, Users, Settings, LogOut } from 'lucide-react';

// --- Sidebar Component ---
const Sidebar = () => {
  const navLinks = [
    { icon: LayoutDashboard, text: 'Overview', href: '/admin/dashboard' },
    { icon: Newspaper, text: 'Manajemen Berita', href: '/admin/manage-news' },
    { icon: BarChart3, text: 'Manajemen Statistik', href: '#' },
    { icon: Users, text: 'Manajemen Layanan', href: '#' },
    { icon: Settings, text: 'Pengaturan', href: '#' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      <div className="p-6 text-center border-b border-gray-700">
        <a href="/admin/dashboard" className="text-2xl font-bold">PAUD HI CMS</a>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              window.location.pathname === link.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.text}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// --- Main Layout Component ---
const DashboardLayout = ({ children, pageTitle }) => {
  // Cek token, jika tidak ada, redirect ke login
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/admin/login';
    }
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-gray-800">{pageTitle || 'Dashboard'}</h1>
        </header>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
