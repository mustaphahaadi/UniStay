import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

// Create context
const FavoritesContext = createContext();

// Custom hook to use the favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  // Fetch favorites when user authentication changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/favorites/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        showError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user, showError]);

  // Add a hostel to favorites
  const addFavorite = async (hostelId) => {
    if (!isAuthenticated) {
      showError("Please log in to add favorites");
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/favorites/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ hostel_id: hostelId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add favorite");
      }

      const newFavorite = await response.json();
      setFavorites((prev) => [...prev, newFavorite]);
      showSuccess("Added to favorites");
      return true;
    } catch (err) {
      console.error("Error adding favorite:", err);
      showError("Failed to add to favorites");
      return false;
    }
  };

  // Remove a hostel from favorites
  const removeFavorite = async (hostelId) => {
    if (!isAuthenticated) {
      showError("Please log in to manage favorites");
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/favorites/${hostelId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      setFavorites((prev) => prev.filter((fav) => fav.hostel.id !== hostelId));
      showSuccess("Removed from favorites");
      return true;
    } catch (err) {
      console.error("Error removing favorite:", err);
      showError("Failed to remove from favorites");
      return false;
    }
  };

  // Check if a hostel is in favorites
  const isFavorite = (hostelId) => {
    return favorites.some((fav) => fav.hostel.id === hostelId);
  };

  // Toggle favorite status
  const toggleFavorite = async (hostelId) => {
    if (isFavorite(hostelId)) {
      return await removeFavorite(hostelId);
    } else {
      return await addFavorite(hostelId);
    }
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

// Default export for the provider
export default FavoritesProvider;