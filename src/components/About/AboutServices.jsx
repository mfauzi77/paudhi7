import React, { useState, useEffect } from 'react';

// ==================== SUB-COMPONENTS ====================

// Section Number Component with enhanced animation
const SectionNumber = ({ number, bgColor = "bg-gradient-to-r from-blue-500 to-blue-600" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span 
      className={`inline-flex items-center justify-center w-8 h-8 ${bgColor} text-white rounded-full font-bold text-sm mr-3 shadow-lg transform transition-all duration-500 ${
        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
      } hover:scale-110 hover:shadow-xl`}
    >
      {number}
    </span>
  );
};

// Enhanced Visual Separator Component
const VisualSeparator = ({ icon, className = "", color = "text-blue-500" }) => (
  <div className={`text-center my-16 relative ${className}`}>
    <div className="flex items-center justify-center">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400 animate-pulse"></div>
      <div className="mx-6 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
        <i className={`fas ${icon} text-2xl ${color} group-hover:scale-125 transition-transform duration-300`}></i>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent animate-pulse"></div>
    </div>
  </div>
);

// Enhanced Highlight Box Component
const HighlightBox = ({ children, className = "", borderColor = "from-blue-500 to-purple-600" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${className} ${
        isHovered ? 'transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${borderColor} rounded-l-2xl`}></div>
      <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${borderColor} opacity-30 rounded-t-2xl`}></div>
      {children}
    </div>
  );
};

// Enhanced Vision Mission Card Component
const VisionMissionCard = ({ type, title, content, icon, bgColor = "bg-gradient-to-br from-blue-500 to-blue-600" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
  className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500 group transform flex flex-col justify-between h-full ${
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
  } ${isHovered ? 'shadow-2xl -translate-y-3 scale-105' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${bgColor} text-white p-6 md:p-8 text-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="text-3xl md:text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
            <i className={`fas ${icon} drop-shadow-lg`}></i>
          </div>
          <div className="text-sm font-semibold mb-2 opacity-90 uppercase tracking-wider">{type}</div>
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-10 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
      </div>
      <div className="p-6 md:p-8">
        <p className="text-gray-700 leading-relaxed text-base">{content}</p>
      </div>
    </div>
  );
};

// Enhanced Stakeholder Card Component
const StakeholderCard = ({ icon, title, description, iconBg = "bg-gradient-to-br from-blue-500 to-blue-600" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), Math.random() * 600 + 200);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`text-center p-6 md:p-8 bg-white rounded-2xl border border-gray-100 transition-all duration-500 cursor-pointer group transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${isHovered ? 'shadow-2xl -translate-y-3 scale-105' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={`w-16 md:w-20 h-16 md:h-20 ${iconBg} rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl mx-auto mb-6 transition-all duration-500 shadow-lg ${
          isHovered ? 'scale-125 rotate-12 shadow-2xl' : ''
        }`}>
          <i className={`fas ${icon}`}></i>
        </div>
        {isHovered && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <i className="fas fa-star text-white text-xs"></i>
          </div>
        )}
      </div>
      <h3 className={`text-base md:text-lg font-bold text-gray-900 mb-3 transition-colors duration-300 ${
        isHovered ? 'text-blue-600' : ''
      }`}>{title}</h3>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  );
};

// Enhanced Service Card Component
const ServiceCard = ({ icon, title, description, features, iconBg = "bg-gradient-to-br from-blue-500 to-blue-600", index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200 + 300);
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500 group transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${isHovered ? 'shadow-2xl -translate-y-3 scale-105' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 md:p-8">
        {/* Service Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 transition-all duration-500 shadow-lg ${
              isHovered ? 'scale-125 rotate-12 shadow-2xl' : ''
            }`}>
              <i className={`fas ${icon}`}></i>
            </div>
            {isHovered && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <i className="fas fa-sparkles text-white text-sm"></i>
              </div>
            )}
          </div>
          <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
            isHovered ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
        
        {/* Service Description */}
        <p className="text-gray-700 mb-6 leading-relaxed text-base text-center">{description}</p>
        
        {/* Service Features */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96' : 'max-h-32'}`}>
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-3 text-gray-700 transition-all duration-300 ${
                isExpanded || idx < 3 ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4'
              }`}>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-sm md:text-base leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Expand/Collapse Button */}
        {features.length > 3 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}></i>
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
      title: "Visi SISMONEV PAUD HI",
      content: "Mendukung layanan PAUD HI yang lebih baik melalui sistem informasi yang terpadu, mudah diakses, dan berbasis data untuk mewujudkan generasi emas Indonesia.",
      icon: "fa-eye",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      type: "MISI",
      title: "Misi SISMONEV PAUD HI", 
      content: "Menyediakan sistem informasi terpadu yang memudahkan pemantauan, evaluasi, dan pengambilan kebijakan layanan PAUD HI. Dengan data yang akurat dan akses yang mudah, kami mendorong kolaborasi lintas sektor demi layanan PAUD yang berkualitas dan merata.",
      icon: "fa-rocket",
      bgColor: "bg-gradient-to-br from-green-500 to-green-700"
    }
  ];

  // Default Stakeholders Data
  const defaultStakeholders = [
    {
      icon: "fa-building",
      title: "Pemerintah",
      description: "Kementerian, dinas, dan pemerintah daerah sebagai penanggung jawab kebijakan dan implementasi program PAUD HI dengan komitmen tinggi.",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      icon: "fa-graduation-cap",
      title: "Lembaga Pendidikan",
      description: "PAUD formal dan non-formal, KB, TPA, dan SPS yang menyediakan layanan pendidikan anak usia dini berkualitas dan inovatif.",
      iconBg: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      icon: "fa-hospital",
      title: "Fasilitas Kesehatan",
      description: "Puskesmas, posyandu, dan fasilitas kesehatan lainnya yang melayani kesehatan anak dan ibu dengan standar pelayanan terbaik.",
      iconBg: "bg-gradient-to-br from-red-500 to-red-700"
    },
    {
      icon: "fa-users",
      title: "Keluarga & Masyarakat",
      description: "Orang tua, keluarga, dan komunitas masyarakat sebagai lingkungan terdekat anak dalam membentuk karakter dan kepribadian.",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      icon: "fa-handshake",
      title: "Mitra & LSM",
      description: "Organisasi masyarakat sipil, LSM, dan mitra pembangunan yang mendukung program PAUD HI dengan dedikasi tinggi.",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      icon: "fa-briefcase",
      title: "Sektor Swasta",
      description: "Perusahaan dan sektor swasta yang berkontribusi dalam CSR dan dukungan program PAUD HI untuk kemajuan bangsa.",
      iconBg: "bg-gradient-to-br from-gray-500 to-gray-700"
    }
  ];

  // Updated Services Data - 3 Pilar
  const defaultServices = [
    {
      icon: "fa-heartbeat",
      title: "Kesehatan & Gizi",
      description: "Memastikan anak usia dini tumbuh sehat dan bergizi optimal melalui layanan kesehatan komprehensif dan program gizi terintegrasi sejak dalam kandungan hingga usia 6 tahun.",
      features: [
        "Imunisasi lengkap dan berkala sesuai jadwal nasional",
        "Pemantauan tumbuh kembang dan status gizi berkala",
        "Deteksi dini gangguan kesehatan dan stunting",
        "Pemberian makanan tambahan (PMT) bergizi seimbang",
        "Layanan kesehatan ibu & anak terintegrasi",
        "Program ASI eksklusif dan konseling gizi keluarga",
        "Rujukan ke fasilitas kesehatan spesialis",
        "Edukasi perilaku hidup bersih & sehat"
      ],
      iconBg: "bg-gradient-to-br from-red-500 to-orange-600"
    },
    {
      icon: "fa-graduation-cap",
      title: "Pendidikan",
      description: "Memberikan stimulasi dan rangsangan pendidikan yang sesuai dengan tahap perkembangan anak untuk membentuk kecerdasan, kreativitas, karakter, dan kesiapan bersekolah yang kuat.",
      features: [
       "Belajar bermain & eksplorasi di PAUD Pra SD",
      "Kurikulum holistik, integratif & adaptif",
      "Asesmen tumbuh kembang & kemampuan anak",
      "Pelatihan guru PAUD berkelanjutan & berkualitas",
      "Literasi & numerasi untuk kesiapan SD",
      "Media belajar interaktif & edukatif",
      "Program kesiapan masuk sekolah dasar",
      "Layanan inklusif untuk anak berkebutuhan khusus (ABK)"
      ],
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      icon: "fa-shield-heart",
      title: "Perlindungan, Pengasuhan & Kesejahteraan Anak",
      description: "Menjamin setiap anak mendapatkan kasih sayang, rasa aman, perlindungan dari segala bentuk kekerasan, serta dukungan kesejahteraan dalam lingkungan yang kondusif dan ramah anak.",
      features: [
        "Pelatihan pola asuh positif dan responsif",
        "Home visit & parenting support berkelanjutan",
        "Sistem pelaporan dan penanganan kasus anak",
        "Pendampingan keluarga rentan dan bermasalah",
        "Program bantuan sosial untuk anak dan keluarga",
        "Kampanye perlindungan anak dari kekerasan",
        "Lingkungan ramah anak (child-friendly environment)",
        "Layanan rehabilitasi dan reintegrasi sosial"
      ],
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600"
    }
  ];

  const visionMissionData = customVisionMission || defaultVisionMission;
  const stakeholdersData = customStakeholders || defaultStakeholders;
  const servicesData = customServices || defaultServices;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 ${containerClassName}`}>
      {/* Separator 1 */}
      {showSeparator1 && (
        <VisualSeparator icon="fa-bullseye" color="text-blue-600" />
      )}

      {/* Section 5: Vision Mission */}
      {showSection5 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <SectionNumber number="3" bgColor="bg-gradient-to-r from-blue-500 to-purple-600" />
                Visi & Misi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Komitmen kami dalam mewujudkan layanan PAUD HI yang berkualitas untuk seluruh anak Indonesia dengan pendekatan yang terukur dan berkelanjutan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
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
        <VisualSeparator icon="fa-users" color="text-green-600" />
      )}

      {/* Section 6: Stakeholders */}
      {showSection6 && (
        <section className={`py-16 md:py-20 bg-white ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <SectionNumber number="4" bgColor="bg-gradient-to-r from-green-500 to-blue-600" />
                Ekosistem & Kolaborasi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                PAUD HI melibatkan berbagai pihak dalam satu ekosistem yang terintegrasi untuk memberikan layanan terbaik bagi anak Indonesia dengan pendekatan multi-stakeholder yang sinergis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
      {showSection7 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6 scale-80 origin-top">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <SectionNumber number="5" bgColor="bg-gradient-to-r from-purple-500 to-pink-600" />
                Tiga Pilar Layanan PAUD HI
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Layanan komprehensif yang mencakup seluruh kebutuhan tumbuh kembang anak usia dini dengan pendekatan holistik dan terintegrasi melalui tiga pilar utama untuk masa depan yang cerah.
              </p>
            </div>

            <HighlightBox className="text-center mb-12">
              <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-4">
                🌟 Pendekatan Holistik untuk Tumbuh Kembang Optimal
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Setiap anak berhak mendapatkan layanan yang lengkap dan berkualitas dalam tiga pilar penting kehidupan untuk menjamin masa depan yang gemilang dan berkelanjutan.
              </p>
            </HighlightBox>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
  {servicesData.map((service, index) => (
    <div key={index} className="h-full flex">
      <ServiceCard
        icon={service.icon}
        title={service.title}
        description={service.description}
        features={service.features}
        iconBg={service.iconBg}
        index={index}
      />
    </div>
  ))}
</div>

          </div>
        </section>
      )}
    </div>
  );
};

export default AboutServices;