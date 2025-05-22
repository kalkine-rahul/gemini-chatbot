import StockTable from './StockTable';



export default function MarketData() {
  return (
    <div className='bg-blue-50 py-4 mt-16'>
    <div className="container mx-auto px-2 max-w-7xl sm:px-6 lg:px-6 bg-white border-r-8">
      <StockTable  />
    </div>
    </div>
  );
}
