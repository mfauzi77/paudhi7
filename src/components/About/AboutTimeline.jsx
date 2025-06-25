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

// Timeline Item Component
const TimelineItem = ({ year, title, description, isLast = false, dotColor = "border-blue-500" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative flex items-start mb-12 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-8 top-12 w-px h-full bg-blue-200 group-hover:bg-blue-400 transition-colors duration-300"></div>
      )}
      
      {/* Timeline Dot */}
      <div 
        className={`relative z-10 w-4 h-4 bg-white border-4 ${dotColor} rounded-full transition-all duration-300 mt-2 ${
          isHovered ? 'transform scale-150 bg-blue-500' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
      
      {/* Timeline Content */}
      <div className="ml-8 bg-white rounded-xl p-6 border border-gray-200 shadow-md flex-1 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <div className="text-blue-600 font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors duration-300">
          {year}
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Platform Feature Component
const PlatformFeature = ({ icon, title, description, iconBg = "bg-blue-500" }) => (
  <div className="text-center p-6 group hover:bg-gray-50 rounded-xl transition-colors duration-300">
    <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
      {title}
    </h4>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);

// ==================== MAIN COMPONENT ====================

const AboutTimeline = ({
  showSeparator = true,
  showSection3 = true,
  showSection4 = true,
  customTimelineData = null,
  customPlatformFeatures = null,
  containerClassName = "",
  sectionClassName = ""
}) => {

  // Default timeline data
  const defaultTimelineData = [
    {
      year: "2013",
      title: "Landasan Hukum PAUD HI",
      description: "Peraturan Presiden RI No. 60 Tahun 2013 tentang Pengembangan Anak Usia Dini Holistik Integratif ditetapkan sebagai dasar hukum implementasi program PAUD HI di Indonesia.",
      dotColor: "border-blue-500"
    },
    {
      year: "2015", 
      title: "Pilot Project Implementasi",
      description: "Dimulainya program pilot PAUD HI di beberapa daerah untuk menguji efektivitas pendekatan holistik integratif dalam layanan anak usia dini.",
      dotColor: "border-green-500"
    },
    {
      year: "2018",
      title: "Pengembangan Sistem Digital",
      description: "Dimulainya pengembangan platform SIMONEV PAUD HI untuk mendukung monitoring dan evaluasi program secara digital dan real-time.",
      dotColor: "border-purple-500"
    },
    {
      year: "2020",
      title: "Implementasi Nasional", 
      description: "Peluncuran SIMONEV PAUD HI secara nasional dengan dukungan teknologi cloud untuk menjangkau seluruh wilayah Indonesia.",
      dotColor: "border-yellow-500"
    },
    {
      year: "2023",
      title: "Integrasi AI & Big Data",
      description: "Pengembangan fitur AI dan analisis big data untuk prediksi dan rekomendasi kebijakan berbasis data real-time dari seluruh Indonesia.",
      dotColor: "border-red-500"
    }
  ];

  // Default platform features
  const defaultPlatformFeatures = [
    {
      icon: "fa-database",
      title: "Pencatatan Data Real-time",
      description: "Mencatat dan melaporkan data layanan PAUD HI dari daerah secara real-time dan akurat",
      iconBg: "bg-blue-500"
    },
    {
      icon: "fa-chart-line", 
      title: "Monitoring Komprehensif",
      description: "Memantau kemajuan pelaksanaan PAUD HI secara real-time dan komprehensif",
      iconBg: "bg-green-500"
    },
    {
      icon: "fa-brain",
      title: "Decision Intelligence", 
      description: "Mendorong pengambilan keputusan berbasis data untuk kebijakan yang efektif",
      iconBg: "bg-purple-500"
    }
  ];

  const timelineData = customTimelineData || defaultTimelineData;
  const platformFeatures = customPlatformFeatures || defaultPlatformFeatures;

  return (
    <div className={`min-h-screen bg-gray-50 ${containerClassName}`}>
      {/* Visual Separator */}
      {showSeparator && (
        <VisualSeparator icon="fa-timeline" />
      )}

      {/* Section 3: Timeline */}
      {showSection3 && (
        <section className={`py-16 md:py-20 ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="3" />
                Perjalanan PAUD HI
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Timeline implementasi dan perkembangan program PAUD Holistik Integratif di Indonesia dari masa ke masa
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  isLast={index === timelineData.length - 1}
                  dotColor={item.dotColor || "border-blue-500"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: About SISMONEV */}
      {showSection4 && (
        <section className={`py-16 md:py-20 bg-white ${sectionClassName}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <SectionNumber number="4" />
                Tentang SISMONEV PAUD HI
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Platform digital nasional yang mendukung implementasi PAUD HI secara optimal dengan teknologi terdepan dan pendekatan data-driven.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-6xl mx-auto">
              {/* Platform Header */}
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                  <i className="fas fa-digital-tachograph"></i>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                  Sistem Informasi dan Monitoring PAUD HI
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  Platform digital nasional yang membantu dalam implementasi, monitoring, dan evaluasi program PAUD Holistik Integratif di seluruh Indonesia dengan pendekatan data-driven dan user-centric.
                </p>
              </div>

              {/* Platform Features Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {platformFeatures.map((feature, index) => (
                  <PlatformFeature 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    iconBg={feature.iconBg}
                  />
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      🚀 Teknologi Terdepan
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Menggunakan teknologi cloud computing, AI, dan big data analytics untuk memberikan layanan yang optimal dan scalable.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-500"></i>
                        Cloud-based Infrastructure
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-500"></i>
                        Real-time Data Processing
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-500"></i>
                        Mobile-first Design
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-xl hover:scale-105 transition-transform duration-300">
                      <i className="fas fa-rocket"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// ==================== EXAMPLE USAGE VARIANTS ====================

const TimelineVariants = () => {
  // Custom timeline data example
  const customTimeline = [
    {
      year: "2024",
      title: "Ekspansi Regional",
      description: "Perluasan implementasi ke seluruh Asia Tenggara dengan kerjasama ASEAN.",
      dotColor: "border-green-500"
    },
    {
      year: "2025",
      title: "Digital Transformation",
      description: "Implementasi AI dan machine learning untuk prediksi tumbuh kembang anak.",
      dotColor: "border-purple-500"
    }
  ];

  // Custom platform features
  const customFeatures = [
    {
      icon: "fa-mobile-alt",
      title: "Mobile App",
      description: "Aplikasi mobile untuk akses mudah di lapangan",
      iconBg: "bg-indigo-500"
    },
    {
      icon: "fa-shield-alt",
      title: "Data Security",
      description: "Keamanan data tingkat enterprise dengan enkripsi end-to-end",
      iconBg: "bg-red-500"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Default Timeline */}
      <AboutTimeline />
      
      {/* Only Timeline Section */}
      <AboutTimeline 
        showSection4={false}
        showSeparator={false}
        containerClassName="bg-blue-50"
      />
      
      {/* Only SISMONEV Section */}
      <AboutTimeline 
        showSection3={false}
        showSeparator={false}
        customPlatformFeatures={customFeatures}
      />
      
      {/* Custom Timeline Data */}
      <AboutTimeline 
        customTimelineData={customTimeline}
        customPlatformFeatures={customFeatures}
        containerClassName="bg-gradient-to-b from-white to-gray-100"
      />
    </div>
  );
};

export default AboutTimeline;

// Named exports
export { 
  AboutTimeline, 
  TimelineVariants,
  SectionNumber,
  VisualSeparator,
  TimelineItem,
  PlatformFeature
};