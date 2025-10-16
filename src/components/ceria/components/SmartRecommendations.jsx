import React from 'react';

const SmartRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Rekomendasi CERIA
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Rekomendasi intervensi berbasis AI untuk program PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rekomendasi Prioritas
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Intervensi Kesehatan
              </h4>
              <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                Meningkatkan cakupan imunisasi dasar lengkap
              </p>
              <span className="text-xs text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                Prioritas Tinggi
              </span>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Intervensi Gizi
              </h4>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm mb-2">
                Program pencegahan stunting
              </p>
              <span className="text-xs text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                Prioritas Sedang
              </span>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Intervensi Pendidikan
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                Peningkatan kualitas guru PAUD
              </p>
              <span className="text-xs text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                Prioritas Sedang
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analisis AI
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Executive Briefing
              </h4>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                Analisis eksekutif untuk domain PAUD HI menunjukkan kebutuhan intervensi mendesak di bidang kesehatan dan gizi.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Smart Recommendations
              </h4>
              <p className="text-green-600 dark:text-green-400 text-sm">
                Rekomendasi intervensi yang disesuaikan dengan kondisi spesifik wilayah dan domain.
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Forecasting Insight
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Analisis prediktif menunjukkan tren peningkatan risiko jika tidak ada intervensi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Integrasi API Gemini
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          CERIA menggunakan API Gemini dari PAUD HI untuk memberikan rekomendasi yang lebih akurat dan personalisasi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
              Executive Briefing
            </h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm">
              Analisis eksekutif untuk domain PAUD HI
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Smart Recommendations
            </h4>
            <p className="text-green-700 dark:text-green-200 text-sm">
              Rekomendasi intervensi berbasis AI
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Forecasting Insight
            </h4>
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              Analisis prediktif untuk risiko PAUD HI
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Regional Analysis
            </h4>
            <p className="text-purple-700 dark:text-purple-200 text-sm">
              Analisis regional dengan korelasi inter-domain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
