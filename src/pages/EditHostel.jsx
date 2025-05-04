"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { Plus, X, Upload } from "lucide-react"

const EditHostel = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [universities, setUniversities] = useState([])
  const [locations, setLocations] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    university: "",
    distance_to_university: "",
    gender_type: "mixed",
    price: "",
    beds_per_room: "",
    amenities: [],
  })
  const [rooms, setRooms] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [existingImages, setExistingImages] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
  const [newImageFiles, setNewImageFiles] = useState([])
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostelResponse, universitiesResponse, locationsResponse] = await Promise.all([
          fetch(`${API_URL}/hostels/${id}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/universities/`),
          fetch(`${API_URL}/locations/`),
        ])

        if (!hostelResponse.ok) {
          throw new Error("Failed to fetch hostel data")
        }

        const hostelData = await hostelResponse.json()
        const universitiesData = await universitiesResponse.json()
        const locationsData = await locationsResponse.json()

        // Check if user is the owner of the hostel
        if (hostelData.owner_id !== user.id) {
          toast.error("You are not authorized to edit this hostel")
          navigate("/manager")
          return
        }

        setFormData({
          name: hostelData.name,
          description: hostelData.description,
          location: hostelData.location_id.toString(),
          university: hostelData.university_id.toString(),
          distance_to_university: hostelData.distance_to_university,
          gender_type: hostelData.gender_type,
          price: hostelData.price,
          beds_per_room: hostelData.beds_per_room,
          amenities: hostelData.amenities || [],
        })

        setRooms(hostelData.rooms || [])
        setExistingImages(hostelData.images || [])
        setUniversities(universitiesData)
        setLocations(locationsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load hostel data")
        navigate("/manager")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      amenities: checked ? [...prev.amenities, value] : prev.amenities.filter((a) => a !== value),
    }))
  }

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target
    const updatedRooms = [...rooms]
    updatedRooms[index] = { ...updatedRooms[index], [name]: value }
    setRooms(updatedRooms)
  }

  const addRoom = () => {
    setRooms([...rooms, { number: "", capacity: "", room_type: "standard", price: "" }])
  }

  const removeRoom = (index) => {
    const updatedRooms = [...rooms]
    updatedRooms.splice(index, 1)
    setRooms(updatedRooms)
  }

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files)

    // Limit to 5 images total (existing + new)
    if (existingImages.length - imagesToDelete.length + newImageFiles.length + files.length > 5) {
      toast.error("You can have a maximum of 5 images")
      return
    }

    setNewImageFiles((prev) => [...prev, ...files])

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setNewImagePreviewUrls((prev) => [...prev, ...newPreviewUrls])
  }

  const removeNewImage = (index) => {
    const updatedFiles = [...newImageFiles]
    const updatedPreviews = [...newImagePreviewUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index])

    updatedFiles.splice(index, 1)
    updatedPreviews.splice(index, 1)

    setNewImageFiles(updatedFiles)
    setNewImagePreviewUrls(updatedPreviews)
  }

  const toggleImageToDelete = (imageId) => {
    if (imagesToDelete.includes(imageId)) {
      setImagesToDelete((prev) => prev.filter((id) => id !== imageId))
    } else {
      // Don't allow deleting all images if no new images are being added
      if (existingImages.length - imagesToDelete.length - 1 + newImageFiles.length < 1) {
        toast.error("You must have at least one image")
        return
      }
      setImagesToDelete((prev) => [...prev, imageId])
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Hostel name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.location) {
      newErrors.location = "Location is required"
    }

    if (!formData.university) {
      newErrors.university = "University is required"
    }

    if (!formData.distance_to_university) {
      newErrors.distance_to_university = "Distance to university is required"
    } else if (isNaN(formData.distance_to_university) || Number.parseFloat(formData.distance_to_university) <= 0) {
      newErrors.distance_to_university = "Distance must be a positive number"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.beds_per_room) {
      newErrors.beds_per_room = "Beds per room is required"
    } else if (isNaN(formData.beds_per_room) || Number.parseInt(formData.beds_per_room) <= 0) {
      newErrors.beds_per_room = "Beds per room must be a positive number"
    }

    // Validate rooms
    const roomErrors = []
    rooms.forEach((room, index) => {
      const roomError = {}

      if (!room.number.trim()) {
        roomError.number = "Room number is required"
      }

      if (!room.capacity) {
        roomError.capacity = "Capacity is required"
      } else if (isNaN(room.capacity) || Number.parseInt(room.capacity) <= 0) {
        roomError.capacity = "Capacity must be a positive number"
      }

      if (!room.price) {
        roomError.price = "Price is required"
      } else if (isNaN(room.price) || Number.parseFloat(room.price) <= 0) {
        roomError.price = "Price must be a positive number"
      }

      if (Object.keys(roomError).length > 0) {
        roomErrors[index] = roomError
      }
    })

    if (roomErrors.length > 0) {
      newErrors.rooms = roomErrors
    }

    // Check if there will be at least one image after updates
    if (existingImages.length - imagesToDelete.length + newImageFiles.length < 1) {
      newErrors.images = "At least one image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)
    try {
      // Create FormData object for file upload
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("description", formData.description)
      formDataObj.append("location", formData.location)
      formDataObj.append("university", formData.university)
      formDataObj.append("distance_to_university", formData.distance_to_university)
      formDataObj.append("gender_type", formData.gender_type)
      formDataObj.append("price", formData.price)
      formDataObj.append("beds_per_room", formData.beds_per_room)

      // Append amenities
      formData.amenities.forEach((amenity) => {
        formDataObj.append("amenities", amenity)
      })

      // Append rooms
      formDataObj.append("rooms", JSON.stringify(rooms))

      // Append images to delete
      if (imagesToDelete.length > 0) {
        formDataObj.append("images_to_delete", JSON.stringify(imagesToDelete))
      }

      // Append new images
      newImageFiles.forEach((file) => {
        formDataObj.append("new_images", file)
      })

      const response = await fetch(`${API_URL}/hostels/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: formDataObj,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to update hostel")
      }

      toast.success("Hostel updated successfully!")
      navigate(`/hostels/${id}`)
    } catch (error) {
      console.error("Error updating hostel:", error)
      toast.error(error.message || "Failed to update hostel")
    } finally {
      setIsSubmitting(false)
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
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Hostel</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Hostel Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="gender_type" className="block text-sm font-medium text-gray-700 mb-1">
                Gender Type*
              </label>
              <select
                id="gender_type"
                name="gender_type"
                value={formData.gender_type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full p-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Describe your hostel, its features, and what makes it special..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Location Information</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                Nearest University*
              </label>
              <select
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.university ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select University</option>
                {universities.map((university) => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                ))}
              </select>
              {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
            </div>

            <div>
              <label htmlFor="distance_to_university" className="block text-sm font-medium text-gray-700 mb-1">
                Distance to University (km)*
              </label>
              <input
                type="number"
                id="distance_to_university"
                name="distance_to_university"
                value={formData.distance_to_university}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                className={`w-full p-2 border ${
                  errors.distance_to_university ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.distance_to_university && (
                <p className="mt-1 text-sm text-red-600">{errors.distance_to_university}</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing and Capacity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing and Capacity</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price per Semester (₵)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                className={`w-full p-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="beds_per_room" className="block text-sm font-medium text-gray-700 mb-1">
                Beds per Room*
              </label>
              <input
                type="number"
                id="beds_per_room"
                name="beds_per_room"
                value={formData.beds_per_room}
                onChange={handleChange}
                min="1"
                className={`w-full p-2 border ${
                  errors.beds_per_room ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.beds_per_room && <p className="mt-1 text-sm text-red-600">{errors.beds_per_room}</p>}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Rooms</h2>
            <button
              type="button"
              onClick={addRoom}
              className="flex items-center px-3 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Room
            </button>
          </div>

          {rooms.map((room, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Room {index + 1}</h3>
                {rooms.length > 1 && (
                  <button type="button" onClick={() => removeRoom(index)} className="text-red-600 hover:text-red-800">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number*</label>
                  <input
                    type="text"
                    name="number"
                    value={room.number}
                    onChange={(e) => handleRoomChange(index, e)}
                    className={`w-full p-2 border ${
                      errors.rooms && errors.rooms[index] && errors.rooms[index].number
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                  {errors.rooms && errors.rooms[index] && errors.rooms[index].number && (
                    <p className="mt-1 text-sm text-red-600">{errors.rooms[index].number}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity*</label>
                  <input
                    type="number"
                    name="capacity"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, e)}
                    min="1"
                    className={`w-full p-2 border ${
                      errors.rooms && errors.rooms[index] && errors.rooms[index].capacity
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                  {errors.rooms && errors.rooms[index] && errors.rooms[index].capacity && (
                    <p className="mt-1 text-sm text-red-600">{errors.rooms[index].capacity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <select
                    name="room_type"
                    value={room.room_type}
                    onChange={(e) => handleRoomChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₵)*</label>
                  <input
                    type="number"
                    name="price"
                    value={room.price}
                    onChange={(e) => handleRoomChange(index, e)}
                    min="1"
                    className={`w-full p-2 border ${
                      errors.rooms && errors.rooms[index] && errors.rooms[index].price
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                  {errors.rooms && errors.rooms[index] && errors.rooms[index].price && (
                    <p className="mt-1 text-sm text-red-600">{errors.rooms[index].price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "WiFi",
              "TV",
              "Kitchen",
              "Bathroom",
              "Study Room",
              "Laundry",
              "Security",
              "Water",
              "Electricity",
              "Fan",
              "Air Conditioning",
              "Parking",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleAmenityChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Current Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Hostel ${index + 1}`}
                      className={`h-24 w-full object-cover rounded-md ${
                        imagesToDelete.includes(image.id) ? "opacity-50" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleImageToDelete(image.id)}
                      className={`absolute top-1 right-1 rounded-full p-1 ${
                        imagesToDelete.includes(image.id) ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      } opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      {imagesToDelete.includes(image.id) ? <Plus className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </button>
                    {imagesToDelete.includes(image.id) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-600 font-medium">Marked for deletion</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Upload New Images (Max 5 total)</h3>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                  errors.images ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
          </div>

          {/* New Image Previews */}
          {newImagePreviewUrls.length > 0 && (
            <div>
              <h3 className="text-md font-medium mb-2">New Images to Add</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {newImagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`New Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/hostels/${id}`)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Hostel"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditHostel
