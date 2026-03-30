import React from 'react';
import { RegionDetailData, KabupatenKotaDetailData } from '../../types';
import { ChartBarIcon, UsersIcon, GlobeAltIcon, BellAlertIcon } from '../icons/Icons';

interface RegionSummaryProps {
    data: RegionDetailData | KabupatenKotaDetailData;
    alertsCount?: number;
}

const nationalAverageRisk = 65; // This would typically come from an API

const RegionSummary: React.FC<RegionSummaryProps> = ({ data, alertsCount }) => {
    const riskDifference = data.overallRisk - nationalAverageRisk;
    
    const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, footer?: React.ReactNode }> = ({ icon, title, value, footer }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center mb-2">
                {icon}
                <p className="ml-3 text-sm font-semibold text-slate-600 uppercase">{title}</p>
            </div>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            {footer && <div className="mt-auto pt-2 text-xs text-slate-500">{footer}</div>}
        </div>
    );
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
                 <h3 className="text-lg font-bold">Wilayah Terpilih</h3>
                 <p className="text-3xl font-bold mt-2">{data.name}</p>
                 <p className="text-sm opacity-80 mt-1">ID: {data.id}</p>
            </div>
            <StatCard 
                icon={<ChartBarIcon className="w-8 h-8 text-indigo-500" />}
                title="Skor Risiko"
                value={data.overallRisk.toString()}
                footer={
                    <div className={`flex items-center font-bold ${riskDifference > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {riskDifference.toFixed(1)} vs. Rata-rata Nasional ({nationalAverageRisk})
                    </div>
                }
            />
            <StatCard 
                icon={<UsersIcon className="w-8 h-8 text-indigo-500" />}
                title="Populasi Anak Usia Dini"
                value={data.population.toLocaleString('id-ID')}
                footer={<p>Estimasi populasi anak usia dini di wilayah.</p>}
            />
            <StatCard 
                icon={<BellAlertIcon className="w-8 h-8 text-indigo-500" />}
                title="Alert Aktif"
                value={(alertsCount ?? data.activeAlertsCount).toString()}
                footer={<p>Jumlah alert aktif di wilayah &amp; sub-wilayahnya.</p>}
            />
        </div>
    );
};

export default RegionSummary;