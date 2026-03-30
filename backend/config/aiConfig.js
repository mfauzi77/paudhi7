require('dotenv').config();

const AI_CONFIG = {
  CHATBOT: {
    apiKey: process.env.CHATBOT_AI_KEY || process.env.GEMINI_API_KEY_PAUD,
    apiKeys: [
      process.env.CHATBOT_AI_KEY,
      process.env.CERIA_AI_KEY,
      process.env.GEMINI_API_KEY_PAUD
    ].filter(Boolean), // Pool of available keys
    systemPrompt: `Kamu adalah chatbot pakar dalam bidang Pengasuhan dan Pengembangan Anak Usia Dini (PAUD).
Jawablah dengan ramah, informatif, dan mudah dipahami dalam bahasa Indonesia.
Jika tidak yakin, arahkan pengguna ke WhatsApp pengelola.`,
    model: 'gemini-2.5-flash',
    fallbackModels: ['gemini-2.0-flash', 'gemini-flash-latest']
  },
  CERIA: {
    apiKey: process.env.CERIA_AI_KEY,
    apiKeys: [process.env.CERIA_AI_KEY, process.env.GEMINI_API_KEY_PAUD].filter(Boolean),
    systemPrompt: `Anda adalah asisten AI khusus untuk dashboard CERIA.
Fokus pada analisis data PAUD, stunting, dan indikator pendidikan.
Berikan jawaban yang analitis, berbasis data, dan formal.`,
    model: 'gemini-2.0-flash',
    fallbackModels: ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite'],
    quotaLimit: 100,
  },
  SISMONEV: {
    apiKey: process.env.SISMONEV_AI_KEY,
    apiKeys: [process.env.SISMONEV_AI_KEY, process.env.GEMINI_API_KEY_PAUD].filter(Boolean),
    systemPrompt: `Anda adalah asisten AI untuk Sismonev (Sistem Monitoring dan Evaluasi).
Fokus pada evaluasi kinerja, monitoring program, dan kepatuhan regulasi.`,
    model: 'gemini-2.0-flash',
    fallbackModels: ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite'],
    quotaLimit: 100
  },
  GENERAL: {
    apiKey: process.env.GEMINI_API_KEY_PAUD,
    apiKeys: [process.env.GEMINI_API_KEY_PAUD].filter(Boolean),
    systemPrompt: 'Anda adalah asisten cerdas untuk PAUD HI.',
    model: 'gemini-2.0-flash',
    fallbackModels: ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite']
  }
};

class AIConfigManager {
  static getConfig(appSource) {
    const key = appSource ? appSource.toUpperCase() : 'GENERAL';
    const config = AI_CONFIG[key] || AI_CONFIG.GENERAL;
    
    // Strict check for API Key presence
    if (!config.apiKey) {
      // If SISMONEV key missing, maybe fallback to GENERAL if allowed, or throw error.
      // For strict isolation, we should probably warn or fail if key is missing for specific tenant.
      console.warn(`[AIConfig] Missing API Key for ${key}.`);
    }
    
    return {
      ...config,
      appSource: key 
    };
  }
}

module.exports = AIConfigManager;
