// components/Landing.js
'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Landing() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated gradient dots background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:60px_60px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className={`relative z-10 px-4 mx-auto max-w-7xl w-full transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold sm:text-7xl md:text-8xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
              Market Intelligence
            </span>
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Made Simple
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            At <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">BullsEye</span>, 
            we transform complex market data into actionable insights with our AI-powered analytics platform.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-300/20 shadow-lg hover:shadow-xl"
            >
              Get Started
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="#"
              className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-white/10 rounded-lg hover:bg-white/20 focus:ring-4 focus:ring-white/20 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "24/7", label: "Market Coverage" },
              { value: "99.9%", label: "Uptime" },
              { value: "AI-Powered", label: "Analytics" }
            ].map((stat, index) => (
              <div key={index} className="p-3">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}