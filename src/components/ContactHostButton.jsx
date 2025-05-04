"use client"

import { useState } from "react"
import { useMessaging } from "../contexts/MessagingContext"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { MessageSquare, X } from "lucide-react"
import { toast } from "react-toastify"

const ContactHostButton = ({ hostelId, hostId, hostelName }) => {
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const { startNewConversation } = useMessaging()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleContact = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: window.location.pathname } })
      return
    }
    setShowModal(true)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setSending(true)
    try {
      const conversation = await startNewConversation(hostId, message, hostelId)
      if (conversation) {
        toast.success("Message sent successfully!")
        setShowModal(false)
        navigate("/dashboard/messages")
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={handleContact}
        className="flex items-center px-4 py-2 bg-white border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Contact Host
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium">Contact Host about {hostelName}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSend} className="p-4">
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ask about availability, amenities, or any other questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactHostButton
