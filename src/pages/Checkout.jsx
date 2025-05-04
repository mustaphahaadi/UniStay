"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { CreditCard, Landmark, Smartphone, ChevronLeft, Shield } from "lucide-react"

const Checkout = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [installmentOption, setInstallmentOption] = useState("full")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    phoneNumber: "",
    provider: "mtn",
  })
  const [bankTransferDetails, setBankTransferDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [applyingDiscount, setApplyingDiscount] = useState(false)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Booking not found")
        }

        const data = await response.json()
        setBooking(data)
      } catch (error) {
        console.error("Error fetching booking details:", error)
        toast.error("Failed to load booking details")
        navigate("/dashboard/bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId, navigate])

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleMobileMoneyDetailsChange = (e) => {
    const { name, value } = e.target
    setMobileMoneyDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleBankTransferDetailsChange = (e) => {
    const { name, value } = e.target
    setBankTransferDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return

    setApplyingDiscount(true)
    try {
      const response = await fetch(`${API_URL}/discounts/apply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          booking_id: bookingId,
          discount_code: discountCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Invalid discount code")
      }

      setDiscount(data.discount_amount)
      toast.success(`Discount of ₵${data.discount_amount} applied!`)
    } catch (error) {
      console.error("Error applying discount:", error)
      toast.error(error.message || "Failed to apply discount code")
    } finally {
      setApplyingDiscount(false)
    }
  }

  const handleSubmitPayment = async (e) => {
    e.preventDefault()

    // Validate payment details based on selected method
    if (paymentMethod === "credit_card") {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        toast.error("Please fill in all card details")
        return
      }
    } else if (paymentMethod === "mobile_money") {
      if (!mobileMoneyDetails.phoneNumber || !mobileMoneyDetails.provider) {
        toast.error("Please fill in all mobile money details")
        return
      }
    } else if (paymentMethod === "bank_transfer") {
      if (!bankTransferDetails.accountName || !bankTransferDetails.accountNumber || !bankTransferDetails.bankName) {
        toast.error("Please fill in all bank transfer details")
        return
      }
    }

    setIsSubmitting(true)
    try {
      // In a real app, you would integrate with a payment gateway here
      // For this demo, we'll simulate a successful payment

      const response = await fetch(`${API_URL}/bookings/${bookingId}/payment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          payment_method: paymentMethod,
          installment_option: installmentOption,
          discount_code: discountCode || null,
          // Include payment details based on method
          ...(paymentMethod === "credit_card" && { card_details: cardDetails }),
          ...(paymentMethod === "mobile_money" && { mobile_money_details: mobileMoneyDetails }),
          ...(paymentMethod === "bank_transfer" && { bank_transfer_details: bankTransferDetails }),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Payment failed")
      }

      // Show success message and redirect
      toast.success("Payment successful!")
      navigate(`/dashboard/bookings/${bookingId}/confirmation`)
    } catch (error) {
      console.error("Payment error:", error)
      toast.error(error.message || "Payment failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateInstallmentAmount = () => {
    if (!booking) return 0

    const totalAmount = booking.total_price - discount

    switch (installmentOption) {
      case "full":
        return totalAmount
      case "two_installments":
        return totalAmount / 2
      case "three_installments":
        return totalAmount / 3
      default:
        return totalAmount
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/dashboard/bookings"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Back to Bookings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/dashboard/bookings" className="flex items-center text-teal-600 hover:text-teal-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Bookings
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${paymentMethod === "credit_card" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={() => setPaymentMethod("credit_card")}
                      className="sr-only"
                    />
                    <CreditCard className="h-8 w-8 mb-2 text-teal-600" />
                    <span className="font-medium">Credit Card</span>
                  </label>

                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${paymentMethod === "mobile_money" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile_money"
                      checked={paymentMethod === "mobile_money"}
                      onChange={() => setPaymentMethod("mobile_money")}
                      className="sr-only"
                    />
                    <Smartphone className="h-8 w-8 mb-2 text-teal-600" />
                    <span className="font-medium">Mobile Money</span>
                  </label>

                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${paymentMethod === "bank_transfer" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                      className="sr-only"
                    />
                    <Landmark className="h-8 w-8 mb-2 text-teal-600" />
                    <span className="font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6">Payment Options</h2>

              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${installmentOption === "full" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="installmentOption"
                      value="full"
                      checked={installmentOption === "full"}
                      onChange={() => setInstallmentOption("full")}
                      className="sr-only"
                    />
                    <span className="font-medium">Full Payment</span>
                    <span className="text-sm text-gray-500 mt-1">Pay once</span>
                  </label>

                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${installmentOption === "two_installments" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="installmentOption"
                      value="two_installments"
                      checked={installmentOption === "two_installments"}
                      onChange={() => setInstallmentOption("two_installments")}
                      className="sr-only"
                    />
                    <span className="font-medium">Two Installments</span>
                    <span className="text-sm text-gray-500 mt-1">Pay in 2 parts</span>
                  </label>

                  <label
                    className={`
                    border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${installmentOption === "three_installments" ? "border-teal-600 bg-teal-50" : "border-gray-200"}
                  `}
                  >
                    <input
                      type="radio"
                      name="installmentOption"
                      value="three_installments"
                      checked={installmentOption === "three_installments"}
                      onChange={() => setInstallmentOption("three_installments")}
                      className="sr-only"
                    />
                    <span className="font-medium">Three Installments</span>
                    <span className="text-sm text-gray-500 mt-1">Pay in 3 parts</span>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmitPayment}>
                {/* Credit Card Form */}
                {paymentMethod === "credit_card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={handleCardDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardDetailsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Money Form */}
                {paymentMethod === "mobile_money" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="0201234567"
                        value={mobileMoneyDetails.phoneNumber}
                        onChange={handleMobileMoneyDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                      <select
                        name="provider"
                        value={mobileMoneyDetails.provider}
                        onChange={handleMobileMoneyDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      >
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airtel">AirtelTigo Money</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {paymentMethod === "bank_transfer" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input
                        type="text"
                        name="accountName"
                        placeholder="John Doe"
                        value={bankTransferDetails.accountName}
                        onChange={handleBankTransferDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        placeholder="1234567890"
                        value={bankTransferDetails.accountNumber}
                        onChange={handleBankTransferDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <select
                        name="bankName"
                        value={bankTransferDetails.bankName}
                        onChange={handleBankTransferDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="ghana_commercial_bank">Ghana Commercial Bank</option>
                        <option value="ecobank">Ecobank</option>
                        <option value="stanbic">Stanbic Bank</option>
                        <option value="zenith">Zenith Bank</option>
                        <option value="access">Access Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-teal-600 text-white rounded-md font-medium ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"
                    } transition-colors`}
                  >
                    {isSubmitting ? "Processing..." : `Pay ₵${calculateInstallmentAmount().toFixed(2)}`}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Secure payment processed by UniStay Pay</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

              <div className="mb-4">
                <h3 className="font-medium">{booking.hostel_name}</h3>
                <p className="text-gray-600 text-sm">{booking.hostel_location}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Room {booking.room_number}</span>
                  <span>{booking.room_type}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Check-in</span>
                  <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Check-out</span>
                  <span>{new Date(booking.end_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Guests</span>
                  <span>{booking.guest_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Type</span>
                  <span className="capitalize">{booking.booking_type.replace("_", " ")}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₵{booking.total_price.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-₵{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₵{(booking.total_price - discount).toFixed(2)}</span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={applyingDiscount || !discountCode.trim()}
                    className={`px-4 py-2 bg-teal-600 text-white rounded-r-md ${
                      applyingDiscount || !discountCode.trim() ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"
                    } transition-colors`}
                  >
                    {applyingDiscount ? "Applying..." : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
