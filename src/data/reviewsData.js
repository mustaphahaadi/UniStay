// Mock data for reviews
export const reviews = [
  // Tech Haven Hostel (id: 1) reviews
  {
    id: 1,
    hostel_id: 1,
    user_id: 1,
    rating: 4,
    comment: "Great location and facilities. Very clean and modern. The study rooms were perfect for exam preparation, and the WiFi was reliable throughout my stay.",
    created_at: "2023-04-10T15:20:00Z",
    user: {
      firstName: "John",
      lastName: "Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    }
  },
  {
    id: 2,
    hostel_id: 1,
    user_id: 3,
    rating: 5,
    comment: "Excellent staff and amenities. Would definitely stay again! The gym was well-equipped and the kitchen facilities were always clean. Made some great friends during my stay.",
    created_at: "2023-04-15T09:10:00Z",
    user: {
      firstName: "Alex",
      lastName: "Johnson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    }
  },
  {
    id: 3,
    hostel_id: 1,
    user_id: 5,
    rating: 4,
    comment: "The location is perfect for tech students. Just a short walk to campus and surrounded by cafes and shops. The rooms are a bit small but very functional.",
    created_at: "2023-05-02T14:30:00Z",
    user: {
      firstName: "Emma",
      lastName: "Wilson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    }
  },
  
  // Central Student Lodge (id: 2) reviews
  {
    id: 4,
    hostel_id: 2,
    user_id: 2,
    rating: 4,
    comment: "Good value for money. Convenient location near campus. The common areas were great for socializing, and the staff was always helpful with any issues.",
    created_at: "2023-03-25T14:30:00Z",
    user: {
      firstName: "Sarah",
      lastName: "Brown",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    }
  },
  {
    id: 5,
    hostel_id: 2,
    user_id: 4,
    rating: 3,
    comment: "Decent accommodation for the price. The rooms are basic but clean. Could use better soundproofing between rooms, but overall a good budget option.",
    created_at: "2023-04-05T11:45:00Z",
    user: {
      firstName: "Michael",
      lastName: "Taylor",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    }
  },
  {
    id: 6,
    hostel_id: 2,
    user_id: 6,
    rating: 5,
    comment: "Exceeded my expectations! The breakfast was a great addition and saved me time and money. The location is perfect for accessing public transportation.",
    created_at: "2023-04-18T16:20:00Z",
    user: {
      firstName: "Jessica",
      lastName: "Martinez",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    }
  },
  
  // Arts Quarter Residence (id: 3) reviews
  {
    id: 7,
    hostel_id: 3,
    user_id: 7,
    rating: 5,
    comment: "Perfect for art students! The studio spaces are amazing and the natural lighting is perfect for painting. The community of artists makes this place special.",
    created_at: "2023-03-15T10:20:00Z",
    user: {
      firstName: "David",
      lastName: "Lee",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    }
  },
  {
    id: 8,
    hostel_id: 3,
    user_id: 8,
    rating: 4,
    comment: "Great creative atmosphere. The music room was a huge plus for me as a music student. Sometimes it gets a bit noisy with all the artistic activities.",
    created_at: "2023-04-02T13:40:00Z",
    user: {
      firstName: "Sophia",
      lastName: "Garcia",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    }
  },
  {
    id: 9,
    hostel_id: 3,
    user_id: 9,
    rating: 5,
    comment: "The exhibition space allowed me to showcase my work to other students and even some local gallery owners. The garden is also a peaceful place to find inspiration.",
    created_at: "2023-04-22T17:15:00Z",
    user: {
      firstName: "Daniel",
      lastName: "Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    }
  },
  
  // Medical Students Residence (id: 4) reviews
  {
    id: 10,
    hostel_id: 4,
    user_id: 10,
    rating: 5,
    comment: "Perfectly designed for medical students. The quiet environment and proximity to the teaching hospital made my clinical rotations much easier to manage.",
    created_at: "2023-03-20T09:30:00Z",
    user: {
      firstName: "Olivia",
      lastName: "Miller",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    }
  },
  {
    id: 11,
    hostel_id: 4,
    user_id: 11,
    rating: 4,
    comment: "Great study environment with 24-hour access to study rooms. The library resources were very helpful during exam periods. Rooms are comfortable and clean.",
    created_at: "2023-04-08T11:25:00Z",
    user: {
      firstName: "James",
      lastName: "Wilson",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    }
  },
  
  // Riverside Student Housing (id: 5) reviews
  {
    id: 12,
    hostel_id: 5,
    user_id: 12,
    rating: 5,
    comment: "The river views are stunning! I loved being able to kayak right from the residence. The outdoor spaces made studying much more enjoyable during good weather.",
    created_at: "2023-03-28T16:45:00Z",
    user: {
      firstName: "Ava",
      lastName: "Thompson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    }
  },
  {
    id: 13,
    hostel_id: 5,
    user_id: 13,
    rating: 4,
    comment: "Beautiful location and good facilities. The BBQ area was great for weekend gatherings. The rooms are comfortable, though some could use updating.",
    created_at: "2023-04-12T14:10:00Z",
    user: {
      firstName: "Ethan",
      lastName: "Anderson",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    }
  },
  
  // International Student House (id: 6) reviews
  {
    id: 14,
    hostel_id: 6,
    user_id: 14,
    rating: 5,
    comment: "Amazing cultural experience! I've made friends from all over the world and learned so much. The language exchange programs and international dinners were highlights.",
    created_at: "2023-03-22T12:35:00Z",
    user: {
      firstName: "Isabella",
      lastName: "White",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    }
  },
  {
    id: 15,
    hostel_id: 6,
    user_id: 15,
    rating: 4,
    comment: "Great community atmosphere. As an international student, I felt welcomed and supported. The cultural events helped me adjust to studying abroad.",
    created_at: "2023-04-05T10:50:00Z",
    user: {
      firstName: "Noah",
      lastName: "Martin",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    }
  },
  
  // Eco-Friendly Student Village (id: 7) reviews
  {
    id: 16,
    hostel_id: 7,
    user_id: 16,
    rating: 5,
    comment: "Living here has transformed how I think about sustainability. The eco-workshops were educational, and I loved contributing to the organic garden.",
    created_at: "2023-03-18T15:15:00Z",
    user: {
      firstName: "Mia",
      lastName: "Clark",
      avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    }
  },
  {
    id: 17,
    hostel_id: 7,
    user_id: 17,
    rating: 5,
    comment: "The eco-cabins are so unique and comfortable! It's amazing to live in a place that aligns with my environmental values. The community is very supportive.",
    created_at: "2023-04-09T13:20:00Z",
    user: {
      firstName: "Liam",
      lastName: "Lewis",
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    }
  },
  
  // Historic Campus Residence (id: 8) reviews
  {
    id: 18,
    hostel_id: 8,
    user_id: 18,
    rating: 4,
    comment: "Beautiful historic building with lots of character. The common areas are elegant, and the garden is perfect for studying. Rooms are cozy but well-maintained.",
    created_at: "2023-03-25T11:30:00Z",
    user: {
      firstName: "Charlotte",
      lastName: "Walker",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    }
  },
  {
    id: 19,
    hostel_id: 8,
    user_id: 19,
    rating: 5,
    comment: "Studying in such a historic setting is inspiring. The library is my favorite place - it feels like stepping back in time but with modern amenities.",
    created_at: "2023-04-14T16:05:00Z",
    user: {
      firstName: "Benjamin",
      lastName: "Hall",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    }
  },
  
  // Sports Academy Residence (id: 9) reviews
  {
    id: 20,
    hostel_id: 9,
    user_id: 20,
    rating: 5,
    comment: "Perfect for student athletes! The training facilities are top-notch, and the protein bar is so convenient after workouts. The staff understands athletes' needs.",
    created_at: "2023-03-30T14:25:00Z",
    user: {
      firstName: "Amelia",
      lastName: "Young",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    }
  },
  {
    id: 21,
    hostel_id: 9,
    user_id: 21,
    rating: 4,
    comment: "Great for balancing sports and academics. The recovery room helped me stay in top condition during the season. Meal plans are excellent for athletes.",
    created_at: "2023-04-17T10:40:00Z",
    user: {
      firstName: "William",
      lastName: "Allen",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    }
  },
  
  // Urban Loft Student Housing (id: 10) reviews
  {
    id: 22,
    hostel_id: 10,
    user_id: 22,
    rating: 5,
    comment: "The loft design is so cool and modern! The co-working space is perfect for group projects, and the rooftop terrace has amazing city views.",
    created_at: "2023-04-02T12:15:00Z",
    user: {
      firstName: "Harper",
      lastName: "Scott",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    }
  },
  {
    id: 23,
    hostel_id: 10,
    user_id: 23,
    rating: 4,
    comment: "Stylish accommodation in a great neighborhood. The coffee bar is a nice touch for late-night study sessions. The loft layout makes even shared spaces feel private.",
    created_at: "2023-04-20T15:50:00Z",
    user: {
      firstName: "Mason",
      lastName: "Green",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    }
  }
];

// Helper function to get reviews by hostel ID
export const getReviewsByHostelId = (hostelId) => {
  return reviews.filter(review => review.hostel_id === hostelId);
};

// Helper function to calculate average rating for a hostel
export const getAverageRating = (hostelId) => {
  const hostelReviews = getReviewsByHostelId(hostelId);
  if (hostelReviews.length === 0) return 0;
  
  const sum = hostelReviews.reduce((total, review) => total + review.rating, 0);
  return (sum / hostelReviews.length).toFixed(1);
};

export default reviews;