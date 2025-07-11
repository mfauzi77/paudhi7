import React, { useEffect, useRef, useState } from 'react';

const ChatMessages = ({ messages, isTyping, onStartConsultation }) => {
  const messagesEndRef = useRef(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [likedMessages, setLikedMessages] = useState(new Set());

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isUser && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const copyMessage = async (messageId, text) => {
    try {
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      await navigator.clipboard.writeText(cleanText);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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

  const WelcomeScreen = () => (
    <div className="flex-1 p-4 sm:p-8 lg:p-20 flex items-center justify-center">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 rounded-full"></div>
          <span className="relative z-10">🌟</span>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
          Selamat datang di PengasuhanAI Pro!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2">
          Saya adalah asisten AI canggih yang siap membantu perjalanan parenting Anda dengan saran ahli, 
          tips praktis, dan dukungan 24/7. Mari mulai diskusi yang bermakna!
        </p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-lg sm:text-xl lg:text-2xl mb-1">🧠</div>
            <div className="font-semibold text-purple-800 text-xs sm:text-sm">AI Cerdas</div>
            <div className="text-xs text-purple-600">Berbasis riset terkini</div>
          </div>
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg sm:text-xl lg:text-2xl mb-1">👨‍👩‍👧‍👦</div>
            <div className="font-semibold text-blue-800 text-xs sm:text-sm">Expert Network</div>
            <div className="text-xs text-blue-600">500+ ahli parenting</div>
          </div>
          <div className="p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg sm:text-xl lg:text-2xl mb-1">🇮🇩</div>
            <div className="font-semibold text-green-800 text-xs sm:text-sm">Konteks Lokal</div>
            <div className="text-xs text-green-600">Sesuai budaya Indonesia</div>
          </div>
          <div className="p-2 sm:p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-lg sm:text-xl lg:text-2xl mb-1">⏰</div>
            <div className="font-semibold text-orange-800 text-xs sm:text-sm">24/7 Support</div>
            <div className="text-xs text-orange-600">Selalu siap membantu</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-4 sm:mb-6">
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
              className={`px-2 sm:px-3 py-1 ${tag.color} rounded-full text-xs sm:text-sm font-medium`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        {/* 👉 Tombol Fokus ke Input */}
        <div className="mt-6">
          <button
            onClick={onStartConsultation}
            className="px-5 py-2.5 bg-purple-600 text-white rounded-full text-sm font-semibold shadow hover:bg-purple-700 transition duration-200"
          >
            🚀 Konsultasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex gap-2 sm:gap-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center text-sm sm:text-base lg:text-lg shadow-lg">
        🧠
      </div>
      <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
          <span className="text-xs sm:text-sm">PengasuhanAI sedang berpikir</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto space-y-3 sm:space-y-4 lg:space-y-6">
      {messages.map((message) => {
        const isLiked = likedMessages.has(message.id);
        const isCopied = copiedMessageId === message.id;

        return (
          <div
            key={message.id}
            className={`flex gap-2 sm:gap-3 lg:gap-4 ${message.isUser ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg font-semibold shadow-lg flex-shrink-0 ${
                message.isUser
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              }`}
            >
              {message.isUser ? '👤' : '🧠'}
            </div>
            <div className={`max-w-[70%] sm:max-w-[60%] group ${message.isUser ? 'items-end' : 'items-start'} flex flex-col break-words`}>
              <div
                className={`p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                }`}
              >
                <div 
                  className="whitespace-pre-wrap break-words leading-relaxed text-xs sm:text-sm"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <div className={`text-xs mt-2 sm:mt-3 flex items-center justify-between ${
                  message.isUser ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>🕐</span>
                    <span>{message.time}</span>
                    {!message.isUser && <span>👤</span>}
                  </div>
                  {!message.isUser && (
                    <div className="flex items-center gap-1 sm:gap-2">
                      {isCopied && <span className="text-green-500 text-xs">✅ Copied</span>}
                      {isLiked && <span className="text-red-500 text-xs">❤️</span>}
                    </div>
                  )}
                </div>
              </div>
              {!message.isUser && (
                <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => copyMessage(message.id, message.text)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105 flex items-center gap-1 ${
                      isCopied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <span>{isCopied ? '✅' : '📋'}</span>
                    <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => likeMessage(message.id)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105 flex items-center gap-1 ${
                      isLiked
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <span>{isLiked ? '❤️' : '🤍'}</span>
                    <span className="hidden sm:inline">{isLiked ? 'Liked' : 'Helpful'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
