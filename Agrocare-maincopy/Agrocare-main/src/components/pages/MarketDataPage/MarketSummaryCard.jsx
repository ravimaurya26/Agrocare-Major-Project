import React from 'react';

const MarketSummaryCard = ({ data, isDarkMode }) => {
    const { priceSummary } = data;
    const cardBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
    
    const isUp = priceSummary.trend.toLowerCase().includes('up');
    const trendIcon = isUp ? '🔺' : priceSummary.trend.toLowerCase().includes('down') ? '🔻' : '↔️';
    const trendColor = isUp ? 'text-green-400' : priceSummary.trend.toLowerCase().includes('down') ? 'text-red-400' : 'text-yellow-400';

    return (
        <div className={`p-5 rounded-xl border-l-4 border-emerald-500 shadow-md ${cardBgClass}`}>
            <h4 className="text-lg font-bold text-emerald-400 mb-3 flex items-center">
                <span className="text-2xl mr-2">💰</span> Market Price Trend
            </h4>
            <div className="flex justify-between items-center mb-4 border-b border-gray-600/50 pb-3">
                <p className="text-sm font-medium">Commodity: <span className="font-bold">{priceSummary.commodity}</span></p>
                <p className="text-sm font-medium">Region: <span className="font-bold">{priceSummary.region}</span></p>
            </div>

            <p className="text-5xl font-extrabold flex items-center mt-4">
                {priceSummary.currentPrice}
            </p>
            <p className={`text-xl font-semibold mt-1 flex items-center ${trendColor}`}>
                {trendIcon} {priceSummary.trend} by {priceSummary.trendValue} (Last 7 Days)
            </p>
            <p className="text-sm italic text-gray-500 mt-4 p-2 rounded bg-gray-600/20">
                Analyst Comment: {priceSummary.comment}
            </p>
        </div>
    );
};

export default MarketSummaryCard;