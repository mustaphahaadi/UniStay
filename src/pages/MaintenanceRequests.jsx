"use client"

import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { PenToolIcon as Tool, CheckCircle, Clock, AlertCircle, Plus, Search, Filter } from "lucide-react"

const MaintenanceRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    hostel_id: "",
    room_id: "",
    issue_type: "",
    description: "",
    priority: "medium",
  })
  const [hostels, setHostels] = useState([])
  const [rooms, setRooms] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter, setFilter] = useState("all") // all, pending, in_progress, completed
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRequests()
    if (user && user.role === "manager") {
      fetchHostels()
    }
  }, [user])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const url = user.role === "manager" ? `${API_URL}/maintenance/manager/` : `${API_URL}/maintenance/user/`

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch maintenance requests")
      }

      const data = await response.json()
      setRequests(data)
    } catch (err) {
      console.error("Error fetching maintenance requests:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchHostels = async () => {
    try {
      const response = await fetch(`${API_URL}/hostels/manager/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch hostels")
      }

      const data = await response.json()
      setHostels(data)
    } catch (err) {
      console.error("Error fetching hostels:", err)
    }
  }

  const fetchRooms = async (hostelId) => {
    try {
      const response = await fetch(`${API_URL}/hostels/${hostelId}/rooms/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch rooms")
      }

      const data = await response.json()
      setRooms(data)
    } catch (err) {
      console.error("Error fetching rooms:", err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "hostel_id" && value) {
      fetchRooms(value)
      setFormData((prev) => ({ ...prev, room_id: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.hostel_id || !formData.room_id || !formData.issue_type || !formData.description) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`${API_URL}/maintenance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit maintenance request")
      }

      const newRequest = await response.json()
      setRequests((prev) => [newRequest, ...prev])
      setShowForm(false)
      setFormData({
        hostel_id: "",
        room_id: "",
        issue_type: "",
        description: "",
        priority: "medium",
      })
      toast.success("Maintenance request submitted successfully")
    } catch (err) {
      console.error("Error submitting maintenance request:", err)
      toast.error(err.message || "Failed to submit request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/maintenance/${requestId}/status/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update request status")
      }

      const updatedRequest = await response.json()
      setRequests((prev) => prev.map((req) => (req.id === requestId ? updatedRequest : req)))
      toast.success(
        `Request status updated to ${newStatus === "completed" ? "completed" : newStatus === "in_progress" ? "in progress" : "pending"}`,
      )
    } catch (err) {
      console.error("Error updating request status:", err)
      toast.error(err.message || "Failed to update status")
    }
  }

  const filteredRequests = requests.filter((request) => {
    // Apply status filter
    if (filter !== "all" && request.status !== filter) {
      return false
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        request.hostel_name.toLowerCase().includes(searchLower) ||
        request.room_number.toString().includes(searchLower) ||
        request.issue_type.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Maintenance Requests</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 md:mt-0 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Submit Maintenance Request</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
                <select
                  name="hostel_id"
                  value={formData.hostel_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Hostel</option>
                  {hostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.id}>
                      {hostel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <select
                  name="room_id"
                  value={formData.room_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                  disabled={!formData.hostel_id}
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.number}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                <select
                  name="issue_type"
                  value={formData.issue_type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Issue Type</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliance">Appliance</option>
                  <option value="structural">Structural</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Please describe the issue in detail..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md font-medium ${
                  isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"
                } transition-colors`}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span className="mr-2 text-sm text-gray-500">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 m-6 rounded-md">
            <p className="text-red-700">Error: {error}</p>
            <button className="mt-2 text-teal-600 hover:text-teal-700" onClick={() => fetchRequests()}>
              Try again
            </button>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Tool className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No maintenance requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search or filter" : "Create a new request to get started"}
            </p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hostel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported
                  </th>
                  {user.role === "manager" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.hostel_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Room {request.room_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="font-medium">{request.issue_type}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{request.description}</div>
                    </td>
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
                        {request.status === "completed" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Completed
                          </>
                        ) : request.status === "in_progress" ? (
                          <>
                            <Clock className="h-3 w-3 mr-1" /> In Progress
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.created_at}</td>
                    {user.role === "manager" && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {request.status !== "in_progress" && request.status !== "completed" && (
                            <button
                              onClick={() => updateRequestStatus(request.id, "in_progress")}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              Mark In Progress
                            </button>
                          )}
                          {request.status !== "completed" && (
                            <button
                              onClick={() => updateRequestStatus(request.id, "completed")}
                              className="text-green-600 hover:text-green-800"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MaintenanceRequests
