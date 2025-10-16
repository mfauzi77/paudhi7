// Bridge untuk mengintegrasikan API Gemini dari PAUD HI dengan CERIA
// File ini akan menggantikan geminiService.ts yang ada

// Import konfigurasi Gemini dari PAUD HI
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

// Fungsi fallback untuk executive briefing
const getFallbackExecutiveBriefing = (domain, indicators, alerts) => {
  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const highAlerts = alerts.filter(a => a.level === 'HIGH');
  
  return `### Analisis AI Tidak Tersedia

Terjadi kesalahan saat menghubungi layanan AI. Namun, berdasarkan data yang ada:
- **Perhatian Utama:** Terdapat **${criticalAlerts.length} peringatan kritis** dan **${highAlerts.length} peringatan tinggi**.
- **Rekomendasi Manual:** Harap periksa daftar 'Alert Aktif' untuk mengidentifikasi wilayah prioritas dan tindakan yang diperlukan.`;
};

// Fungsi fallback untuk smart recommendations
const getFallbackSmartRecommendations = (alert) => {
  return {
    justification: "Analisis AI tidak tersedia saat ini.",
    recommendations: "Terjadi kesalahan saat menghubungi layanan AI. Harap coba lagi. Sebagai tindakan awal, koordinasikan dengan dinas terkait di wilayah tersebut untuk validasi data dan perencanaan awal.",
    projectedRiskScore: alert.riskScore,
  };
};

// Fungsi fallback untuk forecasting insight
const getFallbackForecastingInsight = (domain, horizon, topIncreases, topDecreases, overallTrend) => {
  return `### Insight Prediksi Tidak Tersedia

Terjadi kesalahan saat menganalisis data prediksi. Harap coba lagi.`;
};

// Fungsi fallback untuk regional analysis
const getFallbackRegionalAnalysis = (regionData) => {
  return `### Analisis Regional Tidak Tersedia

Terjadi kesalahan saat menganalisis data wilayah. Harap coba lagi.`;
};

// Export semua fungsi
export default {
  getExecutiveBriefing,
  getSmartRecommendations,
  getForecastingInsight,
  getRegionalAnalysisInsight
};

