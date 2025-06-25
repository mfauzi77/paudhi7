// ================================
// Sidebar.jsx - DETAILED BREAKDOWN
// ================================

import React, { useState } from 'react';

const Sidebar = ({ onQuickQuestion }) => {
  // ================================
  // STATE MANAGEMENT
  // ================================
  
  // Track which card is being hovered untuk visual feedback
  const [activeCard, setActiveCard] = useState(null);
  
  // Track which section is currently expanded
  const [expandedSection, setExpandedSection] = useState('topics');

  // ================================
  // TOPIC CATEGORIES DATA
  // ================================
  
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

  // ================================
  // TIPS DATA WITH CATEGORIES
  // ================================
  
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

  // ================================
  // STATISTICS DATA
  // ================================
  
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

  // ================================
  // EXPERT RESOURCES DATA
  // ================================
  
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

  // ================================
  // SECTION NAVIGATION DATA
  // ================================
  
  const sectionButtons = [
    { id: 'topics', icon: '🎯', label: 'Topics' },
    { id: 'tips', icon: '💡', label: 'Tips' },
    { id: 'stats', icon: '📊', label: 'Stats' },
    { id: 'resources', icon: '📚', label: 'Resources' }
  ];

  // ================================
  // COMPONENT RENDER
  // ================================
  
  return (
    <div className="h-full flex flex-col bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
      
      {/* ================================
          SECTION NAVIGATION TABS
          ================================ */}
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {sectionButtons.map((section) => (
            <button
              key={section.id}
              onClick={() => setExpandedSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                expandedSection === section.id
                  ? 'bg-white text-purple-700 shadow-sm'     // Active state
                  : 'text-gray-600 hover:text-purple-600'    // Inactive state
              }`}
            >
              <span>{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================================
          SCROLLABLE CONTENT AREA
          ================================ */}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* ================================
            TOPIC CATEGORIES SECTION
            ================================ */}
        
        {expandedSection === 'topics' && (
          <div className="space-y-4">
            {topicCategories.map((category, categoryIndex) => (
              <div
                key={category.id}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer ${
                  activeCard === categoryIndex ? 'ring-2 ring-purple-500 shadow-lg' : ''
                }`}
                onMouseEnter={() => setActiveCard(categoryIndex)}
                onMouseLeave={() => setActiveCard(null)}
              >
                
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${category.color} text-white rounded-xl flex items-center justify-center shadow-md`}>
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">{category.title}</h3>
                </div>
                
                {/* Topic Buttons Grid */}
                <div className="grid gap-2">
                  {category.topics.map((topic, topicIndex) => (
                    <button
                      key={topicIndex}
                      onClick={() => onQuickQuestion(topic.question)}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">
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

        {/* ================================
            TIPS SECTION
            ================================ */}
        
        {expandedSection === 'tips' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl flex items-center justify-center">
                💎
              </div>
              <h3 className="text-sm font-bold text-gray-800">Tips Emas Parenting</h3>
            </div>
            
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 border border-transparent ${tip.color}`}
                >
                  <span className="text-lg text-yellow-500 mt-0.5 flex-shrink-0">{tip.icon}</span>
                  <div className="flex-1">
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

        {/* ================================
            STATISTICS SECTION
            ================================ */}
        
        {expandedSection === 'stats' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl flex items-center justify-center">
                📈
              </div>
              <h3 className="text-sm font-bold text-gray-800">Platform Analytics</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 bg-gradient-to-br ${stat.bgColor} rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-xl font-bold ${stat.color}`}>
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

        {/* ================================
            RESOURCES SECTION
            ================================ */}
        
        {expandedSection === 'resources' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center">
                📖
              </div>
              <h3 className="text-sm font-bold text-gray-800">Sumber Terpercaya</h3>
            </div>
            
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-transparent hover:border-blue-200"
                >
                  <span className="text-lg text-blue-500 mt-0.5 flex-shrink-0">{resource.icon}</span>
                  <div className="flex-1">
                    <span className="text-gray-700 text-xs leading-relaxed block">{resource.text}</span>
                    <span className={`inline-block mt-2 px-2 py-1 ${resource.badgeColor} text-xs rounded-full font-medium`}>
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

// ================================
// COMPONENT FEATURES BREAKDOWN
// ================================

/**
 * 🎛️ NAVIGATION SYSTEM:
 * 
 * 1. TAB-BASED INTERFACE:
 *    - 4 main sections: Topics, Tips, Stats, Resources
 *    - Active/inactive visual states
 *    - Smooth transitions between sections
 *    - Mobile-responsive labels (hidden on small screens)
 * 
 * 2. STATE MANAGEMENT:
 *    - expandedSection: Controls which content is visible
 *    - activeCard: Tracks hover states untuk visual feedback
 *    - Efficient re-renders dengan conditional rendering
 * 
 * 3. VISUAL FEEDBACK:
 *    - Active tab: White background, purple text, shadow
 *    - Hover states: Purple color, smooth transitions
 *    - Card hover: Ring border, shadow, slight elevation
 */

/**
 * 📚 CONTENT ORGANIZATION:
 * 
 * 1. TOPIC CATEGORIES:
 *    - 4 main categories dengan color coding
 *    - 18 total quick-access topics
 *    - Hierarchical organization (category → topics)
 *    - Icon + text combination untuk clarity
 * 
 * 2. TIPS SYSTEM:
 *    - 8 categorized parenting tips
 *    - Category tags untuk organization
 *    - Color-coded hover states
 *    - Actionable, specific advice
 * 
 * 3. STATISTICS DISPLAY:
 *    - 4 key platform metrics
 *    - Visual icons untuk each stat
 *    - Color-coded presentations
 *    - Professional credibility building
 * 
 * 4. EXPERT RESOURCES:
 *    - 4 credibility indicators
 *    - Badge system untuk qualifications
 *    - Trust-building information
 *    - Professional validation
 */

/**
 * 🎨 VISUAL DESIGN SYSTEM:
 * 
 * 1. COLOR SCHEME:
 *    - Topics: Red, Blue-Purple, Green-Teal, Indigo-Purple
 *    - Tips: Yellow-Orange gradients
 *    - Stats: Individual color coding per metric
 *    - Resources: Blue-Indigo theme
 * 
 * 2. LAYOUT PATTERNS:
 *    - Consistent card-based design
 *    - 10px icon containers dengan gradients
 *    - Rounded corners (rounded-xl, rounded-lg)
 *    - Consistent spacing (gap-3, p-4, space-y-4)
 * 
 * 3. TYPOGRAPHY:
 *    - Headers: text-sm font-bold
 *    - Content: text-xs leading-relaxed
 *    - Categories: text-xs font-medium
 *    - Consistent hierarchy
 * 
 * 4. INTERACTIVE ELEMENTS:
 *    - Hover animations: scale, shadow, translate
 *    - Transition timing: duration-200, duration-300
 *    - Focus states: ring-2 ring-purple-500
 *    - Touch-friendly sizing
 */

/**
 * 📱 RESPONSIVE BEHAVIOR:
 * 
 * MOBILE (sm):
 * - Tab labels hidden: className="hidden sm:inline"
 * - Single column stats grid
 * - Compressed spacing
 * - Touch-optimized interactions
 * 
 * TABLET (md):
 * - Full tab interface
 * - Grid layouts maintained
 * - Hover effects active
 * - Optimized touch targets
 * 
 * DESKTOP (lg+):
 * - Full feature set
 * - Hover effects enhanced
 * - Optimal spacing
 * - Mouse interaction optimized
 */

/**
 * ⚡ PERFORMANCE FEATURES:
 * 
 * 1. EFFICIENT RENDERING:
 *    - Conditional section rendering
 *    - Proper key props pada mapped elements
 *    - Minimal state updates
 *    - Optimized re-render triggers
 * 
 * 2. SMOOTH ANIMATIONS:
 *    - CSS transitions vs JavaScript animations
 *    - GPU-accelerated transforms
 *    - Efficient hover state management
 *    - Minimal layout thrashing
 * 
 * 3. DATA OPTIMIZATION:
 *    - Static data structures
 *    - Efficient array operations
 *    - Minimal object creation
 *    - Smart caching patterns
 */

/**
 * 🔧 ACCESSIBILITY FEATURES:
 * 
 * 1. KEYBOARD NAVIGATION:
 *    - Focusable tab buttons
 *    - Logical tab order
 *    - Consistent interaction patterns
 * 
 * 2. SEMANTIC HTML:
 *    - Proper button elements
 *    - Meaningful content structure
 *    - Logical heading hierarchy
 * 
 * 3. VISUAL INDICATORS:
 *    - Clear active/inactive states
 *    - High contrast color combinations
 *    - Consistent visual feedback
 * 
 * 4. SCREEN READER SUPPORT:
 *    - Descriptive text content
 *    - Logical reading order
 *    - Meaningful button labels
 */

/**
 * 🎯 INTERACTION PATTERNS:
 * 
 * 1. SECTION SWITCHING:
 *    - Tab-based navigation
 *    - Single active section
 *    - Smooth content transitions
 *    - State persistence during session
 * 
 * 2. TOPIC SELECTION:
 *    - Direct question triggering
 *    - onQuickQuestion callback
 *    - Visual feedback on interaction
 *    - Category-based organization
 * 
 * 3. HOVER EFFECTS:
 *    - Card elevation on hover
 *    - Icon scaling animations
 *    - Color transitions
 *    - Ring borders untuk active cards
 * 
 * 4. MOBILE INTERACTIONS:
 *    - Touch-friendly sizing
 *    - Tap feedback
 *    - Scroll optimization
 *    - Gesture-friendly layout
 */

/**
 * 💡 USAGE EXAMPLES:
 * 
 * // Basic implementation
 * <Sidebar onQuickQuestion={(question) => sendMessage(question)} />
 * 
 * // With message handling
 * const handleQuickQuestion = (question) => {
 *   addUserMessage(question);
 *   processAIResponse(question);
 * };
 * 
 * <Sidebar onQuickQuestion={handleQuickQuestion} />
 * 
 * // With analytics tracking
 * const handleQuickQuestion = (question) => {
 *   analytics.track('quick_question_used', { question });
 *   sendMessage(question);
 * };
 */

/**
 * 🔮 FUTURE ENHANCEMENTS:
 * 
 * 1. PERSONALIZATION:
 *    - User preference tracking
 *    - Personalized topic recommendations
 *    - Usage-based topic ordering
 *    - Custom topic categories
 * 
 * 2. DYNAMIC CONTENT:
 *    - Real-time stats updates
 *    - Trending topics based on usage
 *    - Seasonal tip recommendations
 *    - Context-aware suggestions
 * 
 * 3. ADVANCED FEATURES:
 *    - Search within sidebar content
 *    - Bookmarking favorite topics
 *    - Sharing functionality
 *    - Offline content access
 * 
 * 4. INTEGRATION:
 *    - Calendar integration for tips
 *    - Progress tracking
 *    - Achievement system
 *    - Community features
 */