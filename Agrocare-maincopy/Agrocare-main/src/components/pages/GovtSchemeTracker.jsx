import React from 'react';

const GovtSchemeTracker = ({ isDarkMode }) => {
    const cardClass = isDarkMode
        ? 'bg-gray-800 text-gray-100'
        : 'bg-white text-gray-900';
    const accentClass = 'text-emerald-400';

    return (
        <main className={`min-h-screen p-6 md:p-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <section className="max-w-5xl mx-auto text-center">
                <h1 className={`text-4xl font-bold mb-6 ${accentClass}`}>
                    🏦 Government Scheme Tracker
                </h1>
                <p className="text-lg mb-8 text-gray-400">
                    Stay updated on all Central and State agricultural schemes. Check your eligibility,
                    track your application status, and never miss a government benefit designed for farmers.
                </p>

                {/* Main Schemes Section */}
                <div className={`p-6 rounded-2xl shadow-lg border border-emerald-400/20 ${cardClass}`}>
                    <h2 className="text-2xl font-semibold mb-6">Popular Schemes</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {/* PM-Kisan */}
                        <div className="rounded-xl overflow-hidden border border-emerald-400/20">
                            <img
                                src="https://pmkisan.gov.in/newlogo.jpg"
                                alt="PM Kisan Samman Nidhi"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">🌱 PM-Kisan Samman Nidhi</h3>
                                <p className="text-gray-400 mb-3">
                                    Provides ₹6,000 per year in three equal installments to eligible farmers
                                    to ensure income support.
                                </p>
                                <a
                                    href="https://pmkisan.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline"
                                >
                                    Visit Official Site →
                                </a>
                            </div>
                        </div>

                        {/* Kisan Credit Card */}
                        <div className="rounded-xl overflow-hidden border border-emerald-400/20">
                            <img
                                src="https://sbi.co.in/documents/13849/1400781/Kisan-Credit-Card.jpg"
                                alt="Kisan Credit Card"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">🚜 Kisan Credit Card (KCC)</h3>
                                <p className="text-gray-400 mb-3">
                                    Offers short-term credit to farmers at low interest rates for crop
                                    production and related needs.
                                </p>
                                <a
                                    href="https://www.pmkisan.gov.in/Documents/KCC_GUIDELINES.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline"
                                >
                                    Learn More →
                                </a>
                            </div>
                        </div>

                        {/* PM Krishi Sinchai Yojana */}
                        <div className="rounded-xl overflow-hidden border border-emerald-400/20">
                            <img
                                src="https://pmksy.gov.in/images/banner2.jpg"
                                alt="PM Krishi Sinchai Yojana"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">💧 PM Krishi Sinchai Yojana</h3>
                                <p className="text-gray-400 mb-3">
                                    Focuses on improving irrigation coverage and ensuring efficient water use
                                    across farmlands.
                                </p>
                                <a
                                    href="https://pmksy.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline"
                                >
                                    Official Portal →
                                </a>
                            </div>
                        </div>

                        {/* Soil Health Card Scheme */}
                        <div className="rounded-xl overflow-hidden border border-emerald-400/20">
                            <img
                                src="https://soilhealth.dac.gov.in/Content/img/soilhealth.jpg"
                                alt="Soil Health Card Scheme"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">🌾 Soil Health Card Scheme</h3>
                                <p className="text-gray-400 mb-3">
                                    Helps farmers understand the nutrient status of their soil and provides
                                    recommendations for balanced fertilization.
                                </p>
                                <a
                                    href="https://soilhealth.dac.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline"
                                >
                                    Visit Portal →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-12 text-gray-400 text-sm">
                    🔔 Tip: Bookmark this page to stay updated with the latest schemes and application links from
                    official government portals.
                </p>
            </section>
        </main>
    );
};

export default GovtSchemeTracker;
