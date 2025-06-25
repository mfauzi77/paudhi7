// geminiAPI-PAUD.js - API Integration untuk SISMONEV PAUD HI

// FAQ Data untuk fallback dan context
const faqData = [
  {
    id: 1,
    question: "Apa itu PAUD HI?",
    answer: "PAUD HI (Pengembangan Anak Usia Dini Holistik Integratif) adalah pendekatan layanan pengembangan anak usia dini yang mencakup kebutuhan esensial anak usia 0-6 tahun secara menyeluruh dan terpadu. Kebutuhan tersebut meliputi kesehatan, gizi, pengasuhan, pendidikan, dan perlindungan, melalui keterlibatan lintas sektor.",
    keywords: ["paud hi", "pengembangan anak", "holistik integratif", "usia dini"]
  },
  {
    id: 2,
    question: "Apa tujuan utama PAUD HI?",
    answer: "Tujuan PAUD HI adalah memastikan setiap anak usia dini tumbuh dan berkembang secara optimal melalui layanan yang terpadu, berkualitas, dan mudah diakses oleh keluarga dan masyarakat.",
    keywords: ["tujuan", "optimal", "berkembang", "layanan terpadu"]
  },
  {
    id: 3,
    question: "Apa itu SISMONEV PAUD HI?",
    answer: "SISMONEV PAUD HI adalah Sistem Informasi, Monitoring, dan Evaluasi nasional yang menyediakan platform digital terintegrasi untuk memantau pelaksanaan program PAUD HI lintas sektor secara efektif dan real time.",
    keywords: ["sismonev", "sistem informasi", "monitoring", "evaluasi", "platform digital"]
  },
  {
    id: 4,
    question: "Kementerian/Lembaga mana saja yang terlibat dalam PAUD HI?",
    answer: "PAUD HI melibatkan berbagai Kementerian/Lembaga, antara lain: Kemenko PMK (koordinasi), Kemendikbudristek, Kemenkes, KemenPPPA, Kemensos, Kemenag, Kementerian Desa PDTT, KemenPUPR, Kemendagri, BKKBN, BPOM, Bappenas, dll.",
    keywords: ["kementerian", "lembaga", "kemenko pmk", "kemendikbudristek", "kemenkes"]
  },
  {
    id: 5,
    question: "Apa saja indikator utama dalam PAUD HI?",
    answer: "Indikator PAUD HI mencakup: Akses anak terhadap layanan PAUD, Status gizi dan kesehatan anak, Akses terhadap sanitasi dan air bersih, Layanan pengasuhan dan perlindungan anak, Partisipasi keluarga dan masyarakat.",
    keywords: ["indikator", "akses", "gizi", "kesehatan", "sanitasi", "pengasuhan", "partisipasi"]
  },
  {
    id: 6,
    question: "Bagaimana cara menggunakan SISMONEV PAUD HI?",
    answer: "SISMONEV dapat diakses oleh K/L, pemerintah daerah, dan mitra lainnya melalui akun login masing-masing. Melalui dashboard admin, pengguna bisa: Menginput berita kegiatan PAUD HI, Memasukkan data statistik, Memantau indikator lintas sektor, Melihat laporan dan grafik perkembangan.",
    keywords: ["cara menggunakan", "akses", "login", "dashboard", "input data"]
  },
  {
    id: 7,
    question: "Apa manfaat SISMONEV PAUD HI bagi pemerintah dan masyarakat?",
    answer: "Manfaat SISMONEV PAUD HI: Menyediakan data real-time dan terintegrasi, Meningkatkan koordinasi lintas sektor, Membantu perencanaan program berbasis data, Mendukung kebijakan pembangunan anak usia dini.",
    keywords: ["manfaat", "real-time", "koordinasi", "perencanaan", "kebijakan"]
  },
  {
    id: 8,
    question: "Apakah ada inovasi dalam implementasi PAUD HI?",
    answer: "Ya. PAUD HI terus dikembangkan melalui: Sistem Early Warning System (EWS), Integrasi dengan Google Sheets dan WhatsApp untuk monitoring lapangan, Dashboard analisis data yang user-friendly, Pendekatan berbasis budaya lokal.",
    keywords: ["inovasi", "early warning", "google sheets", "whatsapp", "dashboard", "budaya lokal"]
  },
  {
    id: 9,
    question: "Bagaimana strategi pembiayaan PAUD HI?",
    answer: "Pembiayaan PAUD HI berasal dari APBN, APBD, serta sumber dana lain yang sah. K/L dan daerah juga diharapkan mengalokasikan anggaran untuk program PAUD HI sesuai kewenangannya.",
    keywords: ["pembiayaan", "apbn", "apbd", "anggaran", "alokasi"]
  },
  {
    id: 10,
    question: "Bagaimana cara mendukung program PAUD HI di daerah?",
    answer: "Cara mendukung program PAUD HI di daerah: Mengintegrasikan layanan PAUD HI dalam RPJMD dan Renstra Daerah, Memperkuat koordinasi lintas sektor daerah, Melibatkan masyarakat dan kader dalam implementasi, Menggunakan data SISMONEV untuk intervensi yang tepat sasaran.",
    keywords: ["dukung program", "daerah", "rpjmd", "koordinasi", "masyarakat", "kader", "intervensi"]
  }
];

export async function callGeminiAPI(userPrompt) {
  // System prompt yang fokus pada PAUD HI dan pengasuhan anak
  const systemPrompt = `
   Kamu adalah chatbot pakar dalam bidang Pengasuhan dan Pengembangan Anak Usia Dini (PAUD) yang dirancang untuk mendampingi orang tua, guru PAUD, kader posyandu, dan pengambil kebijakan dalam memberikan perawatan dan stimulasi terbaik bagi anak usia 0–6 tahun. Jawabanmu harus berbasis bukti ilmiah terkini dan dapat dipertanggungjawabkan secara akademik dan praktis.

Tugas dan prinsip utama kamu:
- Memberikan jawaban akurat dan berdasarkan penelitian ilmiah atau panduan dari lembaga terpercaya seperti WHO, UNICEF, CDC, Ikatan Dokter Anak Indonesia (IDAI), dan Kementerian Kesehatan RI.
- Menyampaikan informasi dengan bahasa yang mudah dipahami, empatik, dan tidak menghakimi.
- Selalu memberikan disclaimer jika pertanyaan menyentuh ranah medis, psikologis, atau gizi klinis — sarankan untuk berkonsultasi dengan profesional berlisensi.
- Memahami konteks sosial, budaya, dan kebijakan nasional Indonesia terkait PAUD, seperti Standar Nasional PAUD, Buku KIA, Bina Keluarga Balita, Posyandu, dan Kurikulum Merdeka.
- Mampu menyesuaikan jawaban berdasarkan usia anak (0–6 tahun), tahapan tumbuh kembang, dan kebutuhan spesifik (seperti MP-ASI, imunisasi, keterlambatan bicara, atau pengasuhan positif).

Saat menjawab, gunakan pendekatan ilmiah namun komunikatif. Jika ada perbedaan panduan antar negara, prioritaskan pendekatan yang relevan dengan konteks Indonesia. Jangan membuat asumsi tanpa dasar ilmiah. Jika informasi belum tersedia atau masih kontroversial, jujurlah menyatakan demikian.

Contoh sub-bidang yang kamu kuasai:
- Perkembangan anak: motorik kasar & halus, kognitif, bahasa, sosial-emosi
- Gizi dan MP-ASI: rekomendasi WHO & IDAI, panduan lokal Indonesia
- Imunisasi, tumbuh kembang, dan deteksi dini masalah kesehatan
- Strategi stimulasi dini berbasis bermain dan cinta kasih
- Pendidikan anak usia dini dan transisi PAUD ke SD
- Pengasuhan positif dan perlindungan anak dari kekerasan

- jangan memberikan jawaban spekulatif atau mitos. Fokuslah pada edukasi berbasis bukti (*evidence-based parenting*). Prioritaskan keselamatan, kesejahteraan, dan tumbuh kembang anak.
    -Fokuskan seluruh jawaban hanya pada topik, Abaikan dan tolak hal-hal di luar topik pengasuhan dengan sopan.
- Jika pertanyaan tidak relevan dengan PAUD HI atau pengasuhan, tolak dengan sopan dan arahkan ke sumber yang tepat.

    FOKUS UTAMA:
    - Berikan jawaban yang ramah, informatif, dan mudah dipahami
    - Gunakan bahasa Indonesia yang sesuai dengan konteks keluarga Indonesia
    - Jika tidak yakin tentang informasi spesifik, arahkan pengguna untuk menghubungi staf melalui WhatsApp (0811-1234-5678) atau formulir kontak
    - Selalu berikan saran praktis dan dapat diterapkan
    - Integrasikan informasi PAUD HI dalam konteks pengasuhan sehari-hari


    INFORMASI KONTAK:
    - Jam operasional: Senin-Jumat 08:00-17:00 WIB, Sabtu 08:00-12:00 WIB, Minggu Tutup
    - Hotline Darurat: 129 (24/7)
    - WhatsApp Support: 0811-1234-5678
    - Chatbot tersedia 24/7

    DATABASE PENGETAHUAN PAUD HI:
    ${faqData.map(faq => `${faq.question}: ${faq.answer}`).join('\n')}

    Jawab dengan ramah dan profesional dalam bahasa Indonesia.
  `;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCVA2DZYzfqEfPh40ZErYiAlsDE_lWBOwU', {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Tidak ada jawaban dari AI.";
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback ke FAQ jika API gagal
    const relevantFAQ = searchFAQ(userPrompt);
    if (relevantFAQ.length > 0) {
      const bestMatch = relevantFAQ[0];
      return `📋 Berdasarkan FAQ PAUD HI:\n\n**${bestMatch.question}**\n\n${bestMatch.answer}\n\n💡 *AI sedang tidak tersedia, jawaban dari database FAQ.*`;
    }
    
    return `❌ Maaf, AI sedang mengalami gangguan dan saya tidak menemukan informasi spesifik di FAQ.\n\n💡 Silakan:\n• Hubungi staf via WhatsApp: 0811-1234-5678\n• Isi form kontak untuk bantuan lebih lanjut\n• Coba pertanyaan dengan kata kunci yang berbeda`;
  }
}

// Fungsi untuk mencari FAQ yang relevan
function searchFAQ(query) {
  const queryLower = query.toLowerCase();
  return faqData.filter(faq => 
    faq.question.toLowerCase().includes(queryLower) ||
    faq.answer.toLowerCase().includes(queryLower) ||
    faq.keywords.some(keyword => queryLower.includes(keyword.toLowerCase()))
  );
}

// Export FAQ data untuk digunakan di komponen lain
export { faqData, searchFAQ };