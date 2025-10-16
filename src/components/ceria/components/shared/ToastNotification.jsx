import React from 'react';

const ToastNotification = ({ alert, onClose, onNavigate }) => {
  if (!alert) return null;

  const getAlertColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500 border-red-600';
      case 'HIGH':
        return 'bg-orange-500 border-orange-600';
      case 'MEDIUM':
        return 'bg-yellow-500 border-yellow-600';
      case 'LOW':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const getAlertIcon = (level) => {
    switch (level) {
      case 'CRITICAL':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'HIGH':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className={`${getAlertColor(alert.level)} text-white rounded-lg shadow-lg border-l-4 p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getAlertIcon(alert.level)}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium">
              {alert.title}
            </h3>
            <p className="mt-1 text-sm opacity-90">
              {alert.region} - {alert.domain}
            </p>
            <p className="mt-1 text-sm opacity-90">
              Risk Score: {alert.riskScore}%
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => onNavigate(alert.region)}
                className="text-sm font-medium underline hover:no-underline"
              >
                Lihat Detail
              </button>
              <button
                onClick={onClose}
                className="text-sm font-medium underline hover:no-underline"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
