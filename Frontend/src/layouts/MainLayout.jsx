import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, User, LogOut } from 'lucide-react';
import api from '../api/axios';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navItems = [
        { name: 'Home', path: '/', icon: <Home /> },
        { name: 'Create', path: '/create', icon: <PlusSquare /> },
        { name: 'Profile', path: '/profile', icon: <User /> },
    ];

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 p-4">
                <h1 className="text-2xl font-bold mb-8 px-2">AI Insta</h1>
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white mt-auto w-full text-left"
                >
                    <LogOut />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
                <Outlet />
            </main>

            {/* Bottom Nav for Mobile */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around p-3 z-50">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex flex-col items-center ${location.pathname === item.path ? 'text-white' : 'text-gray-500'}`}
                    >
                        {item.icon}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default MainLayout;
