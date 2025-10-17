import React, { useMemo } from 'react';
import RegionSummary from './dataperwilayah/RegionSummary';
import RegionalTrendChart from './dataperwilayah/RegionalTrendChart';
import KabupatenKotaList from './dataperwilayah/KabupatenKotaList';
import RegionalAnalysisInsight from './dataperwilayah/RegionalAnalysisInsight';
import { regionsDetails, kabupatenKotaDetails } from '../services/mockData';

const DataPerWilayah = ({ handleOpenInterventionModal, navigationContext, onContextHandled }) => {
  const regionId = navigationContext?.regionId || 'jawa-barat';
  const selectedRegion = regionsDetails[regionId];

  const kabupatenKotaData = useMemo(() => {
    if (!selectedRegion?.kabupatenKotaIds) return [];
    return selectedRegion.kabupatenKotaIds
      .map(id => kabupatenKotaDetails[id])
      .filter(Boolean);
  }, [selectedRegion]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Data per Wilayah
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Analisis mendalam data PAUD HI per wilayah
        </p>
      </div>

      {selectedRegion && (
        <RegionSummary data={selectedRegion} />
      )}

      {selectedRegion && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <RegionalTrendChart
            regionName={selectedRegion.name}
            regionHistory={selectedRegion.historicalRisk || []}
            nationalHistory={(selectedRegion.historicalRisk || []).map(p => ({ month: p.month, score: 65 }))}
          />
        </div>
      )}

      {kabupatenKotaData.length > 0 && (
        <KabupatenKotaList
          data={kabupatenKotaData}
          onSelectKabupatenKota={() => { /* reserved for deep-dive view */ }}
        />
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <RegionalAnalysisInsight
          isLoading={false}
          error={null}
          insight="Tidak ditemukan anomali signifikan pada pola tren 3 bulan terakhir. Domain dengan kontribusi risiko tertinggi: Perlindungan dan Gizi."
          onRegenerate={() => {}}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Rekomendasi Intervensi Wilayah
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Berdasarkan analisis wilayah, berikut adalah rekomendasi intervensi yang disarankan:
        </p>
        <button
          onClick={() => handleOpenInterventionModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Buat Rencana Intervensi Wilayah
        </button>
      </div>
    </div>
  );
};

export default DataPerWilayah;
