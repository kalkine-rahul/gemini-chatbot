import { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const StockTableLazy = lazy(() => import('./StockTable'));

export default function MarketData() {
  return (
    <div className="py-4 mt-16">
      <div className="container  px-8 max-w-7xl sm:px-6 lg:px-8 rounded-lg">
        <ErrorBoundary fallback={<div className="text-red-500">Failed to load market data.</div>}>
          <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
            <StockTableLazy />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
