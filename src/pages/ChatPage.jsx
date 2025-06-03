import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Halo! Aku siap mengobrol.", sender: "bot", avatar: getRandomAvatar() }
  ]);
  const [input, setInput] = useState("");

  function getRandomAvatar() {
    const avatars = [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3"
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user", avatar: getRandomAvatar() }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "system", content: "Kamu adalah asisten ramah." }, ...newMessages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))],
          max_tokens: 100
        })
      });

      const data = await response.json();
      const aiReply = data.choices[0].message.content;

      setMessages([...newMessages, { text: aiReply, sender: "bot", avatar: getRandomAvatar() }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg flex flex-col h-[500px]">
        <div className="flex justify-between items-center p-3 border-b bg-blue-500 text-white rounded-t-lg">
          <h1 className="text-xl font-bold">Chat AI</h1>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && <img src={msg.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />}
              <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                {msg.text}
              </div>
              {msg.sender === "user" && <img src={msg.avatar} alt="Avatar" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>
        <div className="flex p-2 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow p-2 border rounded-l-lg text-sm"
            placeholder="Ketik pesan..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 text-sm"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
