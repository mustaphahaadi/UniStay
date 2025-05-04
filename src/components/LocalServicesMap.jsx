"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, ShoppingCart, Bus, Utensils, Book } from "lucide-react"

const LocalServicesMap = ({ hostelLocation }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [services, setServices] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedService, setSelectedService] = useState(null)

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
    if (!mapLoaded || !hostelLocation) return

    // Initialize map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: Number.parseFloat(hostelLocation.latitude),
        lng: Number.parseFloat(hostelLocation.longitude),
      },
      zoom: 15,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    })

    setMap(googleMap)

    // Add hostel marker
    new window.google.maps.Marker({
      position: {
        lat: Number.parseFloat(hostelLocation.latitude),
        lng: Number.parseFloat(hostelLocation.longitude),
      },
      map: googleMap,
      title: hostelLocation.name,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    })

    // Find nearby services
    const service = new window.google.maps.places.PlacesService(googleMap)

    const serviceTypes = [
      { type: "restaurant", category: "food" },
      { type: "cafe", category: "food" },
      { type: "supermarket", category: "shopping" },
      { type: "grocery_or_supermarket", category: "shopping" },
      { type: "convenience_store", category: "shopping" },
      { type: "library", category: "education" },
      { type: "university", category: "education" },
      { type: "bus_station", category: "transport" },
      { type: "transit_station", category: "transport" },
    ]

    const allServices = []

    serviceTypes.forEach(({ type, category }) => {
      service.nearbySearch(
        {
          location: {
            lat: Number.parseFloat(hostelLocation.latitude),
            lng: Number.parseFloat(hostelLocation.longitude),
          },
          radius: 1000, // 1km radius
          type: type,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const servicesWithCategory = results.map((place) => ({
              ...place,
              category,
              distance: calculateDistance(
                Number.parseFloat(hostelLocation.latitude),
                Number.parseFloat(hostelLocation.longitude),
                place.geometry.location.lat(),
                place.geometry.location.lng(),
              ),
            }))

            allServices.push(...servicesWithCategory)

            // Remove duplicates and sort by distance
            const uniqueServices = allServices
              .filter((service, index, self) => index === self.findIndex((s) => s.place_id === service.place_id))
              .sort((a, b) => a.distance - b.distance)

            setServices(uniqueServices)
          }
        },
      )
    })
  }, [mapLoaded, hostelLocation])

  useEffect(() => {
    if (!map || !services.length) return

    // Clear existing markers
    services.forEach((service) => {
      if (service.marker) {
        service.marker.setMap(null)
      }
    })

    // Filter services by category
    const filteredServices =
      selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

    // Add markers for filtered services
    filteredServices.forEach((service) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: service.geometry.location.lat(),
          lng: service.geometry.location.lng(),
        },
        map: map,
        title: service.name,
        icon: {
          url: getMarkerIcon(service.category),
        },
      })

      // Add click event to marker
      marker.addListener("click", () => {
        setSelectedService(service)
      })

      // Store marker reference
      service.marker = marker
    })

    return () => {
      // Clean up markers
      services.forEach((service) => {
        if (service.marker) {
          service.marker.setMap(null)
        }
      })
    }
  }, [map, services, selectedCategory])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  const getMarkerIcon = (category) => {
    switch (category) {
      case "food":
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      case "shopping":
        return "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
      case "education":
        return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      case "transport":
        return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
      default:
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food":
        return <Utensils className="h-4 w-4" />
      case "shopping":
        return <ShoppingCart className="h-4 w-4" />
      case "education":
        return <Book className="h-4 w-4" />
      case "transport":
        return <Bus className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-teal-600" />
          Local Services
        </h2>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === "all" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("food")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              selectedCategory === "food" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Utensils className="h-3 w-3 mr-1" /> Food
          </button>
          <button
            onClick={() => setSelectedCategory("shopping")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              selectedCategory === "shopping" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ShoppingCart className="h-3 w-3 mr-1" /> Shopping
          </button>
          <button
            onClick={() => setSelectedCategory("education")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              selectedCategory === "education"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Book className="h-3 w-3 mr-1" /> Education
          </button>
          <button
            onClick={() => setSelectedCategory("transport")}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              selectedCategory === "transport"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Bus className="h-3 w-3 mr-1" /> Transport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="h-[400px]">
            <div ref={mapRef} className="w-full h-full" />

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-gray-200">
          <div className="p-4">
            <h3 className="font-medium mb-2">Nearby Services</h3>

            {filteredServices.length === 0 ? (
              <p className="text-gray-500 text-sm">No services found nearby</p>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2">
                {filteredServices.slice(0, 10).map((service) => (
                  <button
                    key={service.place_id}
                    onClick={() => {
                      setSelectedService(service)
                      map.panTo({
                        lat: service.geometry.location.lat(),
                        lng: service.geometry.location.lng(),
                      })
                    }}
                    className={`block w-full text-left p-2 rounded-md border ${
                      selectedService && selectedService.place_id === service.place_id
                        ? "border-teal-600 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">{getCategoryIcon(service.category)}</div>
                      <div className="ml-2">
                        <div className="font-medium text-sm">{service.name}</div>
                        <div className="text-xs text-gray-500 truncate">{service.vicinity}</div>
                        <div className="text-xs text-teal-600 mt-1">{service.distance.toFixed(2)} km away</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-medium">{selectedService.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{selectedService.vicinity}</p>

          <div className="flex items-center mt-2 text-sm">
            <div className="flex items-center mr-4">
              {getCategoryIcon(selectedService.category)}
              <span className="ml-1 capitalize">{selectedService.category}</span>
            </div>
            <div className="text-teal-600">{selectedService.distance.toFixed(2)} km away</div>
          </div>

          {selectedService.opening_hours && (
            <div className="mt-2 text-sm">
              <span
                className={`font-medium ${selectedService.opening_hours.open_now ? "text-green-600" : "text-red-600"}`}
              >
                {selectedService.opening_hours.open_now ? "Open Now" : "Closed"}
              </span>
            </div>
          )}

          {selectedService.rating && (
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(selectedService.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                {selectedService.rating} ({selectedService.user_ratings_total} reviews)
              </span>
            </div>
          )}

          <div className="mt-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedService.geometry.location.lat()},${selectedService.geometry.location.lng()}&origin=${hostelLocation.latitude},${hostelLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocalServicesMap
