"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { Bell, Shield, Moon, Sun, Globe, Key, Trash2, Save } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"

const Settings = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false
    },
    preferences: {
      language: "en",
      currency: "GHS",
      timezone: "GMT"
    }
  })

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }))
  }

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive booking updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">Get instant notifications on your device</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={() => handleNotificationChange('push')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive important updates via SMS</p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={() => handleNotificationChange('sms')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
              </div>
              <Switch
                checked={settings.notifications.marketing}
                onCheckedChange={() => handleNotificationChange('marketing')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-600">Make your profile visible to other users</p>
              </div>
              <Switch
                checked={settings.privacy.profileVisible}
                onCheckedChange={() => handlePrivacyChange('profileVisible')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Email</p>
                <p className="text-sm text-gray-600">Display email on your public profile</p>
              </div>
              <Switch
                checked={settings.privacy.showEmail}
                onCheckedChange={() => handlePrivacyChange('showEmail')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Phone Number</p>
                <p className="text-sm text-gray-600">Display phone number on your profile</p>
              </div>
              <Switch
                checked={settings.privacy.showPhone}
                onCheckedChange={() => handlePrivacyChange('showPhone')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="tw">Twi</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={settings.preferences.currency}
                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="GHS">Ghana Cedi (GHS)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="GMT">GMT (Ghana)</option>
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Change Password
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Two-Factor Authentication
              </Button>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings