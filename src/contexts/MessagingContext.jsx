import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

// Create context
const MessagingContext = createContext();

// Custom hook to use the messaging context
export function useMessaging() {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }
  return context;
}

// Provider component
export const MessagingProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const { isAuthenticated, user } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  // Fetch conversations when user authentication changes
  useEffect(() => {
    const fetchConversations = async () => {
      if (!isAuthenticated || !user) {
        setConversations([]);
        setUnreadCount(0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/messages/conversations/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json();
        setConversations(data);
        
        // Calculate unread count
        const unread = data.reduce((count, conv) => count + (conv.unread_count || 0), 0);
        setUnreadCount(unread);
      } catch (err) {
        console.error("Error fetching conversations:", err);
        showError("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Set up polling for new messages
    const intervalId = setInterval(fetchConversations, 30000); // Poll every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [isAuthenticated, user, showError]);

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    if (!isAuthenticated) {
      showError("Please log in to view messages");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/messages/conversations/${conversationId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.messages);
      
      // Set active conversation
      const conversation = conversations.find(c => c.id === conversationId);
      setActiveConversation(conversation);
      
      // Mark as read if there were unread messages
      if (conversation && conversation.unread_count > 0) {
        markConversationAsRead(conversationId);
      }
      
      return data.messages;
    } catch (err) {
      console.error("Error fetching messages:", err);
      showError("Failed to load messages");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (recipientId, content) => {
    if (!isAuthenticated) {
      showError("Please log in to send messages");
      return null;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          recipient_id: recipientId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const newMessage = await response.json();
      
      // Update messages if this is part of the active conversation
      if (activeConversation && 
          (activeConversation.recipient.id === recipientId || 
           activeConversation.sender.id === recipientId)) {
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Update conversations list
      refreshConversations();
      
      showSuccess("Message sent");
      return newMessage;
    } catch (err) {
      console.error("Error sending message:", err);
      showError("Failed to send message");
      return null;
    }
  };

  // Start a new conversation
  const startConversation = async (recipientId, initialMessage) => {
    const result = await sendMessage(recipientId, initialMessage);
    if (result) {
      await refreshConversations();
      return result.conversation_id;
    }
    return null;
  };

  // Mark conversation as read
  const markConversationAsRead = async (conversationId) => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/messages/conversations/${conversationId}/read/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark conversation as read");
      }

      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unread_count: 0 } 
            : conv
        )
      );
      
      // Recalculate unread count
      setUnreadCount(prev => {
        const conversation = conversations.find(c => c.id === conversationId);
        return prev - (conversation?.unread_count || 0);
      });
      
    } catch (err) {
      console.error("Error marking conversation as read:", err);
    }
  };

  // Refresh conversations list
  const refreshConversations = async () => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/messages/conversations/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh conversations");
      }

      const data = await response.json();
      setConversations(data);
      
      // Calculate unread count
      const unread = data.reduce((count, conv) => count + (conv.unread_count || 0), 0);
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error refreshing conversations:", err);
    }
  };

  const value = {
    conversations,
    activeConversation,
    messages,
    loading,
    unreadCount,
    fetchMessages,
    sendMessage,
    startConversation,
    markConversationAsRead,
    refreshConversations,
  };

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
};

// Default export for the provider
export default MessagingProvider;