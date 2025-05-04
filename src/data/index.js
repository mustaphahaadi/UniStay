// Export all mock data from a single file for easier imports
import hostels, { hostels as hostelsArray } from './hostelsData';
import rooms, { getRoomsByHostelId, getRoomById } from './roomsData';
import universities, { getUniversityById, getHostelsByUniversityId } from './universitiesData';
import reviews, { getReviewsByHostelId, getAverageRating } from './reviewsData';
import bookings, { getBookingsByUserId, getBookingsByHostelId, getBookingById, isRoomAvailable } from './bookingsData';

// Export all data
export {
  // Hostels
  hostels,
  hostelsArray,
  
  // Rooms
  rooms,
  getRoomsByHostelId,
  getRoomById,
  
  // Universities
  universities,
  getUniversityById,
  getHostelsByUniversityId,
  
  // Reviews
  reviews,
  getReviewsByHostelId,
  getAverageRating,
  
  // Bookings
  bookings,
  getBookingsByUserId,
  getBookingsByHostelId,
  getBookingById,
  isRoomAvailable
};

// Default export with all data and helper functions
export default {
  hostels: hostelsArray,
  rooms,
  universities,
  reviews,
  bookings,
  helpers: {
    getRoomsByHostelId,
    getRoomById,
    getUniversityById,
    getHostelsByUniversityId,
    getReviewsByHostelId,
    getAverageRating,
    getBookingsByUserId,
    getBookingsByHostelId,
    getBookingById,
    isRoomAvailable
  }
};