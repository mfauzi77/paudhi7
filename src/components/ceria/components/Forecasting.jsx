import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { getMockData } from '../services/mockData';
import PredictionChart from './forecasting/PredictionChart';
import PredictionSummary from './forecasting/PredictionSummary';
import RegionalRiskTable from './forecasting/RegionalRiskTable';
import TopMovers from './forecasting/TopMovers';

const Forecasting = ({ handleOpenInterventionModal }) => {
    const [activeDomain, setActiveDomain] = useState('Semua');
    const [forecastData, setForecastData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [mockData, setMockData] = useState(null);

    const { useIntegration } = useTheme();

    // Calculate filtered forecast data
    const filteredForecastData = activeDomain === 'Semua' 
        ? forecastData 
        : forecastData.filter(item => item.domain === activeDomain);

    // Domain filter items
    const domainFilterItems = [
        { id: 'Semua', name: 'Semua', icon: '📊', isActive: activeDomain === 'Semua' },
        { id: 'Kesehatan', name: 'Kesehatan', icon: '🏥', isActive: activeDomain === 'Kesehatan' },
        { id: 'Gizi', name: 'Gizi', icon: '🍎', isActive: activeDomain === 'Gizi' },
        { id: 'Pendidikan', name: 'Pendidikan', icon: '📚', isActive: activeDomain === 'Pendidikan' },
        { id: 'Pengasuhan', name: 'Pengasuhan', icon: '👨‍👩‍👧‍👦', isActive: activeDomain === 'Pengasuhan' },
        { id: 'Perlindungan', name: 'Perlindungan', icon: '🛡️', isActive: activeDomain === 'Perlindungan' },
        { id: 'Kesejahteraan', name: 'Kesejahteraan', icon: '💰', isActive: activeDomain === 'Kesejahteraan' },
        { id: 'Lingkungan', name: 'Lingkungan', icon: '🌍', isActive: activeDomain === 'Lingkungan' },
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getMockData();
                setMockData(data);
                
                // Generate forecast data
                const regionalForecastData = [];
                let forecastId = 1;
                
                const getRiskLevel = (score) => {
                    if (score >= 80) return 'Kritis';
                    if (score >= 60) return 'Tinggi';
                    if (score >= 40) return 'Sedang';
                    return 'Rendah';
                };

                // Generate forecast data from regions
                Object.values(data.regionsDetails || {}).forEach(region => {
                    Object.entries(region.domains).forEach(([domainName, domainData]) => {
                        if (domainData.riskScore > 0) {
                            const change = parseFloat(((Math.random() - 0.5) * 10).toFixed(1));
                            const predictedRisk = Math.max(0, Math.min(100, parseFloat((domainData.riskScore + change).toFixed(1))));
                            
                            regionalForecastData.push({
                                id: `forecast-${forecastId++}`,
                                region: region.name,
                                domain: domainName,
                                currentRisk: domainData.riskScore,
                                predictedRisk: predictedRisk,
                                change: change,
                                currentRiskLevel: getRiskLevel(domainData.riskScore),
                                predictedRiskLevel: getRiskLevel(predictedRisk)
                            });
                        }
                    });
                });

                setForecastData(regionalForecastData);

                // Generate chart data
                const generateChartData = () => {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const currentMonth = new Date().getMonth();
                    
                    return months.map((month, index) => {
                        const isActual = index <= currentMonth;
                        const baseValue = 50 + Math.random() * 30;
                        
                        return {
                            month,
                            actual: isActual ? parseFloat(baseValue.toFixed(1)) : null,
                            predicted: parseFloat((baseValue + (Math.random() - 0.5) * 10).toFixed(1)),
                            predicted_lower: parseFloat((baseValue - 5 + (Math.random() - 0.5) * 5).toFixed(1)),
                            predicted_upper: parseFloat((baseValue + 5 + (Math.random() - 0.5) * 5).toFixed(1))
                        };
                    });
                };

                setChartData(generateChartData());

            } catch (error) {
                console.error('Error loading forecasting data:', error);
            }
        };

        loadData();
    }, []);



    const handleCreatePlan = (forecast) => {
        handleOpenInterventionModal({
            region: forecast.region,
            domain: forecast.domain,
            riskScore: forecast.predictedRisk,
            priority: forecast.predictedRiskLevel === 'Kritis' ? 'Tinggi' : 'Sedang'
        });
    };

  return (
    <div className="space-y-6">
            {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Proyeksi & Prediksi
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
                    Analisis prediktif untuk risiko PAUD HI menggunakan data historis dan model statistik
        </p>
      </div>

            {/* Domain Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <div className="flex flex-wrap gap-2">
                    {domainFilterItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveDomain(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                item.isActive
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                            }`}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
          </div>
        </div>


            {/* Chart and Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                    <PredictionChart
                        data={chartData}
                        domain={activeDomain}
                        horizon="12 Bulan"
                    />
              </div>
                <PredictionSummary data={filteredForecastData} />
      </div>

            {/* Top Movers */}
            <TopMovers data={filteredForecastData} />

            {/* Regional Risk Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <RegionalRiskTable
                    data={filteredForecastData}
                    onCreatePlan={handleCreatePlan}
                />
      </div>
    </div>
  );
};

export default Forecasting;