// Mengganti geminiService.ts dengan JavaScript version yang terintegrasi dengan PAUD HI
import { geminiConfig, callGeminiAPI } from '../config/geminiConfig.js';

// Validasi konfigurasi
if (!geminiConfig.isConfigured) {
  console.warn('⚠️ Gemini API tidak dikonfigurasi. Fitur AI akan menggunakan fallback.');
}

// Fungsi untuk mendapatkan executive briefing
export const getExecutiveBriefing = async (domain, indicators, alerts) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackExecutiveBriefing(domain, indicators, alerts);
  }

  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const highAlerts = alerts.filter(a => a.level === 'HIGH');

  const prompt = `
    Anda adalah penasihat kebijakan senior di Kemenko PMK, bertanggung jawab untuk memantau program PAUD-HI nasional.
    Tugas Anda adalah memberikan briefing eksekutif yang ringkas dan berwawasan berdasarkan data dashboard terbaru.

    **Konteks Saat Ini:**
    - **Domain Fokus:** ${domain}
    - **Indikator Kunci:**
      ${indicators.map(i => `- ${i.label}: ${i.value} (Tren: ${i.change > 0 ? '+' : ''}${i.change}%)`).join('\n      ')}
    - **Ringkasan Alert Aktif:**
      - Total Alert: ${alerts.length}
      - Alert Kritis: ${criticalAlerts.length} (${criticalAlerts.map(a => `${a.title} di ${a.region}`).join(', ') || 'Tidak ada'})
      - Alert Tinggi: ${highAlerts.length}

    **Instruksi:**
    1. Mulai dengan headline yang merangkum situasi keseluruhan untuk domain yang dipilih.
    2. Dalam satu paragraf, analisis situasi. Hubungkan indikator kunci dengan alert aktif. Apakah tren dalam indikator tercermin dalam alert?
    3. Identifikasi masalah #1 yang paling mendesak saat ini. Ini harus menjadi alert paling kritis atau tren yang mengkhawatirkan.
    4. Akhiri dengan satu rekomendasi strategis prioritas tinggi atau pertanyaan untuk memandu diskusi.
    5. Seluruh respons harus dalam Bahasa Indonesia. Format sebagai markdown sederhana. Tambahkan bagian "Dasar Analisis" yang menjelaskan alasan Anda.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getExecutiveBriefing", error);
    return getFallbackExecutiveBriefing(domain, indicators, alerts);
  }
};

// Fungsi untuk rekomendasi cerdas
export const getSmartRecommendations = async (alert) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackSmartRecommendations(alert);
  }

  const prompt = `
    Anda adalah ahli dalam kebijakan kesehatan publik untuk pengembangan anak usia dini di Indonesia.
    Berdasarkan alert kesehatan berikut, berikan justifikasi strategis, tiga rekomendasi intervensi yang spesifik/dapat ditindaklanjuti/efisien, dan skor risiko proyeksi setelah implementasi yang berhasil.

    Detail Alert:
    - Masalah: ${alert.title}
    - Wilayah: ${alert.region}
    - Domain: ${alert.domain}
    - Skor Risiko Saat Ini: ${alert.riskScore}
    ${alert.target ? `- Target: >${alert.target}%` : ''}
    ${alert.trend ? `- Tren: +${alert.trend}%` : ''}

    Instruksi:
    1. **justification**: Tulis justifikasi strategis singkat (1-2 kalimat) mengapa intervensi ini kritis.
    2. **recommendations**: Berikan tiga rekomendasi intervensi konkret dalam daftar bernomor markdown. Setiap item bernomor harus pada baris baru.
    3. **projectedRiskScore**: Perkirakan skor risiko baru untuk wilayah jika rekomendasi ini berhasil diimplementasikan. Harus berupa angka yang lebih rendah dari skor risiko saat ini ${alert.riskScore}.
    
    Seluruh respons harus dalam Bahasa Indonesia.
  `;

  try {
    const response = await callGeminiAPI(prompt);
    // Parse response untuk mendapatkan JSON
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn('Failed to parse JSON response, returning text response');
    }
    
    return {
      justification: "Analisis AI berhasil dijalankan.",
      recommendations: response,
      projectedRiskScore: Math.max(alert.riskScore - 10, 0)
    };
  } catch (error) {
    console.error("Gemini API call failed in getSmartRecommendations", error);
    return getFallbackSmartRecommendations(alert);
  }
};

// Fungsi untuk insight prediksi
export const getForecastingInsight = async (domain, horizon, topIncreases, topDecreases, overallTrend) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackForecastingInsight(domain, horizon, topIncreases, topDecreases, overallTrend);
  }

  const prompt = `
    Anda adalah data scientist yang mengkhususkan diri dalam prediksi kesehatan publik untuk pemerintah Indonesia.
    Analisis data prediksi yang diberikan untuk domain "${domain}" selama "${horizon}" berikutnya.

    **Titik Data Kunci:**
    - Tren Risiko Keseluruhan: ${overallTrend > 0 ? `Meningkat rata-rata ${overallTrend.toFixed(2)} poin` : `Menurun rata-rata ${Math.abs(overallTrend).toFixed(2)} poin`}.
    - 3 Wilayah Teratas dengan Risiko Memburuk: ${topIncreases.map(r => `${r.region} (+${r.change})`).join(', ')}.
    - 3 Wilayah Teratas dengan Risiko Membaik: ${topDecreases.map(r => `${r.region} (${r.change})`).join(', ')}.

    **Tugas:**
    Berikan insight analitis ringkas dalam Bahasa Indonesia, diformat sebagai markdown.
    1. Mulai dengan headline: "Analisis Prediksi Risiko Bidang ${domain}".
    2. Dalam paragraf ringkasan, nyatakan tren prediksi keseluruhan dan implikasi utamanya.
    3. Buat bagian "Faktor Pendorong Tren". Berdasarkan domain (${domain}), hipotesiskan alasan dunia nyata potensial untuk tren keseluruhan.
    4. Buat bagian "Analisis Wilayah Spesifik". Analisis singkat alasan potensial di balik wilayah "Eskalasi Tertinggi" dan "Perbaikan Terbaik".
    5. Akhiri dengan satu "Rekomendasi Awal" yang dapat ditindaklanjuti.
    6. Sertakan bagian "Dasar Analisis" yang menjelaskan logika di balik hipotesis Anda.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getForecastingInsight", error);
    return getFallbackForecastingInsight(domain, horizon, topIncreases, topDecreases, overallTrend);
  }
};

