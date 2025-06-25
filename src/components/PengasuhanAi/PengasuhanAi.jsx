import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <main className="flex flex-col min-h-screen">
      <ChatHeader />

      {/* Chat Messages Section */}
      <ChatMessages messages={messages} isTyping={isTyping} />

      <ChatInput />
    </main>
  );
}
