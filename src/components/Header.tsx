import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Menu, X, Bell, User, LogOut, Settings, Gauge as Garage } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileMenuOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Garage', path: '/my-garage' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">GarageBook</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                    location.pathname === item.path 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* User Actions */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-600"
                  />
                  <span className="hidden sm:block text-sm font-medium">{user.username}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-2">
                    <Link
                      to={`/profile/${user.id}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/my-garage"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Garage className="h-4 w-4 mr-2" />
                      My Garage
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                    location.pathname === item.path 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}