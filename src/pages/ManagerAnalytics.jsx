"use client"

import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Calendar, DollarSign, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react"

const ManagerAnalytics = () => {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState("month") // month, quarter, year

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/manager/analytics?timeRange=${timeRange}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data")
        }

        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        console.error("Error fetching analytics:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Error: {error}</p>
        <button className="mt-2 text-teal-600 hover:text-teal-700" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">₵{analytics.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            {analytics.revenueChange >= 0 ? (
              <>
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{analytics.revenueChange}% from previous period</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-500">{Math.abs(analytics.revenueChange)}% from previous period</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Occupancy Rate</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
              <Percent className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{analytics.occupancyRate}%</p>
          <div className="flex items-center mt-2">
            {analytics.occupancyChange >= 0 ? (
              <>
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{analytics.occupancyChange}% from previous period</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-500">
                  {Math.abs(analytics.occupancyChange)}% from previous period
                </span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">New Bookings</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{analytics.newBookings}</p>
          <div className="flex items-center mt-2">
            {analytics.bookingsChange >= 0 ? (
              <>
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{analytics.bookingsChange}% from previous period</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-500">{Math.abs(analytics.bookingsChange)}% from previous period</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Rating</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{analytics.averageRating.toFixed(1)}</p>
          <div className="flex items-center mt-2">
            {analytics.ratingChange >= 0 ? (
              <>
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">{analytics.ratingChange.toFixed(1)} from previous period</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-500">
                  {Math.abs(analytics.ratingChange).toFixed(1)} from previous period
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Revenue Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₵${value}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0C9488" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupancy and Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Occupancy by Hostel</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.occupancyByHostel} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="occupancy" fill="#0C9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Booking Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.bookingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {analytics.bookingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Maintenance Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hostel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.maintenanceRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.hostel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.room}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{request.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status === "completed"
                        ? "Completed"
                        : request.status === "in_progress"
                          ? "In Progress"
                          : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.reported_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerAnalytics
