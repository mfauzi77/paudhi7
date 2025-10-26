import React, { useState, useEffect } from 'react';
import DomainTabs from './ewsperbidang/DomainTabs';
import DomainSummary from './ewsperbidang/DomainSummary';
import DomainTopAlerts from './ewsperbidang/DomainTopAlerts';
import DomainIndicatorTable from './ewsperbidang/DomainIndicatorTable';
import RegionRankingList from './ewsperbidang/RegionRankingList';
import RiskMap from './ewsperbidang/RiskMap';
import RiskMomentumQuadrant from './ewsperbidang/RiskMomentumQuadrant';

const EWSPerBidang = () => {
  const [selectedDomain, setSelectedDomain] = useState('Kesehatan');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const domains = ['Kesehatan', 'Gizi', 'Pendidikan', 'Pengasuhan', 'Perlindungan', 'Kesejahteraan', 'Lingkungan', 'Bencana'];

  const mockDomainData = {
    name: selectedDomain,
    averageRisk: 65.2,
    criticalRegionsCount: 8,
    regions: [
      { id: '1', name: 'Jawa Barat', riskScore: 85.2, trend: 2.1 },
      { id: '2', name: 'Sumatera Utara', riskScore: 78.5, trend: -1.2 },
      { id: '3', name: 'Jawa Tengah', riskScore: 72.3, trend: 0.8 },
      { id: '4', name: 'Bali', riskScore: 45.1, trend: -2.3 },
      { id: '5', name: 'Sulawesi Selatan', riskScore: 68.9, trend: 1.5 }
    ]
  };

  const mockAlerts = [
    { id: '1', title: 'Risiko Tinggi di Jawa Barat', region: 'Jawa Barat', level: 'CRITICAL', riskScore: 85.2 },
    { id: '2', title: 'Perhatian Khusus di Sumatera Utara', region: 'Sumatera Utara', level: 'HIGH', riskScore: 78.5 },
    { id: '3', title: 'Monitoring di Jawa Tengah', region: 'Jawa Tengah', level: 'MEDIUM', riskScore: 72.3 }
  ];

  const mockIndicators = [
    {
      indicatorName: 'Cakupan Imunisasi Dasar',
      nationalAverage: '85.2%',
      bestPerformer: { name: 'Bali', value: '95.1%' },
      worstPerformer: { name: 'Papua', value: '65.3%' }
    },
    {
      indicatorName: 'Akses Posyandu',
      nationalAverage: '78.5%',
      bestPerformer: { name: 'Jawa Timur', value: '92.3%' },
      worstPerformer: { name: 'NTT', value: '58.7%' }
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'alerts', label: 'Alert & Monitoring', icon: '🚨' },
    { id: 'indicators', label: 'Indikator', icon: '📈' },
    { id: 'ranking', label: 'Peringkat Wilayah', icon: '🏆' },
    { id: 'map', label: 'Peta Risiko', icon: '🗺️' },
    { id: 'quadrant', label: 'Kuadran Momentum', icon: '📊' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <DomainSummary data={mockDomainData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DomainTopAlerts alerts={mockAlerts} domainName={selectedDomain} />
              <RegionRankingList regions={mockDomainData.regions} />
            </div>
          </div>
        );
      case 'alerts':
        return <DomainTopAlerts alerts={mockAlerts} domainName={selectedDomain} />;
      case 'indicators':
        return <DomainIndicatorTable indicators={mockIndicators} />;
      case 'ranking':
        return <RegionRankingList regions={mockDomainData.regions} />;
      case 'map':
        return <RiskMap regions={mockDomainData.regions} />;
      case 'quadrant':
        return <RiskMomentumQuadrant regions={mockDomainData.regions} />;
      default:
        return <div>Tab tidak ditemukan</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Analisis per Bidang</h1>
        <p className="text-slate-600">Early Warning System (EWS) untuk setiap domain PAUD HI</p>
      </div>

      {/* Domain Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <DomainTabs 
          domains={domains} 
          selectedDomain={selectedDomain} 
          setSelectedDomain={setSelectedDomain} 
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EWSPerBidang;