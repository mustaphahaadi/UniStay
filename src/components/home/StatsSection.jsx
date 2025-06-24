import React from "react";
import { Building2, Users, MapPin, Shield, Star, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      number: "500+",
      label: "Verified Hostels",
      description: "Quality accommodations across Ghana",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Users,
      number: "15,000+",
      label: "Happy Students",
      description: "Students who found their perfect home",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: MapPin,
      number: "25+",
      label: "Universities",
      description: "Universities and colleges covered",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Verified",
      description: "All hostels undergo safety checks",
      color: "text-gold-600",
      bgColor: "bg-gold-100"
    },
    {
      icon: Star,
      number: "4.8/5",
      label: "Average Rating",
      description: "From student reviews",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Success Rate",
      description: "Students find suitable accommodation",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Trusted by Students Across Ghana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have found their perfect accommodation through our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-all duration-300 p-8 rounded-2xl hover:shadow-xl bg-gray-50 hover:bg-white"
            >
              <div className={`w-20 h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold mb-2 text-gray-900 group-hover:text-ghana-600 transition-colors">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2 text-gray-800">{stat.label}</div>
              <div className="text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;