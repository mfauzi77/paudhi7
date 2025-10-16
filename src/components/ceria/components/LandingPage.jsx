import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img 
            src="/logo.png" 
            alt="CERIA Logo" 
            className="h-24 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
            CERIA
          </h1>
          <p className="text-2xl md:text-3xl text-indigo-700 dark:text-indigo-200 mb-2">
            Cerdas, Efektif, Responsif, Inovatif, Akurat
          </p>
          <p className="text-xl text-indigo-600 dark:text-indigo-300 mb-8">
            Sistem Pendukung Keputusan Cerdas untuk PAUD HI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Dashboard Eksekutif
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Analisis komprehensif untuk pembuat kebijakan dengan insight mendalam tentang kondisi PAUD HI
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Rekomendasi Cerdas
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Rekomendasi intervensi berbasis AI yang disesuaikan dengan kondisi dan kebutuhan spesifik
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analisis Prediktif
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Prediksi risiko dan tren masa depan untuk perencanaan strategis yang lebih efektif
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNavigate}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Masuk ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;