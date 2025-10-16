import { RiskCategory, AlertLevel, InterventionStatus, InterventionPriority } from '../types';

// Mock data untuk testing
export const mockInterventionPlans = [
  {
    id: 'plan-1',
    title: 'Program Imunisasi Dasar Lengkap',
    description: 'Meningkatkan cakupan imunisasi dasar lengkap di wilayah prioritas',
    region: 'Jawa Barat',
    domain: 'Kesehatan',
    status: InterventionStatus.Active,
    priority: InterventionPriority.High,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 5000000000,
    kpi: 'Cakupan imunisasi dasar lengkap mencapai 90%',
    actionItems: [
      { id: 'action-1', text: 'Sosialisasi program ke masyarakat', completed: true, dueDate: '2024-02-01' },
      { id: 'action-2', text: 'Pelatihan tenaga kesehatan', completed: false, dueDate: '2024-03-01' },
      { id: 'action-3', text: 'Distribusi vaksin ke puskesmas', completed: false, dueDate: '2024-04-01' }
    ]
  }
];

export const regionsDetails = {
  'jawa-barat': {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    overallRisk: 65,
    population: 50000000,
    activeAlertsCount: 12,
    domains: {
      Kesehatan: { riskScore: 70, metrics: [] },
      Gizi: { riskScore: 60, metrics: [] },
      Pendidikan: { riskScore: 55, metrics: [] },
      Pengasuhan: { riskScore: 65, metrics: [] },
      Perlindungan: { riskScore: 75, metrics: [] },
      Kesejahteraan: { riskScore: 60, metrics: [] },
      Lingkungan: { riskScore: 50, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 60 },
      { month: '2024-02', score: 65 },
      { month: '2024-03', score: 70 }
    ],
    kabupatenKotaIds: ['bandung', 'bekasi', 'bogor']
  },
  'jawa-tengah': {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    overallRisk: 58,
    population: 36000000,
    activeAlertsCount: 8,
    domains: {
      Kesehatan: { riskScore: 65, metrics: [] },
      Gizi: { riskScore: 55, metrics: [] },
      Pendidikan: { riskScore: 50, metrics: [] },
      Pengasuhan: { riskScore: 60, metrics: [] },
      Perlindungan: { riskScore: 70, metrics: [] },
      Kesejahteraan: { riskScore: 55, metrics: [] },
      Lingkungan: { riskScore: 45, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 55 },
      { month: '2024-02', score: 58 },
      { month: '2024-03', score: 60 }
    ],
    kabupatenKotaIds: ['semarang', 'solo', 'magelang']
  },
  'jawa-timur': {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    overallRisk: 62,
    population: 40000000,
    activeAlertsCount: 10,
    domains: {
      Kesehatan: { riskScore: 68, metrics: [] },
      Gizi: { riskScore: 58, metrics: [] },
      Pendidikan: { riskScore: 52, metrics: [] },
      Pengasuhan: { riskScore: 62, metrics: [] },
      Perlindungan: { riskScore: 72, metrics: [] },
      Kesejahteraan: { riskScore: 58, metrics: [] },
      Lingkungan: { riskScore: 48, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 58 },
      { month: '2024-02', score: 62 },
      { month: '2024-03', score: 65 }
    ],
    kabupatenKotaIds: ['surabaya', 'malang', 'kediri']
  },
  'dki-jakarta': {
    id: 'dki-jakarta',
    name: 'DKI Jakarta',
    overallRisk: 45,
    population: 11000000,
    activeAlertsCount: 5,
    domains: {
      Kesehatan: { riskScore: 50, metrics: [] },
      Gizi: { riskScore: 40, metrics: [] },
      Pendidikan: { riskScore: 35, metrics: [] },
      Pengasuhan: { riskScore: 45, metrics: [] },
      Perlindungan: { riskScore: 55, metrics: [] },
      Kesejahteraan: { riskScore: 40, metrics: [] },
      Lingkungan: { riskScore: 60, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 42 },
      { month: '2024-02', score: 45 },
      { month: '2024-03', score: 48 }
    ],
    kabupatenKotaIds: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara']
  },
  'banten': {
    id: 'banten',
    name: 'Banten',
    overallRisk: 70,
    population: 12000000,
    activeAlertsCount: 15,
    domains: {
      Kesehatan: { riskScore: 75, metrics: [] },
      Gizi: { riskScore: 65, metrics: [] },
      Pendidikan: { riskScore: 60, metrics: [] },
      Pengasuhan: { riskScore: 70, metrics: [] },
      Perlindungan: { riskScore: 80, metrics: [] },
      Kesejahteraan: { riskScore: 65, metrics: [] },
      Lingkungan: { riskScore: 55, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 65 },
      { month: '2024-02', score: 70 },
      { month: '2024-03', score: 75 }
    ],
    kabupatenKotaIds: ['serang', 'tangerang', 'cilegon']
  },
  'aceh': {
    id: 'aceh',
    name: 'Aceh',
    overallRisk: 75,
    population: 5500000,
    activeAlertsCount: 8,
    domains: {
      Kesehatan: { riskScore: 78, metrics: [] },
      Gizi: { riskScore: 70, metrics: [] },
      Pendidikan: { riskScore: 65, metrics: [] },
      Pengasuhan: { riskScore: 75, metrics: [] },
      Perlindungan: { riskScore: 80, metrics: [] },
      Kesejahteraan: { riskScore: 72, metrics: [] },
      Lingkungan: { riskScore: 60, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 70 },
      { month: '2024-02', score: 75 },
      { month: '2024-03', score: 78 }
    ],
    kabupatenKotaIds: ['banda-aceh', 'lhokseumawe', 'langsa']
  },
  'papua': {
    id: 'papua',
    name: 'Papua',
    overallRisk: 85,
    population: 4500000,
    activeAlertsCount: 12,
    domains: {
      Kesehatan: { riskScore: 90, metrics: [] },
      Gizi: { riskScore: 85, metrics: [] },
      Pendidikan: { riskScore: 80, metrics: [] },
      Pengasuhan: { riskScore: 88, metrics: [] },
      Perlindungan: { riskScore: 82, metrics: [] },
      Kesejahteraan: { riskScore: 85, metrics: [] },
      Lingkungan: { riskScore: 75, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 80 },
      { month: '2024-02', score: 85 },
      { month: '2024-03', score: 88 }
    ],
    kabupatenKotaIds: ['jayapura', 'merauke', 'mimika']
  },
  'nusa-tenggara-timur': {
    id: 'nusa-tenggara-timur',
    name: 'Nusa Tenggara Timur',
    overallRisk: 80,
    population: 5500000,
    activeAlertsCount: 10,
    domains: {
      Kesehatan: { riskScore: 82, metrics: [] },
      Gizi: { riskScore: 85, metrics: [] },
      Pendidikan: { riskScore: 75, metrics: [] },
      Pengasuhan: { riskScore: 78, metrics: [] },
      Perlindungan: { riskScore: 80, metrics: [] },
      Kesejahteraan: { riskScore: 82, metrics: [] },
      Lingkungan: { riskScore: 70, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 75 },
      { month: '2024-02', score: 80 },
      { month: '2024-03', score: 82 }
    ],
    kabupatenKotaIds: ['kupang', 'ende', 'flores-timur']
  },
  'sulawesi-barat': {
    id: 'sulawesi-barat',
    name: 'Sulawesi Barat',
    overallRisk: 72,
    population: 1500000,
    activeAlertsCount: 6,
    domains: {
      Kesehatan: { riskScore: 75, metrics: [] },
      Gizi: { riskScore: 70, metrics: [] },
      Pendidikan: { riskScore: 68, metrics: [] },
      Pengasuhan: { riskScore: 72, metrics: [] },
      Perlindungan: { riskScore: 75, metrics: [] },
      Kesejahteraan: { riskScore: 70, metrics: [] },
      Lingkungan: { riskScore: 65, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 68 },
      { month: '2024-02', score: 72 },
      { month: '2024-03', score: 75 }
    ],
    kabupatenKotaIds: ['mamuju', 'polewali-mandar', 'majene']
  }
};

export const kabupatenKotaDetails = {
  'bandung': {
    id: 'bandung',
    name: 'Bandung',
    parentRegionId: 'jawa-barat',
    overallRisk: 60,
    population: 2500000,
    activeAlertsCount: 5,
    domains: {
      Kesehatan: { riskScore: 65, metrics: [] },
      Gizi: { riskScore: 55, metrics: [] },
      Pendidikan: { riskScore: 50, metrics: [] },
      Pengasuhan: { riskScore: 60, metrics: [] },
      Perlindungan: { riskScore: 70, metrics: [] },
      Kesejahteraan: { riskScore: 55, metrics: [] },
      Lingkungan: { riskScore: 45, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 55 },
      { month: '2024-02', score: 60 },
      { month: '2024-03', score: 65 }
    ]
  },
  'semarang': {
    id: 'semarang',
    name: 'Semarang',
    parentRegionId: 'jawa-tengah',
    overallRisk: 55,
    population: 1800000,
    activeAlertsCount: 3,
    domains: {
      Kesehatan: { riskScore: 60, metrics: [] },
      Gizi: { riskScore: 50, metrics: [] },
      Pendidikan: { riskScore: 45, metrics: [] },
      Pengasuhan: { riskScore: 55, metrics: [] },
      Perlindungan: { riskScore: 65, metrics: [] },
      Kesejahteraan: { riskScore: 50, metrics: [] },
      Lingkungan: { riskScore: 40, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 50 },
      { month: '2024-02', score: 55 },
      { month: '2024-03', score: 58 }
    ]
  },
  'surabaya': {
    id: 'surabaya',
    name: 'Surabaya',
    parentRegionId: 'jawa-timur',
    overallRisk: 58,
    population: 3000000,
    activeAlertsCount: 4,
    domains: {
      Kesehatan: { riskScore: 63, metrics: [] },
      Gizi: { riskScore: 53, metrics: [] },
      Pendidikan: { riskScore: 48, metrics: [] },
      Pengasuhan: { riskScore: 58, metrics: [] },
      Perlindungan: { riskScore: 68, metrics: [] },
      Kesejahteraan: { riskScore: 53, metrics: [] },
      Lingkungan: { riskScore: 43, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 53 },
      { month: '2024-02', score: 58 },
      { month: '2024-03', score: 60 }
    ]
  },
  'jakarta-pusat': {
    id: 'jakarta-pusat',
    name: 'Jakarta Pusat',
    parentRegionId: 'dki-jakarta',
    overallRisk: 40,
    population: 900000,
    activeAlertsCount: 2,
    domains: {
      Kesehatan: { riskScore: 45, metrics: [] },
      Gizi: { riskScore: 35, metrics: [] },
      Pendidikan: { riskScore: 30, metrics: [] },
      Pengasuhan: { riskScore: 40, metrics: [] },
      Perlindungan: { riskScore: 50, metrics: [] },
      Kesejahteraan: { riskScore: 35, metrics: [] },
      Lingkungan: { riskScore: 55, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 38 },
      { month: '2024-02', score: 40 },
      { month: '2024-03', score: 42 }
    ]
  },
  'serang': {
    id: 'serang',
    name: 'Serang',
    parentRegionId: 'banten',
    overallRisk: 72,
    population: 800000,
    activeAlertsCount: 8,
    domains: {
      Kesehatan: { riskScore: 77, metrics: [] },
      Gizi: { riskScore: 67, metrics: [] },
      Pendidikan: { riskScore: 62, metrics: [] },
      Pengasuhan: { riskScore: 72, metrics: [] },
      Perlindungan: { riskScore: 82, metrics: [] },
      Kesejahteraan: { riskScore: 67, metrics: [] },
      Lingkungan: { riskScore: 57, metrics: [] }
    },
    historicalRisk: [
      { month: '2024-01', score: 67 },
      { month: '2024-02', score: 72 },
      { month: '2024-03', score: 75 }
    ]
  }
};

