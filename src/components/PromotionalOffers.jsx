"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { Tag, Clock, ChevronRight } from "lucide-react"

const PromotionalOffers = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${API_URL}/promotions/active/`)
        if (!response.ok) throw new Error("Failed to fetch offers")

        const data = await response.json()
        setOffers(data)
      } catch (error) {
        console.error("Error fetching promotional offers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  if (offers.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-teal-600" />
          Special Offers
        </h2>

        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{offer.title}</h3>
                  <p className="text-gray-600 mt-1">{offer.description}</p>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Valid until {new Date(offer.end_date).toLocaleDateString()}</span>
                  </div>

                  {offer.discount_code && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">Use code: </span>
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded font-mono">
                        {offer.discount_code}
                      </span>
                    </div>
                  )}
                </div>

                {offer.hostel_id && (
                  <Link
                    to={`/hostels/${offer.hostel_id}`}
                    className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    View Hostel
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromotionalOffers
