import React, { useState, useEffect, useMemo } from 'react';
import { getForecastingInsight } from '../services/geminiService';
import PredictionChart from './forecasting/PredictionChart';
import PredictionSummary from './forecasting/PredictionSummary';
import RegionalRiskTable from './forecasting/RegionalRiskTable';
import TopMovers from './forecasting/TopMovers';
import ForecastingInsight from './forecasting/ForecastingInsight';
import { ArrowPathIcon } from './icons/Icons';
import { Domain, ForecastDataPoint, InterventionPlan, InterventionPriority, InterventionStatus, RegionalForecastData } from '../types';
import { useData } from '../context/DataContext';


// Simple debounce hook to prevent excessive API calls
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}


interface ForecastingProps {
    handleOpenInterventionModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
}

const Forecasting: React.FC<ForecastingProps> = ({ handleOpenInterventionModal }) => {
    const abortControllerRef = React.useRef<AbortController | null>(null);
    const [activeDomain, setActiveDomain] = React.useState<Domain>('Kesehatan & Gizi');
    const [activeHorizon, setActiveHorizon] = React.useState('3 Bulan');

    const debouncedActiveDomain = useDebounce(activeDomain, 500);
    const debouncedActiveHorizon = useDebounce(activeHorizon, 500);

    const [insight, setInsight] = useState<string | null>(null);
    const [isInsightLoading, setIsInsightLoading] = useState(false);
    const [insightError, setInsightError] = useState<string | null>(null);
    const [lastAnalyzedParams, setLastAnalyzedParams] = useState<string>('');
    const [lastAnalyzedDate, setLastAnalyzedDate] = useState<string | null>(null);

    const formatIndonesianDate = (date: Date) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const d = date.getDate();
        const m = months[date.getMonth()];
        const y = date.getFullYear();
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${d} - ${m} - ${y} - ${h}:${min}`;
    };

    
    const { appData } = useData();
    if (!appData) return null;
    const { regionalForecastData, nationalHistoricalRisk, domainsData } = appData;

    const domains: Domain[] = ['Kesehatan & Gizi', 'Pendidikan', 'Pengasuhan', 'Perlindungan', 'Kesejahteraan Sosial'];
    const horizons = ['3 Bulan', '6 Bulan'];

    const getRiskLevel = (score: number): 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah' => {
        if (score > 85) return 'Kritis';
        if (score > 70) return 'Tinggi';
        if (score > 55) return 'Sedang';
        return 'Rendah';
    };

    const processedForecastData = useMemo(() => {
        const domainFiltered = regionalForecastData.filter(d => d.domain === activeDomain);
        const horizonMultiplier = activeHorizon === '6 Bulan' ? 1.8 : 1;

        return domainFiltered.map(item => {
            const adjustedChange = parseFloat((item.change * horizonMultiplier).toFixed(1));
            const adjustedPredictedRisk = Math.max(0, Math.min(100, parseFloat((item.currentRisk + adjustedChange).toFixed(1))));

            return {
                ...item,
                change: adjustedChange,
                predictedRisk: adjustedPredictedRisk,
                predictedRiskLevel: getRiskLevel(adjustedPredictedRisk),
            };
        });
    }, [activeDomain, activeHorizon, regionalForecastData]);

    const { topIncreases, topDecreases, overallTrend } = useMemo(() => {
        const sortedByChange = [...processedForecastData].sort((a, b) => b.change - a.change);
        const overallTrendValue = processedForecastData.length > 0
            ? processedForecastData.reduce((acc, item) => acc + item.change, 0) / processedForecastData.length
            : 0;
        
        return {
            topIncreases: sortedByChange.slice(0, 3),
            topDecreases: sortedByChange.slice(-3).reverse(),
            overallTrend: overallTrendValue,
        };
    }, [processedForecastData]);
    
    const dynamicChartData = useMemo(() => {
        const nationalAvgRiskForDomain = domainsData[activeDomain].averageRisk;

        const nationalAvgRiskOverall = nationalHistoricalRisk[nationalHistoricalRisk.length - 1].score;
        const domainOffset = nationalAvgRiskForDomain - nationalAvgRiskOverall;

        const actualData = nationalHistoricalRisk.slice(-6).map(p => {
            const score = Math.max(0, Math.min(100, p.score + domainOffset));
            return ({
                month: p.month,
                actual: parseFloat(score.toFixed(1)),
                predicted: parseFloat(score.toFixed(1)),
                predicted_upper: parseFloat(score.toFixed(1)),
                predicted_lower: parseFloat(score.toFixed(1)),
            })
        });
        
        const lastActual = actualData[actualData.length - 1];
        const horizonMonths = activeHorizon === '6 Bulan' ? 6 : 3;
        const predictionMonths = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const predictedData: ForecastDataPoint[] = [];
        let currentPredicted = lastActual.actual;
        const monthlyChange = overallTrend / horizonMonths; 
        const confidenceRange = 5;

        for (let i = 0; i < horizonMonths; i++) {
            currentPredicted += monthlyChange;
            const upper = currentPredicted + confidenceRange * ((i + 1) / horizonMonths);
            const lower = currentPredicted - confidenceRange * ((i + 1) / horizonMonths);
            predictedData.push({
                month: predictionMonths[i],
                actual: null,
                predicted: parseFloat(currentPredicted.toFixed(1)),
                predicted_upper: parseFloat(upper.toFixed(1)),
                predicted_lower: parseFloat(lower.toFixed(1)),
            });
        }

        return [...actualData, ...predictedData];
    }, [activeDomain, overallTrend, activeHorizon, nationalHistoricalRisk, domainsData]);


    const fetchInsight = async (force = false) => {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const currentParams = `${activeDomain}_${activeHorizon}`;
        if (!force && lastAnalyzedParams === currentParams) return;

        setIsInsightLoading(true);
        setInsightError(null);
        setInsight(null); // Clear previous insight to show loading
        
        try {
            const result = await getForecastingInsight(
                activeDomain,
                activeHorizon,
                topIncreases,
                topDecreases,
                overallTrend,
                controller.signal
            );
            setInsight(result);
            setLastAnalyzedParams(currentParams);
            setLastAnalyzedDate(formatIndonesianDate(new Date()));
        } catch (err: any) {
            if (err.name === 'AbortError') return;
            setInsightError("Gagal memuat insight. Silakan coba lagi.");
            setLastAnalyzedParams(''); // Reset to allow retry
            console.error(err);
        } finally {
            if (abortControllerRef.current === controller) {
                setIsInsightLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    
    useEffect(() => {
        if (processedForecastData.length === 0) {
            setIsInsightLoading(false);
            setInsight("Data historis tidak cukup untuk menghasilkan prediksi atau insight.");
            return;
        }
        
        fetchInsight();
    }, [debouncedActiveDomain, debouncedActiveHorizon, topIncreases, topDecreases, overallTrend]);


    const handleRefresh = () => {
        fetchInsight(true);
    };


    const handleCreatePlanFromForecast = (forecast: RegionalForecastData) => {
        const initialData: Partial<InterventionPlan> = {
            title: `Rencana Intervensi Proaktif untuk ${forecast.domain} di ${forecast.region}`,
            description: `Berdasarkan prediksi peningkatan risiko di bidang ${forecast.domain} (skor prediksi: ${forecast.predictedRisk}).`,
            region: forecast.region,
            domain: forecast.domain as Domain,
            priority: forecast.predictedRiskLevel === 'Kritis' ? InterventionPriority.High : InterventionPriority.Medium,
            status: InterventionStatus.Planning
        };
        handleOpenInterventionModal(initialData, true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Forecasting & Prediction</h2>
                    <p className="text-sm text-slate-500">Prediksi tren risiko untuk intervensi proaktif dalam {activeHorizon}.</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                     <div className="flex rounded-md shadow-sm">
                         <select
                            value={activeDomain}
                            onChange={(e) => {
                                setActiveDomain(e.target.value as Domain);
                            }}
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            aria-label="Select Domain"
                        >
                            {domains.map(d => <option key={d}>{d}</option>)}
                        </select>
                        <select
                            value={activeHorizon}
                            onChange={(e) => {
                                setActiveHorizon(e.target.value);
                            }}
                            className="bg-slate-50 border-t border-b border-slate-300 text-slate-900 text-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                             aria-label="Select Time Horizon"
                        >
                            {horizons.map(h => <option key={h}>{h}</option>)}
                        </select>

                         <button onClick={handleRefresh} className="bg-slate-50 border border-slate-300 text-slate-600 hover:bg-slate-100 text-sm rounded-r-lg p-2.5" aria-label="Refresh Data">
                            <ArrowPathIcon className="h-5 w-5"/>
                         </button>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                        <PredictionChart data={dynamicChartData} domain={activeDomain} horizon={activeHorizon} />
                    </div>
                    <ForecastingInsight 
                        isLoading={isInsightLoading}
                        insight={insight}
                        error={insightError}
                        onRegenerate={() => fetchInsight(true)}
                        lastAnalyzed={lastAnalyzedDate}
                    />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <PredictionSummary data={processedForecastData} />
                    <TopMovers data={processedForecastData} />
                </div>
                <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                    <RegionalRiskTable data={processedForecastData} onCreatePlan={handleCreatePlanFromForecast} />
                </div>
            </div>
        </div>
    );
};

export default Forecasting;