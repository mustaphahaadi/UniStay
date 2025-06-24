import { API_URL } from '../config';
import { mockApiService } from './mockApiService';

// Use mock API in development when backend is not available
const USE_MOCK_API = process.env.NODE_ENV === 'development';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.detail || data.message || 'Something went wrong';
    throw new Error(error);
  }
  
  return data;
};

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  throw error;
};

// Authentication API
export const authService = {
  login: async (email, password) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.authApi.login(email, password);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  validateToken: async (token) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.authApi.validateToken(token);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/validate/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Hostels API
export const hostelService = {
  getAll: async () => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.hostelsApi.getAll();
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/hostels/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getFeatured: async () => {
    if (USE_MOCK_API) {
      try {
        return await mockApiService.get('/hostels/featured/');
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/hostels/featured/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getById: async (id) => {
    if (USE_MOCK_API) {
      try {
        return await mockApiService.get(`/hostels/${id}/`);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/hostels/${id}/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  search: async (query, filters = {}) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.hostelsApi.search(query, filters);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      
      if (filters.priceRange) {
        params.append('min_price', filters.priceRange[0]);
        params.append('max_price', filters.priceRange[1]);
      }
      
      if (filters.university) params.append('university', filters.university);
      if (filters.rating) params.append('min_rating', filters.rating);
      
      if (filters.amenities && filters.amenities.length) {
        filters.amenities.forEach(amenity => params.append('amenities', amenity));
      }
      
      if (filters.roomTypes && filters.roomTypes.length) {
        filters.roomTypes.forEach(roomType => params.append('room_types', roomType));
      }
      
      const response = await fetch(`${API_URL}/hostels/search/?${params.toString()}`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Universities API
export const universityService = {
  getAll: async () => {
    if (USE_MOCK_API) {
      try {
        return await mockApiService.get('/universities/');
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/universities/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getById: async (id) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.universitiesApi.getById(id);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/universities/${id}/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Rooms API
export const roomService = {
  getByHostelId: async (hostelId) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.roomsApi.getByHostelId(hostelId);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/hostels/${hostelId}/rooms/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  checkAvailability: async (roomId, checkInDate, checkOutDate) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.roomsApi.checkAvailability(roomId, checkInDate, checkOutDate);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const params = new URLSearchParams({
        check_in: checkInDate,
        check_out: checkOutDate
      });
      
      const response = await fetch(`${API_URL}/rooms/${roomId}/availability/?${params.toString()}`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Bookings API
export const bookingService = {
  getByUserId: async (userId, token) => {
    if (USE_MOCK_API) {
      try {
        return await mockApiService.get('/bookings/user/');
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/users/${userId}/bookings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  create: async (bookingData, token) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.bookingsApi.create(bookingData);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Reviews API
export const reviewService = {
  getByHostelId: async (hostelId) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.reviewsApi.getByHostelId(hostelId);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/`);
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  create: async (reviewData, token) => {
    if (USE_MOCK_API) {
      try {
        return await mockApi.reviewsApi.create(reviewData);
      } catch (error) {
        return handleApiError(error);
      }
    }
    
    try {
      const response = await fetch(`${API_URL}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(reviewData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};