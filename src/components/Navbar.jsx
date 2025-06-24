"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { Menu, X, LogOut, Home, Search, Building, Moon, Sun, Globe, Settings, HelpCircle } from "lucide-react"
import { APP_NAME } from "../config"

const Navbar = () => {
  const { user, logout, isManager } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage, languages, t } = useLanguage()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="gradient-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Building className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">{APP_NAME}</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/hostels"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                {t("nav.hostels")}
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                Blog
              </Link>
              <Link
                to="/faq"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-white/10"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-md hover:bg-white/10 flex items-center"
                aria-label="Select language"
                aria-expanded={isLanguageMenuOpen}
              >
                <Globe className="h-5 w-5" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code)
                          setIsLanguageMenuOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === lang.code
                            ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                        role="menuitem"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isManager() ? "/manager" : "/dashboard"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to={isManager() ? "/manager/settings" : "/dashboard/settings"}
                  className="p-2 rounded-md hover:bg-white/10"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white text-green-700 hover:bg-gray-100"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                {t("nav.home")}
              </div>
            </Link>
            <Link
              to="/hostels"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                {t("nav.hostels")}
              </div>
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                {t("nav.search")}
              </div>
            </Link>
            <Link
              to="/help"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                {t("nav.help")}
              </div>
            </Link>

            {/* Theme toggle for mobile */}
            <button
              onClick={() => {
                toggleTheme()
                setIsMenuOpen(false)
              }}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              )}
            </button>

            {/* Language selector for mobile */}
            <div className="px-3 py-2">
              <div className="flex items-center mb-2">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-base font-medium">Language</span>
              </div>
              <div className="ml-6 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-2 py-1 text-sm rounded-md ${
                      language === lang.code
                        ? "bg-teal-700 dark:bg-gray-600"
                        : "hover:bg-teal-700 dark:hover:bg-gray-600"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-teal-700 dark:border-gray-700">
            {user ? (
              <div className="px-2 space-y-1">
                <Link
                  to={isManager() ? "/manager" : "/dashboard"}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </div>
                </Link>
                <Link
                  to={isManager() ? "/manager/settings" : "/dashboard/settings"}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-green-700 hover:bg-gray-100 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
