import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

// Create context
const CommunityContext = createContext();

// Custom hook to use the community context
export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}

// Provider component
export const CommunityProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/community/categories/`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        showError("Failed to load forum categories");
      }
    };

    fetchCategories();
  }, [showError]);

  // Fetch topics for a specific category
  const fetchTopics = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/community/categories/${categoryId}/topics/`);
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      const data = await response.json();
      setTopics(data);
      return data;
    } catch (err) {
      console.error("Error fetching topics:", err);
      showError("Failed to load forum topics");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts for a specific topic
  const fetchPosts = async (topicId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/community/topics/${topicId}/posts/`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching posts:", err);
      showError("Failed to load posts");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create a new topic
  const createTopic = async (categoryId, title, content) => {
    if (!isAuthenticated) {
      showError("Please log in to create a topic");
      return null;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/community/topics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          category_id: categoryId,
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create topic");
      }

      const newTopic = await response.json();
      showSuccess("Topic created successfully");
      return newTopic;
    } catch (err) {
      console.error("Error creating topic:", err);
      showError("Failed to create topic");
      return null;
    }
  };

  // Create a new post in a topic
  const createPost = async (topicId, content) => {
    if (!isAuthenticated) {
      showError("Please log in to reply");
      return null;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/community/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          topic_id: topicId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      showSuccess("Reply posted successfully");
      return newPost;
    } catch (err) {
      console.error("Error creating post:", err);
      showError("Failed to post reply");
      return null;
    }
  };

  const value = {
    topics,
    categories,
    loading,
    fetchTopics,
    fetchPosts,
    createTopic,
    createPost,
  };

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

// Default export for the provider
export default CommunityProvider;