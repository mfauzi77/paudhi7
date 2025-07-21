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

const kemenkoPMK = {
  name: "Kemenko PMK",
  role: "Koordinator Program PAUD HI Nasional",
  logo: pmkLogo,
  programs: ["Koordinasi K/L", "Kebijakan", "Sinkronisasi"],
};

const institutions = [
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

const KLCard = ({ inst, isLeader = false }) => (
  <div
    className={`bg-white rounded-xl border ${
      isLeader
        ? "border-yellow-400 shadow-lg hover:bg-yellow-50"
        : "border-gray-200 shadow-sm hover:bg-gray-50"
    } 
      p-2 sm:p-3 lg:p-4 flex flex-col items-center text-center 
      transition-all duration-300 transform hover:-translate-y-1 scale-[0.9]`}
  >
    <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-3 flex items-center justify-center`}>
      <img
        src={inst.logo}
        alt={`Logo ${inst.name}`}
        className="w-full h-full object-contain rounded bg-white p-1 lg:p-2"
      />
    </div>
    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
      {inst.name}
    </h3>
    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{inst.role}</p>
    <div className="flex flex-wrap gap-1 justify-center mt-auto">
      {inst.programs.slice(0, 3).map((tag, i) => (
        <span
          key={i}
          className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium px-2 py-1 rounded"
        >
          {tag}
        </span>
      ))}
      {inst.programs.length > 3 && (
        <span className="hidden lg:inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
          +{inst.programs.length - 3}
        </span>
      )}
    </div>
  </div>
);

const KLSection = () => {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-gray-50">
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
          K/L yang Terlibat dalam PAUD HI
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          Kementerian dan Lembaga yang berkolaborasi dalam program PAUD Holistik Integratif
        </p>
      </div>

      {/* Ketua */}
      <div className="flex justify-center mb-10 px-4">
        <div className="w-full max-w-sm">
          <KLCard inst={kemenkoPMK} isLeader />
        </div>
      </div>

      {/* K/L lainnya */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 px-3">
        {institutions.map((inst, idx) => (
          <KLCard key={idx} inst={inst} />
        ))}
      </div>
    </section>
  );
};

export default KLSection;
