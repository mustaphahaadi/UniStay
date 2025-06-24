"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Edit3 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"

const UserProfile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    university: user?.university || "",
    student_id: user?.student_id || "",
    date_of_birth: user?.date_of_birth || "",
    bio: user?.bio || ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile(profileData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      university: user?.university || "",
      student_id: user?.student_id || "",
      date_of_birth: user?.date_of_birth || "",
      bio: user?.bio || ""
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-white" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-4 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{profileData.name || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{profileData.email || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{profileData.phone || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  {isEditing ? (
                    <Input
                      name="date_of_birth"
                      type="date"
                      value={profileData.date_of_birth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{profileData.date_of_birth || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                {isEditing ? (
                  <Input
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{profileData.address || "Not provided"}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">University</label>
                  {isEditing ? (
                    <Input
                      name="university"
                      value={profileData.university}
                      onChange={handleInputChange}
                      placeholder="Enter your university"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span>{profileData.university || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Student ID</label>
                  {isEditing ? (
                    <Input
                      name="student_id"
                      value={profileData.student_id}
                      onChange={handleInputChange}
                      placeholder="Enter your student ID"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span>{profileData.student_id || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    className="w-full p-3 border rounded-lg resize-none h-24"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg min-h-[96px]">
                    <span>{profileData.bio || "No bio provided"}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserProfile