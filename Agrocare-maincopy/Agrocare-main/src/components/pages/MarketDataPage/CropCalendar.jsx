import React from 'react';
import { MONTHS } from '../../shared/constants';

const CropCalendar = ({ calendar, isDarkMode }) => {
    // Ensure calendar has 12 items, filling missing months if necessary
    const fullCalendar = MONTHS.map((month, index) => {
        const data = calendar.find(item => item.month.startsWith(month)) || { month: month, activity: 'Routine Monitoring' };
        return { month: month, activity: data.activity };
    });
    
    const cardBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
    const monthBoxClass = isDarkMode ? 'bg-gray-800' : 'bg-white';


    return (
        <div className={`mt-8 p-4 rounded-xl shadow-lg ${cardBgClass}`}>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <span className="text-2xl mr-2">📅</span> Annual Crop Activity Calendar
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 text-sm">
                {fullCalendar.map((item, index) => (
                    <div key={index} className={`p-2 rounded-lg text-center ${monthBoxClass} shadow-sm border border-emerald-500/30`}>
                        <p className="font-bold text-emerald-400 mb-1">{item.month}</p>
                        <p className="text-xs text-gray-400 min-h-[30px] flex items-center justify-center">{item.activity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropCalendar;