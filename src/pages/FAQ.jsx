import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState(new Set())

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'booking', name: 'Booking & Reservations', icon: MessageCircle },
    { id: 'payment', name: 'Payments & Pricing', icon: Phone },
    { id: 'account', name: 'Account & Profile', icon: Mail },
    { id: 'property', name: 'Property Management', icon: HelpCircle },
    { id: 'support', name: 'Support & Policies', icon: MessageCircle }
  ]

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a room on UniStay?',
      answer: 'Booking a room is simple! Search for accommodations in your desired location, select your preferred dates, choose a room type, and complete the booking process with your payment information. You\'ll receive a confirmation email immediately after booking.'
    },
    {
      id: 2,
      category: 'booking',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking depending on the property\'s cancellation policy. Most properties offer free cancellation up to 24-48 hours before check-in. You can manage your bookings from your dashboard or contact our support team for assistance.'
    },
    {
      id: 3,
      category: 'booking',
      question: 'What happens if my booking is not confirmed?',
      answer: 'In rare cases where a booking cannot be confirmed, we\'ll notify you immediately and provide alternative accommodations or a full refund. Our team works 24/7 to ensure all bookings are processed smoothly.'
    },
    {
      id: 4,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), mobile money (MTN, Vodafone, AirtelTigo), bank transfers, and cash payments at select properties. All payments are processed securely through our encrypted payment system.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'Can I pay in installments?',
      answer: 'Yes! We offer flexible payment options including 2 or 3 installment plans for bookings over ₵1,000. The first installment is due at booking, with subsequent payments scheduled before your check-in date.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparent pricing. All fees including service charges, taxes, and any additional costs are clearly displayed before you complete your booking. The price you see is the price you pay.'
    },
    {
      id: 7,
      category: 'payment',
      question: 'How do refunds work?',
      answer: 'Refunds are processed according to the property\'s cancellation policy. Eligible refunds are typically processed within 5-7 business days to your original payment method. For mobile money payments, refunds may take 1-3 business days.'
    },
    {
      id: 8,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is free and easy! Click "Sign Up" on our homepage, provide your email address, create a password, and verify your email. You can also sign up using your Google or Facebook account for faster registration.'
    },
    {
      id: 9,
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. If you don\'t receive the email, check your spam folder.'
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Log into your account and go to "Profile Settings" in your dashboard. You can update your personal information, contact details, preferences, and profile photo. Remember to save your changes before leaving the page.'
    },
    {
      id: 11,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account at any time from your profile settings. Please note that this action is permanent and will remove all your booking history, saved properties, and personal data. Active bookings must be cancelled first.'
    },
    {
      id: 12,
      category: 'property',
      question: 'How do I list my property on UniStay?',
      answer: 'Property owners can list their accommodations by clicking "List Your Property" and completing our simple registration process. You\'ll need to provide property details, photos, pricing, and contact information. Our team reviews all listings within 24-48 hours.'
    },
    {
      id: 13,
      category: 'property',
      question: 'What are the requirements for listing a property?',
      answer: 'Properties must be safe, clean, and suitable for student accommodation. You\'ll need valid identification, property documentation, clear photos, and compliance with local regulations. We may conduct virtual or physical inspections for quality assurance.'
    },
    {
      id: 14,
      category: 'property',
      question: 'How much commission does UniStay charge?',
      answer: 'Our commission structure is competitive and transparent. We charge a percentage of each booking, which varies based on your subscription plan and booking volume. Contact our sales team for detailed pricing information.'
    },
    {
      id: 15,
      category: 'property',
      question: 'How do I manage bookings for my property?',
      answer: 'Use our property management dashboard to view bookings, update availability, communicate with guests, and track payments. You\'ll receive notifications for new bookings and can manage everything from your mobile device or computer.'
    },
    {
      id: 16,
      category: 'support',
      question: 'How can I contact customer support?',
      answer: 'Our support team is available 24/7 through multiple channels: live chat on our website, email at support@unistay.com, phone at +233 30 123 4567, or through the help section in your account dashboard.'
    },
    {
      id: 17,
      category: 'support',
      question: 'What is your privacy policy?',
      answer: 'We take your privacy seriously and comply with international data protection standards. Our privacy policy outlines how we collect, use, and protect your personal information. You can read the full policy on our website.'
    },
    {
      id: 18,
      category: 'support',
      question: 'Do you have a mobile app?',
      answer: 'Yes! Our mobile app is available for both iOS and Android devices. Download it from the App Store or Google Play Store to book accommodations, manage your account, and receive notifications on the go.'
    },
    {
      id: 19,
      category: 'support',
      question: 'What safety measures do you have in place?',
      answer: 'We verify all properties and hosts, use secure payment processing, provide 24/7 customer support, and have emergency contact procedures. All accommodations must meet our safety standards and local regulations.'
    },
    {
      id: 20,
      category: 'support',
      question: 'How do I report a problem with my accommodation?',
      answer: 'If you encounter any issues during your stay, contact us immediately through the app, website, or phone. We have a dedicated resolution team that works quickly to address problems and ensure your satisfaction.'
    }
  ]

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about UniStay. Can't find what you're looking for? Our support team is here to help.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass border-0 shadow-xl sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => {
                      const Icon = category.icon
                      const isActive = activeCategory === category.id
                      const count = category.id === 'all' 
                        ? faqs.length 
                        : faqs.filter(faq => faq.category === category.id).length
                      
                      return (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                            isActive
                              ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-3" />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-cyan-200 text-cyan-800' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {filteredFaqs.length === 0 ? (
                <Card className="glass border-0 shadow-xl">
                  <CardContent className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any questions matching your search. Try different keywords or browse by category.
                    </p>
                    <Button onClick={() => setSearchTerm('')} variant="outline">
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map(faq => {
                    const isExpanded = expandedItems.has(faq.id)
                    
                    return (
                      <Card key={faq.id} className="glass border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleExpanded(faq.id)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-gray-200 pt-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Still Need Help?
                </h2>
                <p className="text-lg text-gray-600">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                  <Button className="gradient-primary text-white border-0">
                    Start Chat
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
                  <Button variant="outline">
                    +233 30 123 4567
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-4">Send us a detailed message</p>
                  <Button variant="outline">
                    support@unistay.com
                  </Button>
                </div>
              </div>
              
              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Average response time: <span className="font-semibold text-gray-900">Under 2 hours</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FAQ