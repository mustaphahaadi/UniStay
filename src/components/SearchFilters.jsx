import { useState, useEffect } from 'react';
import { Sliders, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { universityService } from '../services/api';

const SearchFilters = ({ onFilterChange, initialFilters = {} }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: [],
    roomTypes: [],
    university: '',
    rating: 0,
    ...initialFilters
  });
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Available amenities
  const availableAmenities = [
    { id: 'wifi', label: t('filters.amenities.wifi') },
    { id: 'laundry', label: t('filters.amenities.laundry') },
    { id: 'kitchen', label: t('filters.amenities.kitchen') },
    { id: 'gym', label: t('filters.amenities.gym') },
    { id: 'study', label: t('filters.amenities.study') },
    { id: 'tv', label: t('filters.amenities.tv') },
    { id: 'parking', label: t('filters.amenities.parking') },
    { id: 'security', label: t('filters.amenities.security') },
  ];

  // Available room types
  const availableRoomTypes = [
    { id: 'single', label: t('filters.roomTypes.single') },
    { id: 'double', label: t('filters.roomTypes.double') },
    { id: 'shared', label: t('filters.roomTypes.shared') },
    { id: 'studio', label: t('filters.roomTypes.studio') },
    { id: 'ensuite', label: t('filters.roomTypes.ensuite') },
  ];

  // Fetch universities
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const data = await universityService.getAll();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    handleFilterChange('amenities', newAmenities);
  };

  // Handle room type toggle
  const handleRoomTypeToggle = (roomTypeId) => {
    const newRoomTypes = filters.roomTypes.includes(roomTypeId)
      ? filters.roomTypes.filter(id => id !== roomTypeId)
      : [...filters.roomTypes, roomTypeId];
    
    handleFilterChange('roomTypes', newRoomTypes);
  };

  // Reset filters
  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 1000],
      amenities: [],
      roomTypes: [],
      university: '',
      rating: 0
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      {/* Filter header */}
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Sliders className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('filters.title')}
          </h3>
        </div>
        <div className="flex items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              resetFilters();
            }}
            className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 mr-4"
          >
            {t('filters.reset')}
          </button>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>

      {/* Filter content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.priceRange')}
              </h4>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1]
                  ])}
                  className="w-24 mx-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <span className="text-gray-600 dark:text-gray-400 mx-2">to</span>
                <span className="text-gray-600 dark:text-gray-400">$</span>
                <input
                  type="number"
                  min={filters.priceRange[0]}
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [
                    filters.priceRange[0],
                    parseInt(e.target.value) || 0
                  ])}
                  className="w-24 mx-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* University */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.university')}
              </h4>
              <select
                value={filters.university}
                onChange={(e) => handleFilterChange('university', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">{t('filters.anyUniversity')}</option>
                {loading ? (
                  <option disabled>{t('filters.loading')}</option>
                ) : (
                  universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('filters.minRating')}
              </h4>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleFilterChange('rating', star)}
                    className={`h-8 w-8 flex items-center justify-center rounded-full mr-1 ${
                      filters.rating >= star
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-300'
                    }`}
                  >
                    {star}
                  </button>
                ))}
                {filters.rating > 0 && (
                  <button
                    onClick={() => handleFilterChange('rating', 0)}
                    className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('filters.amenities.title')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.amenities.includes(amenity.id)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {amenity.label}
                </button>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('filters.roomTypes.title')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableRoomTypes.map((roomType) => (
                <button
                  key={roomType.id}
                  onClick={() => handleRoomTypeToggle(roomType.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.roomTypes.includes(roomType.id)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {roomType.label}
                </button>
              ))}
            </div>
          </div>

          {/* Apply button for mobile */}
          <div className="mt-6 md:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              {t('filters.apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;