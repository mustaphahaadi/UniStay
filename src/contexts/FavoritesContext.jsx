"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { API_URL } from "../config"

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch favorites when user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_URL}/favorites/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setFavorites(data)
        } else {
          console.error("Failed to fetch favorites")
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  // Add a hostel to favorites
  const addFavorite = async (hostelId) => {
    if (!user) return false

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/favorites/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ hostel_id: hostelId }),
      })

      if (response.ok) {
        const newFavorite = await response.json()
        setFavorites((prev) => [...prev, newFavorite])
        return true
      }
      return false
    } catch (error) {
      console.error("Error adding favorite:", error)
      return false
    }
  }

  // Remove a hostel from favorites
  const removeFavorite = async (hostelId) => {
    if (!user) return false

    try {
      const token = localStorage.getItem("token")
      const favorite = favorites.find((fav) => fav.hostel_id === hostelId)

      if (!favorite) return false

      const response = await fetch(`${API_URL}/favorites/${favorite.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.ok) {
        setFavorites((prev) => prev.filter((fav) => fav.hostel_id !== hostelId))
        return true
      }
      return false
    } catch (error) {
      console.error("Error removing favorite:", error)
      return false
    }
  }

  // Check if a hostel is in favorites
  const isFavorite = (hostelId) => {
    return favorites.some((fav) => fav.hostel_id === hostelId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
