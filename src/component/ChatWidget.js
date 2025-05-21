"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ChatPage from "@/app/chat/page";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
   <>
  {open && (
    <div
      style={{
        position: "fixed",
        bottom: "70px",
        right: "20px",
        width: "350px",
        height: "500px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "10px",
        backgroundColor: "white",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatPage />
    </div>
  )}

  {/* GIF above button */}
  <div
    style={{
      position: "fixed",
      bottom: "100px",
      right: "20px",
      zIndex: 1001,
    }}
  >
    <Image
      src="/gif-hello.gif" // replace with your actual GIF path in /public
      alt="Animated Gif"
      width={120}
      height={120}
      style={{
        borderRadius: "10px",
      }}
    />
  </div>

  {/* Chat Button */}
  <button
    onClick={() => setOpen((prev) => !prev)}
    style={{
      position: "fixed",
      bottom: "26px",
      right: "20px",
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: "none",
      cursor: "pointer",
      zIndex: 1001,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      padding: 0,
      animation: "pulse 1.5s infinite ease-in-out",
    }}
  >
    <Image
      src="/gemini-brand-color.webp"
      alt="Chat Icon"
      width={36}
      height={36}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "none",
        borderRadius: "50%",
      }}
      priority
    />
  </button>
</>

  );
}
