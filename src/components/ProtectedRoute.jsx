"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isManager } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if the route requires a specific role
  if (requiredRole === "manager" && !isManager()) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
