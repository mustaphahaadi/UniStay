import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users,
  AlertCircle
} from "lucide-react";

const ManagerDashboard = ({ stats = {} }) => {
  const defaultStats = {
    totalHostels: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
    totalRooms: 0,
    pendingBookings: 0,
    ...stats
  };

  const statCards = [
    {
      title: "Total Hostels",
      value: defaultStats.totalHostels,
      icon: Building2,
      color: "text-ghana-600",
      bgColor: "bg-ghana-50"
    },
    {
      title: "Total Bookings",
      value: defaultStats.totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Monthly Revenue",
      value: `GH₵${defaultStats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Occupancy Rate", 
      value: `${defaultStats.occupancyRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Rooms",
      value: defaultStats.totalRooms,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Pending Bookings",
      value: defaultStats.pendingBookings,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Manager Dashboard 🏢</h1>
          <p className="text-white/90 text-lg">Manage your hostels and track performance metrics</p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold text-gray-800">{stat.title}</CardTitle>
              <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm text-gray-500">
                {stat.title === "Pending Bookings" ? "Needs attention" : "Total managed"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Overview</TabsTrigger>
          <TabsTrigger value="hostels" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">My Hostels</TabsTrigger>
          <TabsTrigger value="bookings" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Bookings</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">New booking confirmed</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Room availability updated</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Guest checked in</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">Update Room Availability</p>
                    <p className="text-sm text-gray-600">Manage your room inventory</p>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">Review Pending Bookings</p>
                    <p className="text-sm text-gray-600">{defaultStats.pendingBookings} bookings awaiting approval</p>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">Update Hostel Information</p>
                    <p className="text-sm text-gray-600">Keep your listings current</p>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">View Analytics Report</p>
                    <p className="text-sm text-gray-600">Monthly performance insights</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hostels" className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">My Hostels</CardTitle>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                Add New Hostel
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all flex">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=96&width=96&text=H${index + 1}`}
                        alt={`Hostel ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Campus Haven Hostel {index + 1}</h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> Legon, Accra
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Active
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Rooms:</span>
                          <span className="font-medium text-gray-900 ml-1">{10 + index * 5}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Occupancy:</span>
                          <span className="font-medium text-gray-900 ml-1">{75 + index * 5}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Rating:</span>
                          <span className="font-medium text-gray-900 ml-1">{4 + index * 0.2}/5</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors">
                          Edit Details
                        </button>
                        <button className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-100 transition-colors">
                          Manage Rooms
                        </button>
                        <button className="px-3 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-medium hover:bg-amber-100 transition-colors">
                          View Bookings
                        </button>
                        <button className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium hover:bg-green-100 transition-colors">
                          Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Booking Management</CardTitle>
              <div className="flex space-x-2">
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option>All Hostels</option>
                  <option>Campus Haven 1</option>
                  <option>Campus Haven 2</option>
                  <option>Campus Haven 3</option>
                </select>
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BK-{Math.floor(Math.random() * 10000)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Guest {index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campus Haven {(index % 3) + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Room {101 + index}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                            index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {index % 3 === 0 ? 'Confirmed' : index % 3 === 1 ? 'Pending' : 'Checked-in'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            <button className="text-green-600 hover:text-green-900">Update</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 5 of 25 bookings</div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Next</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Revenue chart will be displayed here</p>
                    <p className="text-sm text-gray-400 mt-1">Monthly revenue breakdown</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">GH₵{(15000).toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Last Month</p>
                    <p className="text-2xl font-bold text-gray-900">GH₵{(13400).toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">↑ 5% from previous</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Projected</p>
                    <p className="text-2xl font-bold text-gray-900">GH₵{(16800).toLocaleString()}</p>
                    <p className="text-xs text-purple-600 mt-1">↑ 12% growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full border-8 border-teal-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">85%</span>
                    </div>
                    <p className="text-gray-500">Current occupancy rate</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Campus Haven 1</span>
                    <span className="text-sm font-medium text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Campus Haven 2</span>
                    <span className="text-sm font-medium text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Campus Haven 3</span>
                    <span className="text-sm font-medium text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Top Performing Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {101 + index}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">Room {101 + index}</p>
                          <p className="text-sm font-medium text-green-600">GH₵{(1200 + index * 100).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <p>Campus Haven {(index % 3) + 1}</p>
                          <p>Occupancy: {95 - index * 3}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Booking trends chart will be displayed here</p>
                    <p className="text-sm text-gray-400 mt-1">Weekly and monthly booking patterns</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-gray-500 mt-1">New Bookings</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-gray-900">18</p>
                    <p className="text-xs text-gray-500 mt-1">Check-ins</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500 mt-1">Check-outs</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-xs text-gray-500 mt-1">Cancellations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDashboard;