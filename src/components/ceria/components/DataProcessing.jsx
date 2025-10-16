import React from 'react';

const DataProcessing = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Manajemen Integrasi
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola integrasi data dari berbagai sumber untuk analisis PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sumber Data
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">Kemenkes</span>
              <span className="text-green-600 dark:text-green-400 font-bold">Terhubung</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">Dapodik</span>
              <span className="text-green-600 dark:text-green-400 font-bold">Terhubung</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">BPS</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">Terlambat</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-800 dark:text-red-200 font-medium">Kemensos</span>
              <span className="text-red-600 dark:text-red-400 font-bold">Error</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Log Pemrosesan
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                2024-01-15 10:30 - Data Kemenkes berhasil diproses
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                2024-01-15 10:25 - Data Dapodik berhasil diproses
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                2024-01-15 10:20 - Data BPS terlambat 2 jam
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                2024-01-15 10:15 - Error koneksi Kemensos
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Kualitas Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Kesehatan</h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm">Kualitas: 95%</p>
            <p className="text-indigo-600 dark:text-indigo-300 text-xs">Data lengkap</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Gizi</h4>
            <p className="text-green-700 dark:text-green-200 text-sm">Kualitas: 90%</p>
            <p className="text-green-600 dark:text-green-300 text-xs">Data lengkap</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pendidikan</h4>
            <p className="text-blue-700 dark:text-blue-200 text-sm">Kualitas: 85%</p>
            <p className="text-blue-600 dark:text-blue-300 text-xs">Data lengkap</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Pengasuhan</h4>
            <p className="text-purple-700 dark:text-purple-200 text-sm">Kualitas: 80%</p>
            <p className="text-purple-600 dark:text-purple-300 text-xs">Data lengkap</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessing;
