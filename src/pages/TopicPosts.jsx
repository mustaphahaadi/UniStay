"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useCommunity } from "../contexts/CommunityContext"
import { useAuth } from "../contexts/AuthContext"
import { ChevronLeft, User, Clock, ThumbsUp, Flag, Reply } from "lucide-react"
import { toast } from "react-toastify"

const TopicPosts = () => {
  const { topicId } = useParams()
  const { fetchPosts, createPost } = useCommunity()
  const { user } = useAuth()
  const [topic, setTopic] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const replyFormRef = useRef(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchPosts(topicId)
        setTopic(data.topic)
        setPosts(data.posts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [topicId, fetchPosts])

  const handleReply = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.info("Please login to reply")
      return
    }

    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty")
      return
    }

    try {
      setIsSubmitting(true)
      const newPost = await createPost(topicId, replyContent)
      setPosts([...posts, newPost])
      setReplyContent("")
      toast.success("Reply posted successfully")
    } catch (err) {
      toast.error(err.message || "Failed to post reply")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToReply = () => {
    replyFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to={`/community/forums/${topic?.forum_id}`}
          className="flex items-center text-teal-600 hover:text-teal-700"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Topics
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{topic?.title}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <User className="h-4 w-4 mr-1" />
                <span>Started by {topic?.author_name}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{topic?.created_at}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <div
                key={post.id}
                id={`post-${post.id}`}
                className={`border ${index === 0 ? "border-teal-200 bg-teal-50" : "border-gray-200"} rounded-lg p-4`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {post.author_avatar ? (
                        <img
                          src={post.author_avatar || "/placeholder.svg"}
                          alt={post.author_name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{post.author_name}</h3>
                        <p className="text-xs text-gray-500">{post.created_at}</p>
                      </div>

                      <div className="text-xs text-gray-500">#{index + 1}</div>
                    </div>

                    <div className="mt-2 prose max-w-none">
                      <p>{post.content}</p>
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-teal-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{post.likes_count || 0}</span>
                      </button>

                      <button
                        onClick={scrollToReply}
                        className="flex items-center text-sm text-gray-500 hover:text-teal-600"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        <span>Reply</span>
                      </button>

                      <button className="flex items-center text-sm text-gray-500 hover:text-red-600">
                        <Flag className="h-4 w-4 mr-1" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200" ref={replyFormRef}>
            <h2 className="text-xl font-semibold mb-4">Post a Reply</h2>

            {!user ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-700 mb-4">Please login to reply to this topic</p>
                <Link
                  to={`/login?redirect=/community/topics/${topicId}`}
                  className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Login to Continue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReply}>
                <div className="mb-4">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Write your reply here..."
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className={`px-6 py-2 rounded-md font-medium ${
                      isSubmitting || !replyContent.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    } transition-colors`}
                  >
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicPosts
