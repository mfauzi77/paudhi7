import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import { callGeminiAPI } from './geminiAPI';

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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
    handleUserInput(question);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex justify-center overflow-hidden">
        <main className="w-full max-w-screen-lg flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden m-4">

          {/* Sidebar */}
          <aside className="hidden md:block md:w-[300px] border-r border-gray-200 bg-white">
            <Sidebar onQuickQuestion={handleQuickQuestion} />
          </aside>

          {/* Area Chat */}
          <section className="flex-1 flex flex-col h-full md:h-auto">
            <div className="flex-1 overflow-y-auto px-3 pt-4 pb-32 md:pb-4">
              <ChatMessages messages={messages} isTyping={isTyping} />
            </div>
            <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto border-t border-gray-200 bg-white px-3 py-2 z-50">
              <div className="max-w-screen-lg mx-auto">
                <ChatInput onSend={handleUserInput} />
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
