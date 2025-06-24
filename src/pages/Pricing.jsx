import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Star, Users, Building, Crown, Zap, Shield, Headphones, BarChart3 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for small hostels getting started',
      icon: Building,
      color: 'gray',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        'Up to 20 rooms',
        'Basic booking management',
        'Student messaging',
        'Payment processing',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'No advanced analytics',
        'No priority support',
        'No custom branding'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing hostel businesses',
      icon: Star,
      color: 'cyan',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Up to 100 rooms',
        'Advanced booking management',
        'Student messaging & reviews',
        'Payment processing',
        'Mobile app access',
        'Priority email support',
        'Basic analytics dashboard',
        'Custom booking policies',
        'Maintenance request system'
      ],
      limitations: [
        'No white-label solution',
        'No API access'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large-scale hostel operations',
      icon: Crown,
      color: 'purple',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited rooms',
        'Full booking management suite',
        'Student messaging & reviews',
        'Payment processing',
        'Mobile app access',
        '24/7 phone & email support',
        'Advanced analytics & reporting',
        'Custom booking policies',
        'Maintenance request system',
        'White-label solution',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      limitations: [],
      popular: false
    }
  ]

  const addOns = [
    {
      id: 'premium-support',
      name: 'Premium Support',
      description: '24/7 priority support with dedicated account manager',
      price: 29,
      icon: Headphones
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed insights and custom reporting dashboard',
      price: 39,
      icon: BarChart3
    },
    {
      id: 'marketing-tools',
      name: 'Marketing Tools',
      description: 'Promotional campaigns and social media integration',
      price: 49,
      icon: Zap
    }
  ]

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and mobile money payments for Ghanaian customers.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes, you save 2 months when you pay annually. The yearly discount is automatically applied.'
    },
    {
      question: 'What happens if I exceed my room limit?',
      answer: 'You can easily upgrade your plan or pay for additional rooms at $2 per room per month.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security with SSL encryption and regular security audits.'
    }
  ]

  const getPrice = (plan) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    return billingCycle === 'yearly' ? Math.round(price / 12) : price
  }

  const getSavings = (plan) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12
      const yearlyCost = plan.yearlyPrice
      return monthlyCost - yearlyCost
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your hostel business. All plans include our core features with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 17%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = getPrice(plan)
            const savings = getSavings(plan)
            
            return (
              <Card
                key={plan.id}
                className={`relative glass border-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-cyan-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-${plan.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${plan.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">₵{price}</span>
                      <span className="text-gray-600">
                        /{billingCycle === 'monthly' ? 'month' : 'month'}
                      </span>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ₵{savings} per year
                        </div>
                      )}
                    </div>
                    
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'gradient-primary text-white border-0'
                          : 'border-2 border-gray-300 hover:border-cyan-600'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular ? 'Start Free Trial' : 'Get Started'}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <h5 className="font-medium text-gray-700 mb-2">Not included:</h5>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <X className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhance Your Plan</h2>
            <p className="text-lg text-gray-600">Add powerful features to any plan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon) => {
              const Icon = addon.icon
              
              return (
                <Card key={addon.id} className="glass border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                          <Icon className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">₵{addon.price}</span>
                        <div className="text-xs text-gray-500">/month</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-lg text-gray-600">See what's included in each plan</p>
          </div>
          
          <Card className="glass border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Features</th>
                      <th className="text-center p-4 font-semibold">Basic</th>
                      <th className="text-center p-4 font-semibold">Professional</th>
                      <th className="text-center p-4 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">Room Management</td>
                      <td className="p-4 text-center">Up to 20</td>
                      <td className="p-4 text-center">Up to 100</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">Booking Management</td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">Payment Processing</td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">Analytics Dashboard</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">API Access</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">24/7 Support</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="glass border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass border-0 shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of hostel owners who trust UniStay to manage their properties and grow their business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary text-white border-0" asChild>
                  <Link to="/register">
                    Start Free Trial
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing