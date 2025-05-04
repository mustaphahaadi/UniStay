import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Star, Calendar, Users, Wifi, Coffee, DollarSign, 
  Clock, Check, X, Share2, Heart, Camera, MessageCircle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNotification } from "../contexts/NotificationContext";
import { hostelService } from "../services/api";
import BookingCalendar from "../components/BookingCalendar";
import ContactHostButton from "../components/ContactHostButton";
import ReviewSystem from "../components/ReviewSystem";
import ReviewForm from "../components/ReviewForm";
import LocalServicesMap from "../components/LocalServicesMap";
import VirtualTour from "../components/VirtualTour";

const HostelDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success: showSuccess, error: showError } = useNotification();
  
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  // Fetch hostel details
  useEffect(() => {
    const fetchHostelDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await hostelService.getById(id);
        setHostel(data);
        
        // In a real app, you would fetch reviews separately
        // For now, we'll simulate some reviews
        setReviews([
          {
            id: 1,
            user_id: 1,
            hostel_id: data.id,
            rating: 4,
            comment: "Great location and facilities. Very clean and modern.",
            created_at: "2023-04-10T15:20:00Z",
            user: {
              firstName: "John",
              lastName: "Doe",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            }
          },
          {
            id: 2,
            user_id: 3,
            hostel_id: data.id,
            rating: 5,
            comment: "Excellent staff and amenities. Would definitely stay again!",
            created_at: "2023-04-15T09:10:00Z",
            user: {
              firstName: "Alex",
              lastName: "Johnson",
              avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            }
          },
        ]);
      } catch (err) {
        console.error("Error fetching hostel details:", err);
        setError(t("hostelDetails.errors.fetch"));
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id, t]);

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      showError(t("hostelDetails.errors.loginRequired"));
      return;
    }
    
    try {
      const success = await toggleFavorite(hostel.id);
      if (success) {
        showSuccess(
          isFavorite(hostel.id) 
            ? t("hostelDetails.removedFromFavorites") 
            : t("hostelDetails.addedToFavorites")
        );
      }
    } catch (err) {
      showError(t("hostelDetails.errors.favoriteToggle"));
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hostel.name,
        text: hostel.description,
        url: window.location.href,
      })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      showSuccess(t("hostelDetails.linkCopied"));
    }
  };

  // Handle new review submission
  const handleReviewSubmitted = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                {error || t("hostelDetails.errors.notFound")}
              </p>
              <div className="mt-4">
                <Link
                  to="/hostels"
                  className="text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-200"
                >
                  {t("hostelDetails.backToHostels")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare virtual tour images
  const tourImages = hostel.images ? hostel.images.map((url, index) => ({
    url,
    caption: `${hostel.name} - Image ${index + 1}`
  })) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              {t("hostelDetails.breadcrumbs.home")}
            </Link>
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-400 mx-2">/</span>
            <Link to="/hostels" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              {t("hostelDetails.breadcrumbs.hostels")}
            </Link>
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-400 mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{hostel.name}</span>
          </li>
        </ol>
      </nav>

      {/* Hostel header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {hostel.name}
          </h1>
          <div className="flex items-start text-gray-600 dark:text-gray-300 mb-2">
            <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-teal-600 dark:text-teal-400" />
            <p>{hostel.address}</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-medium">{hostel.rating}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({reviews.length} {t("hostelDetails.reviews")})
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <span className="text-teal-600 dark:text-teal-400 font-medium">
                {hostel.available_rooms}
              </span> / {hostel.total_rooms} {t("hostelDetails.roomsAvailable")}
            </div>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0">
          <button
            onClick={handleShare}
            className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 mr-2"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {t("hostelDetails.share")}
          </button>
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
              isFavorite(hostel.id)
                ? "border-red-300 text-red-700 dark:border-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite(hostel.id) ? "fill-red-500" : ""}`} />
            {isFavorite(hostel.id) ? t("hostelDetails.saved") : t("hostelDetails.save")}
          </button>
        </div>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          {hostel.images && hostel.images.length > 0 ? (
            <img
              src={hostel.images[activeImage]}
              alt={hostel.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                {t("hostelDetails.noImage")}
              </span>
            </div>
          )}
          <button
            onClick={() => setShowVirtualTour(true)}
            className="absolute bottom-4 right-4 flex items-center px-3 py-2 bg-black bg-opacity-70 hover:bg-opacity-80 text-white rounded-md"
          >
            <Camera className="h-4 w-4 mr-2" />
            {t("hostelDetails.virtualTour")}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {hostel.images && hostel.images.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className="relative cursor-pointer"
              onClick={() => setActiveImage(index + 1)}
            >
              <img
                src={image}
                alt={`${hostel.name} ${index + 2}`}
                className="w-full h-44 object-cover rounded-lg"
              />
              {index === 3 && hostel.images.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white font-medium">
                    +{hostel.images.length - 5} {t("hostelDetails.more")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Hostel details */}
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t("hostelDetails.about")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {hostel.description}
            </p>
            
            {/* Amenities */}
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              {t("hostelDetails.amenities")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {hostel.amenities && hostel.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <Check className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">{amenity}</span>
                </div>
              ))}
            </div>
            
            {/* Room types */}
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              {t("hostelDetails.roomTypes")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hostel.room_types && hostel.room_types.map((roomType) => (
                <div key={roomType} className="flex items-center">
                  <Users className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">{roomType}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t("hostelDetails.location")}
            </h2>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
              <LocalServicesMap
                location={hostel.location}
                name={hostel.name}
              />
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2">
                <strong>{t("hostelDetails.address")}:</strong> {hostel.address}
              </p>
              <p>
                <strong>{t("hostelDetails.nearbyServices")}:</strong> {t("hostelDetails.servicesDescription")}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t("hostelDetails.reviews")} ({reviews.length})
            </h2>
            
            {/* Review summary */}
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                <Star className="h-8 w-8 text-yellow-400 mr-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {hostel.rating}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/ 5</span>
              </div>
              <div className="flex-grow">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${(hostel.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("hostelDetails.basedOn")} {reviews.length} {t("hostelDetails.reviews")}
                </div>
              </div>
            </div>
            
            {/* Review form */}
            <ReviewForm
              hostelId={hostel.id}
              onReviewSubmitted={handleReviewSubmitted}
            />
            
            {/* Review list */}
            <ReviewSystem reviews={reviews} />
          </div>
        </div>

        {/* Right column - Booking and contact */}
        <div>
          {/* Price and booking */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${hostel.price_per_night}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  / {t("hostelDetails.night")}
                </span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium">{hostel.rating}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md mb-4"
            >
              {showBookingForm ? t("hostelDetails.hideBookingForm") : t("hostelDetails.checkAvailability")}
            </button>
            
            {showBookingForm && (
              <BookingCalendar
                hostelId={hostel.id}
                pricePerNight={hostel.price_per_night}
              />
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                {t("hostelDetails.quickFacts")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("hostelDetails.checkIn")}:</span> 2:00 PM
                    <br />
                    <span className="font-medium">{t("hostelDetails.checkOut")}:</span> 11:00 AM
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("hostelDetails.cancellation")}:</span>
                    <br />
                    {t("hostelDetails.freeCancellation")}
                  </div>
                </li>
                <li className="flex items-start">
                  <Wifi className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("hostelDetails.wifi")}:</span>
                    <br />
                    {t("hostelDetails.freeWifi")}
                  </div>
                </li>
                <li className="flex items-start">
                  <Coffee className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("hostelDetails.breakfast")}:</span>
                    <br />
                    {hostel.amenities && hostel.amenities.includes("Breakfast")
                      ? t("hostelDetails.breakfastIncluded")
                      : t("hostelDetails.breakfastNotIncluded")}
                  </div>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("hostelDetails.payment")}:</span>
                    <br />
                    {t("hostelDetails.paymentOptions")}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact host */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              {t("hostelDetails.contactHost")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("hostelDetails.questions")}
            </p>
            <ContactHostButton
              hostelId={hostel.id}
              hostelName={hostel.name}
            />
          </div>
        </div>
      </div>

      {/* Virtual tour modal */}
      {showVirtualTour && (
        <VirtualTour
          tourImages={tourImages}
          onClose={() => setShowVirtualTour(false)}
        />
      )}
    </div>
  );
};

export default HostelDetails;