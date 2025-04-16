'use client'

import React, { useState } from 'react';
import {  User, BookOpen } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col">
            <div className="fixed z-10 w-64 h-full bg-gray-800 p-4">
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-2 p-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                    >
                        <User className="w-5 h-5" />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center gap-2 p-3 rounded-lg transition ${activeTab === 'bookings' ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" />
                        Bookings
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8 relative ">
                {/* Content */}
                {children}
            </div>
        </div>
    );
}

export default Layout;