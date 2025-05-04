"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { API_URL } from "../config"
import { useAuth } from "./AuthContext"

const CommunityContext = createContext()

export const useCommunity = () => useContext(CommunityContext)

export const CommunityProvider = ({ children }) => {
  const { user } = useAuth()
  const [forums, setForums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchForums()
  }, [])

  const fetchForums = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/community/forums/`)

      if (!response.ok) {
        throw new Error("Failed to fetch forums")
      }

      const data = await response.json()
      setForums(data)
    } catch (err) {
      console.error("Error fetching forums:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchTopics = async (forumId) => {
    try {
      const response = await fetch(`${API_URL}/community/forums/${forumId}/topics/`)

      if (!response.ok) {
        throw new Error("Failed to fetch topics")
      }

      return await response.json()
    } catch (err) {
      console.error("Error fetching topics:", err)
      throw err
    }
  }

  const fetchPosts = async (topicId) => {
    try {
      const response = await fetch(`${API_URL}/community/topics/${topicId}/posts/`)

      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }

      return await response.json()
    } catch (err) {
      console.error("Error fetching posts:", err)
      throw err
    }
  }

  const createTopic = async (forumId, title, content) => {
    try {
      const response = await fetch(`${API_URL}/community/forums/${forumId}/topics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to create topic")
      }

      return await response.json()
    } catch (err) {
      console.error("Error creating topic:", err)
      throw err
    }
  }

  const createPost = async (topicId, content) => {
    try {
      const response = await fetch(`${API_URL}/community/topics/${topicId}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      return await response.json()
    } catch (err) {
      console.error("Error creating post:", err)
      throw err
    }
  }

  const value = {
    forums,
    loading,
    error,
    fetchForums,
    fetchTopics,
    fetchPosts,
    createTopic,
    createPost,
  }

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>
}
