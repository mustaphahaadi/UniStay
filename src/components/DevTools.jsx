import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronDown, ChevronUp, UserCog, TestTube, Database, Eye, Zap } from 'lucide-react';

/**
 * Development tools component for testing system without authentication
 */
const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bypassAuth, setBypassAuth] = useState(localStorage.getItem('devBypass') === 'true');
  const { user, login, logout, switchRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleBypass = () => {
    const newBypass = !bypassAuth;
    setBypassAuth(newBypass);
    localStorage.setItem('devBypass', newBypass.toString());
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const quickLogin = (role) => {
    const testUsers = {
      user: { id: 1, email: 'student@test.com', name: 'Test Student', role: 'user' },
      manager: { id: 2, email: 'manager@test.com', name: 'Test Manager', role: 'manager' },
      admin: { id: 3, email: 'admin@test.com', name: 'Test Admin', role: 'admin' }
    };
    login(testUsers[role], 'fake-token');
  };

  const testRoutes = [
    { path: '/dashboard', label: 'User Dashboard', auth: true },
    { path: '/manager', label: 'Manager Dashboard', auth: true },
    { path: '/admin', label: 'Admin Dashboard', auth: true },
    { path: '/hostels', label: 'Hostels', auth: false },
    { path: '/booking-confirmation/123', label: 'Booking Confirm', auth: false },
    { path: '/list-property', label: 'List Property', auth: false },
    { path: '/pricing', label: 'Pricing', auth: false },
    { path: '/faq', label: 'FAQ', auth: false },
    { path: '/blog', label: 'Blog', auth: false }
  ];

  const navigateToRoute = (path, requiresAuth) => {
    if (requiresAuth && !isAuthenticated) {
      quickLogin('user');
      setTimeout(() => navigate(path), 100);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 bg-green-800 hover:bg-green-700 transition-colors"
        >
          <div className="flex items-center">
            <TestTube className="h-4 w-4 mr-2" />
            <span className="font-medium text-sm">Dev Tools</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-4 max-h-96 overflow-y-auto">
            {/* Auth Bypass */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-orange-400" />
                  <h3 className="font-medium text-sm">Auth Bypass</h3>
                </div>
                <button
                  onClick={toggleBypass}
                  className={`px-2 py-1 rounded text-xs ${bypassAuth ? 'bg-emerald-600' : 'bg-red-600'}`}
                >
                  {bypassAuth ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Quick Login */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                <h3 className="font-medium text-sm">Quick Login</h3>
              </div>
              <div className="grid grid-cols-2 gap-1 ml-6">
                <button onClick={() => quickLogin('user')} className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs">
                  Student
                </button>
                <button onClick={() => quickLogin('manager')} className="px-2 py-1 bg-forest-600 hover:bg-forest-700 rounded text-xs">
                  Manager
                </button>
                <button onClick={() => quickLogin('admin')} className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                  Admin
                </button>
                <button onClick={logout} className="px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs">
                  Logout
                </button>
              </div>
            </div>

            {/* Test Routes */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Eye className="h-4 w-4 mr-2 text-cyan-400" />
                <h3 className="font-medium text-sm">Test Routes</h3>
              </div>
              <div className="grid grid-cols-1 gap-1 ml-6">
                {testRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => navigateToRoute(route.path, route.auth)}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-left flex items-center justify-between"
                  >
                    <span>{route.label}</span>
                    {route.auth && <span className="text-orange-400 text-xs">🔒</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Data */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Database className="h-4 w-4 mr-2 text-purple-400" />
                <h3 className="font-medium text-sm">Mock Data</h3>
              </div>
              <div className="grid grid-cols-2 gap-1 ml-6">
                <button onClick={() => {localStorage.setItem('mockBookings', '5'); window.location.reload()}} className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs">
                  Add Bookings
                </button>
                <button onClick={() => {localStorage.setItem('mockFavorites', '3'); window.location.reload()}} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-xs">
                  Add Favorites
                </button>
                <button onClick={() => {localStorage.clear(); window.location.reload()}} className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs col-span-2">
                  Clear & Reload
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="text-xs text-gray-400 border-t border-gray-700 pt-2">
              <p>User: {user?.name || 'Guest'}</p>
              <p>Role: {user?.role || 'None'}</p>
              <p>Auth: {isAuthenticated ? '✅' : '❌'}</p>
              <p>Bypass: {bypassAuth ? '🔓' : '🔒'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevTools;