import React from 'react';
import { RegionDetailData, DomainMetrics } from '../../types';
import { DOMAIN_ITEMS } from '../../constants';

interface DomainBreakdownProps {
    domains: RegionDetailData['domains'];
}

const DomainBreakdown: React.FC<DomainBreakdownProps> = ({ domains }) => {

    const getRiskColor = (score: number) => {
        if (score > 75) return 'text-red-500';
        if (score > 60) return 'text-orange-500';
        if (score > 40) return 'text-yellow-500';
        return 'text-emerald-500';
    };
    
    const getRiskBgColor = (score: number) => {
        if (score > 75) return 'bg-red-500';
        if (score > 60) return 'bg-orange-500';
        if (score > 40) return 'bg-yellow-500';
        return 'bg-emerald-500';
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Rincian per Bidang Layanan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {Object.entries(domains).map(([domainName, domainDataObject]) => {
                    // Fix: Cast domainDataObject to DomainMetrics to resolve typing issue with Object.entries
                    const domainData = domainDataObject as DomainMetrics;
                    const domainInfo = DOMAIN_ITEMS.find(d => d.name === domainName);
                    return (
                        <div key={domainName} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                    {domainInfo?.icon}
                                    <h4 className="ml-2 font-bold text-slate-700">{domainName}</h4>
                                </div>
                                <div className={`text-xl font-bold ${getRiskColor(domainData.riskScore)}`}>
                                    {domainData.riskScore}
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                {domainData.metrics.map(metric => (
                                    <div key={metric.label}>
                                        <div className="flex justify-between text-slate-600">
                                            <span>{metric.label}</span>
                                            <span className="font-semibold text-slate-800">{metric.value}{metric.unit}</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                                            <div 
                                                className={`h-1.5 rounded-full ${getRiskBgColor( (typeof metric.value === 'number' ? metric.value : 0) / metric.nationalAverage * 50)}`} 
                                                style={{width: `${(typeof metric.value === 'number' ? metric.value : 0) / (metric.nationalAverage*1.5) * 100}%`}}
                                            ></div>
                                        </div>
                                         <p className="text-xs text-slate-400 text-right">Nat. Avg: {metric.nationalAverage}{metric.unit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DomainBreakdown;