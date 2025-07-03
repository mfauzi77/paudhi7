import React, { useState, useEffect } from 'react';

// ==================== SUB-COMPONENTS ====================

const SectionNumber = ({ number, bgColor = "bg-blue-600" }) => (
  <span className={`inline-flex items-center justify-center w-10 h-10 ${bgColor} text-white rounded-full font-bold text-sm mr-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
    {number}
  </span>
);

const VisualSeparator = ({ icon, className = "" }) => (
  <div className={`text-center my-16 relative ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-60"></div>
    <div className="bg-white px-6 text-blue-600 text-2xl relative shadow-lg rounded-full w-12 h-12 flex items-center justify-center mx-auto">
      <i className={`fas ${icon} animate-pulse`}></i>
    </div>
  </div>
);

const FloatingParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle}
          className={`absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};



const TimelineItem = ({ year, title, description, isLast = false, dotColor = "border-blue-600", index, isVisible, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const colorMap = {
    "border-amber-600": { bg: "bg-amber-600", text: "text-amber-700", glow: "shadow-amber-500/50" },
    "border-blue-600": { bg: "bg-blue-600", text: "text-blue-600", glow: "shadow-blue-500/50" },
    "border-emerald-500": { bg: "bg-emerald-500", text: "text-emerald-600", glow: "shadow-emerald-500/50" },
    "border-yellow-500": { bg: "bg-yellow-500", text: "text-yellow-600", glow: "shadow-yellow-500/50" },
    "border-red-500": { bg: "bg-red-500", text: "text-red-600", glow: "shadow-red-500/50" }
  };

  const colors = colorMap[dotColor] || colorMap["border-amber-600"];

  return (
    <div className={`relative flex items-start mb-12 group transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: `${index * 200}ms` }}>
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-300 via-purple-300 to-emerald-300 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-emerald-500 transition-all duration-500"></div>
      )}
      
      {/* Enhanced Timeline Dot */}
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`relative w-6 h-6 bg-white border-4 ${dotColor} rounded-full transition-all duration-500 mt-3 cursor-pointer ${
            isHovered ? `transform scale-150 ${colors.bg} shadow-lg ${colors.glow}` : 'hover:scale-125'
          } ${showDetails ? 'animate-pulse' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowDetails(!showDetails)}
        >
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
          )}
        </div>
        
        {/* Year Badge */}
        <div className={`mt-2 px-3 py-1 ${colors.bg} text-white text-xs font-bold rounded-full shadow-md transform transition-all duration-300 ${
          isHovered ? 'scale-110 shadow-lg' : ''
        }`}>
          {year}
        </div>
      </div>

      {/* Enhanced Content Card */}
      <div className={`ml-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl flex-1 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:bg-white/90 ${
        showDetails ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
      }`}>
        <div className={`${colors.text} font-bold text-lg mb-2 group-hover:scale-105 transition-transform duration-300 flex items-center`}>
          <span className="mr-2">{year.includes('2000') ? '🟤' : year.includes('2005') ? '🟤' : year.includes('2011') ? '🟤' : year.includes('2013') ? '🔵' : year.includes('2014') ? '🟢' : year.includes('2020') ? '🟡' : '🔴'}</span>
          {title}
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="ml-auto text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors duration-200"
          >
            {showDetails ? '−' : '+'}
          </button>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>

        {/* Expandable Details */}
        <div className={`overflow-hidden transition-all duration-500 ${
          showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Timeline</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Detail</span>
            </div>
            <p className="text-sm text-gray-600">
              {details || "Tahap penting dalam pengembangan PAUD HI yang memberikan dampak signifikan bagi perkembangan anak usia dini di Indonesia."}
            </p>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
              <span className="text-blue-600 text-sm">ℹ️</span>
            </button>
            <button className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 rounded-full flex items-center justify-center transition-colors duration-200">
              <span className="text-emerald-600 text-sm">📊</span>
            </button>
          </div>
          <div className="text-xs text-gray-400">
            Step {index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const TimelinePaudhi = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [currentHighlight, setCurrentHighlight] = useState(0);

  const timelineData = [
    {
      year: "2000-an Awal",
      title: "Kesadaran Investasi Usia Dini",
      description: "Munculnya kesadaran pentingnya investasi pada usia dini sebagai fondasi kualitas SDM. Indonesia mulai merujuk pada pendekatan Holistik-Integratif dari rekomendasi global (UNICEF, UNESCO).",
      dotColor: "border-amber-600",
      details: "Fase ini menandai perubahan paradigma dalam memandang pentingnya masa emas anak usia dini sebagai investasi jangka panjang bagi kualitas SDM Indonesia."
    },
    {
      year: "2005–2010",
      title: "Pengembangan Model Integrasi",
      description: "Kementerian terkait mulai mengembangkan model integrasi layanan PAUD dengan kesehatan, gizi, dan perlindungan anak. Uji coba beberapa model layanan integratif dilakukan secara terbatas di daerah.",
      dotColor: "border-amber-600",
      details: "Periode eksperimen dan pembelajaran untuk menemukan formula terbaik dalam mengintegrasikan berbagai layanan untuk anak usia dini."
    },
    {
      year: "2011",
      title: "Konsep PAUD HI Terstruktur",
      description: "Pemerintah merumuskan konsep PAUD HI secara lebih terstruktur. Terbentuknya Tim Nasional PAUD HI lintas sektor untuk menyusun regulasi dan strategi nasional.",
      dotColor: "border-amber-600",
      details: "Tahun penting dimana konsep PAUD HI mulai dikembangkan secara sistematis dengan melibatkan berbagai sektor terkait."
    },
    {
      year: "28 Agustus 2013",
      title: "Landasan Hukum Nasional",
      description: "Terbit Peraturan Presiden Nomor 60 Tahun 2013 tentang Pengembangan Anak Usia Dini Holistik-Integratif, sebagai landasan hukum nasional. Mewajibkan keterlibatan lintas sektor: pendidikan, kesehatan, gizi, perlindungan, dan kesejahteraan anak.",
      dotColor: "border-blue-600",
      details: "Milestone penting dengan terbitnya regulasi resmi yang memberikan payung hukum bagi implementasi PAUD HI di seluruh Indonesia."
    },
    {
      year: "2014–2019",
      title: "Sosialisasi dan Implementasi",
      description: "Penyusunan dan sosialisasi pedoman teknis PAUD HI ke daerah-daerah. Pembentukan Gugus Tugas PAUD HI nasional dan daerah (provinsi/kabupaten/kota). Integrasi layanan PAUD HI ke dalam RPJMN dan Renstra K/L.",
      dotColor: "border-emerald-500",
      details: "Fase implementasi aktif dengan pembentukan struktur organisasi dan sosialisasi ke seluruh daerah di Indonesia."
    },
    {
      year: "2020–2024",
      title: "Program Prioritas Nasional",
      description: "PAUD HI menjadi bagian dari RPJMN 2020–2024 dan program prioritas pembangunan SDM. Integrasi PAUD, Posyandu, layanan gizi, dan perlindungan menjadi layanan satu pintu di beberapa daerah.",
      dotColor: "border-yellow-500",
      details: "PAUD HI menjadi program strategis nasional dengan integrasi layanan yang semakin komprehensif dan terkoordinasi."
    },
    {
      year: "2025 dan seterusnya",
      title: "Era Digital dan Keberlanjutan",
      description: "Digitalisasi layanan PAUD HI melalui dashboard monev dan sistem informasi terintegrasi. Penguatan kolaborasi lintas sektor dan partisipasi masyarakat. Fokus pada early warning system, pemetaan sasaran, dan keberlanjutan program di tingkat akar rumput.",
      dotColor: "border-red-500",
      details: "Visi masa depan dengan pemanfaatan teknologi digital untuk monitoring, evaluasi, dan peningkatan kualitas layanan PAUD HI."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
            setCurrentHighlight(index);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('[data-timeline-item]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-rose-100 overflow-hidden">
      <FloatingParticles />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-emerald-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      
      <section className="py-16 md:py-24 max-w-screen-lg mx-auto px-4 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Enhanced Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center mb-6">
              <SectionNumber number="2" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Perjalanan PAUD HI
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Tahapan perjalanan dan perkembangan program PAUD Holistik Integratif dari tahun ke tahun menuju masa depan yang lebih baik.
            </p>
            
            {/* Interactive Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-amber-600">25+</div>
                <div className="text-sm text-gray-600">Tahun Perjalanan</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-emerald-600">7</div>
                <div className="text-sm text-gray-600">Fase Utama</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-600">2013</div>
                <div className="text-sm text-gray-600">Landasan Hukum</div>
              </div>
            </div>
          </div>

          {/* Enhanced Timeline */}
          <div className="max-w-4xl mx-auto">
            {timelineData.map((item, index) => (
              <div
                key={index}
                data-index={index}
                data-timeline-item
              >
                <TimelineItem
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  isLast={index === timelineData.length - 1}
                  dotColor={item.dotColor}
                  index={index}
                  isVisible={visibleItems.has(index)}
                  details={item.details}
                />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TimelinePaudhi;