"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Building, Lock, Eye, EyeOff } from "lucide-react"
import { confirmPasswordReset } from "../lib/auth"
import { useNotification } from "../contexts/NotificationContext"

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { success, error: showError } = useNotification()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Get token and uid from URL params
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")
  const uid = searchParams.get("uid")

  useEffect(() => {
    if (!token || !uid) {
      showError("Invalid password reset link")
      navigate("/forgot-password")
    }
  }, [token, uid, navigate, showError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const validateForm = () => {
    if (!formData.password) {
      setError("Password is required")
      return false
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await confirmPasswordReset(uid, token, formData.password)
      setIsSuccess(true)
      success("Password has been reset successfully")
    } catch (err) {
      showError(err.message || "Failed to reset password")
      setError(err.message || "Failed to reset password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-2" />
            <span className="font-bold text-2xl text-gray-900 dark:text-white">Ghana Hostels</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Reset Your Password</h1>

        {isSuccess ? (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-6">
              <p className="text-green-800 dark:text-green-200">Your password has been reset successfully.</p>
            </div>
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign in with new password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Password must be at least 8 characters</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 p-3 rounded-md">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
