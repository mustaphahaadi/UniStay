"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { useFavorites } from "../contexts/FavoritesContext"
import { toast } from "react-toastify"
import ReviewSystem from "../components/ReviewSystem"
import MapView from "../components/MapView"
import {
  MapPin,
  School,
  Users,
  Wifi,
  Tv,
  Fan,
  ShowerHead,
  CookingPotIcon as Kitchen,
  BookOpen,
  Shield,
  Droplet,
  Zap,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  Edit,
  Star,
} from "lucide-react"

const HostelDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isManager } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [hostel, setHostel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookingDates, setBookingDates] = useState({
    start_date: "",
    end_date: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [isProcessingFavorite, setIsProcessingFavorite] = useState(false)

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/hostels/${id}/`)

        if (!response.ok) {
          throw new Error("Hostel not found")
        }

        const data = await response.json()
        setHostel(data)

        // Set the first room as selected by default if rooms exist
        if (data.rooms && data.rooms.length > 0) {
          setSelectedRoom(data.rooms[0])
        }
      } catch (error) {
        console.error("Error fetching hostel details:", error)
        toast.error("Failed to load hostel details")
      } finally {
        setLoading(false)
      }
    }

    fetchHostelDetails()
  }, [id])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? hostel.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === hostel.images.length - 1 ? 0 : prev + 1))
  }

  const handleRoomSelect = (room) => {
    setSelectedRoom(room)
  }

  const handleBookingDateChange = (e) => {
    const { name, value } = e.target
    setBookingDates((prev) => ({ ...prev, [name]: value }))
  }

  const handleBookNow = async () => {
    if (!user) {
      toast.info("Please login to book a hostel")
      navigate("/login", { state: { from: `/hostels/${id}` } })
      return
    }

    if (!selectedRoom) {
      toast.error("Please select a room")
      return
    }

    if (!bookingDates.start_date || !bookingDates.end_date) {
      toast.error("Please select booking dates")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          hostel: hostel.id,
          room: selectedRoom.id,
          start_date: bookingDates.start_date,
          end_date: bookingDates.end_date,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed")
      }

      toast.success("Booking successful!")
      navigate("/dashboard/bookings")
    } catch (error) {
      console.error("Booking error:", error)
      toast.error(error.message || "Failed to book hostel")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/hostels/${id}` } })
      return
    }

    if (isProcessingFavorite) return

    setIsProcessingFavorite(true)
    try {
      if (isFavorite(hostel.id)) {
        const success = await removeFavorite(hostel.id)
        if (success) {
          toast.success("Removed from favorites")
        }
      } else {
        const success = await addFavorite(hostel.id)
        if (success) {
          toast.success("Added to favorites")
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsProcessingFavorite(false)
    }
  }

  const handleShareHostel = () => {
    if (navigator.share) {
      navigator.share({
        title: hostel.name,
        text: `Check out this hostel: ${hostel.name}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  // Function to render amenity icons
  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-5 w-5" />
      case "tv":
        return <Tv className="h-5 w-5" />
      case "fan":
        return <Fan className="h-5 w-5" />
      case "bathroom":
        return <ShowerHead className="h-5 w-5" />
      case "kitchen":
        return <Kitchen className="h-5 w-5" />
      case "study room":
        return <BookOpen className="h-5 w-5" />
      case "security":
        return <Shield className="h-5 w-5" />
      case "water":
        return <Droplet className="h-5 w-5" />
      case "electricity":
        return <Zap className="h-5 w-5" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!hostel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Hostel Not Found</h2>
          <p className="text-gray-600 mb-6">The hostel you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/hostels"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Browse All Hostels
          </Link>
        </div>
      </div>
    )
  }

  const isFav = isFavorite(hostel.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/hostels" className="flex items-center text-teal-600 hover:text-teal-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Hostels
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96">
          {hostel.images && hostel.images.length > 0 ? (
            <>
              <img
                src={hostel.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${hostel.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {hostel.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {hostel.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full ${
                          currentImageIndex === index ? "bg-white" : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full shadow-md ${
                    isFav ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
                </button>
                <button onClick={handleShareHostel} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <Share className="h-5 w-5 text-gray-700" />
                </button>
                {user && isManager() && hostel.owner_id === user.id && (
                  <Link
                    to={`/manager/edit-hostel/${hostel.id}`}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Edit className="h-5 w-5 text-gray-700" />
                  </Link>
                )}
              </div>

              <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {hostel.gender_type}
              </div>

              {hostel.rating && (
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  {hostel.rating}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>

              <div className="flex items-start text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{hostel.location}</p>
              </div>

              <div className="flex items-start text-gray-600 mb-2">
                <School className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  {hostel.university_name} ({hostel.distance_to_university} km)
                </p>
              </div>

              <div className="flex items-start text-gray-600">
                <Users className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{hostel.beds_per_room} beds per room</p>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-teal-600 mb-1">₵{hostel.price}</div>
              <p className="text-gray-500 text-sm mb-4">per semester</p>

              {user && isManager() && hostel.owner_id === user.id ? (
                <Link
                  to={`/manager/edit-hostel/${hostel.id}`}
                  className="block w-full px-4 py-2 bg-teal-600 text-white text-center rounded-md hover:bg-teal-700 transition-colors"
                >
                  Edit Hostel
                </Link>
              ) : (
                <button
                  onClick={() => document.getElementById("booking-section").scrollIntoView({ behavior: "smooth" })}
                  className="block w-full px-4 py-2 bg-teal-600 text-white text-center rounded-md hover:bg-teal-700 transition-colors"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("rooms")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "rooms"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Rooms & Availability
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "location"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Location
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div>
            {activeTab === "details" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{hostel.description}</p>

                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {hostel.amenities &&
                    hostel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600 mr-3">
                          {renderAmenityIcon(amenity)}
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "rooms" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Rooms & Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {hostel.rooms &&
                    hostel.rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedRoom && selectedRoom.id === room.id
                            ? "border-teal-600 bg-teal-50"
                            : "border-gray-200 hover:border-teal-600"
                        }`}
                        onClick={() => handleRoomSelect(room)}
                      >
                        <h3 className="font-semibold mb-2">Room {room.number}</h3>
                        <p className="text-gray-600 mb-1">Capacity: {room.capacity} persons</p>
                        <p className="text-gray-600 mb-1">Available: {room.available_beds} beds</p>
                        <p className="text-gray-600">Type: {room.room_type}</p>
                        {room.available_beds === 0 && (
                          <div className="mt-2 text-red-600 text-sm font-medium">Fully Booked</div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-100 h-64 rounded-lg mb-6">
                  {hostel.latitude && hostel.longitude ? (
                    <MapView hostels={[hostel]} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">Map location not available</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Nearby Amenities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block bg-teal-100 text-teal-600 p-1 rounded-full mr-2">
                        <School className="h-4 w-4" />
                      </span>
                      <span>
                        {hostel.university_name} - {hostel.distance_to_university} km
                      </span>
                    </li>
                    {/* Add more nearby amenities here */}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <ReviewSystem hostelId={hostel.id} />
              </div>
            )}
          </div>

          <div id="booking-section" className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>

            {!user ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-700 mb-4">Please login to book this hostel</p>
                <Link
                  to={`/login?redirect=/hostels/${hostel.id}`}
                  className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Login to Continue
                </Link>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selected Room</label>
                    <select
                      value={selectedRoom ? selectedRoom.id : ""}
                      onChange={(e) => {
                        const roomId = e.target.value
                        const room = hostel.rooms.find((r) => r.id.toString() === roomId)
                        setSelectedRoom(room)
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a room</option>
                      {hostel.rooms.map((room) => (
                        <option key={room.id} value={room.id} disabled={room.available_beds === 0}>
                          Room {room.number} - {room.available_beds} beds available
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={bookingDates.start_date}
                      onChange={handleBookingDateChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="end_date"
                      value={bookingDates.end_date}
                      min={bookingDates.start_date}
                      onChange={handleBookingDateChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">Total: ₵{hostel.price}</p>
                    <p className="text-sm text-gray-500">per semester</p>
                  </div>

                  <button
                    onClick={handleBookNow}
                    disabled={
                      isSubmitting ||
                      !selectedRoom ||
                      !bookingDates.start_date ||
                      !bookingDates.end_date ||
                      selectedRoom.available_beds === 0
                    }
                    className={`px-6 py-2 rounded-md font-medium ${
                      isSubmitting ||
                      !selectedRoom ||
                      !bookingDates.start_date ||
                      !bookingDates.end_date ||
                      (selectedRoom && selectedRoom.available_beds === 0)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    } transition-colors`}
                  >
                    {isSubmitting ? "Processing..." : "Book Now"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostelDetails
