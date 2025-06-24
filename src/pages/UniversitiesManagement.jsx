import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { 
  GraduationCap, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Search,
  Globe,
  Building,
  Users,
  Link
} from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"

const UniversitiesManagement = () => {
  const { user } = useAuth()
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentUniversity, setCurrentUniversity] = useState(null)

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${API_URL}/universities/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUniversities(data)
        } else {
          // Demo data if API fails
          setUniversities([
            {
              id: 1,
              name: "University of Ghana",
              location: "Legon, Accra",
              website: "https://www.ug.edu.gh",
              student_count: 38000,
              description: "The University of Ghana is the oldest and largest of the thirteen Ghanaian national public universities.",
              image: "/placeholder.svg?height=100&width=100&text=UG",
              hostels_count: 12,
              established: 1948
            },
            {
              id: 2,
              name: "Kwame Nkrumah University of Science and Technology",
              location: "Kumasi, Ashanti Region",
              website: "https://www.knust.edu.gh",
              student_count: 42000,
              description: "KNUST is a public university focused on science and technology education in Ghana.",
              image: "/placeholder.svg?height=100&width=100&text=KNUST",
              hostels_count: 15,
              established: 1952
            },
            {
              id: 3,
              name: "University of Cape Coast",
              location: "Cape Coast, Central Region",
              website: "https://www.ucc.edu.gh",
              student_count: 35000,
              description: "UCC was established to train highly qualified and skilled teachers for the education system.",
              image: "/placeholder.svg?height=100&width=100&text=UCC",
              hostels_count: 10,
              established: 1962
            },
            {
              id: 4,
              name: "University of Professional Studies",
              location: "Accra, Greater Accra Region",
              website: "https://www.upsa.edu.gh",
              student_count: 18000,
              description: "UPSA is a public university that provides tertiary education in business and professional studies.",
              image: "/placeholder.svg?height=100&width=100&text=UPSA",
              hostels_count: 8,
              established: 1965
            },
            {
              id: 5,
              name: "Ghana Institute of Management and Public Administration",
              location: "Achimota, Accra",
              website: "https://www.gimpa.edu.gh",
              student_count: 12000,
              description: "GIMPA is a public university focused on management, business, and public administration.",
              image: "/placeholder.svg?height=100&width=100&text=GIMPA",
              hostels_count: 6,
              established: 1961
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching universities:", error)
        // Demo data on error
        setUniversities([
          {
            id: 1,
            name: "University of Ghana",
            location: "Legon, Accra",
            website: "https://www.ug.edu.gh",
            student_count: 38000,
            description: "The University of Ghana is the oldest and largest of the thirteen Ghanaian national public universities.",
            image: "/placeholder.svg?height=100&width=100&text=UG",
            hostels_count: 12,
            established: 1948
          },
          {
            id: 2,
            name: "Kwame Nkrumah University of Science and Technology",
            location: "Kumasi, Ashanti Region",
            website: "https://www.knust.edu.gh",
            student_count: 42000,
            description: "KNUST is a public university focused on science and technology education in Ghana.",
            image: "/placeholder.svg?height=100&width=100&text=KNUST",
            hostels_count: 15,
            established: 1952
          },
          {
            id: 3,
            name: "University of Cape Coast",
            location: "Cape Coast, Central Region",
            website: "https://www.ucc.edu.gh",
            student_count: 35000,
            description: "UCC was established to train highly qualified and skilled teachers for the education system.",
            image: "/placeholder.svg?height=100&width=100&text=UCC",
            hostels_count: 10,
            established: 1962
          },
          {
            id: 4,
            name: "University of Professional Studies",
            location: "Accra, Greater Accra Region",
            website: "https://www.upsa.edu.gh",
            student_count: 18000,
            description: "UPSA is a public university that provides tertiary education in business and professional studies.",
            image: "/placeholder.svg?height=100&width=100&text=UPSA",
            hostels_count: 8,
            established: 1965
          },
          {
            id: 5,
            name: "Ghana Institute of Management and Public Administration",
            location: "Achimota, Accra",
            website: "https://www.gimpa.edu.gh",
            student_count: 12000,
            description: "GIMPA is a public university focused on management, business, and public administration.",
            image: "/placeholder.svg?height=100&width=100&text=GIMPA",
            hostels_count: 6,
            established: 1961
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchUniversities()
  }, [])

  const filteredUniversities = searchQuery
    ? universities.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : universities

  const handleAddUniversity = () => {
    setShowAddModal(true)
  }
  
  const handleEditUniversity = (university) => {
    setCurrentUniversity(university)
    setShowEditModal(true)
  }
  
  const handleDeleteUniversity = (id) => {
    if (window.confirm("Are you sure you want to delete this university? This will affect all associated hostels and data.")) {
      setUniversities(universities.filter(uni => uni.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Universities Management</h1>
            <p className="text-gray-500 mt-1">Manage universities and their associated hostels</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search universities..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddUniversity}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add University</span>
            </button>
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {loading ? (
          <LoadingSpinner />
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No universities found</p>
            <p className="text-gray-400 mb-6">Try adjusting your search or add a new university</p>
            <button 
              onClick={handleAddUniversity}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Add University
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUniversities.map((university) => (
              <div key={university.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 bg-gray-100 p-6 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-white border border-gray-200">
                      {university.image ? (
                        <img
                          src={university.image}
                          alt={university.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="w-full h-full p-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{university.name}</h2>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{university.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditUniversity(university)}
                          className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-md hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUniversity(university.id)}
                          className="flex items-center text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{university.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Students</p>
                          <p className="font-semibold text-gray-900">{university.student_count.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Building className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Hostels</p>
                          <p className="font-semibold text-gray-900">{university.hostels_count}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Website</p>
                          <a 
                            href={university.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-600 hover:underline flex items-center"
                          >
                            Visit <Link className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Established</p>
                          <p className="font-semibold text-gray-900">{university.established}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* University Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Universities by Student Population</h3>
          <div className="space-y-4">
            {universities
              .sort((a, b) => b.student_count - a.student_count)
              .slice(0, 5)
              .map((uni, index) => (
                <div key={uni.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{uni.name}</span>
                    <span className="text-sm font-medium text-gray-900">{uni.student_count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        index === 2 ? 'bg-purple-500' : 
                        index === 3 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${(uni.student_count / universities[0].student_count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Universities by Hostel Count</h3>
          <div className="space-y-4">
            {universities
              .sort((a, b) => b.hostels_count - a.hostels_count)
              .slice(0, 5)
              .map((uni, index) => (
                <div key={uni.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{uni.name}</span>
                    <span className="text-sm font-medium text-gray-900">{uni.hostels_count} hostels</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-teal-500' : 
                        index === 1 ? 'bg-indigo-500' : 
                        index === 2 ? 'bg-amber-500' : 
                        index === 3 ? 'bg-pink-500' : 
                        'bg-cyan-500'
                      }`} 
                      style={{ width: `${(uni.hostels_count / universities[0].hostels_count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Add University Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New University</h2>
            <p className="text-gray-500 mb-6">University creation functionality will be implemented soon.</p>
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
      
      {/* Edit University Modal (simplified) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit {currentUniversity?.name}</h2>
            <p className="text-gray-500 mb-6">University editing functionality will be implemented soon.</p>
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

export default UniversitiesManagement