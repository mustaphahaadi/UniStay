"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../contexts/FavoritesContext"
import HostelCard from "../components/HostelCard"
import { Heart } from "lucide-react"

const Favorites = () => {
  const { favorites, loading } = useFavorites()
  const [sortBy, setSortBy] = useState("date_added")

  // Sort options
  const sortOptions = [
    { value: "date_added", label: "Date Added (Newest First)" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "name", label: "Name (A-Z)" },
  ]

  // Sort favorites based on selected option
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.hostel.price - b.hostel.price
      case "price_high":
        return b.hostel.price - a.hostel.price
      case "name":
        return a.hostel.name.localeCompare(b.hostel.name)
      case "date_added":
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">Save your favorite accommodations to quickly access them later.</p>
          <Link
            to="/hostels"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Browse Accommodations
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{favorites.length} saved accommodations</p>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFavorites.map((favorite) => (
              <HostelCard key={favorite.id} hostel={favorite.hostel} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Favorites
