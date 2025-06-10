import { useState } from 'react';
import { Filter, X, MapPin, DollarSign, Users, Wifi, Car, Utensils, Dumbbell, Shield } from 'lucide-react';

const AdvancedSearchFilters = ({ filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const amenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'meals', label: 'Meals Included', icon: Utensils },
    { id: 'gym', label: 'Gym/Fitness', icon: Dumbbell },
    { id: 'security', label: '24/7 Security', icon: Shield },
    { id: 'laundry', label: 'Laundry', icon: Users },
  ];

  const roomTypes = [
    { id: 'single', label: 'Single Room' },
    { id: 'shared', label: 'Shared Room' },
    { id: 'studio', label: 'Studio' },
    { id: 'apartment', label: 'Apartment' },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleAmenityToggle = (amenityId) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    handleFilterChange('amenities', newAmenities);
  };

  const handleRoomTypeToggle = (roomType) => {
    const currentTypes = localFilters.roomTypes || [];
    const newTypes = currentTypes.includes(roomType)
      ? currentTypes.filter(type => type !== roomType)
      : [...currentTypes, roomType];
    handleFilterChange('roomTypes', newTypes);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 2000],
      distance: 10,
      rating: 0,
      amenities: [],
      roomTypes: [],
      availability: '',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Filter className="mr-2" size={20} />
              Advanced Filters
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline mr-1" size={16} />
                Price Range (per month)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.priceRange?.[0] || ''}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, localFilters.priceRange?.[1] || 2000])}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.priceRange?.[1] || ''}
                  onChange={(e) => handleFilterChange('priceRange', [localFilters.priceRange?.[0] || 0, parseInt(e.target.value) || 2000])}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Distance from University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline mr-1" size={16} />
                Distance from University: {localFilters.distance || 10} km
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={localFilters.distance || 10}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 km</span>
                <span>50 km</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', rating)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      (localFilters.rating || 0) >= rating
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Room Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roomTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleRoomTypeToggle(type.id)}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      (localFilters.roomTypes || []).includes(type.id)
                        ? 'bg-teal-100 border-teal-500 text-teal-700 dark:bg-teal-900 dark:border-teal-400 dark:text-teal-300'
                        : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <button
                      key={amenity.id}
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm border ${
                        (localFilters.amenities || []).includes(amenity.id)
                          ? 'bg-teal-100 border-teal-500 text-teal-700 dark:bg-teal-900 dark:border-teal-400 dark:text-teal-300'
                          : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <Icon size={16} className="mr-2" />
                      {amenity.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Availability
              </label>
              <select
                value={localFilters.availability || ''}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Any time</option>
                <option value="immediate">Available now</option>
                <option value="next-month">Next month</option>
                <option value="next-semester">Next semester</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Clear All
            </button>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchFilters;