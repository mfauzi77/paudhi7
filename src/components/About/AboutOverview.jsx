import React, { useState } from 'react';

// ==================== SUB-COMPONENTS ====================

// Section Number Component
const SectionNumber = ({ number, bgColor = "bg-blue-500" }) => (
  <span className={`inline-flex items-center justify-center w-8 h-8 ${bgColor} text-white rounded-full font-bold text-sm mr-4`}>
    {number}
  </span>
);

// Highlight Box Component
const HighlightBox = ({ children, className = "", borderColor = "from-blue-500 to-green-500" }) => (
  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden ${className}`}>
    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${borderColor}`}></div>
    {children}
  </div>
);

// Info Callout Component
const InfoCallout = ({ icon, title, children, iconBg = "bg-blue-500" }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 flex items-start gap-4">
    <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="flex-1">
      <h4 className="text-gray-900 mb-2 text-lg font-semibold">{title}</h4>
      <div className="text-blue-900 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

// Stats Item Component
const StatItem = ({ number, label, description, numberColor = "text-blue-600" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`text-center p-6 md:p-8 bg-white rounded-2xl border border-gray-100 transition-all duration-300 cursor-pointer ${
        isHovered ? 'transform -translate-y-2 scale-105 shadow-xl' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-3xl md:text-4xl font-bold ${numberColor} mb-2`}>{number}</div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, iconBg = "bg-blue-500" }) => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);

// ==================== MAIN COMPONENT ====================

const AboutOverview = ({
  showSection1 = true,
  showSection2 = true,
  customStats = null,
  customFeatures = null,
  containerClassName = "",
  sectionClassName = ""
}) => {
  
  // Default stats data
  const defaultStats = [
    {
      number: "90%",
      label: "Efektivitas Intervensi Dini",
      description: "Lebih efektif dibanding usia lanjut",
      numberColor: "text-blue-600"
    },
    {
      number: "1000",
      label: "Hari Pertama Kehidupan", 
      description: "Periode kritis pembentukan otak",
      numberColor: "text-green-600"
    },
    {
      number: "6",
      label: "Tahun Periode Emas",
      description: "Masa golden age anak",
      numberColor: "text-purple-600"
    }
  ];

  // Default features data
  const defaultFeatures = [
    {
      icon: "fa-link",
      title: "Layanan Terpadu",
      description: "Menyediakan akses layanan terpadu untuk anak dan keluarga dalam satu sistem yang terkoordinasi dan mudah diakses oleh seluruh masyarakat.",
      iconBg: "bg-blue-500"
    },
    {
      icon: "fa-shield-alt", 
      title: "Pencegahan Masalah",
      description: "Mencegah stunting, kekerasan anak, dan keterlambatan tumbuh kembang melalui intervensi dini yang tepat sasaran dan berbasis bukti.",
      iconBg: "bg-green-500"
    },
    {
      icon: "fa-handshake",
      title: "Koordinasi Lintas Sektor", 
      description: "Membangun koordinasi antarsektor untuk layanan yang merata dan berkualitas di seluruh wilayah Indonesia.",
      iconBg: "bg-yellow-500"
    }
  ];

  const statsData = customStats || defaultStats;
  const featuresData = customFeatures || defaultFeatures;

  return (
    <div className={`min-h-screen bg-gray-50 ${containerClassName}`}>
      {/* Section 1: What is PAUD HI */}
      {showSection1 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="1" />
                Apa Itu PAUD Holistik Integratif?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Pendekatan komprehensif untuk pengembangan anak usia dini yang mengintegrasikan lima aspek penting dalam satu sistem yang terkoordinasi.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold">
                      PAUD Holistik Integratif (PAUD HI)
                    </span> adalah pendekatan layanan untuk anak usia dini yang mencakup seluruh aspek kebutuhan dasar anak—mulai dari kesehatan, gizi, pendidikan, pengasuhan, hingga perlindungan—yang dilakukan secara terpadu, menyeluruh, dan berkelanjutan.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center text-white text-5xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                </div>
              </div>
              
              <InfoCallout 
                icon="fa-gavel" 
                title="Landasan Hukum"
                iconBg="bg-blue-500"
              >
                <p>
                  Sesuai dengan <strong>Peraturan Presiden Republik Indonesia Nomor 60 Tahun 2013</strong>, pemenuhan kebutuhan anak usia dini (0–6 tahun) harus dilakukan <strong>simultan dan lintas sektor</strong>, dengan melibatkan orang tua, keluarga, pemerintah, dan masyarakat.
                </p>
              </InfoCallout>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Why PAUD HI Important */}
      {showSection2 && (
        <section className={`py-16 md:py-20 bg-white ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="2" />
                Mengapa PAUD HI Penting?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Masa usia dini adalah fondasi utama kehidupan. Intervensi yang tepat di periode ini akan menentukan kualitas kesehatan, kecerdasan, dan karakter anak di masa depan.
              </p>
            </div>

            <HighlightBox className="text-center mb-12">
              <h3 className="text-blue-600 text-xl md:text-2xl font-bold mb-4">
                🧠 Golden Age: Periode Emas Perkembangan Otak
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                90% perkembangan otak terjadi pada 6 tahun pertama kehidupan. Inilah mengapa investasi di masa ini memberikan dampak yang luar biasa.
              </p>
            </HighlightBox>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
              {statsData.map((stat, index) => (
                <StatItem 
                  key={index}
                  number={stat.number} 
                  label={stat.label} 
                  description={stat.description}
                  numberColor={stat.numberColor}
                />
              ))}
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {featuresData.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBg={feature.iconBg}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// ==================== EXAMPLE USAGE VARIANTS ====================

const OverviewVariants = () => {
  // Custom stats example
  const customStats = [
    {
      number: "100%",
      label: "Coverage Target",
      description: "Target cakupan layanan nasional",
      numberColor: "text-green-600"
    },
    {
      number: "34",
      label: "Provinsi",
      description: "Tersebar di seluruh Indonesia",
      numberColor: "text-blue-600"
    },
    {
      number: "500+",
      label: "Kab/Kota",
      description: "Implementasi PAUD HI",
      numberColor: "text-purple-600"
    }
  ];

  // Custom features example
  const customFeatures = [
    {
      icon: "fa-chart-line",
      title: "Monitoring Real-time",
      description: "Pantau progress implementasi PAUD HI secara real-time dengan dashboard interaktif.",
      iconBg: "bg-indigo-500"
    },
    {
      icon: "fa-mobile-alt",
      title: "Mobile Friendly",
      description: "Akses platform dari berbagai device untuk kemudahan penggunaan di lapangan.",
      iconBg: "bg-green-500"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Default Overview */}
      <AboutOverview />
      
      {/* Only Section 1 */}
      <AboutOverview 
        showSection2={false}
        containerClassName="bg-blue-50"
      />
      
      {/* Custom stats and features */}
      <AboutOverview 
        customStats={customStats}
        customFeatures={customFeatures}
        containerClassName="bg-gradient-to-b from-white to-gray-100"
      />
      
      {/* Only Section 2 with custom styling */}
      <AboutOverview 
        showSection1={false}
        sectionClassName="bg-gradient-to-r from-blue-50 to-indigo-50"
      />
    </div>
  );
};

export default AboutOverview;

// Named exports
export { 
  AboutOverview, 
  OverviewVariants,
  SectionNumber,
  HighlightBox,
  InfoCallout,
  StatItem,
  FeatureCard
};