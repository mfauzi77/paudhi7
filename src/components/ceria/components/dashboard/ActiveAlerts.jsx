import React, { useState, useMemo } from 'react';
import { AlertLevel } from '../../types';
import { BeakerIcon } from '../icons/Icons';

const ActiveAlerts = ({ alerts, onAlertClick, domain }) => {
    const [activeFilter, setActiveFilter] = useState('Semua');

    const getLevelStyles = (level) => {
        switch (level) {
            case 'CRITICAL':
                return 'border-red-700 bg-red-100 text-red-900';
            case 'HIGH':
                return 'border-red-500 bg-red-50 text-red-700';
            case 'MEDIUM':
                return 'border-orange-500 bg-orange-50 text-orange-700';
            default:
                return 'border-gray-300 bg-gray-50 text-gray-700';
        }
    };

    const filteredData = useMemo(() => {
        if (activeFilter === 'Semua') {
            return alerts;
        }
        return alerts.filter(alert => alert.level === activeFilter);
    }, [alerts, activeFilter]);

    const FilterTab = ({ filter, label }) => {
        const isActive = activeFilter === filter;
        const count = filter === 'Semua' ? alerts.length : alerts.filter(a => a.level === filter).length;
        return (
            <button 
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
                {label} <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-indigo-600' : 'bg-slate-300 text-slate-600'}`}>{count}</span>
            </button>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Alert Aktif - {domain}</h3>
                <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                    <FilterTab filter="Semua" label="Semua" />
                    <FilterTab filter="CRITICAL" label="Kritis" />
                    <FilterTab filter="HIGH" label="Tinggi" />
                </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredData.map((alert) => (
                            <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getLevelStyles(alert.level)}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-bold uppercase">{alert.level}</span>
                                        <p className="font-bold text-slate-800 dark:text-white mt-1">{alert.title}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{alert.region} - {alert.domain}</p>
                                    </div>
                                    <button 
                                        onClick={() => onAlertClick(alert)}
                                        className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-all whitespace-nowrap"
                                    >
                                        Analisis AI
                                    </button>
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                                    <span className="font-semibold">Risk Score: {alert.riskScore}</span>
                                    {alert.trend && <span> | Trend: <span className="font-semibold">{alert.trend > 0 ? `+${alert.trend}`: alert.trend}%</span></span>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-slate-500 dark:text-slate-400">Tidak ada alert dengan level '{activeFilter}'.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveAlerts;


