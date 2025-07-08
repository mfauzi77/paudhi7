import React, { useEffect, useRef, useState } from 'react';

const ChatMessages = ({ messages, isTyping }) => {
  // Refs untuk scroll management
  const messagesEndRef = useRef(null);
  
  // State untuk message actions
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [likedMessages, setLikedMessages] = useState(new Set());

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.isUser && messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  // Copy message function
  const copyMessage = async (messageId, text) => {
    try {
      // Remove HTML tags
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      await navigator.clipboard.writeText(cleanText);
      
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Like message function
  const likeMessage = (messageId) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="flex-1 p-20 flex items-center justify-center">
      <div className="text-center max-w-lg">
        {/* Welcome Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 rounded-full"></div>
          <span className="relative z-10">🌟</span>
        </div>
        
        {/* Welcome Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Selamat datang di PengasuhanAI Pro!
        </h2>
        
        {/* Welcome Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          Saya adalah asisten AI canggih yang siap membantu perjalanan parenting Anda dengan saran ahli, 
          tips praktis, dan dukungan 24/7. Mari mulai diskusi yang bermakna!
        </p>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl mb-1">🧠</div>
            <div className="font-semibold text-purple-800 text-sm">AI Cerdas</div>
            <div className="text-xs text-purple-600">Berbasis riset terkini</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
            <div className="font-semibold text-blue-800 text-sm">Expert Network</div>
            <div className="text-xs text-blue-600">500+ ahli parenting</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl mb-1">🇮🇩</div>
            <div className="font-semibold text-green-800 text-sm">Konteks Lokal</div>
            <div className="text-xs text-green-600">Sesuai budaya Indonesia</div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl mb-1">⏰</div>
            <div className="font-semibold text-orange-800 text-sm">24/7 Support</div>
            <div className="text-xs text-orange-600">Selalu siap membantu</div>
          </div>
        </div>
        
        {/* Topic Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: 'Nutrisi', color: 'bg-green-100 text-green-700' },
            { label: 'Sleep', color: 'bg-blue-100 text-blue-700' },
            { label: 'Disiplin', color: 'bg-purple-100 text-purple-700' },
            { label: 'Perkembangan', color: 'bg-yellow-100 text-yellow-700' },
            { label: 'Kesehatan', color: 'bg-red-100 text-red-700' },
            { label: 'Penelitian', color: 'bg-indigo-100 text-indigo-700' }
          ].map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 ${tag.color} rounded-full text-sm font-medium`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Getting Started */}
        <div className="mt-6 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="text-purple-700 font-medium text-sm mb-1">💡 Cara Memulai:</div>
          <div className="text-xs text-purple-600">
            Ketik pertanyaan, pilih topik dari sidebar, atau gunakan quick action untuk memulai!
          </div>
        </div>
      </div>
    </div>
  );

  // Typing Indicator Component
  const TypingIndicator = () => (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center text-lg shadow-lg">
        🧠
      </div>
      <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 text-gray-600">
          <span className="text-sm">PengasuhanAI sedang berpikir</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Return welcome screen if no messages
  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      {/* Messages */}
      {messages.map((message, index) => {
        const isLiked = likedMessages.has(message.id);
        const isCopied = copiedMessageId === message.id;

        return (
          <div
            key={message.id}
            className={`flex gap-4 ${message.isUser ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg ${
                message.isUser
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              }`}
            >
              {message.isUser ? '👤' : '🧠'}
            </div>

            {/* Message Content */}
            <div className={`max-w-[80%] group ${message.isUser ? 'items-end' : 'items-start'} flex flex-col`}>
              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                }`}
              >
                {/* Message Text */}
                <div 
                  className="whitespace-pre-wrap leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                
                {/* Timestamp */}
                <div className={`text-xs mt-3 flex items-center justify-between ${
                  message.isUser ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span>{message.time}</span>
                    {!message.isUser && (
                      <span>👤</span>
                    )}
                  </div>
                  
                  {/* Status indicators */}
                  {!message.isUser && (
                    <div className="flex items-center gap-2">
                      {isCopied && (
                        <span className="text-green-500 text-xs">✅ Copied</span>
                      )}
                      {isLiked && (
                        <span className="text-red-500 text-xs">❤️</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Actions (AI only) */}
              {!message.isUser && (
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {/* Copy Button */}
                  <button
                    onClick={() => copyMessage(message.id, message.text)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105 flex items-center gap-1 ${
                      isCopied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <span>{isCopied ? '✅' : '📋'}</span>
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => likeMessage(message.id)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105 flex items-center gap-1 ${
                      isLiked
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <span>{isLiked ? '❤️' : '🤍'}</span>
                    <span>{isLiked ? 'Liked' : 'Helpful'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;