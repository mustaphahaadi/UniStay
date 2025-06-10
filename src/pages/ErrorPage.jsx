import { useRouteError, Link } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {error.statusText || error.message || "Something went wrong"}
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="block w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
} 