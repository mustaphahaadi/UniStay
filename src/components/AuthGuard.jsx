import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

/**
 * AuthGuard component to protect routes that require authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string[]} [props.requiredRoles] - Optional array of roles required to access the route
 * @returns {React.ReactNode} The protected component or null while redirecting
 */
const AuthGuard = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, loading, userRole } = useAuth();
  const { error } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Wait for auth state to be loaded
    if (loading) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      error('Please log in to access this page');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      error('You do not have permission to access this page');
      navigate('/dashboard');
      return;
    }

    // User is authenticated and has required role
    setVerified(true);
  }, [isAuthenticated, loading, userRole, requiredRoles, navigate, location.pathname, error]);

  // Show nothing while checking authentication
  if (loading || !verified) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Render children if authenticated and authorized
  return children;
};

export default AuthGuard;