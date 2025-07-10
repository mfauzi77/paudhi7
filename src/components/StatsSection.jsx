import React, { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 'anak',
      number: 10214464,
      label: 'Jumlah anak usia dini (0–6 tahun) di Indonesia',
      description: 'Sumber: Proyeksi Penduduk BPS & Kemenkes, 2024',
      icon: 'fas fa-child',
      color: 'text-purple-400'
    },
    {
      id: 'guru',
      number: 495018,
      label: 'Guru & tenaga pendidik PAUD terlibat dalam program PAUD HI',
      description: 'Sumber: Kemendikdasmen, 2025',
      icon: 'fas fa-chalkboard-teacher',
      color: 'text-orange-400'
    },
    {
      id: 'children',
      number: 191079,
      label: 'Lembaga PAUD telah menyelenggarakan layanan PAUD HI',
      description: 'Setara dengan 91,57% dari total lembaga PAUD di Indonesia pada tahun 2024',
      icon: 'fas fa-child',
      color: 'text-blue-400'
    },
    {
      id: 'gugustugas',
      number: 148,
      label: 'Gugus Tugas PAUD HI aktif di tingkat provinsi dan kabupaten/kota',
      description: 'Memperkuat koordinasi lintas sektor',
      icon: 'fas fa-landmark',
      color: 'text-indigo-400'
    },
    {
      id: 'peraturan',
      number: 228,
      label: 'Peraturan daerah mendukung PAUD HI',
      description: '9 Peraturan Gubernur dan 219 Peraturan Bupati/Wali Kota',
      icon: 'fas fa-file-alt',
      color: 'text-yellow-400'
    },
    {
      id: 'cakupan',
      number: 61.72,
      label: 'Desa/kelurahan yang telah memiliki layanan PAUD HI terintegrasi',
      description: 'ini menunjukkan progres cakupan wilayah dan keberhasilan dalam pemerataan akses.',
      icon: 'fas fa-map-marker-alt',
      color: 'text-lime-400'
    },
    {
      id: 'imunisasi',
      number: 87.3,
      label: 'Capaian imunisasi dasar lengkap untuk bayi tahun 2024',
      description: 'Sumber: Kemenkes, 2024',
      icon: 'fas fa-syringe',
      color: 'text-emerald-400'
    },
    {
      id: 'puspaga',
      number: 302,
      label: 'Layanan PUSPAGA telah terbentuk di berbagai daerah',
      description: 'Sumber: KemenPPPA, 2024',
      icon: 'fas fa-brain',
      color: 'text-pink-400'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setInView(true);
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      stats.forEach((stat) => animateNumber(stat.id, 0, stat.number, 2000));
    }
  }, [inView]);

  const animateNumber = (id, start, end, duration) => {
    const startTime = Date.now();
    const isPercent = id === 'cakupan' || String(end).includes('.');
    const isLarge = end > 1000000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * eased;

      let display;
      if (isPercent) display = current.toFixed(1) + '%';
      else if (isLarge) display = current.toLocaleString();
      else display = Math.floor(current).toLocaleString();

      setAnimatedStats((prev) => ({ ...prev, [id]: display }));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Dampak <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Nyata</span> PAUD HI
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            Data capaian terkini dalam mendukung pengembangan anak usia dini di Indonesia
          </p>
        </div>

        {/* Stats Grid - Mobile 2x4, Tablet 2x4, Desktop 4x2 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group relative bg-white/10 backdrop-blur-lg p-3 sm:p-4 lg:p-6 xl:p-8 rounded-xl lg:rounded-2xl text-center border border-white/20 hover:shadow-2xl hover:-translate-y-1 lg:hover:-translate-y-2 transition duration-300 lg:duration-500 min-h-[160px] sm:min-h-[180px] lg:min-h-[220px] flex flex-col justify-between"
            >
              {/* Icon */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center rounded-lg xl:rounded-xl bg-white/10`}>
                <i className={`${stat.icon} ${stat.color} text-sm sm:text-base lg:text-lg xl:text-2xl`}></i>
              </div>

              {/* Number */}
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 lg:mb-3 leading-tight">
                {animatedStats[stat.id] || stat.number.toLocaleString()}
              </div>

              {/* Content Container */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Title */}
                <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 leading-tight line-clamp-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 lg:line-clamp-3">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Banner */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-lg rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="text-2xl sm:text-3xl lg:text-4xl">📊</div>
            <div className="text-left">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2">
                Data Terintegrasi & Terukur
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                Semua pencapaian dimonitor secara real-time untuk memastikan kualitas layanan optimal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for line-clamp and animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .line-clamp-3 {
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;