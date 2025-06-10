"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()
      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        avatar: data.avatar,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      toast.success("Login successful!")
      return true
    } catch (error) {
      toast.error(error.message || "Failed to login")
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      toast.success("Registration successful! Please login.")
      return true
    } catch (error) {
      toast.error(error.message || "Failed to register")
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    return true
  }

  const isManager = () => {
    return user?.role === "manager"
  }

  const isAdmin = () => {
    return user?.role === "admin"
  }

  const isAuthenticated = () => {
    return !!user
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isManager,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext