// geminiService.hybrid.js
// Versi hybrid — menambahkan lapisan "otak TS" (validasi, reasoning meta, safe parsing, reflektif)
// tanpa mengubah nama fungsi, ekspor, atau perilaku fallback dari versi JS asli.
// Tetap ESM import/export dan gaya log serupa versi JS.

import { geminiConfig, callGeminiAPI } from '../config/geminiConfig.js';

/* ============================================================
   Utilities: Validation, Safe Parse, Prompt Builder, Helpers
   ============================================================ */

function validateInput(schema, data, funcName) {
  try {
    Object.keys(schema).forEach(key => {
      if (!(key in data)) {
        console.warn(`⚠️ [${funcName}] Properti "${key}" hilang pada input.`);
        return;
      }
      const expected = schema[key];
      const actual = Array.isArray(data[key]) ? 'object' : typeof data[key];
      if (expected && actual !== expected) {
        console.warn(`⚠️ [${funcName}] Tipe data tidak sesuai untuk "${key}". Diharapkan ${expected}, diterima ${actual}`);
      }
    });
  } catch (e) {
    console.warn(`⚠️ [validateInput] Kesalahan saat validasi untuk ${funcName}:`, e);
  }
}

function safeJSONParse(response) {
  try {
    if (typeof response !== 'string') return response;
    return JSON.parse(response);
  } catch {
    try {
      const cleaned = response.replace(/```json|```/g, '');
      return JSON.parse(cleaned);
    } catch {
      console.warn('⚠️ safeJSONParse: Gagal parse JSON, mengembalikan object teks.');
      return { text: response };
    }
  }
}

function buildDualPrompt(formal, communicative, data, instruksi) {
  return `
[MODE ANALISIS FORMAL]
${formal}

[MODE KOMUNIKATIF]
${communicative}

📊 Data Kontekstual:
${JSON.stringify(data, null, 2)}

📘 Instruksi:
${instruksi}
  `;
}

