// Mock data for rooms
export const rooms = [
  // Tech Haven Hostel (id: 1) rooms
  {
    id: 101,
    hostel_id: 1,
    name: "Standard Single Room",
    type: "Single",
    description: "Comfortable single room with a twin bed, desk, and storage space. Perfect for students who value privacy and quiet study time.",
    price_per_night: 45,
    capacity: 1,
    amenities: ["Private Bathroom", "Desk", "Wardrobe", "WiFi", "Air Conditioning"],
    size_sqm: 12,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 102,
    hostel_id: 1,
    name: "Double Room",
    type: "Double",
    description: "Spacious room with two twin beds, perfect for friends or students who prefer having a roommate. Includes two desks and ample storage.",
    price_per_night: 35,
    capacity: 2,
    amenities: ["Shared Bathroom", "Two Desks", "Two Wardrobes", "WiFi", "Air Conditioning"],
    size_sqm: 18,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 103,
    hostel_id: 1,
    name: "Shared Dormitory",
    type: "Shared",
    description: "Economical option with four beds in a shared room. Great for socializing and making new friends while keeping costs low.",
    price_per_night: 25,
    capacity: 4,
    amenities: ["Shared Bathroom", "Personal Lockers", "Reading Lights", "WiFi", "Air Conditioning"],
    size_sqm: 24,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  
  // Central Student Lodge (id: 2) rooms
  {
    id: 201,
    hostel_id: 2,
    name: "Budget Single",
    type: "Single",
    description: "Affordable single room with all the essentials. Compact but functional space for students on a budget.",
    price_per_night: 38,
    capacity: 1,
    amenities: ["Shared Bathroom", "Desk", "Wardrobe", "WiFi"],
    size_sqm: 10,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 202,
    hostel_id: 2,
    name: "Standard Double",
    type: "Double",
    description: "Comfortable room with two beds and a study area. Ideal for students who want to share accommodation costs.",
    price_per_night: 30,
    capacity: 2,
    amenities: ["Shared Bathroom", "Study Area", "Wardrobes", "WiFi"],
    size_sqm: 16,
    available: false,
    images: [
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  
  // Arts Quarter Residence (id: 3) rooms
  {
    id: 301,
    hostel_id: 3,
    name: "Creative Single",
    type: "Single",
    description: "Inspiring single room with excellent natural light and space for creative projects. Designed with artists in mind.",
    price_per_night: 52,
    capacity: 1,
    amenities: ["Private Bathroom", "Large Desk", "Easel Space", "WiFi", "Natural Lighting"],
    size_sqm: 15,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 302,
    hostel_id: 3,
    name: "Artist's Double",
    type: "Double",
    description: "Spacious room for two creative minds with dedicated work areas and storage for art supplies.",
    price_per_night: 45,
    capacity: 2,
    amenities: ["Shared Bathroom", "Work Tables", "Supply Storage", "WiFi", "Natural Lighting"],
    size_sqm: 22,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 303,
    hostel_id: 3,
    name: "Studio Room",
    type: "Studio",
    description: "Self-contained studio with sleeping area, kitchenette, and generous creative space. Perfect for independent artists.",
    price_per_night: 65,
    capacity: 1,
    amenities: ["Private Bathroom", "Kitchenette", "Work Area", "WiFi", "Natural Lighting", "Sound Insulation"],
    size_sqm: 28,
    available: false,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  
  // Medical Students Residence (id: 4) rooms
  {
    id: 401,
    hostel_id: 4,
    name: "Study Single",
    type: "Single",
    description: "Quiet single room designed for intensive study with ergonomic furniture and excellent soundproofing.",
    price_per_night: 60,
    capacity: 1,
    amenities: ["Private Bathroom", "Ergonomic Desk", "Medical Textbook Shelf", "WiFi", "Soundproofing"],
    size_sqm: 14,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 402,
    hostel_id: 4,
    name: "Double Study Room",
    type: "Double",
    description: "Room for two medical students with individual study spaces and comfortable sleeping areas.",
    price_per_night: 50,
    capacity: 2,
    amenities: ["Shared Bathroom", "Two Study Desks", "Bookshelves", "WiFi", "Soundproofing"],
    size_sqm: 20,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 403,
    hostel_id: 4,
    name: "Premium Ensuite",
    type: "Ensuite",
    description: "Deluxe single room with private bathroom and additional amenities for medical students who need optimal study conditions.",
    price_per_night: 75,
    capacity: 1,
    amenities: ["Private Bathroom", "Large Desk", "Medical Reference Library", "WiFi", "Soundproofing", "Mini Fridge"],
    size_sqm: 18,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  
  // Riverside Student Housing (id: 5) rooms
  {
    id: 501,
    hostel_id: 5,
    name: "Riverside Single",
    type: "Single",
    description: "Cozy single room with beautiful river views. Perfect for students who appreciate natural surroundings.",
    price_per_night: 48,
    capacity: 1,
    amenities: ["Shared Bathroom", "Desk", "Wardrobe", "WiFi", "River View"],
    size_sqm: 12,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 502,
    hostel_id: 5,
    name: "Riverside Double",
    type: "Double",
    description: "Spacious room for two with panoramic river views and a small balcony for enjoying the scenery.",
    price_per_night: 40,
    capacity: 2,
    amenities: ["Shared Bathroom", "Two Desks", "Wardrobes", "WiFi", "River View", "Balcony"],
    size_sqm: 18,
    available: false,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 503,
    hostel_id: 5,
    name: "Quad Shared Room",
    type: "Shared",
    description: "Economical shared room for four students with individual storage spaces and study areas.",
    price_per_night: 30,
    capacity: 4,
    amenities: ["Shared Bathroom", "Study Corners", "Personal Lockers", "WiFi"],
    size_sqm: 28,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 504,
    hostel_id: 5,
    name: "Riverside Studio",
    type: "Studio",
    description: "Self-contained studio apartment with kitchenette and private bathroom. Offers more independence for longer stays.",
    price_per_night: 60,
    capacity: 2,
    amenities: ["Private Bathroom", "Kitchenette", "Dining Area", "WiFi", "River View"],
    size_sqm: 25,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

// Helper function to get rooms by hostel ID
export const getRoomsByHostelId = (hostelId) => {
  return rooms.filter(room => room.hostel_id === hostelId);
};

// Helper function to get room by ID
export const getRoomById = (roomId) => {
  return rooms.find(room => room.id === roomId);
};

export default rooms;