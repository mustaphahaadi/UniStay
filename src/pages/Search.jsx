"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { API_URL } from "../config"
import HostelCard from "../components/HostelCard"
import {
  SearchIcon,
  Filter,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  MapPin,
  Wifi,
  Tv,
  Fan,
  ShowerHead,
  CookingPotIcon as Kitchen,
  BookOpen,
  Shield,
  Droplet,
  Zap,
} from "lucide-react"
import debounce from "lodash.debounce"
import MapView from "../components/MapView"

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState([])
  const [locations, setLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState({
    university: searchParams.get("university") || "",
    location: searchParams.get("location") || "",
    gender_type: searchParams.get("gender_type") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    distance: searchParams.get("distance") || "",
    rating: searchParams.get("rating") || "",
    amenities: searchParams.getAll("amenities") || [],
    sort_by: searchParams.get("sort_by") || "relevance",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // grid or map

  // All available amenities
  const allAmenities = [
    { id: "wifi", name: "WiFi", icon: <Wifi className="h-4 w-4" /> },
    { id: "tv", name: "TV", icon: <Tv className="h-4 w-4" /> },
    { id: "kitchen", name: "Kitchen", icon: <Kitchen className="h-4 w-4" /> },
    { id: "bathroom", name: "Bathroom", icon: <ShowerHead className="h-4 w-4" /> },
    { id: "study", name: "Study Room", icon: <BookOpen className="h-4 w-4" /> },
    { id: "security", name: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "water", name: "Water", icon: <Droplet className="h-4 w-4" /> },
    { id: "electricity", name: "Electricity", icon: <Zap className="h-4 w-4" /> },
    { id: "fan", name: "Fan", icon: <Fan className="h-4 w-4" /> },
  ]

  // Sort options
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Closest to University" },
    { value: "newest", label: "Newest Listings" },
  ]

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [universitiesResponse, locationsResponse] = await Promise.all([
          fetch(`${API_URL}/universities/`),
          fetch(`${API_URL}/locations/`),
        ])

        const universitiesData = await universitiesResponse.json()
        const locationsData = await locationsResponse.json()

        setUniversities(universitiesData)
        setLocations(locationsData)
      } catch (error) {
        console.error("Error fetching filter data:", error)
      }
    }

    fetchFiltersData()
  }, [])

  // Debounced search function
  const debouncedFetchHostels = useCallback(
    debounce((searchQuery, filters, page) => {
      fetchHostels(searchQuery, filters, page)
    }, 500),
    [],
  )

  useEffect(() => {
    debouncedFetchHostels(searchQuery, filters, page)
  }, [filters, searchQuery, page, debouncedFetchHostels])

  const fetchHostels = async (query, filterOptions, currentPage) => {
    setLoading(true)
    try {
      // Build query params
      const params = new URLSearchParams()
      params.append("page", currentPage.toString())

      if (query) params.append("q", query)
      if (filterOptions.university) params.append("university", filterOptions.university)
      if (filterOptions.location) params.append("location", filterOptions.location)
      if (filterOptions.gender_type) params.append("gender_type", filterOptions.gender_type)
      if (filterOptions.min_price) params.append("min_price", filterOptions.min_price)
      if (filterOptions.max_price) params.append("max_price", filterOptions.max_price)
      if (filterOptions.distance) params.append("distance", filterOptions.distance)
      if (filterOptions.rating) params.append("rating", filterOptions.rating)
      if (filterOptions.sort_by) params.append("sort_by", filterOptions.sort_by)
      filterOptions.amenities.forEach((amenity) => params.append("amenities", amenity))

      const response = await fetch(`${API_URL}/hostels/search/?${params.toString()}`)
      const data = await response.json()

      setHostels(data.results)
      setTotalResults(data.count)
      setTotalPages(Math.ceil(data.count / 12)) // Assuming 12 items per page
    } catch (error) {
      console.error("Error fetching hostels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    setPage(1) // Reset to first page when filters change
  }

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target
    setFilters((prev) => ({
      ...prev,
      amenities: checked ? [...prev.amenities, value] : prev.amenities.filter((a) => a !== value),
    }))
    setPage(1) // Reset to first page when filters change
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL with search query and filters
    const params = new URLSearchParams()

    if (searchQuery) params.append("q", searchQuery)
    if (filters.university) params.append("university", filters.university)
    if (filters.location) params.append("location", filters.location)
    if (filters.gender_type) params.append("gender_type", filters.gender_type)
    if (filters.min_price) params.append("min_price", filters.min_price)
    if (filters.max_price) params.append("max_price", filters.max_price)
    if (filters.distance) params.append("distance", filters.distance)
    if (filters.rating) params.append("rating", filters.rating)
    if (filters.sort_by) params.append("sort_by", filters.sort_by)
    filters.amenities.forEach((amenity) => params.append("amenities", amenity))

    setSearchParams(params)
  }

  const resetFilters = () => {
    setFilters({
      university: "",
      location: "",
      gender_type: "",
      min_price: "",
      max_price: "",
      distance: "",
      rating: "",
      amenities: [],
      sort_by: "relevance",
    })
    setSearchParams(searchQuery ? { q: searchQuery } : {})
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Accommodations</h1>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for hostels by name, location, or university..."
              className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
          </button>
          <div className="flex">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-4 py-3 rounded-l-md ${
                viewMode === "grid" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors`}
              aria-label="Grid view"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`px-4 py-3 rounded-r-md ${
                viewMode === "map" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors`}
              aria-label="Map view"
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select
                name="university"
                value={filters.university}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Universities</option>
                {universities.map((university) => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender Type</label>
              <select
                name="gender_type"
                value={filters.gender_type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Types</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₵)</label>
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₵)</label>
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance to University (km)</label>
              <select
                name="distance"
                value={filters.distance}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Any Distance</option>
                <option value="0.5">Less than 0.5 km</option>
                <option value="1">Less than 1 km</option>
                <option value="2">Less than 2 km</option>
                <option value="5">Less than 5 km</option>
                <option value="10">Less than 10 km</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                name="sort_by"
                value={filters.sort_by}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity.id}`}
                    value={amenity.id}
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity.id}`} className="ml-2 flex items-center text-sm text-gray-700">
                    <span className="mr-1">{amenity.icon}</span>
                    {amenity.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Search results */}
      <div className="mb-6">
        <p className="text-gray-600">{loading ? "Searching..." : `${totalResults} results found`}</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : hostels.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any hostels matching your criteria. Try adjusting your search or filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <MapView hostels={hostels} />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${
                page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  page === i + 1 ? "bg-teal-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-300`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Search
