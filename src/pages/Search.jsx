import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, MapPin, List, Map, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { hostelService } from "../services/api";
import HostelCard from "../components/HostelCard";
import MapView from "../components/MapView";
import SearchFilters from "../components/SearchFilters";
import ComparisonModal from "../components/ComparisonModal";

const Search = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [compareHostels, setCompareHostels] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  // Get search query from URL
  const query = searchParams.get("q") || "";
  const universityId = searchParams.get("university") || "";

  // Filters state
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: [],
    roomTypes: [],
    university: universityId,
    rating: 0,
  });

  // Fetch hostels on mount and when search params change
  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let results;
        
        if (query) {
          results = await hostelService.search(query);
        } else if (universityId) {
          // In a real app, you would have a dedicated API endpoint for this
          const allHostels = await hostelService.getAll();
          results = allHostels.filter(hostel => 
            hostel.university_id === parseInt(universityId)
          );
        } else {
          results = await hostelService.getAll();
        }
        
        setHostels(results);
        applyFilters(results, filters);
      } catch (err) {
        console.error("Error fetching hostels:", err);
        setError(t("search.errors.fetch"));
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, [query, universityId, t]);

  // Apply filters to hostels
  const applyFilters = (hostelsToFilter, currentFilters) => {
    const filtered = hostelsToFilter.filter(hostel => {
      // Price filter
      if (hostel.price_per_night < currentFilters.priceRange[0] || 
          hostel.price_per_night > currentFilters.priceRange[1]) {
        return false;
      }
      
      // University filter
      if (currentFilters.university && 
          hostel.university_id !== parseInt(currentFilters.university)) {
        return false;
      }
      
      // Rating filter
      if (currentFilters.rating > 0 && hostel.rating < currentFilters.rating) {
        return false;
      }
      
      // Amenities filter
      if (currentFilters.amenities.length > 0) {
        if (!hostel.amenities) return false;
        
        for (const amenity of currentFilters.amenities) {
          if (!hostel.amenities.includes(amenity)) {
            return false;
          }
        }
      }
      
      // Room types filter
      if (currentFilters.roomTypes.length > 0) {
        if (!hostel.room_types) return false;
        
        for (const roomType of currentFilters.roomTypes) {
          if (!hostel.room_types.includes(roomType)) {
            return false;
          }
        }
      }
      
      return true;
    });
    
    setFilteredHostels(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(hostels, newFilters);
    
    // Update URL with university filter
    if (newFilters.university !== filters.university) {
      const newSearchParams = new URLSearchParams(searchParams);
      
      if (newFilters.university) {
        newSearchParams.set("university", newFilters.university);
      } else {
        newSearchParams.delete("university");
      }
      
      setSearchParams(newSearchParams);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("search");
    
    const newSearchParams = new URLSearchParams();
    if (searchQuery) {
      newSearchParams.set("q", searchQuery);
    }
    
    setSearchParams(newSearchParams);
  };

  // Toggle hostel for comparison
  const toggleCompareHostel = (hostel) => {
    setCompareHostels(prev => {
      const isAlreadyAdded = prev.some(h => h.id === hostel.id);
      
      if (isAlreadyAdded) {
        return prev.filter(h => h.id !== hostel.id);
      } else {
        // Limit to 3 hostels for comparison
        if (prev.length >= 3) {
          return [...prev.slice(1), hostel];
        }
        return [...prev, hostel];
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {query ? t("search.resultsFor", { query }) : t("search.title")}
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              name="search"
              defaultValue={query}
              placeholder={t("search.placeholder")}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {t("search.button")}
          </button>
        </form>
      </div>

      {/* Filters and view toggles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t("search.filters")}
          </button>
          
          <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
            {filteredHostels.length} {t("search.results")}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label={t("search.listView")}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-md ml-2 ${
                viewMode === "map"
                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label={t("search.mapView")}
            >
              <Map className="h-5 w-5" />
            </button>
          </div>
          
          {compareHostels.length > 0 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {t("search.compare")} ({compareHostels.length})
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <SearchFilters
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <>
          {/* No results */}
          {filteredHostels.length === 0 && !loading && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t("search.noResults")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("search.tryAdjusting")}
              </p>
            </div>
          )}

          {/* List view */}
          {viewMode === "list" && filteredHostels.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHostels.map((hostel) => (
                <HostelCard 
                  key={hostel.id} 
                  hostel={hostel} 
                  onCompareToggle={() => toggleCompareHostel(hostel)}
                  isInCompare={compareHostels.some(h => h.id === hostel.id)}
                />
              ))}
            </div>
          )}

          {/* Map view */}
          {viewMode === "map" && filteredHostels.length > 0 && (
            <div className="h-[600px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <MapView 
                hostels={filteredHostels}
                onHostelSelect={(hostel) => {
                  // Handle hostel selection on map
                  console.log("Selected hostel:", hostel);
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Comparison modal */}
      {showComparisonModal && (
        <ComparisonModal
          hostels={compareHostels}
          onClose={() => setShowComparisonModal(false)}
        />
      )}
    </div>
  );
};

export default Search;