import React from 'react';
import { KeyIndicatorData, DomainFilter } from '../../types';
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from '../icons/Icons';

interface KeyHealthIndicatorsProps {
  data: KeyIndicatorData[];
  domain: DomainFilter;
}

const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({ data, domain }) => {
  const TrendIndicator: React.FC<{ change: number; type: 'increase' | 'decrease' | 'stable' }> = ({ change, type }) => {
    if (type === 'stable' || change === 0) {
      return (
        <div className="flex items-center text-xs font-bold text-slate-500">
          <MinusIcon />
          <span className="ml-1">Stabil vs bulan lalu</span>
        </div>
      );
    }
    
    const isPositiveChange = change > 0;
    // For some metrics, an increase is good (e.g. immunization), for others it's bad (e.g., stunting).
    // This logic is simplified. A real app might need per-indicator configuration.
    const isGood = (type === 'increase' && isPositiveChange) || (type === 'decrease' && !isPositiveChange);
    const color = isGood ? 'text-emerald-500' : 'text-red-500';
    const icon = isPositiveChange ? <ChevronUpIcon /> : <ChevronDownIcon />;
    
    return (
      <div className={`flex items-center text-xs font-bold ${color}`}>
        {icon}
        <span className="ml-1">{Math.abs(change)}% vs bulan lalu</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Indikator Kunci - {domain}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((indicator, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">{indicator.value}</p>
            <p className="text-sm font-medium text-slate-700 mt-1 h-10">{indicator.label}</p>
            <div className="mt-2">
                <TrendIndicator change={indicator.change} type={indicator.changeType} />
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-slate-500 text-sm col-span-3">Tidak ada indikator kunci untuk domain ini.</p>}
      </div>
    </div>
  );
};

export default KeyHealthIndicators;