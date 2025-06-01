import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import SmartBookingCalendar from '../components/SmartBookingCalendar';
import PaymentSystem from '../components/PaymentSystem';

const EnhancedBooking = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    roomType: '',
    totalPrice: 0,
    duration: 0,
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const steps = [
    { id: 1, name: 'Select Dates', icon: Calendar },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Confirmation', icon: CheckCircle },
  ];

  useEffect(() => {
    fetchHostelDetails();
  }, [hostelId]);

  const fetchHostelDetails = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockHostel = {
      id: hostelId,
      name: "University Heights Residence",
      location: "123 Campus Drive, University District",
      description: "Modern student accommodation with excellent facilities",
      images: ["/api/placeholder/600/400"],
      amenities: ["WiFi", "Gym", "Laundry", "Study Room", "24/7 Security"],
      rating: 4.8,
      reviews: 156,
      basePrice: 850,
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "No pets allowed",
        smoking: "Non-smoking property"
      }
    };
    
    setHostel(mockHostel);
    setLoading(false);
  };

  const handleDateSelect = (dates) => {
    setBookingData(prev => ({
      ...prev,
      ...dates
    }));
  };

  const handleBookingCreate = (booking) => {
    setBookingData(booking);
    setCurrentStep(2);
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentSuccess(true);
    setCurrentStep(3);
    
    // In a real app, you would save the booking to the backend
    console.log('Booking completed:', { ...bookingData, payment: paymentData });
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Handle payment error (show notification, etc.)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Hostel Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The hostel you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/hostels')}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Browse Hostels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Book Your Stay
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {hostel.name}
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-4 md:mt-0">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isActive ? 'text-teal-600' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-px bg-gray-300 mx-4"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <SmartBookingCalendar
                hostelId={hostelId}
                onDateSelect={handleDateSelect}
                onBookingCreate={handleBookingCreate}
              />
            )}

            {currentStep === 2 && (
              <PaymentSystem
                booking={{
                  id: `booking_${Date.now()}`,
                  hostelName: hostel.name,
                  ...bookingData,
                }}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}

            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your reservation has been successfully confirmed. You'll receive a confirmation email shortly.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Booking Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                      <span className="font-medium">#{Date.now()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                      <span className="font-medium">
                        {bookingData.checkIn?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                      <span className="font-medium">
                        {bookingData.checkOut?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium">{bookingData.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Room Type:</span>
                      <span className="font-medium">{bookingData.roomType}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid:</span>
                      <span className="text-teal-600">${bookingData.totalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/bookings')}
                    className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  >
                    View My Bookings
                  </button>
                  <button
                    onClick={() => navigate('/hostels')}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Browse More Hostels
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {hostel.name}
              </h3>
              
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Hostel Image</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="text-sm font-medium">{hostel.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                  <span className="text-sm font-medium">
                    ⭐ {hostel.rating} ({hostel.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
                  <span className="text-sm font-medium">${hostel.basePrice}/month</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hostel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Policies
                </h4>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <p>Check-in: {hostel.policies.checkIn}</p>
                  <p>Check-out: {hostel.policies.checkOut}</p>
                  <p>{hostel.policies.cancellation}</p>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-green-600 mr-2" size={16} />
                  <span className="text-sm text-green-800 dark:text-green-400 font-medium">
                    Secure Booking
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                  Your payment is protected and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBooking;