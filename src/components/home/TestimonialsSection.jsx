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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-ghana-100 text-ghana-800">
            Student Reviews
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            What Students Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from students who found their perfect home through UniStay
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ghana-100 to-transparent rounded-bl-full opacity-50 pointer-events-none z-0"></div>
              <CardContent className="p-8 relative z-10">
                <div className="absolute top-6 left-6 w-12 h-12 bg-ghana-600 rounded-full flex items-center justify-center z-10">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                <div className="flex justify-end mb-6">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full shadow">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                <div className="mb-6">
                  <Badge variant="outline" className="bg-ghana-50 text-ghana-700 border-ghana-200">
                    {testimonial.highlight}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
                    <div className="text-ghana-600 font-medium">{testimonial.course}</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {testimonial.university}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="text-sm text-gray-600">Trusted by students from:</div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
              <span>University of Ghana</span>
              <span>KNUST</span>
              <span>University of Cape Coast</span>
              <span>GIMPA</span>
              <span>Ashesi University</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;