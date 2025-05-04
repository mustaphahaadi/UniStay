// Mock data for bookings
export const bookings = [
  {
    id: 1,
    user_id: 1,
    hostel_id: 1,
    room_id: 101,
    room_type: "Single",
    check_in_date: "2023-06-01T14:00:00Z",
    check_out_date: "2023-06-10T10:00:00Z",
    total_price: 450,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-15T09:30:00Z",
    special_requests: "Late check-in, arriving around 8 PM",
    hostel_name: "Tech Haven Hostel",
    room_name: "Standard Single Room"
  },
  {
    id: 2,
    user_id: 1,
    hostel_id: 3,
    room_id: 301,
    room_type: "Single",
    check_in_date: "2023-07-05T14:00:00Z",
    check_out_date: "2023-07-12T10:00:00Z",
    total_price: 364,
    status: "pending",
    payment_status: "awaiting",
    created_at: "2023-05-20T11:45:00Z",
    special_requests: "Room with good natural light for art projects",
    hostel_name: "Arts Quarter Residence",
    room_name: "Creative Single"
  },
  {
    id: 3,
    user_id: 2,
    hostel_id: 2,
    room_id: 201,
    room_type: "Single",
    check_in_date: "2023-06-15T14:00:00Z",
    check_out_date: "2023-06-30T10:00:00Z",
    total_price: 570,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-10T14:20:00Z",
    special_requests: "",
    hostel_name: "Central Student Lodge",
    room_name: "Budget Single"
  },
  {
    id: 4,
    user_id: 3,
    hostel_id: 4,
    room_id: 403,
    room_type: "Ensuite",
    check_in_date: "2023-06-10T14:00:00Z",
    check_out_date: "2023-06-25T10:00:00Z",
    total_price: 1125,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-05T10:15:00Z",
    special_requests: "Quiet room away from common areas",
    hostel_name: "Medical Students Residence",
    room_name: "Premium Ensuite"
  },
  {
    id: 5,
    user_id: 4,
    hostel_id: 5,
    room_id: 501,
    room_type: "Single",
    check_in_date: "2023-07-01T14:00:00Z",
    check_out_date: "2023-07-15T10:00:00Z",
    total_price: 720,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-25T16:30:00Z",
    special_requests: "Room with river view if possible",
    hostel_name: "Riverside Student Housing",
    room_name: "Riverside Single"
  },
  {
    id: 6,
    user_id: 5,
    hostel_id: 6,
    room_id: 0, // Custom room not in the system
    room_type: "Double",
    check_in_date: "2023-06-20T14:00:00Z",
    check_out_date: "2023-06-27T10:00:00Z",
    total_price: 294,
    status: "cancelled",
    payment_status: "refunded",
    created_at: "2023-05-12T13:40:00Z",
    special_requests: "",
    hostel_name: "International Student House",
    room_name: "Standard Double"
  },
  {
    id: 7,
    user_id: 1,
    hostel_id: 7,
    room_id: 0, // Custom room not in the system
    room_type: "Eco-Cabin",
    check_in_date: "2023-08-01T14:00:00Z",
    check_out_date: "2023-08-10T10:00:00Z",
    total_price: 500,
    status: "pending",
    payment_status: "awaiting",
    created_at: "2023-05-28T09:15:00Z",
    special_requests: "Interested in participating in sustainability workshops",
    hostel_name: "Eco-Friendly Student Village",
    room_name: "Eco-Cabin"
  },
  {
    id: 8,
    user_id: 2,
    hostel_id: 8,
    room_id: 0, // Custom room not in the system
    room_type: "Single",
    check_in_date: "2023-07-10T14:00:00Z",
    check_out_date: "2023-07-20T10:00:00Z",
    total_price: 550,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-18T11:20:00Z",
    special_requests: "Room close to the library if possible",
    hostel_name: "Historic Campus Residence",
    room_name: "Historic Single"
  },
  {
    id: 9,
    user_id: 3,
    hostel_id: 9,
    room_id: 0, // Custom room not in the system
    room_type: "Single",
    check_in_date: "2023-06-25T14:00:00Z",
    check_out_date: "2023-07-05T10:00:00Z",
    total_price: 580,
    status: "confirmed",
    payment_status: "paid",
    created_at: "2023-05-22T14:50:00Z",
    special_requests: "Need access to training facilities",
    hostel_name: "Sports Academy Residence",
    room_name: "Athlete Single"
  },
  {
    id: 10,
    user_id: 4,
    hostel_id: 10,
    room_id: 0, // Custom room not in the system
    room_type: "Studio",
    check_in_date: "2023-07-15T14:00:00Z",
    check_out_date: "2023-07-25T10:00:00Z",
    total_price: 650,
    status: "pending",
    payment_status: "awaiting",
    created_at: "2023-05-30T10:10:00Z",
    special_requests: "Studio with good workspace for design projects",
    hostel_name: "Urban Loft Student Housing",
    room_name: "Designer Studio"
  }
];

// Helper function to get bookings by user ID
export const getBookingsByUserId = (userId) => {
  return bookings.filter(booking => booking.user_id === userId);
};

// Helper function to get bookings by hostel ID
export const getBookingsByHostelId = (hostelId) => {
  return bookings.filter(booking => booking.hostel_id === hostelId);
};

// Helper function to get booking by ID
export const getBookingById = (bookingId) => {
  return bookings.find(booking => booking.id === bookingId);
};

// Helper function to check if a room is available for a date range
export const isRoomAvailable = (roomId, checkInDate, checkOutDate) => {
  // Convert string dates to Date objects for comparison
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  // Find any overlapping bookings
  const overlappingBookings = bookings.filter(booking => {
    if (booking.room_id !== roomId || booking.status === 'cancelled') {
      return false;
    }
    
    const bookingCheckIn = new Date(booking.check_in_date);
    const bookingCheckOut = new Date(booking.check_out_date);
    
    // Check for date overlap
    return (
      (checkIn >= bookingCheckIn && checkIn < bookingCheckOut) || // Check-in date falls within an existing booking
      (checkOut > bookingCheckIn && checkOut <= bookingCheckOut) || // Check-out date falls within an existing booking
      (checkIn <= bookingCheckIn && checkOut >= bookingCheckOut) // New booking completely encompasses an existing booking
    );
  });
  
  return overlappingBookings.length === 0;
};

export default bookings;