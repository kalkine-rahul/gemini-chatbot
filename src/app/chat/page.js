"use client";

import { useState } from "react";
import { getGeminiResponse } from "@/lib/gemini";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await getGeminiResponse(input);
      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("Gemini API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl text-blue-600/100 dark:text-sky-400/100 mb-4">
        Ask Your Questions
      </h1>

      <div className="space-y-3 mb-4 max-h-[39vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto text-right"
                : "bg-gray-200 text-black text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="italic text-gray-400">Gemini is typing...</div>
        )}
      </div>

      <div className="flex gap-2">
        <textarea
          rows={1}
          className="flex-grow border border-gray-900 p-2 rounded resize-none
          focus:border-sky-500 focus:outline-sky-500 focus:outline-2 text-blue-900"
          placeholder="Ask Gemini..."
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
