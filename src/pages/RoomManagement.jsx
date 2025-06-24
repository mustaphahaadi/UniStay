import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { 
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Filter, 
  Search,
  Calendar,
  Users,
  Wifi,
  Tv,
  Coffee,
  Wind
} from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"

const RoomManagement = () => {
  const { user } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHostel, setSelectedHostel] = useState("all")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hostels, setHostels] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hostels
        const hostelsResponse = await fetch(`${API_URL}/hostels/manager/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        let hostelsData = []
        if (hostelsResponse.ok) {
          hostelsData = await hostelsResponse.json()
          setHostels(hostelsData)
        } else {
          // Demo data if API fails
          hostelsData = [
            { id: 1, name: "Campus Haven 1" },
            { id: 2, name: "Campus Haven 2" },
            { id: 3, name: "Campus Haven 3" }
          ]
          setHostels(hostelsData)
        }

        // Fetch rooms
        const roomsResponse = await fetch(`${API_URL}/rooms/manager/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (roomsResponse.ok) {
          const roomsData = await roomsResponse.json()
          setRooms(roomsData)
        } else {
          // Demo data if API fails
          const demoRooms = []
          
          hostelsData.forEach(hostel => {
            for (let i = 1; i <= 5; i++) {
              demoRooms.push({
                id: (hostel.id * 100) + i,
                room_number: `${100 + i}`,
                hostel_id: hostel.id,
                hostel_name: hostel.name,
                type: i % 3 === 0 ? "Deluxe" : i % 2 === 0 ? "Standard" : "Basic",
                capacity: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : 4,
                price: i % 3 === 0 ? 1800 : i % 2 === 0 ? 1500 : 1200,
                status: i % 4 === 0 ? "maintenance" : i % 5 === 0 ? "booked" : "available",
                amenities: [
                  "Wi-Fi",
                  i % 2 === 0 ? "TV" : null,
                  i % 3 === 0 ? "Private Bathroom" : null,
                  i % 2 === 0 ? "Air Conditioning" : null,
                  "Study Desk"
                ].filter(Boolean)
              })
            }
          })
          
          setRooms(demoRooms)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Demo data on error
        const demoHostels = [
          { id: 1, name: "Campus Haven 1" },
          { id: 2, name: "Campus Haven 2" },
          { id: 3, name: "Campus Haven 3" }
        ]
        setHostels(demoHostels)
        
        const demoRooms = []
        demoHostels.forEach(hostel => {
          for (let i = 1; i <= 5; i++) {
            demoRooms.push({
              id: (hostel.id * 100) + i,
              room_number: `${100 + i}`,
              hostel_id: hostel.id,
              hostel_name: hostel.name,
              type: i % 3 === 0 ? "Deluxe" : i % 2 === 0 ? "Standard" : "Basic",
              capacity: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : 4,
              price: i % 3 === 0 ? 1800 : i % 2 === 0 ? 1500 : 1200,
              status: i % 4 === 0 ? "maintenance" : i % 5 === 0 ? "booked" : "available",
              amenities: [
                "Wi-Fi",
                i % 2 === 0 ? "TV" : null,
                i % 3 === 0 ? "Private Bathroom" : null,
                i % 2 === 0 ? "Air Conditioning" : null,
                "Study Desk"
              ].filter(Boolean)
            })
          }
        })
        
        setRooms(demoRooms)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getFilteredRooms = () => {
    let filtered = [...rooms]
    
    // Filter by hostel
    if (selectedHostel !== "all") {
      filtered = filtered.filter(room => room.hostel_id === parseInt(selectedHostel))
    }
    
    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter(room => room.status === filter)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(room => 
        room.room_number.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.hostel_name.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }

  const filteredRooms = getFilteredRooms()
  
  const handleAddRoom = () => {
    setShowAddModal(true)
  }
  
  const handleEditRoom = (room) => {
    setCurrentRoom(room)
    setShowEditModal(true)
  }
  
  const handleDeleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter(room => room.id !== id))
    }
  }
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "booked":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "booked":
        return <Calendar className="h-4 w-4 mr-1" />
      case "maintenance":
        return <XCircle className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }
  
  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "air conditioning":
        return <Wind className="h-4 w-4" />
      case "private bathroom":
        return <Home className="h-4 w-4" />
      case "study desk":
        return <Coffee className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-500 mt-1">Manage your hostel rooms and availability</p>
          </div>
          <button 
            onClick={handleAddRoom}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Room</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700 font-medium">Filters:</span>
            </div>
            
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
            >
              <option value="all">All Hostels</option>
              {hostels.map(hostel => (
                <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
              ))}
            </select>
            
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search rooms..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {loading ? (
          <LoadingSpinner />
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No rooms found</p>
            <p className="text-gray-400 mb-6">No rooms match your current filters</p>
            <button 
              onClick={handleAddRoom}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Add Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">Room {room.room_number}</h3>
                    <p className="text-sm text-gray-500">{room.hostel_name}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center ${getStatusBadgeClass(room.status)}`}>
                    {getStatusIcon(room.status)}
                    <span className="text-xs font-semibold">
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-medium text-gray-900">{room.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="font-medium text-gray-900">{room.capacity} {room.capacity === 1 ? 'Person' : 'People'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-gray-900">GH₵{room.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Amenities</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <div key={index} className="p-1 bg-gray-100 rounded-md" title={amenity}>
                            {getAmenityIcon(amenity)}
                          </div>
                        ))}
                        {room.amenities.length > 3 && (
                          <div className="p-1 bg-gray-100 rounded-md">
                            <span className="text-xs text-gray-500">+{room.amenities.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleEditRoom(room)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteRoom(room.id)}
                      className="flex items-center text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Status Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Available</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.status === "available").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.status === "available").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Booked</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.status === "booked").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.status === "booked").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Maintenance</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.status === "maintenance").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.status === "maintenance").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Types</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Basic</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.type === "Basic").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.type === "Basic").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Standard</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.type === "Standard").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.type === "Standard").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Deluxe</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.type === "Deluxe").length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.type === "Deluxe").length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Capacity Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Single (1 person)</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.capacity === 1).length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.capacity === 1).length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Double (2 people)</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.capacity === 2).length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.capacity === 2).length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Shared (4 people)</span>
                <span className="text-sm font-medium text-gray-900">
                  {rooms.filter(r => r.capacity === 4).length} rooms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(rooms.filter(r => r.capacity === 4).length / rooms.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Room Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Room</h2>
            <p className="text-gray-500 mb-6">Room creation functionality will be implemented soon.</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Room Modal (simplified) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Room {currentRoom?.room_number}</h2>
            <p className="text-gray-500 mb-6">Room editing functionality will be implemented soon.</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomManagement