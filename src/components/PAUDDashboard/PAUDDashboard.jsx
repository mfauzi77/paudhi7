// PAUDDashboard.jsx - Main Component (Fixed Version)
import React, { useState, useEffect } from 'react';
import { PAUDDashboardProvider, usePAUDDashboard } from './PAUDData';
import { PAUDBreadcrumb, PAUDLoadingSpinner, PAUDEmptyState } from './PAUDComponents';
import { 
  PAUDRekapitulasiSection,
  PAUDKLHeader,
  PAUDSummaryGrid,
  PAUDProgramTable,
  PAUDTabNavigation
} from './PAUDSections';
import { Construction, AlertCircle, RefreshCw } from 'lucide-react';

// ==================== TAB CONTENT COMPONENT ====================
const PAUDTabContent = ({ 
  activeTab, 
  tabs, 
  children,
  className = '' 
}) => {
  const currentTab = tabs.find(tab => tab.id === activeTab);
  
  if (!currentTab) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
        <PAUDEmptyState 
          icon={AlertCircle}
          title="Tab tidak ditemukan"
          description="Tab yang diminta tidak tersedia"
        />
      </div>
    );
  }

  // If custom content is provided, use it
  if (children) {
    return <div className={className}>{children}</div>;
  }

  // If tab has content component, render it
  if (currentTab.component) {
    const Component = currentTab.component;
    return <Component {...currentTab.props} className={className} />;
  }

  // Default under construction content
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      <PAUDEmptyState 
        icon={Construction}
        title="Data Sedang Dalam Pengembangan"
        description={`Detail program ${currentTab.label} akan segera tersedia`}
      />
    </div>
  );
};

// ==================== DASHBOARD CONTENT COMPONENT ====================
const PAUDDashboardContent = ({ 
  showBreadcrumb = true,
  showTabs = true,
  defaultTab = 'kemenko-pmk',
  onKLSelect = null,
  onProgramSelect = null,
  onDataExport = null,
  loading = false,
  error = null,
  className = '',
  breadcrumbItems = [],
  customTabs = null
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { setSelectedKL, getCurrentKLData } = usePAUDDashboard();

  // Default tabs configuration
  const defaultTabs = [
    { id: 'kemenko-pmk', label: 'Kemenko PMK', badge: '8' },
    { id: 'kemendikdasmen', label: 'Kemendikdasmen', badge: '6' },
    { id: 'kemenkes', label: 'Kemenkes', badge: '7' },
    { id: 'bkkbn', label: 'BKKBN', badge: '5' },
    { id: 'kemensos', label: 'Kemensos', badge: '6' },
    { id: 'kemen-pppa', label: 'Kemen PPPA', badge: '4' },
    { id: 'kemendagri', label: 'Kemendagri', badge: '3' },
    { id: 'bappenas', label: 'Bappenas', badge: '4' },
    { id: 'kemenag', label: 'Kemenag', badge: '5' },
    { id: 'kemendesa', label: 'Kemendesa', badge: '4' },
    { id: 'bps', label: 'BPS', badge: '3' }
  ];

  const tabs = customTabs || defaultTabs;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedKL(tabId);
  };

  const handleKLSelect = (klName) => {
    // Map KL name to tab ID
    const klMapping = {
      'Kemenko PMK': 'kemenko-pmk',
      'Kemendikdasmen': 'kemendikdasmen',
      'Kementerian Kesehatan': 'kemenkes',
      'BKKBN': 'bkkbn',
      'Kementerian Sosial': 'kemensos',
      'Kemen PPPA': 'kemen-pppa',
      'Kemendagri': 'kemendagri',
      'Bappenas': 'bappenas',
      'Kementerian Agama': 'kemenag',
      'Kemendesa': 'kemendesa',
      'Badan Pusat Statistik': 'bps'
    };
    
    const tabId = klMapping[klName];
    if (tabId) {
      handleTabChange(tabId);
    }

    // Call external callback if provided
    if (onKLSelect) {
      onKLSelect(klName, tabId);
    }
  };

  const handleProgramSelect = (program) => {
    if (onProgramSelect) {
      onProgramSelect(program, getCurrentKLData());
    }
  };

  const handleDataExport = (data) => {
    if (onDataExport) {
      onDataExport(data, getCurrentKLData());
    }
  };

  // Error state
  if (error) {
    return (
      <div className={`bg-gray-50 font-sans ${className}`}>
        {showBreadcrumb && <PAUDBreadcrumb items={breadcrumbItems} />}
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          <PAUDEmptyState 
            icon={AlertCircle}
            title="Terjadi Kesalahan"
            description={error.message || "Gagal memuat data dashboard"}
            action={
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Muat Ulang
              </button>
            }
          />
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className={`bg-gray-50 font-sans ${className}`}>
        {showBreadcrumb && <PAUDBreadcrumb items={breadcrumbItems} />}
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <PAUDLoadingSpinner size="xl" className="mx-auto mb-4" />
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Memuat Dashboard PAUD HI
              </div>
              <div className="text-sm text-gray-500">
                Sedang mengambil data terbaru...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 font-sans ${className}`}>
      {showBreadcrumb && <PAUDBreadcrumb items={breadcrumbItems} />}
      
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Rekapitulasi Section */}
        <PAUDRekapitulasiSection 
          onKLSelect={handleKLSelect}
          loading={loading}
        />
        
        {/* KL Header */}
        <PAUDKLHeader loading={loading} />
        
        {/* Summary Grid */}
        <PAUDSummaryGrid loading={loading} />
        
        {/* Tab Navigation */}
        {showTabs && (
          <PAUDTabNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            tabs={tabs} 
          />
        )}
        
        {/* Tab Content */}
        <PAUDTabContent activeTab={activeTab} tabs={tabs}>
          {activeTab === 'kemenko-pmk' ? (
            <PAUDProgramTable 
              onProgramSelect={handleProgramSelect}
              onExport={handleDataExport}
            />
          ) : (
            <PAUDEmptyState 
              icon={Construction}
              title="Data Sedang Dalam Pengembangan"
              description={`Detail program ${tabs.find(tab => tab.id === activeTab)?.label} akan segera tersedia`}
            />
          )}
        </PAUDTabContent>
      </div>
    </div>
  );
};

// ==================== DASHBOARD VARIANTS ====================

// Compact Dashboard - Hanya rekapitulasi
const PAUDCompactDashboard = ({ 
  className = '',
  showYearFilter = true,
  onKLSelect = null 
}) => {
  return (
    <PAUDDashboardProvider>
      <div className={`bg-gray-50 font-sans ${className}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <PAUDRekapitulasiSection 
            onKLSelect={onKLSelect}
            showYearFilter={showYearFilter}
          />
        </div>
      </div>
    </PAUDDashboardProvider>
  );
};

// KL Dashboard - Fokus pada satu K/L
const PAUDKLDashboard = ({ 
  klId = 'kemenko-pmk',
  className = '',
  showBreadcrumb = false,
  onProgramSelect = null 
}) => {
  return (
    <PAUDDashboardProvider>
      <div className={`bg-gray-50 font-sans ${className}`}>
        {showBreadcrumb && <PAUDBreadcrumb />}
        
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <PAUDKLHeader />
          <PAUDSummaryGrid />
          <PAUDProgramTable onProgramSelect={onProgramSelect} />
        </div>
      </div>
    </PAUDDashboardProvider>
  );
};

// Embedded Dashboard - Untuk iframe atau embed
const PAUDEmbeddedDashboard = ({ 
  height = '600px',
  showControls = false,
  theme = 'light',
  className = '' 
}) => {
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';

  return (
    <PAUDDashboardProvider>
      <div 
        className={`${themeClasses} font-sans overflow-auto ${className}`}
        style={{ height }}
      >
        <div className="p-4 space-y-6">
          <PAUDRekapitulasiSection showYearFilter={showControls} />
          {showControls && (
            <>
              <PAUDKLHeader />
              <PAUDSummaryGrid />
            </>
          )}
        </div>
      </div>
    </PAUDDashboardProvider>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================
const PAUDDashboard = ({ 
  // Basic props
  showBreadcrumb = true,
  showTabs = true,
  className = '',
  
  // Data props
  initialData = null,
  apiEndpoint = null,
  
  // Customization props
  defaultTab = 'kemenko-pmk',
  breadcrumbItems = [],
  customTabs = null,
  
  // Event handlers
  onKLSelect = null,
  onProgramSelect = null,
  onDataExport = null,
  onError = null,
  
  // State management props
  loading: externalLoading = false,
  error: externalError = null,
  
  // Feature flags
  enableRealTimeUpdates = false,
  autoRefreshInterval = null, // in milliseconds
  
  // Styling props
  theme = 'light',
  compact = false
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);

  const loading = externalLoading || internalLoading;
  const error = externalError || internalError;

  // Auto refresh functionality
  useEffect(() => {
    if (autoRefreshInterval && enableRealTimeUpdates) {
      const interval = setInterval(() => {
        // Refresh data logic here
        console.log('Auto refreshing dashboard data...');
      }, autoRefreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval, enableRealTimeUpdates]);

  // Fetch data from API if endpoint provided
  useEffect(() => {
    if (apiEndpoint) {
      setInternalLoading(true);
      fetch(apiEndpoint)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          // Handle API data
          setInternalError(null);
        })
        .catch(err => {
          setInternalError(err);
          if (onError) {
            onError(err);
          }
        })
        .finally(() => {
          setInternalLoading(false);
        });
    }
  }, [apiEndpoint, onError]);

  // Compact version
  if (compact) {
    return (
      <PAUDCompactDashboard 
        className={className}
        onKLSelect={onKLSelect}
      />
    );
  }

  return (
    <PAUDDashboardProvider initialData={initialData}>
      <PAUDDashboardContent
        showBreadcrumb={showBreadcrumb}
        showTabs={showTabs}
        defaultTab={defaultTab}
        onKLSelect={onKLSelect}
        onProgramSelect={onProgramSelect}
        onDataExport={onDataExport}
        loading={loading}
        error={error}
        className={className}
        breadcrumbItems={breadcrumbItems}
        customTabs={customTabs}
      />
    </PAUDDashboardProvider>
  );
};

// ==================== HOOKS FOR EXTERNAL USE ====================

// Custom hook for dashboard state management
const usePAUDDashboardState = () => {
  const [activeTab, setActiveTab] = useState('kemenko-pmk');
  const [filters, setFilters] = useState({
    year: '2025',
    search: '',
    status: ''
  });
  
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      year: '2025',
      search: '',
      status: ''
    });
  };
  
  return {
    activeTab,
    setActiveTab,
    filters,
    updateFilter,
    resetFilters
  };
};

// Hook for dashboard analytics
const usePAUDAnalytics = () => {
  const trackEvent = (eventName, properties = {}) => {
    console.log('Analytics Event:', eventName, properties);
    // Implement analytics tracking here
  };
  
  const trackKLSelect = (klName) => {
    trackEvent('kl_selected', { kl_name: klName });
  };
  
  const trackProgramView = (programName) => {
    trackEvent('program_viewed', { program_name: programName });
  };
  
  const trackDataExport = (exportType) => {
    trackEvent('data_exported', { export_type: exportType });
  };
  
  return {
    trackKLSelect,
    trackProgramView,
    trackDataExport
  };
};

// ==================== CLEAN EXPORTS (NO CONFLICTS) ====================
export default PAUDDashboard;

// Named exports for variants and utilities
export {
  PAUDCompactDashboard,
  PAUDKLDashboard,
  PAUDEmbeddedDashboard,
  PAUDDashboardContent,
  PAUDTabContent,
  usePAUDDashboardState,
  usePAUDAnalytics
};