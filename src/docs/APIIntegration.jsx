"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

const APIIntegration = () => {
  const [expandedSection, setExpandedSection] = useState("auth")
  const [copiedEndpoint, setCopiedEndpoint] = useState(null)

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const copyToClipboard = (text, endpoint) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const apiEndpoints = {
    auth: [
      {
        name: "Register User",
        method: "POST",
        endpoint: "/auth/register/",
        description: "Register a new user account",
        requestBody: `{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+233123456789",
  "password": "securepassword",
  "role": "user" // or "manager"
}`,
        response: `{
  "id": 1,
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user"
}`,
      },
      {
        name: "Login",
        method: "POST",
        endpoint: "/auth/login/",
        description: "Authenticate user and get token",
        requestBody: `{
  "email": "john.doe@example.com",
  "password": "securepassword"
}`,
        response: `{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user"
  }
}`,
      },
      {
        name: "Get Current User",
        method: "GET",
        endpoint: "/auth/user/",
        description: "Get the currently authenticated user's information",
        headers: "Authorization: Token <token>",
        response: `{
  "id": 1,
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user"
}`,
      },
      {
        name: "Request Password Reset",
        method: "POST",
        endpoint: "/auth/password-reset/",
        description: "Request a password reset link",
        requestBody: `{
  "email": "john.doe@example.com"
}`,
        response: `{
  "success": true,
  "message": "Password reset email has been sent."
}`,
      },
      {
        name: "Confirm Password Reset",
        method: "POST",
        endpoint: "/auth/password-reset/confirm/",
        description: "Reset password using token from email",
        requestBody: `{
  "uid": "MQ",
  "token": "5g1-a8c6f7e8d9c0b1a2s3d4",
  "new_password": "newSecurePassword"
}`,
        response: `{
  "success": true,
  "message": "Password has been reset successfully."
}`,
      },
    ],
    hostels: [
      {
        name: "List Hostels",
        method: "GET",
        endpoint: "/hostels/",
        description: "Get a list of all hostels",
        response: `{
  "count": 20,
  "next": "http://api.example.com/hostels/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Student Haven",
      "location": "East Legon",
      "price": 1200,
      "rating": 4.5,
      "image_url": "http://example.com/images/hostel1.jpg",
      "gender_type": "mixed",
      "university_name": "University of Ghana",
      "distance_to_university": 0.5
    },
    // More hostels...
  ]
}`,
      },
      {
        name: "Get Hostel Details",
        method: "GET",
        endpoint: "/hostels/{id}/",
        description: "Get detailed information about a specific hostel",
        response: `{
  "id": 1,
  "name": "Student Haven",
  "description": "A comfortable hostel close to the university...",
  "location": "East Legon",
  "price": 1200,
  "rating": 4.5,
  "owner_id": 5,
  "gender_type": "mixed",
  "university_name": "University of Ghana",
  "distance_to_university": 0.5,
  "beds_per_room": 2,
  "amenities": ["WiFi", "Kitchen", "Security", "Water", "Electricity"],
  "images": [
    "http://example.com/images/hostel1_1.jpg",
    "http://example.com/images/hostel1_2.jpg"
  ],
  "rooms": [
    {
      "id": 1,
      "number": "101",
      "capacity": 2,
      "available_beds": 1,
      "room_type": "Standard"
    },
    // More rooms...
  ]
}`,
      },
      {
        name: "Search Hostels",
        method: "GET",
        endpoint: "/hostels/search/",
        description: "Search for hostels with filters",
        queryParams:
          "q, university, location, gender_type, min_price, max_price, distance, rating, amenities, sort_by, page",
        response: `{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Student Haven",
      "location": "East Legon",
      "price": 1200,
      "rating": 4.5,
      "image_url": "http://example.com/images/hostel1.jpg",
      "gender_type": "mixed",
      "university_name": "University of Ghana",
      "distance_to_university": 0.5
    },
    // More hostels...
  ]
}`,
      },
      {
        name: "Create Hostel",
        method: "POST",
        endpoint: "/hostels/",
        description: "Create a new hostel (manager role required)",
        headers: "Authorization: Token <token>",
        requestBody: `{
  "name": "New Student Hostel",
  "description": "A modern hostel with all amenities...",
  "location": "Accra Central",
  "price": 1500,
  "gender_type": "mixed",
  "university_id": 1,
  "beds_per_room": 2,
  "amenities": ["WiFi", "Kitchen", "Security", "Water", "Electricity"],
  "latitude": 5.6037,
  "longitude": -0.1870
}`,
        response: `{
  "id": 10,
  "name": "New Student Hostel",
  "description": "A modern hostel with all amenities...",
  "location": "Accra Central",
  "price": 1500,
  "gender_type": "mixed",
  "university_name": "University of Ghana",
  "distance_to_university": 2.3,
  "beds_per_room": 2,
  "amenities": ["WiFi", "Kitchen", "Security", "Water", "Electricity"],
  "images": [],
  "rooms": []
}`,
      },
    ],
    bookings: [
      {
        name: "Create Booking",
        method: "POST",
        endpoint: "/bookings/",
        description: "Book a hostel room",
        headers: "Authorization: Token <token>",
        requestBody: `{
  "hostel": 1,
  "room": 5,
  "start_date": "2023-09-01",
  "end_date": "2023-12-15"
}`,
        response: `{
  "id": 1,
  "hostel": 1,
  "hostel_name": "Student Haven",
  "room": 5,
  "room_number": "105",
  "start_date": "2023-09-01",
  "end_date": "2023-12-15",
  "status": "confirmed",
  "created_at": "2023-08-15T14:30:45Z",
  "total_price": 1200
}`,
      },
      {
        name: "List User Bookings",
        method: "GET",
        endpoint: "/bookings/user/",
        description: "Get all bookings for the current user",
        headers: "Authorization: Token <token>",
        response: `[
  {
    "id": 1,
    "hostel": 1,
    "hostel_name": "Student Haven",
    "hostel_image": "http://example.com/images/hostel1.jpg",
    "hostel_location": "East Legon",
    "room": 5,
    "room_number": "105",
    "start_date": "2023-09-01",
    "end_date": "2023-12-15",
    "status": "confirmed",
    "created_at": "2023-08-15T14:30:45Z",
    "total_price": 1200
  },
  // More bookings...
]`,
      },
      {
        name: "Get Booking Details",
        method: "GET",
        endpoint: "/bookings/{id}/",
        description: "Get details of a specific booking",
        headers: "Authorization: Token <token>",
        response: `{
  "id": 1,
  "hostel": 1,
  "hostel_name": "Student Haven",
  "hostel_image": "http://example.com/images/hostel1.jpg",
  "hostel_location": "East Legon",
  "room": 5,
  "room_number": "105",
  "start_date": "2023-09-01",
  "end_date": "2023-12-15",
  "status": "confirmed",
  "created_at": "2023-08-15T14:30:45Z",
  "total_price": 1200,
  "payment_status": "paid"
}`,
      },
      {
        name: "Cancel Booking",
        method: "POST",
        endpoint: "/bookings/{id}/cancel/",
        description: "Cancel a booking",
        headers: "Authorization: Token <token>",
        response: `{
  "id": 1,
  "status": "cancelled",
  "cancelled_at": "2023-08-20T10:15:30Z"
}`,
      },
    ],
    reviews: [
      {
        name: "Get Hostel Reviews",
        method: "GET",
        endpoint: "/hostels/{id}/reviews/",
        description: "Get all reviews for a specific hostel",
        response: `[
  {
    "id": 1,
    "user_id": 3,
    "user_name": "John Doe",
    "rating": 4.5,
    "title": "Great place to stay",
    "comment": "I enjoyed my stay here. The facilities were clean and staff was friendly.",
    "created_at": "2023-07-15T09:30:00Z",
    "likes_count": 5,
    "user_has_liked": false
  },
  // More reviews...
]`,
      },
      {
        name: "Create Review",
        method: "POST",
        endpoint: "/hostels/{id}/reviews/",
        description: "Create a review for a hostel",
        headers: "Authorization: Token <token>",
        requestBody: `{
  "rating": 4.5,
  "title": "Great place to stay",
  "comment": "I enjoyed my stay here. The facilities were clean and staff was friendly."
}`,
        response: `{
  "id": 10,
  "user_id": 2,
  "user_name": "Current User",
  "rating": 4.5,
  "title": "Great place to stay",
  "comment": "I enjoyed my stay here. The facilities were clean and staff was friendly.",
  "created_at": "2023-08-25T14:20:00Z",
  "likes_count": 0,
  "user_has_liked": false
}`,
      },
      {
        name: "Like Review",
        method: "POST",
        endpoint: "/reviews/{id}/like/",
        description: "Like or unlike a review",
        headers: "Authorization: Token <token>",
        response: `{
  "review_id": 1,
  "likes_count": 6,
  "user_has_liked": true
}`,
      },
    ],
    favorites: [
      {
        name: "List Favorites",
        method: "GET",
        endpoint: "/favorites/",
        description: "Get all favorite hostels for the current user",
        headers: "Authorization: Token <token>",
        response: `[
  {
    "id": 1,
    "user_id": 2,
    "hostel_id": 5,
    "created_at": "2023-08-10T11:20:00Z",
    "hostel": {
      "id": 5,
      "name": "Comfort Hostel",
      "location": "Adenta",
      "price": 1100,
      "rating": 4.2,
      "image_url": "http://example.com/images/hostel5.jpg",
      "gender_type": "female",
      "university_name": "University of Ghana",
      "distance_to_university": 1.2
    }
  },
  // More favorites...
]`,
      },
      {
        name: "Add to Favorites",
        method: "POST",
        endpoint: "/favorites/",
        description: "Add a hostel to favorites",
        headers: "Authorization: Token <token>",
        requestBody: `{
  "hostel_id": 3
}`,
        response: `{
  "id": 5,
  "user_id": 2,
  "hostel_id": 3,
  "created_at": "2023-08-25T15:30:00Z"
}`,
      },
      {
        name: "Remove from Favorites",
        method: "DELETE",
        endpoint: "/favorites/{id}/",
        description: "Remove a hostel from favorites",
        headers: "Authorization: Token <token>",
        response: "204 No Content",
      },
    ],
    profile: [
      {
        name: "Get User Profile",
        method: "GET",
        endpoint: "/users/profile/",
        description: "Get the current user's profile information",
        headers: "Authorization: Token <token>",
        response: `{
  "id": 2,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+233123456789",
  "bio": "Student at University of Ghana",
  "university": "University of Ghana",
  "occupation": "Student",
  "date_of_birth": "1998-05-15",
  "address": "123 Main St, Accra",
  "profile_picture": "http://example.com/images/profiles/john.jpg"
}`,
      },
      {
        name: "Update User Profile",
        method: "PUT",
        endpoint: "/users/profile/update/",
        description: "Update the current user's profile information",
        headers: "Authorization: Token <token>",
        requestBody: `{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+233123456789",
  "bio": "Graduate student at University of Ghana",
  "university": "University of Ghana",
  "occupation": "Graduate Student",
  "date_of_birth": "1998-05-15",
  "address": "456 New St, Accra"
}`,
        response: `{
  "id": 2,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+233123456789",
  "bio": "Graduate student at University of Ghana",
  "university": "University of Ghana",
  "occupation": "Graduate Student",
  "date_of_birth": "1998-05-15",
  "address": "456 New St, Accra",
  "profile_picture": "http://example.com/images/profiles/john.jpg"
}`,
      },
      {
        name: "Upload Profile Picture",
        method: "POST",
        endpoint: "/users/profile/upload-picture/",
        description: "Upload a profile picture",
        headers: "Authorization: Token <token>",
        requestBody: "Form Data with 'profile_picture' file field",
        response: `{
  "profile_picture": "http://example.com/images/profiles/john_updated.jpg"
}`,
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">API Integration Documentation</h1>
      <p className="text-gray-600 mb-8">
        This documentation provides details on how to integrate with the UniStay backend API.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Base URL</h2>
        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
          <code className="text-sm">https://api.unistay.example.com/api/v1</code>
          <button
            onClick={() => copyToClipboard("https://api.unistay.example.com/api/v1", "base-url")}
            className="text-gray-500 hover:text-gray-700"
          >
            {copiedEndpoint === "base-url" ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <p className="mb-4">
          Most endpoints require authentication using a token. After logging in, include the token in the Authorization
          header:
        </p>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <code className="text-sm">Authorization: Token &lt;your_token&gt;</code>
        </div>
      </div>

      {Object.keys(apiEndpoints).map((section) => (
        <div key={section} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <button onClick={() => toggleSection(section)} className="w-full flex justify-between items-center">
            <h2 className="text-xl font-semibold">{section.charAt(0).toUpperCase() + section.slice(1)} Endpoints</h2>
            {expandedSection === section ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSection === section && (
            <div className="mt-4 space-y-6">
              {apiEndpoints[section].map((endpoint, index) => (
                <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{endpoint.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        endpoint.method === "GET"
                          ? "bg-blue-100 text-blue-800"
                          : endpoint.method === "POST"
                            ? "bg-green-100 text-green-800"
                            : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">{endpoint.description}</p>

                  <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center mb-2">
                    <code className="text-sm">{endpoint.endpoint}</code>
                    <button
                      onClick={() => copyToClipboard(endpoint.endpoint, `${section}-${index}`)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {copiedEndpoint === `${section}-${index}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {endpoint.headers && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Headers:</p>
                      <div className="bg-gray-100 p-2 rounded-md">
                        <code className="text-xs">{endpoint.headers}</code>
                      </div>
                    </div>
                  )}

                  {endpoint.queryParams && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Query Parameters:</p>
                      <div className="bg-gray-100 p-2 rounded-md">
                        <code className="text-xs">{endpoint.queryParams}</code>
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Request Body:</p>
                      <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                        <code className="text-xs">{endpoint.requestBody}</code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Response:</p>
                    <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                      <code className="text-xs">{endpoint.response}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default APIIntegration
