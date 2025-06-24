import React from "react";
import { Building2, Users, MapPin, Shield, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-ghana-600 rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gold-400 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-ghana-300 rounded-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-ghana-100 text-ghana-800 text-sm px-4 py-2">Our Impact</Badge>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Trusted by Students Across Ghana
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who have found their perfect accommodation through our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-110 transition-all duration-500 p-10 rounded-3xl hover:shadow-2xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-gray-100 hover:border-ghana-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`w-24 h-24 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg relative z-10`}>
                <stat.icon className={`h-12 w-12 ${stat.color}`} />
              </div>
              <div className="text-5xl font-bold mb-4 text-gray-900 group-hover:text-ghana-600 transition-colors duration-300 relative z-10">
                {stat.number}
              </div>
              <div className="text-2xl font-bold mb-4 text-gray-800 relative z-10">{stat.label}</div>
              <div className="text-gray-600 text-lg leading-relaxed relative z-10">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;