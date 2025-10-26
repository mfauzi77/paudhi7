import React, { useMemo, useState, useEffect } from 'react';
import RegionSummary from './dataperwilayah/RegionSummary';
import RegionalTrendChart from './dataperwilayah/RegionalTrendChart';
import RegionalProfileRadarChart from './dataperwilayah/RegionalProfileRadarChart';
import KabupatenKotaList from './dataperwilayah/KabupatenKotaList';
import RegionalAnalysisInsight from './dataperwilayah/RegionalAnalysisInsight';
import { getMockData } from '../services/mockData';

const DataPerWilayah = ({ handleOpenInterventionModal, navigationContext, onContextHandled, regionsDetails, kabupatenKotaDetails }) => {
  const [selectedRegionId, setSelectedRegionId] = useState(navigationContext?.regionId || 'jawa-barat');
  const [mockData, setMockData] = useState(null);
  
  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMockData();
        setMockData(data);
      } catch (error) {
        console.error('Error loading mock data:', error);
      }
    };
    loadData();
  }, []);

  // Use props data if available, otherwise use mock data
  const regionsData = regionsDetails || mockData?.regionsDetails || {};
  const kabupatenData = kabupatenKotaDetails || mockData?.kabupatenKotaDetails || {};
  
  const selectedRegion = regionsData[selectedRegionId];

  const kabupatenKotaData = useMemo(() => {
    if (!selectedRegion?.kabupatenKotaIds) return [];
    return selectedRegion.kabupatenKotaIds
      .map(id => kabupatenData[id])
      .filter(Boolean);
  }, [selectedRegion, kabupatenData]);

  // Get list of available regions for dropdown
  const availableRegions = useMemo(() => {
    return Object.values(regionsData).map(region => ({
      id: region.id,
      name: region.name
    }));
  }, [regionsData]);

  // Prepare radar chart data
  const radarChartData = useMemo(() => {
    if (!selectedRegion?.domains) return { regional: [], national: [] };
    
    const domains = ['Kesehatan', 'Gizi', 'Pendidikan', 'Lingkungan', 'Bencana'];
    const nationalAverages = [45, 50, 40, 35, 25]; // Mock national averages
    
    const regionalProfile = domains.map((domain, index) => ({
      axis: domain,
      value: selectedRegion.domains[domain]?.overallRisk || 0
    }));
    
    const nationalProfile = domains.map((domain, index) => ({
      axis: domain,
      value: nationalAverages[index]
    }));
    
    return { regional: regionalProfile, national: nationalProfile };
  }, [selectedRegion]);

  // Prepare historical data for trend chart
  const historicalData = useMemo(() => {
    if (!selectedRegion?.historicalRisk) {
      // Generate mock historical data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'];
      return months.map((month, index) => ({
        month,
        score: selectedRegion?.overallRisk || 15 + Math.random() * 10
      }));
    }
    return selectedRegion.historicalRisk;
  }, [selectedRegion]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Analisis Mendalam per Wilayah
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Pilih wilayah dari daftar untuk melihat detail profil risikonya.
        </p>
        
        {/* Region Selection Dropdown */}
        <div className="flex items-center gap-4">
          <label htmlFor="region-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Pilih Wilayah:
          </label>
          <select
            id="region-select"
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            {availableRegions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedRegion && (
        <RegionSummary 
          data={selectedRegion} 
          alertsCount={selectedRegion.activeAlertsCount || 0}
        />
      )}

      {selectedRegion && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <RegionalProfileRadarChart
              regionName={selectedRegion.name}
              regionalProfile={radarChartData.regional}
              nationalProfile={radarChartData.national}
            />
          </div>
          
          {/* Trend Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <RegionalTrendChart
              regionName={selectedRegion.name}
              regionHistory={historicalData}
              nationalHistory={historicalData.map(p => ({ month: p.month, score: 65 }))}
            />
          </div>
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
