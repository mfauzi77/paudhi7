import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, shouldFocus }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus input when shouldFocus changes
  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const messageText = input.trim();
    setLoading(true);
    setInput(''); // Clear input immediately after capturing the text
    
    try {
      await onSend(messageText);
    } catch (error) {
      // If there's an error, restore the input text
      setInput(messageText);
    } finally {
      setLoading(false);
      // Focus back to input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <form 
        onSubmit={handleSubmit} 
        className="p-1.5 sm:p-2 md:p-3 flex items-center gap-1.5 sm:gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pertanyaan Anda..."
          className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm transition-all duration-200 disabled:bg-gray-100"
          disabled={loading}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]"
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline text-xs">...</span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm">{window.innerWidth < 640 ? '➤' : 'Kirim'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;