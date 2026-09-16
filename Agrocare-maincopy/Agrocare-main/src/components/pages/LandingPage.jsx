import React from 'react';

const LandingPage = ({ isDarkMode, onNavigate }) => {
    const cardClass = isDarkMode
        ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
        : 'bg-white hover:bg-gray-100 text-gray-900';
    const accentClass = 'text-emerald-400';
    const smallCardClass = isDarkMode
        ? 'bg-gray-800/50 hover:bg-gray-700/80 text-gray-300'
        : 'bg-white/70 hover:bg-gray-100/90 text-gray-800';

    const primaryFeatures = [
        { name: 'AI Leaf Diagnosis', icon: '📷', action: 'Upload Image', page: 'diagnosis' },
        { name: 'Market Data & Calendar', icon: '📈', action: 'Real-time Trends', page: 'market' },
        { name: 'Krishi Officer (Expert)', icon: '🧑‍🌾', action: 'Personalized Advice', page: 'expert_chat' },
        { name: 'Community Hub', icon: '🤝', action: 'Farmer Support', page: 'community' },
    ];

    // ✅ Added page links for the 3 new sections
    const secondaryFeatures = [
        { 
            name: 'Govt Scheme Tracker', 
            icon: '🏦', 
            description: 'Monitor eligibility and application status for state and central subsidies.', 
            action: 'Explore Schemes',
            page: 'scheme' 
        },
        { 
            name: 'Soil Test Locator', 
            icon: '🔬', 
            description: 'Find the nearest accredited soil testing laboratory in your region.', 
            action: 'Find Lab',
            page: 'soil' 
        },
        { 
            name: 'Educational Content', 
            icon: '📚', 
            description: 'Access crop-specific video guides, best practices, and regional success stories.', 
            action: 'View Library',
            page: 'education' 
        },
    ];

    return (
        <main className="w-full min-h-screen p-4 md:p-8">
            {/* 🌾 Hero Section */}
            <section className="text-center py-12 w-full">
                <h2 className={`text-4xl font-extrabold ${accentClass} mb-8`}>
                    🌾 “From soil to success – we grow with you”
                </h2>

                {/* 🚜 Primary Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-6xl">
                    {primaryFeatures.map((feature) => (
                        <div
                            key={feature.name}
                            onClick={() => onNavigate(feature.page)}
                            className={`p-6 rounded-xl shadow-lg cursor-pointer transition transform duration-300 ease-in-out hover:scale-[1.02] border border-emerald-500/20 ${cardClass}`}
                        >
                            <p className="text-5xl mb-3">{feature.icon}</p>
                            <h3 className="text-xl font-semibold">{feature.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{feature.action}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🌱 Secondary Section */}
            <hr className="my-12 border-gray-700/50 max-w-6xl mx-auto" />

            <section className="text-center pb-12 w-full">
                <h3 className={`text-3xl font-bold ${accentClass} mb-8`}>
                    Essential Farm Resources!!
                </h3>
                <p className="text-lg max-w-3xl mx-auto mb-10 text-gray-500">
                    Tools and information to manage your farm finances, soil health, and long-term knowledge.
                </p>

                {/* 🧭 Updated Buttons with Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
                    {secondaryFeatures.map((feature) => (
                        <div
                            key={feature.name}
                            className={`p-6 rounded-xl shadow-lg border border-emerald-500/10 ${smallCardClass} transition transform duration-300 ease-in-out hover:shadow-xl`}
                        >
                            <p className="text-4xl mb-3">{feature.icon}</p>
                            <h4 className="text-xl font-semibold text-emerald-300">{feature.name}</h4>
                            <p className="text-sm mt-2 mb-4 text-gray-400 min-h-[60px]">{feature.description}</p>
                            <button
                                onClick={() => onNavigate(feature.page)} // 👈 Added navigation
                                className="w-full py-2 text-sm font-medium rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition"
                            >
                                {feature.action}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
