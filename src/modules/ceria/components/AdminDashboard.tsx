import React from 'react';
import { DATA_INTEGRATION_NAV } from '../constants';
import { View } from '../types';
import { useTheme } from './ThemeContext';

const AdminDashboard: React.FC<{ setActiveView: (v: View) => void }> = ({ setActiveView }) => {
  const { useIntegration, setUseIntegration } = useTheme();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="p-4 rounded bg-white dark:bg-slate-800 shadow flex items-center justify-between">
        <div>
          <div className="font-semibold">Sumber Data</div>
          <div className="text-xs text-slate-500">Pilih sumber data untuk Dashboard utama</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setUseIntegration(false)} className={`px-3 py-2 rounded ${!useIntegration ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Mock Data</button>
          <button onClick={() => setUseIntegration(true)} className={`px-3 py-2 rounded ${useIntegration ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Data Integration</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA_INTEGRATION_NAV.map(item => (
          <button key={item.label} onClick={() => setActiveView(item.id)} className="p-4 rounded bg-white dark:bg-slate-800 shadow text-left hover:ring-2 ring-indigo-400">
            <div className="font-semibold mb-1">{item.label}</div>
            <div className="text-xs text-slate-500">Kelola impor, input manual, dan data terkini.</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


