// Mock API service for development
const mockData = {
  hostels: [
    {
      id: 1,
      name: "University Heights Residence",
      location: "Accra, Greater Accra",
      price: 850,
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/400/300",
      amenities: ["WiFi", "Gym", "Laundry", "Security"],
      description: "Modern student accommodation near University of Ghana",
      rooms: [
        { id: 1, type: "Single", price: 850, available: true },
        { id: 2, type: "Double", price: 650, available: true }
      ]
    },
    {
      id: 2,
      name: "Campus View Hostel",
      location: "Kumasi, Ashanti",
      price: 650,
      rating: 4.5,
      reviews: 89,
      image: "/api/placeholder/400/300",
      amenities: ["WiFi", "Kitchen", "Study Room"],
      description: "Affordable housing for KNUST students",
      rooms: [
        { id: 3, type: "Single", price: 650, available: true }
      ]
    },
    {
      id: 123,
      name: "Test Hostel for Booking",
      location: "Accra, Greater Accra",
      price: 750,
      rating: 4.6,
      reviews: 78,
      image: "/api/placeholder/400/300",
      amenities: ["WiFi", "AC", "Kitchen"],
      description: "Perfect for testing booking flow"
    }
  ],
  universities: [
    {
      id: 1,
      name: "University of Ghana",
      location: "Legon, Accra",
      hostel_count: 45
    },
    {
      id: 2,
      name: "KNUST",
      location: "Kumasi",
      hostel_count: 32
    },
    {
      id: 3,
      name: "University of Cape Coast",
      location: "Cape Coast",
      hostel_count: 28
    }
  ],
  bookings: [
    {
      id: 1,
      hostel_name: "University Heights",
      room_number: "A-204",
      start_date: "2024-09-01",
      end_date: "2024-12-15",
      status: "confirmed",
      total_price: 2850
    },
    {
      id: 2,
      hostel_name: "Campus View Hostel",
      room_number: "B-101",
      start_date: "2024-08-15",
      end_date: "2024-11-30",
      status: "pending",
      total_price: 1950
    }
  ],
  categories: [
    { id: 1, name: "General Discussion", posts_count: 45 },
    { id: 2, name: "Accommodation Tips", posts_count: 23 },
    { id: 3, name: "University Life", posts_count: 67 }
  ],
  notifications: [
    { id: 1, message: "Booking confirmed", type: "success", read: false },
    { id: 2, message: "Payment reminder", type: "warning", read: true }
  ],
  messages: [
    { id: 1, sender: "Hostel Manager", message: "Welcome to our hostel!", timestamp: "2024-02-15" }
  ]
}

export const mockApiService = {
  get: async (url) => {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate network delay
    
    if (url.includes('/hostels/featured')) return mockData.hostels.slice(0, 2)
    if (url.includes('/hostels/') && url.match(/\/hostels\/\w+\//)) {
      const id = url.match(/\/hostels\/(\w+)\//)[1]
      const numId = parseInt(id)
      return mockData.hostels.find(h => h.id === numId || h.id.toString() === id) || mockData.hostels[0]
    }
    if (url.includes('/hostels')) return mockData.hostels
    if (url.includes('/universities')) return mockData.universities
    if (url.includes('/bookings')) return mockData.bookings
    if (url.includes('/categories')) return mockData.categories
    if (url.includes('/notifications')) return mockData.notifications
    if (url.includes('/messages')) return mockData.messages
    if (url.includes('/locations')) return []
    
    return []
  },
  
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { success: true, data, id: Date.now() }
  }
}