'use client'
import React, { useState, useEffect } from 'react';

const product = [
  {
    id: 1,
    name: 'USBN',
    description: 'A USBN is a Universal Serial Bus Network, which is a type of network that uses USB technology to connect devices.',
    price: '99.99',
    features: [
      'Feature 1: High-speed data transfer',
      'Feature 4: Durable and reliable performance',
      'Feature 5: Compatible with multiple devices'
    ],
  },
  {
    id: 2,
    name: 'ISBT',
    description: 'A ISBT is a Universal Serial Bus Network, which is a type of network that uses USB technology to connect devices.',
    price: '87.90',
    features: [
      'Feature 1: High-speed data transfer',
      'Feature 2: Plug and play compatibility',
    ]
  }
];

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleProduct = (productName) => {
    setSelectedProduct([...selectedProduct, productName]);
    setToastMessage(`${productName.name} added to cart`);
    setShowToast(true);
  };

  // Auto-hide the toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Pricing Plans</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {product.map((products) => (
          <div
            key={products.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{products.name}</h2>
              <p className="mt-2 text-gray-700">{products.description}</p>
            </div>
            <div className="mt-4">
              <span className="text-lg font-bold text-indigo-600">₹{products.price}</span>
              <button
                className="ml-4 px-4 py-2 text-sm font-medium text-black rounded border border-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleProduct(products)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {showToast && (
        <div
          className="fixed z-50 bg-green-600 text-white font-semibold tracking-wide flex items-center max-w-sm p-4 rounded-md shadow-lg"
          style={{ top: '74px', right: '30px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] shrink-0 fill-white inline mr-3" viewBox="0 0 512 512">
            <ellipse cx="256" cy="256" fill="#fff" data-original="#fff" rx="256" ry="255.832" />
            <path className="fill-green-600"
              d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
              data-original="#ffffff" />
          </svg>

          <span className="block text-[15px] mr-3">{toastMessage}</span>

          <svg
            onClick={() => setShowToast(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 cursor-pointer shrink-0 fill-white ml-auto"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000" />
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000" />
          </svg>
        </div>
      )}
    </div>
  );
}
