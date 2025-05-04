"use client"

import { useEffect } from "react"
import { useNotification } from "../contexts/NotificationContext"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { NOTIFICATION_TYPES } from "../config"

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotification()

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && notifications.length > 0) {
        removeNotification(notifications[notifications.length - 1].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [notifications, removeNotification])

  if (notifications.length === 0) return null

  const getIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <CheckCircle className="h-5 w-5" />
      case NOTIFICATION_TYPES.ERROR:
        return <AlertCircle className="h-5 w-5" />
      case NOTIFICATION_TYPES.WARNING:
        return <AlertTriangle className="h-5 w-5" />
      case NOTIFICATION_TYPES.INFO:
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getBackgroundColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "bg-green-50 dark:bg-green-900"
      case NOTIFICATION_TYPES.ERROR:
        return "bg-red-50 dark:bg-red-900"
      case NOTIFICATION_TYPES.WARNING:
        return "bg-yellow-50 dark:bg-yellow-900"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "bg-blue-50 dark:bg-blue-900"
    }
  }

  const getTextColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "text-green-800 dark:text-green-100"
      case NOTIFICATION_TYPES.ERROR:
        return "text-red-800 dark:text-red-100"
      case NOTIFICATION_TYPES.WARNING:
        return "text-yellow-800 dark:text-yellow-100"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "text-blue-800 dark:text-blue-100"
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "text-green-500 dark:text-green-300"
      case NOTIFICATION_TYPES.ERROR:
        return "text-red-500 dark:text-red-300"
      case NOTIFICATION_TYPES.WARNING:
        return "text-yellow-500 dark:text-yellow-300"
      case NOTIFICATION_TYPES.INFO:
      default:
        return "text-blue-500 dark:text-blue-300"
    }
  }

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 z-50 space-y-4"
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full ${getBackgroundColor(notification.type)} shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-300 ease-in-out transform translate-y-0 opacity-100`}
          role="alert"
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>{getIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                {notification.title && (
                  <p className={`text-sm font-medium ${getTextColor(notification.type)}`}>{notification.title}</p>
                )}
                <p className={`mt-1 text-sm ${getTextColor(notification.type)}`}>{notification.message}</p>
                {notification.action && (
                  <div className="mt-3 flex space-x-7">
                    <button
                      onClick={notification.action.onClick}
                      className="bg-white dark:bg-gray-700 rounded-md text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      {notification.action.text}
                    </button>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className={`bg-transparent rounded-md inline-flex ${getTextColor(notification.type)} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                  onClick={() => removeNotification(notification.id)}
                  aria-label="Close notification"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationSystem
