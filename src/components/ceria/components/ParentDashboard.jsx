import React from 'react';

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Dashboard Orang Tua
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Dashboard khusus untuk orang tua dalam program PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profil Anak
          </h3>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">A</span>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Ahmad</h4>
              <p className="text-gray-600 dark:text-gray-300">Usia: 4 tahun</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Berat Badan</h5>
              <p className="text-indigo-700 dark:text-indigo-200">15.5 kg</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">Tinggi Badan</h5>
              <p className="text-green-700 dark:text-green-200">105 cm</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Status Gizi</h5>
              <p className="text-blue-700 dark:text-blue-200">Normal</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Imunisasi</h5>
              <p className="text-purple-700 dark:text-purple-200">Lengkap</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Jadwal Terdekat
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 dark:text-red-200">Imunisasi DPT</h4>
              <p className="text-red-600 dark:text-red-400 text-sm">15 Februari 2024</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Posyandu</h4>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">20 Februari 2024</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Konsultasi Gizi</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">25 Februari 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tips Pengasuhan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
              Stimulasi Motorik
            </h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm">
              Ajak anak bermain dengan bola untuk melatih koordinasi mata dan tangan.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Nutrisi Seimbang
            </h4>
            <p className="text-green-700 dark:text-green-200 text-sm">
              Berikan makanan bergizi dengan porsi yang sesuai dengan usia anak.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Interaksi Sosial
            </h4>
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              Ajak anak bermain dengan teman sebaya untuk mengembangkan keterampilan sosial.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Riwayat Pertumbuhan
        </h3>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Grafik pertumbuhan akan ditampilkan di sini
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
