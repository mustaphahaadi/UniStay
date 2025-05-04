"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { Building, Users, CreditCard, TrendingUp, Plus } from "lucide-react"

const ManagerDashboard = () => {
  const { user } = useAuth()
  const [hostels, setHostels] = useState([])
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostelsResponse, bookingsResponse, statsResponse] = await Promise.all([
          fetch(`${API_URL}/hostels/manager/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/bookings/manager/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/hostels/manager/stats/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ])

        const hostelsData = await hostelsResponse.json()
        const bookingsData = await bookingsResponse.json()
        const statsData = await statsResponse.json()

        setHostels(hostelsData)
        setBookings(bookingsData)
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching manager data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <Link
          to="/manager/add-hostel"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add New Hostel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Hostels</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalHostels}</p>
          <p className="text-sm text-gray-500 mt-1">Properties listed</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Rooms</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalRooms}</p>
          <p className="text-sm text-gray-500 mt-1">Across all hostels</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Occupancy Rate</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.occupancyRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Current occupancy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Hostels</h2>
            <Link to="/hostels" className="text-sm text-teal-600 hover:text-teal-700">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't listed any hostels yet</p>
              <Link
                to="/manager/add-hostel"
                className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Add Your First Hostel
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {hostels.slice(0, 5).map((hostel) => (
                <div key={hostel.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                      {hostel.image_url ? (
                        <img
                          src={hostel.image_url || "/placeholder.svg"}
                          alt={hostel.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building className="h-full w-full p-2 text-gray-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium">{hostel.name}</h3>
                      <p className="text-xs text-gray-500">{hostel.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">₵{hostel.price}</p>
                      <p className="text-xs text-gray-500">{hostel.occupancy_rate}% occupied</p>
                    </div>
                    <Link
                      to={`/manager/edit-hostel/${hostel.id}`}
                      className="text-sm text-teal-600 hover:text-teal-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}

              {hostels.length > 5 && (
                <div className="text-center pt-2">
                  <Link to="/hostels" className="text-sm text-teal-600 hover:text-teal-700">
                    View all {hostels.length} hostels
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <Link to="/manager/bookings" className="text-sm text-teal-600 hover:text-teal-700">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                      <Users className="h-full w-full p-2 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium">{booking.user_name}</h3>
                      <p className="text-xs text-gray-500">
                        {booking.hostel_name} - Room {booking.room_number}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">₵{booking.amount}</p>
                      <p className="text-xs text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}

              {bookings.length > 5 && (
                <div className="text-center pt-2">
                  <Link to="/manager/bookings" className="text-sm text-teal-600 hover:text-teal-700">
                    View all {bookings.length} bookings
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Revenue Overview</h2>

        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Revenue chart will be displayed here</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold">₵{stats.totalRevenue}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">This Month</h3>
            <p className="text-2xl font-bold">₵{stats.monthlyRevenue || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Per Booking</h3>
            <p className="text-2xl font-bold">
              ₵{stats.totalBookings ? Math.round(stats.totalRevenue / stats.totalBookings) : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard
