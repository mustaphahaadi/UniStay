"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "./AuthContext"
import { toast } from "react-toastify"

const MessagingContext = createContext()

export const useMessaging = () => useContext(MessagingContext)

export const MessagingProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch conversations when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations()

      // Set up polling for new messages (in a real app, use WebSockets instead)
      const interval = setInterval(() => {
        fetchUnreadCount()
        if (activeConversation) {
          fetchMessages(activeConversation.id)
        }
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated, activeConversation])

  const fetchConversations = async () => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/messages/conversations/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch conversations")

      const data = await response.json()
      setConversations(data)

      // Calculate unread count
      const unread = data.reduce((count, conv) => count + (conv.unread_count || 0), 0)
      setUnreadCount(unread)
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    if (!isAuthenticated) return

    try {
      const response = await fetch(`${API_URL}/messages/unread-count/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch unread count")

      const data = await response.json()
      setUnreadCount(data.count)
    } catch (error) {
      console.error("Error fetching unread count:", error)
    }
  }

  const fetchMessages = async (conversationId) => {
    if (!isAuthenticated || !conversationId) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/messages/conversations/${conversationId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch messages")

      const data = await response.json()
      setMessages(data.messages)

      // Mark messages as read
      if (data.unread_count > 0) {
        markConversationAsRead(conversationId)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (conversationId, content) => {
    if (!isAuthenticated || !conversationId || !content.trim()) return false

    try {
      const response = await fetch(`${API_URL}/messages/send/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          content,
        }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const newMessage = await response.json()

      // Update messages state with the new message
      setMessages((prev) => [...prev, newMessage])

      return true
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
      return false
    }
  }

  const startNewConversation = async (recipientId, initialMessage, hostelId = null) => {
    if (!isAuthenticated || !recipientId || !initialMessage.trim()) return null

    try {
      const response = await fetch(`${API_URL}/messages/conversations/new/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          recipient_id: recipientId,
          initial_message: initialMessage,
          hostel_id: hostelId,
        }),
      })

      if (!response.ok) throw new Error("Failed to start conversation")

      const newConversation = await response.json()

      // Update conversations list
      setConversations((prev) => [newConversation, ...prev])

      return newConversation
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast.error("Failed to start conversation. Please try again.")
      return null
    }
  }

  const markConversationAsRead = async (conversationId) => {
    if (!isAuthenticated || !conversationId) return

    try {
      await fetch(`${API_URL}/messages/conversations/${conversationId}/read/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

      // Update unread count and conversations
      fetchUnreadCount()
      setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unread_count: 0 } : conv)))
    } catch (error) {
      console.error("Error marking conversation as read:", error)
    }
  }

  const selectConversation = (conversation) => {
    setActiveConversation(conversation)
    if (conversation) {
      fetchMessages(conversation.id)
    } else {
      setMessages([])
    }
  }

  const value = {
    conversations,
    activeConversation,
    messages,
    loading,
    unreadCount,
    fetchConversations,
    fetchMessages,
    sendMessage,
    startNewConversation,
    selectConversation,
    markConversationAsRead,
  }

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>
}