export const allActiveAlerts = [
  { id: 'alert-1', level: AlertLevel.High, title: 'Cakupan Imunisasi Rendah', region: 'Papua', domain: 'Kesehatan', riskScore: 85, target: 90 },
  { id: 'alert-17', level: AlertLevel.High, title: 'Wabah DBD', region: 'Kota Surabaya', domain: 'Kesehatan', riskScore: 76, trend: 20 },
  { id: 'alert-3', level: AlertLevel.Critical, title: 'Lonjakan Stunting', region: 'Nusa Tenggara Timur', domain: 'Gizi', riskScore: 91, trend: 5 },
  { id: 'alert-4', level: AlertLevel.High, title: 'Akses PAUD Terbatas', region: 'Sulawesi Barat', domain: 'Pengasuhan', riskScore: 72 },
  { id: 'alert-5', level: AlertLevel.Medium, title: 'Kekerasan Anak', region: 'Banten', domain: 'Perlindungan', riskScore: 68, trend: 8 },
  { id: 'alert-6', level: AlertLevel.High, title: 'Sanitasi Buruk', region: 'Aceh', domain: 'Kesejahteraan', riskScore: 78 },
  { id: 'alert-7', level: AlertLevel.Critical, title: 'Gizi Buruk Akut', region: 'Kab. Asmat', domain: 'Gizi', riskScore: 95, trend: 9 },
  { id: 'alert-8', level: AlertLevel.Medium, title: 'Penurunan Partisipasi PAUD', region: 'Kalimantan Timur', domain: 'Pengasuhan', riskScore: 65, trend: -3 },
  { id: 'alert-9', level: AlertLevel.High, title: 'Angka Perkawinan Anak Tinggi', region: 'Kab. Indramayu', domain: 'Perlindungan', riskScore: 81 },
  { id: 'alert-10', level: AlertLevel.High, title: 'Angka Anemia Ibu Hamil Tinggi', region: 'Nusa Tenggara Barat', domain: 'Gizi', riskScore: 79, trend: 4 },
  { id: 'alert-11', level: AlertLevel.Critical, title: 'Kualitas Udara Buruk (Kabut Asap)', region: 'Riau', domain: 'Kesehatan', riskScore: 88, trend: 25 },
  { id: 'alert-12', level: AlertLevel.Medium, title: 'Akses Air Bersih Kritis', region: 'Kab. Gunungkidul', domain: 'Kesejahteraan', riskScore: 73 },
  { id: 'alert-13', level: AlertLevel.High, title: 'Pekerja Anak Sektor Informal', region: 'Kalimantan Barat', domain: 'Perlindungan', riskScore: 75, trend: 2 },
  { id: 'alert-14', level: AlertLevel.Medium, title: 'Kepadatan & Sanitasi Pemukiman', region: 'Kota Adm. Jakarta Timur', domain: 'Kesejahteraan', riskScore: 69 },
  { id: 'alert-15', level: AlertLevel.High, title: 'Potensi Banjir Rob', region: 'Kota Adm. Jakarta Utara', domain: 'Lingkungan', riskScore: 75, target: 0, trend: 10 },
  { id: 'alert-16', level: AlertLevel.Medium, title: 'Kekeringan Lahan Pertanian', region: 'Nusa Tenggara Timur', domain: 'Lingkungan', riskScore: 68, trend: 5 },
  { id: 'alert-18', level: AlertLevel.Critical, title: 'Risiko Gempa & Tsunami', region: 'Kota Palu', domain: 'Lingkungan', riskScore: 89, trend: 2 },
  { id: 'alert-19', level: AlertLevel.High, title: 'Tingkat Stunting Tinggi', region: 'Kab. Brebes', domain: 'Gizi', riskScore: 79, trend: 3 },
  { id: 'alert-20', level: AlertLevel.Critical, title: 'Akses Kesehatan Sangat Terbatas', region: 'Kab. Nias Utara', domain: 'Kesehatan', riskScore: 94, trend: 6 },
  { id: 'alert-21', level: AlertLevel.High, title: 'APM PAUD Rendah', region: 'Papua Pegunungan', domain: 'Pendidikan', riskScore: 82, trend: 2 },
  { id: 'alert-22', level: AlertLevel.Medium, title: 'Kekurangan Guru PAUD Berkualitas', region: 'Maluku', domain: 'Pendidikan', riskScore: 68, trend: 1 }
];

