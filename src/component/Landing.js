'use client'


import { useEffect, useState } from "react";

export default function Landing() {
 
  return (

      <section className="relative pt-24 sm:pt-32 overflow-hidden mb-5">
              {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          src="/land.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-black/60" />
      </div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
     
          <div className="max-w-xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
                We invest in the{" "}
              </span>
            </h1>
            <h1 className="text-4xl font-bold sm:text-6xl">
              <span className="typewriter fire-text text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
                world’s potential
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-xl">
              At{" "}
              <span className="font-extrabold fire-text text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
                BullsEye
              </span>
              , we empower investors by delivering real-time market insights,
              intelligent analysis, and tools to make informed, data-driven
              investment decisions that unlock long-term financial value.
            </p>

            <a
              href="#"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700"
            >
              Invest Here
              <svg
                className="w-6 h-6 ml-8 -mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
  );
}
