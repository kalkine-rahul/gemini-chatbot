// components/NewsFeed.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import DummyAds from "./DummyAds";
import { FaExternalLinkAlt, FaClock, FaChartLine } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState(6);

  const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://finnhub.io/api/v1/news?category=top news&token=${apiKey}`
        );
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
   <div className="bg-gray-50 pt-24 px-4 md:px-8 min-h-screen"> {/* Added pt-24 here */}
      {/* Header - Now appears below the fixed menu */}
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <FaChartLine className="text-blue-600 text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Market News</h1>
          <p className="text-gray-600">Stay updated with the latest financial headlines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main News Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Skeleton height={180} />
                  <div className="p-4">
                    <Skeleton count={3} />
                    <Skeleton width={100} />
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
                  {error}
                </div>
              </div>
            ) : news.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                No news articles available at this time
              </div>
            ) : (
              news.slice(0, visibleItems).map((article, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image || "/news-placeholder.jpg"}
                      alt={article.headline}
                      fill
                      className="object-cover"
                      unoptimized={true}
                      priority={index < 3}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaClock className="mr-1" />
                      {formatDate(article.datetime || Date.now()/1000)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.headline}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.summary || "No summary available"}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read full story <FaExternalLinkAlt className="ml-1" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && news.length > visibleItems && (
            <div className="text-center mt-8 mb-5">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-white border border-b-blue-950 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Load More News
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-600" />
              Trending Stories
            </h2>
            <DummyAds />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Market Insights
            </h2>
            <DummyAds variant="insights" />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recommended Reads
            </h2>
            <DummyAds variant="recommended" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;