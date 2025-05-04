// Import mock data
import {
  hostelsArray as hostels,
  rooms,
  universities,
  reviews,
  bookings,
  getRoomsByHostelId,
  getReviewsByHostelId,
  getAverageRating,
  getUniversityById,
  getHostelsByUniversityId,
  getBookingsByUserId,
  isRoomAvailable
} from '../../data';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate API response
const apiResponse = async (data, errorChance = 0, errorMessage = 'API Error') => {
  // Simulate network delay
  await delay(Math.random() * 300 + 100);
  
  // Simulate occasional errors (for testing error handling)
  if (Math.random() < errorChance) {
    throw new Error(errorMessage);
  }
  
  return data;
};

// Authentication API
export const authApi = {
  login: async (email, password) => {
    // Mock users for authentication
    const users = [
      {
        id: 1,
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "user",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        email: "manager@example.com",
        firstName: "Jane",
        lastName: "Smith",
        role: "manager",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        id: 3,
        email: "admin@example.com",
        firstName: "Alex",
        lastName: "Johnson",
        role: "admin",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      }
    ];
    
    // Find user with matching email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Check if user exists and password is correct (in a real app, you'd hash passwords)
    if (user && password === 'password') {
      // Generate a fake token
      const token = `mock-token-${user.id}-${Date.now()}`;
      
      return apiResponse({
        token,
        user: { ...user, password: undefined } // Don't return the password
      });
    }
    
    throw new Error('Invalid email or password');
  },
  
  validateToken: async (token) => {
    // In a real app, you'd verify the JWT token
    if (token && token.startsWith('mock-token-')) {
      const userId = parseInt(token.split('-')[2]);
      const users = [
        {
          id: 1,
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "user",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: 2,
          email: "manager@example.com",
          firstName: "Jane",
          lastName: "Smith",
          role: "manager",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
          id: 3,
          email: "admin@example.com",
          firstName: "Alex",
          lastName: "Johnson",
          role: "admin",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        }
      ];
      
      const user = users.find(u => u.id === userId);
      
      if (user) {
        return apiResponse({ valid: true, user: { ...user, password: undefined } });
      }
    }
    
    throw new Error('Invalid token');
  },
};

