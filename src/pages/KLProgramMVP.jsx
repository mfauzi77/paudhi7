import React, { useState } from 'react';

const KLProgramsMVP = () => {
  const [selectedKL, setSelectedKL] = useState(null);
  const [isKLPopupOpen, setIsKLPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favoriteKL, setFavoriteKL] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('priority');

  const klData = [
    {
      id: 'kemenko-pmk',
      name: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      shortName: 'Kemenko PMK',
      logo: '🎯',
      role: 'Koordinator Utama',
      description: 'Mengkoordinasikan kebijakan lintas kementerian untuk PAUD Holistik Integratif',
      programs: [
        'Koordinasi Kebijakan PAUD HI Nasional',
        'Sinkronisasi Program Lintas K/L',
        'Monitoring dan Evaluasi Terpadu'
      ],
      target: 'Seluruh Indonesia',
      status: 'Aktif',
      color: 'purple',
      priority: true,
      featured: true,
      contact: {
        pic: 'Dr. Sari Kemenko, M.Si',
        email: 'paud.hi@kemenko.pmk.go.id',
        whatsapp: '+62 812-3456-7890'
      },
      website: 'https://www.kemenkopmk.go.id',
      detailPrograms: [
        {
          name: 'Rapat Koordinasi Nasional PAUD HI',
          description: 'Koordinasi rutin bulanan dengan seluruh K/L terkait implementasi PAUD HI',
          timeline: 'Bulanan',
          participants: '10 K/L'
        },
        {
          name: 'Dashboard Monitoring Terpadu',
          description: 'Sistem monitoring real-time capaian program PAUD HI dari seluruh K/L',
          timeline: '2025-2026',
          participants: 'Seluruh K/L'
        }
      ]
    },
    {
      id: 'kemendikdasmen',
      name: 'Kementerian Pendidikan Dasar dan Menengah',
      shortName: 'Kemendikdasmen',
      logo: '📚',
      role: 'Pelaksana Utama Pendidikan',
      description: 'Menyelenggarakan program pendidikan anak usia dini berkualitas',
      programs: [
        'Program PAUD Berkualitas',
        'Pelatihan Guru PAUD',
        'Kurikulum PAUD Terintegrasi'
      ],
      target: '15.247 Lembaga PAUD',
      status: 'Aktif',
      color: 'blue',
      priority: true,
      contact: {
        pic: 'Prof. Dr. Ahmad Pendidikan, M.Pd',
        email: 'paud@kemendikdasmen.go.id',
        whatsapp: '+62 813-4567-8901'
      },
      website: 'https://www.kemendikdasmen.go.id',
      detailPrograms: [
        {
          name: 'Bantuan Operasional Penyelenggaraan PAUD',
          description: 'Bantuan dana operasional untuk lembaga PAUD dalam meningkatkan kualitas layanan',
          timeline: 'Tahunan',
          participants: '12.000 Lembaga PAUD'
        }
      ]
    },
    {
      id: 'kemenag',
      name: 'Kementerian Agama',
      shortName: 'Kemenag',
      logo: '🕌',
      role: 'PAUD Berbasis Keagamaan',
      description: 'Mengembangkan PAUD berbasis nilai-nilai agama dan karakter',
      programs: [
        'Raudhatul Athfal (RA)',
        'Pendidikan Karakter Islami',
        'PAUD Inklusif Berbasis Agama'
      ],
      target: '3.245 RA',
      status: 'Aktif',
      color: 'emerald',
      contact: {
        pic: 'Dr. H. Agama Karakter, M.A',
        email: 'paud@kemenag.go.id',
        whatsapp: '+62 814-5678-9012'
      },
      website: 'https://www.kemenag.go.id',
      detailPrograms: [
        {
          name: 'Pengembangan Kurikulum RA',
          description: 'Penyusunan kurikulum Raudhatul Athfal yang mengintegrasikan nilai agama dan perkembangan anak',
          timeline: '2025',
          participants: '3.245 RA'
        }
      ]
    },
    {
      id: 'bkkbn',
      name: 'Badan Kependudukan dan Keluarga Berencana Nasional',
      shortName: 'BKKBN',
      logo: '👨‍👩‍👧‍👦',
      role: 'Pengembangan Keluarga',
      description: 'Program parenting dan pengasuhan holistik untuk keluarga Indonesia',
      programs: [
        'Bina Keluarga Balita (BKB)',
        'Parenting Education',
        'Kelas Ibu Hamil dan Balita'
      ],
      target: '12.456 Keluarga',
      status: 'Aktif',
      color: 'pink',
      contact: {
        pic: 'Dr. Keluarga Bahagia, S.Sos',
        email: 'paud@bkkbn.go.id',
        whatsapp: '+62 816-7890-1234'
      },
      website: 'https://www.bkkbn.go.id',
      detailPrograms: [
        {
          name: 'Program Bina Keluarga Balita',
          description: 'Pembinaan orang tua dalam pengasuhan dan stimulasi tumbuh kembang anak',
          timeline: 'Berkelanjutan',
          participants: '10.000 Keluarga'
        }
      ]
    },
    {
      id: 'kemensos',
      name: 'Kementerian Sosial',
      shortName: 'Kemensos',
      logo: '🤝',
      role: 'Perlindungan & Kesejahteraan',
      description: 'Perlindungan sosial dan kesejahteraan anak usia dini',
      programs: [
        'Program Keluarga Harapan (PKH)',
        'Perlindungan Anak',
        'Anak Berkebutuhan Khusus'
      ],
      target: '8.934 Anak',
      status: 'Aktif',
      color: 'red',
      contact: {
        pic: 'Dr. Sosial Peduli, M.Sos',
        email: 'paud@kemensos.go.id',
        whatsapp: '+62 817-8901-2345'
      },
      website: 'https://www.kemensos.go.id',
      detailPrograms: [
        {
          name: 'PKH Komponen PAUD',
          description: 'Bantuan tunai bersyarat untuk keluarga miskin dengan komitmen pendidikan PAUD',
          timeline: 'Berkelanjutan',
          participants: '6.000 Keluarga'
        }
      ]
    },
    {
      id: 'kemenpppa',
      name: 'Kementerian Pemberdayaan Perempuan dan Perlindungan Anak',
      shortName: 'Kemen PPPA',
      logo: '👶',
      role: 'Perlindungan Anak',
      description: 'Perlindungan khusus dan pemberdayaan perempuan dalam pengasuhan',
      programs: [
        'Perlindungan Khusus Anak',
        'Pemberdayaan Perempuan',
        'Pencegahan Kekerasan Anak'
      ],
      target: '5.678 Anak',
      status: 'Aktif',
      color: 'violet',
      contact: {
        pic: 'Dr. Perempuan Kuat, S.H., M.H',
        email: 'paud@kemenpppa.go.id',
        whatsapp: '+62 818-9012-3456'
      },
      website: 'https://www.kemenpppa.go.id',
      detailPrograms: [
        {
          name: 'Sekolah Ramah Anak',
          description: 'Program menciptakan lingkungan PAUD yang aman dan ramah anak',
          timeline: '2025-2026',
          participants: '1.000 Lembaga PAUD'
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      blue: 'from-blue-500 to-blue-600',
      emerald: 'from-emerald-500 to-emerald-600',
      pink: 'from-pink-500 to-pink-600',
      red: 'from-red-500 to-red-600',
      violet: 'from-violet-500 to-violet-600'
    };
    return colors[color] || colors.blue;
  };

  const getBgColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-50 border-purple-200',
      blue: 'bg-blue-50 border-blue-200',
      emerald: 'bg-emerald-50 border-emerald-200',
      pink: 'bg-pink-50 border-pink-200',
      red: 'bg-red-50 border-red-200',
      violet: 'bg-violet-50 border-violet-200'
    };
    return colors[color] || colors.blue;
  };

  const openKLPopup = (kl) => {
    setSelectedKL(kl);
    setIsKLPopupOpen(true);
  };

  const closeKLPopup = () => {
    setIsKLPopupOpen(false);
    setSelectedKL(null);
  };

  const toggleFavorite = (klId) => {
    setFavoriteKL(prev => 
      prev.includes(klId) 
        ? prev.filter(id => id !== klId)
        : [...prev, klId]
    );
  };

  // Filter and search functionality
  const filteredKLData = klData.filter(kl => {
    const matchesSearch = kl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kl.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kl.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'education' && ['blue', 'emerald'].includes(kl.color)) ||
                         (selectedFilter === 'health' && ['pink', 'red'].includes(kl.color)) ||
                         (selectedFilter === 'social' && ['violet'].includes(kl.color)) ||
                         (selectedFilter === 'coordination' && ['purple'].includes(kl.color));
    
    const matchesFavorites = !showFavoritesOnly || favoriteKL.includes(kl.id);
    
    return matchesSearch && matchesFilter && matchesFavorites;
  });

  // Sort functionality
  const sortedKLData = [...filteredKLData].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.priority && !b.priority) return -1;
        if (!a.priority && b.priority) return 1;
        return 0;
      case 'name':
        return a.shortName.localeCompare(b.shortName);
      case 'target':
        return b.target.localeCompare(a.target);
      default:
        return 0;
    }
  });

  const featuredKL = sortedKLData.find(kl => kl.featured);
  const regularKL = sortedKLData.filter(kl => !kl.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Program & Kegiatan <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">K/L Terkait</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kolaborasi strategis antar Kementerian dan Lembaga dalam mengimplementasikan 
            Program PAUD Holistik Integratif untuk masa depan anak Indonesia
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari K/L berdasarkan nama, program, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Tabs & Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'all', label: 'Semua K/L', icon: '🏛️' },
                { id: 'education', label: 'Pendidikan', icon: '📚' },
                { id: 'health', label: 'Kesehatan & Sosial', icon: '🏥' },
                { id: 'social', label: 'Perlindungan', icon: '🛡️' },
                { id: 'coordination', label: 'Koordinasi', icon: '🎯' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
                >
                  <span>{filter.icon}</span>
                  <span className="text-sm">{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-4">
              {/* Favorites Toggle */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  showFavoritesOnly
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
                }`}
              >
                <span>⭐</span>
                <span className="text-sm">Favorit ({favoriteKL.length})</span>
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="priority">Urutkan: Prioritas</option>
                <option value="name">Urutkan: Nama A-Z</option>
                <option value="target">Urutkan: Target</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-center text-gray-600">
            <span className="font-semibold">{filteredKLData.length}</span> dari <span className="font-semibold">{klData.length}</span> K/L ditemukan
            {searchQuery && (
              <span> untuk pencarian "{searchQuery}"</span>
            )}
          </div>
        </div>

        {/* Featured K/L - Kemenko PMK */}
        {featuredKL && (
          <div className="mb-12">
            <div 
              className="relative group bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              onClick={() => openKLPopup(featuredKL)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(featuredKL.id);
                }}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <span className={`text-xl ${favoriteKL.includes(featuredKL.id) ? '⭐' : '☆'}`}></span>
              </button>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  
                  {/* Logo & Badge Section */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-6xl">{featuredKL.logo}</span>
                    </div>
                    <div className="flex justify-center lg:justify-start gap-2">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                        KOORDINATOR UTAMA
                      </span>
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold">
                        PRIORITAS
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                      {featuredKL.shortName}
                    </h3>
                    <p className="text-lg text-purple-100 mb-2 font-semibold">
                      {featuredKL.role}
                    </p>
                    <p className="text-purple-100 mb-6 leading-relaxed text-lg">
                      {featuredKL.description}
                    </p>

                    {/* Programs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {featuredKL.programs.map((program, index) => (
                        <div key={index} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400">✓</span>
                            <span className="text-white font-semibold text-sm">{program}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-white">
                        <span className="text-3xl font-black">{featuredKL.target}</span>
                        <span className="block text-purple-200 text-sm">Target Coverage</span>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openKLPopup(featuredKL);
                          }}
                          className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 hover:text-purple-800 transition-all duration-300 flex items-center gap-2"
                        >
                          <span>ℹ️</span>
                          Lihat Detail
                        </button>
                        <a
                          href={`https://wa.me/${featuredKL.contact.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                        >
                          <span>💬</span>
                          Hubungi PIC
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular K/L Grid */}
        {regularKL.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularKL.map((kl) => (
              <div
                key={kl.id}
                className={`group bg-white rounded-2xl border-2 ${getBgColorClasses(kl.color)} overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative`}
                onClick={() => openKLPopup(kl)}
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(kl.id);
                  }}
                  className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm"
                >
                  <span className={`text-sm ${favoriteKL.includes(kl.id) ? '⭐' : '☆'}`}></span>
                </button>

                {/* Header with Logo */}
                <div className={`h-24 bg-gradient-to-br ${getColorClasses(kl.color)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{kl.logo}</span>
                    </div>
                  </div>
                  {kl.priority && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        PRIORITAS
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {kl.shortName}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold mb-3">{kl.role}</p>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {kl.description}
                  </p>

                  {/* Programs List */}
                  <ul className="space-y-2 mb-6">
                    {kl.programs.slice(0, 2).map((program, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 text-xs mt-1 flex-shrink-0">•</span>
                        <span>{program}</span>
                      </li>
                    ))}
                    {kl.programs.length > 2 && (
                      <li className="text-sm text-gray-500 italic">
                        +{kl.programs.length - 2} program lainnya
                      </li>
                    )}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-xs text-gray-500">Target</span>
                      <div className="font-bold text-gray-900 text-sm">{kl.target}</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openKLPopup(kl);
                        }}
                        className={`bg-gradient-to-r ${getColorClasses(kl.color)} text-white px-3 py-2 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        Detail
                      </button>
                      <a
                        href={`https://wa.me/${kl.contact.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition-all duration-300"
                      >
                        💬
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada K/L ditemukan</h3>
            <p className="text-gray-600 mb-6">Coba ubah kriteria pencarian atau filter Anda</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setShowFavoritesOnly(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Quick Favorites Panel */}
        {favoriteKL.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <span>⭐</span>
                  Favorit Saya ({favoriteKL.length})
                </h4>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  {showFavoritesOnly ? 'Tampilkan Semua' : 'Lihat Favorit'}
                </button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {favoriteKL.slice(0, 3).map(klId => {
                  const kl = klData.find(k => k.id === klId);
                  return kl ? (
                    <div key={klId} className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{kl.logo}</span>
                      <span className="font-medium text-gray-700 flex-1 truncate">{kl.shortName}</span>
                      <button
                        onClick={() => openKLPopup(kl)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <span>↗️</span>
                      </button>
                    </div>
                  ) : null;
                })}
                {favoriteKL.length > 3 && (
                  <div className="text-xs text-gray-500 text-center pt-2 border-t">
                    +{favoriteKL.length - 3} lainnya
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* K/L Detail Popup */}
      {isKLPopupOpen && selectedKL && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100 my-8">
            
            {/* Header */}
            <div className={`relative bg-gradient-to-br ${getColorClasses(selectedKL.color)} p-8`}>
              <button
                onClick={closeKLPopup}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <span className="text-lg text-white group-hover:scale-110 transition-transform">✕</span>
              </button>
              
              <div className="flex flex-col lg:flex-row items-center gap-6 max-w-5xl">
                <div className="flex-shrink-0 text-center lg:text-left">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <span className="text-5xl">{selectedKL.logo}</span>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {selectedKL.featured && (
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                        KOORDINATOR UTAMA
                      </span>
                    )}
                    {selectedKL.priority && (
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold">
                        PRIORITAS
                      </span>
                    )}
                    <span className="px-3 py-1 bg-green-400 text-green-900 rounded-full text-sm font-bold">
                      {selectedKL.status}
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left min-w-0">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{selectedKL.name}</h2>
                  <p className="text-lg text-white/90 font-semibold mb-3">{selectedKL.role}</p>
                  <p className="text-white/80 leading-relaxed">{selectedKL.description}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
              
              {/* Quick Info */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900">{selectedKL.target}</div>
                    <div className="text-gray-600 font-semibold">Target Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900">{selectedKL.programs.length}</div>
                    <div className="text-gray-600 font-semibold">Program Utama</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">{selectedKL.status}</div>
                    <div className="text-gray-600 font-semibold">Status Program</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-8">
                
                {/* Program Overview */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(selectedKL.color)} rounded-xl flex items-center justify-center`}>
                      <span className="text-white">📋</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Program Utama</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedKL.programs.map((program, index) => (
                      <div key={index} className={`${getBgColorClasses(selectedKL.color)} rounded-xl p-4 border-2`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${getColorClasses(selectedKL.color)} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{program}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Programs */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(selectedKL.color)} rounded-xl flex items-center justify-center`}>
                      <span className="text-white">📝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Detail Program & Kegiatan</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedKL.detailPrograms.map((program, index) => (
                      <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className={`bg-gradient-to-r ${getColorClasses(selectedKL.color)} p-4`}>
                          <h4 className="text-lg font-bold text-white">{program.name}</h4>
                        </div>
                        <div className="p-6">
                          <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📅</span>
                              <span className="text-sm text-gray-600">Timeline: <strong>{program.timeline}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">👥</span>
                              <span className="text-sm text-gray-600">Target: <strong>{program.participants}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`${getBgColorClasses(selectedKL.color)} rounded-2xl p-6 border-2`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(selectedKL.color)} rounded-xl flex items-center justify-center`}>
                      <span className="text-white">📞</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Informasi Kontak</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Person in Charge (PIC)</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">👤</span>
                          <span className="text-gray-700">{selectedKL.contact.pic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📧</span>
                          <a href={`mailto:${selectedKL.contact.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                            {selectedKL.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">💬</span>
                          <a href={`https://wa.me/${selectedKL.contact.whatsapp.replace(/\D/g, '')}`} className="text-green-600 hover:text-green-800 transition-colors">
                            {selectedKL.contact.whatsapp}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Website Resmi</h4>
                      <a 
                        href={selectedKL.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>🌐</span>
                        {selectedKL.website}
                      </a>
                      
                      {/* Quick Actions */}
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => toggleFavorite(selectedKL.id)}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            favoriteKL.includes(selectedKL.id)
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span>⭐</span>
                          {favoriteKL.includes(selectedKL.id) ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
                        </button>
                        
                        <button
                          onClick={() => {
                            const shareData = {
                              title: `${selectedKL.shortName} - SIMONEV PAUD HI`,
                              text: `Informasi Program ${selectedKL.shortName}: ${selectedKL.description}`,
                              url: window.location.href
                            };
                            if (navigator.share) {
                              navigator.share(shareData);
                            } else {
                              navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                              alert('Link telah disalin ke clipboard!');
                            }
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                        >
                          <span>🔗</span>
                          Bagikan Info K/L
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={`mailto:${selectedKL.contact.email}?subject=Konsultasi Program PAUD HI - ${selectedKL.shortName}&body=Halo ${selectedKL.contact.pic},%0D%0A%0D%0ASaya tertarik untuk mengetahui lebih lanjut tentang program PAUD HI di ${selectedKL.shortName}.%0D%0A%0D%0ATerima kasih.`}
                    className={`flex-1 bg-gradient-to-r ${getColorClasses(selectedKL.color)} text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <span>📧</span>
                    Kirim Email
                  </a>
                  <a
                    href={`https://wa.me/${selectedKL.contact.whatsapp.replace(/\D/g, '')}?text=Halo%20${selectedKL.contact.pic},%0A%0ASaya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20tentang%20program%20PAUD%20HI%20di%20${selectedKL.shortName}.%0A%0ATerima%20kasih.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    WhatsApp PIC
                  </a>
                  <button 
                    onClick={closeKLPopup}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>✕</span>
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KLProgramsMVP;