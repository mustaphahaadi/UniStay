"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { Building, MapPin, X, AlertTriangle } from "lucide-react"

const Bookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [cancelBookingId, setCancelBookingId] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/bookings/user/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        toast.error("Failed to load bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = async () => {
    if (!cancelBookingId) return

    setIsCancelling(true)
    try {
      const response = await fetch(`${API_URL}/bookings/${cancelBookingId}/cancel/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to cancel booking")
      }

      // Update booking status in the state
      setBookings((prev) =>
        prev.map((booking) => (booking.id === cancelBookingId ? { ...booking, status: "cancelled" } : booking)),
      )

      toast.success("Booking cancelled successfully")
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error(error.message || "Failed to cancel booking")
    } finally {
      setIsCancelling(false)
      setShowCancelModal(false)
      setCancelBookingId(null)
    }
  }

  const openCancelModal = (bookingId) => {
    setCancelBookingId(bookingId)
    setShowCancelModal(true)
  }

  const closeCancelModal = () => {
    setShowCancelModal(false)
    setCancelBookingId(null)
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    if (activeTab === "upcoming") {
      const startDate = new Date(booking.start_date)
      return startDate > new Date() && booking.status !== "cancelled"
    }
    if (activeTab === "past") {
      const endDate = new Date(booking.end_date)
      return endDate < new Date() && booking.status !== "cancelled"
    }
    if (activeTab === "cancelled") {
      return booking.status === "cancelled"
    }
    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Link to="/search" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
          Find New Hostel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "all" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "upcoming"
                  ? "border-b-2 border-teal-600 text-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "past" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "cancelled"
                  ? "border-b-2 border-teal-600 text-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No bookings found</p>
            <Link
              to="/hostels"
              className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Find a Hostel
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hostel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                          {booking.hostel_image ? (
                            <img
                              src={booking.hostel_image || "/placeholder.svg"}
                              alt={booking.hostel_name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Building className="h-full w-full p-2 text-gray-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.hostel_name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.hostel_location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Room {booking.room_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link to={`/hostels/${booking.hostel_id}`} className="text-teal-600 hover:text-teal-700">
                          View
                        </Link>
                        {booking.status !== "cancelled" && new Date(booking.start_date) > new Date() && (
                          <button
                            onClick={() => openCancelModal(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Cancel Booking</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isCancelling}
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Cancelling...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    Yes, Cancel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings
