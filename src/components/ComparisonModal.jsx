import { useState, useEffect } from 'react';
import { X, Check, Star, MapPin, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { hostelService } from '../services/api';

const ComparisonModal = ({ hostels = [], onClose }) => {
  const { t } = useLanguage();
  const [hostelDetails, setHostelDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch full details for each hostel
  useEffect(() => {
    const fetchHostelDetails = async () => {
      setLoading(true);
      try {
        const detailsPromises = hostels.map(hostel => 
          hostelService.getById(hostel.id)
        );
        const details = await Promise.all(detailsPromises);
        setHostelDetails(details);
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hostels.length > 0) {
      fetchHostelDetails();
    }
  }, [hostels]);

  // All possible amenities across all hostels
  const allAmenities = [...new Set(
    hostelDetails.flatMap(hostel => hostel.amenities || [])
  )].sort();

  // All possible room types across all hostels
  const allRoomTypes = [...new Set(
    hostelDetails.flatMap(hostel => hostel.room_types || [])
  )].sort();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('comparison.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                  {t('comparison.feature')}
                </th>
                {hostelDetails.map(hostel => (
                  <th 
                    key={hostel.id} 
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {hostel.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Images */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.image')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4">
                    {hostel.images && hostel.images.length > 0 ? (
                      <img 
                        src={hostel.images[0]} 
                        alt={hostel.name} 
                        className="h-24 w-32 object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-24 w-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {t('comparison.noImage')}
                        </span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.price')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                      ${hostel.price_per_night} / {t('comparison.night')}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.rating')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {hostel.rating} / 5
                    </div>
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.location')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-teal-600 dark:text-teal-400" />
                      <span>{hostel.address}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Available Rooms */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.availableRooms')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                      {hostel.available_rooms} / {hostel.total_rooms}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Room Types */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.roomTypes')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-wrap gap-1">
                      {hostel.room_types && hostel.room_types.map(type => (
                        <span 
                          key={type} 
                          className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Amenities */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {t('comparison.amenities')}
                </td>
                {hostelDetails.map(hostel => (
                  <td key={hostel.id} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-wrap gap-1">
                      {hostel.amenities && hostel.amenities.map(amenity => (
                        <span 
                          key={amenity} 
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Amenities Comparison */}
              {allAmenities.map(amenity => (
                <tr key={amenity}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {amenity}
                  </td>
                  {hostelDetails.map(hostel => (
                    <td key={hostel.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {hostel.amenities && hostel.amenities.includes(amenity) ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {t('comparison.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;