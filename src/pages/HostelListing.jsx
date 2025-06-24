"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { API_URL } from "../config"
import HostelCard from "../components/HostelCard"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

const HostelListing = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState([])
  const [locations, setLocations] = useState([])
  const [filters, setFilters] = useState({
    university: searchParams.get("university") || "",
    location: searchParams.get("location") || "",
    gender_type: searchParams.get("gender_type") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    amenities: searchParams.getAll("amenities") || [],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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
        // Set fallback data
        setUniversities([])
        setLocations([])
      }
    }

    fetchFiltersData()
  }, [])

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true)
      try {
        // Build query params
        const params = new URLSearchParams()
        params.append("page", page.toString())

        if (filters.university) params.append("university", filters.university)
        if (filters.location) params.append("location", filters.location)
        if (filters.gender_type) params.append("gender_type", filters.gender_type)
        if (filters.min_price) params.append("min_price", filters.min_price)
        if (filters.max_price) params.append("max_price", filters.max_price)
        filters.amenities.forEach((amenity) => params.append("amenities", amenity))

        const response = await fetch(`${API_URL}/hostels/?${params.toString()}`)
        const data = await response.json()

        setHostels(data.results)
        setTotalPages(Math.ceil(data.count / 12)) // Assuming 12 items per page
      } catch (error) {
        console.error("Error fetching hostels:", error)
        // Set empty array on error
        setHostels([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }

    fetchHostels()
  }, [filters, page])

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

  const applyFilters = () => {
    // Update URL with filters
    const params = new URLSearchParams()

    if (filters.university) params.append("university", filters.university)
    if (filters.location) params.append("location", filters.location)
    if (filters.gender_type) params.append("gender_type", filters.gender_type)
    if (filters.min_price) params.append("min_price", filters.min_price)
    if (filters.max_price) params.append("max_price", filters.max_price)
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
      amenities: [],
    })
    setSearchParams({})
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Hostel</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          {showFilters ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
        </button>
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
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {["WiFi", "TV", "Kitchen", "Bathroom", "Study Room", "Laundry", "Security", "Water", "Electricity"].map(
                (amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      value={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ),
              )}
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
              onClick={applyFilters}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : hostels.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any hostels matching your criteria. Try adjusting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
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
        </>
      )}
    </div>
  )
}

export default HostelListing
