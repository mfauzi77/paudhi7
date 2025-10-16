import React from 'react';

const EWSPerBidang = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Analisis per Bidang
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Early Warning System (EWS) untuk setiap domain PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Status Domain
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-800 dark:text-red-200 font-medium">Kesehatan</span>
              <span className="text-red-600 dark:text-red-400 font-bold">Kritis</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">Gizi</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">Tinggi</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">Pendidikan</span>
              <span className="text-green-600 dark:text-green-400 font-bold">Sedang</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-blue-800 dark:text-blue-200 font-medium">Pengasuhan</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">Sedang</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Alert Terbaru
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-200">Cakupan Imunisasi Rendah</h4>
              <p className="text-red-600 dark:text-red-400 text-sm">Jawa Barat - Kesehatan</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Stunting Tinggi</h4>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">Jawa Tengah - Gizi</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">APK Rendah</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">Jawa Timur - Pendidikan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Indikator Kunci per Domain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Kesehatan</h4>
            <ul className="text-indigo-700 dark:text-indigo-200 text-sm space-y-1">
              <li>• Cakupan Imunisasi</li>
              <li>• Akses Posyandu</li>
              <li>• Kesehatan Ibu</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Gizi</h4>
            <ul className="text-green-700 dark:text-green-200 text-sm space-y-1">
              <li>• Status Gizi</li>
              <li>• ASI Eksklusif</li>
              <li>• MP-ASI</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pendidikan</h4>
            <ul className="text-blue-700 dark:text-blue-200 text-sm space-y-1">
              <li>• APK PAUD</li>
              <li>• Kualitas Guru</li>
              <li>• Infrastruktur</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Pengasuhan</h4>
            <ul className="text-purple-700 dark:text-purple-200 text-sm space-y-1">
              <li>• Stimulasi</li>
              <li>• Pengasuhan</li>
              <li>• Perlindungan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWSPerBidang;
