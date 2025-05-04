"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Building, Mail } from "lucide-react"
import { requestPasswordReset } from "../lib/auth"
import { useNotification } from "../contexts/NotificationContext"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { error: showError } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await requestPasswordReset(email)
      setIsSubmitted(true)
    } catch (err) {
      showError(err.message || "Failed to request password reset")
      setError(err.message || "Failed to request password reset")
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

        {isSubmitted ? (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-6">
              <p className="text-green-800 dark:text-green-200">
                If an account exists with the email you provided, you will receive password reset instructions.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 font-medium"
            >
              Return to login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white`}
                    placeholder="you@example.com"
                  />
                </div>
                {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
