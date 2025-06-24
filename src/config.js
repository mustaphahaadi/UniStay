// API configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

// Application name and branding
export const APP_NAME = "UniStay"
export const APP_DESCRIPTION = "Find the perfect student accommodation near universities"
export const APP_DOMAIN = "unistay.com"

// Feature flags
export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  ADVANCED_SEARCH: true,
  OFFLINE_MODE: true,
  ANALYTICS: true,
  MULTILINGUAL: true,
}

// Analytics configuration
export const ANALYTICS_CONFIG = {
  trackingId: import.meta.env.VITE_ANALYTICS_ID || "UA-XXXXXXXXX-X",
  options: {
    anonymizeIp: true,
    cookieExpires: 60 * 60 * 24 * 365, // 1 year
  },
}

// Available languages
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "tw", name: "Twi" },
]

// Default pagination settings
export const PAGINATION = {
  itemsPerPage: 9,
  maxPagesToShow: 5,
}

// Notification settings
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
}

// User roles and permissions
export const ROLES = {
  USER: "user",
  MANAGER: "manager",
  ADMIN: "admin",
}

export const PERMISSIONS = {
  VIEW_HOSTELS: ["user", "manager", "admin"],
  BOOK_HOSTEL: ["user", "admin"],
  MANAGE_OWN_HOSTELS: ["manager", "admin"],
  MANAGE_ALL_HOSTELS: ["admin"],
  MANAGE_USERS: ["admin"],
}
