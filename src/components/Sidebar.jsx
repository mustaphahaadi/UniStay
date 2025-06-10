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
    { path: "/dashboard/settings", icon: <Settings className="h-5 w-5" />, text: "Settings" },
  ]

  const managerLinks = [
    { path: "/manager", icon: <BarChart className="h-5 w-5" />, text: "Dashboard" },
    { path: "/manager/profile", icon: <User className="h-5 w-5" />, text: "My Profile" },
    { path: "/manager/add-hostel", icon: <PlusCircle className="h-5 w-5" />, text: "Add Hostel" },
    { path: "/manager/messages", icon: <MessageSquare className="h-5 w-5" />, text: "Messages" },
    { path: "/manager/settings", icon: <Settings className="h-5 w-5" />, text: "Settings" },
  ]

  const adminLinks = [
    { path: "/admin", icon: <Shield className="h-5 w-5" />, text: "Dashboard" },
    { path: "/admin/users", icon: <Users className="h-5 w-5" />, text: "User Management" },
    { path: "/admin/hostels", icon: <Building className="h-5 w-5" />, text: "Hostel Management" },
    { path: "/admin/bookings", icon: <Calendar className="h-5 w-5" />, text: "Booking Management" },
    { path: "/admin/analytics", icon: <BarChart className="h-5 w-5" />, text: "Analytics" },
    { path: "/admin/alerts", icon: <AlertCircle className="h-5 w-5" />, text: "System Alerts" },
    { path: "/admin/settings", icon: <Settings className="h-5 w-5" />, text: "System Settings" },
  ]

  const links = isAdmin() ? adminLinks : isManager() ? managerLinks : userLinks

  return (
    <div
      className={`h-full bg-white dark:bg-gray-800 shadow-md flex flex-col ${
        isMobile ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300" : "w-64"
      }`}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-gray-700">
        <Building className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-2" />
        <span className="font-bold text-xl text-gray-800 dark:text-white">UniStay</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard" || link.path === "/manager" || link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              {link.icon}
              <span className="ml-3">{link.text}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-8">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
            <NavLink
              to="/help"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/help")
                  ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="ml-3">Help & Support</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
