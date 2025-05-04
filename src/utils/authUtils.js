import { ROLES } from '../config';

/**
 * Check if a user is authenticated
 * @returns {boolean} True if the user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get the current user's role
 * @returns {string|null} The user's role or null if not authenticated
 */
export const getUserRole = () => {
  try {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return null;
    
    const userData = JSON.parse(userDataString);
    return userData.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

/**
 * Check if the current user has a specific role
 * @param {string} role - The role to check
 * @returns {boolean} True if the user has the specified role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Check if the current user is a manager
 * @returns {boolean} True if the user is a manager
 */
export const isManager = () => {
  return hasRole(ROLES.MANAGER) || hasRole(ROLES.ADMIN);
};

/**
 * Check if the current user is an admin
 * @returns {boolean} True if the user is an admin
 */
export const isAdmin = () => {
  return hasRole(ROLES.ADMIN);
};

/**
 * Store user data in local storage
 * @param {Object} userData - The user data to store
 */
export const storeUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

/**
 * Get the current user data
 * @returns {Object|null} The user data or null if not authenticated
 */
export const getUserData = () => {
  try {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return null;
    
    return JSON.parse(userDataString);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Clear all authentication data from local storage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

/**
 * Check if the token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} True if the token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // For JWT tokens
    const base64Url = token.split('.')[1];
    if (!base64Url) return true;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    const currentTime = Date.now() / 1000;
    
    return exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if there's an error
  }
};

/**
 * Validate the current authentication state
 * @returns {Promise<boolean>} True if the authentication is valid
 */
export const validateAuth = async (apiUrl) => {
  const token = localStorage.getItem('token');
  
  if (!token) return false;
  
  // Check if token is expired (for JWT tokens)
  if (isTokenExpired(token)) {
    clearAuthData();
    return false;
  }
  
  try {
    // Verify with the server
    const response = await fetch(`${apiUrl}/auth/validate/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error validating authentication:', error);
    return false;
  }
};