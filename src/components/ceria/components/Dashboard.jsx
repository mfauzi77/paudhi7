import React, { useState, useEffect, useMemo } from 'react';
import { DOMAIN_FILTER_ITEMS } from '../constants';
import { fetchIndicators, fetchAlerts, fetchRegionalRisks } from '../services/dataService';
import { getMockData } from '../services/mockData';
import { useTheme } from './ThemeContext';
import { getExecutiveBriefing } from '../services/geminiService';
import NationalRiskOverview from './dashboard/RiskAssessment';
import KeyHealthIndicators from './dashboard/KeyHealthIndicators';
import ActiveAlerts from './dashboard/ActiveAlerts';
import ExecutiveBriefing from './dashboard/ExecutiveBriefing';
import RecommendationModal from './dashboard/RecommendationModal';

const Dashboard = ({ handleOpenInterventionModal }) => {
    const [activeDomain, setActiveDomain] = useState('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);

    const [briefing, setBriefing] = useState(null);
    const [isBriefingLoading, setIsBriefingLoading] = useState(true);
    const [briefingError, setBriefingError] = useState(null);

    const [filteredIndicators, setFilteredIndicators] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [dynamicRegionalRiskScores, setDynamicRegionalRiskScores] = useState([]);

    const { useIntegration } = useTheme();

    useEffect(() => {
        (async () => {
            try {
                if (useIntegration) {
                    const [ind, alerts, risks] = await Promise.all([
                        fetchIndicators(activeDomain),
                        fetchAlerts(activeDomain),
                        fetchRegionalRisks(activeDomain)
                    ]);
                    setFilteredIndicators(ind);
                    setFilteredAlerts(alerts);
                    setDynamicRegionalRiskScores(risks);
                } else {
                    // Load mock data dynamically
                    const data = await getMockData();
                    console.log('🔍 Dashboard received mock data:', data);
                    const keyIndicatorsByDomain = data.keyIndicatorsByDomain || {};
                    const allActiveAlerts = data.allActiveAlerts || [];
                    const regionsDetails = data.regionsDetails || {};
                    
                    console.log('🔍 Key indicators for domain', activeDomain, ':', keyIndicatorsByDomain[activeDomain]);
                    
                    // fallback to mock data
                    setFilteredIndicators(keyIndicatorsByDomain[activeDomain] || []);
                    const alerts = activeDomain === 'Semua' ? allActiveAlerts : allActiveAlerts.filter(a => a.domain === activeDomain);
                    setFilteredAlerts(alerts);
                    setDynamicRegionalRiskScores(Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk })));
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // fallback to mock data on error
                try {
                    const data = await getMockData();
                    const keyIndicatorsByDomain = data.keyIndicatorsByDomain || {};
                    const allActiveAlerts = data.allActiveAlerts || [];
                    const regionsDetails = data.regionsDetails || {};
                    
                    setFilteredIndicators(keyIndicatorsByDomain[activeDomain] || []);
                    const alerts = activeDomain === 'Semua' ? allActiveAlerts : allActiveAlerts.filter(a => a.domain === activeDomain);
                    setFilteredAlerts(alerts);
                    setDynamicRegionalRiskScores(Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk })));
                } catch (err) {
                    console.error('Error loading fallback data:', err);
                }
            }
        })();
    }, [activeDomain, useIntegration]);

    useEffect(() => {
        (async () => {
            try {
                setIsBriefingLoading(true);
                setBriefingError(null);
                const briefingText = await getExecutiveBriefing(activeDomain, filteredIndicators, filteredAlerts);
                setBriefing(briefingText);
            } catch (error) {
                console.error('Error fetching executive briefing:', error);
                setBriefingError('Gagal memuat executive briefing');
            } finally {
                setIsBriefingLoading(false);
            }
        })();
    }, [filteredIndicators, filteredAlerts, dynamicRegionalRiskScores]);

    const handleAlertClick = (alert) => {
        setSelectedAlert(alert);
        setIsModalOpen(true);
    };

    const handleCreateIntervention = (alert) => {
        const interventionData = {
            title: `Intervensi untuk ${alert.title}`,
            description: `Intervensi untuk mengatasi ${alert.title} di ${alert.region}`,
            region: alert.region,
            domain: alert.domain,
            priority: alert.level === 'CRITICAL' ? 'Tinggi' : alert.level === 'HIGH' ? 'Tinggi' : 'Sedang',
            status: 'Perencanaan',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            budget: 0,
            kpi: `Mengurangi risiko ${alert.title} di ${alert.region}`,
            actionItems: [],
            relatedAlertId: alert.id
        };
        handleOpenInterventionModal(interventionData, true);
        setIsModalOpen(false);
    };

    const domainFilterItems = useMemo(() => {
        return DOMAIN_FILTER_ITEMS.map(item => ({
            ...item,
            isActive: item.id === activeDomain
        }));
    }, [activeDomain]);

    return (
        <div className="space-y-6">
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
                            {item.icon}
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Executive Briefing */}
            <ExecutiveBriefing
                briefing={briefing}
                isLoading={isBriefingLoading}
                error={briefingError}
            />

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NationalRiskOverview
                    regionalRiskScores={dynamicRegionalRiskScores}
                    domain={activeDomain}
                />
                <KeyHealthIndicators
                    indicators={filteredIndicators}
                    domain={activeDomain}
                />
            </div>

            {/* Active Alerts */}
            <ActiveAlerts
                alerts={filteredAlerts}
                onAlertClick={handleAlertClick}
                domain={activeDomain}
            />

            {/* Recommendation Modal */}
            <RecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                alert={selectedAlert}
                onCreateIntervention={handleCreateIntervention}
            />
        </div>
    );
};

export default Dashboard;