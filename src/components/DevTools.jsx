import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, ChevronDown, ChevronUp, UserCog } from 'lucide-react';

/**
 * Development tools component for easy role switching and authentication testing
 */
const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, switchRole, isAuthenticated } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-teal-700 hover:bg-teal-600 transition-colors"
        >
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            <span className="font-medium">Dev Tools</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <UserCog className="h-5 w-5 mr-2 text-teal-400" />
                <h3 className="font-medium">User Role</h3>
              </div>
              <div className="flex flex-col space-y-2 ml-7">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-user"
                    name="role"
                    checked={user?.role === 'user'}
                    onChange={() => switchRole('user')}
                    className="mr-2"
                  />
                  <label htmlFor="role-user">User</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-manager"
                    name="role"
                    checked={user?.role === 'manager'}
                    onChange={() => switchRole('manager')}
                    className="mr-2"
                  />
                  <label htmlFor="role-manager">Manager</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-admin"
                    name="role"
                    checked={user?.role === 'admin'}
                    onChange={() => switchRole('admin')}
                    className="mr-2"
                  />
                  <label htmlFor="role-admin">Admin</label>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 mt-4 border-t border-gray-700 pt-2">
              <p>Current user: {user?.email}</p>
              <p>Role: {user?.role}</p>
              <p>Auth status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevTools;