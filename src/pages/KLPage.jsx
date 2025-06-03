import React from "react";

const KLPage = () => {
  const klList = [
    { name: "Kementerian Koordinator PMK", logo: "/images/logo.png" },
    { name: "Kementerian Dalam Negeri", logo: "/images/kemendagri.png" },
    { name: "Kementerian Kesehatan", logo: "/images/kemenkes.png" },
    { name: "Kementerian Sosial", logo: "/images/kemensos.jpg" },
    { name: "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak", logo: "/images/kpppa.png" },
    { name: "Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi", logo: "/images/kemendespdtt.png" },
    { name: "Kementrian Agama", logo: "/images/kemenag.png" },
    { name: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi", logo: "/images/kemendikbudristek.png" },
    { name: "Sekertaris Kabinet", logo: "/images/sekret.png" },
    { name: "Badan Perencanaan Pembangunan Nasional", logo: "/images/bappenas.png" },
    { name: "Badan Kependudukan dan Keluarga Berencana Nasional", logo: "/images/bkkbn.png" },
    { name: "Badan Pusat Statistik", logo: "/images/bps.png" },
  ];
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Kementerian / Lembaga (K/L) Mitra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {klList.map((kl, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md p-4 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
          >
            <img src={kl.logo} alt={kl.name} className="h-16 mx-auto mb-4" />
            <h2 className="text-lg font-semibold">{kl.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KLPage;
