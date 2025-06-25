// src/components/EducationSection/EducationSection.jsx
import React, { useState, useCallback, useEffect } from 'react';
import PanduanHolistik from './PanduanHolistik';
import VideoIntegratif from './VideoIntegratif';
import ToolsAssessment from './ToolsAssessment';
import StudiKasus from './StudiKasus';
import DigitalResources from './DigitalResources';
import Modal from './Modal';
import { tabsConfig } from './data';
import { getTabColorClasses } from './utils';

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState('panduan');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Keyboard navigation dan accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen && event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Optimized modal handlers
  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  // Optimized handlers
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Render active component
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'panduan':
        return <PanduanHolistik onItemClick={openModal} />;
      case 'video':
        return <VideoIntegratif onItemClick={openModal} />;
      case 'tools':
        return <ToolsAssessment onItemClick={openModal} />;
      case 'kasus':
        return <StudiKasus />;
      case 'digital':
        return <DigitalResources />;
      default:
        return <PanduanHolistik onItemClick={openModal} />;
    }
  };

  return (
    <div>
      <section id="edukasi" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Pusat Sumber Edukasi
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Pengembangan Anak Usia Dini Holistik Integratif
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Platform komprehensif yang mengintegrasikan 6 aspek perkembangan anak: Kognitif & Bahasa, Fisik Motorik, 
              Sosial Emosional, Seni & Kreativitas, Moral & Spiritual, serta Kesehatan & Gizi
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8" role="tablist" aria-label="Kategori konten edukasi">
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getTabColorClasses(tab.color, activeTab === tab.id)} ${activeTab === tab.id ? 'shadow-lg transform -translate-y-1' : 'shadow-md hover:shadow-lg hover:transform hover:-translate-y-1'}`}
              >
                <i className={tab.icon} aria-hidden="true"></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div 
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {renderActiveComponent()}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <Modal 
          item={selectedItem} 
          activeTab={activeTab} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default EducationSection;