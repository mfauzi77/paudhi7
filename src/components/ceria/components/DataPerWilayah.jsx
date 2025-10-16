import React from 'react';

const DataPerWilayah = ({ handleOpenInterventionModal, navigationContext, onContextHandled }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Data per Wilayah
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Analisis mendalam data PAUD HI per wilayah
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Peta Risiko Regional
          </h3>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Peta interaktif akan ditampilkan di sini
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ranking Wilayah
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-800 dark:text-red-200 font-medium">1. Jawa Barat</span>
              <span className="text-red-600 dark:text-red-400 font-bold">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">2. Jawa Tengah</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">65%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">3. Jawa Timur</span>
              <span className="text-green-600 dark:text-green-400 font-bold">45%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Analisis Detail Wilayah
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Kesehatan</h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm">Risk Score: 70%</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Gizi</h4>
            <p className="text-green-700 dark:text-green-200 text-sm">Risk Score: 60%</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pendidikan</h4>
            <p className="text-blue-700 dark:text-blue-200 text-sm">Risk Score: 55%</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Pengasuhan</h4>
            <p className="text-purple-700 dark:text-purple-200 text-sm">Risk Score: 65%</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Rekomendasi Intervensi Wilayah
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Berdasarkan analisis wilayah, berikut adalah rekomendasi intervensi yang disarankan:
        </p>
        <button
          onClick={() => handleOpenInterventionModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Buat Rencana Intervensi Wilayah
        </button>
      </div>
    </div>
  );
};

export default DataPerWilayah;
