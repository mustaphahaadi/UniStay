"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const MapView = ({ hostels }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [selectedHostel, setSelectedHostel] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps API script
    if (!window.google && !document.getElementById("google-maps-script")) {
      const script = document.createElement("script")
      script.id = "google-maps-script"
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else if (window.google) {
      setMapLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !hostels.length) return

    // Initialize map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 5.6037, lng: -0.187 }, // Default to Accra, Ghana
      zoom: 13,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    })

    setMap(googleMap)

    // Create bounds to fit all markers
    const bounds = new window.google.maps.LatLngBounds()

    // Add markers for each hostel
    const markers = hostels.map((hostel) => {
      const position = {
        lat: Number.parseFloat(hostel.latitude || 5.6037),
        lng: Number.parseFloat(hostel.longitude || -0.187),
      }

      bounds.extend(position)

      const marker = new window.google.maps.Marker({
        position,
        map: googleMap,
        title: hostel.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      })

      // Add click event to marker
      marker.addListener("click", () => {
        setSelectedHostel(hostel)
      })

      return marker
    })

    // Fit map to bounds
    googleMap.fitBounds(bounds)

    // Adjust zoom if there's only one marker
    if (hostels.length === 1) {
      googleMap.setZoom(15)
    }

    // Clean up markers when component unmounts
    return () => {
      markers.forEach((marker) => marker.setMap(null))
    }
  }, [mapLoaded, hostels])

  return (
    <div className="relative w-full h-[600px]">
      <div ref={mapRef} className="w-full h-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      )}

      {selectedHostel && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg p-4">
          <button
            onClick={() => setSelectedHostel(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-4">
              {selectedHostel.image_url ? (
                <img
                  src={selectedHostel.image_url || "/placeholder.svg"}
                  alt={selectedHostel.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedHostel.name}</h3>
              <p className="text-sm text-gray-600">{selectedHostel.location}</p>
              <p className="text-sm font-semibold text-teal-600 mt-1">₵{selectedHostel.price}/semester</p>
            </div>
          </div>
          <Link
            to={`/hostels/${selectedHostel.id}`}
            className="mt-3 block w-full text-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  )
}

export default MapView
