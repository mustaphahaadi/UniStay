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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-br from-ghana-600 via-ghana-700 to-ghana-900 h-full w-full" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-pulse" />
          <div className="absolute top-60 right-32 w-24 h-24 bg-gradient-to-br from-gold-400/30 to-transparent rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-white/15 to-transparent rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-60 right-1/3 w-36 h-36 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full animate-pulse delay-500" />
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 animate-fade-in">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Star className="h-5 w-5 text-gold-400 fill-current" />
              <span className="text-sm font-semibold">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <TrendingUp className="h-5 w-5 text-green-300" />
              <span className="text-sm font-semibold">15,000+ Students</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span className="text-sm font-semibold">500+ Hostels</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 animate-slide-up">
            <span className="block text-white drop-shadow-2xl">Find Your Perfect</span>
            <span className="block text-gold-400 drop-shadow-2xl bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">Student Home</span>
            <span className="block text-white/90 text-3xl md:text-4xl mt-2 font-semibold">in Ghana</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-10 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200">
            <span className="block mb-2">Discover verified student accommodations near universities across Ghana.</span>
            <span className="text-lg text-white/80">Safe, affordable, and hassle-free booking with 24/7 support.</span>
          </p>
          <form 
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto mb-10 animate-slide-up delay-300"
          >
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search by university, location, or hostel name..."
                    className="w-full pl-16 h-16 border-0 text-gray-800 text-lg bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-500 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-gradient-to-r from-ghana-600 to-ghana-700 hover:from-ghana-700 hover:to-ghana-800 text-white h-16 px-10 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
                >
                  <Search className="mr-3 h-6 w-6" /> 
                  Search Now
                </Button>
              </div>
            </div>
          </form>
          <div className="animate-slide-up delay-400">
            <p className="text-base opacity-90 mb-6 font-medium">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {popularSearches.map((search, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-white/25 backdrop-blur-sm text-white border border-white/30 hover:bg-white/35 cursor-pointer transition-all duration-300 hover:scale-110 px-4 py-2 text-sm font-semibold rounded-full"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16 animate-slide-up delay-500">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-ghana-700 h-14 px-10 rounded-2xl font-bold transition-all duration-300 hover:scale-105 text-lg backdrop-blur-sm"
              onClick={() => navigate("/hostels")}
            >
              Browse All Hostels
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-ghana-800 h-14 px-10 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
              onClick={() => navigate("/list-property")}
            >
              List Your Property
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-white/80 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;