// Fungsi untuk analisis regional
export const getRegionalAnalysisInsight = async (regionData) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackRegionalAnalysis(regionData);
  }

  const prompt = `
    Anda adalah analis kebijakan lintas sektor untuk PAUD-HI di Indonesia. Tugas Anda adalah menemukan korelasi tersembunyi antara domain layanan yang berbeda berdasarkan data untuk wilayah tertentu.

    **Data Wilayah: ${regionData.name}**
    - Skor Risiko Keseluruhan: ${'overallRisk' in regionData ? regionData.overallRisk : 'N/A'}
    - Skor Risiko Domain:
      ${'domains' in regionData ? Object.entries(regionData.domains).map(([key, value]) => `- ${key}: ${value.riskScore}`).join('\n      ') : 'N/A'}
    - Metrik Kunci:
      ${'domains' in regionData ? Object.entries(regionData.domains).map(([key, value]) => `  - ${key}:\n` + value.metrics.map(m => `    - ${m.label}: ${m.value}${m.unit} (Nasional: ${m.nationalAverage}${m.unit})`).join('\n')).join('\n') : 'N/A'}

    **Tugas:**
    1. Analisis metrik yang diberikan di semua domain.
    2. Identifikasi korelasi **inter-domain** yang paling signifikan.
    3. Tulis insight ringkas dalam Bahasa Indonesia, diformat sebagai markdown.
    4. Mulai dengan headline: "Analisis Ketergantungan Data untuk ${regionData.name}".
    5. Dalam satu paragraf, nyatakan dengan jelas korelasi yang diidentifikasi dan jelaskan kemungkinan hubungan kausal menggunakan titik data yang diberikan sebagai bukti.
    6. Akhiri dengan bagian "Hipotesis untuk Investigasi": satu pertanyaan yang memprovokasi pemikiran yang dapat memandu investigasi kebijakan lebih lanjut berdasarkan temuan Anda.
    7. Sertakan bagian "Dasar Analisis" yang menjelaskan alasan Anda.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getRegionalAnalysisInsight", error);
    return getFallbackRegionalAnalysis(regionData);
  }
};

// Fungsi untuk saran alokasi sumber daya
export const generateAllocationSuggestion = async (totalBudget, resourceData, highestRiskRegions) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackAllocationSuggestion(totalBudget, resourceData, highestRiskRegions);
  }

  const prompt = `
    Anda adalah penasihat ekonomi untuk pemerintah Indonesia yang mengkhususkan diri dalam optimasi sumber daya untuk program kesehatan publik, khususnya PAUD HI.
    Tujuan Anda adalah membuat rencana alokasi sumber daya yang optimal untuk memaksimalkan dampak dalam mengurangi stunting dan meningkatkan hasil kesehatan anak.

    Situasi Saat Ini & Keterbatasan:
    - Total Anggaran Tersedia: ${totalBudget.toLocaleString('id-ID')} Miliar IDR.
    - Wilayah Risiko Tertinggi (Prioritas): ${highestRiskRegions.join(', ')}.
    - Permintaan yang Diprediksi (Defisit):
      ${JSON.stringify(resourceData, null, 2)}

    Tugas:
    Berdasarkan prinsip cost-effectiveness dan memaksimalkan dampak, berikan rekomendasi alokasi sumber daya strategis.
    1. Mulai dengan judul dan ringkasan 1-2 kalimat dari pendekatan strategis Anda.
    2. Berikan rencana alokasi yang jelas dan dapat ditindaklanjuti yang dibagi berdasarkan Anggaran, SDM, dan Material.
    3. Untuk setiap alokasi, berikan justifikasi singkat ("Justifikasi") yang menjelaskan mengapa alokasi ini optimal untuk dampak.
    4. Prioritaskan intervensi yang terbukti efektif untuk stunting dan kesehatan anak.
    5. Pastikan total anggaran yang diusulkan tidak melebihi anggaran yang tersedia.
    6. Seluruh respons harus dalam Bahasa Indonesia dan diformat sebagai markdown profesional.
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return { content: response, sources: [] };
  } catch (error) {
    console.error("Gemini API call failed in generateAllocationSuggestion", error);
    return getFallbackAllocationSuggestion(totalBudget, resourceData, highestRiskRegions);
  }
};

