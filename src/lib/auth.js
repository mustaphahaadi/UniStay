import { jwtDecode } from "jwt-decode"
import { API_URL, ROLES, PERMISSIONS } from "../config"

// Token management
export const getToken = () => localStorage.getItem("token")
export const setToken = (token) => localStorage.setItem("token", token)
export const removeToken = () => localStorage.removeItem("token")

// User data management
export const getCurrentUser = () => {
  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

export const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const removeCurrentUser = () => {
  localStorage.removeItem("user")
}

// Combined auth management
export const setAuth = (token, user) => {
  setToken(token)
  setCurrentUser(user)
}

export const clearAuth = () => {
  removeToken()
  removeCurrentUser()
}

// Auth status check
export const isAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000

    // Check if token is expired
    if (decoded.exp < currentTime) {
      clearAuth()
      return false
    }

    return true
  } catch (error) {
    clearAuth()
    return false
  }
}

// Role and permission checks
export const getUserRole = () => {
  const user = getCurrentUser()
  return user?.role || null
}

export const isManager = () => {
  const role = getUserRole()
  return role === ROLES.MANAGER || role === ROLES.ADMIN
}

export const isAdmin = () => {
  const role = getUserRole()
  return role === ROLES.ADMIN
}

export const hasPermission = (permission) => {
  const role = getUserRole()
  if (!role) return false

  return PERMISSIONS[permission]?.includes(role) || false
}

// API helpers
export const getAuthHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Authenticated fetch wrapper
export const authFetch = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    ...getAuthHeaders(),
  }

  const response = await fetch(url, { ...options, headers })

  // Handle 401 Unauthorized - Token expired or invalid
  if (response.status === 401) {
    clearAuth()
    window.location.href = "/login?session=expired"
    throw new Error("Authentication session expired")
  }

  return response
}

// Password reset request
export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_URL}/auth/password-reset/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.detail || "Failed to request password reset")
  }

  return true
}

// Password reset confirmation
export const confirmPasswordReset = async (uid, token, newPassword) => {
  const response = await fetch(`${API_URL}/auth/password-reset/confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, token, new_password: newPassword }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.detail || "Failed to reset password")
  }

  return true
}

// Email verification
export const verifyEmail = async (key) => {
  const response = await fetch(`${API_URL}/auth/verify-email/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.detail || "Failed to verify email")
  }

  return true
}
