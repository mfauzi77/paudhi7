import React from 'react';
import { View } from '../../types';

const NotificationDropdown = ({ alerts, onNavigate, onNavigateToRegion }) => {
  if (alerts.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-4 sm:mt-5 w-80 bg-white dark:bg-slate-700 rounded-md shadow-lg py-4 ring-1 ring-black ring-opacity-5 z-20">
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-slate-400 text-center">
          Tidak ada notifikasi
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-4 sm:mt-5 w-80 bg-white dark:bg-slate-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20 max-h-96 overflow-y-auto">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">
          Notifikasi Prioritas Tinggi
        </h3>
      </div>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer border-b border-gray-100 dark:border-slate-600 last:border-b-0"
          onClick={() => {
            onNavigateToRegion(alert.region);
          }}
        >
          <div className="flex items-start">
            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
              alert.level === 'CRITICAL' ? 'bg-red-500' :
              alert.level === 'HIGH' ? 'bg-orange-500' :
              alert.level === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}></div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                {alert.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                {alert.region} • {alert.domain}
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">
                Risk Score: {alert.riskScore}%
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-slate-600">
        <button
          onClick={() => onNavigate(View.EWSPerBidang)}
          className="w-full text-left text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          Lihat semua notifikasi
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