// Fungsi untuk analisis skenario
export const generateScenarioAnalysis = async (params) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackScenarioAnalysis(params);
  }

  const prompt = `
    Anda adalah analis kebijakan publik senior untuk pemerintah Indonesia.
    Tugas Anda adalah menganalisis dampak potensial dari skenario "bagaimana jika" terkait alokasi sumber daya untuk PAUD HI.

    Detail Skenario:
    - Perubahan Anggaran: Anggaran intervensi ${params.budgetChange > 0 ? `dinaikkan sebesar ${params.budgetChange}` : `dikurangi sebesar ${Math.abs(params.budgetChange)}`}%
    - Fokus SDM: Prioritas pengerahan SDM difokuskan pada bidang **${params.sdmFocus}**.
    - Fokus Regional: Alokasi diprioritaskan untuk wilayah **${params.regionFocus}**.

    Tugas:
    Berikan analisis ringkas dari skenario ini dalam markdown yang terstruktur dengan baik.
    1. Mulai dengan judul yang jelas yang merangkum skenario.
    2. Tulis "Ringkasan Eksekutif" (1-2 kalimat) dari hasil yang paling mungkin.
    3. Buat bagian "Potensi Keuntungan" yang mencantumkan 2-3 dampak positif potensial.
    4. Buat bagian "Potensi Risiko" yang mencantumkan 2-3 dampak negatif potensial atau trade-off.
    5. Akhiri dengan bagian "Rekomendasi Mitigasi", menyarankan satu tindakan kunci untuk memaksimalkan manfaat dan meminimalkan risiko.
    6. Seluruh respons harus dalam Bahasa Indonesia.
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return { content: response, sources: [] };
  } catch (error) {
    console.error("Gemini API call failed in generateScenarioAnalysis", error);
    return getFallbackScenarioAnalysis(params);
  }
};

// Fungsi untuk insight pengasuhan
export const getParentingInsight = async (childProfile, latestGrowth) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackParentingInsight(childProfile, latestGrowth);
  }

  const prompt = `
    Anda adalah ahli pengembangan anak usia dini yang ramah dan mendorong.
    Berikan tip singkat, personal, dan dapat ditindaklanjuti untuk orang tua berdasarkan data terbaru anak mereka.
    Nama anak: ${childProfile.name}, usia ${childProfile.age}.
    Pengukuran terbaru: Berat ${latestGrowth?.weight || 'N/A'} kg, Tinggi ${latestGrowth?.height || 'N/A'} cm.
    Tetap ringkas (2-3 kalimat) dan dalam Bahasa Indonesia.
    Fokus pada nada yang positif dan mendorong.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getParentingInsight", error);
    return getFallbackParentingInsight(childProfile, latestGrowth);
  }
};

// Fungsi untuk insight kinerja bulanan
export const getMonthlyPerformanceInsight = async (monthName, summary) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackMonthlyPerformanceInsight(monthName, summary);
  }

  const prompt = `
    Anda adalah analis kebijakan publik untuk PAUD-HI Indonesia.
    Ringkas kinerja nasional untuk ${monthName} berdasarkan data berikut.

    **Data untuk ${monthName}:**
    - Skor Risiko Nasional: ${summary.nationalRisk?.score?.toFixed(1) || 'N/A'}
    - Perubahan Bulanan: ${summary.nationalRisk?.change?.toFixed(1) || 'N/A'} poin.
    - Wilayah dengan Perbaikan Terbaik: ${summary.topImprovingRegions?.map(r => r.name).join(', ') || 'N/A'}.
    - Wilayah yang Memburuk: ${summary.topWorseningRegions?.map(r => r.name).join(', ') || 'N/A'}.

    **Tugas:**
    Berikan ringkasan eksekutif dan justifikasi dalam markdown terstruktur dan Bahasa Indonesia.
    1. Buat judul: "Ringkasan Kinerja Bulan ${monthName}".
    2. Tulis bagian "Analisis Umum" yang merangkum tren nasional.
    3. Soroti "Wilayah Berkinerja Terbaik" dan jelaskan mengapa mereka penting untuk dipelajari.
    4. Soroti "Wilayah Perlu Perhatian" dan sarankan tindakan awal.
    5. Berikan "Rekomendasi" yang menyimpulkan tentang langkah selanjutnya.
    6. Tambahkan bagian "Dasar Analisis" yang menjelaskan logika Anda, fokus pada mengapa top movers adalah sinyal kritis.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getMonthlyPerformanceInsight", error);
    return getFallbackMonthlyPerformanceInsight(monthName, summary);
  }
};

// Fungsi untuk insight perbandingan domain
export const getDomainComparisonInsight = async (year, comparisonData) => {
  if (!geminiConfig.isConfigured) {
    return getFallbackDomainComparisonInsight(year, comparisonData);
  }

  const prompt = `
    Anda adalah analis kebijakan publik untuk PAUD-HI Indonesia.
    Berikan analisis perbandingan lintas semua domain layanan untuk tahun ${year}.

    **Data untuk ${year}:**
    ${comparisonData.stats?.map(s => `- Domain: ${s.domain}, Rata-rata Risiko: ${s.averageRisk?.toFixed(1) || 'N/A'}, Wilayah Kritis: ${s.criticalRegionsCount || 'N/A'}, Terbaik: ${s.bestPerformer?.name || 'N/A'}, Terburuk: ${s.worstPerformer?.name || 'N/A'}`).join('\n') || 'Data tidak tersedia'}

    **Tugas:**
    Berikan ringkasan eksekutif dan justifikasi dalam markdown terstruktur dan Bahasa Indonesia.
    1. Buat judul: "Analisis Perbandingan Antar Domain Tahun ${year}".
    2. Identifikasi dan analisis "Tantangan Utama" (domain dengan risiko rata-rata tertinggi).
    3. Identifikasi dan analisis "Bidang Paling Stabil" (domain dengan risiko rata-rata terendah).
    4. Diskusikan "Kesenjangan Kinerja" dengan menggunakan data performa terbaik/terburuk sebagai contoh.
    5. Berikan "Rekomendasi Strategis" yang menyimpulkan.
    6. Tambahkan bagian "Dasar Analisis" yang menjelaskan logika perbandingan Anda.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.error("Gemini API call failed in getDomainComparisonInsight", error);
    return getFallbackDomainComparisonInsight(year, comparisonData);
  }
};

