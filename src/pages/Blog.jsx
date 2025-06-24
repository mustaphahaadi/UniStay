import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Tag, ArrowRight, Search, TrendingUp, Clock, Eye } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'student-life', name: 'Student Life', count: 8 },
    { id: 'accommodation', name: 'Accommodation Tips', count: 6 },
    { id: 'university', name: 'University Guide', count: 5 },
    { id: 'finance', name: 'Student Finance', count: 3 },
    { id: 'news', name: 'UniStay News', count: 2 }
  ]

  const featuredPost = {
    id: 1,
    title: 'The Ultimate Guide to Student Accommodation in Ghana',
    excerpt: 'Everything you need to know about finding, booking, and settling into student accommodation in Ghana\'s major university cities.',
    content: 'Comprehensive guide covering all aspects of student housing...',
    author: 'Sarah Johnson',
    authorRole: 'Student Housing Expert',
    publishDate: '2024-02-15',
    readTime: '8 min read',
    category: 'accommodation',
    tags: ['accommodation', 'guide', 'ghana', 'students'],
    image: '/api/placeholder/800/400',
    views: 2847,
    featured: true
  }

  const blogPosts = [
    {
      id: 2,
      title: '10 Essential Items Every Student Should Pack for Hostel Life',
      excerpt: 'A comprehensive checklist of must-have items to make your hostel experience comfortable and convenient.',
      author: 'Michael Asante',
      authorRole: 'Student Advisor',
      publishDate: '2024-02-12',
      readTime: '5 min read',
      category: 'student-life',
      tags: ['packing', 'hostel', 'essentials'],
      image: '/api/placeholder/400/250',
      views: 1523
    },
    {
      id: 3,
      title: 'How to Budget for University Accommodation in 2024',
      excerpt: 'Smart budgeting tips and strategies to manage your accommodation expenses throughout your university years.',
      author: 'Grace Mensah',
      authorRole: 'Financial Advisor',
      publishDate: '2024-02-10',
      readTime: '6 min read',
      category: 'finance',
      tags: ['budget', 'finance', 'accommodation'],
      image: '/api/placeholder/400/250',
      views: 1876
    },
    {
      id: 4,
      title: 'Top 5 Universities in Accra and Their Best Nearby Hostels',
      excerpt: 'Discover the best student accommodations near Accra\'s top universities, with detailed reviews and pricing.',
      author: 'David Osei',
      authorRole: 'University Guide',
      publishDate: '2024-02-08',
      readTime: '7 min read',
      category: 'university',
      tags: ['accra', 'universities', 'hostels'],
      image: '/api/placeholder/400/250',
      views: 2134
    },
    {
      id: 5,
      title: 'Making Friends in Student Accommodation: A Social Guide',
      excerpt: 'Tips and strategies for building meaningful friendships and creating a supportive community in your hostel.',
      author: 'Ama Darko',
      authorRole: 'Student Life Coach',
      publishDate: '2024-02-05',
      readTime: '4 min read',
      category: 'student-life',
      tags: ['social', 'friends', 'community'],
      image: '/api/placeholder/400/250',
      views: 987
    },
    {
      id: 6,
      title: 'UniStay Launches New Mobile App with Enhanced Features',
      excerpt: 'Exciting new features including virtual tours, instant booking, and improved user experience now available.',
      author: 'UniStay Team',
      authorRole: 'Product Team',
      publishDate: '2024-02-03',
      readTime: '3 min read',
      category: 'news',
      tags: ['app', 'features', 'update'],
      image: '/api/placeholder/400/250',
      views: 1456
    },
    {
      id: 7,
      title: 'Safety Tips for Students Living Away from Home',
      excerpt: 'Essential safety guidelines and precautions every student should know when living in accommodation.',
      author: 'Inspector Kwame Asare',
      authorRole: 'Security Expert',
      publishDate: '2024-02-01',
      readTime: '6 min read',
      category: 'student-life',
      tags: ['safety', 'security', 'tips'],
      image: '/api/placeholder/400/250',
      views: 1789
    },
    {
      id: 8,
      title: 'Understanding Your Tenancy Agreement: A Student\'s Guide',
      excerpt: 'Everything you need to know about rental agreements, your rights, and responsibilities as a student tenant.',
      author: 'Lawyer Akosua Frimpong',
      authorRole: 'Legal Advisor',
      publishDate: '2024-01-29',
      readTime: '8 min read',
      category: 'accommodation',
      tags: ['legal', 'tenancy', 'rights'],
      image: '/api/placeholder/400/250',
      views: 1234
    },
    {
      id: 9,
      title: 'Healthy Eating on a Student Budget in Hostel Life',
      excerpt: 'Practical tips for maintaining a nutritious diet while living in student accommodation without breaking the bank.',
      author: 'Nutritionist Efua Mensah',
      authorRole: 'Health Expert',
      publishDate: '2024-01-26',
      readTime: '5 min read',
      category: 'student-life',
      tags: ['health', 'nutrition', 'budget'],
      image: '/api/placeholder/400/250',
      views: 1567
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            UniStay Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover insights, tips, and stories about student life, accommodation, and university experiences in Ghana.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-cyan-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
          </div>
          
          <Card className="glass border-0 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Featured Image</span>
              </div>
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-cyan-100 text-cyan-800">Featured</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-600">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(featuredPost.publishDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye className="w-4 h-4 mr-1" />
                    {featuredPost.views.toLocaleString()} views
                  </div>
                  <Button className="gradient-primary text-white border-0" asChild>
                    <Link to={`/blog/${featuredPost.id}`}>
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass border-0 shadow-xl sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => {
                    const isActive = selectedCategory === category.id
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                          isActive
                            ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isActive ? 'bg-cyan-200 text-cyan-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-8 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
                  <p className="text-sm text-gray-600 mb-4">Get the latest articles delivered to your inbox.</p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <Button size="sm" className="w-full gradient-primary text-white border-0">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {filteredPosts.length === 0 ? (
              <Card className="glass border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all') }} variant="outline">
                    Show All Articles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Article Image</span>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {post.category.replace('-', ' ')}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views.toLocaleString()}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-600">{post.authorRole}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Have a Story to Share?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We'd love to hear about your student accommodation experiences, tips, or insights. 
                Join our community of writers and help other students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary text-white border-0">
                  Submit Your Story
                </Button>
                <Button size="lg" variant="outline">
                  Join Our Newsletter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Blog