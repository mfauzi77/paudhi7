import React, { useState } from 'react';

const Sidebar = ({ onQuickQuestion }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [expandedSection, setExpandedSection] = useState('topics');

  const topicCategories = [
    {
      id: 'trending',
      title: '🔥 Topik Trending',
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      topics: [
        { 
          icon: '🍽️', 
          text: 'Picky Eater & GTM', 
          question: 'Strategi mengatasi picky eater dan GTM (Gerakan Tutup Mulut)' 
        },
        { 
          icon: '❤️', 
          text: 'Gentle Parenting', 
          question: 'Gentle parenting vs permissive parenting: mana yang lebih baik?' 
        },
        { 
          icon: '📱', 
          text: 'Screen Time', 
          question: 'Screen time untuk anak: panduan usia dan dampaknya' 
        },
        { 
          icon: '👶', 
          text: 'Toilet Training', 
          question: 'Cara efektif toilet training anak 18 bulan - 3 tahun' 
        },
        { 
          icon: '👥', 
          text: 'Sibling Rivalry', 
          question: 'Mengatasi sibling rivalry dan mengajarkan berbagi' 
        },
        { 
          icon: '🧠', 
          text: 'Perkembangan Emosi', 
          question: 'Perkembangan emosi anak dan cara mendampinginya' 
        }
      ]
    },
    {
      id: 'age-based',
      title: '👶 Panduan Per Usia',
      icon: '👶',
      color: 'from-blue-500 to-purple-500',
      topics: [
        { 
          icon: '👶', 
          text: 'Bayi (0-12 bulan)', 
          question: 'Tips parenting untuk bayi 0-12 bulan' 
        },
        { 
          icon: '🧒', 
          text: 'Toddler (1-3 tahun)', 
          question: 'Panduan pengasuhan toddler 1-3 tahun' 
        },
        { 
          icon: '🎓', 
          text: 'Prasekolah (3-5 tahun)', 
          question: 'Strategi parenting anak prasekolah 3-5 tahun' 
        },
        { 
          icon: '🏫', 
          text: 'SD (6-12 tahun)', 
          question: 'Tips mendampingi anak sekolah dasar 6-12 tahun' 
        }
      ]
    },
    {
      id: 'health',
      title: '🏥 Kesehatan & Wellness',
      icon: '🏥',
      color: 'from-green-500 to-teal-500',
      topics: [
        { 
          icon: '🌡️', 
          text: 'Demam & Sakit', 
          question: 'Kapan demam anak perlu dibawa ke dokter?' 
        },
        { 
          icon: '💉', 
          text: 'Imunisasi', 
          question: 'Jadwal imunisasi anak sesuai IDAI terbaru' 
        },
        { 
          icon: '🦷', 
          text: 'Tumbuh Gigi', 
          question: 'Cara mengatasi ketidaknyamanan saat tumbuh gigi' 
        },
        { 
          icon: '🧬', 
          text: 'Alergi', 
          question: 'Mengenali dan mengatasi alergi pada anak' 
        }
      ]
    },
    {
      id: 'research',
      title: '🔬 Penelitian Terbaru',
      icon: '🔬',
      color: 'from-indigo-500 to-purple-500',
      topics: [
        { 
          icon: '🧠', 
          text: 'Neuroscience Update', 
          question: 'Penelitian terbaru tentang perkembangan otak anak' 
        },
        { 
          icon: '🗣️', 
          text: 'Language Development', 
          question: 'Findings terbaru tentang serve and return interactions' 
        },
        { 
          icon: '📚', 
          text: 'Education Trends', 
          question: 'Trend pendidikan anak usia dini 2024-2025' 
        },
        { 
          icon: '💻', 
          text: 'Digital Parenting', 
          question: 'Evidence terbaru tentang screen time dan perkembangan anak' 
        }
      ]
    }
  ];

  const tips = [
    { 
      icon: '⭐', 
      text: 'Validasi perasaan anak sebelum memberikan solusi atau saran', 
      category: 'emotional',
      color: 'hover:bg-yellow-50 hover:border-yellow-200'
    },
    { 
      icon: '⏰', 
      text: 'Buat "special time" 15 menit fokus penuh pada anak tanpa gadget', 
      category: 'connection',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    { 
      icon: '💬', 
      text: 'Gunakan "I statements" saat mengajarkan boundaries pada anak', 
      category: 'communication',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    { 
      icon: '🌱', 
      text: 'Ajarkan growth mindset: "Kamu belum bisa... YET"', 
      category: 'development',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    },
    { 
      icon: '🛡️', 
      text: 'Konsisten adalah kunci - lebih baik aturan sederhana yang konsisten', 
      category: 'discipline',
      color: 'hover:bg-red-50 hover:border-red-200'
    },
    { 
      icon: '📖', 
      text: 'Baca bersama anak minimal 15 menit setiap hari untuk perkembangan bahasa', 
      category: 'learning',
      color: 'hover:bg-indigo-50 hover:border-indigo-200'
    },
    { 
      icon: '🏃', 
      text: 'Pastikan anak aktif bergerak minimal 60 menit per hari', 
      category: 'physical',
      color: 'hover:bg-orange-50 hover:border-orange-200'
    },
    { 
      icon: '😴', 
      text: 'Rutinas tidur yang konsisten lebih penting dari durasi yang sempurna', 
      category: 'sleep',
      color: 'hover:bg-violet-50 hover:border-violet-200'
    }
  ];

  const stats = [
    { 
      number: '25,847', 
      label: 'Pertanyaan Terjawab', 
      icon: '❓', 
      color: 'text-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    { 
      number: '8,234', 
      label: 'Keluarga Terbantu', 
      icon: '👨‍👩‍👧‍👦', 
      color: 'text-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    { 
      number: '99.2%', 
      label: 'Tingkat Kepuasan', 
      icon: '⭐', 
      color: 'text-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    { 
      number: '24/7', 
      label: 'Dukungan Aktif', 
      icon: '🕒', 
      color: 'text-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const resources = [
    { 
      icon: '👨‍⚕️', 
      text: 'Konsultasi dengan 500+ ahli parenting tersertifikasi', 
      badge: 'Expert Network',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    { 
      icon: '🔬', 
      text: 'Berbasis penelitian terbaru dari jurnal pediatri internasional', 
      badge: 'Evidence-Based',
      badgeColor: 'bg-green-100 text-green-700'
    },
    { 
      icon: '🌏', 
      text: 'Disesuaikan dengan konteks budaya dan nilai keluarga Indonesia', 
      badge: 'Cultural Fit',
      badgeColor: 'bg-orange-100 text-orange-700'
    },
    { 
      icon: '🏆', 
      text: 'Terintegrasi dengan panduan WHO dan IDAI', 
      badge: 'Certified',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ];

  const sectionButtons = [
    { id: 'topics', icon: '🎯', label: 'Topics' },
    { id: 'tips', icon: '💡', label: 'Tips' },
    { id: 'stats', icon: '📊', label: 'Stats' },
    { id: 'resources', icon: '📚', label: 'Resources' }
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      
      {/* Section Navigation Tabs - Mobile optimized */}
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {sectionButtons.map((section) => (
            <button
              key={section.id}
              onClick={() => setExpandedSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md text-xs font-medium transition-all duration-200 ${
                expandedSection === section.id
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <span className="text-sm">{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content Area - Mobile optimized */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        
        {/* Topic Categories Section */}
        {expandedSection === 'topics' && (
          <div className="space-y-3">
            {topicCategories.map((category, categoryIndex) => (
              <div
                key={category.id}
                className={`bg-gray-50 rounded-lg p-3 border border-gray-200 transition-all duration-300 hover:shadow-md cursor-pointer ${
                  activeCard === categoryIndex ? 'ring-2 ring-purple-500 shadow-lg' : ''
                }`}
                onMouseEnter={() => setActiveCard(categoryIndex)}
                onMouseLeave={() => setActiveCard(null)}
              >
                
                {/* Category Header - Mobile optimized */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${category.color} text-white rounded-lg flex items-center justify-center shadow-md text-sm`}>
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 leading-tight">{category.title}</h3>
                </div>
                
                {/* Topic Buttons Grid - Mobile optimized */}
                <div className="grid gap-2">
                  {category.topics.map((topic, topicIndex) => (
                    <button
                      key={topicIndex}
                      onClick={() => onQuickQuestion(topic.question)}
                      className="w-full text-left p-2 rounded-lg bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                          {topic.icon}
                        </span>
                        <span className="text-purple-700 font-medium text-xs leading-tight">
                          {topic.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section - Mobile optimized */}
        {expandedSection === 'tips' && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg flex items-center justify-center text-sm">
                💎
              </div>
              <h3 className="text-sm font-bold text-gray-800">Tips Emas Parenting</h3>
            </div>
            
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-2 p-2 rounded-lg transition-colors duration-200 border border-transparent ${tip.color}`}
                >
                  <span className="text-base text-yellow-500 mt-0.5 flex-shrink-0">{tip.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-700 text-xs leading-relaxed block">{tip.text}</span>
                    <span className="text-xs text-yellow-600 font-medium mt-1 inline-block capitalize">
                      #{tip.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Section - Mobile optimized */}
        {expandedSection === 'stats' && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg flex items-center justify-center text-sm">
                📈
              </div>
              <h3 className="text-sm font-bold text-gray-800">Platform Analytics</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center p-3 bg-gradient-to-br ${stat.bgColor} rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className={`text-sm font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Section - Mobile optimized */}
        {expandedSection === 'resources' && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg flex items-center justify-center text-sm">
                📖
              </div>
              <h3 className="text-sm font-bold text-gray-800">Sumber Terpercaya</h3>
            </div>
            
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-transparent hover:border-blue-200"
                >
                  <span className="text-base text-blue-500 mt-0.5 flex-shrink-0">{resource.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-700 text-xs leading-relaxed block">{resource.text}</span>
                    <span className={`inline-block mt-1 px-2 py-1 ${resource.badgeColor} text-xs rounded-full font-medium`}>
                      {resource.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;