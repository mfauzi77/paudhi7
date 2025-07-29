import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, shouldFocus }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Focus input when shouldFocus changes
  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  // Clear error when user starts typing
  useEffect(() => {
    if (input.trim() && error) {
      setError('');
    }
  }, [input, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validasi input
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
      setError('❌ Pesan tidak boleh kosong');
      return;
    }

    if (trimmedInput.length < 2) {
      setError('❌ Pesan terlalu pendek, minimal 2 karakter');
      return;
    }

    if (trimmedInput.length > 1000) {
      setError('❌ Pesan terlalu panjang, maksimal 1000 karakter');
      return;
    }

    if (loading) {
      setError('⏳ Tunggu hingga pesan sebelumnya selesai diproses');
      return;
    }

    setLoading(true);
    setInput(''); // Clear input immediately after capturing the text
    
    try {
      await onSend(trimmedInput);
    } catch (error) {
      console.error('Chat input error:', error);
      // If there's an error, restore the input text
      setInput(trimmedInput);
      setError('❌ Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoading(false);
      // Focus back to input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Prevent input yang terlalu panjang
    if (value.length <= 1000) {
      setInput(value);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <form 
        onSubmit={handleSubmit} 
        className="p-1.5 sm:p-2 md:p-3 flex flex-col gap-1.5 sm:gap-2"
      >
        {/* Error message */}
        {error && (
          <div className="text-xs sm:text-sm text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Tulis pertanyaan Anda..."
            className={`flex-1 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm transition-all duration-200 disabled:bg-gray-100 ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            maxLength={1000}
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
        </div>
        
        {/* Character counter */}
        <div className="text-xs text-gray-500 text-right">
          {input.length}/1000 karakter
        </div>
      </form>
    </div>
  );
};

export default ChatInput;