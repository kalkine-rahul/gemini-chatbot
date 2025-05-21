'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'NFLX', 'FB', 'NVDA', 'AMD', 'INTC'];

export default function StockTable() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const requests = symbols.map(async (symbol) => {
           const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
          const res = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}` 
          );
          const data = res.data;
          
          const price = data.c;
          const change = data.c - data.pc;
          const percentChange = ((change / data.pc) * 100).toFixed(2);

          return {
            symbol,
            price,
            change: change.toFixed(2),
            percentChange,
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

  return (
    <>
      {/* Marquee */}
       <h2 className="text-2xl text-amber-700 font-bold py-5">Current Market Data</h2>
      <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 border-y border-green-400">
        <div className="animate-marquee inline-block">
          {stockData.map((stock) => (
            <span key={stock.symbol} className="mx-6">
              <span className="font-semibold">{stock.symbol}</span>:&nbsp;
              <span className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${stock.price} ({stock.percentChange}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
  <table className="min-w-full  text-white rounded-lg">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left border-b border-green-700 text-amber-600 text-xl">Symbol</th>
      <th className="px-6 py-3 text-left border-b border-green-700 text-sky-600 text-xl">Price</th>
      <th className="px-6 py-3 text-left border-b border-green-700 text-pink-400 text-xl">Change</th>
      <th className="px-6 py-3 text-left border-b border-green-700 text-indigo-400 text-xl">% Change</th>
    </tr>
  </thead>
  <tbody>
    {stockData.map((stock, index) => {
      const isPositive = stock.change >= 0;
      const colorClass = isPositive ? 'text-green-700' : 'text-red-700';

      return (
        <tr key={index} className="hover:bg-[#1a1f1f] bg-current">
          {/* Symbol */}
          <td className="px-6 py-4 border-b border-green-700 text-blue-400">
            <Link
              href={`/stock/${stock.symbol}`}
              className="hover:underline cursor-pointer hover:text-blue-400 transition duration-200 font-bold"
            >
              {stock.symbol}
            </Link>
          </td>

          {/* Price */}
          <td className={`px-6 py-4 border-b border-green-700 font-bold ${colorClass}`}>
            ${stock.price}
          </td>

          {/* Change */}
          <td className={`px-6 py-4 border-b border-green-700 font-bold ${colorClass}`}>
            {stock.change}
          </td>

          {/* % Change */}
          <td className={`px-6 py-4 border-b border-green-700 font-bold ${colorClass}`}>
            {stock.percentChange}%
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
      </div>
    </>
  );
}
