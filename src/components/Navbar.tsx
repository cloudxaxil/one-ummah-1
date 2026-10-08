import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Users, GraduationCap, Search, Home, FileText,
  MessageSquare, Menu, X, LogOut, User, ChevronDown, Book, Shield
} from 'lucide-react';

const publicNav = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Quran', path: '/quran', icon: 'book' },
  { label: 'Hadith', path: '/hadith', icon: 'book-open' },
  { label: 'Fiqh', path: '/fiqh', icon: 'scale' },
  { label: 'Research', path: '/research', icon: 'file-text' },
  { label: 'Community', path: '/community', icon: 'message-square' },
];

const authNav = [
  { label: 'Find Teachers', path: '/teachers', icon: 'search' },
  { label: 'Dashboard', path: '/dashboard', icon: 'home' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const roleNav = isAuthenticated && user?.role === 'admin'
    ? [{ label: 'Admin Panel', path: '/admin', icon: 'shield' }]
    : isAuthenticated && (user?.role === 'teacher' || user?.role === 'researcher')
    ? [{ label: 'Get Verified', path: '/verify', icon: 'shield' }]
    : [];

  const allNav = [...publicNav, ...(isAuthenticated ? authNav : []), ...roleNav];

  return (
    <nav className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">One<span className="text-emerald-700">Ummah</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {allNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.displayName}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {allNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2" />
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" className="flex-1 text-center px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-200 rounded-lg">
                  Sign In
                </Link>
                <Link to="/register" className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-emerald-700 rounded-lg">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
