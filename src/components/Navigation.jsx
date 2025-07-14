import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Filter, ArrowRight } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Tips pengasuhan', 'Stimulasi bayi', 'PAUD HI']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Pengasuhan AI', href: '/pengasuhan' },
    { name: 'Tentang', href: '/About' },
    { name: 'FAQ', href: '/faq' },
  ];

  // Search data embedded langsung di component (lebih reliable)
  const searchData = [
    // === HALAMAN UTAMA ===
    {
      id: 'beranda',
      title: 'Beranda PAUD HI',
      url: '/',
      category: 'Halaman Utama',
      description: 'Sistem Informasi, Monitoring, dan Evaluasi PAUD Holistik Integratif',
      keywords: ['beranda', 'home', 'paud hi', 'sistem informasi', 'monitoring', 'evaluasi', 'holistik integratif'],
      content: 'Sistem terpadu yang dirancang untuk memantau dan mengevaluasi pelaksanaan layanan PAUD HI lintas sektor'
    },
    // === LAYANAN ===
    {
      id: 'layanan-pendidikan',
      title: 'Layanan Pendidikan PAUD HI',
      url: '/#layanan',
      category: 'Layanan',
      description: 'Menjamin akses dan kualitas pendidikan anak usia dini, serta penguatan peran pendidik',
      keywords: ['pendidikan', 'paud', 'guru', 'tenaga kependidikan', 'pendidikan islam', 'katolik', 'buddha', 'hindu'],
      content: 'Program Pendidikan Anak Usia Dini, Program Guru dan Tenaga Kependidikan, Program Pendidikan Islam'
    },
    {
      id: 'layanan-kesehatan',
      title: 'Layanan Kesehatan dan Gizi',
      url: '/#layanan',
      category: 'Layanan',
      description: 'Mendukung kesehatan fisik dan gizi anak sejak dini melalui program strategis nasional',
      keywords: ['kesehatan', 'gizi', 'ibu', 'anak', 'kb', 'keluarga berencana', 'reproduksi', 'germas'],
      content: 'Program Peningkatan Kesehatan Ibu, Anak, KB, Program Percepatan Perbaikan Gizi Masyarakat'
    },
    {
      id: 'layanan-perlindungan',
      title: 'Layanan Perlindungan dan Pengasuhan',
      url: '/#layanan',
      category: 'Layanan',
      description: 'Memberikan perlindungan menyeluruh bagi anak serta memperkuat lingkungan pengasuhan',
      keywords: ['perlindungan', 'pengasuhan', 'kesejahteraan', 'anak terlantar', 'miskin', 'kependudukan'],
      content: 'Program Kesejahteraan Sosial Anak Terlantar dan Miskin, Program Kependudukan, KB'
    },
    {
      id: 'layanan-tata-kelola',
      title: 'Layanan Tata Kelola PAUD HI',
      url: '/#layanan',
      category: 'Layanan',
      description: 'Menjamin tata kelola program PAUD HI yang sinergis, terukur, dan berbasis data',
      keywords: ['tata kelola', 'koordinasi', 'perencanaan', 'penyelenggaraan', 'pendataan'],
      content: 'Koordinasi Perencanaan Program PAUD HI, Koordinasi Penyelenggaraan, Koordinasi Pendataan'
    },
    // === BERITA ===
    {
      id: 'berita-monitoring-diy',
      title: 'Monitoring dan Evaluasi Perlindungan Anak di DIY',
      url: '/#berita',
      category: 'Berita',
      description: 'Kemenko PMK lakukan monitoring sistem perlindungan anak di Provinsi DIY',
      keywords: ['monitoring', 'evaluasi', 'perlindungan anak', 'diy', 'kekerasan', 'kemenko pmk'],
      content: '575 kasus kekerasan terhadap anak di DIY, penguatan perlindungan anak di lingkungan pendidikan'
    },
    {
      id: 'berita-ecdi-2030',
      title: 'Sinergi PAUD HI Hadapi ECDI 2030',
      url: '/#berita',
      category: 'Berita',
      description: 'Deputi Woro tegaskan pentingnya sinergi lintas sektor untuk ECDI 2030',
      keywords: ['ecdi 2030', 'indeks perkembangan', 'anak usia dini', 'sinergi', 'indonesia emas 2045'],
      content: '87,7% anak usia 24-59 bulan berkembang sesuai tahapan sensorik, kognitif, bahasa'
    },
    {
      id: 'berita-strategi-baru',
      title: 'Strategi Baru PAUD HI 2025–2029',
      url: '/#berita',
      category: 'Berita',
      description: 'Evaluasi RAN PAUD HI 2020–2024 dan penyusunan strategi lanjutan',
      keywords: ['ran paud hi', 'strategi nasional', 'rpjmn', '2025-2029', 'kemenko pmk'],
      content: 'Pendekatan holistik mencakup kesehatan, gizi, pengasuhan, perlindungan, digitalisasi'
    },
    // === FAQ ===
    {
      id: 'faq-apa-itu-paud-hi',
      title: 'Apa itu PAUD HI?',
      url: '/faq',
      category: 'FAQ',
      description: 'PAUD HI adalah program layanan lengkap untuk anak usia 0–6 tahun',
      keywords: ['paud hi', 'pengembangan anak usia dini', 'holistik integratif', 'definisi'],
      content: 'Layanan terpadu mencakup pendidikan, kesehatan, gizi, perlindungan, dan pengasuhan'
    },
    {
      id: 'faq-penyelenggara',
      title: 'Siapa yang menyelenggarakan PAUD HI?',
      url: '/faq',
      category: 'FAQ',
      description: 'PAUD HI dilaksanakan oleh satuan PAUD dengan dukungan pemerintah daerah',
      keywords: ['penyelenggara', 'satuan paud', 'gugus tugas', 'pemerintah daerah'],
      content: 'Koordinasi sektor pendidikan, kesehatan, perlindungan anak, gizi'
    },
    {
      id: 'faq-tujuan',
      title: 'Apa tujuan dari PAUD HI?',
      url: '/faq',
      category: 'FAQ',
      description: 'Memastikan setiap anak usia dini mendapatkan layanan esensial menyeluruh',
      keywords: ['tujuan', 'layanan esensial', 'tumbuh kembang', 'fisik', 'kognitif', 'emosional'],
      content: 'Aspek fisik, kognitif, emosional, sosial untuk tumbuh kembang optimal'
    },
    // === HALAMAN LAIN ===
    {
      id: 'tentang-paud-hi',
      title: 'Tentang PAUD HI dan Tujuannya',
      url: '/about',
      category: 'Informasi',
      description: 'Informasi lengkap tentang Pengembangan Anak Usia Dini Holistik Integratif',
      keywords: ['tentang', 'about', 'visi', 'misi', 'sejarah', 'tujuan'],
      content: 'Sejarah, visi misi, timeline perkembangan PAUD HI di Indonesia'
    },
    {
      id: 'pengasuhan-ai',
      title: 'Pengasuhan AI - Konsultasi Cerdas',
      url: '/pengasuhan',
      category: 'Layanan Digital',
      description: 'Platform konsultasi AI untuk membantu orang tua dalam pengasuhan anak',
      keywords: ['pengasuhan ai', 'konsultasi', 'ai', 'chatbot', 'parenting', 'tumbuh kembang'],
      content: 'Konsultasi 24/7 dengan AI, tips pengasuhan, solusi masalah tumbuh kembang'
    },
    {
      id: 'dashboard-indikator',
      title: 'Dashboard Capaian Indikator PAUD HI',
      url: '/dashboard',
      category: 'Data & Statistik',
      description: 'Dashboard monitoring capaian indikator PAUD HI secara nasional dan regional',
      keywords: ['dashboard', 'indikator', 'capaian', 'statistik', 'monitoring', 'data'],
      content: 'Visualisasi data capaian PAUD HI, grafik perkembangan, analisis regional'
    },
    // === PANDUAN ===
    {
      id: 'panduan-buku-guru',
      title: 'Belajar dan Bermain Berbasis Buku - Buku Guru PAUD',
      url: '/#panduan',
      category: 'Panduan',
      description: 'Panduan resmi Kemdikbud untuk pembelajaran dan bermain berbasis buku di PAUD',
      keywords: ['buku guru', 'pembelajaran', 'bermain', 'berbasis buku', 'kemdikbud'],
      content: 'Panduan pembelajaran berbasis buku, integrasi bermain dan belajar, 156 halaman'
    },
    {
      id: 'panduan-kurikulum-merdeka',
      title: 'Pembelajaran Fase Fondasi - Kurikulum Merdeka',
      url: '/#panduan',
      category: 'Panduan',
      description: 'Panduan implementasi Kurikulum Merdeka untuk fase fondasi PAUD',
      keywords: ['kurikulum merdeka', 'fase fondasi', 'pembelajaran bermakna', 'pancasila'],
      content: 'Pembelajaran berbasis permainan, lingkungan bermakna, nilai-nilai Pancasila'
    },
    {
      id: 'panduan-peran-ayah',
      title: 'Peran Ayah dalam Pengasuhan Anak',
      url: '/#panduan',
      category: 'Panduan',
      description: 'Panduan praktis bagi para ayah dalam menjalankan peran pengasuhan',
      keywords: ['peran ayah', 'pengasuhan', 'keluarga', 'sosial emosional'],
      content: 'Keterlibatan ayah, ikatan emosional, tumbuh kembang seimbang, 92 halaman'
    },
    // === TIPS PRAKTIS ===
    {
      id: 'tips-stimulasi-bayi',
      title: 'Stimulasi Holistik untuk Bayi 0-12 Bulan',
      url: '/tips/stimulasi-bayi',
      category: 'Tips',
      description: 'Tutorial komprehensif stimulasi yang mengintegrasikan aspek fisik, kognitif, sosial-emosional',
      keywords: ['stimulasi', 'bayi', '0-12 bulan', 'holistik', 'fisik', 'kognitif', 'motorik'],
      content: 'Stimulasi motorik terintegrasi, bonding sehat, deteksi dini keterlambatan'
    },
    {
      id: 'tips-gizi-anak',
      title: 'Pentingnya Gizi Seimbang untuk Anak Usia Dini',
      url: '/tips/gizi-anak',
      category: 'Tips',
      description: 'Panduan lengkap tentang nutrisi dan gizi seimbang untuk tumbuh kembang optimal',
      keywords: ['gizi', 'nutrisi', 'anak usia dini', 'seimbang', 'makanan sehat'],
      content: 'Kebutuhan gizi per usia, menu seimbang, tips pemberian makan, deteksi malnutrisi'
    },
    {
      id: 'tips-deteksi-dini',
      title: 'Deteksi Dini Gangguan Tumbuh Kembang',
      url: '/tips/deteksi-dini',
      category: 'Tips',
      description: 'Mengenali tanda-tanda gangguan tumbuh kembang dan langkah intervensi dini',
      keywords: ['deteksi dini', 'gangguan', 'tumbuh kembang', 'intervensi', 'red flags'],
      content: 'Red flags per usia, kapan perlu khawatir, langkah intervensi, rujukan ke ahli'
    }
  ];

  const categories = ['all', 'Layanan', 'Berita', 'FAQ', 'Panduan', 'Tips', 'Informasi', 'Layanan Digital'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced search function
  const performSearch = (query) => {
    console.log('🔍 Searching for:', query); // Debug log
    setIsSearchLoading(true);
    
    setTimeout(() => {
      let filtered = searchData;
      
      // Filter by category if selected
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(item => item.category === selectedCategory);
        console.log('📂 Filtered by category:', selectedCategory, filtered.length); // Debug log
      }
      
      if (query.length > 0) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        console.log('🔤 Search terms:', searchTerms); // Debug log
        
        filtered = filtered.filter(item => {
          const searchableText = [
            item.title,
            item.description,
            item.content,
            ...item.keywords
          ].join(' ').toLowerCase();
          
          return searchTerms.some(term => searchableText.includes(term));
        });
      }
      
      console.log('✅ Search results:', filtered.length); // Debug log
      setSearchResults(filtered.slice(0, 8));
      setIsSearchLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (searchQuery.length > 0 || selectedCategory !== 'all') {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

  const handleSearch = (searchTerm) => {
    console.log('🎯 Handle search:', searchTerm); // Debug log
    setSearchQuery(searchTerm);
    setIsSearchOpen(true);
    
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedCategory('all');
    inputRef.current?.focus();
  };

  const handleResultClick = (result) => {
    console.log('🔗 Navigating to:', result.url); // Debug log
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    
    // Enhanced navigation handling
    if (result.url.includes('#')) {
      const [path, anchor] = result.url.split('#');
      if (path === '' || path === window.location.pathname) {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = result.url;
      }
    } else {
      window.location.href = result.url;
    }
    
    // Add to recent searches
    if (!recentSearches.includes(result.title)) {
      setRecentSearches(prev => [result.title, ...prev.slice(0, 4)]);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Layanan': 'fas fa-cogs',
      'Berita': 'fas fa-newspaper',
      'FAQ': 'fas fa-question-circle',
      'Panduan': 'fas fa-book',
      'Tips': 'fas fa-lightbulb',
      'Informasi': 'fas fa-info-circle',
      'Layanan Digital': 'fas fa-robot',
      'Data & Statistik': 'fas fa-chart-bar'
    };
    return icons[category] || 'fas fa-file-alt';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              <div
                className="w-10 h-10 overflow-hidden flex items-center justify-center bg-white"
                title="Kembali ke Beranda"
              >
                <img
                  src="/logo.png"
                  alt="Logo PAUD HI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="hidden sm:block">PAUD HI</span>
            </a>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-md mx-8 relative" ref={searchRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Cari layanan, panduan, berita PAUD HI..."
                  className="block w-full pl-9 pr-20 py-2.5 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
                
                <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-1 hover:bg-gray-100 rounded transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Desktop Search Results */}
              {isSearchOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-hidden">
                  {/* Category Filter */}
                  {showFilters && (
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => {
                              console.log('🏷️ Selected category:', category); // Debug log
                              setSelectedCategory(category);
                            }}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                              selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-blue-100'
                            }`}
                          >
                            {category === 'all' ? 'Semua' : category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="max-h-80 overflow-y-auto">
                    {searchQuery === '' && selectedCategory === 'all' ? (
                      <div className="p-4">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Clock className="h-4 w-4 mr-2" />
                          Pencarian Terbaru
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <>
                        {isSearchLoading ? (
                          <div className="p-4 text-center">
                            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-sm text-gray-500">Mencari...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="py-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                              {searchResults.length} hasil ditemukan
                            </div>
                            {searchResults.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-50 last:border-b-0 focus:outline-none focus:bg-blue-50 group"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-1">
                                    <i className={`${getCategoryIcon(result.category)} text-blue-600 text-sm`}></i>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 
                                      className="text-sm font-medium text-gray-900 mb-1 line-clamp-1"
                                      dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, searchQuery) }}
                                    />
                                    <p 
                                      className="text-xs text-gray-600 line-clamp-2 mb-2"
                                      dangerouslySetInnerHTML={{ __html: highlightMatch(result.description, searchQuery) }}
                                    />
                                    <div className="flex items-center gap-2">
                                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                        {result.category}
                                      </span>
                                    </div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">
                              Tidak ada hasil untuk "<span className="font-medium">{searchQuery}</span>"
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Coba kata kunci yang berbeda atau hapus filter
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-8">
              {navItems.map((item, index) => {
                const isActive = item.href === currentPath;
                return (
                  <li key={index}>
                    <a 
                      href={item.href}
                      className={`relative font-medium py-2 px-1 transition-all duration-300 group ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-base`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 py-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-4 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Cari konten PAUD HI..."
                  className="block w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Mobile Search Results */}
              {isSearchOpen && (searchQuery || selectedCategory !== 'all') && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="py-1">
                      {searchResults.slice(0, 5).map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="flex items-start gap-2">
                            <i className={`${getCategoryIcon(result.category)} text-blue-600 text-xs mt-1 flex-shrink-0`}></i>
                            <div className="flex-1 min-w-0">
                              <div 
                                className="text-sm font-medium text-gray-900 mb-1 line-clamp-1"
                                dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, searchQuery) }}
                              />
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {result.category}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery && (
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-500">Tidak ada hasil</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = item.href === currentPath;
                return (
                  <li key={index}>
                    <a 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Navigation;