import React from 'react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Laporan dan analisis komprehensif untuk program PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Laporan Regional
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Deep Dive Jawa Barat
              </h4>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-2">
                Analisis mendalam kondisi PAUD HI di Jawa Barat
              </p>
              <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Deep Dive Jawa Tengah
              </h4>
              <p className="text-green-600 dark:text-green-400 text-sm mb-2">
                Analisis mendalam kondisi PAUD HI di Jawa Tengah
              </p>
              <button className="text-green-600 dark:text-green-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Deep Dive Jawa Timur
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                Analisis mendalam kondisi PAUD HI di Jawa Timur
              </p>
              <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Laporan Bulanan
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Januari 2024
              </h4>
              <p className="text-purple-600 dark:text-purple-400 text-sm mb-2">
                Ringkasan kinerja bulanan program PAUD HI
              </p>
              <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Desember 2023
              </h4>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm mb-2">
                Ringkasan kinerja bulanan program PAUD HI
              </p>
              <button className="text-yellow-600 dark:text-yellow-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                November 2023
              </h4>
              <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                Ringkasan kinerja bulanan program PAUD HI
              </p>
              <button className="text-red-600 dark:text-red-400 text-sm hover:underline">
                Lihat Laporan →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Perbandingan Domain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Kesehatan</h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm">Risk Score: 70%</p>
            <p className="text-indigo-600 dark:text-indigo-300 text-xs">Tren: +5%</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Gizi</h4>
            <p className="text-green-700 dark:text-green-200 text-sm">Risk Score: 60%</p>
            <p className="text-green-600 dark:text-green-300 text-xs">Tren: +3%</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pendidikan</h4>
            <p className="text-blue-700 dark:text-blue-200 text-sm">Risk Score: 55%</p>
            <p className="text-blue-600 dark:text-blue-300 text-xs">Tren: -2%</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Pengasuhan</h4>
            <p className="text-purple-700 dark:text-purple-200 text-sm">Risk Score: 65%</p>
            <p className="text-purple-600 dark:text-purple-300 text-xs">Tren: +1%</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI Summary
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300">
            Berdasarkan analisis data terbaru, program PAUD HI menunjukkan peningkatan signifikan 
            dalam domain pendidikan dengan penurunan risiko sebesar 2%. Namun, domain kesehatan 
            dan gizi masih memerlukan perhatian khusus dengan tren peningkatan risiko. 
            Rekomendasi utama adalah meningkatkan alokasi sumber daya untuk program kesehatan 
            dan gizi di wilayah prioritas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
