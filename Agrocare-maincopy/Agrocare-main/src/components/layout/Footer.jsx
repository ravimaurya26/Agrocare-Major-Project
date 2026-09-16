import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = ({ isDarkMode }) => {
    const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
    const textColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const iconBaseClass = 'w-10 h-10 flex items-center justify-center rounded-full text-white transition transform hover:scale-110';
    const iconBg = isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600';

    return (
        <footer className={`w-full p-8 ${bgColor} ${textColor} mt-12`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                {/* About Section */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-4">Kisaan AgroCare</h4>
                    <p className="text-sm">
                        Empowering farmers with timely, personalized, AI-driven advice for a prosperous yield.
                    </p>
                </div>

                {/* Contact Details */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-4">Contact</h4>
                    <p className="text-sm">Email: support@kisaanagro.in</p>
                    <p className="text-sm">Phone: +91 987 654 3210</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-4">Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:underline text-emerald-400">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-emerald-400">Terms of Service</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-emerald-400">FAQ</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        <a href="#" className={`${iconBaseClass} ${iconBg}`} aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="#" className={`${iconBaseClass} ${iconBg}`} aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className={`${iconBaseClass} ${iconBg}`} aria-label="WhatsApp">
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs mt-8 pt-4 border-t border-gray-700/50">
                &copy; {new Date().getFullYear()} Kisaan AgroCare. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
