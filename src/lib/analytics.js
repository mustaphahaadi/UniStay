import { ANALYTICS_CONFIG } from "../config"

// Initialize analytics
export const initAnalytics = () => {
  if (!ANALYTICS_CONFIG.trackingId) {
    console.warn("Analytics tracking ID not provided")
    return
  }

  // Load Google Analytics script
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.trackingId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = () => {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", ANALYTICS_CONFIG.trackingId, ANALYTICS_CONFIG.options)
}

// Track page views
export const trackPageView = (path) => {
  if (!window.gtag) return

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
  })
}

// Track events
export const trackEvent = (category, action, label = null, value = null) => {
  if (!window.gtag) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track user sign in
export const trackSignIn = (method) => {
  if (!window.gtag) return

  window.gtag("event", "login", {
    method: method,
  })
}

// Track user sign up
export const trackSignUp = (method) => {
  if (!window.gtag) return

  window.gtag("event", "sign_up", {
    method: method,
  })
}

// Track search
export const trackSearch = (searchTerm) => {
  if (!window.gtag) return

  window.gtag("event", "search", {
    search_term: searchTerm,
  })
}

// Track hostel booking
export const trackBooking = (hostelId, hostelName, amount) => {
  if (!window.gtag) return

  window.gtag("event", "purchase", {
    transaction_id: Date.now().toString(),
    value: amount,
    currency: "GHS",
    items: [
      {
        id: hostelId,
        name: hostelName,
        category: "hostel",
        price: amount,
        quantity: 1,
      },
    ],
  })
}

// Track errors
export const trackError = (errorMessage, errorCode = null) => {
  if (!window.gtag) return

  window.gtag("event", "exception", {
    description: errorMessage,
    fatal: false,
    error_code: errorCode,
  })
}
