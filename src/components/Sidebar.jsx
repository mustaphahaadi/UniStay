"use client"

import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  Building,
  Home,
  Calendar,
  Heart,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  X,
  User,
  PlusCircle,
  BarChart,
  Users,
  Shield,
  AlertCircle,
  Bell,
  Star,
  CreditCard,
  TrendingUp,
  Tool,
  GraduationCap,
  FileText
} from "lucide-react"

const Sidebar = ({ isMobile, toggleSidebar }) => {
  const { user, isManager, isAdmin, logout } = useAuth()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const userLinks = [
    { path: "/dashboard", icon: <Home className="h-5 w-5" />, text: "Dashboard" },
    { path: "/dashboard/profile", icon: <User className="h-5 w-5" />, text: "My Profile" },
    { path: "/dashboard/bookings", icon: <Calendar className="h-5 w-5" />, text: "My Bookings" },
    { path: "/dashboard/favorites", icon: <Heart className="h-5 w-5" />, text: "Favorites" },
    { path: "/dashboard/messages", icon: <MessageSquare className="h-5 w-5" />, text: "Messages" },
    { path: "/dashboard/notifications", icon: <Bell className="h-5 w-5" />, text: "Notifications" },
    { path: "/dashboard/reviews", icon: <Star className="h-5 w-5" />, text: "My Reviews" },
    { path: "/dashboard/payments", icon: <CreditCard className="h-5 w-5" />, text: "Payments" },
    { path: "/dashboard/settings", icon: <Settings className="h-5 w-5" />, text: "Settings" },
  ]

  const managerLinks = [
    { path: "/manager", icon: <BarChart className="h-5 w-5" />, text: "Dashboard" },
    { path: "/manager/profile", icon: <User className="h-5 w-5" />, text: "My Profile" },
    { path: "/manager/hostels", icon: <Building className="h-5 w-5" />, text: "My Hostels" },
    { path: "/manager/add-hostel", icon: <PlusCircle className="h-5 w-5" />, text: "Add Hostel" },
    { path: "/manager/bookings", icon: <Calendar className="h-5 w-5" />, text: "Bookings" },
    { path: "/manager/rooms", icon: <Home className="h-5 w-5" />, text: "Room Management" },
    { path: "/manager/messages", icon: <MessageSquare className="h-5 w-5" />, text: "Messages" },
    { path: "/manager/reviews", icon: <Star className="h-5 w-5" />, text: "Reviews" },
    { path: "/manager/maintenance", icon: <Tool className="h-5 w-5" />, text: "Maintenance" },
    { path: "/manager/analytics", icon: <TrendingUp className="h-5 w-5" />, text: "Analytics" },
    { path: "/manager/payments", icon: <CreditCard className="h-5 w-5" />, text: "Payments" },
    { path: "/manager/settings", icon: <Settings className="h-5 w-5" />, text: "Settings" },
  ]

  const adminLinks = [
    { path: "/admin", icon: <Shield className="h-5 w-5" />, text: "Dashboard" },
    { path: "/admin/users", icon: <Users className="h-5 w-5" />, text: "User Management" },
    { path: "/admin/hostels", icon: <Building className="h-5 w-5" />, text: "Hostel Management" },
    { path: "/admin/bookings", icon: <Calendar className="h-5 w-5" />, text: "Booking Management" },
    { path: "/admin/universities", icon: <GraduationCap className="h-5 w-5" />, text: "Universities" },
    { path: "/admin/reviews", icon: <Star className="h-5 w-5" />, text: "Review Management" },
    { path: "/admin/payments", icon: <CreditCard className="h-5 w-5" />, text: "Payment Management" },
    { path: "/admin/analytics", icon: <BarChart className="h-5 w-5" />, text: "Analytics" },
    { path: "/admin/reports", icon: <FileText className="h-5 w-5" />, text: "Reports" },
    { path: "/admin/alerts", icon: <AlertCircle className="h-5 w-5" />, text: "System Alerts" },
    { path: "/admin/settings", icon: <Settings className="h-5 w-5" />, text: "System Settings" },
  ]

  const links = isAdmin() ? adminLinks : isManager() ? managerLinks : userLinks

  return (
    <div
      className={`h-full bg-white shadow-xl flex flex-col border-r border-gray-200 ${
        isMobile ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300" : "w-64"
      }`}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-center py-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">UniStay</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard" || link.path === "/manager" || link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? "bg-white shadow-sm" : "group-hover:bg-white group-hover:shadow-sm"
              }`}>
                {link.icon}
              </div>
              <span className="ml-3 font-medium">{link.text}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-8">
          <div className="border-t border-gray-200 pt-6 space-y-2">
            <NavLink
              to="/help"
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive("/help")
                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive("/help") ? "bg-white shadow-sm" : "group-hover:bg-white group-hover:shadow-sm"
              }`}>
                <HelpCircle className="h-5 w-5" />
              </div>
              <span className="ml-3 font-medium">Help & Support</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg transition-colors group-hover:bg-white group-hover:shadow-sm">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
