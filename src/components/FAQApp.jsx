import React, { useState } from 'react';
import Footer from './Footer';
// Footer placeholder component

const FAQApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

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
      question: 'Apa itu PAUD HI?',
      answer: (
        <div>
          <strong>PAUD HI (Pengembangan Anak Usia Dini Holistik Integratif) adalah program layanan lengkap untuk anak usia 0–6 tahun yang mencakup pendidikan, kesehatan, gizi, perlindungan, dan pengasuhan.</strong>
          <br />
          <br />
          <strong>Karakteristik PAUD HI:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Layanan dilakukan secara <strong>terpadu dan terkoordinasi</strong> oleh berbagai sektor</li>
            <li>Memastikan setiap anak bisa tumbuh dan berkembang secara optimal</li>
            <li>Tidak hanya fokus pada kegiatan belajar di sekolah</li>
            <li>Memastikan anak mendapatkan imunisasi, cek kesehatan, asupan gizi yang cukup</li>
            <li>Memberikan dukungan bagi orang tua dalam mengasuh anak</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg ">
            <strong>💡 Singkatnya:</strong> PAUD HI adalah layanan "paket komplit" yang dilakukan melalui kerjasama antara pemerintah daerah, satuan PAUD, dan lembaga terkait lainnya.
          </div>
        </div>
      )
    },
    {
      id: 'who-organizes',
      category: 'dasar',
      question: 'Siapa yang menyelenggarakan PAUD HI?',
      answer: (
        <div>
          <strong>PAUD HI dilaksanakan oleh satuan PAUD di daerah dengan dukungan penuh dari pemerintah daerah melalui gugus tugas PAUD HI.</strong>
          <br />
          <br />
          <strong>Koordinasi melibatkan banyak sektor:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>✅ Sektor Pendidikan</li>
            <li>✅ Sektor Kesehatan</li>
            <li>✅ Sektor Perlindungan Anak</li>
            <li>✅ Sektor Gizi dan Ketahanan Pangan</li>
            <li>✅ Sektor lainnya yang terkait</li>
          </ul>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 rounded-r-lg">
            <strong>🤝 Kerjasama Lintas Sektor:</strong>
            <br />
            Semua pihak bekerja sama untuk memastikan layanan PAUD HI berjalan efektif dan terintegrasi di setiap daerah.
          </div>
        </div>
      )
    },
    {
      id: 'paud-hi-goals',
      category: 'dasar',
      question: 'Apa tujuan dari PAUD HI?',
      answer: (
        <div>
          <strong>Tujuan utama PAUD HI adalah memastikan setiap anak usia dini mendapatkan layanan esensial secara menyeluruh agar tumbuh optimal.</strong>
          <br />
          <br />
          <strong>🎯 Aspek perkembangan yang ditargetkan:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li><strong>Fisik:</strong> Pertumbuhan badan, kesehatan, dan motorik</li>
            <li><strong>Kognitif:</strong> Kemampuan berpikir dan belajar</li>
            <li><strong>Emosional:</strong> Pengelolaan perasaan dan karakter</li>
            <li><strong>Sosial:</strong> Kemampuan berinteraksi dengan orang lain</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>🚀 Komitmen Pemerintah:</strong>
            <br />
            Pemerintah mendorong daerah untuk meningkatkan layanan ini agar lebih berkualitas dan terintegrasi di seluruh Indonesia.
          </div>
        </div>
      )
    },
    {
      id: 'benefits-for-families',
      category: 'praktis',
      question: 'Apa manfaat PAUD HI untuk anak dan keluarga?',
      answer: (
        <div>
          <strong>PAUD HI memberikan manfaat komprehensif untuk anak dan keluarga:</strong>
          <br />
          <br />
          <strong>🧒 Manfaat untuk Anak:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Mendapatkan layanan lengkap yang mendukung tumbuh kembang optimal</li>
            <li>Akses ke pendidikan, kesehatan, gizi, dan perlindungan dalam satu sistem</li>
            <li>Stimulasi yang tepat sesuai usia dan kebutuhan</li>
            <li>Deteksi dini masalah tumbuh kembang</li>
          </ul>
          
          <strong>👨‍👩‍👧‍👦 Manfaat untuk Keluarga:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Orang tua dibekali pengetahuan pengasuhan yang tepat</li>
            <li>Kemudahan mengakses layanan kesehatan, gizi, dan perlindungan anak</li>
            <li>Semua layanan tersedia di satu tempat (one-stop service)</li>
            <li>Dukungan komunitas dalam pengasuhan anak</li>
          </ul>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 rounded-r-lg">
            <strong>💡 Keunggulan Utama:</strong>
            <br />
            Layanan terintegrasi memudahkan keluarga dan memastikan tidak ada aspek penting yang terlewat dalam tumbuh kembang anak.
          </div>
        </div>
      )
    },
    {
      id: 'central-government-role',
      category: 'pemerintah',
      question: 'Bagaimana pemerintah pusat berperan?',
      answer: (
        <div>
          <strong>Kemendikbudristek melalui Direktorat PAUD bekerja sama dengan dinas pendidikan kabupaten/kota untuk mendorong pelaksanaan PAUD HI di daerah.</strong>
          <br />
          <br />
          <strong>🏛️ Peran Pemerintah Pusat:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Memberikan panduan dan kebijakan PAUD HI nasional</li>
            <li>Melakukan pembinaan kepada satuan PAUD</li>
            <li>Memfasilitasi koordinasi lintas sektor</li>
            <li>Menyediakan dukungan teknis dan capacity building</li>
            <li>Monitoring dan evaluasi implementasi di daerah</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>🎯 Fokus Utama:</strong>
            <br />
            Memastikan layanan PAUD HI bisa berjalan efektif dan berkualitas di seluruh Indonesia melalui kerjasama yang solid antara pusat dan daerah.
          </div>
        </div>
      )
    },
    {
      id: 'success-indicators',
      category: 'pemerintah',
      question: 'Apa indikator keberhasilan program PAUD HI?',
      answer: (
        <div>
          <strong>Program PAUD HI dianggap berhasil jika memenuhi indikator-indikator berikut:</strong>
          <br />
          <br />
          <strong>📊 Indikator Cakupan Layanan:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Semua anak usia dini mendapatkan layanan dasar (pendidikan, gizi, kesehatan, perlindungan)</li>
            <li>Layanan dilakukan secara terintegrasi, tidak terpisah-pisah</li>
            <li>Akses layanan mudah dijangkau oleh seluruh keluarga</li>
          </ul>
          
          <strong>🤝 Indikator Koordinasi:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Pelaksanaan dikoordinasikan dengan baik lintas sektor</li>
            <li>Gugus tugas PAUD HI berfungsi optimal</li>
            <li>Sinkronisasi program antar instansi terkait</li>
          </ul>
          
          <strong>📈 Indikator Kualitas:</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Terjadi peningkatan kualitas layanan PAUD di daerah</li>
            <li>SDM terlatih dan kompeten</li>
            <li>Sarana prasarana memadai</li>
            <li>Kepuasan masyarakat terhadap layanan</li>
          </ul>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 rounded-r-lg">
            <strong>🏆 Hasil Akhir yang Diharapkan:</strong>
            <br />
            Anak-anak Indonesia tumbuh sehat, cerdas, dan berkarakter melalui layanan PAUD HI yang berkualitas dan terintegrasi.
          </div>
        </div>
      )
    }
  ];

  const governmentFAQs = [
    {
      id: 'implementation-steps',
      category: 'pemerintah',
      question: 'Bagaimana langkah implementasi PAUD HI di daerah?',
      answer: (
        <div>
          <strong>Implementasi PAUD HI di daerah dilakukan melalui tahapan sistematis:</strong>
          <br />
          <br />
          <strong>🏛️ Tahap 1: Pembentukan Gugus Tugas</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Membentuk gugus tugas PAUD HI tingkat daerah</li>
            <li>Melibatkan OPD terkait (Pendidikan, Kesehatan, Sosial, dll)</li>
            <li>Menetapkan koordinator dan sekretariat</li>
          </ul>
          
          <strong>📋 Tahap 2: Pemetaan dan Perencanaan</strong>
          <ul className="list-disc ml-5 mt-4 mb-4">
            <li>Pemetaan kondisi anak usia dini di daerah</li>
            <li>Inventarisasi layanan yang sudah ada</li>
            <li>Identifikasi gap dan kebutuhan</li>
            <li>Penyusunan rencana aksi daerah</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
            <strong>🎯 Dukungan dari Pusat:</strong>
            <br />
            Kemendikbudristek menyediakan panduan, pelatihan, dan pendampingan teknis untuk membantu daerah mengimplementasikan PAUD HI.
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

  const FAQItem = ({ faq, isGovernment = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isExpanded = openFAQ === faq.id || isHovered;

    return (
      <div 
        className={`border rounded-xl sm:rounded-2xl mb-4 sm:mb-6 overflow-hidden transition-all duration-500 ${isGovernment ? 'border-purple-200' : 'border-gray-200'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`p-4 sm:p-6 cursor-pointer flex justify-between items-center font-semibold transition-all duration-300 touch-manipulation ${
            isExpanded 
              ? isGovernment 
                ? 'bg-purple-50 text-purple-700' 
                : 'bg-blue-50 text-blue-700'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => toggleFAQ(faq.id)}
        >
          <span 
            className="text-sm sm:text-base lg:text-lg pr-4 leading-tight"
            dangerouslySetInnerHTML={{ 
              __html: highlightText(faq.question, searchTerm) 
            }}
          />
          <i className={`fas fa-chevron-down transition-transform duration-300 text-lg sm:text-xl flex-shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          } ${
            isExpanded 
              ? isGovernment ? 'text-purple-700' : 'text-blue-700'
              : 'text-gray-400'
          }`}></i>
        </div>
        <div className={`transition-all duration-400 ease-out overflow-hidden ${
          isExpanded ? 'max-h-screen p-4 sm:p-6 lg:p-8' : 'max-h-0 p-0'
        }`}>
          <div className={`text-gray-600 leading-relaxed text-sm sm:text-base transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}>
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* FontAwesome */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      {/* Floating shapes background - Mobile optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 w-14 h-14 sm:w-24 sm:h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-12 h-12 sm:w-18 sm:h-18 bg-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      {/* Header - Mobile optimized */}
      <div className="max-w-6xl mx-auto p-3 sm:p-5 pt-25 sm:pt-20 lg:pt-24 xl:pt-32 relative z-10">
  <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white p-6 sm:p-8 lg:p-12 text-center mb-6 sm:mb-10 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25">
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl"></div>
    <div className="relative z-10">
      <div className="text-center animate-bounce">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-6 leading-tight">
          Tanya <span className="text-yellow-300">PAUD HI</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto px-2">
          Temukan jawaban untuk semua pertanyaan Anda tentang PAUD Holistik Integratif
        </p>
      </div>
    </div>
  </div>
</div>


      {/* FAQ Content - Mobile optimized */}
      <div className="max-w-6xl mx-auto px-3 sm:px-5 relative z-10">
        {/* FAQ Section Umum */}
        {(activeCategory === 'all' || activeCategory !== 'pemerintah') && visibleGeneralFAQs.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl overflow-hidden mb-8 sm:mb-12 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:bg-white/95" id="faq-umum">
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4 sm:p-6 lg:p-8 flex items-center gap-3 sm:gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-6 sm:translate-y-12 -translate-x-6 sm:-translate-x-12"></div>
              <i className="fas fa-baby text-xl sm:text-2xl lg:text-3xl animate-bounce relative z-10"></i>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold relative z-10 leading-tight">
                Pertanyaan yang Sering Ditanyakan
              </h2>
            </div>
            <div className="p-4 sm:p-6 lg:p-10">
              {visibleGeneralFAQs.map((faq, index) => (
                <div 
                  key={faq.id}
                  style={{ animationDelay: `${index * 200}ms` }}
                  className="opacity-0 animate-fade-in-up"
                >
                  <FAQItem faq={faq} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Section - Mobile optimized */}
      <div className="max-w-6xl mx-auto px-3 sm:px-5 mb-6 sm:mb-10">
        <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl text-center" id="bantuan">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
            <i className="fas fa-headset mr-2 sm:mr-3"></i>
            Masih Ada Pertanyaan?
          </h3>
          <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
            Hubungi tim support kami untuk bantuan lebih lanjut
          </p>
          
          {/* Mobile: 2x2 grid, Desktop: horizontal */}
          <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 justify-center">
            {contactMethods.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                onClick={(e) => handleContactClick(e, contact)}
                className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3 bg-white text-gray-600 border-none rounded-lg font-semibold no-underline transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-2xl text-xs sm:text-sm lg:text-base touch-manipulation"
                target={contact.type === 'whatsapp' ? '_blank' : undefined}
                rel={contact.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
              >
                <i className={`${contact.icon} text-sm sm:text-base`}></i>
                <span className="leading-tight text-center">{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />

    
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        /* Touch optimization */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar - mobile optimized */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-bounce {
            animation-duration: 1.5s;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQApp;