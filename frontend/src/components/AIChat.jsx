import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function AIChat() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hi! I’m your Global Connect assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
const api = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await axios.post(`${api}/api/ai/get-res`, { code: input });
      const aiText = res.data?.reply || "Sorry, I couldn’t respond.";
      setMessages((prev) => [...prev, { from: "ai", text: aiText }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { from: "ai", text: "⚠️ Sorry, I couldn’t respond." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[25%] bg-[#2C2C2C] rounded-2xl p-4 shadow-lg flex flex-col h-[90vh] mt-[90px]">
      <h3 className="font-bold text-lg mb-3">AI Assistant</h3>

      {/* Chat messages */}
      <div className="flex-1 mb-3 flex flex-col gap-2 overflow-y-auto p-1 hide-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] prose prose-sm ${
              msg.from === "ai"
                ? "bg-[#1A1F71] text-white self-start"
                : "bg-[#FFD700] text-[#1A1F71] self-end"
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-lg bg-[#1A1F71] text-white focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          className="px-4 py-3 bg-[#FFD700] text-[#1A1F71] rounded-lg font-bold"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default AIChat;
