// Konfigurasi API Gemini untuk integrasi dengan PAUD HI
// Menggunakan environment variables dari PAUD HI

// Environment Variables dari PAUD HI
const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_REACT_APP_GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_API_URL = import.meta.env.VITE_REACT_APP_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models';

// Validasi API Key
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI API KEY tidak ditemukan di environment variables!');
  console.log('💡 Pastikan file .env berisi: VITE_REACT_APP_GEMINI_API_KEY=your_key_here');
}

// Export konfigurasi
export const geminiConfig = {
  apiKey: GEMINI_API_KEY,
  model: GEMINI_MODEL,
  apiUrl: GEMINI_API_URL,
  isConfigured: !!GEMINI_API_KEY
};

// Fungsi untuk membuat request ke Gemini API
export const callGeminiAPI = async (prompt, options = {}) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API Key tidak dikonfigurasi');
  }

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Fungsi untuk analisis PAUD HI
export const analyzePAUDHI = async (data, context) => {
  const prompt = `
    Anda adalah ahli kebijakan publik untuk program PAUD HI (Pengembangan Anak Usia Dini Holistik Integratif) di Indonesia.
    
    Konteks: ${context}
    Data: ${JSON.stringify(data, null, 2)}
    
    Berikan analisis dan rekomendasi dalam Bahasa Indonesia dengan format markdown:
    1. Ringkasan situasi
    2. Identifikasi masalah utama
    3. Rekomendasi strategis
    4. Langkah tindak lanjut
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `### Analisis AI Tidak Tersedia\n\nTerjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi atau hubungi administrator.`;
  }
};

// Fungsi untuk rekomendasi intervensi
export const getInterventionRecommendations = async (alertData) => {
  const prompt = `
    Anda adalah konsultan kebijakan untuk program PAUD HI di Indonesia.
    
    Data Alert:
    - Masalah: ${alertData.title || 'Tidak spesifik'}
    - Wilayah: ${alertData.region || 'Tidak spesifik'}
    - Domain: ${alertData.domain || 'Tidak spesifik'}
    - Skor Risiko: ${alertData.riskScore || 'Tidak tersedia'}
    
    Berikan rekomendasi intervensi yang spesifik dan dapat diimplementasikan:
    1. Justifikasi strategis (1-2 kalimat)
    2. Tiga rekomendasi intervensi yang konkret
    3. Skor risiko proyeksi setelah implementasi
    4. Langkah implementasi prioritas
    
    Format dalam Bahasa Indonesia dengan markdown.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `### Rekomendasi AI Tidak Tersedia\n\nTerjadi kesalahan saat menghubungi layanan AI. Sebagai tindakan awal, koordinasikan dengan dinas terkait di wilayah tersebut.`;
  }
};

// Fungsi untuk analisis prediktif
export const getPredictiveAnalysis = async (forecastData) => {
  const prompt = `
    Anda adalah data scientist yang mengkhususkan diri dalam prediksi kesehatan publik untuk pemerintah Indonesia.
    
    Data Prediksi:
    ${JSON.stringify(forecastData, null, 2)}
    
    Berikan analisis prediktif dalam Bahasa Indonesia:
    1. Tren keseluruhan yang diprediksi
    2. Faktor-faktor yang mempengaruhi tren
    3. Wilayah yang perlu perhatian khusus
    4. Rekomendasi antisipasi
    
    Format dalam markdown.
  `;

  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    return `### Analisis Prediktif Tidak Tersedia\n\nTerjadi kesalahan saat menganalisis data prediksi. Harap coba lagi.`;
  }
};

export default {
  geminiConfig,
  callGeminiAPI,
  analyzePAUDHI,
  getInterventionRecommendations,
  getPredictiveAnalysis
};

