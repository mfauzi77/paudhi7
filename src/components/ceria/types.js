import React from 'react';

export const View = {
    LandingPage: "Landing Page",
    Dashboard: "Dashboard",
    Forecasting: "Forecasting & Prediction",
    DataPerWilayah: "Data per Wilayah",
    EWSPerBidang: "Analisis per Bidang",
    SmartRecommendations: "Rekomendasi CERIA",
    DataProcessing: "Manajemen Integrasi",
    InputData: "Input Data",
    Intervensi: "Manajemen Intervensi", // Updated Label
    ResourceAllocation: "Resource Allocation",
    Reports: "Reports & Analytics",
    ParentDashboard: "Dashboard Orang Tua",
    Data: "Data",
    Login: "Login",
    AdminDashboard: "Admin Dashboard",
    Import_Kemenkes_Imunisasi: "Import - Kemenkes: Imunisasi",
    Import_Kemenkes_Gizi: "Import - Kemenkes: Gizi",
    Import_Kemenkes_KIA: "Import - Kemenkes: KIA",
    Import_Kemenkes_Penyakit: "Import - Kemenkes: Penyakit",
    Import_Dapodik_APM_APK: "Import - Dapodik: APM & APK",
    Import_Dapodik_SatuanPAUD: "Import - Dapodik: Satuan PAUD",
    Import_Dapodik_KualitasGuru: "Import - Dapodik: Kualitas Guru",
    Import_Dukcapil_IdentitasAnak: "Import - Dukcapil: Identitas Anak",
    Import_KemenPPPA_Kekerasan: "Import - KemenPPPA: Kasus Kekerasan",
    Import_KemenPPPA_PerkawinanAnak: "Import - KemenPPPA: Perkawinan Anak",
    Import_BPS_SosialEkonomi: "Import - BPS: Sosial-Ekonomi",
    Import_BPS_PerkawinanAnak: "Import - BPS: Perkawinan Anak",
    Import_Kemensos_Bansos: "Import - Kemensos: Bansos",
    Import_PUPR_Infrastruktur: "Import - PUPR/BPS: Infrastruktur Dasar",
    Import_BNPB_RisikoBencana: "Import - BNPB: Risiko Bencana",
    Import_BMKG_KualitasLingkungan: "Import - BMKG: Kualitas Lingkungan"
};

export const RiskCategory = {
    Complete: "Imunisasi Lengkap (>90%)",
    Medium: "Cakupan Sedang (70-90%)",
    Low: "Cakupan Rendah (50-70%)",
    Critical: "Critical (<50%)"
};

export const AlertLevel = {
    High: "HIGH",
    Medium: "MEDIUM",
    Low: "LOW",
    Critical: "CRITICAL"
};

export const InterventionStatus = {
    Planning: "Perencanaan",
    Active: "Aktif",
    Completed: "Selesai",
    OnHold: "Ditunda"
};

export const InterventionPriority = {
    High: "Tinggi",
    Medium: "Sedang",
    Low: "Rendah"
};

// Action Item type
export const ActionItem = {
    id: String,
    text: String,
    completed: Boolean,
    dueDate: String // YYYY-MM-DD
};

// Intervention Plan type
export const InterventionPlan = {
    id: String,
    title: String,
    description: String,
    region: String,
    domain: String,
    status: String,
    priority: String,
    startDate: String,
    endDate: String,
    budget: Number,
    kpi: String,
    actionItems: Array,
    relatedAlertId: String
};

// Active Alert Data type
export const ActiveAlertData = {
    id: String,
    level: String,
    title: String,
    region: String,
    domain: String,
    riskScore: Number,
    target: Number,
    trend: Number
};

// Domain type
export const Domain = {
    Kesehatan: "Kesehatan",
    Gizi: "Gizi",
    Pendidikan: "Pendidikan",
    Pengasuhan: "Pengasuhan",
    Perlindungan: "Perlindungan",
    Kesejahteraan: "Kesejahteraan",
    Lingkungan: "Lingkungan"
};

// Domain Filter type
export const DomainFilter = {
    Semua: "Semua",
    Kesehatan: "Kesehatan",
    Gizi: "Gizi",
    Pendidikan: "Pendidikan",
    Pengasuhan: "Pengasuhan",
    Perlindungan: "Perlindungan",
    Kesejahteraan: "Kesejahteraan",
    Lingkungan: "Lingkungan"
};

// Key Indicator Data type
export const KeyIndicatorData = {
    value: String,
    label: String,
    change: Number,
    changeType: String, // 'increase' | 'decrease' | 'stable'
    domain: String
};

// Regional Risk Score type
export const RegionalRiskScore = {
    name: String,
    score: Number
};

// Forecast Data Point type
export const ForecastDataPoint = {
    month: String,
    actual: Number,
    predicted: Number,
    predicted_lower: Number,
    predicted_upper: Number
};

// Regional Forecast Data type
export const RegionalForecastData = {
    id: String,
    region: String,
    domain: String,
    currentRisk: Number,
    predictedRisk: Number,
    change: Number,
    currentRiskLevel: String,
    predictedRiskLevel: String
};

// Sort Key type
export const SortKey = {
    region: "region",
    domain: "domain", 
    currentRisk: "currentRisk",
    predictedRisk: "predictedRisk",
    change: "change"
};

// Sort Direction type
export const SortDirection = {
    ascending: "ascending",
    descending: "descending"
};

// Export all types as objects for JavaScript compatibility
export default {
    View,
    RiskCategory,
    AlertLevel,
    InterventionStatus,
    InterventionPriority,
    ActionItem,
    InterventionPlan,
    ActiveAlertData,
    Domain,
    DomainFilter,
    KeyIndicatorData,
    RegionalRiskScore,
    ForecastDataPoint,
    RegionalForecastData,
    SortKey,
    SortDirection
};
