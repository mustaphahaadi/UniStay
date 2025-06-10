import { Navigate } from 'react-router-dom';
import { isAuthenticated, isManager, isAdmin } from './authUtils';

/**
 * Protected route component that requires authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {React.ReactNode} The protected component or redirect
 */
export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * Manager route component that requires manager role
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated and has manager role
 * @returns {React.ReactNode} The protected component or redirect
 */
export const ManagerRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isManager()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

/**
 * Admin route component that requires admin role
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated and has admin role
 * @returns {React.ReactNode} The protected component or redirect
 */
export const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

/**
 * Guest only route component that redirects authenticated users
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if not authenticated
 * @param {string} [props.redirectTo="/dashboard"] - Path to redirect to if authenticated
 * @returns {React.ReactNode} The component or redirect
 */
export const GuestOnlyRoute = ({ children, redirectTo = "/dashboard" }) => {
  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}; 