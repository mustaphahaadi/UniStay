"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { Building, Calendar, Clock, MapPin, School, Star, Bell, MessageSquare, Users, TrendingUp, DollarSign } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"
import Rating from "../components/Rating"

const ManagerDashboard = () => {
  const { user } = useAuth()
  const [hostels, setHostels] = useState([])
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({
    total_hostels: 0,
    total_rooms: 0,
    total_bookings: 0,
    occupancy_rate: 0,
    revenue: 0,
    average_rating: 0,
  })
  const [notifications, setNotifications] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostelsResponse, bookingsResponse, statsResponse, notificationsResponse, messagesResponse] = await Promise.all([
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
          fetch(`${API_URL}/stats/manager/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/notifications/manager/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/messages/manager/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ])

        const hostelsData = await hostelsResponse.json()
        const bookingsData = await bookingsResponse.json()
        const statsData = await statsResponse.json()
        const notificationsData = await notificationsResponse.json()
        const messagesData = await messagesResponse.json()

        setHostels(hostelsData)
        setBookings(bookingsData)
        setStats(statsData)
        setNotifications(notificationsData)
        setMessages(messagesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-teal-100">Here's your hostel management overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Hostels</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total_hostels}</p>
          <p className="text-sm text-gray-500 mt-1">Active properties</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Rooms</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.total_rooms}</p>
          <p className="text-sm text-gray-500 mt-1">Available rooms</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Occupancy Rate</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.occupancy_rate}%</p>
          <p className="text-sm text-gray-500 mt-1">Current occupancy</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Revenue</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">₵{stats.revenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <Link to="/bookings" className="text-sm text-teal-600 hover:text-teal-700">
              View all
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No recent bookings</p>
              <Link
                to="/hostels/new"
                className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Add a Hostel
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hostel
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
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                            {booking.guest_avatar ? (
                              <img
                                src={booking.guest_avatar}
                                alt={booking.guest_name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Users className="h-full w-full p-2 text-gray-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.guest_name}</div>
                            <div className="text-sm text-gray-500">{booking.guest_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.hostel_name}</div>
                        <div className="text-sm text-gray-500">Room {booking.room_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
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

        {/* Notifications and Messages */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Link to="/notifications" className="text-sm text-teal-600 hover:text-teal-700">
                View all
              </Link>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : notifications.length === 0 ? (
              <p className="text-gray-500 text-center">No new notifications</p>
            ) : (
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Bell className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Messages</h2>
              <Link to="/messages" className="text-sm text-teal-600 hover:text-teal-700">
                View all
              </Link>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages</p>
            ) : (
              <div className="space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <MessageSquare className={`h-5 w-5 ${message.read ? 'text-gray-400' : 'text-teal-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                      <p className="text-sm text-gray-500">{message.preview}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hostel Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Hostels</h2>
          <Link to="/hostels/new" className="text-sm text-teal-600 hover:text-teal-700">
            Add New Hostel
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : hostels.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't added any hostels yet</p>
            <Link
              to="/hostels/new"
              className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Add Your First Hostel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostels.map((hostel) => (
              <div key={hostel.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200">
                  {hostel.images && hostel.images[0] ? (
                    <img
                      src={hostel.images[0]}
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{hostel.name}</h3>
                    <Rating value={hostel.rating || 0} size="sm" readOnly />
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hostel.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <School className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hostel.nearest_university} ({hostel.distance_to_university} km)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{hostel.total_rooms}</span> rooms
                    </div>
                    <Link to={`/hostels/${hostel.id}`} className="text-sm text-teal-600 hover:text-teal-700">
                      Manage
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

export default ManagerDashboard
