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
  const [loading, setLoading] = useState(false); // Set to false for development
  const [unreadCount, setUnreadCount] = useState(2); // Mock unread count
  
  const { isAuthenticated, user } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  // For development, initialize with some mock conversations
  useEffect(() => {
    // Mock conversations data
    const mockConversations = [
      {
        id: 1,
        participants: [1, 2],
        last_message: {
          id: 3,
          conversation_id: 1,
          sender_id: 1,
          recipient_id: 2,
          content: "I'm looking for a single room from the 10th to the 20th.",
          read: false,
          created_at: "2023-05-12T10:30:00Z",
        },
        unread_count: 1,
        created_at: "2023-05-12T09:30:00Z",
        updated_at: "2023-05-12T10:30:00Z",
        sender: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        recipient: {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
      },
      {
        id: 2,
        participants: [1, 3],
        last_message: {
          id: 6,
          conversation_id: 2,
          sender_id: 3,
          recipient_id: 1,
          content: "Yes, we have availability for those dates. Would you like to book?",
          read: false,
          created_at: "2023-05-14T15:45:00Z",
        },
        unread_count: 1,
        created_at: "2023-05-14T14:20:00Z",
        updated_at: "2023-05-14T15:45:00Z",
        sender: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        recipient: {
          id: 3,
          firstName: "Alex",
          lastName: "Johnson",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      },
    ];
    
    setConversations(mockConversations);
    setLoading(false);
  }, []);

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      
      // Mock messages data
      const mockMessages = [
        {
          id: 1,
          conversation_id: 1,
          sender_id: 1,
          recipient_id: 2,
          content: "Hi, I'm interested in booking a room at Tech Haven Hostel. Do you have any availability for next month?",
          read: true,
          created_at: "2023-05-12T09:30:00Z",
          sender: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 2,
          conversation_id: 1,
          sender_id: 2,
          recipient_id: 1,
          content: "Hello! Yes, we have several rooms available for next month. What specific dates are you looking for?",
          read: true,
          created_at: "2023-05-12T10:15:00Z",
          sender: {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          },
        },
        {
          id: 3,
          conversation_id: 1,
          sender_id: 1,
          recipient_id: 2,
          content: "I'm looking for a single room from the 10th to the 20th.",
          read: false,
          created_at: "2023-05-12T10:30:00Z",
          sender: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
      ];
      
      // Filter messages for the requested conversation
      const conversationMessages = mockMessages.filter(m => m.conversation_id === conversationId);
      
      setMessages(conversationMessages);
      
      // Set active conversation
      const conversation = conversations.find(c => c.id === conversationId);
      setActiveConversation(conversation);
      
      // Mark as read if there were unread messages
      if (conversation && conversation.unread_count > 0) {
        markConversationAsRead(conversationId);
      }
      
      return conversationMessages;
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
    try {
      // Create a new message
      const newMessage = {
        id: Math.floor(Math.random() * 1000) + 100, // Random ID for development
        conversation_id: activeConversation ? activeConversation.id : null,
        sender_id: user.id,
        recipient_id: recipientId,
        content,
        read: false,
        created_at: new Date().toISOString(),
        sender: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        },
      };
      
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
    try {
      // Create a new conversation
      const newConversation = {
        id: conversations.length + 1,
        participants: [user.id, recipientId],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        unread_count: 0,
        sender: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        },
        recipient: {
          id: recipientId,
          firstName: "Hostel",
          lastName: "Manager",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
      };
      
      // Add the conversation
      setConversations(prev => [...prev, newConversation]);
      
      // Set as active conversation
      setActiveConversation(newConversation);
      
      // Send the initial message
      if (initialMessage) {
        await sendMessage(recipientId, initialMessage);
      }
      
      return newConversation.id;
    } catch (err) {
      console.error("Error starting conversation:", err);
      showError("Failed to start conversation");
      return null;
    }
  };

  // Mark conversation as read
  const markConversationAsRead = async (conversationId) => {
    try {
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
    // For development, just keep the existing conversations
    // In a real app, you would fetch updated conversations from the server
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