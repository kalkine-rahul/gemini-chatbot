import React, {Suspense, lazy} from 'react';

// import StockTable from './StockTable';

const StockTableLazy = lazy(() => import('./StockTable'));


export default function MarketData() {
  return (
    <div className='bg-blue-50 py-4 mt-16'>
    <div className="container mx-auto px-8 max-w-7xl sm:px-6 lg:px-8  rounded-lg">
      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
      <StockTableLazy  />
      </Suspense>
    </div>
    </div>
  );
}
