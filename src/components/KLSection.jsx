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
    name: "BKKBN",
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
    name: "Kemendesa",
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
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">K/L yang Terlibat dalam PAUD HI</h2>
        <p className="text-gray-600 text-lg">
          Kementerian dan Lembaga yang berkolaborasi dalam program PAUD Holistik Integratif
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {institutions.map((inst, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img
              src={inst.logo}
              alt={`Logo ${inst.name}`}
              className="w-25 h-25 object-contain rounded-lg bg-white p-2 mb-4"
            />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{inst.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{inst.role}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {inst.programs.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KLSection;
