'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const symbols = [
  'AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'NFLX', 'META', 'NVDA', 'AMD', 'INTC',
  'BABA', 'CRM', 'UBER', 'DIS', 'PYPL', 'ADBE', 'ORCL', 'PEP', 'KO', 'NKE',
  'BA', 'WMT', 'COST', 'T', 'VZ', 'QCOM', 'CSCO', 'JNJ', 'PFE', 'XOM', 'CVX'
];

export default function StockTable() {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showGainersOnly, setShowGainersOnly] = useState(false);
  const [showLosersOnly, setShowLosersOnly] = useState(false);

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
        const requests = symbols.map(async (symbol) => {
          const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
          const d = res.data;

          return {
            symbol,
            current: d.c,
            change: d.d,
            percentChange: d.dp,
            high: d.h,
            low: d.l,
            open: d.o,
            prevClose: d.pc
          };
        });

        const allStockData = await Promise.all(requests);
        setStockData(allStockData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchAllStocks();
  }, []);

  // 🔍 Apply filters
  const filteredData = stockData.filter((stock) => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const isGainer = showGainersOnly ? stock.change > 0 : true;
    const isLosers = showLosersOnly ? stock.change < 0 : true;
    return matchesSearch && isGainer && isLosers;
  });

  return (
    <div className="text-white bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold py-5">Current Market Data</h2>

      {/* 🔎 Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded text-white"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showGainersOnly}
            onChange={() => setShowGainersOnly(!showGainersOnly)}
          />
          Show Gainers Only
        </label> <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showGainersOnly}
            onChange={() => setShowLosersOnly(!showLosersOnly)}
          />
          Show Losers Only
        </label>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 border-y border-green-400">
        <div className="animate-marquee inline-block min-w-full">
          {[...stockData, ...stockData].map((stock, idx) => (
            <span key={`${stock.symbol}-${idx}`} className="mx-6">
              <span className="font-semibold">{stock.symbol}</span>:&nbsp;
              <span className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${stock.current.toFixed(2)} ({stock.change.toFixed(2)} | {stock.percentChange.toFixed(2)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-white rounded-lg text-sm">
          <thead>
            <tr className="text-left border-b border-green-700">
              <th className="px-4 py-2 text-amber-600 bg-black sticky left-0 z-20 sm:static sm:bg-transparent">Symbol</th>
              <th className="px-4 py-2 text-sky-500">Current</th>
              <th className="px-4 py-2 text-pink-500">Change</th>
              <th className="px-4 py-2 text-indigo-500">% Change</th>
              <th className="px-4 py-2 text-green-400">High</th>
              <th className="px-4 py-2 text-green-300">Low</th>
              <th className="px-4 py-2 text-yellow-400">Open</th>
              <th className="px-4 py-2 text-gray-400">Prev Close</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((stock, index) => {
              const isPositive = stock.change >= 0;
              const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

              return (
                <tr key={index} className="border-b border-green-700">
                  <td className="px-4 py-2 font-bold text-blue-400 bg-black sticky left-0 z-10 sm:static sm:bg-transparent">
                    <Link href={`/stock/${stock.symbol}`} className="hover:underline">
                      {stock.symbol}
                    </Link>
                  </td>
                  <td className={`px-4 py-2 ${colorClass}`}>${stock.current.toFixed(2)}</td>
                  <td className={`px-4 py-2 ${colorClass}`}>{stock.change.toFixed(2)}</td>
                  <td className={`px-4 py-2 ${colorClass}`}>{stock.percentChange.toFixed(2)}%</td>
                  <td className="px-4 py-2 text-white">${stock.high.toFixed(2)}</td>
                  <td className="px-4 py-2 text-white">${stock.low.toFixed(2)}</td>
                  <td className="px-4 py-2 text-white">${stock.open.toFixed(2)}</td>
                  <td className="px-4 py-2 text-white">${stock.prevClose.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
