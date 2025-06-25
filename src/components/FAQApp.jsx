import React, { useState } from 'react';

const FAQApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const quickLinks = [
    {
      href: "#daftar",
      icon: "fas fa-user-plus",
      title: "Cara Daftar",
      description: "Panduan lengkap mendaftarkan anak"
    },
    {
      href: "#lokasi", 
      icon: "fas fa-map-marker-alt",
      title: "Cari Lokasi",
      description: "Temukan PAUD terdekat dari rumah"
    },
    {
      href: "#layanan",
      icon: "fas fa-heart", 
      title: "Layanan Apa Saja",
      description: "Program yang bisa diikuti anak"
    },
    {
      href: "#bantuan",
      icon: "fas fa-headset",
      title: "Butuh Bantuan", 
      description: "Hubungi customer service"
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'dasar', label: 'Info Dasar' },
    { id: 'daftar', label: 'Cara Daftar' },
    { id: 'praktis', label: 'Tips Praktis' },
    { id: 'masalah', label: 'Solusi Masalah' },
    { id: 'teknis', label: 'Bantuan Website' },
    { id: 'pemerintah', label: 'Untuk Penyelenggara' }
  ];

  const generalFAQs = [
    {
      id: 'paud-hi-explanation',
      category: 'dasar',
      question: 'PAUD HI itu apa sih? Kok beda sama TK biasa?',
      answer: (
        <div>
          <strong>PAUD HI itu program lengkap dari pemerintah untuk anak 0-6 tahun.</strong>
          <br />
          <br />
          <strong>Bedanya dengan TK biasa:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>TK biasa:</strong> Fokus cuma belajar dan main</li>
            <li><strong>PAUD HI:</strong> Lengkap! Ada kesehatan, gizi, pendidikan, plus bimbingan untuk orang tua</li>
          </ul>
          
        <div className="h-32" /> {/* spacer */}
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
  <strong>💡 Singkatnya:</strong> PAUD HI itu seperti "paket komplit" buat anak. Ga cuma sekolah, tapi juga dipantau kesehatannya, gizinya, dan orang tua dapat tips mengasuh anak.
</div>

          
          <strong>Yang anak Anda dapat:</strong>
          <ul className="list-disc ml-5 mt-4">
            <li>✅ Cek kesehatan rutin + imunisasi gratis</li>
            <li>✅ Main sambil belajar dengan teman-teman</li>
            <li>✅ Orang tua dapat tips cara mengasuh anak</li>
            <li>✅ Konsultasi gratis kalau ada masalah</li>
          </ul>
        </div>
      )
    },
    {
      id: 'free-services',
      category: 'dasar',
      question: 'Beneran gratis atau ada biaya tersembunyi?',
      answer: (
        <div>
          <strong>Yang GRATIS 100%:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>✅ Semua layanan di Posyandu</li>
            <li>✅ Imunisasi lengkap</li>
            <li>✅ Cek tumbuh kembang anak</li>
            <li>✅ Konsultasi kesehatan</li>
            <li>✅ Bimbingan parenting untuk orang tua</li>
            <li>✅ Makanan tambahan (PMT) kalau ada program</li>
          </ul>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4 rounded-r-lg">
            <strong>⚠️ Hati-hati!</strong>
            <br />
            Kalau ada yang minta bayar untuk layanan Posyandu atau imunisasi, itu tidak benar. Lapor ke nomor pengaduan!
          </div>
        </div>
      )
    },
    {
      id: 'registration-process',
      category: 'daftar',
      question: 'Gimana cara daftarnya? Ribet ga?',
      answer: (
        <div>
          <strong>Ada 3 cara, pilih yang paling mudah:</strong>
          <br />
          <br />
          <strong>🏥 Cara 1: Langsung ke tempat (paling mudah)</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Datang ke Posyandu/Puskesmas/PAUD terdekat</li>
            <li>Bilang mau daftar PAUD HI</li>
            <li>Bawa KTP, KK, Akta Lahir anak</li>
            <li>Isi formulir (dibantu petugas)</li>
            <li>Selesai! Dapat jadwal kontrol</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>🚀 Tips:</strong> Kalau bingung, pilih cara 1 atau 3. Petugas/kader pasti bantuin sampai selesai!
          </div>
        </div>
      )
    },
    {
      id: 'shy-child-tips',
      category: 'praktis',
      question: 'Anak saya pemalu/nangis terus, gimana?',
      answer: (
        <div>
          <strong>Normal kok! Banyak anak begitu di awal.</strong>
          <br />
          <br />
          <strong>🤗 Tips untuk anak pemalu:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Datang lebih awal, biarkan anak adaptasi pelan-pelan</li>
            <li>Ajak main dulu di rumah sebelum ke PAUD</li>
            <li>Bawa mainan kesukaan dari rumah</li>
            <li>Minta guru untuk pendekatan khusus</li>
            <li>Jangan dipaksa, beri waktu 2-4 minggu untuk adaptasi</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>💡 Trik jitu orang tua berpengalaman:</strong>
            <br />
            • Ceritakan hal seru tentang PAUD sebelum berangkat
            <br />
            • Buat rutinitas menyenangkan (misal: sarapan es krim dulu)
            <br />
            • Ajak teman sebaya kalau memungkinkan
            <br />
            • Puji anak setiap kemajuan kecil
          </div>
        </div>
      )
    },
    {
      id: 'old-phone-solution',
      category: 'teknis',
      question: 'HP saya jadul, ga bisa buka website. Gimana solusinya?',
      answer: (
        <div>
          <strong>Tenang! Ada banyak cara lain.</strong>
          <br />
          <br />
          <strong>📱 Alternatif tanpa internet:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>SMS Gateway:</strong> Kirim SMS ke 8899 (gratis)</li>
            <li><strong>Telepon:</strong> Hubungi 1500-PAUD (1500-7283)</li>
            <li><strong>Datang langsung:</strong> Ke Posyandu/Puskesmas terdekat</li>
            <li><strong>Lewat kader:</strong> Minta bantuan kader RT/RW</li>
          </ul>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <strong>📋 Yang bisa dilakukan tanpa internet:</strong>
            <ul className="list-disc ml-5 mt-2">
              <li>Daftar anak ke program PAUD HI</li>
              <li>Dapat informasi jadwal kegiatan</li>
              <li>Konsultasi masalah anak</li>
              <li>Dapat tips parenting</li>
              <li>Lapor masalah/keluhan</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'complaint-service',
      category: 'masalah',
      question: 'Pelayanan di tempat saya kurang bagus, mau lapor kemana?',
      answer: (
        <div>
          <strong>Jangan ragu untuk lapor! Ini hak Anda.</strong>
          <br />
          <br />
          <strong>📱 Cara lapor yang mudah:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>WhatsApp:</strong> 0811-1500-PAUD (paling cepat)</li>
            <li><strong>Telepon:</strong> 1500-PAUD (gratis 24 jam)</li>
            <li><strong>Website:</strong> Menu "Pengaduan" di simonevpaud.kemenko.go.id</li>
            <li><strong>SMS:</strong> Kirim ke 8899</li>
          </ul>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <strong>⚡ Jenis masalah yang sering dilaporkan:</strong>
            <ul className="list-disc ml-5 mt-2">
              <li>Petugas tidak ramah/kasar</li>
              <li>Diminta bayar untuk layanan gratis</li>
              <li>Jadwal tidak sesuai yang dijanjikan</li>
              <li>Fasilitas kotor/tidak layak</li>
              <li>Obat/vaksin kosong terus</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const governmentFAQs = [
    {
      id: 'arad-requirement',
      category: 'pemerintah',
      question: 'Apakah daerah wajib menyusun aRAD PAUD HI?',
      answer: (
        <div>
          <strong>Ya, setiap daerah direkomendasikan menyusun aRAD (agenda Rencana Aksi Daerah) PAUD HI sebagai panduan implementasi.</strong>
          <br />
          <br />
          <strong>📋 aRAD PAUD HI berisi:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Analisis situasi anak usia dini di daerah</li>
            <li>Target dan indikator pencapaian PAUD HI</li>
            <li>Program dan kegiatan prioritas</li>
            <li>Pembagian peran lintas sektor</li>
            <li>Timeline implementasi 5 tahun</li>
            <li>Alokasi anggaran dan sumber pendanaan</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>💡 Manfaat aRAD PAUD HI:</strong>
            <br />
            • Panduan koordinasi lintas OPD
            <br />
            • Dasar perencanaan anggaran APBD
            <br />
            • Alat monitoring dan evaluasi
            <br />
            • Legitimasi program di tingkat daerah
          </div>
          
          <strong>🏛️ Payung hukum yang diperlukan:</strong>
          <ul className="list-disc ml-5 mt-4">
            <li><strong>Perda/Pergub:</strong> Penyelenggaraan PAUD HI Daerah</li>
            <li><strong>Perwal/Perbup:</strong> Pembentukan Gugus Tugas Daerah</li>
            <li><strong>SK Kepala Daerah:</strong> Penetapan aRAD PAUD HI</li>
          </ul>
        </div>
      )
    },
    {
      id: 'implementation-stages',
      category: 'pemerintah',
      question: 'Bagaimana tahapan penyusunan PAUD HI di daerah?',
      answer: (
        <div>
          <strong>Ada 6 tahapan sistematis yang harus dilakukan:</strong>
          <br />
          <br />
          <strong>🔍 Tahap 1: Analisis Situasi (Bulan 1-2)</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Mapping jumlah anak usia dini per wilayah</li>
            <li>Inventarisasi layanan PAUD HI yang ada</li>
            <li>Identifikasi gap layanan dan coverage</li>
            <li>Analisis SDM dan kapasitas institusi</li>
            <li>Review anggaran dan alokasi sumber daya</li>
          </ul>
          
          <strong>🎯 Tahap 2: Penetapan Target (Bulan 3)</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Target cakupan layanan per tahun</li>
            <li>Indikator kualitas layanan</li>
            <li>Milestone pencapaian 5 tahun</li>
            <li>Prioritas wilayah dan kelompok sasaran</li>
          </ul>
          
          <strong>🤝 Tahap 3: Pembentukan Gugus Tugas (Bulan 3-4)</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>SK pembentukan Gugus Tugas Daerah</li>
            <li>Penetapan struktur dan job description</li>
            <li>MoU kerjasama lintas OPD</li>
            <li>Pembentukan sekretariat bersama</li>
          </ul>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <strong>✅ Tools pendukung yang disediakan Pusat:</strong>
            <ul className="list-disc ml-5 mt-2">
              <li>Template aRAD PAUD HI</li>
              <li>Panduan teknis implementasi</li>
              <li>Sistem SIMONEV nasional</li>
              <li>Bimbingan teknis berkala</li>
              <li>Sharing best practices antar daerah</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'governance-strengthening',
      category: 'pemerintah',
      question: 'Bagaimana menguatkan tata kelola PAUD HI di daerah?',
      answer: (
        <div>
          <strong>Penguatan tata kelola dilakukan melalui 5 pilar utama:</strong>
          <br />
          <br />
          <strong>🏛️ Pilar 1: Kelembagaan yang Kuat</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>Gugus Tugas Daerah:</strong> Berfungsi optimal dengan sekretariat tetap</li>
            <li><strong>Focal Point OPD:</strong> Setiap OPD ada PIC khusus PAUD HI</li>
            <li><strong>Forum Koordinasi:</strong> Rapat rutin minimal sebulan sekali</li>
            <li><strong>Tim Teknis:</strong> Tim operasional untuk implementasi lapangan</li>
          </ul>
          
          <strong>📊 Pilar 2: Sistem Data dan Informasi</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>Database terintegrasi:</strong> Satu data anak usia dini se-daerah</li>
            <li><strong>Dashboard real-time:</strong> Monitoring progress secara online</li>
            <li><strong>Pelaporan berkala:</strong> Bulanan, triwulan, dan tahunan</li>
            <li><strong>Early warning system:</strong> Alert otomatis jika ada masalah</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>🎯 Indikator tata kelola yang baik:</strong>
            <br />
            • Koordinasi lintas sektor berjalan lancar
            <br />
            • Data akurat dan update real-time
            <br />
            • Anggaran terserap optimal (90%)
            <br />
            • Komplain masyarakat minimal (2%)
            <br />
            • Target coverage tercapai sesuai timeline
          </div>
        </div>
      )
    }
  ];

  const contactMethods = [
    {
      href: "tel:1500-7283",
      icon: "fas fa-phone",
      label: "Telepon Gratis",
      type: "phone"
    },
    {
      href: "https://wa.me/6281115007283",
      icon: "fab fa-whatsapp", 
      label: "WhatsApp",
      type: "whatsapp"
    },
    {
      href: "mailto:help@simonevpaud.kemenko.go.id",
      icon: "fas fa-envelope",
      label: "Email", 
      type: "email"
    },
    {
      href: "#",
      icon: "fas fa-comments",
      label: "Chat Online",
      type: "chat"
    }
  ];

  const handleQuickLinkClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = (e, contact) => {
    if (contact.type === 'chat') {
      e.preventDefault();
      alert('Fitur chat online akan segera tersedia!');
    }
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  const isVisible = (faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    
    if (searchTerm) {
      const questionText = faq.question.toLowerCase();
      return questionText.includes(searchTerm.toLowerCase());
    }
    
    return true;
  };

  const visibleGeneralFAQs = generalFAQs.filter(isVisible);
  const visibleGovFAQs = governmentFAQs.filter(isVisible);
  const hasResults = visibleGeneralFAQs.length > 0 || visibleGovFAQs.length > 0;

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const FAQItem = ({ faq, isGovernment = false }) => (
    <div className={`border rounded-xl mb-4 overflow-hidden transition-all duration-200 hover:shadow-lg ${isGovernment ? 'border-purple-200' : 'border-gray-200'}`}>
      <div 
        className={`p-5 cursor-pointer flex justify-between items-center font-semibold transition-all duration-200 ${
          openFAQ === faq.id 
            ? isGovernment 
              ? 'bg-purple-50 text-purple-700' 
              : 'bg-blue-50 text-blue-700'
            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
        }`}
        onClick={() => toggleFAQ(faq.id)}
      >
        <span 
          dangerouslySetInnerHTML={{ 
            __html: highlightText(faq.question, searchTerm) 
          }}
        />
        <i className={`fas fa-chevron-down transition-transform duration-200 ${openFAQ === faq.id ? 'rotate-180' : ''} ${
          openFAQ === faq.id 
            ? isGovernment ? 'text-purple-700' : 'text-blue-700'
            : 'text-gray-400'
        }`}></i>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${openFAQ === faq.id ? 'max-h-screen p-6' : 'max-h-0 p-0'}`}>
        <div className="text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      {/* Header */}
      <div className="max-w-6xl mx-auto p-5 mt-20">
        <div className="bg-gradient-to-br from-blue-500 to-blue-800 text-white p-12 text-center mb-10 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <i className="fas fa-question-circle mr-3"></i>
            Tanya Jawab PAUD HI
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Punya pertanyaan tentang program PAUD untuk anak Anda? Temukan jawabannya di sini dengan bahasa yang mudah dipahami!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleQuickLinkClick(e, link.href)}
              className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl no-underline text-inherit"
            >
              <div className="text-5xl mb-4 text-blue-500 transition-transform duration-200 hover:scale-110">
                <i className={link.icon}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </a>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <div className="relative max-w-2xl mx-auto mb-6">
            <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Ketik pertanyaan Anda, misalnya: anak umur 3 tahun"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 border-2 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 ${
                  activeCategory === category.id
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-6xl mx-auto px-5">
        {/* FAQ Section Umum */}
        {(activeCategory === 'all' || activeCategory !== 'pemerintah') && visibleGeneralFAQs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10" id="faq-umum">
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 flex items-center gap-3">
              <i className="fas fa-baby text-2xl"></i>
              <h2 className="text-2xl font-bold">Pertanyaan yang Sering Ditanyakan</h2>
            </div>
            <div className="p-8">
              {visibleGeneralFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section Pemerintah */}
        {(activeCategory === 'all' || activeCategory === 'pemerintah') && visibleGovFAQs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10" id="faq-pemerintah">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 flex items-center gap-3">
              <i className="fas fa-building text-2xl"></i>
              <h2 className="text-2xl font-bold">Untuk Penyelenggara dan Pemerintah Daerah</h2>
            </div>
            <div className="p-8">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-6">
                <h3 className="text-purple-700 font-semibold mb-2 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  Informasi Khusus Penyelenggara
                </h3>
                <p className="text-purple-600 text-sm">
                  Section ini ditujukan untuk pemerintah daerah, OPD terkait, mitra pembangunan, dan stakeholder yang terlibat dalam penyelenggaraan PAUD HI. 
                  Berisi panduan implementasi, tata kelola, koordinasi lintas sektor, dan penguatan sistem.
                </p>
              </div>
              
              {visibleGovFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} isGovernment={true} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!hasResults && (
          <div className="text-center py-15 text-gray-600" id="noResults">
            <i className="fas fa-search text-5xl mb-4 text-gray-300"></i>
            <h3 className="text-xl mb-2">Pertanyaan tidak ditemukan</h3>
            <p>Coba gunakan kata kunci yang berbeda, atau langsung hubungi customer service untuk bantuan.</p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-5 mb-10">
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-10 rounded-2xl text-center" id="bantuan">
          <h3 className="text-3xl font-bold mb-4">
            <i className="fas fa-headset mr-3"></i>
            Masih Ada Pertanyaan?
          </h3>
          <p className="mb-6 opacity-90 text-lg">
            Tim customer service kami siap membantu Anda 24/7 dengan bahasa yang mudah dipahami!
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            {contactMethods.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                onClick={(e) => handleContactClick(e, contact)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-700 border-none rounded-lg font-semibold no-underline transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-2xl"
                target={contact.type === 'whatsapp' ? '_blank' : undefined}
                rel={contact.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
              >
                <i className={contact.icon}></i>
                {contact.label}
              </a>
            ))}
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            <p>📞 Call Center: 1500-PAUD (1500-7283) - Gratis dari seluruh Indonesia</p>
            <p>📧 Email: help@simonevpaud.kemenko.go.id</p>
            <p>📱 SMS: Kirim ke 8899 (gratis)</p>
          </div>
        </div>
        
        {/* Additional Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-blue-600 text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Jam Operasional</h4>
              <p className="text-gray-600 text-sm">
                Senin - Jumat: 08.00 - 17.00 WIB
                <br />
                Sabtu - Minggu: 08.00 - 15.00 WIB
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-language text-green-600 text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Bahasa</h4>
              <p className="text-gray-600 text-sm">
                Bahasa Indonesia
                <br />
                Bahasa Daerah (sesuai kebutuhan)
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Privasi</h4>
              <p className="text-gray-600 text-sm">
                Data Anda aman & terlindungi
                <br />
                Sesuai standar keamanan pemerintah
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mt-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            Tips Menghubungi Customer Service
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700 mb-1">📋 Siapkan informasi berikut:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Nama lengkap anak</li>
                <li>Nomor KK atau NIK</li>
                <li>Alamat lengkap</li>
                <li>Keluhan atau pertanyaan spesifik</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">⚡ Untuk respon cepat:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Gunakan WhatsApp untuk chat langsung</li>
                <li>Telepon di jam kerja (08.00-17.00)</li>
                <li>Jelaskan masalah dengan detail</li>
                <li>Sertakan foto jika diperlukan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQApp;