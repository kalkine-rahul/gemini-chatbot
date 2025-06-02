// components/DummyAd.tsx
export default function DummyAds() {
  return (
    <div className="w-full h-64 bg-white border border-dashed border-gray-400 rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-500 text-sm p-4">
        
      <div className="w-full h-6 bg-gray-200 mb-4 rounded animate-pulse"></div>
      <div className="w-3/4 h-4 bg-gray-200 mb-2 rounded animate-pulse"></div>
      <div className="w-2/3 h-4 bg-gray-200 mb-4 rounded animate-pulse"></div>
      <div className="w-full h-8 bg-blue-300 rounded animate-pulse text-center text-white">
        &nbsp;
      </div>
      <p className="mt-4 text-xs text-gray-400">Ad Placeholder</p>
    </div>
  );
}
