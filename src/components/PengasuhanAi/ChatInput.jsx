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
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-gray-200 p-4 bg-white flex items-center gap-3"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis pertanyaan Anda..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Mengirim...' : 'Kirim'}
      </button>
    </form>
  );
};

export default ChatInput;
