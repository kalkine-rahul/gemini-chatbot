// components/Megamenu.js
'use client'

import Link from "next/link";

export default function Megamenu() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50"> {/* Changed here */}
      <header className="w-full px-2 bg-black/80 backdrop-blur-sm shadow-lg py-2">
        <div className="px-4 flex items-center h-16 lg:h-20 justify-between gap-5 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h5 className="font-bold text-xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                BullsEye
              </h5>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link href="#" className="text-base text-white hover:text-opacity-80 transition-colors">
              Features
            </Link>
            <Link href="/market-news" className="text-base text-white hover:text-opacity-80 transition-colors">
              Market News
            </Link>
            <Link href="/news-sentiment" className="text-base text-white hover:text-opacity-80 transition-colors">
              InsightStream
            </Link>
            <Link href="#" className="text-base text-white hover:text-opacity-80 transition-colors">
              Pricing
            </Link>
            <Link href="/aboutPage" className="text-base text-white hover:text-opacity-80 transition-colors">
              About Me
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              Cart
            </Link>
            <Link href="#" className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-medium text-white bg-white/20 hover:bg-white/40 rounded-lg transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile */}
          <button type="button" className="inline-flex p-2 text-white rounded-md lg:hidden hover:bg-gray-800 focus:bg-gray-800 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}