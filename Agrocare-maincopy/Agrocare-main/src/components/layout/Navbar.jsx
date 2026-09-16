import React, { useState, useEffect, useRef } from "react";
import { User, LogOut, Sun, Moon } from "lucide-react";

const Navbar = ({ isDarkMode, toggleTheme, user, onNavigate, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Theme Classes
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-900";
  const hoverColor = isDarkMode ? "hover:text-emerald-300" : "hover:text-emerald-600";
  const buttonFocus = isDarkMode ? "focus:ring-gray-600" : "focus:ring-gray-300";

  // Hook to close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  // Safely get user's name/initial for display
  const userName = user?.firstName || user?.name || "User";
  const userInitial = user?.firstName ? user.firstName.charAt(0) : (user?.name ? user.name.charAt(0) : "U");

  return (
    <nav className={`flex justify-between items-center px-6 py-3 shadow-md z-40 relative ${bgColor}`}>
      
      {/* Left Side Logo */}
      <div
        onClick={() => onNavigate("home")}
        className={`text-2xl font-bold cursor-pointer text-emerald-500 ${textColor}`}
      >
        Kisaan AgroCare 🌿
      </div>

      {/* Middle Links (Hidden on small screens) */}
      <div className="hidden md:flex space-x-6">
        <button onClick={() => onNavigate("home")} className={`${textColor} ${hoverColor} transition-colors`}>
          Home
        </button>
        <button onClick={() => onNavigate("about")} className={`${textColor} ${hoverColor} transition-colors`}>
          About
        </button>
        <button onClick={() => onNavigate("contact")} className={`${textColor} ${hoverColor} transition-colors`}>
          Contact
        </button>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4 relative">
        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-colors ${textColor} ${hoverColor} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonFocus}`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Section (Conditional Rendering) */}
        {user ? (
          <div className="relative" ref={profileRef}> 
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`flex items-center space-x-2 focus:outline-none p-2 rounded-lg transition-colors ${textColor} ${hoverColor} focus:ring-2 focus:ring-opacity-50 ${buttonFocus}`}
            >
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {userInitial} 
              </div>
              {/* User Name */}
              <span className={`font-medium hidden sm:inline ${textColor}`}>
                {userName}
              </span>
            </button>

            {/* Profile Dropdown Popup */}
            {showProfile && (
              <div
                className={`absolute right-0 mt-3 w-64 p-4 rounded-2xl shadow-xl z-50 transition-all duration-300 origin-top-right animate-in fade-in zoom-in-95 ${
                  isDarkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-emerald-400">
                  Profile Details
                </h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong className="text-emerald-400">Name:</strong> {user.firstName || user.name} {user.lastName}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Mobile:</strong> {user.mobile}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Gender:</strong> {user.gender}
                  </p>
                </div>

                {/* EDIT PROFILE BUTTON: Navigates to the new ProfilePage */}
                <button
                  onClick={() => {
                    onNavigate("profile");
                    setShowProfile(false); 
                  }}
                  className="mt-4 w-full flex justify-center items-center bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <User size={18} className="mr-2" /> Edit Profile
                </button>


                {/* LOGOUT BUTTON: Clicks onLogout prop */}
                <button
                  onClick={onLogout}
                  className="mt-2 w-full flex justify-center items-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Show Login button if user is NOT logged in */
          <button
            onClick={() => onNavigate("login")}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors shadow-md"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;