"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, School, Users, Building } from "lucide-react"
import { API_URL, APP_NAME, APP_DESCRIPTION } from "../config"
import HostelCard from "../components/HostelCard"

const Home = () => {
  const [featuredHostels, setFeaturedHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostelsResponse, universitiesResponse] = await Promise.all([
          fetch(`${API_URL}/hostels/featured/`),
          fetch(`${API_URL}/universities/`),
        ])

        const hostelsData = await hostelsResponse.json()
        const universitiesData = await universitiesResponse.json()

        setFeaturedHostels(hostelsData)
        setUniversities(universitiesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    window.location.href = `/search?q=${searchQuery}`
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-teal-600 text-white dark:bg-gray-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Student Accommodation</h1>
            <p className="text-xl mb-8">{APP_DESCRIPTION}</p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for hostels by name, location, or university..."
                  className="w-full px-4 py-3 rounded-md text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-800 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-md font-medium transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/hostels"
                className="px-6 py-3 bg-white text-teal-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
              >
                Browse All Hostels
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-white hover:bg-teal-700 dark:hover:bg-gray-700 rounded-md font-medium transition-colors"
              >
                List Your Hostel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Popular Universities</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.slice(0, 6).map((university) => (
              <Link
                key={university.id}
                to={`/search?university=${university.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <School className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-3" />
                  <h3 className="text-xl font-semibold dark:text-white">{university.name}</h3>
                </div>
                <div className="flex items-start text-gray-600 dark:text-gray-300 mb-2">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{university.location}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  {university.hostel_count} hostels available
                </p>
              </Link>
            ))}
          </div>

          {universities.length > 6 && (
            <div className="text-center mt-8">
              <Link
                to="/search"
                className="inline-block px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-md font-medium transition-colors"
              >
                View All Universities
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-12 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Featured Hostels</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 dark:border-teal-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredHostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={hostel} />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to="/hostels"
                  className="inline-block px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-md font-medium transition-colors"
                >
                  View All Hostels
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Search</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search for hostels based on location, university proximity, amenities, and more.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 mb-4">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Book</h3>
              <p className="text-gray-600 dark:text-gray-300">
                View hostel details, check availability, and book your room securely online.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Move In</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive confirmation details and move into your new hostel with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-teal-600 dark:bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Hostel?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who have found their ideal accommodation through {APP_NAME}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-teal-600 hover:bg-gray-100 dark:bg-gray-200 dark:text-teal-700 dark:hover:bg-gray-100 rounded-md font-medium transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              to="/hostels"
              className="px-6 py-3 border border-white hover:bg-teal-700 dark:hover:bg-teal-600 rounded-md font-medium transition-colors"
            >
              Browse Hostels
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
