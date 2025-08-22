import { React, useState, useEffect } from "react";

const GlobalChat = () => {
  const [input, setInput] = useState("");
  const sendMessage = () => {
    console.log("Send message function called");
  };

  const [messages, setMessageInput] = useState([
    {
      id: 1,
      sender: "Elena",
      text: "Hey, have you tried the new CChat voice rooms?",
    },
    { id: 2, sender: "You", text: "Not yet! Are they as good as they sound?" },
    { id: 3, sender: "Elena", text: "Better. It’s like talking in velvet." },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#2c3e50] flex flex-col items-center justify-center text-white px-4 py-23">
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-300">CChat</h2>
          <span className="text-sm text-white/60">Elena Kapoor</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="px-6 py-4 border-t border-white/10 flex items-center space-x-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlobalChat;
