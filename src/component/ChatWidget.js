"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ChatPage from "@/app/chat/page";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [gifVisible, setGifVisible] = useState(false);
  const [attentionAnim, setAttentionAnim] = useState(false);

  // Show attention animation periodically when chat is closed
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setAttentionAnim(true);
        setTimeout(() => setAttentionAnim(false), 2000);
      }, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [open]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes attention {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.2) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleChat = () => {
    setOpen(prev => !prev);
    setAttentionAnim(false);
    if (!open) {
      setGifVisible(true);
      const timer = setTimeout(() => setGifVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] shadow-lg rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 z-[1000] flex flex-col animate-fadeIn border border-gray-200">
          <ChatPage />
        </div>
      )}

      {/* Animated Gemini Character */}
      {(gifVisible || attentionAnim) && (
        <div className={`fixed bottom-40 right-5 z-[1001] ${attentionAnim ? 'animate-attention' : 'animate-bounce'}`}>
          <Image
            src={attentionAnim ? "/gemini-wave.gif" : "/gemini-hello.gif"}
            alt="Gemini animation"
            width={120}
            height={120}
            className="rounded-lg cursor-pointer"
            unoptimized
            onClick={toggleChat}
          />
          {attentionAnim && (
            <div className="absolute -bottom-2 left-0 right-0 bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded-full text-center">
              Ask me anything!
            </div>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-7 right-5 w-[70px] h-[70px] rounded-full bg-white cursor-pointer z-[1001] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border-2 ${attentionAnim ? 'border-yellow-400' : 'border-blue-100 hover:border-blue-300'} ${open ? '' : 'animate-pulse'}`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <Image
          src="/gemini-brand-color.webp"
          alt="Chat Icon"
          width={36}
          height={36}
          className={`w-full h-full object-contain p-2 transition-transform ${attentionAnim ? 'scale-110' : 'scale-100'}`}
          priority
        />
      </button>

      {/* Custom styles */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        .animate-attention {
          animation: attention 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
}