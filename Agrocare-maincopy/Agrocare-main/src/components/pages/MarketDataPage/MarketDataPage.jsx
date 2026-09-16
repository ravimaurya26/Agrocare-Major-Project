import React, { useState, useEffect } from 'react';
import PageWrapper from '../../layout/PageWrapper';
import MarketSummaryCard from './MarketSummaryCard';
import WeatherCard from './WeatherCard';
import CropCalendar from './CropCalendar';
import { CROPS, REGIONS, MONTHS } from '../../shared/constants';

// Helper function to get mock data based on selection (Copied from original App.jsx)
const generateMockMarketData = (crop, region) => {
    let priceData = {
        currentPrice: '₹2,500 / Quintal',
        trend: 'Stable',
        trendValue: '0.0%',
        comment: 'Normal trading volume. Price supported by government MSP.',
        unit: 'Quintal'
    };
    let weatherData = {
        yesterday: { temp: '29°C', condition: 'Heavy Rain', icon: '🌧️', rainfall: '35 mm' },
        today: { temp: '30°C', condition: 'Partly Cloudy', icon: '🌤️', rainfall: '2 mm' },
        forecast7Day: []
    };
    let cropCalendar = [];

    // Base Weather Forecast (Contextualized for South India)
    const baseForecast = [
        { day: 'Sat', temp: '31°C', condition: 'Sunny', icon: '☀️', rainfall: '0 mm' },
        { day: 'Sun', temp: '30°C', condition: 'Scattered Showers', icon: '🌦️', rainfall: '5 mm' },
        { day: 'Mon', temp: '28°C', condition: 'Moderate Rain', icon: '🌧️', rainfall: '15 mm' },
        { day: 'Tue', temp: '29°C', condition: 'Cloudy', icon: '☁️', rainfall: '0 mm' },
        { day: 'Wed', temp: '32°C', condition: 'Hot & Dry', icon: '🔥', rainfall: '0 mm' },
        { day: 'Thu', temp: '30°C', condition: 'Afternoon Thunderstorms', icon: '⛈️', rainfall: '10 mm' },
        { day: 'Fri', temp: '29°C', condition: 'Light Rain', icon: '☔', rainfall: '8 mm' },
    ];
    weatherData.forecast7Day = baseForecast;


    // Crop-Specific Mock Data adjustments
    switch (crop) {
        case 'Paddy (Rice)':
            priceData.currentPrice = '₹1,950 / Quintal';
            priceData.trend = 'Up';
            priceData.trendValue = '+1.5%';
            priceData.comment = 'Increased procurement and recent unseasonal rain reports in the North have tightened supply expectation.';
            cropCalendar = [
                { month: "Jan", activity: "Harvest (Samba/Rabi)" }, { month: "Feb", activity: "Field Preparation" },
                { month: "Mar", activity: "Direct Seeding/Nursery" }, { month: "Apr", activity: "Transplanting (Early)" },
                { month: "May", activity: "Weed Control/Fertilization" }, { month: "Jun", activity: "Water Management" },
                { month: "Jul", activity: "Pest Scouting (Stem Borer)" }, { month: "Aug", activity: "Flowering Stage" },
                { month: "Sep", activity: "Grain Filling/Pest Control" }, { month: "Oct", activity: "Harvest (Kharif/Mundakan)" },
                { month: "Nov", activity: "Field Drying/Storage" }, { month: "Dec", activity: "Sowing for next crop" }
            ];
            break;

        case 'Banana':
            priceData.currentPrice = '₹28 / kg';
            priceData.trend = 'Down';
            priceData.trendValue = '-4.0%';
            priceData.comment = 'Oversupply from Karnataka farms led to a price dip this week. Expect rebound next month.';
            cropCalendar = [
                { month: "Jan", activity: "Planting (Suckers)" }, { month: "Feb", activity: "Desuckering/Fertilization" },
                { month: "Mar", activity: "Irrigation/Weeding" }, { month: "Apr", activity: "Pest & Disease Control" },
                { month: "May", activity: "Leaf Pruning" }, { month: "Jun", activity: "Flowering/Bunch Cover" },
                { month: "Jul", activity: "Bunch Support (Propping)" }, { month: "Aug", activity: "Harvesting (Nendran/Robusta)" },
                { month: "Sep", activity: "Harvesting peak" }, { month: "Oct", activity: "Rat Control" },
                { month: "Nov", activity: "Post-harvest cleanup" }, { month: "Dec", activity: "New planting cycle" }
            ];
            break;

        case 'Pepper':
            priceData.currentPrice = '₹620 / kg';
            priceData.trend = 'Up';
            priceData.trendValue = '+2.2%';
            priceData.comment = 'International market price surge combined with low carryover stock from previous year.';
            weatherData.yesterday.condition = 'Mist and Cool';
            weatherData.today.condition = 'Heavy Rain expected';
            weatherData.today.rainfall = '15 mm';
            cropCalendar = [
                { month: "Jan", activity: "Pruning and manuring" }, { month: "Feb", activity: "Disease inspection" },
                { month: "Mar", activity: "Planting new standards" }, { month: "Apr", activity: "Irrigation/Mulching" },
                { month: "May", activity: "Onset of Monsoon fertilization" }, { month: "Jun", activity: "Heavy foliage growth" },
                { month: "Jul", activity: "Pest control (Pollu Beetle)" }, { month: "Aug", activity: "Panniyur variety flowering" },
                { month: "Sep", activity: "Berry development" }, { month: "Oct", activity: "Disease management" },
                { month: "Nov", activity: "Harvesting begins" }, { month: "Dec", activity: "Drying and storage" }
            ];
            break;
        
        default:
            // Default data for Ginger/Cardamom etc.
            priceData.currentPrice = '₹120 / kg';
            priceData.trend = 'Stable';
            priceData.trendValue = '0.0%';
            priceData.comment = 'Local trade steady. Awaiting new season harvest quantity reports.';
            cropCalendar = MONTHS.map(m => ({ month: m, activity: 'Routine care & vigilance' }));
            break;
    }

    // Region-Specific Weather adjustments
    if (region.includes('Coimbatore')) {
        weatherData.today.temp = '34°C';
        weatherData.today.condition = 'Hot and Sunny';
        weatherData.today.icon = '☀️';
        weatherData.forecast7Day[2].condition = 'Heat Wave Alert';
        weatherData.forecast7Day[2].icon = '🌡️';
    } else if (region.includes('Kottayam')) {
        weatherData.today.temp = '28°C';
        weatherData.today.condition = 'Moderate Rain';
        weatherData.today.icon = '🌧️';
        weatherData.today.rainfall = '18 mm';
        weatherData.forecast7Day[5].condition = 'Heavy Showers';
        weatherData.forecast7Day[5].icon = '⛈️';
    }


    return { priceSummary: priceData, weather: weatherData, cropCalendar };
};

const MarketDataPage = ({ isDarkMode }) => {
    const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
    const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
    const [marketData, setMarketData] = useState(() => generateMockMarketData(CROPS[0], REGIONS[0]));
    
    // NOTE: isLoading and error state are kept for UI consistency but are always false/null
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectClass = `w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${
        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
    }`;

    // Function to simulate data fetching (mocking the API call)
    const updateMarketData = () => {
        setIsLoading(true);
        setError(null);
        // Simulate a small delay for realistic UX
        setTimeout(() => {
            const data = generateMockMarketData(selectedCrop, selectedRegion);
            // Add commodity and region to the summary for context in the card
            data.priceSummary.commodity = selectedCrop;
            data.priceSummary.region = selectedRegion;
            setMarketData(data);
            setIsLoading(false);
        }, 500); 
    };
    
    // Fetch data whenever selections change
    useEffect(() => {
        updateMarketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCrop, selectedRegion]); 
    
    const buttonClass = "w-full py-3 font-semibold rounded-lg transition duration-300 shadow-md";

    return (
        <PageWrapper title="Dynamic Market Data & Crop Calendar" isDarkMode={isDarkMode}>
            
            {/* Input Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Select Crop</label>
                    <select 
                        value={selectedCrop} 
                        onChange={(e) => setSelectedCrop(e.target.value)} 
                        className={selectClass}
                        disabled={isLoading}
                    >
                        {CROPS.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Select Region</label>
                    <select 
                        value={selectedRegion} 
                        onChange={(e) => setSelectedRegion(e.target.value)} 
                        className={selectClass}
                        disabled={isLoading}
                    >
                        {REGIONS.map(region => <option key={region} value={region}>{region}</option>)}
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        onClick={updateMarketData}
                        disabled={isLoading}
                        className={`${buttonClass} ${
                            isLoading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Updating Data...
                            </span>
                        ) : (
                            'Refresh Data'
                        )}
                    </button>
                </div>
            </div>

            {/* Result Display */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
                {error && (
                    <div className="p-4 bg-red-600/10 text-red-400 rounded-lg border border-red-500 mb-6">
                        <p className="font-bold">Data Fetch Error:</p>
                        <p>{error}</p>
                    </div>
                )}
                
                {/* Ensure marketData is available before rendering */}
                {marketData && !isLoading && (
                    <div className="space-y-8">
                        {/* 1. Market Price Summary */}
                        <MarketSummaryCard data={marketData} isDarkMode={isDarkMode} />
                        
                        {/* 2. Weather Update (Past, Today, 7-Day Forecast) */}
                        <WeatherCard weather={marketData.weather} isDarkMode={isDarkMode} />

                        {/* 3. Crop Calendar */}
                        <CropCalendar calendar={marketData.cropCalendar} isDarkMode={isDarkMode} />
                    </div>
                )}

                {/* Loading State or Initial Placeholder */}
                {isLoading && (
                    <div className="text-center py-10 text-emerald-400">
                         <svg className="animate-spin h-8 w-8 mx-auto mb-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <p className="text-lg">Loading latest farm intelligence...</p>
                    </div>
                )}
                
                {!marketData && !isLoading && !error && (
                    <p className="text-gray-500 italic text-center py-10">
                        Select your crop and region above and click 'Refresh Data' to view market and weather insights.
                    </p>
                )}
            </div>
        </PageWrapper>
    );
};

export default MarketDataPage;