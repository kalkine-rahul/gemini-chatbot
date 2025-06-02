// components/NewsFeed.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import DummyAds from "./DummyAds"; 

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKeyss = process.env.NEXT_PUBLIC_STOCK_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://finnhub.io/api/v1/news?category=top news&token=${apiKeyss}`
        );

        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <>
        <div><h3>Please Wait...</h3></div>
        <div className="dot-box overlay">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </>
    );
  }

  return (
    <div className="p-6  min-h-screen">
    <div className="flex flex-row items-center text-center p-2">
       <Image className="w-24 h-24 object-cover rounded-lg mb-6"
        src="/news-report.webp"
        alt="News Report"
        width={100}
        height={100}
        unoptimized={true}
      />
      <h2 className="text-2xl font-bold mb-6 text-white ">
          Latest Market News
      </h2>
    </div>
     

      <div className="flex flex-col lg:flex-row gap-6">
        {/* News Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={article.image}
                alt={article.headline}
                width={400}
                height={250}
                className="rounded-lg brightness-90 w-full"
                unoptimized={true}
              />
              <div className="p-4">
                <h3 className="text-lg font-light text-gray-800 mb-2">
                  {article.headline}
                </h3>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Column */}
        <div className="w-full lg:w-1/4">
        <h4 className="text-lg font-semibold mb-2 text-white">Trending...</h4>
          <DummyAds />
          <div className="my-6">
            <DummyAds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
