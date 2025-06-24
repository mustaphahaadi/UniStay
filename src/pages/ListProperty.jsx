import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building, Camera, MapPin, DollarSign, Users, Wifi, Car, Coffee, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const ListProperty = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyName: '',
    description: '',
    address: '',
    city: '',
    region: '',
    totalRooms: '',
    priceRange: '',
    amenities: [],
    images: [],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    businessLicense: null
  })

  const steps = [
    { id: 1, name: 'Property Details', icon: Building },
    { id: 2, name: 'Amenities & Photos', icon: Camera },
    { id: 3, name: 'Pricing & Contact', icon: DollarSign },
    { id: 4, name: 'Review & Submit', icon: CheckCircle }
  ]

  const propertyTypes = [
    { id: 'hostel', name: 'Student Hostel', description: 'Traditional hostel accommodation' },
    { id: 'apartment', name: 'Student Apartment', description: 'Private apartment units' },
    { id: 'dormitory', name: 'University Dormitory', description: 'On-campus housing' },
    { id: 'homestay', name: 'Homestay', description: 'Family-style accommodation' }
  ]

  const amenitiesList = [
    { id: 'wifi', name: 'Free WiFi', icon: Wifi },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'kitchen', name: 'Kitchen Access', icon: Coffee },
    { id: 'security', name: '24/7 Security', icon: Shield },
    { id: 'laundry', name: 'Laundry Service', icon: Building },
    { id: 'gym', name: 'Gym/Fitness', icon: Users },
    { id: 'study', name: 'Study Rooms', icon: Building },
    { id: 'cleaning', name: 'Cleaning Service', icon: Building }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }))
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    alert('Property listing submitted for review!')
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Property</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of property owners earning with UniStay. List your student accommodation and start hosting today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-cyan-600 border-cyan-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-cyan-600' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Property Details */}
          {currentStep === 1 && (
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
                
                <div className="space-y-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {propertyTypes.map(type => (
                        <div
                          key={type.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.propertyType === type.id
                              ? 'border-cyan-600 bg-cyan-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('propertyType', type.id)}
                        >
                          <h3 className="font-semibold text-gray-900">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., University Heights Residence"
                      value={formData.propertyName}
                      onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Describe your property, its unique features, and what makes it special for students..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="123 Campus Drive"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Accra"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        value={formData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                      >
                        <option value="">Select Region</option>
                        <option value="greater-accra">Greater Accra</option>
                        <option value="ashanti">Ashanti</option>
                        <option value="western">Western</option>
                        <option value="central">Central</option>
                        <option value="eastern">Eastern</option>
                        <option value="northern">Northern</option>
                      </select>
                    </div>
                  </div>

                  {/* Total Rooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Number of Rooms</label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., 50"
                      value={formData.totalRooms}
                      onChange={(e) => handleInputChange('totalRooms', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Amenities & Photos */}
          {currentStep === 2 && (
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Photos</h2>
                
                <div className="space-y-8">
                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Available Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amenitiesList.map(amenity => {
                        const Icon = amenity.icon
                        const isSelected = formData.amenities.includes(amenity.id)
                        
                        return (
                          <div
                            key={amenity.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                              isSelected
                                ? 'border-cyan-600 bg-cyan-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleAmenityToggle(amenity.id)}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-cyan-600' : 'text-gray-400'}`} />
                            <span className={`text-sm font-medium ${isSelected ? 'text-cyan-600' : 'text-gray-600'}`}>
                              {amenity.name}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Property Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Upload high-quality photos of your property</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 cursor-pointer"
                      >
                        Choose Photos
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload at least 5 photos. Maximum 20 photos, 5MB each.
                      </p>
                    </div>
                    
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">{formData.images.length} photos selected</p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.images.slice(0, 8).map((image, index) => (
                            <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">Photo {index + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Pricing & Contact */}
          {currentStep === 3 && (
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Contact Information</h2>
                
                <div className="space-y-6">
                  {/* Pricing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per month)</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={formData.priceRange}
                      onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    >
                      <option value="">Select Price Range</option>
                      <option value="500-800">₵500 - ₵800</option>
                      <option value="800-1200">₵800 - ₵1,200</option>
                      <option value="1200-1800">₵1,200 - ₵1,800</option>
                      <option value="1800-2500">₵1,800 - ₵2,500</option>
                      <option value="2500+">₵2,500+</option>
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Your full name"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="+233 20 123 4567"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    />
                  </div>

                  {/* Business License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business License (Optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      onChange={(e) => handleInputChange('businessLicense', e.target.files[0])}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload your business registration or operating license (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Property Name:</span>
                        <p className="text-gray-900">{formData.propertyName || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <p className="text-gray-900 capitalize">{formData.propertyType || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <p className="text-gray-900">{formData.city}, {formData.region}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Total Rooms:</span>
                        <p className="text-gray-900">{formData.totalRooms || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Price Range:</span>
                        <p className="text-gray-900">{formData.priceRange || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Amenities:</span>
                        <p className="text-gray-900">{formData.amenities.length} selected</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Your listing will be reviewed within 24-48 hours</li>
                      <li>• We may contact you for additional information</li>
                      <li>• Once approved, your property will be live on UniStay</li>
                      <li>• You'll receive booking notifications via email and SMS</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <Link to="/terms-of-service" className="text-cyan-600 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-cyan-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6"
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="px-6 gradient-primary text-white border-0"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="px-6 gradient-primary text-white border-0"
              >
                Submit Listing
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why List with UniStay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Maximize Revenue</h3>
                <p className="text-gray-600">Reach thousands of students and maintain high occupancy rates year-round.</p>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600">Get paid on time with our secure payment system and fraud protection.</p>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our dedicated support team is here to help you succeed every step of the way.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProperty