import React, { useState, useEffect } from 'react';
import berita0 from '../images/berita/berita0.jpg';

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

<p>Selama tiga hari, rangkaian kegiatan mencakup pertemuan dengan P2TPAKK “Rekso Dyah Utami”, UPTD PPA Sleman dan Bantul, Satgas PPKS UGM, ISI, dan UPN, serta kunjungan ke Polres Sleman dan Pesantren Ora Aji. Kegiatan ditutup dengan evaluasi internal dan penyusunan rekomendasi kebijakan untuk penguatan sistem perlindungan anak.</p>

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
    <p>Deputi Woro menyambut baik peluncuran ECDI2030 oleh Bappenas yang turut disusun bersama Kemendikbudristek, BKKBN, BPS, UNICEF, dan Tanoto Foundation, dan menegaskan bahwa PAUD HI adalah landasan utama membangun SDM berkualitas sejak usia dini. “Kita harus memastikan seluruh anak Indonesia mendapatkan hak tumbuh kembang optimal sejak dalam kandungan hingga usia 6 tahun,” tegasnya.</p>

    <h4>87,7% Anak Berkembang Sesuai Tahapan</h4>
    <p>Menurut hasil pengukuran ECDI 2024, sebanyak <strong>87,7% anak usia 24–59 bulan</strong> telah berkembang sesuai tahapan sensorik, kognitif, bahasa, dan kesejahteraan. Namun, Deputi Woro mengingatkan bahwa tantangan pemerataan layanan PAUD HI di daerah masih tinggi.</p>

    <h4>Perkuat Kolaborasi Menuju 2045</h4>
    <p>Deputi Woro mengajak seluruh pemangku kepentingan untuk memperkuat komitmen dan koordinasi. “Mari kita satukan langkah, perkuat sinergi, dan bangun pondasi kokoh bagi generasi masa depan,” ujarnya dalam pernyataan resmi. ECDI 2030 diharapkan menjadi alat kebijakan berbasis data yang mendorong penguatan PAUD HI menuju <strong>Indonesia Emas 2045</strong>.</p>
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
      id: 3,
      title: 'Kemenko PMK Terima Audiensi PATTIRO Terkait Program PAUD HI',
      excerpt: 'Asisten Deputi Bidang Pendidikan Anak Usia Dini, Dasar dan Menengah Jazziray Hartoyo menerima audiensi dari PATTIRO terkait kebijakan dan implementasi program PAUD HI. Penekanan pada koordinasi lintas sektor dan kolaborasi pentahelix menjadi kunci utama.',
      author: 'Kemenko PMK',
      date: '4 September 2023',
      readTime: '4 menit',
      icon: 'fas fa-handshake',
      tags: ['PATTIRO', 'Kolaborasi', 'Pentahelix', 'Koordinasi'],
      image: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2023-09/IMG-20230905-WA0034.jpg',
      fullContent: `
        <h3>Satu Koridor Kebijakan PAUD HI</h3>
        <p>Jazziray menyampaikan, Kemenko PMK selaku koordinator program menghimbau agar seluruh kebijakan terkait PAUD HI dapat berjalan melalui satu koridor sehingga arah dan tujuan yang dicapai sama. "Kebijakan terkait PAUD HI, baik itu dari sisi pendidikan, kesehatan, pertumbuhan anak usia dini secara menyeluruh harus dipastikan berjalan dalam satu koridor dibawah koordinasi kami, sehingga arah dan tujuannya sama," ujar Jazziray.</p>
        
        <h4>Capaian Implementasi di Daerah</h4>
        <p>Kemenko PMK terus melakukan koordinasi, sinkronisasi, dan pengendalian (KSP), baik secara luring maupun daring terhadap 12 provinsi dan 78 kabupaten/kota yang mendapatkan bantuan pendampingan penyusunan regulasi dari Kemendikbudristek tahun 2022-2023. Hingga 1 September 2023, terdapat 216 Kab/Kota memiliki Perbub/Perwal PAUD HI, 145 Kab/Kota memiliki Gugus Tugas PAUD HI dan 90 Kab/Kota memiliki Rencana Aksi Daerah (RAD).</p>
        
        <h4>Kolaborasi Pentahelix</h4>
        <p>Jazziray memaparkan perkembangan implementasi kebijakan program PAUD HI melibatkan pentahelix yang tentunya mengutamakan kolaborasi yang melibatkan Kementerian dan Lembaga termasuk Pemda, masyarakat termasuk lembaga swadaya masyarakat, kalangan akademisi, pelaku usaha dan juga tentunya media. "Kata kuncinya adalah kolaborasi" ujar Jazziray.</p>
        
        <h4>Dukungan Peta Jalan Pengasuhan</h4>
        <p>Jazziray menyambut baik rencana Pattiro yang akan membantu peta jalan pengasuhan dalam kebijakan PAUD HI. "Dari 3 bidang, Pendidikan, kesehatan, Penenuhan hak anak tumbuh kembang, bidang pengasuhan anak masih membutuhkan banyak intervensi" pungkasnya.</p>
      `,
      images: [
        {
          src: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2023-09/IMG-20230905-WA0034.jpg',
          caption: 'Audiensi PATTIRO dengan Kemenko PMK di Ruang Rapat Lt. 13 Kemenko PMK',
        },
      ],
    },
    {
      id: 4,
      title: 'Pentingnya Implementasi PAUD HI Untuk Tingkatkan Kualitas SDM Indonesia',
      excerpt: 'Deputi Kemenko PMK menyampaikan bahwa PAUD HI dilakukan secara holistik integratif untuk memastikan semua kebutuhan esensial anak diberikan secara terintegrasi. Rentannya periode usia dini membuat anak harus terpenuhi kebutuhan esensialnya secara holistik.',
      author: 'Kemenko PMK',
      date: '28 Agustus 2024',
      readTime: '7 menit',
      icon: 'fas fa-graduation-cap',
      tags: ['Kualitas SDM', 'Indonesia Emas 2045', 'Investasi Strategis', 'Holistik'],
      image: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2024-08/IMG-20240828-WA0021.jpg',
      fullContent: `
        <h3>Strategi Peningkatan Kualitas SDM</h3>
        <p>Deputi Bidang Koordinasi Peningkatan Kualitas Anak, Perempuan, dan Pemuda Kemenko PMK Woro Srihastuti menyampaikan, PAUD HI merupakan upaya yang dilakukan untuk meningkatkan kualitas Sumber Daya Manusia (SDM) Indonesia. PAUD HI tidak dilakukan dengan berfokus pada satu aspek dalam tumbuh kembang anak, tetapi dilakukan secara holistik integratif supaya anak dapat tumbuh kembang secara optimal.</p>
        
        <h4>Konsepsi PAUD HI yang Komprehensif</h4>
        <p>Pengembangan anak usia dini dilakukan dengan memberikan layanan untuk memenuhi kebutuhan esensial anak usia dini yang meliputi kesehatan dan gizi, stimulasi persiapan pendidikan dini, pembinaan moral emosional, pengasuhan termasuk perlindungan bagi anak-anak supaya bisa tumbuh kembang secara optimal. "Jadi ini konsepsi dari PAUD HI. Kita tidak melihat bagaimana penyediaan layanan anak secara parsial," ujarnya.</p>
        
        <h4>Persiapan dari Hulu hingga Hilir</h4>
        <p>"Jadi artinya kita juga harus memastikan penguatan bimbingan perkawinan bagi calon pengantin agar mereka siap secara fisik dan emosional untuk memiliki anak termasuk kesiapan dalam pengasuhannya. Selain itu, perlu dipastikan layanan untuk anak kita di setiap tahapan kehidupan mulai dari janin dalam kandungan sampai usia 6 tahun itu benar-benar terpenuhi," ungkapnya.</p>
        
        <h4>Tiga Kajian Strategis</h4>
        <p>Kemenko PMK bersama dengan Tanoto Foundation telah membuat 3 kajian berkaitan dengan PAUD HI: Penyelarasan Indikator Global Perawatan dan Pengasuhan Anak Usia Dini dan Indikator PAUD HI, Pembangunan Sumber Daya Manusia pada 1000 HPK hingga Usia 3 Tahun: Strategi Pengasuhan dan Stimulasi Dini, serta Catatan Kritis Kebijakan dan Implementasi Program PAUD HI.</p>
        
        <h4>Tantangan Implementasi</h4>
        <p>Masih ditemui adanya tantangan implementasi PAUD HI mulai dari sinergi kebijakan, pelaksanaan, termasuk penyediaan fasilitas dan standarisasi. Kajian ini diharapkan dapat menjadi masukan dalam menyiapkan RAN PAUD HI 2025-2029 dan menguatkan kedudukan PAUD HI dalam RPJMN 2025-2029.</p>
      `,
      images: [
        {
          src: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2024-08/IMG-20240828-WA0021.jpg',
          caption: 'Seminar Nasional Strategi Investasi PAUD HI Menuju Visi Indonesia Emas 2045 di Kantor Kemenko PMK',
        },
      ],
    },
    {
      id: 5,
      title: 'Kemenko PMK Dorong Penguatan PAUD HI melalui Simposium Internasional ECED 2024',
      excerpt: 'Menteri PPPA menekankan bahwa periode 2025-2029 akan menjadi tonggak penting dalam implementasi RAN PAUD HI. PAUD HI merupakan strategi untuk memutus rantai kemiskinan dan menciptakan generasi masa depan yang unggul dengan kolaborasi lintas sektor.',
      author: 'Kemenko PMK',
      date: '20 November 2024',
      readTime: '8 menit',
      icon: 'fas fa-globe',
      tags: ['Simposium Internasional', 'ECED 2024', 'Kolaborasi', 'Era Digital'],
      image: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2024-11/WhatsApp%20Image%202024-11-22%20at%2015.25.18.jpeg',
      fullContent: `
        <h3>Tonggak Penting Implementasi RAN PAUD HI</h3>
        <p>Menteri Pemberdayaan Perempuan dan Perlindungan Anak, Arifah Fauzi, yang hadir mewakili Menko PMK menekankan bahwa periode 2025-2029 akan menjadi tonggak penting dalam implementasi Rencana Aksi Nasional (RAN) PAUD HI. PAUD HI merupakan strategi untuk memutus rantai kemiskinan dan menciptakan generasi masa depan yang unggul.</p>
        
        <h4>Tantangan Era Digital dan Perubahan Iklim</h4>
        <p>Deputi Bidang Koordinasi Peningkatan Kualitas Anak, Perempuan, dan Pemuda, Woro Srihastuti Sulistyaningrum, menegaskan perlunya memperkuat konsep PAUD HI dengan mempertimbangkan isu-isu terkini seperti perubahan iklim dan dampak teknologi, termasuk penggunaan gadget pada anak. "Tidak hanya melihat dari lima komponen nurturing care framework, tetapi juga bagaimana kita menyikapi tantangan seperti climate change dan dampak teknologi terhadap anak di era digital ini," jelas Deputi Lisa.</p>
        
        <h4>Rebranding PAUD HI</h4>
        <p>Deputi Lisa menekankan perlunya rebranding PAUD HI untuk membedakan dengan konsep PAUD (Pendidikan Anak Usia Dini) agar perbedaan konsep ini lebih dipahami hingga ke daerah. Pendekatan siklus hidup perlu menjadi acuan dalam menyiapkan konsep PAUD HI yang baru, sehingga dapat menyesuaikan kebutuhan esensial anak sesuai tahapan kehidupan anak usia dini.</p>
        
        <h4>Investasi Strategis untuk Masa Depan</h4>
        <p>Country Head Tanoto Foundation Indonesia, Inge Kusuma, menyampaikan pentingnya peran komunitas dalam mendukung tumbuh kembang anak. "It takes a village to raise a child," yang menggambarkan betapa besar kontribusi kolektif masyarakat dalam membangun ekosistem yang mendukung perkembangan anak. "Investasi pada anak usia dini sangat penting karena menjadi kunci masa depan yang tangguh dan maju dan investasi strategis untuk Indonesia yang lebih baik," ungkapnya.</p>
        
        <h4>Memutus Rantai Kemiskinan</h4>
        <p>Nina Sardjunani selaku ECED Council menegaskan bahwa investasi PAUD HI tidak hanya berkaitan dengan pembangunan manusia, tetapi juga menjadi kunci untuk memutus rantai kemiskinan. "Yang ingin kita tingkatkan adalah capability atau potensi dari manusia kecil itu sejak dalam kandungan hingga usia delapan tahun. ECED menjadi faktor utama memastikan pertumbuhan ekonomi dapat berjalan baik," ungkap Nina.</p>
      `,
      images: [
        {
          src: 'https://www.kemenkopmk.go.id/sites/default/files/articles/2024-11/WhatsApp%20Image%202024-11-22%20at%2015.25.18.jpeg',
          caption: 'International Symposium on Early Childhood Education and Development (ECED) di Thamrin Nine Ballroom, Jakarta',
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

“Melalui kerja sama yang solid dan rencana kerja yang terarah, kita bisa memastikan program-program yang dijalankan memberikan dampak nyata bagi kesejahteraan anak-anak dan keluarga di seluruh Indonesia,” ujar Deputi Lisa.

Sebagai Ketua Gugus Tugas PAUD Holistik Integratif (PAUD HI), Kemenko PMK telah mendapat dukungan dari Program Kerja Sama RI-UNICEF, termasuk dalam pelaksanaan monitoring dan evaluasi di sejumlah wilayah. Deputi Lisa mengungkapkan bahwa monitoring tersebut menemukan sejumlah tantangan di lapangan, termasuk miskonsepsi terkait implementasi PAUD HI.

“Selama ini PAUD HI sering dianggap hanya mencakup Pendidikan Anak Usia Dini (PAUD), padahal pendekatan ini mengusung konsep Nurturing Care Framework yang meliputi kesehatan dan gizi, pendidikan dini, pengasuhan, perlindungan, dan kesejahteraan anak usia dini. Akibatnya, program PAUD HI kerap terfokus pada pendidikan anak usia 5–6 tahun, yang menjadi tanggung jawab Kemendikbudristek, sementara layanan untuk anak usia 0–3 tahun masih minim,” jelas Deputi Lisa.</p
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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50" id="berita">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i className="fas fa-newspaper"></i>
            <span>Berita Terkini</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Berita & Informasi <span className="text-blue-600">PAUD HI</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Update terbaru seputar program Pengembangan Anak Usia Dini Holistik Integratif dari Kemenko PMK
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Cari artikel berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => openPopup(article)}
              className="group cursor-pointer bg-white shadow-lg hover:shadow-xl border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Article Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <i className={`${article.icon} text-blue-600`}></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-3 text-xs text-white mb-2">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-calendar"></i>
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-clock"></i>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition leading-tight">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{article.tags.length - 2}</span>
                    )}
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-user-circle"></i>
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Artikel tidak ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian</p>
          </div>
        )}
      </div>

      {/* Enhanced Popup Modal */}
      {isPopupOpen && selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-2xl shadow-2xl max-w-5xl w-full h-[95vh] flex flex-col transform transition-all duration-300 ${
              isPopupVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5'
            }`}
          >
            {/* Enhanced Header - Fixed */}
            <div className="relative p-6 md:p-8 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white flex-shrink-0">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 text-sm opacity-90 mb-3">
                      <span className="flex items-center gap-1">
                        <i className="fas fa-user"></i>
                        {selectedNews.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-calendar"></i>
                        {selectedNews.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-clock"></i>
                        {selectedNews.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight pr-4">
                      {selectedNews.title}
                    </h2>
                  </div>
                  <button 
                    onClick={closePopup} 
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition flex-shrink-0"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Featured Image */}
                <div className="relative group">
                  <img
                    src={selectedNews.images[0].src}
                    alt={selectedNews.images[0].caption}
                    className="rounded-2xl object-cover w-full h-48 md:h-64 lg:h-80 shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-4 md:p-6 rounded-b-2xl">
                    <p className="text-sm font-medium">{selectedNews.images[0].caption}</p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedNews.fullContent }}
                  ></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600 mr-2">Tags:</span>
                  {selectedNews.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
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
            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <div className="flex flex-col gap-4">
                {/* Social Share */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 mr-2 flex items-center whitespace-nowrap">
                    <i className="fas fa-share-alt mr-1"></i>Bagikan:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareToSocial('whatsapp')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                    >
                      <i className="fab fa-whatsapp" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('facebook')}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                    >
                      <i className="fab fa-facebook-f" />
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                    <button
                      onClick={() => shareToSocial('twitter')}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                    >
                      <i className="fab fa-twitter" />
                      <span className="hidden sm:inline">Twitter</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => saveArticle(selectedNews)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-bookmark" />
                    <span>Simpan Artikel</span>
                  </button>
                  <button
                    onClick={closePopup}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
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
    </section>
  );
};

export default NewsSection;