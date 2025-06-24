import { Link } from 'react-router-dom'
import { Users, Target, Heart, Shield, Star, Award, Globe, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

const About = () => {
  const stats = [
    { label: 'Students Served', value: '50,000+', icon: Users },
    { label: 'Partner Properties', value: '2,500+', icon: Shield },
    { label: 'Cities Covered', value: '15+', icon: Globe },
    { label: 'Average Rating', value: '4.8/5', icon: Star }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'We verify all accommodations and maintain strict safety standards to ensure peace of mind for our users.',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'We foster a supportive environment where students can connect, share experiences, and build lasting relationships.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously improve our platform to provide the best possible experience for students and hostel managers.',
      color: 'yellow'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from customer service to platform reliability and user experience.',
      color: 'green'
    }
  ]

  const team = [
    {
      name: 'Kwame Asante',
      role: 'CEO & Founder',
      bio: 'Former student who experienced the challenges of finding accommodation firsthand.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Ama Osei',
      role: 'CTO',
      bio: 'Tech enthusiast passionate about creating solutions that make a difference.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'David Mensah',
      role: 'Head of Operations',
      bio: 'Experienced in hospitality and student services with 10+ years in the industry.',
      image: '/api/placeholder/150/150'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">About UniStay</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-slide-up">
              Transforming student accommodation across Ghana, one booking at a time
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="glass border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-green-700 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Born from the real challenges students face in finding quality accommodation
            </p>
          </div>
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    UniStay was born from a simple observation: finding the right accommodation as a student can be overwhelming. 
                    We saw students struggling to find safe, affordable, and convenient places to stay near their universities.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    That's why we created UniStay - a platform that makes student housing simple, transparent, and accessible. 
                    Our mission is to ensure every student finds their perfect home away from home.
                  </p>
                </div>
                <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Our Story Image</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transforming the student housing experience across Ghana
            </p>
          </div>
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 text-xl leading-relaxed text-center mb-12">
                  We're on a mission to transform the student housing experience. We believe every student deserves:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Shield className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure Housing</h3>
                      <p className="text-gray-600">Verified accommodations that meet our strict safety standards</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Target className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                      <p className="text-gray-600">Clear, upfront pricing with no hidden fees or surprises</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Supportive Community</h3>
                      <p className="text-gray-600">Connect with fellow students and build lasting friendships</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Zap className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Modern Amenities</h3>
                      <p className="text-gray-600">Access to essential services and modern facilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="glass border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`w-8 h-8 text-${value.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals working to revolutionize student accommodation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="glass border-0 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-700 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us */}
        <section>
          <Card className="glass border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Community</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you're a student looking for accommodation or a hostel manager wanting to list your property,
                we'd love to have you join our growing community of over 50,000 students and 2,500+ properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary text-white border-0" asChild>
                  <Link to="/register">
                    Get Started as Student
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/list-property">
                    List Your Property
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Join thousands of satisfied students and property owners • Free to get started
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About; 