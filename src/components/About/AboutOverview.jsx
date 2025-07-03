import React, { useState } from 'react';

// ==================== SUB-COMPONENTS ====================

const SectionNumber = ({ number, bgColor = "bg-blue-600" }) => (
  <span className={`inline-flex items-center justify-center w-8 h-8 ${bgColor} text-white rounded-full font-bold text-sm mr-4`}>
    {number}
  </span>
);

const HighlightBox = ({ children, className = "", borderColor = "from-blue-600 to-emerald-600" }) => (
  <div className={`bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden ${className}`}>
    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${borderColor}`}></div>
    {children}
  </div>
);

const InfoCallout = ({ icon, title, children, iconBg = "bg-blue-600" }) => (
  <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 my-6 flex items-start gap-4 animate-fade-in shadow-lg">
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md animate-bounce-slow`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="flex-1">
      <h4 className="text-blue-800 mb-2 text-xl font-bold uppercase tracking-wide">{title}</h4>
      <div className="text-blue-900 text-base leading-relaxed font-medium">{children}</div>
    </div>
  </div>
);

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

const FeatureCard = ({ icon, title, description, iconBg = "bg-emerald-600" }) => (
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
      numberColor: "text-emerald-600"
    },
    {
      number: "6",
      label: "Tahun Periode Emas",
      description: "Masa golden age anak",
      numberColor: "text-teal-500"
    }
  ];

  const defaultFeatures = [
    {
      icon: "fa-link",
      title: "Layanan Terpadu",
      description: "Menyediakan akses layanan terpadu untuk anak dan keluarga dalam satu sistem yang terkoordinasi dan mudah diakses oleh seluruh masyarakat.",
      iconBg: "bg-blue-600"
    },
    {
      icon: "fa-shield-alt",
      title: "Pencegahan Masalah",
      description: "Mencegah stunting, kekerasan anak, dan keterlambatan tumbuh kembang melalui intervensi dini yang tepat sasaran dan berbasis bukti.",
      iconBg: "bg-emerald-600"
    },
    {
      icon: "fa-handshake",
      title: "Koordinasi Lintas Sektor",
      description: "Membangun koordinasi antarsektor untuk layanan yang merata dan berkualitas di seluruh wilayah Indonesia.",
      iconBg: "bg-blue-500"
    }
  ];

  const statsData = customStats || defaultStats;
  const featuresData = customFeatures || defaultFeatures;

  return (
    <div className={`relative bg-gradient-to-br from-yellow-50 via-blue-50 to-rose-100 ${containerClassName}`}>
      {showSection1 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border-l-8 border-blue-600 max-w-6xl mx-auto animate-fade-in-up">
              <InfoCallout 
                icon="fa-gavel" 
                title="Landasan Hukum Perpres 60 tahun 2013 Tentang PAUD HI"
                iconBg="bg-blue-600"
              >
                <p>
                  <strong>Bahwa untuk menjamin pemenuhan hak tumbuh kembang anak usia dini, diperlukan upaya peningkatan kesehatan, gizi, perawatan, pengasuhan, perlindungan, kesejahteraan, dan rangsangan pendidikan yang dilakukan secara simultan, sistematis, menyeluruh, terintegrasi, dan berkesinambungan.
               </strong> </p>
              </InfoCallout>
            </div>
          </div>
        </section>
      )}

      {showSection2 && (
        <section className={`py-16 md:py-20 bg-white ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="1" />
                Mengapa PAUD HI Penting?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Masa usia dini adalah fondasi utama kehidupan. Intervensi yang tepat di periode ini akan menentukan kualitas kesehatan, kecerdasan, dan karakter anak di masa depan.
              </p>
            </div>

            <HighlightBox className="text-center mb-12">
              <h3 className="text-blue-600 text-xl md:text-2xl font-bold mb-4">
                🧐 Golden Age: Periode Emas Perkembangan Otak
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                90% perkembangan otak terjadi pada 6 tahun pertama kehidupan. Inilah mengapa investasi di masa ini memberikan dampak yang luar biasa.
              </p>
            </HighlightBox>

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

      {/* Dekorasi Latar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-amber-300 opacity-40 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-blue-300 opacity-30 rounded-full animate-ping delay-1000"></div>
      </div>
    </div>
  );
};

export default AboutOverview;

export { 
  AboutOverview, 
  SectionNumber,
  HighlightBox,
  InfoCallout,
  StatItem,
  FeatureCard
 };
