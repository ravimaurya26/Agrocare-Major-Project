import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginPage from './components/pages/LoginPage';
import LandingPage from './components/pages/LandingPage';
import DiagnosisPage from './components/pages/DiagnosisPage/DiagnosisPage';
import ExpertChatPage from './components/pages/ExpertChatPage/ExpertChatPage';
import MarketDataPage from './components/pages/MarketDataPage/MarketDataPage';
import CommunityPage from './components/pages/CommunityPage';
import GovtSchemeTracker from './components/pages/GovtSchemeTracker';
import SoilTestLocator from './components/pages/SoilTestLocator';
import EducationalContent from './components/pages/EducationalContent';

const App = () => {
    const [currentPage, setCurrentPage] = useState('login'); // Start on login page
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentUser, setCurrentUser] = useState(null); // Example: { name: 'Ravi K.', initial: 'R' }

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        setCurrentPage('home');
    };

    const renderPage = () => {
        if (!currentUser || currentPage === 'login') {
            return <LoginPage isDarkMode={isDarkMode} onLoginSuccess={handleLoginSuccess} />;
        }

        switch (currentPage) {
            case 'home':
                return <LandingPage isDarkMode={isDarkMode} onNavigate={setCurrentPage} />;
            case 'diagnosis':
                return <DiagnosisPage isDarkMode={isDarkMode} />;
            case 'expert_chat':
                return <ExpertChatPage isDarkMode={isDarkMode} />;
            case 'market':
                return <MarketDataPage isDarkMode={isDarkMode} />;
            case 'community':
                return <CommunityPage isDarkMode={isDarkMode} />;
            case 'scheme':
                return <GovtSchemeTracker isDarkMode={isDarkMode} />;
            case 'soil':
                return <SoilTestLocator isDarkMode={isDarkMode} />;
            case 'education':
                return <EducationalContent isDarkMode={isDarkMode} />;

            default:
                return <LandingPage isDarkMode={isDarkMode} onNavigate={setCurrentPage} />;
        }
    };

    const mainContent = renderPage();
    const isFullScreenPage = currentPage === 'login';
    const bodyClass = isDarkMode ? 'dark bg-gray-900' : 'light bg-gray-50';

    return (
        <div className={`min-h-screen ${bodyClass} font-sans`}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .dark {
                    color: white;
                }
                `}
            </style>

            {/* Navbar visible only after login */}
            {!isFullScreenPage && currentUser && (
                <Navbar
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    user={currentUser}
                    onNavigate={setCurrentPage}
                />
            )}

            <div className={isFullScreenPage ? '' : 'pt-0'}>
                {mainContent}
            </div>

            {/* Footer visible only after login */}
            {!isFullScreenPage && currentUser && <Footer isDarkMode={isDarkMode} />}
        </div>
    );
};

export default App;
