"use client"

import { useState, useEffect, useRef } from "react"
import { useMessaging } from "../contexts/MessagingContext"
import { useAuth } from "../contexts/AuthContext"
import { format } from "date-fns"
import { Search, Send, ChevronLeft, User, Home, Clock, CheckCheck, ImageIcon, Paperclip, X } from "lucide-react"

const Messages = () => {
  const { conversations, activeConversation, messages, loading, sendMessage, selectConversation, fetchConversations } =
    useMessaging()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showMobileConversation, setShowMobileConversation] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const [attachments, setAttachments] = useState([])

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    // Show conversation panel on mobile when a conversation is selected
    if (activeConversation) {
      setShowMobileConversation(true)
    }
  }, [activeConversation])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() && attachments.length === 0) return

    const success = await sendMessage(activeConversation.id, newMessage)
    if (success) {
      setNewMessage("")
      setAttachments([])
    }
  }

  const handleSelectConversation = (conversation) => {
    selectConversation(conversation)
  }

  const handleBackToList = () => {
    setShowMobileConversation(false)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // In a real app, you would upload these files to your server
      // For now, we'll just store them in state
      setAttachments((prev) => [
        ...prev,
        ...files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        })),
      ])
    }
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.other_user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (conv.hostel && conv.hostel.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[calc(80vh-100px)]">
          {/* Conversations List - Hidden on mobile when viewing a conversation */}
          <div className={`w-full md:w-1/3 border-r ${showMobileConversation ? "hidden md:block" : "block"}`}>
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(80vh-164px)]">
              {loading && conversations.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No conversations found</div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      activeConversation?.id === conversation.id ? "bg-teal-50" : ""
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {conversation.other_user.avatar ? (
                          <img
                            src={conversation.other_user.avatar || "/placeholder.svg"}
                            alt={conversation.other_user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.other_user.name}</h3>
                          <span className="text-xs text-gray-500">
                            {format(new Date(conversation.last_message_time), "MMM d")}
                          </span>
                        </div>
                        {conversation.hostel && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Home className="h-3 w-3 mr-1" />
                            <span className="truncate">{conversation.hostel.name}</span>
                          </div>
                        )}
                        <p className="text-sm text-gray-500 truncate mt-1">{conversation.last_message}</p>
                      </div>
                      {conversation.unread_count > 0 && (
                        <div className="ml-2 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread_count}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Conversation View */}
          <div className={`w-full md:w-2/3 flex flex-col ${!showMobileConversation ? "hidden md:flex" : "flex"}`}>
            {activeConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center">
                  <button className="md:hidden mr-2 text-gray-500" onClick={handleBackToList}>
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {activeConversation.other_user.avatar ? (
                      <img
                        src={activeConversation.other_user.avatar || "/placeholder.svg"}
                        alt={activeConversation.other_user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{activeConversation.other_user.name}</h3>
                    {activeConversation.hostel && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Home className="h-3 w-3 mr-1" />
                        <span>{activeConversation.hostel.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loading && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No messages yet. Start the conversation!</div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender_id === user.id ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`text-xs mt-1 flex items-center ${
                              message.sender_id === user.id ? "text-teal-100" : "text-gray-500"
                            }`}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{format(new Date(message.created_at), "h:mm a")}</span>
                            {message.sender_id === user.id && <CheckCheck className="h-3 w-3 ml-1" />}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Attachments Preview */}
                {attachments.length > 0 && (
                  <div className="px-4 py-2 border-t flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="h-16 w-16 rounded border bg-gray-100 flex items-center justify-center overflow-hidden">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Paperclip className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <button
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-teal-600"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                      multiple
                    />
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-teal-600 text-white rounded-r-md px-4 py-2 hover:bg-teal-700"
                      disabled={!newMessage.trim() && attachments.length === 0}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your Messages</h3>
                  <p className="text-gray-500 max-w-sm">
                    Select a conversation to view messages or start a new conversation from a hostel listing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