// Fungsi fallback
const getFallbackExecutiveBriefing = (domain, indicators, alerts) => {
  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const highAlerts = alerts.filter(a => a.level === 'HIGH');
  
  return `### Analisis AI Tidak Tersedia

Terjadi kesalahan saat menghubungi layanan AI. Namun, berdasarkan data yang ada:
- **Perhatian Utama:** Terdapat **${criticalAlerts.length} peringatan kritis** dan **${highAlerts.length} peringatan tinggi**.
- **Rekomendasi Manual:** Harap periksa daftar 'Alert Aktif' untuk mengidentifikasi wilayah prioritas dan tindakan yang diperlukan.`;
};

const getFallbackSmartRecommendations = (alert) => {
  return {
    justification: "Analisis AI tidak tersedia saat ini.",
    recommendations: "Terjadi kesalahan saat menghubungi layanan AI. Harap coba lagi. Sebagai tindakan awal, koordinasikan dengan dinas terkait di wilayah tersebut untuk validasi data dan perencanaan awal.",
    projectedRiskScore: alert.riskScore,
  };
};

const getFallbackForecastingInsight = (domain, horizon, topIncreases, topDecreases, overallTrend) => {
  return `### Insight Prediksi Tidak Tersedia

Terjadi kesalahan saat menganalisis data prediksi. Harap coba lagi.`;
};

const getFallbackRegionalAnalysis = (regionData) => {
  return `### Analisis Regional Tidak Tersedia

Terjadi kesalahan saat menganalisis data wilayah. Harap coba lagi.`;
};

const getFallbackAllocationSuggestion = (totalBudget, resourceData, highestRiskRegions) => {
  return {
    content: `### Saran Alokasi Tidak Tersedia

Terjadi kesalahan saat menghasilkan saran dari AI. Periksa Kunci API dan koneksi jaringan.`,
    sources: []
  };
};

const getFallbackScenarioAnalysis = (params) => {
  return {
    content: `### Analisis Skenario Tidak Tersedia

Terjadi kesalahan saat menghasilkan analisis skenario dari AI. Periksa Kunci API dan koneksi jaringan.`,
    sources: []
  };
};

const getFallbackParentingInsight = (childProfile, latestGrowth) => {
  return `Halo Ayah/Bunda! Terus pantau pertumbuhan ${childProfile.name} ya. Pastikan untuk selalu memberikan makanan bergizi seimbang dan stimulasi yang sesuai usianya.`;
};

const getFallbackMonthlyPerformanceInsight = (monthName, summary) => {
  const trendText = summary.nationalRisk?.change > 0 ? 'sedikit memburuk' : 'menunjukkan perbaikan';
  return `### Gagal Memuat Analisis AI

Terjadi kesalahan. Analisis manual: Kinerja nasional bulan ${monthName} ${trendText}. Perlu investigasi lebih lanjut.`;
};

const getFallbackDomainComparisonInsight = (year, comparisonData) => {
  const highestRiskDomain = comparisonData.stats?.sort((a,b) => b.averageRisk - a.averageRisk)[0];
  return `### Gagal Memuat Analisis AI

Terjadi kesalahan. Analisis manual: Bidang **${highestRiskDomain?.domain || 'Tidak tersedia'}** menunjukkan tantangan terbesar tahun ini.`;
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

