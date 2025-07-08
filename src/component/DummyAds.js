// components/DummyAds.js
import { FaChartBar, FaBookmark, FaDollarSign } from "react-icons/fa";

const DummyAds = ({ variant = "default" }) => {
  const ads = {
    default: [
      { title: "Market Trends Report", icon: <FaChartBar /> },
      { title: "Investment Guide", icon: <FaBookmark /> }
    ],
    insights: [
      { title: "Sector Analysis", icon: <FaChartBar /> },
      { title: "Economic Outlook", icon: <FaDollarSign /> }
    ],
    recommended: [
      { title: "Must-Read Articles", icon: <FaBookmark /> },
      { title: "Editor's Picks", icon: <FaBookmark /> }
    ]
  };

  return (
    <div className="space-y-4">
      {ads[variant].map((ad, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
              {ad.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{ad.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DummyAds;