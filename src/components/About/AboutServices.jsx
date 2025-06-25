import React, { useState } from 'react';

// ==================== SUB-COMPONENTS ====================

// Section Number Component
const SectionNumber = ({ number, bgColor = "bg-blue-500" }) => (
  <span className={`inline-flex items-center justify-center w-8 h-8 ${bgColor} text-white rounded-full font-bold text-sm mr-4`}>
    {number}
  </span>
);

// Visual Separator Component
const VisualSeparator = ({ icon, className = "" }) => (
  <div className={`text-center my-16 relative ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    <div className="bg-white px-6 text-blue-500 text-2xl relative">
      <i className={`fas ${icon}`}></i>
    </div>
  </div>
);

// Highlight Box Component
const HighlightBox = ({ children, className = "", borderColor = "from-blue-500 to-green-500" }) => (
  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden ${className}`}>
    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${borderColor}`}></div>
    {children}
  </div>
);

// Vision Mission Card Component
const VisionMissionCard = ({ type, title, content, icon, bgColor = "bg-blue-500" }) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className={`${bgColor} text-white p-8 text-center group-hover:scale-105 transition-transform duration-300`}>
      <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="text-lg font-semibold mb-2 opacity-90">{type}</div>
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
    </div>
    <div className="p-8">
      <p className="text-gray-700 leading-relaxed text-lg">{content}</p>
    </div>
  </div>
);

// Stakeholder Card Component
const StakeholderCard = ({ icon, title, description, iconBg = "bg-blue-500" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`text-center p-6 md:p-8 bg-white rounded-2xl border border-gray-100 transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-xl transform -translate-y-2' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 md:w-20 h-16 md:h-20 ${iconBg} rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl mx-auto mb-6 transition-transform duration-300 ${
        isHovered ? 'scale-110 rotate-6' : ''
      }`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, description, features, iconBg = "bg-blue-500" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="p-6 md:p-8">
        {/* Service Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 md:w-16 h-12 md:h-16 ${iconBg} rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300`}>
            <i className={`fas ${icon}`}></i>
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Service Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        
        {/* Service Features */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-32'}`}>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Expand/Collapse Button */}
        {features.length > 3 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
          >
            {isExpanded ? 'Tutup' : 'Lihat Selengkapnya'}
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} transition-transform duration-300`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const AboutServices = ({
  showSeparator1 = true,
  showSeparator2 = true,
  showSection5 = true,
  showSection6 = true,
  showSection7 = true,
  customVisionMission = null,
  customStakeholders = null,
  customServices = null,
  containerClassName = "",
  sectionClassName = ""
}) => {

  // Default Vision Mission Data
  const defaultVisionMission = [
    {
      type: "VISI",
      title: "Visi SIMONEV PAUD HI",
      content: "Menjadi platform digital terdepan yang mendukung terciptanya anak Indonesia yang sehat, cerdas, ceria, dan berakhlak mulia melalui layanan PAUD Holistik Integratif yang berkualitas, merata, dan berkelanjutan di seluruh Nusantara.",
      icon: "fa-eye",
      bgColor: "bg-blue-600"
    },
    {
      type: "MISI",
      title: "Misi SIMONEV PAUD HI", 
      content: "Menyediakan sistem informasi dan monitoring yang andal, akurat, dan real-time untuk mendukung implementasi, evaluasi, dan pengembangan program PAUD HI secara efektif dan efisien dengan melibatkan seluruh stakeholder.",
      icon: "fa-rocket",
      bgColor: "bg-green-600"
    }
  ];

  // Default Stakeholders Data
  const defaultStakeholders = [
    {
      icon: "fa-building",
      title: "Pemerintah",
      description: "Kementerian, dinas, dan pemerintah daerah sebagai penanggung jawab kebijakan dan implementasi program PAUD HI.",
      iconBg: "bg-blue-600"
    },
    {
      icon: "fa-graduation-cap",
      title: "Lembaga Pendidikan",
      description: "PAUD formal dan non-formal, KB, TPA, dan SPS yang menyediakan layanan pendidikan anak usia dini.",
      iconBg: "bg-green-600"
    },
    {
      icon: "fa-hospital",
      title: "Fasilitas Kesehatan",
      description: "Puskesmas, posyandu, dan fasilitas kesehatan lainnya yang melayani kesehatan anak dan ibu.",
      iconBg: "bg-red-600"
    },
    {
      icon: "fa-users",
      title: "Keluarga & Masyarakat",
      description: "Orang tua, keluarga, dan komunitas masyarakat sebagai lingkungan terdekat anak.",
      iconBg: "bg-purple-600"
    },
    {
      icon: "fa-handshake",
      title: "Mitra & LSM",
      description: "Organisasi masyarakat sipil, LSM, dan mitra pembangunan yang mendukung program PAUD HI.",
      iconBg: "bg-yellow-600"
    },
    {
      icon: "fa-briefcase",
      title: "Sektor Swasta",
      description: "Perusahaan dan sektor swasta yang berkontribusi dalam CSR dan dukungan program PAUD HI.",
      iconBg: "bg-gray-600"
    }
  ];

  // Default Services Data
  const defaultServices = [
    {
      icon: "fa-graduation-cap",
      title: "Pendidikan",
      description: "Layanan pendidikan anak usia dini yang berkualitas dan sesuai tahap perkembangan",
      features: [
        "Program pembelajaran holistik",
        "Kurikulum berbasis kompetensi", 
        "Metode bermain sambil belajar",
        "Asesmen perkembangan berkala",
        "Pelatihan guru profesional",
        "Media pembelajaran interaktif"
      ],
      iconBg: "bg-blue-500"
    },
    {
      icon: "fa-heartbeat",
      title: "Kesehatan & Gizi",
      description: "Pemantauan kesehatan dan pemenuhan gizi optimal untuk tumbuh kembang anak",
      features: [
        "Imunisasi lengkap dan berkala",
        "Pemantauan pertumbuhan",
        "Deteksi dini gangguan kesehatan", 
        "Program gizi seimbang",
        "Edukasi kesehatan keluarga",
        "Sistem rujukan terintegrasi"
      ],
      iconBg: "bg-green-500"
    },
    {
      icon: "fa-users",
      title: "Pengasuhan",
      description: "Dukungan pengasuhan positif dan responsif untuk orang tua dan keluarga",
      features: [
        "Edukasi pola asuh positif",
        "Kelas parenting interaktif",
        "Konseling keluarga",
        "Stimulasi tumbuh kembang",
        "Support group orang tua",
        "Home visit program"
      ],
      iconBg: "bg-purple-500"
    },
    {
      icon: "fa-shield-alt", 
      title: "Perlindungan",
      description: "Sistem perlindungan anak dari berbagai bentuk kekerasan dan penelantaran",
      features: [
        "Pencegahan kekerasan anak",
        "Advokasi hak anak",
        "Sistem pelaporan terintegrasi",
        "Rehabilitasi dan pendampingan",
        "Jaringan perlindungan komunitas",
        "Edukasi child-friendly spaces"
      ],
      iconBg: "bg-red-500"
    },
    {
      icon: "fa-home",
      title: "Kesejahteraan Sosial",
      description: "Dukungan kesejahteraan sosial untuk keluarga dan komunitas",
      features: [
        "Program bantuan sosial",
        "Pemberdayaan keluarga",
        "Akses layanan dasar",
        "Pengembangan komunitas",
        "Ekonomi keluarga produktif",
        "Jaringan sosial support"
      ],
      iconBg: "bg-yellow-500"
    }
  ];

  const visionMissionData = customVisionMission || defaultVisionMission;
  const stakeholdersData = customStakeholders || defaultStakeholders;
  const servicesData = customServices || defaultServices;

  return (
    <div className={`min-h-screen bg-gray-50 ${containerClassName}`}>
      {/* Separator 1 */}
      {showSeparator1 && (
        <VisualSeparator icon="fa-bullseye" />
      )}

      {/* Section 5: Vision Mission */}
      {showSection5 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="5" />
                Visi & Misi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Komitmen kami dalam mewujudkan layanan PAUD HI yang berkualitas untuk seluruh anak Indonesia dengan pendekatan yang terukur dan berkelanjutan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {visionMissionData.map((item, index) => (
                <VisionMissionCard 
                  key={index}
                  type={item.type}
                  title={item.title}
                  content={item.content}
                  icon={item.icon}
                  bgColor={item.bgColor}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Separator 2 */}
      {showSeparator2 && (
        <VisualSeparator icon="fa-users" />
      )}

      {/* Section 6: Stakeholders */}
      {showSection6 && (
        <section className={`py-16 md:py-20 bg-white ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="6" />
                Ekosistem & Kolaborasi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                PAUD HI melibatkan berbagai pihak dalam satu ekosistem yang terintegrasi untuk memberikan layanan terbaik bagi anak Indonesia dengan pendekatan multi-stakeholder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {stakeholdersData.map((stakeholder, index) => (
                <StakeholderCard 
                  key={index}
                  icon={stakeholder.icon}
                  title={stakeholder.title}
                  description={stakeholder.description}
                  iconBg={stakeholder.iconBg}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 7: Service Scope */}
      <section className={`py-16 md:py-20 ${sectionClassName}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <SectionNumber number="7" />
              Lima Pilar Layanan PAUD HI
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Layanan komprehensif yang mencakup seluruh kebutuhan tumbuh kembang anak usia dini dengan pendekatan holistik dan terintegrasi.
            </p>
          </div>

          <HighlightBox className="text-center mb-12">
            <h3 className="text-blue-600 text-xl font-semibold mb-4">
              🌟 Pendekatan Holistik untuk Tumbuh Kembang Optimal
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Setiap anak berhak mendapatkan layanan yang lengkap dan berkualitas dalam lima aspek penting kehidupan.
            </p>
          </HighlightBox>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                iconBg={service.iconBg}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== EXAMPLE USAGE VARIANTS ====================

const ServicesVariants = () => {
  // Custom vision mission example
  const customVisionMission = [
    {
      type: "VISI 2030",
      title: "Indonesia Emas",
      content: "Mewujudkan generasi emas Indonesia melalui PAUD HI yang berkelanjutan dan inklusif.",
      icon: "fa-star",
      bgColor: "bg-yellow-600"
    }
  ];

  // Custom stakeholders example
  const customStakeholders = [
    {
      icon: "fa-university",
      title: "Perguruan Tinggi",
      description: "Institusi pendidikan tinggi yang melakukan penelitian dan pengembangan PAUD HI.",
      iconBg: "bg-indigo-600"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Default Services */}
      <AboutServices />
      
      {/* Only Vision Mission */}
      <AboutServices 
        showSection6={false}
        showSection7={false}
        showSeparator1={false}
        showSeparator2={false}
      />
      
      {/* Custom data */}
      <AboutServices 
        customVisionMission={customVisionMission}
        customStakeholders={customStakeholders}
        containerClassName="bg-gradient-to-b from-white to-blue-50"
      />
      
      {/* Only stakeholders and services */}
      <AboutServices 
        showSection5={false}
        showSeparator1={false}
        containerClassName="bg-gray-100"
      />
    </div>
  );
};

export default AboutServices;

// Named exports
export { 
  AboutServices, 
  ServicesVariants,
  SectionNumber,
  VisualSeparator,
  VisionMissionCard,
  StakeholderCard,
  ServiceCard,
  HighlightBox
};