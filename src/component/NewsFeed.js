// components/NewsFeed.js
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const apiKeyss = process.env.NEXT_PUBLIC_STOCK_API_KEY;
  useEffect(() => {
    const fetchNews = async () => {
        
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/news?category=top news&token=${apiKeyss}`);
         
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Market News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={article.image}
              alt={article.headline}
              className="w-full h-48 object-cover"
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
    </div>
  );
};

export default NewsFeed;
