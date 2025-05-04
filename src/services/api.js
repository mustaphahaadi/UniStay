import { API_URL } from "../config"

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.detail || errorData.message || `Error: ${response.status}`
    throw new Error(errorMessage)
  }
  return response.json()
}

// Authentication services
export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    return handleResponse(response)
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    const response = await fetch(`${API_URL}/auth/user/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  requestPasswordReset: async (email) => {
    const response = await fetch(`${API_URL}/auth/password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    return handleResponse(response)
  },

  confirmPasswordReset: async (uid, token, newPassword) => {
    const response = await fetch(`${API_URL}/auth/password-reset/confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, token, new_password: newPassword }),
    })
    return handleResponse(response)
  },
}

// Hostel services
export const hostelService = {
  getHostels: async (page = 1) => {
    const response = await fetch(`${API_URL}/hostels/?page=${page}`)
    return handleResponse(response)
  },

  getHostelDetails: async (id) => {
    const response = await fetch(`${API_URL}/hostels/${id}/`)
    return handleResponse(response)
  },

  searchHostels: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_URL}/hostels/search/?${queryString}`)
    return handleResponse(response)
  },

  createHostel: async (hostelData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/hostels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(hostelData),
    })
    return handleResponse(response)
  },

  updateHostel: async (id, hostelData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/hostels/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(hostelData),
    })
    return handleResponse(response)
  },

  deleteHostel: async (id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/hostels/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.detail || errorData.message || `Error: ${response.status}`
      throw new Error(errorMessage)
    }

    return true
  },

  uploadHostelImage: async (hostelId, imageFile) => {
    const token = localStorage.getItem("token")
    const formData = new FormData()
    formData.append("image", imageFile)

    const response = await fetch(`${API_URL}/hostels/${hostelId}/upload-image/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
}

// Booking services
export const bookingService = {
  createBooking: async (bookingData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bookingData),
    })
    return handleResponse(response)
  },

  getUserBookings: async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/bookings/user/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  getBookingDetails: async (id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/bookings/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  cancelBooking: async (id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/bookings/${id}/cancel/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },
}

// Review services
export const reviewService = {
  getHostelReviews: async (hostelId) => {
    const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/`)
    return handleResponse(response)
  },

  createReview: async (hostelId, reviewData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(reviewData),
    })
    return handleResponse(response)
  },

  likeReview: async (reviewId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/reviews/${reviewId}/like/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  reportReview: async (reviewId, reason) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/reviews/${reviewId}/report/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ reason }),
    })
    return handleResponse(response)
  },
}

// Favorites services
export const favoritesService = {
  getFavorites: async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/favorites/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  addFavorite: async (hostelId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/favorites/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ hostel_id: hostelId }),
    })
    return handleResponse(response)
  },

  removeFavorite: async (favoriteId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/favorites/${favoriteId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    if (response.status === 204) {
      return true
    }

    return handleResponse(response)
  },
}

// User profile services
export const profileService = {
  getUserProfile: async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/users/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return handleResponse(response)
  },

  updateUserProfile: async (profileData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/users/profile/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(profileData),
    })
    return handleResponse(response)
  },

  uploadProfilePicture: async (imageFile) => {
    const token = localStorage.getItem("token")
    const formData = new FormData()
    formData.append("profile_picture", imageFile)

    const response = await fetch(`${API_URL}/users/profile/upload-picture/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
}

// Utility services
export const utilityService = {
  getUniversities: async () => {
    const response = await fetch(`${API_URL}/universities/`)
    return handleResponse(response)
  },

  getLocations: async () => {
    const response = await fetch(`${API_URL}/locations/`)
    return handleResponse(response)
  },
}
