import React from 'react';

const AdminDashboard = ({ setActiveView }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Panel administrasi untuk mengelola sistem CERIA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Manajemen Data
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveView('DataProcessing')}
              className="w-full text-left p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
            >
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Integrasi Data</h4>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">Kelola sumber data</p>
            </button>
            <button
              onClick={() => setActiveView('InputData')}
              className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <h4 className="font-semibold text-green-800 dark:text-green-200">Input Data</h4>
              <p className="text-green-600 dark:text-green-400 text-sm">Input data manual</p>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Manajemen Intervensi
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveView('Intervensi')}
              className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Intervensi</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">Kelola rencana intervensi</p>
            </button>
            <button
              onClick={() => setActiveView('ResourceAllocation')}
              className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">Alokasi Sumber Daya</h4>
              <p className="text-purple-600 dark:text-purple-400 text-sm">Kelola alokasi sumber daya</p>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Laporan & Analisis
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveView('Reports')}
              className="w-full text-left p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
            >
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Laporan</h4>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">Generate laporan</p>
            </button>
            <button
              onClick={() => setActiveView('Data')}
              className="w-full text-left p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <h4 className="font-semibold text-red-800 dark:text-red-200">Visualisasi Data</h4>
              <p className="text-red-600 dark:text-red-400 text-sm">Lihat visualisasi data</p>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Statistik Sistem
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Total Data</h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Intervensi Aktif</h4>
            <p className="text-green-700 dark:text-green-200 text-2xl font-bold">12</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Wilayah</h4>
            <p className="text-blue-700 dark:text-blue-200 text-2xl font-bold">34</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Domain</h4>
            <p className="text-purple-700 dark:text-purple-200 text-2xl font-bold">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
