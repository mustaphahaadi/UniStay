"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { API_URL } from "../config"
import { storeUserData, clearAuthData } from "../utils/authUtils"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        const userDataString = localStorage.getItem("userData")
        
        if (token && userDataString) {
          // First try to use cached user data for faster loading
          try {
            const userData = JSON.parse(userDataString)
            setUser(userData)
            setUserRole(userData.role)
            setIsAuthenticated(true)
          } catch (err) {
            console.error("Error parsing user data:", err)
          }
          
          // Then verify with the server
          const response = await fetch(`${API_URL}/auth/user/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            setUserRole(userData.role)
            setIsAuthenticated(true)
            // Update stored user data
            storeUserData(userData)
          } else {
            // Token is invalid or expired
            clearAuthData()
            setUser(null)
            setUserRole(null)
            setIsAuthenticated(false)
          }
        }
      } catch (err) {
        console.error("Authentication check failed:", err)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Login failed")
      }

      // Store authentication data
      localStorage.setItem("token", data.token)
      storeUserData(data.user)
      
      // Update state
      setUser(data.user)
      setUserRole(data.user.role)
      setIsAuthenticated(true)
      
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (userData) => {
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = Object.values(data).flat().join(", ")
        throw new Error(errorMessage || "Registration failed")
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    clearAuthData()
    setUser(null)
    setUserRole(null)
    setIsAuthenticated(false)
  }

  const isManager = () => {
    return userRole === "manager" || userRole === "admin"
  }

  const isAdmin = () => {
    return userRole === "admin"
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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}