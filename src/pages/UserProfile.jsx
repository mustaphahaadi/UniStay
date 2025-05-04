"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { API_URL } from "../config"
import { toast } from "react-toastify"
import { User, Camera, Mail, Phone, MapPin, School, Briefcase, Calendar, Save, Loader } from "lucide-react"

const UserProfile = () => {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    university: "",
    occupation: "",
    date_of_birth: "",
    address: "",
    profile_picture: null,
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_URL}/users/profile/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setProfile(data)
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          university: data.university || "",
          occupation: data.occupation || "",
          date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split("T")[0] : "",
          address: data.address || "",
          profile_picture: null,
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast.error("Failed to load profile information")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profile_picture: e.target.files[0],
      }))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem("token")
      const formDataToSend = new FormData()

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "profile_picture" && formData[key]) {
          formDataToSend.append(key, formData[key])
        }
      })

      // Append file if it exists
      if (formData.profile_picture) {
        formDataToSend.append("profile_picture", formData.profile_picture)
      }

      const response = await fetch(`${API_URL}/users/profile/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      toast.success("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-teal-600 text-white p-6 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <div className="h-24 w-24 rounded-full bg-teal-400 flex items-center justify-center overflow-hidden border-4 border-white">
                {profile?.profile_picture ? (
                  <img
                    src={profile.profile_picture || "/placeholder.svg"}
                    alt={`${profile.first_name}'s profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-white text-teal-600 rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="text-teal-100">{profile?.email}</p>
              {profile?.university && (
                <div className="flex items-center mt-1">
                  <School className="h-4 w-4 mr-1" />
                  <span className="text-sm">{profile.university}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile?.first_name || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile?.last_name || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-gray-800">{profile?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-800">{profile?.phone || "Not provided"}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <School className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <School className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-800">{profile?.university || "Not provided"}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-800">{profile?.occupation || "Not provided"}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-800">
                      {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not provided"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-gray-800">{profile?.address || "Not provided"}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              ) : (
                <p className="text-gray-800">{profile?.bio || "No bio provided"}</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center"
                >
                  {saving ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
