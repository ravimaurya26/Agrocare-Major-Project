import React from 'react';

const PageWrapper = ({ title, children, isDarkMode }) => {
    const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const contentBg = isDarkMode ? 'bg-gray-800' : 'bg-white';

    return (
        <div className={`p-4 md:p-8 min-h-screen ${bgColor} ${textColor}`}>
            <div className={`p-6 rounded-xl shadow-xl ${contentBg} mx-auto max-w-4xl`}>
                <h2 className="text-3xl font-bold text-emerald-500 mb-6 border-b border-gray-700/50 pb-3">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;