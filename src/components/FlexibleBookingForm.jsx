"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { API_URL } from "../config"
import { toast } from "react-toastify"
import BookingCalendar from "./BookingCalendar"
import { differenceInDays, format } from "date-fns"

const FlexibleBookingForm = ({ hostel, onBookingComplete }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookingType, setBookingType] = useState("semester") // semester, monthly, short-term
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guestCount, setGuestCount] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [price, setPrice] = useState(hostel?.price || 0)
  const [bookedDates, setBookedDates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hostel?.rooms && hostel.rooms.length > 0) {
      setSelectedRoom(hostel.rooms[0])
    }
  }, [hostel])

  useEffect(() => {
    if (selectedRoom) {
      fetchBookedDates()
    }
  }, [selectedRoom])

  useEffect(() => {
    calculatePrice()
  }, [bookingType, startDate, endDate, selectedRoom])

  const fetchBookedDates = async () => {
    if (!selectedRoom) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/hostels/${hostel.id}/rooms/${selectedRoom.id}/booked-dates/`)
      if (!response.ok) throw new Error("Failed to fetch booked dates")

      const data = await response.json()
      setBookedDates(data.booked_dates)
    } catch (error) {
      console.error("Error fetching booked dates:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = () => {
    if (!startDate || !endDate || !selectedRoom) {
      setPrice(hostel.price)
      return
    }

    const days = differenceInDays(endDate, startDate) + 1
    let calculatedPrice = hostel.price

    if (bookingType === "semester") {
      // Semester price is already set
      calculatedPrice = hostel.price
    } else if (bookingType === "monthly") {
      // Calculate monthly price (assuming hostel.price is per semester and a semester is 4 months)
      const monthlyRate = hostel.price / 4
      const months = Math.ceil(days / 30)
      calculatedPrice = monthlyRate * months
    } else if (bookingType === "short-term") {
      // Calculate daily price (assuming hostel.price is per semester and a semester is 120 days)
      const dailyRate = hostel.price / 120
      calculatedPrice = dailyRate * days
    }

    setPrice(Math.round(calculatedPrice))
  }

  const handleDateSelect = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleBookingTypeChange = (e) => {
    setBookingType(e.target.value)
    setStartDate(null)
    setEndDate(null)
  }

  const handleRoomChange = (e) => {
    const roomId = e.target.value
    const room = hostel.rooms.find((r) => r.id.toString() === roomId)
    setSelectedRoom(room)
    setStartDate(null)
    setEndDate(null)
  }

  const validateBooking = () => {
    if (!selectedRoom) {
      toast.error("Please select a room")
      return false
    }

    if (!startDate || !endDate) {
      toast.error("Please select booking dates")
      return false
    }

    const days = differenceInDays(endDate, startDate) + 1

    if (bookingType === "monthly" && days < 30) {
      toast.error("Monthly bookings require at least 30 days")
      return false
    }

    if (bookingType === "short-term" && days < 3) {
      toast.error("Short-term bookings require at least 3 days")
      return false
    }

    if (selectedRoom.capacity < guestCount) {
      toast.error(`This room can only accommodate ${selectedRoom.capacity} guests`)
      return false
    }

    return true
  }

  const handleBookNow = async () => {
    if (!user) {
      toast.info("Please login to book a hostel")
      navigate("/login", { state: { from: `/hostels/${hostel.id}` } })
      return
    }

    if (!validateBooking()) return

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
          start_date: format(startDate, "yyyy-MM-dd"),
          end_date: format(endDate, "yyyy-MM-dd"),
          booking_type: bookingType,
          guest_count: guestCount,
          total_price: price,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed")
      }

      toast.success("Booking successful!")
      if (onBookingComplete) {
        onBookingComplete(data)
      } else {
        navigate("/dashboard/bookings")
      }
    } catch (error) {
      console.error("Booking error:", error)
      toast.error(error.message || "Failed to book hostel")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMinBookingDays = () => {
    switch (bookingType) {
      case "semester":
        return 60
      case "monthly":
        return 30
      case "short-term":
        return 3
      default:
        return 1
    }
  }

  if (!hostel || !selectedRoom) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-500">Loading booking options...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Book Your Stay</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label
            className={`
            flex items-center justify-center p-3 border rounded-md cursor-pointer
            ${bookingType === "semester" ? "border-teal-600 bg-teal-50" : "border-gray-300 hover:bg-gray-50"}
          `}
          >
            <input
              type="radio"
              name="bookingType"
              value="semester"
              checked={bookingType === "semester"}
              onChange={handleBookingTypeChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-medium">Semester</div>
              <div className="text-sm text-gray-500">Full semester stay</div>
            </div>
          </label>

          <label
            className={`
            flex items-center justify-center p-3 border rounded-md cursor-pointer
            ${bookingType === "monthly" ? "border-teal-600 bg-teal-50" : "border-gray-300 hover:bg-gray-50"}
          `}
          >
            <input
              type="radio"
              name="bookingType"
              value="monthly"
              checked={bookingType === "monthly"}
              onChange={handleBookingTypeChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-medium">Monthly</div>
              <div className="text-sm text-gray-500">30+ days</div>
            </div>
          </label>

          <label
            className={`
            flex items-center justify-center p-3 border rounded-md cursor-pointer
            ${bookingType === "short-term" ? "border-teal-600 bg-teal-50" : "border-gray-300 hover:bg-gray-50"}
          `}
          >
            <input
              type="radio"
              name="bookingType"
              value="short-term"
              checked={bookingType === "short-term"}
              onChange={handleBookingTypeChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-medium">Short-term</div>
              <div className="text-sm text-gray-500">3+ days</div>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
          <select
            value={selectedRoom ? selectedRoom.id : ""}
            onChange={handleRoomChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {hostel.rooms.map((room) => (
              <option key={room.id} value={room.id} disabled={room.available_beds === 0}>
                Room {room.number} - {room.room_type} - {room.available_beds} beds available
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(Number.parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {[...Array(selectedRoom.capacity)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i === 0 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Dates</label>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <BookingCalendar
            bookedDates={bookedDates}
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            onDateSelect={handleDateSelect}
            minBookingDays={getMinBookingDays()}
            bookingType={bookingType}
          />
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg font-semibold">Total: ₵{price}</p>
            <p className="text-sm text-gray-500">
              {bookingType === "semester" && "per semester"}
              {bookingType === "monthly" && "for selected period"}
              {bookingType === "short-term" && "for selected dates"}
            </p>
          </div>

          <button
            onClick={handleBookNow}
            disabled={isSubmitting || !selectedRoom || !startDate || !endDate || selectedRoom.available_beds === 0}
            className={`px-6 py-2 rounded-md font-medium ${
              isSubmitting ||
              !selectedRoom ||
              !startDate ||
              !endDate ||
              (selectedRoom && selectedRoom.available_beds === 0)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700"
            } transition-colors`}
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <p>Cancellation policy: Free cancellation up to 7 days before check-in.</p>
        </div>
      </div>
    </div>
  )
}

export default FlexibleBookingForm
