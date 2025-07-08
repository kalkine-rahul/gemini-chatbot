"use client";

import { useState, useRef, useEffect } from "react";
import { getGeminiResponse } from "@/lib/gemini";
import { FiSend, FiLoader } from "react-icons/fi";
import { BsRobot, BsPerson } from "react-icons/bs";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getGeminiResponse(input);
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [...prev, { 
        role: "bot", 
        text: "Sorry, I encountered an error. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
        <BsRobot className="text-blue-600 text-xl mr-2" />
        <h1 className="text-xl font-semibold text-blue-600">AI Assistant</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <BsRobot className="text-4xl mb-2 text-blue-100" />
            <p>How can I help you today?</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[85%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="mr-2 mt-0.5">
                  {msg.role === "user" ? (
                    <BsPerson className="text-white" />
                  ) : (
                    <BsRobot className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[85%] flex items-center">
              <FiLoader className="animate-spin mr-2 text-blue-600" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-3">
        <div className="flex gap-2">
          <textarea
            rows={1}
            className="flex-grow border border-gray-300 p-2 rounded-lg resize-none
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800
            transition-all duration-200"
            placeholder="Type your message and Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700
            disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
            flex items-center justify-center w-12 h-12"
            aria-label="Send message"
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Gemini may produce inaccurate information
        </p>
      </div>
    </div>
  );
}