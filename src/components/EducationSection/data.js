// src/components/EducationSection/data.js

export const tabsConfig = [
  { id: 'panduan', label: 'Panduan Holistik', icon: 'fas fa-book-open', color: 'blue' },
  { id: 'video', label: 'Video Integratif', icon: 'fas fa-play-circle', color: 'red' },
  { id: 'tools', label: 'Tools & Assessment', icon: 'fas fa-clipboard-check', color: 'emerald' },
  { id: 'kasus', label: 'Studi Kasus', icon: 'fas fa-lightbulb', color: 'amber' },
  { id: 'digital', label: 'Digital Resources', icon: 'fas fa-mobile-alt', color: 'purple' }
];

export const panduanData = [
   {
    id: 1,
    title: 'Belajar dan Bermain Berbasis Buku - Buku Guru PAUD',
    category: 'Buku Guru PAUD',
    description: 'Panduan resmi Kemdikbud untuk pembelajaran dan bermain berbasis buku di PAUD dengan pendekatan holistik integratif.',
    author: 'Kementerian Pendidikan dan Kebudayaan',
    ageGroup: '4-6',
    aspect: 'kognitif',
    pages: 156,
    downloads: 25420,
    rating: 4.9,
    publishDate: '2021',
    tags: ['Buku Guru', 'PAUD', 'Bermain', 'Belajar', 'Kemdikbud'],
    stakeholder: 'Guru & Pendidik PAUD',
    thumbnail: 'https://asset-2.tstatic.net/priangan/foto/bank/images/Link-Download-PDF-Buku-Siswa-Kurikulum-Merdeka-PAUDTK-Untuk-Mapel-Belajar-dan-Bermain-Berbasis-Buku.jpg',
    preview: 'Buku panduan resmi Kemdikbud yang mengintegrasikan pembelajaran dan bermain berbasis buku untuk anak usia dini dengan pendekatan holistik integratif.',
    learningPath: 'Konsep Dasar → Implementasi → Evaluasi',
    objectives: ['Memahami pembelajaran berbasis buku', 'Mengintegrasikan bermain dan belajar', 'Menerapkan pendekatan holistik'],
    pdfUrl: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Belajar_dan_Bermain_Berbasis_Buku_BG_Paud.pdf'
  },
{
  id: 2,
  title: 'Pembelajaran Fase Fondasi (PAUD)',
  category: 'Kurikulum Merdeka',
  description: 'Panduan implementasi Kurikulum Merdeka untuk fase fondasi PAUD, berisi pendekatan holistik pada anak usia dini.',
  author: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  ageGroup: '4-6',
  aspect: 'multi-aspek',
  pages: 218,
  downloads: 13250,
  rating: 4.8,
  publishDate: '20 Juli 2023',
  tags: ['Kurikulum Merdeka', 'PAUD', 'Fondasi', 'Holistik', 'Fase Fondasi'],
  stakeholder: 'Guru, Orang Tua, Pemerhati Anak',
  thumbnail: 'https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Pembelajaran_Fase_Fondasi_BG_Paud_Cover.png',
  preview: 'Buku panduan utama untuk guru dan tenaga pendidik dalam menyusun pembelajaran berbasis permainan dan keseharian anak pada fase fondasi (PAUD).',
  learningPath: 'Pendekatan Bermain → Lingkungan Bermakna → Refleksi Pembelajaran',
  objectives: [
    'Mewujudkan pembelajaran bermakna bagi anak usia dini',
    'Mengembangkan nilai-nilai Pancasila dalam aktivitas bermain',
    'Mendorong peran aktif guru dan orang tua dalam pendidikan PAUD'
  ],
  pdfUrl: 'https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/Pembelajaran_Fase_Fondasi_BG_Paud.pdf'
},
 {
  id: 3,
  title: 'Peran Ayah dalam Pengasuhan Anak',
  category: 'Sosial Emosional',
  description: 'Panduan praktis dan inspiratif bagi para ayah dalam menjalankan peran pengasuhan yang setara, suportif, dan penuh kasih sayang.',
  author: 'Kementerian Pemberdayaan Perempuan dan Perlindungan Anak',
  ageGroup: '0-6',
  aspect: 'sosial-emosional',
  pages: 92,
  downloads: 18900,
  rating: 4.9,
  publishDate: 'November 2022',
  tags: ['Ayah', 'Pengasuhan', 'Keluarga', 'Sosial Emosional'],
  stakeholder: 'Ayah, Ibu, Keluarga, Pemerhati Anak',
  thumbnail: 'https://online.fliphtml5.com/acxin/ympr/files/large/1.webp?1629791227&1629791227',
  preview: 'Buku ini menekankan pentingnya keterlibatan ayah dalam pengasuhan anak untuk menciptakan tumbuh kembang yang sehat secara emosional dan sosial.',
  learningPath: 'Kesadaran Peran → Komunikasi Positif → Kolaborasi Keluarga',
  objectives: [
    'Meningkatkan peran aktif ayah dalam pengasuhan',
    'Membangun ikatan emosional yang kuat antara ayah dan anak',
    'Mendukung tumbuh kembang anak secara seimbang dan kolaboratif'
  ],
  pdfUrl: 'https://www.orangtuahebat.id/wp-content/uploads/2022/11/Buku-Peran-Ayah-Dalam-Pengasuhan.pdf'
}

];

export const videoData = [
  {
    id: 1,
    title: 'Stimulasi Holistik untuk Bayi 0-12 Bulan',
    description: 'Tutorial komprehensif stimulasi yang mengintegrasikan aspek fisik, kognitif, dan sosial-emosional untuk bayi.',
    youtubeId: 'bTLveH2uBpU',
    duration: '25:32',
    views: 125000,
    likes: 3200,
    publishDate: '10 Juni 2025',
    channel: 'PAUD Holistik Indonesia',
    category: 'Tutorial Integratif',
    ageGroup: '0-2',
    aspect: 'fisik',
    tags: ['Bayi', 'Stimulasi', 'Holistik', 'Tumbuh Kembang'],
    stakeholder: 'Orang Tua & Bidan',
    expert: '',
    learningObjectives: ['Stimulasi motorik terintegrasi', 'Bonding yang sehat', 'Deteksi dini keterlambatan']
  },
  {
    id: 2,
    title: 'Rencana Aksi Nasional (RAN) PAUD HI',
    description: 'RAN PAUD HI ini merupakan pedoman koordinasi, sinergi dan gotong royong seluruh pemangku kepentingan terkait anak usia dini di tingkat nasional',
    youtubeId: 'BGAgX2KGXdY',
    duration: '06:09',
    views: 89000,
    likes: 2800,
    publishDate: '8 Juni 2025',
    channel: 'Deputi KPKAPP Kemenko PMK',
    category: 'Pembelajaran Holistik',
    ageGroup: '2-4',
    aspect: 'kognitif',
    tags: ['Bahasa', 'Bermain', 'Sosial', 'Kreativitas'],
    stakeholder: 'Guru & Orang Tua',
    expert: '',
    learningObjectives: ['Keterampilan bahasa aktif', 'Interaksi sosial positif', 'Kreativitas dalam komunikasi']
  },
  {
    id: 3,
    title: 'Kegiatan Pembelajaran Kurikulum Merdeka : Kreatif',
    description: 'Kurikulum Merdeka adalah kurikulum yang memberikan keleluasaan kepada pendidik untuk mengembangkan pembelajaran yang sesuai dengan karakteristik peserta didik',
    youtubeId: 'EGebfVndnTQ',
    duration: '04:33',
    views: 89000,
    likes: 2800,
    publishDate: '8 Juni 2025',
    channel: 'Deputi KPKAPP Kemenko PMK',
    category: 'Pembelajaran Holistik',
    ageGroup: '2-4',
    aspect: 'kognitif',
    tags: ['Bahasa', 'Bermain', 'Sosial', 'Kreativitas'],
    stakeholder: 'Guru & Orang Tua',
    expert: '',
    learningObjectives: ['Keterampilan bahasa aktif', 'Interaksi sosial positif', 'Kreativitas dalam komunikasi']
  }
];

export const toolsData = [
  {
  id: 5,
  title: 'Isi Tangki Emosi Orang Tua',
  description: 'Tips praktis untuk menjaga kesehatan mental orang tua agar bisa mendidik anak dengan bahagia.',
  category: 'Parenting & Emotional Wellness',
  ageGroup: 'Orang Tua Anak Usia Dini',
  aspect: 'emosional',
  downloads: 17500,
  rating: 4.9,
  publishDate: '10 Juni 2025',
  tags: ['Emosi', 'Orang Tua', 'Kesehatan Mental', 'Self-care', 'Parenting'],
  stakeholder: 'Orang Tua & Pendidik',
  author: 'Tim PAUD HI',
  thumbnail: 'https://soa-edu.com/wp-content/uploads/2-cara-membangun-keluarga-yang-kuat-dan-bahagia-1000x500.jpg', // contoh thumbnail ilustratif
  features: [
    'Isi tangki emosi dulu: waktu untuk diri sendiri',
    'Kenali emosi, jangan dipendam',
    'Boleh curhat dan minta tolong',
    'Ambil jeda saat emosi tinggi',
    'Cukup, bukan sempurna',
    'Checklist emosi harian',
    'Call to action: Bagikan & Diskusi'
  ],
  format: 'Parenting',
  usage: 'Edukasi keluarga & pelatihan parenting',
  extra: {
    headline: 'Orang Tua Juga Butuh Dirawat: Yuk, Isi Tangki Emosi Dulu Sebelum Mendidik Anak',
    subheadline: 'Karena anak yang bahagia berasal dari orang tua yang cukup bahagia.',
    checklist: [
      '✅ Saya tidur cukup',
      '✅ Saya makan teratur',
      '✅ Saya bicara pada orang soal perasaan saya',
      '✅ Saya tidak menyalahkan diri sendiri hari ini',
      '✅ Saya sudah tersenyum pada diri sendiri'
    ],
    callToActionText: 'Yuk bagikan tips ini ke sesama orang tua! Karena merawat diri sendiri bukan kemewahan, tapi kebutuhan.',
    buttons: ['📤 Bagikan ke WhatsApp', '💬 Diskusi di Forum PAUD HI'],
    citation: 'Phua et al. (2023). Differential effects of prenatal psychological distress and positive mental health on offspring socioemotional development.'
  }
},
  {
    id: 1,
    title: 'Checklist Perkembangan Holistik 0-6 Tahun',
    description: 'Tool asesmen komprehensif untuk memantau perkembangan anak di semua aspek.',
    category: 'Assessment Tool',
    ageGroup: 'all',
    aspect: 'kognitif',
    downloads: 45600,
    rating: 4.9,
    publishDate: '15 Juni 2025',
    tags: ['Checklist', 'Milestone', 'Holistik', 'Monitoring'],
    stakeholder: 'Guru & Orang Tua',
    author: 'Tim Ahli PAUD HI',
    thumbnail: 'https://sumateraekspres.bacakoran.co/upload/a01b92df3c7ba3b187a6d4debc468cc3.jpg',
    features: ['Milestone per aspek', 'Grafik perkembangan', 'Rekomendasi stimulasi', 'Alert system'],
    format: 'PDF Interaktif + Excel',
    usage: 'Evaluasi bulanan perkembangan anak'
  },
  {
    id: 2,
    title: 'Kuesioner Kesiapan Sekolah Holistik',
    description: 'Instrumen untuk mengukur kesiapan anak masuk sekolah dari berbagai aspek.',
    category: 'Readiness Assessment',
    ageGroup: '4-6',
    aspect: 'kognitif',
    downloads: 32100,
    rating: 4.8,
    publishDate: '12 Juni 2025',
    tags: ['Kesiapan Sekolah', 'Asesmen', 'Multi-aspek', 'Prediktif'],
    stakeholder: 'Guru & Psikolog',
    author: 'Dr. Sari Wijayanti, M.Psi',
    thumbnail: 'https://images.squarespace-cdn.com/content/v1/627dcf6879247b260c0d0910/1692177184785-JDY204HY9N7LDB5H229Z/IMG_20230724_090049-min.jpg',
    features: ['6 domain perkembangan', 'Scoring otomatis', 'Profil kekuatan', 'Rencana intervensi'],
    format: 'Online Form + Report',
    usage: 'Persiapan masuk SD/MI'
  },
  {
    id: 3,
    title: 'Asesmen Keterampilan Sosial Emosional',
    description: 'Tool khusus untuk mengukur perkembangan sosial emosional anak.',
    category: 'Social-Emotional Assessment',
    ageGroup: '2-4',
    aspect: 'sosial',
    downloads: 26500,
    rating: 4.8,
    publishDate: '8 Juni 2025',
    tags: ['Sosial', 'Emosional', 'Keterampilan', 'Interaksi'],
    stakeholder: 'Konselor & Guru',
    author: 'Dr. Lina Marlina, M.Psi',
    thumbnail: 'https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2020/08/daycare-1-1024x512-1-768x384.jpg',
    features: ['Skala emosi', 'Peer interaction', 'Self-regulation', 'Empathy meter'],
    format: 'Digital Assessment',
    usage: 'Evaluasi triwulan'
  },
 
];