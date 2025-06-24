import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { Star, Edit, Trash2, Plus, Building } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"
import Rating from "../components/Rating"

const UserReviews = () => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/user/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setReviews(data)
        } else {
          // Demo data if API fails
          setReviews([
            {
              id: 1,
              hostel_id: 101,
              hostel_name: "Campus Haven Hostel 1",
              hostel_image: "/placeholder.svg?height=48&width=48&text=H1",
              rating: 4.5,
              comment: "Great accommodation with excellent facilities. The staff were very helpful and the location is perfect for university access.",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: 2,
              hostel_id: 102,
              hostel_name: "Campus Haven Hostel 2",
              hostel_image: "/placeholder.svg?height=48&width=48&text=H2",
              rating: 5,
              comment: "Absolutely loved my stay here! The rooms are spacious and clean, and the common areas are well maintained. The staff is friendly and responsive to any issues.",
              created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 3,
              hostel_id: 103,
              hostel_name: "Campus Haven Hostel 3",
              hostel_image: "/placeholder.svg?height=48&width=48&text=H3",
              rating: 3.5,
              comment: "Decent accommodation but could use some improvements. The WiFi was spotty and the kitchen facilities were limited. However, the location is convenient and the price is reasonable.",
              created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ])
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
        // Demo data on error
        setReviews([
          {
            id: 1,
            hostel_id: 101,
            hostel_name: "Campus Haven Hostel 1",
            hostel_image: "/placeholder.svg?height=48&width=48&text=H1",
            rating: 4.5,
            comment: "Great accommodation with excellent facilities. The staff were very helpful and the location is perfect for university access.",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            hostel_id: 102,
            hostel_name: "Campus Haven Hostel 2",
            hostel_image: "/placeholder.svg?height=48&width=48&text=H2",
            rating: 5,
            comment: "Absolutely loved my stay here! The rooms are spacious and clean, and the common areas are well maintained. The staff is friendly and responsive to any issues.",
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 3,
            hostel_id: 103,
            hostel_name: "Campus Haven Hostel 3",
            hostel_image: "/placeholder.svg?height=48&width=48&text=H3",
            rating: 3.5,
            comment: "Decent accommodation but could use some improvements. The WiFi was spotty and the kitchen facilities were limited. However, the location is convenient and the price is reasonable.",
            created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const filteredReviews = filter === "all" 
    ? reviews 
    : reviews.filter(review => {
        if (filter === "high") return review.rating >= 4
        if (filter === "low") return review.rating < 4
        return true
      })

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(review => review.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
            <p className="text-gray-500 mt-1">Manage your hostel reviews and ratings</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Reviews</option>
              <option value="high">High Ratings (4+)</option>
              <option value="low">Low Ratings (&lt; 4)</option>
            </select>
            <Link 
              to="/hostels" 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Write a Review</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {loading ? (
          <LoadingSpinner />
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No reviews found</p>
            <p className="text-gray-400 mb-6">You haven't written any reviews yet</p>
            <Link 
              to="/hostels" 
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Browse Hostels to Review
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                      {review.hostel_image ? (
                        <img
                          src={review.hostel_image}
                          alt={review.hostel_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building className="h-full w-full p-2 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <Link to={`/hostels/${review.hostel_id}`} className="font-semibold text-gray-900 hover:text-purple-600">
                        {review.hostel_name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Reviewed on {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Rating value={review.rating} size="sm" readOnly />
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <div className="flex justify-end space-x-3">
                  <button 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => alert("Edit functionality will be implemented soon")}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    className="flex items-center text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserReviews