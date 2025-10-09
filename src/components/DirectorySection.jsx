import React, { useState } from 'react';
import Footer from './Footer';

const DirectorySection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', name: 'Semua Layanan', count: 156 },
    { id: 'paud', name: 'PAUD', count: 67 },
    { id: 'health', name: 'Kesehatan', count: 45 },
    { id: 'counseling', name: 'Konseling', count: 28 },
    { id: 'protection', name: 'Perlindungan', count: 16 }
  ];

  const directoryItems = [
    {
      id: 1,
      type: 'paud',
      name: 'PAUD Tunas Bangsa',
      category: 'PAUD Formal - Terakreditasi A',
      location: 'Jl. Pendidikan No. 123, Jakarta Selatan',
      rating: 4.9,
      reviewCount: 127,
      distance: '1.2 km',
      icon: 'fas fa-graduation-cap',
      gradient: 'from-blue-500 to-blue-700',
      tags: ['Unggulan', 'Bilingual', 'Full Day', 'Kurikulum Nasional'],
      featuredTag: 'Unggulan',
      description: 'PAUD berkualitas dengan fasilitas lengkap dan tenaga pengajar berpengalaman'
    },
    {
      id: 2,
      type: 'health',
      name: 'Posyandu Melati 5',
      category: 'Posyandu Aktif - Strata Mandiri',
      location: 'RW 05, Kelurahan Melati, Jakarta Selatan',
      rating: 4.6,
      reviewCount: 89,
      distance: '0.8 km',
      icon: 'fas fa-heartbeat',
      gradient: 'from-emerald-500 to-emerald-700',
      tags: ['Imunisasi Lengkap', 'Gizi Balita', 'KB/KIA', 'Kelas Ibu'],
      featuredTag: null,
      description: 'Posyandu aktif dengan layanan kesehatan ibu dan anak terlengkap'
    },
    {
      id: 3,
      type: 'counseling',
      name: 'Konselor Keluarga Dr. Sarah',
      category: 'Psikolog Anak - Bersertifikat',
      location: 'Klinik Keluarga Sehat, Jakarta Selatan',
      rating: 5.0,
      reviewCount: 203,
      distance: '2.1 km',
      icon: 'fas fa-users',
      gradient: 'from-amber-500 to-amber-700',
      tags: ['Berpengalaman 15+ tahun', 'Konseling Online', 'Terapi Bermain'],
      featuredTag: 'Berpengalaman 15+ tahun',
      description: 'Psikolog anak berpengalaman dengan pendekatan holistik dan modern'
    },
    {
      id: 4,
      type: 'paud',
      name: 'TK Islam Al-Hikmah',
      category: 'PAUD Swasta - Terakreditasi A',
      location: 'Jl. Masjid Raya No. 45, Jakarta Timur',
      rating: 4.8,
      reviewCount: 156,
      distance: '3.5 km',
      icon: 'fas fa-graduation-cap',
      gradient: 'from-blue-500 to-blue-700',
      tags: ['Islami', 'Tahfidz', 'Bilingual', 'Ekstrakurikuler'],
      featuredTag: null,
      description: 'PAUD dengan basis agama Islam dan program tahfidz untuk anak'
    },
    {
      id: 5,
      type: 'health',
      name: 'Puskesmas Ceria',
      category: 'Puskesmas - Layanan Anak',
      location: 'Jl. Sehat Sentosa No. 78, Jakarta Barat',
      rating: 4.4,
      reviewCount: 92,
      distance: '4.2 km',
      icon: 'fas fa-hospital',
      gradient: 'from-emerald-500 to-emerald-700',
      tags: ['Dokter Spesialis Anak', 'Imunisasi', 'Gizi', 'Tumbuh Kembang'],
      featuredTag: null,
      description: 'Puskesmas dengan layanan kesehatan anak terlengkap dan modern'
    },
    {
      id: 6,
      type: 'protection',
      name: 'Lembaga Perlindungan Anak',
      category: 'LSM - Perlindungan Anak',
      location: 'Jl. Perlindungan No. 12, Jakarta Pusat',
      rating: 4.7,
      reviewCount: 74,
      distance: '5.1 km',
      icon: 'fas fa-shield-alt',
      gradient: 'from-purple-500 to-purple-700',
      tags: ['Hotline 24/7', 'Pendampingan Hukum', 'Rehabilitasi', 'Edukasi'],
      featuredTag: 'Hotline 24/7',
      description: 'Lembaga perlindungan anak dengan layanan komprehensif dan terpercaya'
    }
  ];

  const filteredItems = directoryItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-amber-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-amber-400"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-amber-400"></i>);
    }

    return stars;
  };

  return (
    <section id="direktori" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Direktori Layanan <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Terdekat</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan layanan PAUD, kesehatan, dan pendukung lainnya di sekitar Anda dengan mudah dan cepat
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search text-lg"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama lembaga atau lokasi..."
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 focus:outline-none bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
                }`}
              >
                {filter.name}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Top Border Gradient */}
              <div className={`h-1 bg-gradient-to-r ${item.gradient} transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}>
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      {item.category}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-6 mb-6 flex-wrap">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-gray-800 font-semibold">{item.rating}</span>
                    <span className="text-gray-500 text-sm">({item.reviewCount} ulasan)</span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <i className="fas fa-route mr-2"></i>
                    <span className="font-medium">{item.distance}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        tag === item.featuredTag
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <button className="flex-1 min-w-[120px] bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                    <i className="fas fa-info-circle"></i>
                    Detail
                  </button>
                  <button className="flex-1 min-w-[120px] border border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <i className="fas fa-phone"></i>
                    Hubungi
                  </button>
                  <button className="flex-1 min-w-[120px] bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center gap-2">
                    <i className="fas fa-directions"></i>
                    Rute
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <span className="flex items-center gap-3">
                Muat Lebih Banyak
                <i className="fas fa-chevron-down group-hover:animate-bounce"></i>
              </span>
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-search text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tidak ada hasil ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba ubah kata kunci pencarian atau filter yang dipilih
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Reset Pencarian
            </button>
          </div>
        )}
       
      </div>
       < Footer />
    </section>
  );
};

export default DirectorySection;