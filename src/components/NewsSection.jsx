import React, { useState, useEffect } from 'react';
import berita0 from '../images/berita/berita0.jpg';
import berita2 from '../images/berita/berita2.jpeg';

const NewsSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const newsArticles = [
    {
    
  id: 0,
  title: 'Kemenko PMK Lakukan Monitoring dan Evaluasi Perlindungan dan Pemenuhan Hak Anak di DIY',
  excerpt: 'Kemenko PMK melalui Asdep dr. Nia melakukan monitoring dan evaluasi sistem perlindungan anak di Provinsi DIY, menyoroti peningkatan koordinasi lintas sektor dalam penanganan kekerasan terhadap anak dan perempuan.',
  author: 'Kemenko PMK',
  date: '26 Juni 2025',
  readTime: '3 menit',
  icon: 'fas fa-shield-alt',
  tags: ['Perlindungan Anak', 'Monitoring Evaluasi', 'Kemenko PMK'],
  image: berita0,
  fullContent: `
<p>Yogyakarta – Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan (Kemenko PMK), melalui Asisten Deputi Perlindungan dan Pemenuhan Hak Anak (PPHA), melakukan kunjungan kerja ke Provinsi Daerah Istimewa Yogyakarta (DIY) pada 24–26 Juni 2025. Kegiatan ini merupakan bagian dari upaya monitoring dan evaluasi penanganan kekerasan terhadap anak dan perempuan di daerah.</p>

<p>Berdasarkan data Simfoni PPA tahun 2024, tercatat 575 kasus kekerasan terhadap anak di DIY, termasuk kasus yang terjadi di satuan pendidikan dan lingkungan keluarga. Kegiatan ini menyoroti pentingnya penguatan perlindungan anak, khususnya dalam lingkungan pendidikan formal dan nonformal.</p>

<p>Selama tiga hari, rangkaian kegiatan mencakup pertemuan dengan P2TPAKK "Rekso Dyah Utami", UPTD PPA Sleman dan Bantul, Satgas PPKS UGM, ISI, dan UPN, serta kunjungan ke Polres Sleman dan Pesantren Ora Aji. Kegiatan ditutup dengan evaluasi internal dan penyusunan rekomendasi kebijakan untuk penguatan sistem perlindungan anak.</p>

<p>Kegiatan ini diharapkan menghasilkan peningkatan sinergi antar pemangku kepentingan serta komitmen bersama dalam menciptakan lingkungan yang aman dan ramah anak di seluruh wilayah Indonesia. Pendanaan kegiatan bersumber dari DIPA Kemenko PMK Tahun Anggaran 2025.</p>
`,
      images: [
        {
          src: berita0,
          imageClass: 'w-full h-64 object-cover object-top', // ← tambahkan ini di render-nya!

          caption: 'Monitoring dan Evaluasi Perlindungan dan Pemenuhan Hak Anak di DIY, fokus pada pencegahan kekerasan di lingkungan pendidikan dan penguatan layanan UPTD PPA.',
        },
      ],
    },

    {
  id: 1,
  title: 'Deputi Woro Tegaskan Sinergi PAUD HI Hadapi ECDI 2030 untuk SDM Unggul',
  excerpt: 'Deputi Bidang Koordinasi Peningkatan Kualitas Anak, Perempuan, dan Pemuda Kemenko PMK, Woro Srihastuti Sulistyaningrum, menegaskan pentingnya sinergi lintas sektor dalam mendukung peluncuran Indeks Perkembangan Anak Usia Dini (ECDI) 2030.',
  author: 'Kemenko PMK',
  date: '15 Mei 2025',
  readTime: '4 menit',
  icon: 'fas fa-child',
  tags: ['PAUD HI', 'ECDI 2030', 'SDM Unggul', 'Indonesia Emas 2045'],
  image: 'https://akcdn.detik.net.id/community/media/visual/2025/05/15/bappenas-meluncurkan-early-childhood-development-index-ecdi-2030-1747282294752.jpeg?w=700&q=90',
  fullContent: `
    <p>Kementerian PPN/Bappenas resmi meluncurkan <strong>Indeks Perkembangan Anak Usia Dini (ECDI) 2030</strong> sebagai bagian dari upaya strategis menyongsong generasi Indonesia Emas 2045. Dalam momentum penting ini, <strong>Deputi Bidang Koordinasi Peningkatan Kualitas Anak, Perempuan, dan Pemuda Kemenko PMK, Woro Srihastuti Sulistyaningrum</strong>, menekankan pentingnya sinergi lintas sektor dalam mengakselerasi implementasi <em>Pengembangan Anak Usia Dini Holistik Integratif (PAUD HI)</em>.</p>

    <h4>PAUD HI sebagai Fondasi SDM Unggul</h4>
    <p>Deputi Woro menyambut baik peluncuran ECDI2030 oleh Bappenas yang turut disusun bersama Kemendikbudristek, BKKBN, BPS, UNICEF, dan Tanoto Foundation, dan menegaskan bahwa PAUD HI adalah landasan utama membangun SDM berkualitas sejak usia dini. "Kita harus memastikan seluruh anak Indonesia mendapatkan hak tumbuh kembang optimal sejak dalam kandungan hingga usia 6 tahun," tegasnya.</p>

    <h4>87,7% Anak Berkembang Sesuai Tahapan</h4>
    <p>Menurut hasil pengukuran ECDI 2024, sebanyak <strong>87,7% anak usia 24–59 bulan</strong> telah berkembang sesuai tahapan sensorik, kognitif, bahasa, dan kesejahteraan. Namun, Deputi Woro mengingatkan bahwa tantangan pemerataan layanan PAUD HI di daerah masih tinggi.</p>

    <h4>Perkuat Kolaborasi Menuju 2045</h4>
    <p>Deputi Woro mengajak seluruh pemangku kepentingan untuk memperkuat komitmen dan koordinasi. "Mari kita satukan langkah, perkuat sinergi, dan bangun pondasi kokoh bagi generasi masa depan," ujarnya dalam pernyataan resmi. ECDI 2030 diharapkan menjadi alat kebijakan berbasis data yang mendorong penguatan PAUD HI menuju <strong>Indonesia Emas 2045</strong>.</p>
  `,
  images: [
    {
      src: 'https://akcdn.detik.net.id/community/media/visual/2025/05/15/bappenas-meluncurkan-early-childhood-development-index-ecdi-2030-1747282294752.jpeg?w=700&q=90',
      caption: 'Deputi Woro saat menyampaikan pentingnya PAUD HI dalam peluncuran ECDI 2030.'
    }
  ]
},

    {
  id: 2,
  title: 'Strategi Baru PAUD HI 2025–2029 Disusun di Hotel Mercure Jakarta',
  excerpt: 'Kemenko PMK menggelar rapat evaluasi RAN PAUD HI 2020–2024 dan menyusun strategi lanjutan untuk 2025–2029. Deputi Woro menekankan pentingnya sinergi lintas sektor dan pendekatan holistik.',
  author: 'Kemenko PMK',
  date: '10 Maret 2025',
  readTime: '6 menit',
  icon: 'fas fa-people-group',
  tags: ['RAN PAUD HI', 'Strategi Nasional', 'RPJMN 2025–2029', 'Kemenko PMK'],
  image: berita2,
  fullContent: `
    <h3>Evaluasi RAN PAUD HI 2020–2024</h3>
    <p>Pada 10 Maret 2025, Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan (Kemenko PMK) menggelar rapat koordinasi nasional di Hotel Mercure Sabang, Jakarta, untuk mengevaluasi implementasi Rencana Aksi Nasional PAUD HI 2020–2024.</p>

    <h4>Pentingnya Pendekatan Holistik</h4>
    <p>Deputi Woro Srihastuti Sulistyaningrum menyampaikan bahwa PAUD HI tidak hanya mencakup pendidikan saja, melainkan seluruh kebutuhan dasar anak, mulai dari kesehatan, gizi, pengasuhan, hingga perlindungan.</p>

    <h4>Menuju RPJMN 2025–2029</h4>
    <p>Hasil evaluasi dijadikan dasar untuk menyusun strategi keberlanjutan RAN PAUD HI ke dalam RPJMN 2025–2029. Kemenko PMK mendorong kolaborasi antarsektor serta penggunaan sistem digital untuk meningkatkan efisiensi layanan.</p>

    <h4>Sinergi dan Digitalisasi</h4>
    <p>Salah satu fokus strategi baru adalah memperkuat integrasi data dan monitoring digital. SISMONEV PAUD HI akan menjadi tulang punggung sistem pelaporan dan pengawasan nasional.</p>

    <h4>Kutipan Penting</h4>
    <blockquote>
      "Kita tidak hanya bicara pendidikan anak usia dini saja, tetapi juga layanan kesehatan, gizi, pengasuhan, dan perlindungan. Semua ini harus dipastikan terintegrasi dan berkelanjutan." – Woro Srihastuti
    </blockquote>
  `,
  images: [
    {
      src: berita2,
      caption: 'Rapat Koordinasi Evaluasi PAUD HI 2020–2024 di Hotel Mercure Sabang, Jakarta',
    },
      ],
    },
    {
      id: 4,
      title: 'Kemenko PMK Dorong Pentingnya Pengembangan Anak Usia Dini Secara Holistik dan Integratif',
      excerpt: 'Deputi Peningkatan Kualitas Anak, Perempuan, dan Pemuda Kemenko PMK menekankan pentingnya pengawalan perkembangan anak sejak usia dini. Kesalahan sedikit saja dalam mengawal perkembangan anak usia dini akan berdampak pada kualitas SDM di masa depan.',
      author: 'Kemenko PMK',
      date: '15 Februari 2025',
      readTime: '6 menit',
      icon: 'fas fa-brain',
      tags: ['Holistik Integratif', 'Nurturing Care Framework', 'ECED Council'],
      image: 'https://kemenkopmk.go.id/sites/default/files/articles/2024-08/IMG-20240813-WA0026.jpg',
      fullContent: `
        <h3>Periode Emas Perkembangan Anak</h3>
        <p>Deputi Woro menekankan pentingnya pengawalan perkembangan anak sejak usia dini. Beliau menggarisbawahi bahwa aspek kesehatan, gizi, pendidikan, pengasuhan, perlindungan, dan keselamatan harus diperhatikan secara serius karena masa ini merupakan periode penting dalam pertumbuhan anak dimana perkembangan otak terjadi sangat pesat pada periode ini.</p>
        
        <h4>Tantangan Implementasi Selama 11 Tahun</h4>
        <p>Meskipun sudah 11 tahun sejak diterbitkannya Perpres Nomor 60 Tahun 2013 tentang PAUD Holistik Integratif (PAUD HI), tantangan dalam implementasinya masih tetap ada. Salah satu tantangan yang diidentifikasi adalah kurangnya komitmen dan pemahaman para pemangku kepentingan terhadap kebijakan PAUD HI.</p>
        
        <h4>Keselarasan dengan Nurturing Care Framework</h4>
        <p>Deputi Lisa menjelaskan bahwa konsep PAUD HI yang ada saat ini sudah selaras dengan Nurturing Care Framework (NCF) yang diluncurkan oleh WHO, UNICEF, dan Bank Dunia pada tahun 2018. ECED Council diharapkan dapat menjadi mitra strategis pemerintah terutama dalam memperkuat kerja Gugus Tugas dan sekretariat PAUD HI.</p>
        
        <h4>Dukungan Tanoto Foundation</h4>
        <p>Dalam kesempatan yang sama, Deputi Lisa menyampaikan apresiasi kepada Tanoto Foundation yang telah mendukung penuh pembentukan ECED Council. "Kami berterima kasih atas dukungan dalam memperkuat Early Child Development sebagai investasi jangka panjang melalui pembentukan ECED Council," ujarnya.</p>
      `,
      images: [
        {
          src: 'https://kemenkopmk.go.id/sites/default/files/articles/2024-08/IMG-20240813-WA0026.jpg',
          caption: 'Lokakarya pembentukan ECED Council di Jakarta dengan para ahli dan praktisi PAUD HI',
        },
  ],
},

     {
      id: 6,
      title: 'Kolaborasi Strategis RI-UNICEF: Susun Rencana Kerja Untuk Kesejahteraan Anak',
      excerpt: 'Asisten Deputi Bidang Pendidikan Anak Usia Dini, Dasar dan Menengah Jazziray Hartoyo menerima audiensi dari PATTIRO terkait kebijakan dan implementasi program PAUD HI. Penekanan pada koordinasi lintas sektor dan kolaborasi pentahelix menjadi kunci utama.',
      author: 'Kemenko PMK',
      date: '22 Januari 2025',
      readTime: '4 menit',
      icon: 'fas fa-handshake',
      tags: ['PATTIRO', 'Kolaborasi', 'Pentahelix', 'Koordinasi'],
      image: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2025-01/WhatsApp%20Image%202025-01-22%20at%2011.06.37.jpeg',
      fullContent: `
        <p>Deputi Bidang Koordinasi Peningkatan Kualitas Keluarga dan Kependudukan Kemenko PMK, Woro Srihastuti menghadiri Rapat Tim Pengarah (Steering Committee) Penyusunan Rencana Kerja (Annual Work Plan) Tahun 2025 Program Kerja Sama Pemerintah RI dan UNICEF yang diselenggarakan oleh Kementerian PPN/Bappenas, di Jakarta pada Selasa (21/1/2025).

Rapat ini bertujuan merumuskan dan menyepakati rencana kerja 2025 sebagai bagian dari kerja sama strategis antara Pemerintah Indonesia dan UNICEF. Dalam sambutannya, Deputi yang akrab disapa Lisa tersebut menegaskan pentingnya kolaborasi erat antara pemerintah dan UNICEF untuk menghadapi tantangan peningkatan kualitas keluarga dan kependudukan di Indonesia.

"Melalui kerja sama yang solid dan rencana kerja yang terarah, kita bisa memastikan program-program yang dijalankan memberikan dampak nyata bagi kesejahteraan anak-anak dan keluarga di seluruh Indonesia," ujar Deputi Lisa.

Sebagai Ketua Gugus Tugas PAUD Holistik Integratif (PAUD HI), Kemenko PMK telah mendapat dukungan dari Program Kerja Sama RI-UNICEF, termasuk dalam pelaksanaan monitoring dan evaluasi di sejumlah wilayah. Deputi Lisa mengungkapkan bahwa monitoring tersebut menemukan sejumlah tantangan di lapangan, termasuk miskonsepsi terkait implementasi PAUD HI.

"Selama ini PAUD HI sering dianggap hanya mencakup Pendidikan Anak Usia Dini (PAUD), padahal pendekatan ini mengusung konsep Nurturing Care Framework yang meliputi kesehatan dan gizi, pendidikan dini, pengasuhan, perlindungan, dan kesejahteraan anak usia dini. Akibatnya, program PAUD HI kerap terfokus pada pendidikan anak usia 5–6 tahun, yang menjadi tanggung jawab Kemendikbudristek, sementara layanan untuk anak usia 0–3 tahun masih minim," jelas Deputi Lisa.</p
      `,
      images: [
        {
          src: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2025-01/WhatsApp%20Image%202025-01-22%20at%2011.06.37.jpeg',
          caption: 'Audiensi PATTIRO dengan Kemenko PMK di Ruang Rapat Lt. 13 Kemenko PMK',
        },
      ],
    },
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const openPopup = (article) => {
    setSelectedNews(article);
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupVisible(true), 10);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedNews(null);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  const saveArticle = (article) => {
    alert(`Artikel "${article.title}" telah disimpan!`);
  };

  const shareToSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(selectedNews?.title || '');
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title} - ${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50" id="berita">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <i className="fas fa-newspaper"></i>
            <span>Berita Terkini</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">
            Berita & Informasi <span className="text-blue-600">PAUD HI</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Update terbaru seputar program Pengembangan Anak Usia Dini Holistik Integratif dari Kemenko PMK
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6 sm:mb-8 max-w-md mx-auto px-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400 text-sm"></i>
            </div>
            <input
              type="text"
              placeholder="Cari artikel berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white shadow-sm text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Articles Grid - Mobile 2x3, Tablet 2x3, Desktop 3x2 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => openPopup(article)}
              className="group cursor-pointer bg-white shadow-lg hover:shadow-xl border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 lg:hover:-translate-y-2"
            >
              {/* Article Image */}
              <div className="relative h-32 sm:h-40 lg:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                  <i className={`${article.icon} text-blue-600 text-xs sm:text-sm`}></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 lg:p-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-white mb-1 sm:mb-2">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-calendar text-xs"></i>
                      <span className="hidden sm:inline">{article.date}</span>
                      <span className="sm:hidden">{article.date.split(' ')[0]}</span>
                    </span>
                    <span className="flex items-center gap-1 hidden sm:flex">
                      <i className="fas fa-clock text-xs"></i>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition leading-tight">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 1).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 1 && (
                      <span className="text-xs text-gray-500">+{article.tags.length - 1}</span>
                    )}
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <i className="fas fa-chevron-right text-xs sm:text-sm"></i>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <i className="fas fa-user-circle"></i>
                    <span className="truncate">{article.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i className="fas fa-search text-gray-400 text-xl sm:text-2xl"></i>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Artikel tidak ditemukan</h3>
            <p className="text-sm sm:text-base text-gray-600">Coba ubah kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Enhanced Popup Modal */}
      {isPopupOpen && selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div
            className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full h-[95vh] flex flex-col transform transition-all duration-300 ${
              isPopupVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5'
            }`}
          >
            {/* Enhanced Header - Fixed */}
            <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white flex-shrink-0">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        <i className="fas fa-user"></i>
                        <span className="hidden sm:inline">{selectedNews.author}</span>
                        <span className="sm:hidden">PMK</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-calendar"></i>
                        <span className="hidden sm:inline">{selectedNews.date}</span>
                        <span className="sm:hidden">{selectedNews.date.split(' ')[0]}</span>
                      </span>
                      <span className="flex items-center gap-1 hidden sm:flex">
                        <i className="fas fa-clock"></i>
                        {selectedNews.readTime}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight pr-2 sm:pr-4">
                      {selectedNews.title}
                    </h2>
                  </div>
                  <button 
                    onClick={closePopup} 
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition flex-shrink-0"
                  >
                    <i className="fas fa-times text-lg sm:text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Featured Image */}
                <div className="relative group">
                  <img
                    src={selectedNews.images[0].src}
                    alt={selectedNews.images[0].caption}
                    className="rounded-xl lg:rounded-2xl object-cover w-full h-40 sm:h-48 md:h-64 lg:h-80 shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3 sm:p-4 lg:p-6 rounded-b-xl lg:rounded-b-2xl">
                    <p className="text-xs sm:text-sm font-medium">{selectedNews.images[0].caption}</p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                  <div
                    className="text-gray-800 leading-relaxed text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: selectedNews.fullContent }}
                  ></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 sm:pt-6 border-t border-gray-200">
                  <span className="text-xs sm:text-sm font-medium text-gray-600 mr-2">Tags:</span>
                  {selectedNews.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Extra spacing to ensure content doesn't hide behind footer */}
                <div className="h-4"></div>
              </div>
            </div>

            {/* Enhanced Action Buttons - Fixed Footer */}
            <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Social Share */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-600 mr-1 sm:mr-2 flex items-center whitespace-nowrap">
                    <i className="fas fa-share-alt mr-1"></i>
                    <span className="hidden sm:inline">Bagikan:</span>
                    <span className="sm:hidden">Share:</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareToSocial('whatsapp')}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <i className="fab fa-whatsapp" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('facebook')}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <i className="fab fa-facebook-f" />
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('twitter')}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <i className="fab fa-twitter" />
                      <span className="hidden sm:inline">Twitter</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <button
                    onClick={() => saveArticle(selectedNews)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <i className="fas fa-bookmark" />
                    <span>Simpan Artikel</span>
                  </button>
                  <button
                    onClick={closePopup}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <i className="fas fa-check" />
                    <span>Selesai Membaca</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
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

export default NewsSection;