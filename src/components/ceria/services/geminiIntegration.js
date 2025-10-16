// Integrasi API Gemini dari PAUD HI dengan CERIA
import { callGeminiAPI, analyzePAUDHI, getInterventionRecommendations, getPredictiveAnalysis } from '../config/geminiConfig.js';

// Fungsi untuk mendapatkan executive briefing
export const getExecutiveBriefing = async (domain, indicators, alerts) => {
  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const highAlerts = alerts.filter(a => a.level === 'HIGH');

  const context = `
    Analisis Eksekutif untuk Domain: ${domain}
    - Total Alert: ${alerts.length}
    - Alert Kritis: ${criticalAlerts.length}
    - Alert Tinggi: ${highAlerts.length}
  `;

  const data = {
    indicators: indicators,
    alerts: alerts,
    criticalAlerts: criticalAlerts,
    highAlerts: highAlerts
  };

  return await analyzePAUDHI(data, context);
};

// Fungsi untuk rekomendasi cerdas
export const getSmartRecommendations = async (alert) => {
  return await getInterventionRecommendations(alert);
};

// Fungsi untuk insight prediksi
export const getForecastingInsight = async (domain, horizon, topIncreases, topDecreases, overallTrend) => {
  const forecastData = {
    domain: domain,
    horizon: horizon,
    topIncreases: topIncreases,
    topDecreases: topDecreases,
    overallTrend: overallTrend
  };

  return await getPredictiveAnalysis(forecastData);
};

// Fungsi untuk analisis regional
export const getRegionalAnalysisInsight = async (regionData) => {
  const context = `Analisis Regional untuk ${regionData.name}`;
  return await analyzePAUDHI(regionData, context);
};

// Fungsi untuk saran alokasi sumber daya
export const generateAllocationSuggestion = async (totalBudget, resourceData, highestRiskRegions) => {
  const prompt = `
    Anda adalah penasihat ekonomi untuk pemerintah Indonesia yang mengkhususkan diri dalam optimasi sumber daya untuk program kesehatan publik, khususnya PAUD HI.
    
    Tujuan: Membuat rencana alokasi sumber daya yang optimal untuk memaksimalkan dampak dalam mengurangi stunting dan meningkatkan hasil kesehatan anak.
    
    Situasi Saat Ini:
    - Total Anggaran Tersedia: ${totalBudget.toLocaleString('id-ID')} Miliar IDR
    - Wilayah Risiko Tertinggi (Prioritas): ${highestRiskRegions.join(', ')}
    - Permintaan yang Diprediksi (Defisit):
      ${JSON.stringify(resourceData, null, 2)}
    
    Berikan rekomendasi alokasi sumber daya strategis dalam Bahasa Indonesia dengan format markdown:
    1. Judul dan ringkasan pendekatan strategis
    2. Rencana alokasi yang jelas dan dapat ditindaklanjuti
    3. Justifikasi untuk setiap alokasi
    4. Prioritas intervensi yang terbukti efektif
    5. Total anggaran yang diusulkan tidak melebihi anggaran yang tersedia
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `### Saran Alokasi Tidak Tersedia\n\nTerjadi kesalahan saat menghasilkan saran dari AI. Periksa Kunci API dan koneksi jaringan.`;
  }
};

// Fungsi untuk analisis skenario
export const generateScenarioAnalysis = async (params) => {
  const prompt = `
    Anda adalah analis kebijakan publik senior untuk pemerintah Indonesia.
    Tugas Anda adalah menganalisis dampak potensial dari skenario "bagaimana jika" terkait alokasi sumber daya untuk PAUD HI.
    
    Detail Skenario:
    - Perubahan Anggaran: ${params.budgetChange > 0 ? `Dinaikkan sebesar ${params.budgetChange}` : `Dikurangi sebesar ${Math.abs(params.budgetChange)}`}%
    - Fokus SDM: Prioritas pengerahan SDM difokuskan pada bidang **${params.sdmFocus}**
    - Fokus Regional: Alokasi diprioritaskan untuk wilayah **${params.regionFocus}**
    
    Berikan analisis skenario dalam Bahasa Indonesia dengan format markdown:
    1. Judul yang jelas merangkum skenario
    2. Ringkasan Eksekutif (1-2 kalimat) dari hasil yang paling mungkin
    3. Potensi Keuntungan (2-3 dampak positif)
    4. Potensi Risiko (2-3 dampak negatif atau trade-off)
    5. Rekomendasi Mitigasi (satu tindakan kunci untuk memaksimalkan manfaat dan meminimalkan risiko)
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `### Analisis Skenario Tidak Tersedia\n\nTerjadi kesalahan saat menghasilkan analisis skenario dari AI. Periksa Kunci API dan koneksi jaringan.`;
  }
};

// Fungsi untuk insight pengasuhan
export const getParentingInsight = async (childProfile, latestGrowth) => {
  const prompt = `
    Anda adalah ahli pengembangan anak usia dini yang ramah dan mendorong.
    Berikan tip singkat, personal, dan dapat ditindaklanjuti untuk orang tua berdasarkan data terbaru anak mereka.
    
    Profil Anak:
    - Nama: ${childProfile.name}
    - Usia: ${childProfile.age}
    - Pengukuran Terbaru: Berat ${latestGrowth?.weight || 'N/A'} kg, Tinggi ${latestGrowth?.height || 'N/A'} cm
    
    Berikan saran yang ringkas (2-3 kalimat) dalam Bahasa Indonesia dengan fokus pada nada yang positif dan mendorong.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `Halo Ayah/Bunda! Terus pantau pertumbuhan ${childProfile.name} ya. Pastikan untuk selalu memberikan makanan bergizi seimbang dan stimulasi yang sesuai usianya.`;
  }
};

// Fungsi untuk insight kinerja bulanan
export const getMonthlyPerformanceInsight = async (monthName, summary) => {
  const prompt = `
    Anda adalah analis kebijakan publik untuk PAUD-HI Indonesia.
    Ringkas kinerja nasional untuk ${monthName} berdasarkan data berikut.
    
    Data untuk ${monthName}:
    - Skor Risiko Nasional: ${summary.nationalRisk?.score?.toFixed(1) || 'N/A'}
    - Perubahan Bulanan: ${summary.nationalRisk?.change?.toFixed(1) || 'N/A'} poin
    - Wilayah dengan Perbaikan Terbaik: ${summary.topImprovingRegions?.map(r => r.name).join(', ') || 'N/A'}
    - Wilayah yang Memburuk: ${summary.topWorseningRegions?.map(r => r.name).join(', ') || 'N/A'}
    
    Berikan ringkasan eksekutif dan justifikasi dalam Bahasa Indonesia dengan format markdown:
    1. Judul: "Ringkasan Kinerja Bulan ${monthName}"
    2. Analisis Umum (ringkasan tren nasional)
    3. Wilayah Berkinerja Terbaik (penjelasan mengapa penting untuk dipelajari)
    4. Wilayah Perlu Perhatian (saran tindakan awal)
    5. Rekomendasi (langkah selanjutnya)
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    const trendText = summary.nationalRisk?.change > 0 ? 'sedikit memburuk' : 'menunjukkan perbaikan';
    return `### Gagal Memuat Analisis AI\n\nTerjadi kesalahan. Analisis manual: Kinerja nasional bulan ${monthName} ${trendText}. Perlu investigasi lebih lanjut.`;
  }
};

// Fungsi untuk insight perbandingan domain
export const getDomainComparisonInsight = async (year, comparisonData) => {
  const prompt = `
    Anda adalah analis kebijakan publik untuk PAUD-HI Indonesia.
    Berikan analisis perbandingan lintas semua domain layanan untuk tahun ${year}.
    
    Data untuk ${year}:
    ${comparisonData.stats?.map(s => `- Domain: ${s.domain}, Rata-rata Risiko: ${s.averageRisk?.toFixed(1) || 'N/A'}, Wilayah Kritis: ${s.criticalRegionsCount || 'N/A'}, Terbaik: ${s.bestPerformer?.name || 'N/A'}, Terburuk: ${s.worstPerformer?.name || 'N/A'}`).join('\n') || 'Data tidak tersedia'}
    
    Berikan ringkasan eksekutif dan justifikasi dalam Bahasa Indonesia dengan format markdown:
    1. Judul: "Analisis Perbandingan Antar Domain Tahun ${year}"
    2. Tantangan Utama (domain dengan risiko rata-rata tertinggi)
    3. Bidang Paling Stabil (domain dengan risiko rata-rata terendah)
    4. Kesenjangan Kinerja (menggunakan data performa terbaik/terburuk)
    5. Rekomendasi Strategis
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    const highestRiskDomain = comparisonData.stats?.sort((a,b) => b.averageRisk - a.averageRisk)[0];
    return `### Gagal Memuat Analisis AI\n\nTerjadi kesalahan. Analisis manual: Bidang **${highestRiskDomain?.domain || 'Tidak tersedia'}** menunjukkan tantangan terbesar tahun ini.`;
  }
};

export default {
  getExecutiveBriefing,
  getSmartRecommendations,
  getForecastingInsight,
  getRegionalAnalysisInsight,
  generateAllocationSuggestion,
  generateScenarioAnalysis,
  getParentingInsight,
  getMonthlyPerformanceInsight,
  getDomainComparisonInsight
};

