"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { NOTIFICATION_TYPES } from "../config"

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  // Auto-remove notifications after timeout
  useEffect(() => {
    const timers = notifications.map((notification) => {
      if (notification.autoClose !== false) {
        const duration = notification.duration || 5000
        return setTimeout(() => {
          removeNotification(notification.id)
        }, duration)
      }
      return null
    })

    return () => timers.forEach((timer) => timer && clearTimeout(timer))
  }, [notifications])

  const addNotification = useCallback((notification) => {
    const id = notification.id || uuidv4()

    setNotifications((prev) => [
      ...prev,
      {
        id,
        type: NOTIFICATION_TYPES.INFO,
        autoClose: true,
        duration: 5000,
        ...notification,
        timestamp: new Date(),
      },
    ])

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  // Convenience methods for different notification types
  const success = useCallback(
    (message, options = {}) => {
      return addNotification({ type: NOTIFICATION_TYPES.SUCCESS, message, ...options })
    },
    [addNotification],
  )

  const error = useCallback(
    (message, options = {}) => {
      return addNotification({ type: NOTIFICATION_TYPES.ERROR, message, ...options })
    },
    [addNotification],
  )

  const info = useCallback(
    (message, options = {}) => {
      return addNotification({ type: NOTIFICATION_TYPES.INFO, message, ...options })
    },
    [addNotification],
  )

  const warning = useCallback(
    (message, options = {}) => {
      return addNotification({ type: NOTIFICATION_TYPES.WARNING, message, ...options })
    },
    [addNotification],
  )

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
