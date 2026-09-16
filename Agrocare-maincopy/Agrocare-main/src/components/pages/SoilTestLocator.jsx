import React, { useState } from 'react';

const SoilTestLocator = ({ isDarkMode }) => {
  const cardClass = isDarkMode
    ? 'bg-gray-800 text-gray-100'
    : 'bg-white text-gray-900';
  const accentClass = 'text-emerald-400';

  // 🟢 State for input and results
  const [district, setDistrict] = useState('');
  const [results, setResults] = useState([]);

  // 🟢 Mock data for demonstration
  const labs = [
    { district: 'Lucknow', name: 'Lucknow Soil Lab', link: 'https://soilhealth.dac.gov.in/' },
    { district: 'Kanpur', name: 'Kanpur Agri Lab', link: 'https://soilhealth.dac.gov.in/' },
    { district: 'Varanasi', name: 'Varanasi Soil Testing Center', link: 'https://soilhealth.dac.gov.in/' },
    { district: 'Lucknow', name: 'Govt Soil Lab Lucknow', link: 'https://soilhealth.dac.gov.in/' },
  ];

  const handleSearch = () => {
    const filtered = labs.filter(lab =>
      lab.district.toLowerCase().includes(district.trim().toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <main className={`min-h-screen p-6 md:p-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className="max-w-5xl mx-auto text-center">
        <h1 className={`text-4xl font-bold mb-6 ${accentClass}`}>🔬 Soil Test Locator</h1>
        <p className="text-lg mb-8 text-gray-400">
          Find nearby government or private soil testing laboratories and get a detailed report
          on soil health, pH, and nutrient levels.
        </p>

        {/* Search Card */}
        <div className={`p-6 rounded-2xl shadow-lg border border-emerald-400/20 ${cardClass}`}>
          <h2 className="text-2xl font-semibold mb-4">Search by District</h2>
          <input
            type="text"
            placeholder="Enter your district..."
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={`w-full p-3 rounded-lg border border-emerald-400/30 focus:outline-none focus:border-emerald-400 ${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          />
          <button
            onClick={handleSearch}
            className="mt-4 px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Find Labs
          </button>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="text-xl font-semibold mb-3">Results:</h3>
              <ul className="space-y-2">
                {results.map((lab, index) => (
                  <li key={index} className="text-gray-400">
                    <a
                      href={lab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      {lab.name} ({lab.district})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.length === 0 && district.trim() && (
            <p className="mt-4 text-gray-500">No labs found in this district.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default SoilTestLocator;
