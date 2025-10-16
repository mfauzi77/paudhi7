import React from 'react';

const InterventionManagement = ({ plans, onOpenModal, onUpdatePlanStatus }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manajemen Intervensi
          </h1>
          <button
            onClick={() => onOpenModal()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Buat Intervensi Baru
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola rencana intervensi untuk program PAUD HI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daftar Intervensi
          </h3>
          <div className="space-y-4">
            {plans && plans.length > 0 ? (
              plans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{plan.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      plan.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                      plan.status === 'Perencanaan' ? 'bg-yellow-100 text-yellow-800' :
                      plan.status === 'Selesai' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{plan.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{plan.region} - {plan.domain}</span>
                    <span>Rp {plan.budget?.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Belum ada rencana intervensi
                </p>
                <button
                  onClick={() => onOpenModal()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Buat Intervensi Pertama
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Statistik Intervensi
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Total Intervensi</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {plans ? plans.length : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Aktif</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {plans ? plans.filter(p => p.status === 'Aktif').length : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Selesai</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {plans ? plans.filter(p => p.status === 'Selesai').length : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Total Anggaran</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                Rp {plans ? plans.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString() : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionManagement;
