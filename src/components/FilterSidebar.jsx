import { useState } from 'react';

const FilterSidebar = ({
  onFilterChange,
  initialFilters = {
    priceRange: [0, 1000],
    amenities: [],
    roomTypes: [],
    rating: 0,
    distance: 5,
  },
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);

  const amenities = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'tv', label: 'TV' },
    { id: 'parking', label: 'Parking' },
    { id: 'security', label: '24/7 Security' },
    { id: 'study', label: 'Study Room' },
  ];

  const roomTypes = [
    { id: 'single', label: 'Single Room' },
    { id: 'double', label: 'Double Room' },
    { id: 'shared', label: 'Shared Room' },
    { id: 'suite', label: 'Suite' },
  ];

  const handlePriceChange = (value) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((id) => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRoomTypeToggle = (roomTypeId) => {
    const newRoomTypes = filters.roomTypes.includes(roomTypeId)
      ? filters.roomTypes.filter((id) => id !== roomTypeId)
      : [...filters.roomTypes, roomTypeId];
    
    const newFilters = { ...filters, roomTypes: newRoomTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDistanceChange = (distance) => {
    const newFilters = { ...filters, distance };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-40 bg-teal-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      {/* Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Price Range</h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange([filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Amenities</h3>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Room Types</h3>
            <div className="space-y-2">
              {roomTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={filters.roomTypes.includes(type.id)}
                    onChange={() => handleRoomTypeToggle(type.id)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Minimum Rating</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`p-2 rounded ${
                    filters.rating >= rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Distance from University (km)
            </h3>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="20"
                value={filters.distance}
                onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {filters.distance} km
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FilterSidebar; 