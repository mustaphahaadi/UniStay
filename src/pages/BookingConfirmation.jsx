import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Download, Calendar, MapPin, User, CreditCard, Share2, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

const BookingConfirmation = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch booking details
    const fetchBooking = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockBooking = {
        id: bookingId,
        confirmationNumber: `UNI${Date.now()}`,
        hostelName: "University Heights Residence",
        hostelAddress: "123 Campus Drive, University District",
        roomNumber: "A-204",
        roomType: "Single Room",
        checkIn: "2024-09-01",
        checkOut: "2024-12-15",
        duration: 105,
        totalPrice: 2850,
        paymentMethod: "Credit Card",
        guestName: "John Doe",
        guestEmail: "john.doe@university.edu",
        guestPhone: "+233 20 123 4567",
        amenities: ["WiFi", "Gym", "Laundry", "Study Room", "24/7 Security"],
        status: "confirmed",
        bookingDate: new Date().toISOString()
      }
      
      setBooking(mockBooking)
      setLoading(false)
    }

    fetchBooking()
  }, [bookingId])

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download would be implemented here')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'UniStay Booking Confirmation',
        text: `My booking at ${booking?.hostelName} has been confirmed!`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">The booking confirmation you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard/bookings')}>
              View My Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse-slow">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">Your reservation has been successfully processed</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confirmation Details */}
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Confirmation Details</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadReceipt}>
                      <Download className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Confirmation Number</label>
                      <p className="text-lg font-semibold text-cyan-600">{booking.confirmationNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Booking Date</label>
                      <p className="text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Amount</label>
                      <p className="text-2xl font-bold text-gray-900">₵{booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Method</label>
                      <p className="text-gray-900">{booking.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accommodation Details */}
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Accommodation Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-cyan-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{booking.hostelName}</h4>
                      <p className="text-gray-600">{booking.hostelAddress}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Room</label>
                        <p className="text-gray-900">{booking.roomNumber} - {booking.roomType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Duration</label>
                        <p className="text-gray-900">{booking.duration} days</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Check-in</label>
                        <p className="text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Check-out</label>
                        <p className="text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {booking.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Guest Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{booking.guestName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{booking.guestEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{booking.guestPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full gradient-primary text-white border-0" asChild>
                    <Link to="/dashboard/bookings">
                      <Calendar className="w-4 h-4 mr-2" />
                      View All Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/hostels/${booking.id}`}>
                      <MapPin className="w-4 h-4 mr-2" />
                      View Hostel
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Host
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">Check-in Instructions</p>
                    <p>Please arrive between 3:00 PM - 8:00 PM on your check-in date. Bring a valid ID and this confirmation.</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="font-medium text-amber-900 mb-1">Cancellation Policy</p>
                    <p>Free cancellation up to 24 hours before check-in. After that, the first night is non-refundable.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900 mb-1">Need Help?</p>
                    <p>Contact our 24/7 support team at support@unistay.com or +233 30 123 4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto mt-8 glass border-0 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Check Your Email</h4>
                <p className="text-sm text-gray-600">We've sent a detailed confirmation email with all the information you need.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Prepare for Check-in</h4>
                <p className="text-sm text-gray-600">Gather your documents and plan your arrival time for a smooth check-in process.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Enjoy Your Stay</h4>
                <p className="text-sm text-gray-600">Make yourself at home and don't hesitate to reach out if you need anything.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingConfirmation