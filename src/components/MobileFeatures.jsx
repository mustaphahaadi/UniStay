"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Download, Wifi } from "lucide-react"
import { toast } from "react-toastify"

const MobileFeatures = () => {
  const navigate = useNavigate()
  const [geolocationAvailable, setGeolocationAvailable] = useState(false)
  const [offlineAvailable, setOfflineAvailable] = useState(false)
  const [notificationsAvailable, setNotificationsAvailable] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [nearbyHostels, setNearbyHostels] = useState([])

  useEffect(() => {
    // Check for geolocation support
    if ("geolocation" in navigator) {
      setGeolocationAvailable(true)
    }
    
    // Check for service worker support (offline capabilities)
    if ("serviceWorker" in navigator) {
      setOfflineAvailable(true)
    }
    
    // Check for notification support
    if ("Notification" in window) {
      setNotificationsAvailable(true)
    }
  }, [])

  const handleFindNearbyHostels = () => {
    if (!geolocationAvailable) {
      toast.error("Geolocation is not supported by your browser")
      return
    }
    
    setIsLoading(true)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ latitude, longitude })
        
        try {
          // In a real app, this would be an API call to your backend
          // For demo purposes, we'll simulate a response
          setTimeout(() => {
            const mockNearbyHostels = [
              {
                id: 101,
                name: "University Hostel",
                distance: 0.8,
                price: 1200,
                rating: 4.5,
              },
              {
                id: 102,
                name: "Student Haven",
                distance: 1.2,
                price: 950,
                rating: 4.2,
              },
              {
                id: 103,
                name: "Campus Lodge",
                distance: 1.5,
                price: 1100,
                rating: 4.0,
              },
            ]
            
            setNearbyHostels(mockNearbyHostels)
            setIsLoading(false)
          }, 1500)
        } catch (error) {
          console.error("Error fetching nearby hostels:", error)
          toast.error("Failed to find nearby hostels")
          setIsLoading(false)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        toast.error("Unable to access your location. Please check your permissions.")
        setIsLoading(false)
      }
    )
  }

  const handleEnableNotifications = async () => {
    if (!notificationsAvailable) {
      toast.error("Notifications are not supported by your browser")
      return
    }
    
    try {
      const permission = await Notification.requestPermission()
      
      if (permission === "granted") {
        toast.success("Notifications enabled successfully")
        
        // Send a test notification
        new Notification("UniStay", {
          body: "You will now receive updates about your bookings and messages",
          icon: "/logo.png"
        })
      } else {
        toast.info("Notification permission denied")
      }
    } catch (error) {
      console.error("Notification error:", error)
      toast.error("Failed to enable notifications")
    }
  }

  const handleDownloadOfflineMaps = () => {
    if (!offlineAvailable) {
      toast.error("Offline capabilities are not supported by your browser")
      return
    }
    
    toast.info("Downloading offline maps...", { autoClose: false, toastId: "download-maps" })
    
    // Simulate download process
    setTimeout(() => {
      toast.update("download-maps", {
        render: "Offline maps downloaded successfully!",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000
      })
      
      // In a real app, this would store map data in IndexedDB or similar
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Geolocation Feature */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-teal-600" />
            Find Hostels Nearby
          </h2>
        </div>
        
        <div className="p-4">
          {!geolocationAvailable ? (
            <p className="text-gray-500">Geolocation is not supported by your browser.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Use your current location to find hostels nearby.
              </p>
              
              <button
                onClick={handleFindNearbyHostels}
                disabled={isLoading}
                className={`w-full px-4 py-2 rounded-md font-medium ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                } transition-colors`}
              >
                {isLoading ? "Finding hostels..." : "Find Nearby Hostels"}
              </button>
              
              {nearbyHostels.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h3 className="font-medium">Hostels near you:</h3>
                  
                  {nearbyHostels.map((hostel) => (
                    <div
                      key={hostel.id}
                      className="border border-gray-200 rounded-md p-3 hover:border-teal-300 cursor-pointer"
                      onClick={() => navigate(`/hostels/${hostel.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{hostel.name}</h4>
                          <p className="text-sm text-teal-600">{hostel.distance} km away</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₵{hostel.price}</p>
                          <div className="flex items-center text-sm">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{hostel.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Offline Maps Feature */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Wifi className="h-5 w-5 mr-2 text-teal-600" />
            Offline Access
          </h2>
        </div>
        
        <div className="p-4">
          {!offlineAvailable ? (
            <p className="text-gray-500">Offline capabilities are not supported by your browser.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Download maps and hostel data for offline access when you don't have internet connection.
              </p>
              
              <button
                onClick={handleDownloadOfflineMaps}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Offline Maps
              </button>
            </>
          )}
        </div>
      </div>

      {/* Push Notifications Feature */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h\
