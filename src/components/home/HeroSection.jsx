import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hostels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularSearches = [
    "University of Ghana",
    "KNUST",
    "UCC",
    "Central Accra",
    "Near Campus"
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-br from-ghana-600 via-ghana-800 to-ghana-900 h-full w-full" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-gold-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gold-400 rounded-full animate-pulse delay-500" />
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-gold-400 fill-current" />
              <span className="text-sm font-medium">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-sm font-medium">15,000+ Students</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-slide-up drop-shadow-lg">
            Find Your Perfect
            <span className="block text-gold-400 drop-shadow-lg">Student Home</span>
            in Ghana
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200 drop-shadow">
            Discover verified student accommodations near universities across Ghana.&nbsp;
            <span className="text-white/90">Safe, affordable, and hassle-free booking.</span>
          </p>
          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8 animate-slide-up delay-300"
          >
            <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by university, location, or hostel name..."
                    className="w-full pl-12 h-14 border-0 text-gray-800 text-lg bg-transparent focus:ring-0 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-ghana-600 hover:bg-ghana-700 text-white h-14 px-8 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" /> 
                  Search Hostels
                </Button>
              </div>
            </div>
          </form>
          <div className="animate-slide-up delay-400">
            <p className="text-sm opacity-90 mb-4 mt-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 animate-slide-up delay-500">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-ghana-700 h-12 px-8 rounded-xl font-semibold transition-all duration-200"
              onClick={() => navigate("/hostels")}
            >
              Browse All Hostels
            </Button>
            <Button 
              size="lg"
              className="bg-gold-400 hover:bg-gold-500 text-ghana-800 h-12 px-8 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => navigate("/dashboard")}
            >
              List Your Property
            </Button>
            <Button 
              size="lg"
              className="bg-ghana-600 hover:bg-ghana-700 text-white h-12 px-8 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center bg-white/10">
          <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;