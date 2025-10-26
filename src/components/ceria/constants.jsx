import React from 'react';
import { View } from './types';
import { DashboardIcon, UsersIcon, ChartBarIcon, MapIcon, BellAlertIcon, LightBulbIcon, CircleStackIcon, BeakerIcon, BriefcaseIcon, DocumentChartBarIcon, FlagIcon, GlobeAltIcon, ScaleIcon, CubeIcon, WrenchScrewdriverIcon, HomeIcon, SunIcon, UserCircleIcon, DocumentPlusIcon, AcademicCapIcon } from './components/icons/Icons';

export const NAVIGATION_ITEMS = [
    // { id: View.LandingPage, label: 'Landing Page', icon: <HomeIcon /> },
    { id: View.Dashboard, label: 'Analisis Utama', icon: <DashboardIcon /> },
    { id: View.Forecasting, label: 'Proyeksi & Prediksi', icon: <ChartBarIcon /> },
    { id: View.DataPerWilayah, label: 'Data per Wilayah', icon: <MapIcon /> },
    { id: View.EWSPerBidang, label: 'Analisis per Bidang', icon: <BellAlertIcon /> },
    { id: View.SmartRecommendations, label: 'Rekomendasi CERIA', icon: <LightBulbIcon /> },
    // { id: View.Intervensi, label: 'Manajemen Intervensi', icon: <BeakerIcon /> },
    // { id: View.DataProcessing, label: 'Manajemen Integrasi', icon: <WrenchScrewdriverIcon /> },
];

export const SUB_NAVIGATION_ITEMS = [
    // { id: View.ResourceAllocation, label: 'Resource Allocation', icon: <BriefcaseIcon /> },
    { id: View.Reports, label: 'Reports & Analytics', icon: <DocumentChartBarIcon /> },
];

export const PERSONAL_NAVIGATION_ITEMS = [
    // { id: View.ParentDashboard, label: 'Dashboard Orang Tua', icon: <UserCircleIcon /> },
];

export const DATA_INTEGRATION_NAV = [
    { id: View.Import_Kemenkes_Imunisasi, label: 'Kemenkes - Imunisasi', icon: <DocumentPlusIcon /> },
    { id: View.Import_Kemenkes_Gizi, label: 'Kemenkes - Gizi', icon: <DocumentPlusIcon /> },
    { id: View.Import_Kemenkes_KIA, label: 'Kemenkes - KIA', icon: <DocumentPlusIcon /> },
    { id: View.Import_Kemenkes_Penyakit, label: 'Kemenkes - Penyakit', icon: <DocumentPlusIcon /> },
    { id: View.Import_Dapodik_APM_APK, label: 'Dapodik - APM & APK', icon: <DocumentPlusIcon /> },
    { id: View.Import_Dapodik_SatuanPAUD, label: 'Dapodik - Satuan PAUD', icon: <DocumentPlusIcon /> },
    { id: View.Import_Dapodik_KualitasGuru, label: 'Dapodik - Kualitas Guru', icon: <DocumentPlusIcon /> },
    { id: View.Import_Dukcapil_IdentitasAnak, label: 'Dukcapil - Identitas Anak', icon: <DocumentPlusIcon /> },
    { id: View.Import_KemenPPPA_Kekerasan, label: 'KemenPPPA - Kekerasan Anak', icon: <DocumentPlusIcon /> },
    { id: View.Import_KemenPPPA_PerkawinanAnak, label: 'KemenPPPA - Perkawinan Anak', icon: <DocumentPlusIcon /> },
    { id: View.Import_BPS_SosialEkonomi, label: 'BPS - Sosial Ekonomi', icon: <DocumentPlusIcon /> },
    { id: View.Import_BPS_PerkawinanAnak, label: 'BPS - Perkawinan Anak', icon: <DocumentPlusIcon /> },
    { id: View.Import_Kemensos_Bansos, label: 'Kemensos - Bansos', icon: <DocumentPlusIcon /> },
    { id: View.Import_PUPR_Infrastruktur, label: 'PUPR/BPS - Infrastruktur Dasar', icon: <DocumentPlusIcon /> },
    { id: View.Import_BNPB_RisikoBencana, label: 'BNPB - Risiko Bencana', icon: <DocumentPlusIcon /> },
    { id: View.Import_BMKG_KualitasLingkungan, label: 'BMKG - Kualitas Lingkungan', icon: <DocumentPlusIcon /> },
];

export const DOMAIN_FILTER_ITEMS = [
    { id: 'Semua', name: 'Semua Domain', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { id: 'Kesehatan', name: 'Kesehatan', icon: <FlagIcon color="text-red-500" /> },
    { id: 'Gizi', name: 'Gizi', icon: <FlagIcon color="text-yellow-500" /> },
    { id: 'Pendidikan', name: 'Pendidikan', icon: <AcademicCapIcon className="w-5 h-5 text-purple-500" /> },
    { id: 'Pengasuhan', name: 'Pengasuhan', icon: <FlagIcon color="text-green-500" /> },
    { id: 'Perlindungan', name: 'Perlindungan', icon: <FlagIcon color="text-blue-500" /> },
    { id: 'Kesejahteraan', name: 'Kesejahteraan', icon: <FlagIcon color="text-indigo-500" /> },
    { id: 'Lingkungan', name: 'Lingkungan', icon: <SunIcon className="w-5 h-5 text-cyan-500" /> }
];

export const DOMAIN_ITEMS = DOMAIN_FILTER_ITEMS.filter(item => item.id !== 'Semua');

export const RESOURCE_TYPES = [
    { id: 'SDM', name: 'Sumber Daya Manusia', icon: <UsersIcon className="w-6 h-6 text-blue-500" /> },
    { id: 'Anggaran', name: 'Anggaran', icon: <ScaleIcon className="w-6 h-6 text-emerald-500" /> },
    { id: 'Material', name: 'Material & Logistik', icon: <CubeIcon className="w-6 h-6 text-amber-500" /> },
];
