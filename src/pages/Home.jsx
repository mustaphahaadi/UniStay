"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, School, Users, Building, ArrowRight, Star, TrendingUp } from "lucide-react"
import { API_URL, APP_NAME, APP_DESCRIPTION } from "../config"
import HostelCard from "../components/HostelCard"
import HeroSection from "../components/home/HeroSection"
import StatsSection from "../components/home/StatsSection"
import TestimonialsSection from "../components/home/TestimonialsSection"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const Home = () => {
  const [featuredHostels, setFeaturedHostels] = useState([])
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [hostelsResponse, universitiesResponse] = await Promise.all([
          fetch(`${API_URL}/hostels/featured/`).catch(err => {
            console.error("Error fetching hostels:", err);
            return { ok: false, status: 500 };
          }),
          fetch(`${API_URL}/universities/`).catch(err => {
            console.error("Error fetching universities:", err);
            return { ok: false, status: 500 };
          }),
        ]);

        if (!hostelsResponse.ok) {
          throw new Error('Failed to fetch featured hostels');
        }

        if (!universitiesResponse.ok) {
          throw new Error('Failed to fetch universities');
        }

        const hostelsData = await hostelsResponse.json();
        const universitiesData = await universitiesResponse.json();

        if (isMounted) {
          setFeaturedHostels(hostelsData);
          setUniversities(universitiesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Search & Filter</h3>
                <p className="text-gray-600 mb-6">
                  Use our advanced filters to find hostels by price, location, amenities, and more.
                </p>
                <Link to="/hostels">
                  <Button variant="outline" className="w-full">
                    Start Searching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Top Rated</h3>
                <p className="text-gray-600 mb-6">
                  Discover the highest-rated hostels based on real student reviews and experiences.
                </p>
                <Link to="/hostels?sort=rating">
                  <Button variant="outline" className="w-full">
                    View Top Rated
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Trending</h3>
                <p className="text-gray-600 mb-6">
                  See what's popular right now and discover hostels that students are booking.
                </p>
                <Link to="/hostels?featured=true">
                  <Button variant="outline" className="w-full">
                    View Trending
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Hostels</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover our most popular and highly-rated accommodations, carefully selected for quality and student satisfaction.
              </p>
            </div>
            <Link to="/hostels">
              <Button size="lg" className="bg-ghana-600 hover:bg-ghana-700 mt-6 md:mt-0">
                View All Hostels
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 dark:border-teal-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How UniStay Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Finding and booking your perfect student accommodation has never been easier with our simple 3-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-ghana-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-10 w-10 text-ghana-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Search & Compare</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through hundreds of verified hostels, compare prices, amenities, and read authentic student reviews to find your perfect match.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-ghana-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-10 w-10 text-ghana-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Book Securely</h3>
              <p className="text-gray-600 leading-relaxed">
                Reserve your preferred room with our secure booking system. Pay with Mobile Money, bank transfer, or flexible payment plans.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-ghana-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-ghana-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Move In</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your verification, get your access details, and enjoy your new home with 24/7 support and a vibrant student community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ghana-600 to-ghana-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Student Home?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal accommodation through UniStay. Start your search today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hostels">
                <Button 
                  size="lg"
                  className="bg-white text-ghana-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold"
                >
                  Browse Hostels
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-ghana-600 h-14 px-8 text-lg font-semibold"
              >
                List Your Property
                <Building className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
