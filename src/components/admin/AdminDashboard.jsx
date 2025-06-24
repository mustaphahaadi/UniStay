import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Building2, 
  Calendar, 
  DollarSign,
  UserCheck,
  AlertTriangle
} from "lucide-react";

const AdminDashboard = ({ stats = {} }) => {
  const defaultStats = {
    totalUsers: 0,
    totalHostels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeManagers: 0,
    pendingApprovals: 0,
    ...stats
  };

  const statCards = [
    {
      title: "Total Users",
      value: defaultStats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Hostels",
      value: defaultStats.totalHostels,
      icon: Building2,
      color: "text-ghana-600", 
      bgColor: "bg-ghana-50"
    },
    {
      title: "Total Bookings",
      value: defaultStats.totalBookings.toLocaleString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Revenue",
      value: `GH₵${defaultStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Managers",
      value: defaultStats.activeManagers,
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Pending Approvals",
      value: defaultStats.pendingApprovals,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Admin Dashboard 🛡️</h1>
          <p className="text-white/90 text-lg">System administration and platform management</p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {stat.title === "Pending Approvals" ? "Needs review" : "Platform total"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different admin sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Overview</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Users</TabsTrigger>
          <TabsTrigger value="hostels" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Hostels</TabsTrigger>
          <TabsTrigger value="bookings" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Bookings</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">New hostel approved</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">User registration spike</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">System maintenance completed</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
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
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">Review Pending Hostels</p>
                    <p className="text-sm text-gray-600">8 hostels awaiting approval</p>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">Manage User Reports</p>
                    <p className="text-sm text-gray-600">3 reports need attention</p>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200">
                    <p className="font-semibold text-gray-900">System Analytics</p>
                    <p className="text-sm text-gray-600">View detailed platform metrics</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">User Management</CardTitle>
              <div className="flex space-x-2">
                <input type="text" placeholder="Search users..." className="px-3 py-1 border border-gray-300 rounded-md text-sm" />
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option>All Roles</option>
                  <option>Students</option>
                  <option>Managers</option>
                  <option>Admins</option>
                </select>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">Add User</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">User {index + 1}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user{index + 1}@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index === 0 ? 'Admin' : index === 1 ? 'Manager' : 'Student'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                            index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Pending' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 5 of 1,250 users</div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Next</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hostels" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Hostel Management</CardTitle>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">Add Hostel</button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Campus Haven {index + 1}</div>
                                <div className="text-xs text-gray-500">ID: HST-{1000 + index}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Manager {index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Legon, Accra</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{10 + index * 5}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                              index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Pending' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">View</button>
                              <button className="text-green-600 hover:text-green-900">Approve</button>
                              <button className="text-red-600 hover:text-red-900">Suspend</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing 5 of 85 hostels</div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Next</button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border border-yellow-100 rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">New Hostel Registration</h3>
                          <p className="text-sm text-gray-500 mt-1">Submitted by Manager {index + 1}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">
                          Pending
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Campus Haven {index + 10} - Legon, Accra</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted on {new Date().toLocaleDateString()}</p>
                      <div className="mt-3 flex space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-md text-xs">Approve</button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded-md text-xs">Reject</button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">Review</button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">Manager Account Request</h3>
                        <p className="text-sm text-gray-500 mt-1">From user4@example.com</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                        New
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Requesting manager privileges</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted on {new Date().toLocaleDateString()}</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md text-xs">Approve</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-md text-xs">Reject</button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">Review</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Booking Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Booking Management Coming Soon</p>
                <p className="text-gray-400">Global booking management features will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">General Settings</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Maintenance Mode</p>
                          <p className="text-sm text-gray-500">Put the system in maintenance mode</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">New User Registration</p>
                          <p className="text-sm text-gray-500">Allow new users to register</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1 cursor-pointer justify-end">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Automatic Approval</p>
                          <p className="text-sm text-gray-500">Auto-approve new hostel listings</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Email Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">System Email</label>
                        <input type="email" value="system@unistay.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Email Notifications</p>
                          <p className="text-sm text-gray-500">Send system notification emails</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1 cursor-pointer justify-end">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Policy</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>Strong (8+ chars, special chars, numbers)</option>
                          <option>Medium (8+ chars, numbers)</option>
                          <option>Basic (6+ chars)</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1 cursor-pointer justify-end">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">Cancel</button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm">Save Changes</button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Server Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <p className="font-medium text-gray-800">API Server</p>
                        </div>
                        <p className="text-sm text-green-600">Operational</p>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <p className="font-medium text-gray-800">Database</p>
                        </div>
                        <p className="text-sm text-green-600">Operational</p>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <p className="font-medium text-gray-800">File Storage</p>
                        </div>
                        <p className="text-sm text-green-600">Operational</p>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                          <p className="font-medium text-gray-800">Payment Gateway</p>
                        </div>
                        <p className="text-sm text-yellow-600">Partial Outage</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">System Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">CPU Usage</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-bold text-gray-900">42%</p>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-5/12 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Memory Usage</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-bold text-gray-900">68%</p>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-8/12 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Disk Usage</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-bold text-gray-900">54%</p>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-6/12 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Network</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-bold text-gray-900">32%</p>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-4/12 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Recent System Logs</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <div className="text-xs text-gray-500 p-2 border-l-2 border-green-500">
                        <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> System backup completed successfully
                      </div>
                      <div className="text-xs text-gray-500 p-2 border-l-2 border-blue-500">
                        <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> User login: admin@unistay.com
                      </div>
                      <div className="text-xs text-gray-500 p-2 border-l-2 border-yellow-500">
                        <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> Payment gateway connection warning
                      </div>
                      <div className="text-xs text-gray-500 p-2 border-l-2 border-green-500">
                        <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> New hostel approved: Campus Haven 5
                      </div>
                      <div className="text-xs text-gray-500 p-2 border-l-2 border-blue-500">
                        <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> System update scheduled for maintenance window
                      </div>
                    </div>
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

export default AdminDashboard;