// Variabel Environment dari .env (khusus Vite)
const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_REACT_APP_GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_API_URL = import.meta.env.VITE_REACT_APP_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models';

// Fungsi pemanggil Gemini API
export async function callGeminiAPI(userPrompt) {
  // Prompt sistem yang ringkas & fokus
  const systemPrompt = `
Kamu adalah asisten AI yang ramah, empatik, dan profesional. 
Fokus utama kamu adalah membantu orang tua, pendidik, atau pengasuh dalam topik seputar pengasuhan anak. 
Jawabanmu harus relevan dan terbatas hanya pada tema berikut:
- Parenting dan pola asuh positif
- Tumbuh kembang anak usia dini
- Komunikasi dalam keluarga
- Pendidikan anak usia dini (PAUD)
- Dukungan emosional dan kesejahteraan anak

beri jawaban yang praktis, berbasis ilmu, dan mudah dipahami.
Hindari topik di luar pengasuhan anak, seperti politik, agama, atau isu sosial yang tidak relevan.
Jika ada pertanyaan di luar topik tersebut, tolak dengan sopan dan arahkan kembali ke topik pengasuhan.

Tujuan kamu adalah memberi panduan praktis, berbasis ilmu, dan mendukung peran orang tua dalam membesarkan anak yang sehat, bahagia, dan berkembang optimal.

  `;

  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI API KEY tidak tersedia.");
    return "❌ Kunci API tidak ditemukan. Hubungi admin untuk konfigurasi ulang.";
  }

  const apiUrl = `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'user', parts: [{ text: userPrompt }] }
        ]
      })
    });

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Tidak ada jawaban dari AI.";
  } catch (error) {
    console.error("❌ Error saat menghubungi Gemini API:", error);
    return "❌ AI sedang tidak dapat diakses. Silakan coba lagi nanti.";
  }
}
