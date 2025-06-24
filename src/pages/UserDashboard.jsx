"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { Building, Calendar, Clock, MapPin, School, Star, Bell, MessageSquare, CreditCard } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"
import Rating from "../components/Rating"

const UserDashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [notifications, setNotifications] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, notificationsResponse, messagesResponse] = await Promise.all([
          fetch(`${API_URL}/bookings/user/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/notifications/user/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/messages/user/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ])

        let bookingsData = [];
        let notificationsData = [];
        let messagesData = [];

        if (bookingsResponse.ok) {
          bookingsData = await bookingsResponse.json();
        }
        if (notificationsResponse.ok) {
          notificationsData = await notificationsResponse.json();
        }
        if (messagesResponse.ok) {
          messagesData = await messagesResponse.json();
        }

        setBookings(bookingsData)
        setNotifications(notificationsData)
        setMessages(messagesData)

        // Filter recent bookings (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const recent = bookingsData.filter((booking) => {
          const bookingDate = new Date(booking.created_at)
          return bookingDate >= thirtyDaysAgo
        })

        setRecentBookings(recent)

        // Filter upcoming bookings (start date in the future)
        const today = new Date()
        const upcoming = bookingsData.filter((booking) => {
          const startDate = new Date(booking.start_date)
          return startDate >= today
        })

        setUpcomingBookings(upcoming)
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
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Welcome back, {user?.name}! 👋</h1>
          <p className="text-white/90 text-lg">Here's your accommodation dashboard overview</p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Bookings</h3>
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600">
              <Building className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{bookings.length}</p>
          <p className="text-sm text-gray-500">All time bookings</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{recentBookings.length}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Stays</h3>
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 text-green-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{upcomingBookings.length}</p>
          <p className="text-sm text-gray-500">Future bookings</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Unread Messages</h3>
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{messages.filter(m => !m.read).length}</p>
          <p className="text-sm text-gray-500">New messages</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
            <Link to="/bookings" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              View all →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
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
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
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
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                            {booking.hostel_image ? (
                              <img
                                src={booking.hostel_image}
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
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <Link to="/notifications" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors">
                View all →
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
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
              <Link to="/messages" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors">
                View all →
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

      {/* Recommended Hostels */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Hostels</h2>
          <Link to="/hostels" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Recommended Hostel {index + 1}</h3>
                    <Rating value={4.5} size="sm" readOnly />
                  </div>
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
      
      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Recent Reviews</h2>
          <Link to="/dashboard/reviews" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            View all →
          </Link>
        </div>
        
        <div className="space-y-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=H${index + 1}`}
                      alt={`Hostel ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Campus Haven Hostel {index + 1}</h3>
                    <p className="text-sm text-gray-500">Reviewed on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <Rating value={4 + index * 0.5} size="sm" readOnly />
              </div>
              <p className="text-gray-700">"Great accommodation with excellent facilities. The staff were very helpful and the location is perfect for university access."</p>
              <div className="mt-3 flex justify-end">
                <button className="text-sm text-blue-600 hover:text-blue-800">Edit Review</button>
              </div>
            </div>
          ))}
          
          {[1, 2].length === 0 && (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">You haven't written any reviews yet</p>
              <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Write Your First Review
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Payments</h2>
          <Link to="/dashboard/payments" className="text-sm text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            View all →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TXN-{Math.floor(Math.random() * 10000)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campus Haven {index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₵{(1200 + index * 300).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      index === 0 ? 'bg-green-100 text-green-800' : 
                      index === 1 ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {index === 0 ? 'Completed' : index === 1 ? 'Processing' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
