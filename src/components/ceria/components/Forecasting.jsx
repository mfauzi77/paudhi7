import React from 'react';

const Forecasting = ({ handleOpenInterventionModal }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Forecasting & Prediction
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Analisis prediktif untuk risiko PAUD HI menggunakan AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Prediksi Risiko Regional
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-800 dark:text-red-200 font-medium">Jawa Barat</span>
              <span className="text-red-600 dark:text-red-400 font-bold">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">Jawa Tengah</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">65%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">Jawa Timur</span>
              <span className="text-green-600 dark:text-green-400 font-bold">45%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tren Domain
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Kesehatan</span>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">↗</span>
                <span className="text-red-600 dark:text-red-400">+5%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Gizi</span>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">↗</span>
                <span className="text-red-600 dark:text-red-400">+3%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Pendidikan</span>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">↘</span>
                <span className="text-green-600 dark:text-green-400">-2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Rekomendasi Intervensi
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Berdasarkan analisis prediktif, berikut adalah rekomendasi intervensi yang disarankan:
        </p>
        <button
          onClick={() => handleOpenInterventionModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Buat Rencana Intervensi
        </button>
      </div>
    </div>
  );
};

export default Forecasting;
