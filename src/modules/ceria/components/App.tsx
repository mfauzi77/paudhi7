import React, { useState, useEffect, useMemo, useRef } from 'react';
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
// FIX: Import RegionDetailData to add type annotations and resolve TS errors.
import { View, AlertLevel, RegionDetailData } from './types';
import ResourceAllocation from './components/ResourceAllocation';
import InterventionFormModal from './components/interventions/InterventionFormModal';
import { mockInterventionPlans, regionsDetails, kabupatenKotaDetails, allActiveAlerts } from './services/mockData';
import LandingPage from './components/LandingPage';
import WelcomeScreen from './components/WelcomeScreen';
import Reports from './components/Reports';
import ParentDashboard from './components/ParentDashboard';
import InputData from './components/InputData';
import ToastNotification from './components/shared/ToastNotification';
import UploadData from './components/UploadData';
import AiAgentSelection from './components/AiAgentSelection';
import ParentingAssistant from './components/ParentingAssistant';
import { ExclamationTriangleIcon } from './components/icons/Icons';

const App = () => {
  const [appMode, setAppMode] = useState(null);
  const [activeView, setActiveView] = useState(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interventionPlans, setInterventionPlans] = useState(mockInterventionPlans);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [interventionInitialData, setInterventionInitialData] = useState(null);
  const [navigationContext, setNavigationContext] = useState(null);
  const [toastAlert, setToastAlert] = useState(null);

  useEffect(() => {
    // Simulate receiving a high-priority alert after a delay
    const timer = setTimeout(() => {
        if (appMode === 'dashboard') { // Only show toast in dashboard mode
            const highPriorityAlerts = allActiveAlerts.filter(
                a => a.level === AlertLevel.Critical || a.level === AlertLevel.High
            );
            if (highPriorityAlerts.length > 0) {
                const randomAlert = highPriorityAlerts[Math.floor(Math.random() * highPriorityAlerts.length)];
                setToastAlert(randomAlert);
            }
        }
    }, 7000); // 7-second delay after app loads

    return () => clearTimeout(timer);
  }, [appMode]);

  const handleNavigateToDashboardApp = () => {
    setAppMode('dashboard');
    setActiveView(View.Dashboard);
  };
  
  const handleNavigateToAiApp = () => {
    setAppMode('ai');
    setActiveView(View.AiAgentSelection);
  };

  const handleLogout = () => {
      setAppMode(null); // Go back to welcome screen
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
    // FIX: Add types for the Map and the 'prov' parameter to resolve errors.
    const map = new Map<string, { regionId: string; kabKotaId?: string; }>();
    Object.values(regionsDetails).forEach((prov: RegionDetailData) => {
      map.set(prov.name.toLowerCase(), { regionId: prov.id });
      prov.kabupatenKotaIds?.forEach(kabKotaId => {
        const kabKota = kabupatenKotaDetails[kabKotaId];
        if (kabKota) {
          map.set(kabKota.name.toLowerCase(), { regionId: prov.id, kabKotaId: kabKota.id });
        }
      });
    });
    return map;
  }, []);

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
        if (planData.id && prevPlans.some(p => p.id === planData.id)) {
            return prevPlans.map(p => 
                p.id === planData.id 
                ? { ...p, ...planData, id: p.id }
                : p
            );
        } else {
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

  const renderDashboardContent = () => {
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
                />;
      case View.EWSPerBidang:
        return <EWSPerBidang />;
      case View.Intervensi:
        return <InterventionManagement 
            plans={interventionPlans} 
            onOpenModal={handleOpenInterventionModal} 
            onUpdatePlanStatus={handleUpdatePlanStatus}
        />;
      case View.DataProcessing:
        return <DataProcessing />;
      case View.UploadData:
        return <UploadData />;
      case View.InputData:
        return <InputData />;
      case View.ResourceAllocation:
        return <ResourceAllocation />;
      case View.Reports:
        return <Reports />;
      case View.ParentDashboard:
        return <ParentDashboard />;
      default:
        // If an AI view is selected somehow, default to dashboard
        if ([View.AiAgentSelection, View.SmartRecommendations, View.ParentingAssistant].includes(activeView)) {
            setActiveView(View.Dashboard);
            return <Dashboard handleOpenInterventionModal={handleOpenInterventionModal} />;
        }
        return <Placeholder title={activeView} />;
    }
  };
  
  if (!appMode) {
    return <WelcomeScreen onDashboardNavigate={handleNavigateToDashboardApp} onAiAgentNavigate={handleNavigateToAiApp} />;
  }

  if (appMode === 'ai') {
      const handleExitAi = () => setAppMode(null);

      switch (activeView) {
          case View.SmartRecommendations:
              return <SmartRecommendations onBack={() => setActiveView(View.AiAgentSelection)} />;
          case View.ParentingAssistant:
              return <ParentingAssistant onBack={() => setActiveView(View.AiAgentSelection)} />;
          case View.AiAgentSelection:
          default:
              return <AiAgentSelection 
                          onNavigateToCeria={() => setActiveView(View.SmartRecommendations)}
                          onNavigateToParenting={() => setActiveView(View.ParentingAssistant)}
                          onExit={handleExitAi}
                      />;
      }
  }

  // Render Dashboard Mode
  return (
    <div className={`relative flex h-screen bg-slate-100 dark:bg-slate-900 font-sans transition-opacity duration-500 ease-in-out opacity-100`}>
      <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
              setIsSidebarOpen={setIsSidebarOpen} 
              onLogout={handleLogout} 
              setActiveView={setActiveView}
              onNavigateToRegion={handleNavigateToRegion}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-black/20 p-4 sm:p-6 print:bg-white print:p-0">
          {renderDashboardContent()}
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