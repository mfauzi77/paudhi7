import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    await onSend(input.trim());
    setInput('');
    setLoading(false);
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <form 
        onSubmit={handleSubmit} 
        className="p-2 sm:p-4 flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pertanyaan Anda..."
          className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all duration-200 disabled:bg-gray-100"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px] sm:min-w-[70px]"
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">...</span>
            </div>
          ) : (
            <span>{window.innerWidth < 640 ? '➤' : 'Kirim'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;