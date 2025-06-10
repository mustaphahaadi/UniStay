const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create universities
  const universities = [
    {
      name: "University of Technology",
      location: "New York, NY",
      website: "https://techuniversity.edu",
      description: "A leading institution for technology and engineering studies."
    },
    {
      name: "Central State University",
      location: "Chicago, IL",
      website: "https://centralstate.edu",
      description: "A comprehensive university offering diverse academic programs."
    },
    {
      name: "Pacific Arts College",
      location: "Los Angeles, CA",
      website: "https://pacificarts.edu",
      description: "Premier institution for arts and creative studies."
    },
    {
      name: "Northern Medical School",
      location: "Boston, MA",
      website: "https://northernmed.edu",
      description: "Top-ranked medical school with cutting-edge research facilities."
    },
    {
      name: "Riverside University",
      location: "San Antonio, TX",
      website: "https://riverside.edu",
      description: "Beautiful campus with strong focus on environmental studies."
    }
  ];

  console.log('Creating universities...');
  for (const university of universities) {
    await prisma.university.create({
      data: university
    });
  }

  // Create users (managers and regular users)
  const users = [
    {
      email: "manager1@example.com",
      password: "hashed_password_here", // In production, use proper password hashing
      first_name: "John",
      last_name: "Smith",
      role: "manager",
      phone: "123-456-7890"
    },
    {
      email: "manager2@example.com",
      password: "hashed_password_here",
      first_name: "Sarah",
      last_name: "Johnson",
      role: "manager",
      phone: "234-567-8901"
    },
    {
      email: "user1@example.com",
      password: "hashed_password_here",
      first_name: "Michael",
      last_name: "Brown",
      role: "user",
      phone: "345-678-9012"
    },
    {
      email: "user2@example.com",
      password: "hashed_password_here",
      first_name: "Emily",
      last_name: "Davis",
      role: "user",
      phone: "456-789-0123"
    }
  ];

  console.log('Creating users...');
  for (const user of users) {
    await prisma.user.create({
      data: user
    });
  }

  // Create hostels
  const hostels = [
    {
      name: "Tech Haven Hostel",
      description: "Modern accommodation close to University of Technology with state-of-the-art facilities.",
      address: "123 Campus Drive, New York, NY",
      university_id: 1,
      manager_id: 1,
      price_per_night: 45,
      rating: 4.5,
      amenities: ["WiFi", "Laundry", "Kitchen", "Study Room", "Gym"],
      room_types: ["Single", "Double", "Shared"],
      available_rooms: 8,
      total_rooms: 30,
      distance_to_university: 0.5
    },
    {
      name: "Central Student Lodge",
      description: "Affordable accommodation in the heart of Chicago, perfect for students on a budget.",
      address: "456 University Ave, Chicago, IL",
      university_id: 2,
      manager_id: 2,
      price_per_night: 38,
      rating: 4.2,
      amenities: ["WiFi", "Laundry", "Common Room", "Bike Storage"],
      room_types: ["Single", "Double"],
      available_rooms: 12,
      total_rooms: 25,
      distance_to_university: 0.8
    }
  ];

  console.log('Creating hostels...');
  for (const hostel of hostels) {
    await prisma.hostel.create({
      data: hostel
    });
  }

  // Create rooms
  const rooms = [
    {
      hostel_id: 1,
      name: "Standard Single Room",
      type: "Single",
      description: "Comfortable single room with a twin bed, desk, and storage space.",
      price_per_night: 45,
      capacity: 1,
      amenities: ["Private Bathroom", "Desk", "Wardrobe", "WiFi"],
      size_sqm: 12,
      available: true
    },
    {
      hostel_id: 1,
      name: "Double Room",
      type: "Double",
      description: "Spacious room with two twin beds, perfect for friends or students who prefer having a roommate.",
      price_per_night: 35,
      capacity: 2,
      amenities: ["Shared Bathroom", "Two Desks", "Two Wardrobes", "WiFi"],
      size_sqm: 18,
      available: true
    },
    {
      hostel_id: 2,
      name: "Budget Single",
      type: "Single",
      description: "Affordable single room with all the essentials.",
      price_per_night: 38,
      capacity: 1,
      amenities: ["Shared Bathroom", "Desk", "Wardrobe", "WiFi"],
      size_sqm: 10,
      available: true
    }
  ];

  console.log('Creating rooms...');
  for (const room of rooms) {
    await prisma.room.create({
      data: room
    });
  }

  // Create bookings
  const bookings = [
    {
      user_id: 3,
      hostel_id: 1,
      room_id: 1,
      check_in_date: new Date("2024-06-01"),
      check_out_date: new Date("2024-06-10"),
      total_price: 450,
      status: "confirmed",
      payment_status: "paid",
      special_requests: "Late check-in, arriving around 8 PM"
    },
    {
      user_id: 4,
      hostel_id: 2,
      room_id: 3,
      check_in_date: new Date("2024-07-05"),
      check_out_date: new Date("2024-07-12"),
      total_price: 266,
      status: "pending",
      payment_status: "awaiting",
      special_requests: "Room with good natural light"
    }
  ];

  console.log('Creating bookings...');
  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking
    });
  }

  // Create reviews
  const reviews = [
    {
      user_id: 3,
      hostel_id: 1,
      rating: 5,
      comment: "Excellent facilities and great location!",
      created_at: new Date()
    },
    {
      user_id: 4,
      hostel_id: 2,
      rating: 4,
      comment: "Good value for money, clean rooms.",
      created_at: new Date()
    }
  ];

  console.log('Creating reviews...');
  for (const review of reviews) {
    await prisma.review.create({
      data: review
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 