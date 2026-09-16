import React from 'react';

const WeatherCard = ({ weather, isDarkMode }) => {
    const cardBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
    const dayCardClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
    
    // Get localized dates for display
    const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

    return (
        <div className={`mt-8 p-5 rounded-xl border-l-4 border-blue-500 shadow-md ${cardBgClass}`}>
            <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                <span className="text-2xl mr-2">☁️</span> Detailed Weather Update
            </h4>

            {/* Past and Current Day Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Yesterday */}
                <div className={`p-3 rounded-lg border border-gray-600/50 ${dayCardClass} text-center`}>
                    <p className="text-xs font-semibold text-gray-400">YESTERDAY ({yesterday})</p>
                    <p className="text-3xl mt-1">{weather.yesterday.icon}</p>
                    <p className="text-2xl font-bold text-emerald-400">{weather.yesterday.temp}</p>
                    <p className="text-sm text-gray-500">{weather.yesterday.condition}</p>
                </div>
                
                {/* Today */}
                <div className={`p-4 rounded-lg border-2 border-emerald-500 ${dayCardClass} text-center shadow-lg transform scale-[1.05]`}>
                    <p className="text-sm font-extrabold text-emerald-500">TODAY ({today})</p>
                    <p className="text-4xl mt-1">{weather.today.icon}</p>
                    <p className="text-3xl font-bold text-emerald-400">{weather.today.temp}</p>
                    <p className="text-lg font-semibold text-gray-500">{weather.today.condition}</p>
                    <p className="text-xs text-gray-500 mt-1">Rain: {weather.today.rainfall}</p>
                </div>

                {/* Tomorrow (First day of forecast) */}
                <div className={`p-3 rounded-lg border border-gray-600/50 ${dayCardClass} text-center`}>
                    <p className="text-xs font-semibold text-gray-400">TOMORROW ({weather.forecast7Day[0].day})</p>
                    <p className="text-3xl mt-1">{weather.forecast7Day[0].icon}</p>
                    <p className="text-2xl font-bold text-emerald-400">{weather.forecast7Day[0].temp}</p>
                    <p className="text-sm text-gray-500">{weather.forecast7Day[0].condition}</p>
                </div>
            </div>

            {/* 7-Day Forecast Row */}
            <h5 className="text-md font-semibold text-gray-400 mb-3 border-t pt-4">7-Day Outlook</h5>
            <div className="grid grid-cols-7 gap-1 overflow-x-auto pb-2">
                {weather.forecast7Day.map((day, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col items-center p-2 rounded-lg text-xs ${dayCardClass} border border-gray-600/30`}
                    >
                        <p className="font-semibold text-emerald-400 mb-1">{day.day}</p>
                        <p className="text-xl">{day.icon}</p>
                        <p className="text-sm font-bold">{day.temp}</p>
                        <p className="text-xs text-gray-500 mt-1 text-center min-h-[30px]">{day.condition.split(' ')[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherCard;