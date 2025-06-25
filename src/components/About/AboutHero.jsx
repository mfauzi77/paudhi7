import React, { useState, useEffect } from 'react';

const AboutHero = ({ 
  title = "Tentang SISMONEV PAUD HI",
  subtitle = "Memahami lebih dalam tentang Sistem Informasi Monitoring dan Evaluasi Pengembangan Anak Usia Dini Holistik Integratif untuk masa depan anak Indonesia yang lebih baik.",
  showButtons = true,
  onWatchVideo = () => console.log('Watch video clicked'),
  onDownloadGuide = () => console.log('Download guide clicked'),
  customButtons = null,
  bgGradient = "from-blue-600 via-blue-700 to-indigo-800",
  textColor = "text-white",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-gradient-to-br ${bgGradient} ${textColor} ${className}`}>
      <div className="container mx-auto px-6 py-20 text-center mt-20">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight animate-bounce">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          {showButtons && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              {customButtons ? (
                customButtons
              ) : (
                <>
                  <button 
                    onClick={onWatchVideo}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] group"
                  >
                    <i className="fas fa-play group-hover:scale-110 transition-transform duration-300"></i>
                    Tonton Video Pengenalan
                  </button>
                  
                  <button 
                    onClick={onDownloadGuide}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] group"
                  >
                    <i className="fas fa-download group-hover:scale-110 transition-transform duration-300"></i>
                    Download Panduan
                  </button>
                </>
              )}
            </div>
          )}
          
          {/* Optional scroll indicator */}
          <div className="mt-11 opacity-70">
            <div className="animate-bounce">
              <i className="fas fa-chevron-down text-2xl"></i>
            </div>
            <p className="text-sm mt-2 opacity-80">Scroll untuk melihat lebih lanjut</p>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white opacity-20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-white opacity-40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

// Example usage dengan different variants
const HeroVariants = () => {
  return (
    <div className="space-y-0">
      {/* Default Hero */}
      <AboutHero />
      
      {/* Custom Hero dengan green theme */}
      <AboutHero 
        title="PAUD HI Dashboard"
        subtitle="Platform monitoring terpadu untuk layanan anak usia dini di seluruh Indonesia"
        bgGradient="from-green-600 via-green-700 to-emerald-800"
        onWatchVideo={() => alert('Opening video modal...')}
        onDownloadGuide={() => alert('Downloading guide...')}
      />
      
      {/* Minimal Hero tanpa buttons */}
      <AboutHero 
        title="Selamat Datang di SISMONEV"
        subtitle="Sistem informasi terdepan untuk PAUD Holistik Integratif"
        showButtons={false}
        bgGradient="from-purple-600 via-purple-700 to-indigo-800"
      />
      
      {/* Custom buttons */}
      <AboutHero 
        title="Bergabung dengan PAUD HI"
        subtitle="Daftarkan institusi Anda dan mulai memberikan layanan terbaik"
        customButtons={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors duration-300">
              Daftar Sekarang
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        }
        bgGradient="from-gray-800 via-gray-900 to-black"
      />
    </div>
  );
};

export default AboutHero;

// Named export untuk flexibility
export { AboutHero, HeroVariants };