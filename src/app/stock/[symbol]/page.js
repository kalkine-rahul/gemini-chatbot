'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function StockDetailPage() {
  const params = useParams();
  const symbol = params?.symbol;
  const [stockInfo, setStockInfo] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
  useEffect(() => {
    const fetchStock = async () => {
      
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      const data = await res.json();
      setStockInfo(data);
    };

    if (symbol) {
      fetchStock();
    }
  }, [symbol, apiKey]);

  return (
    <div className="pt-6 px-5 text-white bg-black min-h-screen container mx-auto py-8 max-w-7xl sm:px-4 lg:px-2">
      <h1 className="text-3xl font-bold mb-4">{symbol} Stock Details</h1>

      {stockInfo ? (
        <div className="mb-6">
          <p>Current Price: ${stockInfo.c}</p>
          <p>Change: {stockInfo.d}</p>
          <p>% Change: {stockInfo.dp}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="mt-6">
        <TradingViewWidget symbol={symbol} />
      </div>

      <Link href="/" className="text-green-400 underline mt-6 block">
        ← Back to Stock List
      </Link>
    </div>
  );
}

function TradingViewWidget({ symbol }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[symbol]],
      chartOnly: false,
      width: '100%',
      height: 500,
      locale: 'en',
      colorTheme: 'dark',
      autosize: true,
      showVolume: true,
    });

    const container = document.getElementById('tv-widget');
    container.innerHTML = '';
    container.appendChild(script);
  }, [symbol]);

  return <div id="tv-widget" className="w-full h-[500px] bg-[#1e1e1e]" />;
}
