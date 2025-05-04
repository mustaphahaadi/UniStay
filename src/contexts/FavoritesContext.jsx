import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";
import { hostels } from "../data"; // Import mock data for development

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
  const [loading, setLoading] = useState(false); // Set to false for development
  const { isAuthenticated, user } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  // For development, initialize with some mock favorites
  useEffect(() => {
    // Mock favorites data
    const mockFavorites = [
      {
        id: 1,
        user_id: 1,
        hostel: hostels[0],
        created_at: "2023-05-05T10:15:00Z",
      },
      {
        id: 2,
        user_id: 1,
        hostel: hostels[2],
        created_at: "2023-05-10T14:30:00Z",
      },
    ];
    
    setFavorites(mockFavorites);
    setLoading(false);
  }, []);

  // Add a hostel to favorites
  const addFavorite = async (hostelId) => {
    try {
      // Find the hostel in our mock data
      const hostel = hostels.find(h => h.id === hostelId);
      
      if (!hostel) {
        throw new Error("Hostel not found");
      }
      
      // Create a new favorite
      const newFavorite = {
        id: favorites.length + 1,
        user_id: user.id,
        hostel: hostel,
        created_at: new Date().toISOString(),
      };
      
      setFavorites(prev => [...prev, newFavorite]);
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
    try {
      setFavorites(prev => prev.filter(fav => fav.hostel.id !== hostelId));
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
    return favorites.some(fav => fav.hostel.id === hostelId);
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