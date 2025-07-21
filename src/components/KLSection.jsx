import React from "react";
import pmkLogo from '../assets/kl/pmk.png';
import kemendikdasmenLogo from '../assets/kl/kemendikdasmen.png';
import kesehatanLogo from '../assets/kl/kemenkes.png'; 
import bkkbnLogo from '../assets/kl/bkkbn.png';
import kemensosLogo from '../assets/kl/kemensos.png';   
import kemenpppaLogo from '../assets/kl/kpppa.png';
import bappenasLogo from '../assets/kl/bappenas.png';
import kemenagLogo from '../assets/kl/kemenag.png';         
import kemendesaLogo from '../assets/kl/kemendespdtt.png'; 
import bpsLogo from '../assets/kl/bps.svg';

const institutions = [
  {
    name: "Kemenko PMK",
    role: "Koordinator Program PAUD HI Nasional",
    logo: pmkLogo,
    programs: ["Koordinasi K/L", "Kebijakan", "Sinkronisasi"],
  },
  {
    name: "Kemendikdasmen",
    role: "Layanan Pendidikan PAUD",
    logo: kemendikdasmenLogo,
    programs: ["PAUD Formal", "Kurikulum", "Guru PAUD"],
  },
  {
    name: "Kementerian Kesehatan",
    role: "Layanan Kesehatan & Gizi Anak",
    logo: kesehatanLogo,
    programs: ["Imunisasi", "Gizi Balita", "Posyandu"],
  },
  {
    name: "Kemendukbangga/BKKBN",
    role: "Program Keluarga & Kependudukan",
    logo: bkkbnLogo,
    programs: ["Keluarga Berencana", "BKB", "PIK-R"],
  },
  {
    name: "Kementerian Sosial",
    role: "Perlindungan & Kesejahteraan Anak",
    logo: kemensosLogo,
    programs: ["Bantuan Sosial", "Perlindungan Anak", "KUBE"],
  },
  {
    name: "Kemen PPPA",
    role: "Pemberdayaan & Perlindungan",
    logo: kemenpppaLogo,
    programs: ["Perlindungan Anak", "PAUD HI", "KLA"],
  },
  {
    name: "Bappenas",
    role: "Perencanaan & Evaluasi Program",
    logo: bappenasLogo,
    programs: ["Perencanaan", "Evaluasi", "Monitoring"],
  },
  {
    name: "Kementerian Agama",
    role: "PAUD Berbasis Agama",
    logo: kemenagLogo,
    programs: ["RA/BA", "TPQ", "Madrasah"],
  },
  {
    name: "KemendesPDT",
    role: "Pembangunan Desa & Daerah",
    logo: kemendesaLogo,
    programs: ["Desa Prioritas", "BUMDes", "PKH"],
  },
  {
    name: "Badan Pusat Statistik",
    role: "Data & Statistik PAUD HI",
    logo: bpsLogo,
    programs: ["Survei Nasional", "Data Statistik", "Analisis"],
  },
];

const KLSection = () => {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-gray-50">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
          K/L yang Terlibat dalam PAUD HI
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          Kementerian dan Lembaga yang berkolaborasi dalam program PAUD Holistik Integratif
        </p>
      </div>
      
      {/* Mobile 2x5, Tablet 2x5, Desktop original 4 columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-4 lg:px-4">
        {institutions.map((inst, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg lg:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 lg:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[180px] sm:min-h-[200px] lg:min-h-auto"
          >
            {/* Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 mb-3 sm:mb-3 lg:mb-4 flex items-center justify-center">
              <img
                src={inst.logo}
                alt={`Logo ${inst.name}`}
                className="w-full h-full object-contain rounded-md lg:rounded-lg bg-white p-1 lg:p-2"
              />
            </div>
            
            {/* Institution Name */}
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-2 lg:mb-1 leading-tight line-clamp-2 text-center">
              {inst.name}
            </h3>
            
            {/* Role - Show on mobile with 2 columns, original style on desktop */}
            <p className="text-xs sm:text-sm lg:text-sm text-gray-600 mb-3 sm:mb-3 lg:mb-3 line-clamp-2 text-center leading-tight">
              {inst.role}
            </p>
            
            {/* Programs */}
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mt-auto">
              {/* Show first 3 programs */}
              {inst.programs.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs sm:text-sm lg:text-xs font-medium px-2 py-1 rounded text-center leading-tight"
                >
                  {tag}
                </span>
              ))}
              {/* Show remaining count on mobile/tablet only */}
              {inst.programs.length > 3 && (
                <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-2 py-1 rounded lg:hidden">
                  +{inst.programs.length - 3}
                </span>
              )}
              
              {/* Show all remaining programs on desktop */}
              {inst.programs.slice(3).map((tag, i) => (
                <span
                  key={i + 3}
                  className="hidden lg:inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Info */}
      {/* <div className="text-center mt-8 sm:mt-10 lg:mt-12 px-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-50 text-blue-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
          <i className="fas fa-info-circle text-sm sm:text-base"></i>
          <span className="text-xs sm:text-sm font-medium">
            10 Kementerian/Lembaga berkolaborasi dalam PAUD HI
          </span>
        </div>
      </div> */}
    </section>
  );
};

export default KLSection;