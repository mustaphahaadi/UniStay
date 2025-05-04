"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useCommunity } from "../contexts/CommunityContext"
import { useAuth } from "../contexts/AuthContext"
import { MessageSquare, User, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react"

const ForumTopics = () => {
  const { forumId } = useParams()
  const { fetchTopics, forums } = useCommunity()
  const { user } = useAuth()
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [forum, setForum] = useState(null)

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoading(true)
        const data = await fetchTopics(forumId)
        setTopics(data.topics)

        // Find the forum details
        const currentForum = forums.find((f) => f.id.toString() === forumId)
        setForum(currentForum || data.forum)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTopics()
  }, [forumId, fetchTopics, forums])

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
        <Link to="/community" className="flex items-center text-teal-600 hover:text-teal-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Forums
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{forum?.name}</h1>
              <p className="text-gray-600 mt-1">{forum?.description}</p>
            </div>

            {user && (
              <Link
                to={`/community/forums/${forumId}/create-topic`}
                className="mt-4 md:mt-0 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Topic
              </Link>
            )}
          </div>

          <div className="space-y-4">
            {topics.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No topics found in this forum</p>
                {user && (
                  <Link
                    to={`/community/forums/${forumId}/create-topic`}
                    className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Start the first topic
                  </Link>
                )}
              </div>
            ) : (
              topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/community/topics/${topic.id}`}
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{topic.title}</h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">{topic.excerpt}</p>

                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <User className="h-4 w-4 mr-1" />
                          <span>By {topic.author_name}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{topic.reply_count} replies</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{topic.created_at}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumTopics
