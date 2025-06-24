"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { API_URL } from "../config"
import { Star, ThumbsUp, Flag, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ReviewSystem = ({ hostelId }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [userReview, setUserReview] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    if (hostelId) {
      fetchReviews()
    }
  }, [hostelId])

  const fetchReviews = async () => {
    if (!hostelId) return;
    
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/`)
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json()

      if (response.ok) {
        setReviews(data.filter((review) => review.user_id !== (user?.id || 0)))

        // Check if user has already reviewed this hostel
        const userReviewData = data.find((review) => review.user_id === user?.id)
        if (userReviewData) {
          setUserReview(userReviewData)
        } else {
          setUserReview(null)
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({
      ...prev,
      rating,
    }))
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate("/login", { state: { from: `/hostels/${hostelId}` } })
      return
    }

    if (newReview.comment.trim().length < 10) {
      setError("Review comment must be at least 10 characters long")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          rating: newReview.rating,
          title: newReview.title.trim(),
          comment: newReview.comment.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setUserReview(data)
        setShowReviewForm(false)
        setNewReview({
          rating: 5,
          title: "",
          comment: "",
        })
        fetchReviews()
      } else {
        setError(data.detail || "Failed to submit review")
      }
    } catch (error) {
      setError("An error occurred while submitting your review")
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditReview = () => {
    if (userReview) {
      setNewReview({
        rating: userReview.rating,
        title: userReview.title || "",
        comment: userReview.comment,
      })
      setShowReviewForm(true)
    }
  }

  const handleDeleteReview = async () => {
    if (!userReview) return

    if (!window.confirm("Are you sure you want to delete your review?")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/hostels/${hostelId}/reviews/${userReview.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.ok) {
        setUserReview(null)
        fetchReviews()
      }
    } catch (error) {
      console.error("Error deleting review:", error)
    }
  }

  const handleLikeReview = async (reviewId) => {
    if (!user) {
      navigate("/login", { state: { from: `/hostels/${hostelId}` } })
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/reviews/${reviewId}/like/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error("Error liking review:", error)
    }
  }

  const handleReportReview = async (reviewId) => {
    if (!user) {
      navigate("/login", { state: { from: `/hostels/${hostelId}` } })
      return
    }

    const reason = prompt("Please provide a reason for reporting this review:")
    if (!reason) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/reviews/${reviewId}/report/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ reason }),
      })

      if (response.ok) {
        alert("Review reported successfully")
      }
    } catch (error) {
      console.error("Error reporting review:", error)
    }
  }

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "recent":
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "N/A"

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => Math.round(review.rating) === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Reviews & Ratings</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="text-5xl font-bold text-gray-900 mr-4">{averageRating}</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{reviews.length} reviews</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                      <div className="flex-1 mx-2 h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="w-8 text-sm text-gray-600">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User's review or review form */}
          {user && (
            <div className="mb-8">
              {userReview ? (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold mb-2">Your Review</h3>
                    <div className="flex space-x-2">
                      <button onClick={handleEditReview} className="text-sm text-teal-600 hover:text-teal-800">
                        Edit
                      </button>
                      <button onClick={handleDeleteReview} className="text-sm text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= userReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(userReview.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {userReview.title && <h4 className="font-medium mb-1">{userReview.title}</h4>}
                  <p className="text-gray-700">{userReview.comment}</p>
                </div>
              ) : showReviewForm ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title (Optional)
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newReview.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Review
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={newReview.comment}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Share your experience with this accommodation"
                        required
                      ></textarea>
                    </div>

                    {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-400"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Write a Review
                </button>
              )}
            </div>
          )}

          {/* Reviews list */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </h3>

              <div className="flex items-center">
                <label htmlFor="sort-reviews" className="mr-2 text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort-reviews"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600">No reviews yet. Be the first to review this accommodation!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="bg-gray-200 rounded-full p-2 mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.user_name || "Anonymous"}</h4>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {review.title && <h5 className="font-medium mt-3 mb-1">{review.title}</h5>}
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className={`flex items-center text-sm ${
                          review.user_has_liked ? "text-teal-600" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 mr-1 ${review.user_has_liked ? "fill-current" : ""}`} />
                        Helpful ({review.likes_count})
                      </button>

                      <button
                        onClick={() => handleReportReview(review.id)}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewSystem
