"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";

const symbols = [
  "AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "META", "NVDA", "AMD", "INTC",
  "BABA", "CRM", "UBER", "DIS", "PYPL", "ADBE", "ORCL", "PEP", "KO", "NKE",
  "BA", "WMT", "COST", "T", "VZ", "QCOM", "CSCO", "JNJ", "PFE", "XOM", "CVX",
];

const safeToFixed = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) return '0.00';
  return value.toFixed(decimals);
};

export default function StockTable() {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGainersOnly, setShowGainersOnly] = useState(false);
  const [showLosersOnly, setShowLosersOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alerts, setAlerts] = useState([]);
  const [priceThresholds, setPriceThresholds] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [lowerThreshold, setLowerThreshold] = useState(0);
  const [upperThreshold, setUpperThreshold] = useState(0);
  const socketRef = useRef(null);
  const itemsPerPage = 10;

  // Filter and pagination logic
  const filteredData = stockData.filter((stock) => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const isGainer = showGainersOnly ? stock.change > 0 : true;
    const isLoser = showLosersOnly ? stock.change < 0 : true;
    return matchesSearch && isGainer && isLoser;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // WebSocket connection
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
    socketRef.current = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      symbols.forEach(symbol => {
        socketRef.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle trade updates
        if (data.type === 'trade' && Array.isArray(data.data)) {
          data.data.forEach(tradeData => {
            if (tradeData && tradeData.s && tradeData.p) {
              handleTradeUpdate(tradeData);
            }
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        const requests = symbols.map(async (symbol) => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          );
          const d = await res.json();
          return {
            symbol,
            current: d?.c || 0,
            change: d?.d || 0,
            percentChange: d?.dp || 0,
            high: d?.h || 0,
            low: d?.l || 0,
            open: d?.o || 0,
            prevClose: d?.pc || 0,
          };
        });
        const initialData = await Promise.all(requests);
        setStockData(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    // Request notification permission
    if (typeof window !== 'undefined' && window.Notification) {
      Notification.requestPermission();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleTradeUpdate = (trade) => {
    setStockData(prevData => {
      const newData = [...prevData];
      const index = newData.findIndex(item => item.symbol === trade.s);
      
      if (index !== -1) {
        const prevClose = newData[index].prevClose || trade.p;
        const change = trade.p - prevClose;
        const percentChange = (change / prevClose) * 100;
        
        newData[index] = {
          ...newData[index],
          current: trade.p,
          change,
          percentChange,
          high: Math.max(newData[index].high || 0, trade.p),
          low: Math.min(newData[index].low || Infinity, trade.p),
          open: newData[index].open || trade.p,
          prevClose
        };
        
        checkPriceAlerts(trade.s, trade.p);
      }
      
      return newData;
    });
  };

  const checkPriceAlerts = (symbol, price) => {
    if (!priceThresholds[symbol]) return;

    const { lower, upper } = priceThresholds[symbol];
    
    if (price <= lower || price >= upper) {
      const newAlert = {
        id: Date.now(),
        symbol,
        price,
        type: price >= upper ? 'upper' : 'lower',
        threshold: price >= upper ? upper : lower,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      
      if (typeof window !== 'undefined' && window.Notification?.permission === 'granted') {
        new Notification(`Alert: ${symbol} hit $${price.toFixed(2)} (${newAlert.type} threshold)`);
      }
    }
  };

  const addPriceAlert = () => {
    if (!selectedSymbol || (!lowerThreshold && !upperThreshold)) return;
    
    setPriceThresholds(prev => ({
      ...prev,
      [selectedSymbol]: { 
        lower: Number(lowerThreshold) || 0,
        upper: Number(upperThreshold) || Infinity 
      }
    }));
    
    setLowerThreshold(0);
    setUpperThreshold(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showGainersOnly, showLosersOnly]);

  return (
    <div className="text-white p-5 rounded-lg shadow-lg">
      <div className="flex flex-row items-center text-center p-3">
        <Image
          className="w-24 rounded-lg mr-1"
          src="/animated-logo.gif"
          width={100}
          height={100}
          alt="Current Market Data"
          style={{
            float: "left",
            clipPath: "circle(50%)",
            shapeOutside: "circle(50%)"
          }}
        />
        <h2 className="text-2xl font-bold py-5">Current Market Data</h2>
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded text-white bg-gray-700"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showGainersOnly}
            onChange={() => setShowGainersOnly(!showGainersOnly)}
          /> 
          Show Gainers Only
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showLosersOnly}
            onChange={() => setShowLosersOnly(!showLosersOnly)}
          />
          Show Losers Only
        </label>
      </div>

      {/* Alert Display Section */}
      <div className="mb-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Active Alerts</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-400">No alerts triggered yet</p>
        ) : (
          <div className="space-y-2">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-md ${
                  alert.type === 'upper' ? 'bg-green-900/50' : 'bg-red-900/50'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-bold">{alert.symbol}</span>
                  <span>${safeToFixed(alert.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Hit {alert.type} threshold (${safeToFixed(alert.threshold)})</span>
                  <span className="text-gray-400">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Configuration Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3">Set New Alert</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="flex-1 p-2 bg-gray-700 rounded text-white"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          >
            {symbols.map(symbol => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
          
          <div className="flex-1 flex gap-2">
            <input
              type="number"
              placeholder="Lower price"
              className="flex-1 p-2 bg-gray-700 rounded text-white"
              value={lowerThreshold || ''}
              onChange={(e) => setLowerThreshold(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Upper price"
              className="flex-1 p-2 bg-gray-700 rounded text-white"
              value={upperThreshold || ''}
              onChange={(e) => setUpperThreshold(Number(e.target.value))}
            />
          </div>
          
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
            onClick={addPriceAlert}
            disabled={!lowerThreshold && !upperThreshold}
          >
            Set Alert
          </button>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 border-y border-green-400">
        <div className="animate-marquee inline-block min-w-full">
          {[...stockData, ...stockData].map((stock, idx) => (
            <span key={`${stock.symbol}-${idx}`} className="mx-6">
              <span className="font-semibold">{stock.symbol}</span>:&nbsp;
              <span className={`${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                ${safeToFixed(stock.current)} ({safeToFixed(stock.change)} | {safeToFixed(stock.percentChange)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6 bg-black rounded-lg shadow-lg">
        <table className="min-w-full text-white rounded-lg text-sm">
          <thead>
            <tr className="text-left border-b border-green-700">
              <th className="px-4 py-2 text-amber-600 bg-black sticky left-0 z-20">Symbol</th>
              <th className="px-4 py-2 text-sky-600">Current</th>
              <th className="px-4 py-2 text-pink-600">Change</th>
              <th className="px-4 py-2 text-indigo-700">% Change</th>
              <th className="px-4 py-2 text-green-500">High</th>
              <th className="px-4 py-2 text-green-400">Low</th>
              <th className="px-4 py-2 text-yellow-500">Open</th>
              <th className="px-4 py-2 text-gray-300">Prev Close</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-red-400 py-4">
                  No results found.
                </td>
              </tr>
            ) : (
              currentData.map((stock, index) => {
                const colorClass = stock.change >= 0 ? "text-green-500" : "text-red-500";
                return (
                  <tr key={index} className="border-b border-green-700">
                    <td className="px-4 py-2 font-bold text-blue-400 bg-black sticky left-0 z-10">
                      <Link href={`/stock/${stock.symbol}`} className="hover:underline">
                        {stock.symbol}
                      </Link>
                    </td>
                    <td className={`px-4 py-2 ${colorClass}`}>${safeToFixed(stock.current)}</td>
                    <td className={`px-4 py-2 ${colorClass}`}>{safeToFixed(stock.change)}</td>
                    <td className={`px-4 py-2 ${colorClass}`}>{safeToFixed(stock.percentChange)}%</td>
                    <td className="px-4 py-2 text-white">${safeToFixed(stock.high)}</td>
                    <td className="px-4 py-2 text-white">${safeToFixed(stock.low)}</td>
                    <td className="px-4 py-2 text-white">${safeToFixed(stock.open)}</td>
                    <td className="px-4 py-2 text-white">${safeToFixed(stock.prevClose)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination className="bg-black text-white"
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}