"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from "lucide-react"

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "How do I book a hostel?",
      answer:
        "To book a hostel, first create an account or log in. Browse available hostels, select one that meets your needs, and click on 'Book Now'. Follow the prompts to complete your booking, including selecting your room type and payment method.",
    },
    {
      id: 2,
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards (Visa, Mastercard), mobile money (MTN Mobile Money, Vodafone Cash, AirtelTigo Money), and bank transfers. All payments are secured and encrypted.",
    },
    {
      id: 3,
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking through your dashboard. Go to 'My Bookings', find the booking you wish to cancel, and click 'Cancel Booking'. Please note that cancellation policies vary by hostel, and some may charge a cancellation fee depending on how close to the check-in date you cancel.",
    },
    {
      id: 4,
      question: "How do I list my hostel on the platform?",
      answer:
        "To list your hostel, register as a hostel manager. Once your account is verified, you can add your hostel by clicking on 'Add Hostel' in your manager dashboard. Fill in all the required information, upload photos, and set your pricing and availability.",
    },
    {
      id: 5,
      question: "What are the fees for listing a hostel?",
      answer:
        "We charge a 5% commission on each booking made through our platform. There are no upfront fees or monthly subscriptions. You only pay when you receive bookings.",
    },
    {
      id: 6,
      question: "How do I contact a hostel owner?",
      answer:
        "You can contact a hostel owner through the messaging system on our platform. Navigate to the hostel's page and click on 'Contact Owner'. Your messages will be delivered to the owner, and they can respond directly to you.",
    },
    {
      id: 7,
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We do not share your information with third parties without your consent. For more details, please refer to our Privacy Policy.",
    },
    {
      id: 8,
      question: "What if I have issues during my stay?",
      answer:
        "If you encounter any issues during your stay, first contact the hostel management directly. If the issue remains unresolved, you can report it through our platform by going to your booking details and clicking 'Report an Issue'. Our customer support team will assist you.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Help Center</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-expanded={expandedFaq === faq.id}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                {expandedFaq === faq.id && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-gray-500 dark:text-gray-500">Try a different search term or browse all FAQs</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact options */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Still need help?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Chat with our support team in real-time</p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Start Chat
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Phone Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Call us directly for immediate assistance</p>
            <a
              href="tel:+233123456789"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              +233 12 345 6789
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Send us an email and we'll respond within 24 hours</p>
            <a
              href="mailto:support@ghanahostels.com"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
