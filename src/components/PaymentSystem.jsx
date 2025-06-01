import { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const PaymentSystem = ({ booking, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Shield },
    { id: 'bank', name: 'Bank Transfer', icon: CheckCircle },
  ];

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    const currentDate = new Date();
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiryDate > currentDate;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/\d{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardDetailsChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardDetails.name.trim()) {
        newErrors.name = 'Cardholder name is required';
      }
      if (!validateCardNumber(cardDetails.number)) {
        newErrors.number = 'Please enter a valid 16-digit card number';
      }
      if (!validateExpiry(cardDetails.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date';
      }
      if (!validateCVV(cardDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!billingAddress.street.trim()) {
        newErrors.street = 'Street address is required';
      }
      if (!billingAddress.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!billingAddress.zipCode.trim()) {
        newErrors.zipCode = 'ZIP code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        bookingId: booking.id,
        amount: booking.totalAmount,
        method: paymentMethod,
        cardLast4: paymentMethod === 'card' ? cardDetails.number.slice(-4) : null,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      onPaymentError(error.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Payment
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
            <span className="text-2xl font-bold text-teal-600">${booking.totalAmount}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {booking.hostelName} • {booking.duration}
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center p-3 border rounded-lg transition-colors ${
                  paymentMethod === method.id
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Icon size={20} className="mr-2" />
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => handleCardDetailsChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) => handleCardDetailsChange('number', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                errors.number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.number && (
              <p className="text-red-500 text-xs mt-1">{errors.number}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => handleCardDetailsChange('expiry', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiry && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                CVV
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => handleCardDetailsChange('cvv', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="border-t pt-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Billing Address
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                value={billingAddress.street}
                onChange={(e) => setBillingAddress(prev => ({ ...prev, street: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                  errors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Street Address"
              />
              {errors.street && (
                <p className="text-red-500 text-xs mt-1">{errors.street}</p>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={billingAddress.city}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                    errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="City"
                />
                <input
                  type="text"
                  value={billingAddress.zipCode}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="ZIP Code"
                />
              </div>
              {(errors.city || errors.zipCode) && (
                <div className="grid grid-cols-2 gap-3">
                  {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                  {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="text-center py-8">
          <Shield size={48} className="mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {/* Bank Transfer */}
      {paymentMethod === 'bank' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Bank Transfer Instructions
          </h4>
          <div className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
            <p><strong>Account Name:</strong> UniStay Ltd</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Routing Number:</strong> 987654321</p>
            <p><strong>Reference:</strong> {booking.id}</p>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <Shield size={20} className="text-green-600 mr-2" />
        <span className="text-sm text-green-800 dark:text-green-400">
          Your payment information is encrypted and secure
        </span>
      </div>

      {/* Payment Button */}
      <button
        onClick={processPayment}
        disabled={processing}
        className="w-full mt-6 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {processing ? (
          <>
            <Loader className="animate-spin mr-2" size={20} />
            Processing Payment...
          </>
        ) : (
          `Pay $${booking.totalAmount}`
        )}
      </button>
    </div>
  );
};

export default PaymentSystem;