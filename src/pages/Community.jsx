"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCommunity } from "../contexts/CommunityContext"
import { useAuth } from "../contexts/AuthContext"
import { MessageSquare, Users, Clock, ChevronRight } from "lucide-react"

const Community = () => {
  const { forums, loading, error } = useCommunity()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

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

  const filteredForums = forums.filter((forum) => {
    if (activeTab === "all") return true
    if (activeTab === "university") return forum.type === "university"
    if (activeTab === "hostel") return forum.type === "hostel"
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold">Community Forums</h1>

            {user && (
              <Link
                to="/community/create-topic"
                className="mt-4 md:mt-0 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors inline-flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start New Topic
              </Link>
            )}
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All Forums
                </button>
                <button
                  onClick={() => setActiveTab("university")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "university"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  University Forums
                </button>
                <button
                  onClick={() => setActiveTab("hostel")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "hostel"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Hostel Forums
                </button>
              </nav>
            </div>
          </div>

          <div className="space-y-4">
            {filteredForums.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No forums found</p>
              </div>
            ) : (
              filteredForums.map((forum) => (
                <Link
                  key={forum.id}
                  to={`/community/forums/${forum.id}`}
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{forum.name}</h3>
                      <p className="text-gray-600 mt-1">{forum.description}</p>

                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{forum.topic_count} topics</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{forum.member_count} members</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Last active {forum.last_active}</span>
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

export default Community
