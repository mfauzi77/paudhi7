export async function callGeminiAPI(userPrompt) {
  const systemPrompt = `
    Kamu adalah asisten AI yang ramah dan profesional. 
    Fokuskan seluruh jawaban hanya pada topik seputar pengasuhan anak, seperti parenting, tumbuh kembang anak, komunikasi keluarga, pengasuhan positif, dan pendidikan anak usia dini.
    Abaikan dan tolak hal-hal di luar topik pengasuhan dengan sopan.
  `;

   const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCVA2DZYzfqEfPh40ZErYiAlsDE_lWBOwU', 
    {
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
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Tidak ada jawaban dari AI.";
}
