import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, MapPin, Star, Heart } from 'lucide-react';
import HostelCard from './HostelCard';

const AIRecommendations = ({ userId, userPreferences, currentLocation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationType, setRecommendationType] = useState('personalized');

  const recommendationTypes = [
    { id: 'personalized', label: 'For You', icon: Brain, description: 'Based on your preferences' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, description: 'Popular this week' },
    { id: 'similar-users', label: 'Similar Students', icon: Users, description: 'Liked by students like you' },
    { id: 'nearby', label: 'Nearby', icon: MapPin, description: 'Close to your location' },
  ];

  useEffect(() => {
    generateRecommendations();
  }, [userId, recommendationType, userPreferences]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    try {
      // Simulate AI recommendation algorithm
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHostels = [
        {
          id: 1,
          name: "University Heights Residence",
          location: "Near Campus",
          price: 850,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          amenities: ["WiFi", "Gym", "Laundry"],
          distance: 0.5,
          matchScore: 95,
          reasons: ["Matches your budget", "Has preferred amenities", "Excellent reviews"]
        },
        {
          id: 2,
          name: "Student Village",
          location: "Downtown",
          price: 720,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          amenities: ["WiFi", "Study Room", "Parking"],
          distance: 1.2,
          matchScore: 88,
          reasons: ["Great value for money", "Study-friendly environment", "Good transport links"]
        },
        {
          id: 3,
          name: "Green Campus Lodge",
          location: "University District",
          price: 950,
          rating: 4.9,
          image: "/api/placeholder/300/200",
          amenities: ["WiFi", "Gym", "Meals", "Security"],
          distance: 0.8,
          matchScore: 92,
          reasons: ["Premium amenities", "Eco-friendly", "High safety rating"]
        },
      ];

      // Apply different recommendation logic based on type
      let filteredHostels = [...mockHostels];
      
      switch (recommendationType) {
        case 'personalized':
          filteredHostels = mockHostels.sort((a, b) => b.matchScore - a.matchScore);
          break;
        case 'trending':
          filteredHostels = mockHostels.sort((a, b) => b.rating - a.rating);
          break;
        case 'similar-users':
          filteredHostels = mockHostels.filter(h => h.rating >= 4.5);
          break;
        case 'nearby':
          filteredHostels = mockHostels.sort((a, b) => a.distance - b.distance);
          break;
      }

      setRecommendations(filteredHostels);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationInsights = () => {
    const insights = {
      personalized: {
        title: "Personalized for You",
        description: "Based on your search history, preferences, and similar students' choices",
        metrics: [
          { label: "Match Accuracy", value: "94%" },
          { label: "Preference Alignment", value: "89%" },
          { label: "Budget Compatibility", value: "96%" }
        ]
      },
      trending: {
        title: "Trending This Week",
        description: "Most viewed and booked accommodations by students",
        metrics: [
          { label: "Booking Rate", value: "78%" },
          { label: "View Increase", value: "+45%" },
          { label: "Student Interest", value: "High" }
        ]
      },
      'similar-users': {
        title: "Popular with Similar Students",
        description: "Accommodations chosen by students with similar profiles",
        metrics: [
          { label: "Similarity Score", value: "87%" },
          { label: "Satisfaction Rate", value: "92%" },
          { label: "Retention Rate", value: "85%" }
        ]
      },
      nearby: {
        title: "Near Your Location",
        description: "Closest accommodations to your current or preferred location",
        metrics: [
          { label: "Average Distance", value: "0.8 km" },
          { label: "Walking Time", value: "10 min" },
          { label: "Transport Access", value: "Excellent" }
        ]
      }
    };

    return insights[recommendationType] || insights.personalized;
  };

  const insights = getRecommendationInsights();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Brain className="text-teal-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Recommendations
          </h2>
        </div>

        {/* Recommendation Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {recommendationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setRecommendationType(type.id)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                  recommendationType === type.id
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {insights.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {insights.description}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {insights.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-teal-600">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Generating recommendations...
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((hostel, index) => (
            <div key={hostel.id} className="relative">
              {/* Match Score Badge */}
              {recommendationType === 'personalized' && (
                <div className="absolute top-2 right-2 z-10 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {hostel.matchScore}% Match
                </div>
              )}
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Image</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {hostel.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="text-sm font-medium">{hostel.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{hostel.location} • {hostel.distance} km away</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hostel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    {/* AI Reasons */}
                    {hostel.reasons && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Why we recommend this:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {hostel.reasons.map((reason, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-teal-600">
                        ${hostel.price}/month
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart size={18} />
                        </button>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Section */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          How are these recommendations?
        </h4>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
            👍 Helpful
          </button>
          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors">
            👎 Not relevant
          </button>
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
            💡 Suggest improvements
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;