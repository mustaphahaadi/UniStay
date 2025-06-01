import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, MapPin, Star, Filter } from 'lucide-react';

const AdvancedAnalytics = ({ userRole = 'manager' }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
  ];

  const metrics = [
    { value: 'revenue', label: 'Revenue', icon: DollarSign },
    { value: 'bookings', label: 'Bookings', icon: Calendar },
    { value: 'occupancy', label: 'Occupancy', icon: Users },
    { value: 'ratings', label: 'Ratings', icon: Star },
  ];

  useEffect(() => {
    generateAnalyticsData();
  }, [timeRange, selectedMetric]);

  const generateAnalyticsData = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = {
      overview: {
        totalRevenue: 125000,
        revenueChange: 12.5,
        totalBookings: 342,
        bookingsChange: 8.3,
        occupancyRate: 87,
        occupancyChange: -2.1,
        averageRating: 4.6,
        ratingChange: 0.2,
      },
      revenueData: [
        { month: 'Jan', revenue: 18000, bookings: 45, occupancy: 85 },
        { month: 'Feb', revenue: 22000, bookings: 52, occupancy: 88 },
        { month: 'Mar', revenue: 19000, bookings: 48, occupancy: 82 },
        { month: 'Apr', revenue: 25000, bookings: 58, occupancy: 92 },
        { month: 'May', revenue: 28000, bookings: 65, occupancy: 95 },
        { month: 'Jun', revenue: 32000, bookings: 72, occupancy: 98 },
      ],
      roomTypeData: [
        { name: 'Single Room', value: 45, revenue: 45000 },
        { name: 'Shared Room', value: 35, revenue: 28000 },
        { name: 'Studio', value: 15, revenue: 35000 },
        { name: 'Apartment', value: 5, revenue: 17000 },
      ],
      geographicData: [
        { region: 'North Campus', bookings: 85, revenue: 42000 },
        { region: 'South Campus', bookings: 72, revenue: 36000 },
        { region: 'Downtown', bookings: 95, revenue: 47000 },
        { region: 'Suburbs', bookings: 45, revenue: 22000 },
      ],
      customerSatisfaction: [
        { category: 'Cleanliness', score: 4.7 },
        { category: 'Staff', score: 4.5 },
        { category: 'Location', score: 4.8 },
        { category: 'Amenities', score: 4.3 },
        { category: 'Value', score: 4.4 },
      ],
      bookingTrends: [
        { day: 'Mon', bookings: 12, cancellations: 2 },
        { day: 'Tue', bookings: 15, cancellations: 1 },
        { day: 'Wed', bookings: 18, cancellations: 3 },
        { day: 'Thu', bookings: 22, cancellations: 2 },
        { day: 'Fri', bookings: 28, cancellations: 4 },
        { day: 'Sat', bookings: 35, cancellations: 5 },
        { day: 'Sun', bookings: 25, cancellations: 3 },
      ],
    };

    setAnalyticsData(mockData);
    setLoading(false);
  };

  const COLORS = ['#0891b2', '#06b6d4', '#67e8f9', '#a7f3d0'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h2>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter size={16} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${analyticsData.overview.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm font-medium">
              +{analyticsData.overview.revenueChange}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.overview.totalBookings}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm font-medium">
              +{analyticsData.overview.bookingsChange}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.overview.occupancyRate}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="text-red-500 mr-1" size={16} />
            <span className="text-red-500 text-sm font-medium">
              {analyticsData.overview.occupancyChange}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.overview.averageRating}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm font-medium">
              +{analyticsData.overview.ratingChange}
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0891b2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Room Type Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Room Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.roomTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.roomTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Booking Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#0891b2" />
              <Bar dataKey="cancellations" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Satisfaction
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.customerSatisfaction} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="category" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="score" fill="#0891b2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Geographic Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.geographicData.map((region, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{region.region}</h4>
                <MapPin size={16} className="text-gray-500" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Bookings:</span>
                  <span className="font-medium">{region.bookings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                  <span className="font-medium">${region.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
            Export PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;