// Hostels API
export const hostelsApi = {
  getAll: async () => {
    return apiResponse(hostels);
  },
  
  getFeatured: async () => {
    // Return a subset of hostels as featured
    return apiResponse(hostels.filter(hostel => hostel.rating >= 4.5).slice(0, 6));
  },
  
  getById: async (id) => {
    const hostel = hostels.find(h => h.id === parseInt(id));
    
    if (!hostel) {
      throw new Error('Hostel not found');
    }
    
    // Enhance hostel with related data
    const hostelRooms = getRoomsByHostelId(parseInt(id));
    const hostelReviews = getReviewsByHostelId(parseInt(id));
    const university = getUniversityById(hostel.university_id);
    
    const enhancedHostel = {
      ...hostel,
      rooms: hostelRooms,
      reviews: hostelReviews,
      university: university ? {
        id: university.id,
        name: university.name,
        location: university.location
      } : null,
      review_count: hostelReviews.length
    };
    
    return apiResponse(enhancedHostel);
  },
  
  search: async (query = '', filters = {}) => {
    // Start with all hostels
    let results = [...hostels];
    
    // Apply text search if provided
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(hostel => {
        const searchableText = `${hostel.name} ${hostel.description} ${hostel.address} ${hostel.university_name}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }
    
    // Apply filters if provided
    if (filters) {
      // Price range filter
      if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
        results = results.filter(hostel => 
          hostel.price_per_night >= filters.priceRange[0] && 
          hostel.price_per_night <= filters.priceRange[1]
        );
      }
      
      // University filter
      if (filters.university) {
        const universityId = parseInt(filters.university);
        results = results.filter(hostel => hostel.university_id === universityId);
      }
      
      // Rating filter
      if (filters.rating && filters.rating > 0) {
        results = results.filter(hostel => hostel.rating >= filters.rating);
      }
      
      // Amenities filter
      if (filters.amenities && Array.isArray(filters.amenities) && filters.amenities.length > 0) {
        results = results.filter(hostel => 
          filters.amenities.every(amenity => 
            hostel.amenities && hostel.amenities.includes(amenity)
          )
        );
      }
      
      // Room types filter
      if (filters.roomTypes && Array.isArray(filters.roomTypes) && filters.roomTypes.length > 0) {
        results = results.filter(hostel => 
          filters.roomTypes.every(roomType => 
            hostel.room_types && hostel.room_types.includes(roomType)
          )
        );
      }
    }
    
    return apiResponse(results);
  }
};

// Universities API
export const universitiesApi = {
  getAll: async () => {
    return apiResponse(universities);
  },
  
  getById: async (id) => {
    const university = getUniversityById(parseInt(id));
    
    if (!university) {
      throw new Error('University not found');
    }
    
    // Enhance university with related hostels
    const universityHostels = getHostelsByUniversityId(parseInt(id), hostels);
    
    const enhancedUniversity = {
      ...university,
      hostels: universityHostels
    };
    
    return apiResponse(enhancedUniversity);
  }
};

// Rooms API
export const roomsApi = {
  getByHostelId: async (hostelId) => {
    const hostelRooms = getRoomsByHostelId(parseInt(hostelId));
    return apiResponse(hostelRooms);
  },
  
  checkAvailability: async (roomId, checkInDate, checkOutDate) => {
    const available = isRoomAvailable(parseInt(roomId), checkInDate, checkOutDate);
    return apiResponse({ available });
  }
};

// Bookings API
export const bookingsApi = {
  getByUserId: async (userId) => {
    const userBookings = getBookingsByUserId(parseInt(userId));
    
    // Enhance bookings with hostel and room data
    const enhancedBookings = userBookings.map(booking => {
      const hostel = hostels.find(h => h.id === booking.hostel_id);
      
      return {
        ...booking,
        hostel: hostel ? {
          id: hostel.id,
          name: hostel.name,
          address: hostel.address,
          image: hostel.images && hostel.images.length > 0 ? hostel.images[0] : null
        } : null
      };
    });
    
    return apiResponse(enhancedBookings);
  },
  
  create: async (bookingData) => {
    // Validate required fields
    if (!bookingData.user_id || !bookingData.hostel_id || !bookingData.room_id || 
        !bookingData.check_in_date || !bookingData.check_out_date) {
      throw new Error('Missing required booking information');
    }
    
    // Check if room is available
    const isAvailable = isRoomAvailable(
      bookingData.room_id, 
      bookingData.check_in_date, 
      bookingData.check_out_date
    );
    
    if (!isAvailable) {
      throw new Error('Room is not available for the selected dates');
    }
    
    // Create new booking
    const newBooking = {
      id: bookings.length + 1,
      ...bookingData,
      status: 'pending',
      payment_status: 'awaiting',
      created_at: new Date().toISOString()
    };
    
    // In a real app, you'd save this to a database
    bookings.push(newBooking);
    
    return apiResponse(newBooking);
  }
};

// Reviews API
export const reviewsApi = {
  getByHostelId: async (hostelId) => {
    const hostelReviews = getReviewsByHostelId(parseInt(hostelId));
    return apiResponse(hostelReviews);
  },
  
  create: async (reviewData) => {
    // Validate required fields
    if (!reviewData.user_id || !reviewData.hostel_id || !reviewData.rating || !reviewData.comment) {
      throw new Error('Missing required review information');
    }
    
    // Create new review
    const newReview = {
      id: reviews.length + 1,
      ...reviewData,
      created_at: new Date().toISOString()
    };
    
    // In a real app, you'd save this to a database
    reviews.push(newReview);
    
    return apiResponse(newReview);
  }
};