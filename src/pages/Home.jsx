"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, School, Users, Building, ArrowRight, Star, TrendingUp, Shield, Clock, Heart, Zap, CheckCircle, Award, Globe } from "lucide-react"
import { API_URL, APP_NAME, APP_DESCRIPTION } from "../config"
import HostelCard from "../components/HostelCard"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"

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

        let hostelsData = [];
        let universitiesData = [];

        if (hostelsResponse.ok) {
          hostelsData = await hostelsResponse.json();
        } else {
          // Fallback data for hostels
          hostelsData = [
            {
              id: 1,
              name: "UniStay Premium Hostel",
              location: "East Legon, Accra",
              price: 1200,
              rating: 4.8,
              image_url: "/placeholder-hostel.jpg",
              university_name: "University of Ghana",
              distance_to_university: 0.5
            },
            {
              id: 2,
              name: "Campus View Residence",
              location: "Kumasi",
              price: 1000,
              rating: 4.6,
              image_url: "/placeholder-hostel.jpg",
              university_name: "KNUST",
              distance_to_university: 0.3
            }
          ];
        }

        if (universitiesResponse.ok) {
          universitiesData = await universitiesResponse.json();
        } else {
          // Fallback data for universities
          universitiesData = [
            {
              id: 1,
              name: "University of Ghana",
              location: "Accra",
              hostel_count: 25
            },
            {
              id: 2,
              name: "KNUST",
              location: "Kumasi",
              hostel_count: 18
            },
            {
              id: 3,
              name: "University of Cape Coast",
              location: "Cape Coast",
              hostel_count: 12
            }
          ];
        }

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
          </div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                4.8/5 Rating
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                15,000+ Students
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                <Building className="h-4 w-4 mr-2" />
                500+ Hostels
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Find Your</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Perfect Home</span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
              Discover verified student accommodations across Ghana.
              <span className="block mt-2 text-xl text-gray-400">Safe, affordable, and hassle-free booking.</span>
            </p>
            
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    <Input
                      type="text"
                      placeholder="Search by university, location, or hostel name..."
                      className="w-full pl-16 h-16 border-0 text-white text-xl bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-16 px-12 rounded-2xl font-bold text-xl"
                  >
                    Search Now
                  </Button>
                </div>
              </div>
            </form>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/hostels">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 h-16 px-12 rounded-2xl font-bold text-xl">
                  Browse Hostels
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/list-property">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 h-16 px-12 rounded-2xl font-bold text-xl">
                  List Property
                  <Building className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Verified Hostels</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">15K+</div>
              <div className="text-gray-600 font-medium">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">4.8⭐</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Why Choose UniStay?</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              The smartest way to find your perfect student accommodation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-0">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Verified</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every hostel is thoroughly verified for safety, quality, and authenticity
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-0">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Book your room in minutes with our secure, streamlined process
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-0">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Round-the-clock assistance for all your accommodation needs
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Popular Universities</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Find hostels near Ghana's top universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.slice(0, 6).map((university) => (
              <Link key={university.id} to={`/search?university=${university.id}`}>
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                      <School className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold">{university.name}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <p>{university.location}</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    {university.hostel_count} hostels available
                  </Badge>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Featured Hostels</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Top-rated accommodations chosen by students
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Find Your Home?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of students who found their perfect accommodation
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/hostels">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 h-16 px-12 rounded-2xl font-bold text-xl">
                Start Searching
                <Search className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/list-property">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 h-16 px-12 rounded-2xl font-bold text-xl">
                List Your Property
                <Building className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
