"use client"

import { Component } from "react"
import { AlertTriangle } from "lucide-react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })

    // Here you could send the error to your analytics service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              We're sorry, but an error occurred while rendering this page. Our team has been notified.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Refresh the page
              </button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-auto">
                <p className="text-sm font-mono text-red-600 dark:text-red-400">
                  {this.state.error && this.state.error.toString()}
                </p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
