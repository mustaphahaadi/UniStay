"use client"

import { Link } from "react-router-dom"
import { MapPin, School, Users, Wifi, Tv, Fan, Heart } from "lucide-react"
import { useFavorites } from "../contexts/FavoritesContext"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HostelCard = ({ hostel }) => {
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  // Function to render amenity icons
  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "fan":
        return <Fan className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate("/login", { state: { from: `/hostels/${hostel.id}` } })
      return
    }

    if (isProcessing) return

    setIsProcessing(true)
    try {
      if (isFavorite(hostel.id)) {
        await removeFavorite(hostel.id)
      } else {
        await addFavorite(hostel.id)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const isFav = isFavorite(hostel.id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={hostel.image_url || "/placeholder-hostel.jpg"}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-teal-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
          {hostel.gender_type}
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-0 left-0 m-2 p-2 rounded-full ${
            isFav ? "bg-red-500 text-white" : "bg-white text-gray-600"
          } hover:scale-110 transition-all duration-200 shadow-md`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
        </button>

        {hostel.rating && (
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-3 py-1 m-2 rounded-md text-sm font-medium flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {hostel.rating}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{hostel.name}</h3>

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

        <div className="flex items-start text-gray-600 mb-4">
          <Users className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{hostel.beds_per_room} beds per room</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hostel.amenities &&
            hostel.amenities.slice(0, 5).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium text-gray-800"
              >
                {renderAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </span>
            ))}
          {hostel.amenities && hostel.amenities.length > 5 && (
            <span className="inline-flex items-center bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium text-gray-800">
              +{hostel.amenities.length - 5} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-teal-600">₵{hostel.price}</span>
            <span className="text-gray-500 text-sm">/semester</span>
          </div>
          <Link
            to={`/hostels/${hostel.id}`}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HostelCard
