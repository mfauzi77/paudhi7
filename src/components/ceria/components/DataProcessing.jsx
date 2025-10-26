import React, { useState } from 'react';
import ApiKeyManager from './dataprocessing/ApiKeyManager';
import DataSources from './dataprocessing/DataSources';
import DataQuality from './dataprocessing/DataQuality';
import DataUploader from './dataprocessing/DataUploader';
import ManualJobs from './dataprocessing/ManualJobs';
import ProcessingLogs from './dataprocessing/ProcessingLogs';
import DataIntegrationItem from './dataprocessing/DataIntegrationItem';

const DataProcessing = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'sources', label: 'Data Sources', icon: '🔗' },
        { id: 'upload', label: 'Upload Data', icon: '📤' },
        { id: 'integration', label: 'Data Integration', icon: '🔧' },
        { id: 'jobs', label: 'Manual Jobs', icon: '⚙️' },
        { id: 'logs', label: 'Processing Logs', icon: '📋' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <DataQuality />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DataSources />
                            <ApiKeyManager />
                        </div>
                    </div>
                );
            case 'sources':
                return (
                    <div className="space-y-6">
                        <DataSources />
                        <ApiKeyManager />
                    </div>
                );
            case 'upload':
                return <DataUploader />;
            case 'integration':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Data Integration</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DataIntegrationItem 
                                kementerian="Kementerian Kesehatan" 
                                platform="API Kemenkes" 
                                dataName="Data Imunisasi" 
                            />
                            <DataIntegrationItem 
                                kementerian="Kementerian Kesehatan" 
                                platform="API Kemenkes" 
                                dataName="Data Gizi" 
                            />
                            <DataIntegrationItem 
                                kementerian="Dapodik" 
                                platform="API Dapodik" 
                                dataName="Data PAUD" 
                            />
                            <DataIntegrationItem 
                                kementerian="BPS" 
                                platform="API BPS" 
                                dataName="Data Sosial Ekonomi" 
                            />
                        </div>
                    </div>
                );
            case 'jobs':
                return <ManualJobs />;
            case 'logs':
                return <ProcessingLogs />;
            default:
                return <div>Tab tidak ditemukan</div>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Data Processing</h1>
                <p className="text-slate-600">Kelola dan proses data PAUD HI dari berbagai sumber</p>
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

export default DataProcessing;
