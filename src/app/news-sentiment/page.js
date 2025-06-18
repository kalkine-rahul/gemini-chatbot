"use client";

import Pagination from "@/component/Pagination";
import { useState } from "react";

export default function NewsSentimentPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNews = async () => {
    const res = await fetch(`/api/news?query=${query}`);
    if (!res.ok) {
      console.error("Failed to fetch news");
      return;
    }
    const data = await res.json();
    setArticles(data.articles || []);
  };

  const analyzeSentiment = async (text) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSentiment({ text, compound: data.sentiment.compound });
    } catch (error) {
      console.error("Sentiment analysis failed:", error);
    }
    setLoading(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    // 🔢 Paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  const getSentimentLabel = (compound) => {
    if (compound > 0.05) return { label: "Positive", color: "bg-green-500" };
    if (compound < -0.05) return { label: "Negative", color: "bg-red-500" };
    return { label: "Neutral", color: "bg-gray-500" };
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex gap-2">
        <input
          className=" p-2 flex-1 text-white px-4 py-2 rounded border-white border-2  transition-colors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search News..."
        />
        <button onClick={fetchNews} className=" text-white px-4 py-2 rounded border-white border-2  transition-colors">
          Get News
        </button>
      </div>

      <ul className="space-y-4">
        {paginatedArticles.map((article, i) => (
          <li key={i} className="border p-4 rounded shadow">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold block mb-1 text-lg text-white hover:underline dark:text-blue-300"
            >
              {article.title || "No title"}
            </a>
            <p className="text-sm text-white mb-2">{article.description || "No description"}</p>
            <button
              onClick={() => {
                setSelectedText(article.title);
                analyzeSentiment(article.title);
              }}
              className="text-sm bg-amber-700 text-white px-3 py-1 rounded border-2 border-white transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Analyze Sentiment
            </button>
          </li>
        ))}
      </ul>

      {sentiment && (
        <div
          className={`p-4 rounded text-white font-medium ${getSentimentLabel(sentiment.compound).color}`}
        >
          Sentiment for: <em>{selectedText}</em> →{" "}
          <strong>{getSentimentLabel(sentiment.compound).label}</strong>
        </div>
      )}
     <Pagination
  totalItems={articles.length} // ✅ CORRECT: total articles fetched
  itemsPerPage={itemsPerPage}
  currentPage={currentPage}
  onPageChange={handlePageChange}
/>

    </div>
  );
}
