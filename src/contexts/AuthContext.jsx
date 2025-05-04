"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { API_URL } from "../config"
import { storeUserData, clearAuthData } from "../utils/authUtils"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  // For development, set a default user and authentication state
  const defaultUser = {
    id: 1,
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const [user, setUser] = useState(defaultUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Always authenticated for development
  const [userRole, setUserRole] = useState("user") // Default role

  // For development, we'll skip the token validation
  useEffect(() => {
    // Store the default user data
    storeUserData(defaultUser);
    
    // Set a mock token
    localStorage.setItem("token", "mock-token-1-development");
    
    // Set loading to false immediately
    setLoading(false);
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      // For development, just return success without actual API call
      const mockUser = {
        id: 1,
        email: email,
        firstName: "John",
        lastName: "Doe",
        role: email.includes("manager") ? "manager" : email.includes("admin") ? "admin" : "user",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      };
      
      // Store authentication data
      localStorage.setItem("token", `mock-token-1-${Date.now()}`);
      storeUserData(mockUser);
      
      // Update state
      setUser(mockUser);
      setUserRole(mockUser.role);
      setIsAuthenticated(true);
      
      return mockUser;
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (userData) => {
    setError(null)
    try {
      // For development, just return success without actual API call
      return { success: true, message: "Registration successful" };
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    clearAuthData()
    
    // For development, immediately set back to default user
    setUser(defaultUser)
    setUserRole("user")
    setIsAuthenticated(true)
    
    // Store the default user data again
    storeUserData(defaultUser);
    localStorage.setItem("token", "mock-token-1-development");
  }

  const isManager = () => {
    return user && (user.role === "manager" || user.role === "admin")
  }

  const isAdmin = () => {
    return user && user.role === "admin"
  }

  // For development, provide a way to switch roles
  const switchRole = (role) => {
    if (["user", "manager", "admin"].includes(role)) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setUserRole(role);
      storeUserData(updatedUser);
    }
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    userRole,
    login,
    register,
    logout,
    isManager,
    isAdmin,
    switchRole, // Development helper
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}