import React from 'react';

const DiagnosisResultCard = ({ diagnosis, isDarkMode }) => {
    if (!diagnosis) return null;

    const { confidenceScore, severity, treatment } = diagnosis;

    const severityColors = {
        Low: { text: 'text-emerald-500', bg: 'bg-emerald-500/20', icon: '✅' },
        Moderate: { text: 'text-yellow-500', bg: 'bg-yellow-500/20', icon: '⚠️' },
        High: { text: 'text-red-500', bg: 'bg-red-500/20', icon: '🚨' },
    };

    const severityStyle = severityColors[severity] || severityColors.Low;

    const ulClass = `list-none space-y-3 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`;
    const liClass = "flex items-start text-sm";
    const checkIcon = "text-emerald-500 mr-2 flex-shrink-0";
    const immediateIcon = "text-red-500 mr-2 flex-shrink-0";

    return (
        <div className="space-y-6">
            {/* Summary Header */}
            <div className={`p-5 rounded-xl shadow-lg border-l-8 ${severityStyle.bg}`} style={{ borderColor: severityStyle.text }}>
                <h3 className="text-3xl font-extrabold flex items-center mb-2">
                    {severityStyle.icon} {diagnosis.diagnosis}
                </h3>
                
                <div className="flex justify-between items-center text-lg mt-3 pt-3 border-t border-gray-600/50">
                    <div>
                        <span className="font-semibold block text-sm text-gray-400">Confidence Score</span>
                        <span className="text-2xl font-bold text-emerald-400">{confidenceScore}</span>
                    </div>
                    <div>
                        <span className="font-semibold block text-sm text-gray-400">Severity Level</span>
                        <span className={`text-2xl font-bold ${severityStyle.text}`}>{severity}</span>
                    </div>
                </div>
            </div>

            {/* Treatment Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Immediate Treatment */}
                <div>
                    <h4 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                        <span className="text-2xl mr-2">💊</span> Immediate Action
                    </h4>
                    <ul className={ulClass}>
                        {treatment?.immediate?.map((item, index) => (
                            <li key={index} className={liClass}>
                                <span className={immediateIcon}>•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Preventive Measures */}
                <div>
                    <h4 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🌱</span> Long-term Preventive Measures
                    </h4>
                    <ul className={ulClass}>
                        {treatment?.preventive?.map((item, index) => (
                            <li key={index} className={liClass}>
                                <span className={checkIcon}>✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisResultCard;