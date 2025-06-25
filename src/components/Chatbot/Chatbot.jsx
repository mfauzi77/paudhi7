import React, { useEffect, useRef, useState } from 'react';
import { callGeminiAPI, faqData, searchFAQ } from './geminiAPI-PAUD';

// Chatbot Component dengan integrasi AI yang lebih clean
const Chatbot = () => {
  // State untuk mengelola visibilitas chatbot
  const [isOpen, setIsOpen] = useState(false);
  // State untuk menyimpan daftar pesan dalam obrolan
  const [messages, setMessages] = useState([]);
  // State untuk mengelola input teks pengguna saat ini
  const [currentInput, setCurrentInput] = useState('');
  // State untuk melacak langkah obrolan saat ini
  const [chatStep, setChatStep] = useState('greeting');
  // State untuk menyimpan informasi pengguna untuk formulir kontak
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    question: ''
  });
  // State untuk mengontrol tampilan formulir kontak
  const [showContactForm, setShowContactForm] = useState(false);
  // State untuk status typing indicator
  const [isTyping, setIsTyping] = useState(false);
  // Ref untuk menggulir pesan obrolan ke bawah secara otomatis
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-chatbot', openHandler);
    return () => window.removeEventListener('open-chatbot', openHandler);
  }, []);

  // Fungsi untuk menggulir tampilan pesan ke paling bawah
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efek untuk menggulir ke bawah setiap kali ada pesan baru
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Efek untuk menampilkan pesan pembuka saat chatbot dibuka
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Halo! Selamat datang di SISMONEV PAUD HI. Saya asisten virtual yang siap membantu Anda!");
        setTimeout(() => {
          addBotMessage("Saya didukung oleh AI dan memiliki pengetahuan lengkap tentang PAUD HI untuk menjawab pertanyaan Anda seputar pengasuhan anak dan layanan SISMONEV PAUD HI.");
          setTimeout(() => {
            addBotMessage("Silakan pilih jenis bantuan yang Anda butuhkan:", true);
          }, 1500);
        }, 1000);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Fungsi untuk menambahkan pesan dari bot ke daftar pesan
  const addBotMessage = (message, showOptions = false) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'bot',
      message,
      showOptions,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // Fungsi untuk menambahkan pesan dari pengguna ke daftar pesan
  const addUserMessage = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      message,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // Handler saat opsi menu diklik
  const handleOptionClick = (option) => {
    addUserMessage(option.label);

    if (option.type === 'faq-list') {
      setChatStep('faq-list');
      setTimeout(() => {
        addBotMessage("Berikut adalah daftar FAQ PAUD HI. Klik salah satu untuk melihat jawabannya:", true);
      }, 500);
    } else if (option.type === 'faq-item') {
      const faq = faqData.find(f => f.id === option.faqId);
      if (faq) {
        setTimeout(() => {
          addBotMessage(`**${faq.question}**\n\n${faq.answer}`);
          setTimeout(() => {
            addBotMessage("Apakah informasi ini membantu? Ada pertanyaan lain yang ingin ditanyakan?", true);
            setChatStep('greeting'); // Return to main menu
          }, 1500);
        }, 500);
      }
    } else if (option.type === 'more-faq') {
      // Show remaining FAQs
      setTimeout(() => {
        const remainingFAQs = faqData.slice(5);
        remainingFAQs.forEach((faq, index) => {
          setTimeout(() => {
            addBotMessage(`**${faq.question}**\n\n${faq.answer}`);
          }, index * 1000);
        });
        setTimeout(() => {
          addBotMessage("Itu semua FAQ yang tersedia. Ada pertanyaan lain?", true);
          setChatStep('greeting');
        }, remainingFAQs.length * 1000 + 500);
      }, 500);
    } else if (option.type === 'ai-chat') {
      setChatStep('ai-chat');
      setTimeout(() => {
        if (chatStep === 'ai-chat') {
          // User is already in AI chat and wants to ask again
          addBotMessage("💬 Silakan ketik pertanyaan baru Anda di kolom input di bawah!");
        } else {
          // User is entering AI chat mode for the first time
          addBotMessage("💬 Mode AI Chat aktif! Silakan ketik pertanyaan Anda seputar pengasuhan anak atau layanan PAUD HI. Saya akan membantu menjawab berdasarkan pengetahuan lengkap tentang PAUD HI.");
          setTimeout(() => {
            addBotMessage("💡 Atau klik salah satu contoh pertanyaan berikut:", true);
          }, 1000);
        }
      }, 500);
    } else if (option.type === 'example-question') {
      // Handle example questions
      handleAIChat(option.question);
    } else if (option.type === 'whatsapp') {
      setChatStep('whatsapp');
      setTimeout(() => {
        addBotMessage("Hubungi Staf Kami via WhatsApp:");
        setTimeout(() => {
          addBotMessage("Klik tombol di bawah untuk langsung chat dengan staf kami di WhatsApp:", true);
        }, 800);
      }, 500);
    } else if (option.type === 'whatsapp-direct') {
      const waNumber = '6281112345678';
      const waMessage = encodeURIComponent('Halo, saya ingin bertanya tentang SISMONEV PAUD HI...');
      window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');

      addBotMessage("✅ WhatsApp telah dibuka di tab baru. Jika tidak terbuka otomatis, hubungi kami di: 0811-1234-5678");
      setTimeout(() => {
        addBotMessage("Ada yang bisa saya bantu lagi?", true);
        setChatStep('greeting');
      }, 2000);
    } else if (option.type === 'contact-form') {
      setShowContactForm(true);
      addBotMessage("Silakan isi form di bawah dengan lengkap, tim kami akan menghubungi Anda dalam 1x24 jam:");
    } else if (option.type === 'back-menu') {
      setChatStep('greeting');
      setTimeout(() => {
        addBotMessage("Silakan pilih jenis bantuan yang Anda butuhkan:", true);
      }, 500);
    }
  };

  // Handler for AI Chat menggunakan callGeminiAPI yang sudah terintegrasi
  const handleAIChat = async (userMessage) => {
    if (!userMessage || userMessage.trim() === '') {
      return;
    }

    addUserMessage(userMessage);
    setIsTyping(true);
    
    try {
      // Menggunakan callGeminiAPI yang sudah terintegrasi dengan fallback FAQ
      const aiResponse = await callGeminiAPI(userMessage);
      addBotMessage(aiResponse);
      
      setTimeout(() => {
        addBotMessage("Apakah jawaban ini membantu? Ada yang ingin ditanyakan lagi?", true);
      }, 1500);
      
    } catch (error) {
      console.error("Error in handleAIChat:", error);
      
      // Fallback tambahan jika callGeminiAPI gagal
      const relevantFAQs = searchFAQ(userMessage);
      if (relevantFAQs.length > 0) {
        const bestMatch = relevantFAQs[0];
        addBotMessage(`📋 Berdasarkan FAQ PAUD HI:\n\n**${bestMatch.question}**\n\n${bestMatch.answer}\n\n💡 *AI sedang tidak tersedia, jawaban dari database FAQ.*`);
      } else {
        addBotMessage("❌ Maaf, ada masalah saat memproses pertanyaan Anda. Silakan coba lagi atau hubungi staf kami via WhatsApp: 0811-1234-5678");
      }
      
      setTimeout(() => {
        addBotMessage("💡 Alternatif: Coba lihat FAQ atau hubungi staf langsung via WhatsApp:", true);
      }, 1000);
    } finally {
      setIsTyping(false);
    }

    setCurrentInput('');
  };

  // Handler untuk pengiriman formulir kontak
  const handleContactFormSubmit = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp || !userInfo.question) {
      addBotMessage('Mohon lengkapi semua field yang diperlukan.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      addBotMessage('Format email tidak valid');
      return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(userInfo.whatsapp)) {
      addBotMessage('Format nomor WhatsApp tidak valid');
      return;
    }

    addUserMessage(`Form Kontak: Nama: ${userInfo.name}, Email: ${userInfo.email}, WhatsApp: ${userInfo.whatsapp}, Pertanyaan: ${userInfo.question}`);

    setShowContactForm(false);
    setChatStep('completed');

    setTimeout(() => {
      addBotMessage("Terima kasih! Form kontak Anda telah berhasil dikirim.");
      setTimeout(() => {
        addBotMessage(`Ringkasan: Nama: ${userInfo.name}, Email: ${userInfo.email}, WhatsApp: ${userInfo.whatsapp}, Pertanyaan: ${userInfo.question}. Tim support kami akan menghubungi Anda dalam 1x24 jam. Ada yang bisa saya bantu lagi?`, true);
      }, 1500);
    }, 500);

    setUserInfo({ name: '', email: '', whatsapp: '', question: '' });
  };

  // Fungsi untuk mendapatkan opsi menu berdasarkan langkah obrolan saat ini
  const getMenuOptions = () => {
    if (chatStep === 'greeting') {
      return [
        { label: "💬 Tanya Apa Saja (AI Chat)", type: "ai-chat" },
        { label: "📋 Lihat FAQ PAUD HI", type: "faq-list" },
        { label: "📱 Tanya via WhatsApp Staf", type: "whatsapp" },
        { label: "📝 Isi Form Kontak", type: "contact-form" }
      ];
    }

    if (chatStep === 'faq-list') {
      const faqOptions = faqData.slice(0, 5).map(faq => ({
        label: `❓ ${faq.question}`,
        type: "faq-item",
        faqId: faq.id
      }));
      
      return [
        ...faqOptions,
        { label: "📝 Lihat FAQ Lainnya", type: "more-faq" },
        { label: "💬 Tanya AI Chat", type: "ai-chat" },
        { label: "🔙 Kembali ke Menu Utama", type: "back-menu" }
      ];
    }

    if (chatStep === 'ai-chat') {
      return [
        { label: "❓ Apa itu PAUD HI?", type: "example-question", question: "Apa itu PAUD HI?" },
        { label: "❓ Cara menggunakan SISMONEV?", type: "example-question", question: "Bagaimana cara menggunakan SISMONEV PAUD HI?" },
        { label: "❓ Tips pengasuhan anak usia 2-3 tahun", type: "example-question", question: "Apa tips pengasuhan untuk anak usia 2-3 tahun?" },
        { label: "❓ Perkembangan bahasa anak balita", type: "example-question", question: "Bagaimana tahap perkembangan bahasa anak balita?" },
        { label: "💬 Tanya Lagi (AI Chat)", type: "ai-chat" },
        { label: "📋 Lihat FAQ", type: "faq-list" },
        { label: "📝 Isi Form Kontak", type: "contact-form" },
        { label: "📱 Chat via WhatsApp", type: "whatsapp" },
        { label: "🔙 Menu Utama", type: "back-menu" }
      ];
    }

    if (chatStep === 'whatsapp') {
      return [
        { label: "📱 Buka WhatsApp Sekarang", type: "whatsapp-direct" },
        { label: "📝 Isi Form Kontak Saja", type: "contact-form" },
        { label: "🔙 Kembali ke Menu Utama", type: "back-menu" }
      ];
    }

    if (chatStep === 'completed') {
      return [
        { label: "💬 Ajukan Pertanyaan Baru", type: "ai-chat" },
        { label: "📋 Lihat FAQ", type: "faq-list" },
        { label: "📱 Chat WhatsApp", type: "whatsapp" }
      ];
    }

    return [];
  };

  // Typing Indicator Component
  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="max-w-[80%]">
        <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-200 p-3">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-sm">Asisten sedang mengetik</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol pembuka/penutup Chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center group ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 transform rotate-45'
            : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:shadow-xl hover:-translate-y-1'
        }`}
      >
        {isOpen ? (
          <div className="text-white text-xl transform -rotate-45">✕</div>
        ) : (
          <>
            <div className="text-white text-xl group-hover:scale-110 transition-transform">💬</div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </>
        )}
      </button>

      {/* Kontainer Chatbot */}
      <div className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 z-40 flex flex-col ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>

        {/* Header Chatbot */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-4 rounded-t-2xl text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="text-lg">🤖</div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Asisten PAUD HI</h3>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI + FAQ Online
              </div>
            </div>
          </div>
        </div>

        {/* Area Pesan Chatbot */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                }`}>
                  <div className="whitespace-pre-line">{message.message}</div>
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>

                {/* Opsi menu jika ditampilkan oleh bot */}
                {message.type === 'bot' && message.showOptions && (
                  <div className="mt-3 space-y-2">
                    {getMenuOptions().map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="block w-full text-left p-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Formulir Kontak */}
        {showContactForm && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Lengkap *"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Nomor WhatsApp *"
                value={userInfo.whatsapp}
                onChange={(e) => setUserInfo(prev => ({...prev, whatsapp: e.target.value}))}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Pertanyaan / Keluhan *"
                value={userInfo.question}
                onChange={(e) => setUserInfo(prev => ({...prev, question: e.target.value}))}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-20 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 p-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleContactFormSubmit}
                  className="flex-1 p-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input teks untuk AI Chat */}
        {chatStep === 'ai-chat' && !showContactForm && (
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && currentInput.trim()) {
                    handleAIChat(currentInput);
                  }
                }}
                placeholder="Ketik pertanyaan Anda tentang PAUD HI..."
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                autoFocus
                disabled={isTyping}
              />
              <button
                onClick={() => handleAIChat(currentInput)}
                disabled={!currentInput.trim() || isTyping}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ➤
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">
              💡 Powered by Google Gemini + FAQ Database
            </div>
          </div>
        )}

        {/* Opsi cepat di bagian bawah chatbot */}
        {(chatStep === 'greeting' || chatStep === 'faq-list' || chatStep === 'completed') && !showContactForm && (
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  const waNumber = '6281112345678';
                  const waMessage = encodeURIComponent('Halo, saya ingin bertanya tentang SISMONEV PAUD HI...');
                  window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
                }}
                className="flex-1 p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                📱 WhatsApp
              </button>
              <button
                onClick={() => {
                  addUserMessage("🕐 Jam operasional");
                  setTimeout(() => {
                    addBotMessage("Jam Operasional: Senin-Jumat 08:00-17:00 WIB, Sabtu 08:00-12:00 WIB, Minggu Tutup. Hotline Darurat: 129 (24/7). Chatbot tersedia 24/7!");
                  }, 500);
                }}
                className="flex-1 p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🕐 Jam Kerja
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;