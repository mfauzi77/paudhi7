import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import { callGeminiAPI } from './geminiAPI';

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addMessage = (text, isUser) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserInput = async (inputText) => {
    addMessage(inputText, true);
    setIsTyping(true);
    setIsSidebarOpen(false); // Close sidebar on mobile after sending

    try {
      const aiReply = await callGeminiAPI(inputText);
      addMessage(aiReply, false);
    } catch (err) {
      addMessage("❌ Gagal mendapatkan jawaban dari AI.", false);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setIsSidebarOpen(false); // Close sidebar after selection
    handleUserInput(question);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 pt-16 sm:pt-17">
      
      <div className="flex-1 flex justify-center overflow-hidden">
        <main className="w-full max-w-screen-lg flex flex-col md:flex-row bg-white shadow-xl rounded-none sm:rounded-lg overflow-hidden m-0 sm:m-4">

          {/* Mobile Header with Sidebar Toggle */}
          <div className="md:hidden bg-white border-b border-gray-200 p-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-800">PengasuhanAI Pro</h1>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Sidebar - Desktop: Always visible, Mobile: Overlay */}
          <aside className={`
            md:w-[300px] lg:w-[380px] border-r border-gray-200 bg-white
            ${isSidebarOpen ? 'fixed inset-0 z-50 w-full' : 'hidden md:block'}
            transition-all duration-300
          `}>
            {/* Mobile Sidebar Header */}
            {isSidebarOpen && (
              <div className="md:hidden bg-white border-b border-gray-200 p-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Quick Topics</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <Sidebar onQuickQuestion={handleQuickQuestion} />
          </aside>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Chat Area */}
          <section className="flex-1 flex flex-col h-full md:h-auto">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto">
              <ChatMessages messages={messages} isTyping={isTyping} />
            </div>
            
            {/* Chat Input - Fixed at bottom on mobile */}
            <div className="border-t border-gray-200 bg-white">
              <ChatInput onSend={handleUserInput} />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}