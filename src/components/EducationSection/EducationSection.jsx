// EducationSection.jsx - KOMPONEN UTAMA YANG MENGATUR TAMPILAN
import React, { useState, useCallback, useEffect } from 'react';

// Import semua komponen child
import PanduanHolistik from './PanduanHolistik';     // ← Tampilan panduan PDF
import VideoIntegratif from './VideoIntegratif';     // ← Tampilan video YouTube  
import ToolsAssessment from './ToolsAssessment';     // ← Tampilan tools download
import StudiKasus from './StudiKasus';               // ← Tampilan studi kasus
import DigitalResources from './DigitalResources';   // ← Tampilan digital resources
import Modal from './Modal';                         // ← Modal popup detail
import { tabsConfig } from './data';                 // ← Data konfigurasi
import { getTabColorClasses } from './utils';        // ← Utility functions

const EducationSection = () => {
  // ===== STATE MANAGEMENT =====
  const [activeTab, setActiveTab] = useState('panduan');  // Tab mana yang aktif
  const [selectedItem, setSelectedItem] = useState(null); // Item yang dipilih untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);  // Status modal buka/tutup

  // ===== MODAL HANDLERS =====
  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  // ===== TAB CHANGE HANDLER =====
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // ===== RENDER LOGIC - INI YANG MENGATUR TAMPILAN =====
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'panduan':
        return <PanduanHolistik onItemClick={openModal} />;  // ← Tampilkan komponen panduan
      case 'video':
        return <VideoIntegratif onItemClick={openModal} />;  // ← Tampilkan komponen video
      case 'tools':
        return <ToolsAssessment onItemClick={openModal} />;  // ← Tampilkan komponen tools
      case 'kasus':
        return <StudiKasus />;                               // ← Tampilkan komponen studi kasus
      case 'digital':
        return <DigitalResources />;                         // ← Tampilkan komponen digital
      default:
        return <PanduanHolistik onItemClick={openModal} />;
    }
  };

  return (
    <div>
      <section id="edukasi" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* ===== HEADER SECTION ===== */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Pusat Sumber Edukasi
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Pengembangan Anak Usia Dini Holistik Integratif
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Platform komprehensif yang mengintegrasikan 6 aspek perkembangan anak
            </p>
          </div>

          {/* ===== TABS NAVIGATION - PENGATUR SWITCHING ===== */}
          <div className="flex flex-wrap justify-center gap-3 mb-8" role="tablist">
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}  // ← Handler untuk ganti tab
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${getTabColorClasses(tab.color, activeTab === tab.id)}`}
              >
                <i className={tab.icon}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ===== CONTENT AREA - TEMPAT RENDER KOMPONEN ===== */}
          <div role="tabpanel" id={`tabpanel-${activeTab}`}>
            {renderActiveComponent()}  {/* ← INI YANG RENDER KOMPONEN SESUAI TAB */}
          </div>
        </div>
      </section>

      {/* ===== MODAL COMPONENT ===== */}
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