async function callGeminiWithSafety(prompt, funcName) {
  try {
    let res = await callGeminiAPI(prompt);

    // Hapus kalimat pembuka & markdown
    res = res
      .replace(/^(Oke|Baik|Siap|Berikut)[^*\n]+/i, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^#+\s*/gm, '')
      .replace(/[_`>]/g, '')
      .trim();

    if (!res.toLowerCase().includes('catatan: ai dapat membuat kesalahan')) {
      res += `\n\nCatatan: AI dapat membuat kesalahan. Periksa kembali respons ini sebelum digunakan sebagai dasar keputusan.`;
    }

    return res.trim();
  } catch (error) {
    console.error(`Gemini API call failed in ${funcName}`, error);
    throw error;
  }
}

/* ============================================================
   Refinement Layer — Lapisan Otak Reflektif (Self-check + Clean)
   ============================================================ */

function refineAIResponse(text) {
  try {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^#+\s*/gm, '')
      .replace(/[_`>]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/misalnya:.+?["']/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim() +
      '';
  } catch (err) {
    console.warn('⚠️ refineAIResponse gagal membersihkan teks:', err);
    return text;
  }
}

/* ============================================================
   Original JS functions enhanced with hybrid logic + reflektif
   ============================================================ */

export const getExecutiveBriefing = async (domain, indicators, alerts) => {
  const funcName = 'getExecutiveBriefing';
  validateInput({ domain: 'string', indicators: 'object', alerts: 'object' }, { domain, indicators, alerts }, funcName);

  if (!geminiConfig.isConfigured) return getFallbackExecutiveBriefing(domain, indicators, alerts);

  const criticalAlerts = Array.isArray(alerts) ? alerts.filter(a => a.level === 'CRITICAL') : [];
  const highAlerts = Array.isArray(alerts) ? alerts.filter(a => a.level === 'HIGH') : [];

  const promptFormal = `
Anda adalah penasihat kebijakan senior di Kemenko PMK, bertanggung jawab untuk memantau program PAUD-HI nasional.
Tugas Anda adalah memberikan briefing eksekutif yang ringkas dan berwawasan berdasarkan data dashboard terbaru.
Konteks Saat Ini: Domain: ${domain}.
`;
  const promptComm = `Sampaikan hasil analisis dalam Bahasa Indonesia yang jelas, ringkas, dan dapat ditindaklanjuti.`;

  const dataContext = { domain, indicators, alerts };
  const instruksi = `
1. Mulai langsung dengan headline hasil analisis.
2. Analisis situasi, hubungkan indikator dengan alert.
3. Identifikasi masalah utama.
4. Akhiri dengan rekomendasi strategis.
5. Tambahkan bagian "Dasar Analisis".
Format sederhana, Bahasa Indonesia.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, dataContext, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return refineAIResponse(raw);
  } catch {
    return getFallbackExecutiveBriefing(domain, indicators, alerts);
  }
};

export const getSmartRecommendations = async (alert) => {
  const funcName = 'getSmartRecommendations';
  validateInput({ alert: 'object' }, { alert }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackSmartRecommendations(alert);

  const promptFormal = `
Anda adalah ahli kebijakan kesehatan publik anak di Indonesia.
Berdasarkan alert berikut, berikan 3 rekomendasi intervensi yang spesifik dan efisien.
`;
  const promptComm = `Gunakan Bahasa Indonesia yang singkat dan jelas untuk pembuat kebijakan.`;

  const dataContext = { alert };
  const instruksi = `
1. Justifikasi singkat.
2. 3 rekomendasi konkret.
3. Skor risiko proyeksi setelah intervensi.
Format ringkas, Bahasa Indonesia.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, dataContext, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    const parsed = safeJSONParse(raw);
    if (parsed && (parsed.recommendations || parsed.projectedRiskScore)) return parsed;
    return {
      justification: "Analisis AI (teks) tersedia.",
      recommendations: refineAIResponse(raw),
      projectedRiskScore: Math.max((alert?.riskScore || 0) - 10, 0),
    };
  } catch {
    return getFallbackSmartRecommendations(alert);
  }
};

export const getForecastingInsight = async (domain, horizon, topIncreases, topDecreases, overallTrend) => {
  const funcName = 'getForecastingInsight';
  validateInput({ domain: 'string' }, { domain }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackForecastingInsight(domain, horizon, topIncreases, topDecreases, overallTrend);

  const promptFormal = `Anda adalah data scientist publik. Analisis data prediksi untuk domain "${domain}" horizon ${horizon}.`;
  const promptComm = `Sampaikan insight jelas, prediktif, dan actionable.`;

  const dataContext = { domain, horizon, topIncreases, topDecreases, overallTrend };
  const instruksi = `
1. Headline singkat.
2. Ringkasan tren & implikasi.
3. Faktor pendorong tren.
4. Analisis wilayah spesifik.
5. Rekomendasi awal.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, dataContext, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return refineAIResponse(raw);
  } catch {
    return getFallbackForecastingInsight(domain, horizon, topIncreases, topDecreases, overallTrend);
  }
};

export const getRegionalAnalysisInsight = async (regionData) => {
  const funcName = 'getRegionalAnalysisInsight';
  validateInput({ regionData: 'object' }, { regionData }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackRegionalAnalysis(regionData);

  const promptFormal = `Anda adalah analis lintas sektor PAUD-HI. Temukan korelasi antar-domain.`;
  const promptComm = `Sampaikan insight ringkas dengan hipotesis kausal.`;

  const instruksi = `
1. Headline.
2. Korelasi inter-domain & hipotesis.
3. Pertanyaan pemandu investigasi.
Format sederhana, Bahasa Indonesia.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, regionData, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return refineAIResponse(raw);
  } catch {
    return getFallbackRegionalAnalysis(regionData);
  }
};

export const generateAllocationSuggestion = async (totalBudget, resourceData, highestRiskRegions) => {
  const funcName = 'generateAllocationSuggestion';
  validateInput({ totalBudget: 'number', resourceData: 'object', highestRiskRegions: 'object' }, { totalBudget, resourceData, highestRiskRegions }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackAllocationSuggestion(totalBudget, resourceData, highestRiskRegions);

  const promptFormal = `Anda adalah penasihat ekonomi publik PAUD HI. Susun rencana alokasi optimal.`;
  const promptComm = `Berikan rencana anggaran, SDM, material dengan justifikasi singkat.`;

  const dataContext = { totalBudget, resourceData, highestRiskRegions };
  const instruksi = `
1. Judul & ringkasan.
2. Rencana Anggaran, SDM, Material.
3. Justifikasi tiap poin.
4. Total <= ${totalBudget} Miliar.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, dataContext, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return { content: refineAIResponse(raw), sources: [] };
  } catch {
    return getFallbackAllocationSuggestion(totalBudget, resourceData, highestRiskRegions);
  }
};

export const generateScenarioAnalysis = async (params) => {
  const funcName = 'generateScenarioAnalysis';
  validateInput({ params: 'object' }, { params }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackScenarioAnalysis(params);

  const promptFormal = `Anda adalah analis kebijakan publik senior. Analisis skenario kebijakan berdasarkan parameter berikut.`;
  const promptComm = `Tuliskan potensi keuntungan, risiko, dan mitigasi.`;

  const prompt = buildDualPrompt(promptFormal, promptComm, params, `
1. Judul singkat.
2. Ringkasan eksekutif.
3. Potensi Keuntungan.
4. Potensi Risiko.
5. Rekomendasi Mitigasi.
`);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return { content: refineAIResponse(raw), sources: [] };
  } catch {
    return getFallbackScenarioAnalysis(params);
  }
};

export const getParentingInsight = async (childProfile, latestGrowth) => {
  const funcName = 'getParentingInsight';
  validateInput({ childProfile: 'object' }, { childProfile }, funcName);
  if (!geminiConfig.isConfigured) return getFallbackParentingInsight(childProfile, latestGrowth);

  const promptFormal = `Anda adalah ahli tumbuh kembang anak yang ramah dan mendorong.`;
  const promptComm = `Berikan tip singkat dan positif untuk orang tua.`;

  const dataContext = { childProfile, latestGrowth };
  const instruksi = `
Nama anak: ${childProfile?.name ?? 'Anak'} (${childProfile?.age ?? 'N/A'} th).
Berat: ${latestGrowth?.weight ?? 'N/A'} kg, Tinggi: ${latestGrowth?.height ?? 'N/A'} cm.
`;

  const prompt = buildDualPrompt(promptFormal, promptComm, dataContext, instruksi);
  try {
    const raw = await callGeminiWithSafety(prompt, funcName);
    return refineAIResponse(raw);
  } catch {
    return getFallbackParentingInsight(childProfile, latestGrowth);
  }
};

/* ============================================================
   Fallback Functions
   ============================================================ */

const getFallbackExecutiveBriefing = (domain, indicators, alerts) =>
  `Analisis AI tidak tersedia. Tinjau data manual untuk domain ${domain}.`;

const getFallbackSmartRecommendations = (alert) => ({
  justification: "Analisis AI tidak tersedia.",
  recommendations: "Silakan validasi manual di wilayah terkait.",
  projectedRiskScore: alert?.riskScore ?? 0,
});

const getFallbackForecastingInsight = () =>
  `Analisis prediksi tidak tersedia.`;

const getFallbackRegionalAnalysis = () =>
  `Analisis regional tidak tersedia.`;

const getFallbackAllocationSuggestion = () => ({
  content: `Saran alokasi tidak tersedia.`,
  sources: [],
});

const getFallbackScenarioAnalysis = () => ({
  content: `Analisis skenario tidak tersedia.`,
  sources: [],
});

const getFallbackParentingInsight = (childProfile) =>
  `Terus pantau pertumbuhan ${childProfile?.name ?? 'anak Anda'} ya.`;

export default {
  getExecutiveBriefing,
  getSmartRecommendations,
  getForecastingInsight,
  getRegionalAnalysisInsight,
  generateAllocationSuggestion,
  generateScenarioAnalysis,
  getParentingInsight,
};
