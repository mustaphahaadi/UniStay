"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { useNotification } from "../contexts/NotificationContext"
import { Moon, Sun, Globe, Bell, Shield, User, Key } from "lucide-react"

const Settings = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage, languages, t } = useLanguage()
  const { success } = useNotification()

  const [activeTab, setActiveTab] = useState("account")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    marketing: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareProfile: true,
    showActivity: true,
    allowDataCollection: true,
  })

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
    success("Notification settings updated")
  }

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
    success("Privacy settings updated")
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // API call to delete account would go here
      logout()
      navigate("/")
      success("Your account has been deleted")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl">Settings</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="md:grid md:grid-cols-12">
          {/* Sidebar */}
          <div className="md:col-span-3 border-r border-gray-200 dark:border-gray-700">
            <nav className="px-4 py-5 space-y-1">
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "account"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Account
              </button>

              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "appearance"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {theme === "dark" ? <Moon className="mr-3 h-5 w-5" /> : <Sun className="mr-3 h-5 w-5" />}
                Appearance
              </button>

              <button
                onClick={() => setActiveTab("language")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "language"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                Language
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "notifications"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </button>

              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "privacy"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Shield className="mr-3 h-5 w-5" />
                Privacy
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === "security"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Key className="mr-3 h-5 w-5" />
                Security
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-9 px-4 py-5 sm:p-6">
            {activeTab === "account" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Information</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update your account information and profile details.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        defaultValue={user?.first_name}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        defaultValue={user?.last_name}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user?.email}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue={user?.phone}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save changes
                  </button>
                </div>

                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Customize how the application looks for you.
                </p>

                <div className="mt-6">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      role="switch"
                      aria-checked={theme === "dark"}
                      style={{
                        backgroundColor: theme === "dark" ? "#4B5563" : "#10B981",
                      }}
                    >
                      <span className="sr-only">Toggle dark mode</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          theme === "dark" ? "translate-x-5" : "translate-x-0"
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      >
                        {theme === "dark" ? (
                          <Moon className="h-3 w-3 m-1 text-gray-600" />
                        ) : (
                          <Sun className="h-3 w-3 m-1 text-yellow-500" />
                        )}
                      </span>
                    </button>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {theme === "dark" ? "Dark mode enabled" : "Light mode enabled"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "language" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Language</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose your preferred language for the application.
                </p>

                <div className="mt-6">
                  <fieldset>
                    <legend className="sr-only">Language</legend>
                    <div className="space-y-4">
                      {languages.map((lang) => (
                        <div key={lang.code} className="flex items-center">
                          <input
                            id={lang.code}
                            name="language"
                            type="radio"
                            checked={language === lang.code}
                            onChange={() => changeLanguage(lang.code)}
                            className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 dark:border-gray-600"
                          />
                          <label
                            htmlFor={lang.code}
                            className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            {lang.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage how you receive notifications.</p>

                <div className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email"
                          name="email"
                          type="checkbox"
                          checked={notificationSettings.email}
                          onChange={handleNotificationChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
                          Email notifications
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive booking updates and important announcements via email.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="push"
                          name="push"
                          type="checkbox"
                          checked={notificationSettings.push}
                          onChange={handleNotificationChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push" className="font-medium text-gray-700 dark:text-gray-300">
                          Push notifications
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">Receive real-time updates on your device.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing"
                          name="marketing"
                          type="checkbox"
                          checked={notificationSettings.marketing}
                          onChange={handleNotificationChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketing" className="font-medium text-gray-700 dark:text-gray-300">
                          Marketing emails
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive offers, promotions, and news about new features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Privacy Settings</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Control how your information is used and shared.
                </p>

                <div className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="shareProfile"
                          name="shareProfile"
                          type="checkbox"
                          checked={privacySettings.shareProfile}
                          onChange={handlePrivacyChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="shareProfile" className="font-medium text-gray-700 dark:text-gray-300">
                          Share profile with hostel owners
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Allow hostel owners to see your profile information when you make a booking.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="showActivity"
                          name="showActivity"
                          type="checkbox"
                          checked={privacySettings.showActivity}
                          onChange={handlePrivacyChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="showActivity" className="font-medium text-gray-700 dark:text-gray-300">
                          Show activity status
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Let others know when you're online or recently active.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="allowDataCollection"
                          name="allowDataCollection"
                          type="checkbox"
                          checked={privacySettings.allowDataCollection}
                          onChange={handlePrivacyChange}
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="allowDataCollection" className="font-medium text-gray-700 dark:text-gray-300">
                          Allow data collection for service improvement
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          We use this data to improve our services and your experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your account security and password.
                </p>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <label
                        htmlFor="current_password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Current Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="current_password"
                          id="current_password"
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="new_password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        New Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="new_password"
                          id="new_password"
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Confirm New Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="confirm_password"
                          id="confirm_password"
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</h3>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
