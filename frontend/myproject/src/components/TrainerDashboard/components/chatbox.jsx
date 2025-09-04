import React, { useState, useRef, useEffect } from "react";
import { Send, ExternalLink } from "lucide-react";

const TrainerChatBox = ({ externalChatUrl }) => {
  const [messages, setMessages] = useState([
    { sender: "trainer", text: "Welcome! How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { sender: "you", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const trainerResponse = { sender: "trainer", text: "I received your message. A trainer will be with you shortly!" };
      setMessages((prevMessages) => [...prevMessages, trainerResponse]);
      setIsTyping(false);
    }, 1000); // Simulate network delay
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-xl border flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">
        Trainer Chat
        {isTyping && (
          <span className="text-xs italic text-gray-200 animate-pulse">
            Trainer is typing...
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-60">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm max-w-[80%] ${
              msg.sender === "you"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isTyping}
          className="border rounded-lg p-2 w-full text-sm disabled:bg-gray-100"
        />
        <button
          onClick={sendMessage}
          disabled={isTyping}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center disabled:bg-gray-400"
        >
          <Send size={16} />
        </button>
      </div>

      {/* External Chat Button */}
      <button
        onClick={() => window.open(externalChatUrl, "_blank")}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 flex items-center justify-center gap-2 rounded-b-xl"
      >
        <ExternalLink size={16} /> Open Company Chat Portal
      </button>
    </div>
  );
};

export default TrainerChatBox;