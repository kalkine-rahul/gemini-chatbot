// components/Megamenu.js

import Link from "next/link";


export default function Megamenu() {
  return (
   <div className="relative">
     

      {/* Header */}
      <header className="inset-x-0 top-0 w-full px-2 shadow-lg py-2">
        <div className="px-4 flex items-center h-16 lg:h-20 justify-between gap-1">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex">
              <h5
                className="font-bold text-xl lg:text-4xl text-transparent bg-clip-text"
                style={{
                  background: "linear-gradient(315deg, #00ec82 25%, #6679db)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                BullsEye
              </h5>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <a href="#" className="text-base text-white hover:text-opacity-80">Features</a>
            <a href="/market-news" className="text-base text-white hover:text-opacity-80">Market News</a>
            <a href="/news-sentiment" className="text-base text-white hover:text-opacity-80">InsightStream</a>
            <a href="#" className="text-base text-white hover:text-opacity-80">Pricing</a>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4 sm:ml-auto">
          
            <a
              href="#"
              className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-white/20 hover:bg-white/40 rounded-lg"
            >
              Login
            </a>
          </div>

          {/* Mobile */}
          <button
            type="button"
            className="inline-flex p-2 ml-1 text-white rounded-md sm:ml-4 lg:hidden hover:bg-gray-800 focus:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>
    
    </div>
  );
}

