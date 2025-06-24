import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Akosua Mensah",
      university: "University of Ghana",
      course: "Computer Science",
      rating: 5,
      content: "UniStay completely transformed my university experience! I found an amazing hostel just 5 minutes from campus. The booking process was seamless, and the support team was incredibly helpful throughout.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      highlight: "Seamless booking process"
    },
    {
      name: "Kwame Asante",
      university: "KNUST",
      course: "Engineering",
      rating: 5,
      content: "As a first-year student, finding safe and affordable accommodation was my biggest worry. UniStay's verified hostels gave me and my parents complete peace of mind. The quality exceeded our expectations!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      highlight: "Safe & verified properties"
    },
    {
      name: "Ama Osei",
      university: "University of Cape Coast",
      course: "Business Administration",
      rating: 5,
      content: "The variety of options on UniStay is incredible! I found a hostel that perfectly fit my budget with all the amenities I needed. The photos and descriptions were 100% accurate. Highly recommend!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      highlight: "Perfect budget match"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-48 h-48 bg-ghana-600 rounded-full" />
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-gold-400 rounded-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 bg-ghana-100 text-ghana-800 text-sm px-4 py-2">
            Student Reviews
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            What Students Say About Us
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Real experiences from students who found their perfect home through UniStay
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-xl bg-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-ghana-100 to-transparent rounded-bl-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none z-0"></div>
              <CardContent className="p-10 relative z-10">
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-ghana-600 to-ghana-700 rounded-2xl flex items-center justify-center z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Quote className="h-8 w-8 text-white" />
                </div>
                <div className="flex justify-end mb-8">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-full shadow-md">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-10 italic leading-relaxed text-xl font-medium">
                  "{testimonial.content}"
                </p>
                <div className="mb-8">
                  <Badge variant="outline" className="bg-ghana-50 text-ghana-700 border-ghana-200 px-3 py-1 text-sm font-semibold">
                    {testimonial.highlight}
                  </Badge>
                </div>
                <div className="flex items-center gap-5">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <div className="font-bold text-xl text-gray-900 mb-1">{testimonial.name}</div>
                    <div className="text-ghana-600 font-semibold text-lg mb-1">{testimonial.course}</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {testimonial.university}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-lg text-gray-700 font-semibold">Trusted by students from:</div>
              <div className="flex flex-wrap justify-center gap-8 text-base font-bold text-ghana-700">
                <span className="hover:text-ghana-800 transition-colors cursor-pointer">University of Ghana</span>
                <span className="hover:text-ghana-800 transition-colors cursor-pointer">KNUST</span>
                <span className="hover:text-ghana-800 transition-colors cursor-pointer">University of Cape Coast</span>
                <span className="hover:text-ghana-800 transition-colors cursor-pointer">GIMPA</span>
                <span className="hover:text-ghana-800 transition-colors cursor-pointer">Ashesi University</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;