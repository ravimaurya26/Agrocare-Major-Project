import React from 'react';
import PageWrapper from '../layout/PageWrapper';

const CommunityPage = ({ isDarkMode }) => (
    <PageWrapper title="Community Hub" isDarkMode={isDarkMode}>
        <p className="text-lg mb-6 text-gray-400">
            Connect with local farmers, share tips, and ask questions to the community.
        </p>
        <div className="space-y-4">
            <div className="p-4 rounded-lg border border-gray-600 hover:shadow-md transition">
                <p className="font-semibold text-emerald-400">Post by Lakshmi G.</p>
                <p className="text-sm mt-1">Which fertilizer works best for organic banana farming in heavy rainfall areas?</p>
                <span className="text-xs text-gray-500 block mt-2">3 Replies | 1 hour ago</span>
            </div>
            <div className="p-4 rounded-lg border border-gray-600 hover:shadow-md transition">
                <p className="font-semibold text-emerald-400">Post by Anil K.</p>
                <p className="text-sm mt-1">Sharing photos of my record high ginger harvest this season! 🥳</p>
                <span className="text-xs text-gray-500 block mt-2">12 Comments | 5 hours ago</span>
            </div>
            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold mt-4">
                Start New Discussion
            </button>
        </div>
    </PageWrapper>
);

export default CommunityPage;