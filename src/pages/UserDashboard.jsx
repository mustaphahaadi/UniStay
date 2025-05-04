"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { Building, Calendar, Clock, MapPin, School } from "lucide-react"

const UserDashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [loading, setLoading] = useState(true)

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

        // Filter recent bookings (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const recent = data.filter((booking) => {
          const bookingDate = new Date(booking.created_at)
          return bookingDate >= thirtyDaysAgo
        })

        setRecentBookings(recent)

        // Filter upcoming bookings (start date in the future)
        const today = new Date()
        const upcoming = data.filter((booking) => {
          const startDate = new Date(booking.start_date)
          return startDate >= today
        })

        setUpcomingBookings(upcoming)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{bookings.length}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{recentBookings.length}</p>
          <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming Stays</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{upcomingBookings.length}</p>
          <p className="text-sm text-gray-500 mt-1">Future bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <Link to="/dashboard/bookings" className="text-sm text-teal-600 hover:text-teal-700">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : upcomingBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any upcoming bookings</p>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingBookings.slice(0, 5).map((booking) => (
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
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Recommended Hostels</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200">
                  <img
                    src={`/placeholder.svg?height=160&width=320&text=Hostel+${index + 1}`}
                    alt={`Recommended Hostel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Recommended Hostel {index + 1}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Accra, Ghana</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <School className="h-4 w-4 mr-1" />
                    <span className="text-sm">University of Ghana (0.5 km)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-teal-600">₵1,200</span>
                    <Link to={`/hostels/${index + 1}`} className="text-sm text-teal-600 hover:text-teal-700">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