// Key indicators by domain with real PAUD data
export const keyIndicatorsByDomain = {
  'Semua': [
    { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Semua' },
    { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Semua' },
    { value: '32.1%', label: 'Angka Partisipasi Murni (APM) PAUD', change: 2.1, changeType: 'increase', domain: 'Pendidikan' },
    { value: '90.3%', label: 'Pemeriksaan Antenatal (K4)', change: 1.5, changeType: 'increase', domain: 'Semua' },
  ],
  'Kesehatan': [
    { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Kesehatan' },
    { value: '91.0%', label: 'Persalinan di Faskes', change: 0.5, changeType: 'increase', domain: 'Kesehatan' },
    { value: '12.4%', label: 'Prevalensi Diare', change: -0.8, changeType: 'decrease', domain: 'Kesehatan' },
    { value: '21/1000', label: 'Angka Kematian Bayi (AKB)', change: -0.5, changeType: 'decrease', domain: 'Kesehatan'},
    { value: '90.3%', label: 'Pemeriksaan Antenatal (K4)', change: 1.5, changeType: 'increase', domain: 'Kesehatan'},
    { value: '82.1%', label: 'Kunjungan Pasca Melahirkan', change: 2.1, changeType: 'increase', domain: 'Kesehatan'},
    { value: '89.2%', label: 'Perawatan Anak Pneumonia', change: 0.9, changeType: 'increase', domain: 'Kesehatan'},
    { value: '95.5%', label: 'Penanganan Ibu Hamil HIV+', change: 0.5, changeType: 'increase', domain: 'Kesehatan'},
  ],
  'Gizi': [
    { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Gizi' },
    { value: '88.3%', label: 'Pemberian ASI Eksklusif', change: 3.1, changeType: 'increase', domain: 'Gizi' },
    { value: '7.1%', label: 'Gizi Buruk (Wasting)', change: -0.5, changeType: 'decrease', domain: 'Gizi' },
    { value: '28.4%', label: 'Anemia pada Ibu Hamil', change: 0.3, changeType: 'increase', domain: 'Gizi'},
  ],
  'Pendidikan': [
     { value: '32.1%', label: 'Angka Partisipasi Murni (APM) PAUD', change: 2.1, changeType: 'increase', domain: 'Pendidikan' },
     { value: '33.2%', label: 'Angka Partisipasi Kasar (APK) PAUD', change: 1.8, changeType: 'increase', domain: 'Pendidikan' },
     { value: '82.0%', label: 'Kualifikasi Guru (Minimal S1)', change: 3.5, changeType: 'increase', domain: 'Pendidikan' },
     { value: '55.7%', label: 'Satuan PAUD Terakreditasi (Minimal B)', change: 4.2, changeType: 'increase', domain: 'Pendidikan'},
  ],
  'Pengasuhan': [
     { value: '85.2%', label: 'Partisipasi PAUD', change: 1.8, changeType: 'increase', domain: 'Pengasuhan' },
     { value: '75.6%', label: 'Stimulasi Dini (SDIDTK)', change: 4.2, changeType: 'increase', domain: 'Pengasuhan' },
     { value: '68.0%', label: 'Keluarga Paham Pola Asuh', change: 2.0, changeType: 'increase', domain: 'Pengasuhan' },
     { value: '45.1%', label: 'Keluarga Terapkan Batas Screen-Time', change: 5.1, changeType: 'increase', domain: 'Pengasuhan'},
  ],
  'Perlindungan': [
      { value: '92.1%', label: 'Kepemilikan Akta Lahir', change: 1.5, changeType: 'increase', domain: 'Perlindungan' },
      { value: '3.4%', label: 'Prevalensi Perkawinan Anak', change: -0.4, changeType: 'decrease', domain: 'Perlindungan' },
      { value: '8.7%', label: 'Tingkat Kekerasan pada Anak', change: 0.2, changeType: 'increase', domain: 'Perlindungan' },
      { value: '4.2%', label: 'Prevalensi Pekerja Anak', change: -0.1, changeType: 'decrease', domain: 'Perlindungan'},
  ],
  'Kesejahteraan': [
      { value: '72.3', label: 'Indeks Pembangunan Manusia (IPM)', change: 0.2, changeType: 'increase', domain: 'Kesejahteraan' },
      { value: '82.5%', label: 'Akses Air Bersih Layak', change: 2.1, changeType: 'increase', domain: 'Kesejahteraan' },
      { value: '79.8%', label: 'Akses Sanitasi Layak', change: 2.5, changeType: 'increase', domain: 'Kesejahteraan' },
      { value: '95.3%', label: 'Keluarga dengan Jaminan Sosial', change: 3.0, changeType: 'increase', domain: 'Kesejahteraan' },
  ],
  'Lingkungan': [
      { value: 'Sedang', label: 'Indeks Risiko Bencana (BNPB)', change: 0.5, changeType: 'increase', domain: 'Lingkungan' },
      { value: '82 AQI', label: 'Kualitas Udara Rata-rata (BMKG)', change: 3, changeType: 'increase', domain: 'Lingkungan' },
      { value: '4.2 M', label: 'Gempa Terkini Dirasakan (BMKG)', change: 0, changeType: 'stable', domain: 'Lingkungan' },
      { value: 'Siaga', label: 'Peringatan Dini Cuaca (BMKG)', change: 0, changeType: 'stable', domain: 'Lingkungan' },
  ]
};

// Export default untuk kompatibilitas
export default {
  mockInterventionPlans,
  regionsDetails,
  kabupatenKotaDetails,
  allActiveAlerts,
  keyIndicatorsByDomain
};
