import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import DataPerWilayah from './components/DataPerWilayah';
import EWSPerBidang from './components/EWSPerBidang';
import SmartRecommendations from './components/SmartRecommendations';
import DataProcessing from './components/DataProcessing';
import InterventionManagement from './components/InterventionManagement';
import Placeholder from './components/Placeholder';
import { View, InterventionPlan, ActiveAlertData, AlertLevel, ActionItem, InterventionStatus } from './types';
import ResourceAllocation from './components/ResourceAllocation';
import InterventionFormModal from './components/interventions/InterventionFormModal';
import { getMockData } from './services/mockData';
import LandingPage from './components/LandingPage';
import Reports from './components/Reports';
import ParentDashboard from './components/ParentDashboard';
import InputData from './components/InputData';
import ToastNotification from './components/shared/ToastNotification';
import Data from './components/Data';
import { ImportKemenkesImunisasi, ImportKemenkesGizi, ImportKemenkesKIA, ImportKemenkesPenyakit, ImportDapodikAPM, ImportDapodikSatuan, ImportDapodikGuru, ImportDukcapilIdentitas, ImportKPPPAKekerasan, ImportKPPPPAPerkawinan, ImportBPSSosialEkonomi, ImportBPSPerkawinan, ImportKemensosBansos, ImportPUPRInfrastruktur, ImportBNPBRisiko, ImportBMKGKualitas } from './components/dataintegrations';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { useTheme } from './components/ThemeContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mockData, setMockData] = useState(null);

  const [activeView, setActiveView] = useState(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interventionPlans, setInterventionPlans] = useState([]);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [interventionInitialData, setInterventionInitialData] = useState(null);
  const [navigationContext, setNavigationContext] = useState(null);
  const [toastAlert, setToastAlert] = useState(null);

  // Get theme context
  const { isAdmin, useIntegration } = useTheme();

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMockData();
        setMockData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading mock data:', error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!mockData) return;

    // Simulate receiving a high-priority alert after a delay (only for mock data)
    const timer = setTimeout(() => {
        // Only show toast notifications for mock data, not for data integration
        if (!useIntegration && mockData.allActiveAlerts) {
            const highPriorityAlerts = mockData.allActiveAlerts.filter(
                a => a.level === AlertLevel.Critical || a.level === AlertLevel.High
            );
            if (highPriorityAlerts.length > 0) {
                const randomAlert = highPriorityAlerts[Math.floor(Math.random() * highPriorityAlerts.length)];
                setToastAlert(randomAlert);
            }
        }
    }, 7000); // 7-second delay after app loads

    return () => clearTimeout(timer);
  }, [useIntegration, mockData]);

  // Effect to manage intervention plans based on data source
  useEffect(() => {
    if (useIntegration) {
      // For data integration, start with empty array
      setInterventionPlans([]);
    } else {
      // For mock data, use mock intervention plans
      setInterventionPlans(mockData?.mockInterventionPlans || []);
    }
  }, [useIntegration, mockData]);

  const handleLogout = () => {
      setActiveView(View.Dashboard); // Reset view to default for next login
  };

  const handleOpenInterventionModal = (initialData = null, navigateToInterventions = false) => {
    setInterventionInitialData(initialData);
    setIsInterventionModalOpen(true);
    if (navigateToInterventions) {
      setActiveView(View.Intervensi);
    }
  };

  const handleCloseInterventionModal = () => {
    setIsInterventionModalOpen(false);
    setInterventionInitialData(null);
  };
  
  const handleNavigateToDashboard = () => {
    setActiveView(View.Dashboard);
  };

  const regionNameToIdMap = useMemo(() => {
    if (!mockData) return new Map();
    const map = new Map();
    Object.values(mockData.regionsDetails || {}).forEach(prov => {
      map.set(prov.name.toLowerCase(), { regionId: prov.id });
      prov.kabupatenKotaIds?.forEach(kabKotaId => {
        const kabKota = mockData.kabupatenKotaDetails?.[kabKotaId];
        if (kabKota) {
          map.set(kabKota.name.toLowerCase(), { regionId: prov.id, kabKotaId: kabKota.id });
        }
      });
    });
    return map;
  }, [mockData]);

  const handleNavigateToRegion = (regionName) => {
    const locationInfo = regionNameToIdMap.get(regionName.toLowerCase());
    if (locationInfo) {
      setNavigationContext({
        regionId: locationInfo.regionId,
        kabupatenKotaId: locationInfo.kabKotaId,
      });
      setActiveView(View.DataPerWilayah);
    } else {
      console.warn(`Region '${regionName}' not found for navigation.`);
      setActiveView(View.Dashboard);
    }
  };

  const handleSaveIntervention = (planData) => {
    setInterventionPlans(prevPlans => {
        // Check if it's an update by looking for an existing ID
        if (planData.id && prevPlans.some(p => p.id === planData.id)) {
            return prevPlans.map(p => 
                p.id === planData.id 
                ? { ...p, ...planData, id: p.id } // Merge data, ensure ID remains constant
                : p
            );
        } else {
            // It's a new plan, create it
            const newPlan = {
                ...planData,
                id: `plan-${Date.now()}`,
                actionItems: planData.actionItems || [],
            };
            return [newPlan, ...prevPlans];
        }
    });
    handleCloseInterventionModal();
};

 const handleUpdatePlanStatus = (planId, newStatus) => {
    setInterventionPlans(prevPlans =>
        prevPlans.map(p =>
            p.id === planId ? { ...p, status: newStatus } : p
        )
    );
 };

  const handleCloseToast = () => {
    setToastAlert(null);
  };

  const handleToastNavigate = (regionName) => {
      handleNavigateToRegion(regionName);
      handleCloseToast();
  };

  const renderContent = () => {
    switch (activeView) {
      case View.LandingPage:
        return <LandingPage onNavigate={handleNavigateToDashboard} />;
      case View.Dashboard:
        return <Dashboard handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.Forecasting:
        return <Forecasting handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.DataPerWilayah:
        return <DataPerWilayah 
                    handleOpenInterventionModal={handleOpenInterventionModal}
                    navigationContext={navigationContext}
                    onContextHandled={() => setNavigationContext(null)}
                    regionsDetails={mockData?.regionsDetails || {}}
                    kabupatenKotaDetails={mockData?.kabupatenKotaDetails || {}}
                />;
      case View.EWSPerBidang:
        return <EWSPerBidang />;
      case View.SmartRecommendations:
        return <SmartRecommendations />;
       case View.Intervensi:
        return <InterventionManagement 
            plans={interventionPlans} 
            onOpenModal={handleOpenInterventionModal} 
            onUpdatePlanStatus={handleUpdatePlanStatus}
        />;
      case View.DataProcessing:
        return <DataProcessing />;
      case View.Data:
        return <Data />;
      case View.InputData:
        return <InputData />;
      case View.ResourceAllocation:
        return <ResourceAllocation />;
      case View.Reports:
        return <Reports />;
      case View.ParentDashboard:
        return <ParentDashboard />;
      case View.Import_Kemenkes_Imunisasi:
        return <ImportKemenkesImunisasi />;
      case View.Import_Kemenkes_Gizi:
        return <ImportKemenkesGizi />;
      case View.Import_Kemenkes_KIA:
        return <ImportKemenkesKIA />;
      case View.Import_Kemenkes_Penyakit:
        return <ImportKemenkesPenyakit />;
      case View.Import_Dapodik_APM_APK:
        return <ImportDapodikAPM />;
      case View.Import_Dapodik_SatuanPAUD:
        return <ImportDapodikSatuan />;
      case View.Import_Dapodik_KualitasGuru:
        return <ImportDapodikGuru />;
      case View.Import_Dukcapil_IdentitasAnak:
        return <ImportDukcapilIdentitas />;
      case View.Import_KemenPPPA_Kekerasan:
        return <ImportKPPPAKekerasan />;
      case View.Import_KemenPPPA_PerkawinanAnak:
        return <ImportKPPPPAPerkawinan />;
      case View.Import_BPS_SosialEkonomi:
        return <ImportBPSSosialEkonomi />;
      case View.Import_BPS_PerkawinanAnak:
        return <ImportBPSPerkawinan />;
      case View.Import_Kemensos_Bansos:
        return <ImportKemensosBansos />;
      case View.Import_PUPR_Infrastruktur:
        return <ImportPUPRInfrastruktur />;
      case View.Import_BNPB_RisikoBencana:
        return <ImportBNPBRisiko />;
      case View.Import_BMKG_KualitasLingkungan:
        return <ImportBMKGKualitas />;
      default:
        return <Placeholder title={activeView} />;
    }
  };
  
  if (isLoading) {
    return <div className="fixed inset-0 bg-white dark:bg-slate-900" />; // Prevent flash of unstyled content
  }

  return (
    <div className={`relative flex h-screen bg-slate-100 dark:bg-slate-900 font-sans transition-opacity duration-500 ease-in-out opacity-100`}>
      <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
              setIsSidebarOpen={setIsSidebarOpen} 
              onLogout={handleLogout} 
              setActiveView={setActiveView}
              onNavigateToRegion={handleNavigateToRegion}
              activeView={activeView}
          />
          <Sidebar 
              activeView={activeView} 
              setActiveView={setActiveView} 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen}
              horizontal
              onNavigateToRegion={handleNavigateToRegion}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-black/20 p-4 sm:p-6 print:bg-white print:p-0">
          {activeView === View.Login ? (
            <Login onSuccess={() => setActiveView(View.AdminDashboard)} />
          ) : activeView === View.AdminDashboard ? (
            <AdminDashboard setActiveView={setActiveView} />
          ) : (
            renderContent()
          )}
          </main>
      </div>
      <InterventionFormModal
          isOpen={isInterventionModalOpen}
          onClose={handleCloseInterventionModal}
          onSave={handleSaveIntervention}
          initialData={interventionInitialData}
      />
      {toastAlert && (
          <ToastNotification
              alert={toastAlert}
              onClose={handleCloseToast}
              onNavigate={handleToastNavigate}
          />
      )}
    </div>
  );
};

export default App;
