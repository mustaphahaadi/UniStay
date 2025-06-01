import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

const SmartBookingCalendar = ({ hostelId, onDateSelect, onBookingCreate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
  const [availability, setAvailability] = useState({});
  const [pricing, setPricing] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookingMode, setBookingMode] = useState('checkIn'); // 'checkIn' or 'checkOut'
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchAvailabilityData();
  }, [currentDate, hostelId]);

  const fetchAvailabilityData = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockAvailability = {};
    const mockPricing = {};
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Simulate availability (random for demo)
      const availableRooms = Math.floor(Math.random() * 10) + 1;
      mockAvailability[dateKey] = {
        available: availableRooms,
        total: 15,
        status: availableRooms > 5 ? 'high' : availableRooms > 2 ? 'medium' : 'low'
      };
      
      // Simulate dynamic pricing
      const basePrice = 850;
      const weekendMultiplier = isWeekend ? 1.2 : 1;
      const demandMultiplier = availableRooms < 3 ? 1.3 : availableRooms < 6 ? 1.1 : 1;
      mockPricing[dateKey] = Math.round(basePrice * weekendMultiplier * demandMultiplier);
    }
    
    setAvailability(mockAvailability);
    setPricing(mockPricing);
    
    // Mock room types
    setRoomTypes([
      { id: 'single', name: 'Single Room', basePrice: 850, available: 5 },
      { id: 'shared', name: 'Shared Room', basePrice: 550, available: 8 },
      { id: 'studio', name: 'Studio', basePrice: 1200, available: 2 },
    ]);
    
    setLoading(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    
    const dateKey = date.toISOString().split('T')[0];
    const availabilityData = availability[dateKey];
    
    if (!availabilityData || availabilityData.available === 0) return;
    
    if (bookingMode === 'checkIn') {
      setSelectedDates({ checkIn: date, checkOut: null });
      setBookingMode('checkOut');
    } else {
      if (date <= selectedDates.checkIn) {
        setSelectedDates({ checkIn: date, checkOut: null });
      } else {
        setSelectedDates(prev => ({ ...prev, checkOut: date }));
        setBookingMode('checkIn');
        onDateSelect && onDateSelect({ checkIn: selectedDates.checkIn, checkOut: date });
      }
    }
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const { checkIn, checkOut } = selectedDates;
    
    if (checkIn && date.toDateString() === checkIn.toDateString()) return true;
    if (checkOut && date.toDateString() === checkOut.toDateString()) return true;
    if (checkIn && checkOut && date > checkIn && date < checkOut) return true;
    
    return false;
  };

  const isDateInRange = (date) => {
    if (!date) return false;
    const { checkIn, checkOut } = selectedDates;
    return checkIn && checkOut && date > checkIn && date < checkOut;
  };

  const getDateClassName = (date) => {
    if (!date) return 'invisible';
    
    const dateKey = date.toISOString().split('T')[0];
    const availabilityData = availability[dateKey];
    const isToday = date.toDateString() === new Date().toDateString();
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date);
    
    let className = 'relative p-2 text-center cursor-pointer transition-colors ';
    
    if (isPast) {
      className += 'text-gray-300 cursor-not-allowed ';
    } else if (isSelected) {
      className += 'bg-teal-600 text-white font-semibold ';
    } else if (isInRange) {
      className += 'bg-teal-100 text-teal-800 ';
    } else if (!availabilityData || availabilityData.available === 0) {
      className += 'text-gray-300 cursor-not-allowed ';
    } else {
      className += 'hover:bg-gray-100 dark:hover:bg-gray-700 ';
      
      if (availabilityData.status === 'low') {
        className += 'text-red-600 ';
      } else if (availabilityData.status === 'medium') {
        className += 'text-yellow-600 ';
      } else {
        className += 'text-green-600 ';
      }
    }
    
    if (isToday) {
      className += 'ring-2 ring-teal-500 ';
    }
    
    return className;
  };

  const calculateTotalPrice = () => {
    const { checkIn, checkOut } = selectedDates;
    if (!checkIn || !checkOut) return 0;
    
    let total = 0;
    for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      total += pricing[dateKey] || 0;
    }
    return total;
  };

  const getDaysBetween = () => {
    const { checkIn, checkOut } = selectedDates;
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Select Your Dates
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {bookingMode === 'checkIn' ? 'Choose your check-in date' : 'Choose your check-out date'}
        </p>
      </div>

      {/* Room Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Room Type
        </label>
        <select
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select room type</option>
          {roomTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - ${type.basePrice}/month ({type.available} available)
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((date, index) => {
          const dateKey = date?.toISOString().split('T')[0];
          const availabilityData = availability[dateKey];
          const price = pricing[dateKey];
          
          return (
            <div
              key={index}
              className={getDateClassName(date)}
              onClick={() => handleDateClick(date)}
            >
              {date && (
                <>
                  <div className="text-sm">{date.getDate()}</div>
                  {availabilityData && (
                    <div className="text-xs mt-1">
                      <div className="font-medium">${price}</div>
                      <div className={`text-xs ${
                        availabilityData.status === 'low' ? 'text-red-500' :
                        availabilityData.status === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {availabilityData.available} left
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span>High availability</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
          <span>Limited availability</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
          <span>Low availability</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedDates.checkIn && selectedDates.checkOut && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
              <span className="font-medium">{selectedDates.checkIn.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
              <span className="font-medium">{selectedDates.checkOut.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Duration:</span>
              <span className="font-medium">{getDaysBetween()} days</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span className="text-teal-600">${calculateTotalPrice()}</span>
            </div>
          </div>
          
          <button
            onClick={() => onBookingCreate && onBookingCreate({
              checkIn: selectedDates.checkIn,
              checkOut: selectedDates.checkOut,
              roomType: selectedRoomType,
              totalPrice: calculateTotalPrice(),
              duration: getDaysBetween()
            })}
            disabled={!selectedRoomType}
            className="w-full mt-6 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      )}

      {/* Smart Suggestions */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Smart Suggestions</h5>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• Book 2+ weeks in advance for 10% discount</li>
          <li>• Weekday rates are typically 20% lower</li>
          <li>• Consider flexible dates for better pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default SmartBookingCalendar;