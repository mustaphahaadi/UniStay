"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { API_URL } from "../config"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const response = await fetch(`${API_URL}/auth/user/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            // Token is invalid or expired
            localStorage.removeItem("token")
          }
        }
      } catch (err) {
        console.error("Authentication check failed:", err)
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

      localStorage.setItem("token", data.token)
      setUser(data.user)
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
    localStorage.removeItem("token")
    setUser(null)
  }

  const isManager = () => {
    return user && user.role === "manager"
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isManager,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
