"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"

const AddHostel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [universities, setUniversities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    university: '',
    distance_to_university: '',
    gender_type: 'mixed',
    price: '',
    beds_per_room: '',
    amenities: [],
    images: [],
  });
  const [rooms, setRooms] = useState([
    { number: '', capacity: '', room_type: 'standard', price: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [universitiesResponse, locationsResponse] = await Promise.all([
          fetch(`${API_URL}/universities/`),
          fetch(`${API_URL}/locations/`)
        ]);
        
        const universitiesData = await universitiesResponse.json();
        const locationsData = await locationsResponse.json();
        
        setUniversities(universitiesData);
        setLocations(locationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load form data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter(a => a !== value)
    }));
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], [name]: value };
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { number: '', capacity: '', room_type: 'standard', price: '' }]);
  };

  const removeRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 5 images
    if (imageFiles.length + files.length > 5) {
      toast.error('You can upload a maximum of 5 images');
      return;
    }
    
    setImageFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImageFiles(updatedFiles);
    setImagePreviewUrls(updatedPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Hostel name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.university) {
      newErrors.university = 'University is required';
    }
    
    if (!formData.distance_to_university) {
      newErrors.distance_to_university = 'Distance to university is required';
    } else if (isNaN(formData.distance_to_university) || Number.parseFloat(formData.distance_to_university) <= 0) {
      newErrors.distance_to_university = 'Distance must be a positive number';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.beds_per_room) {
      newErrors.beds_per_room = 'Beds per room is required';
    } else if (isNaN(formData.beds_per_room) || Number.parseInt(formData.beds_per_room) <= 0) {
      newErrors.beds_per_room = 'Beds per room must be a positive number';
    }
    
    // Validate rooms
    const roomErrors = [];
    rooms.forEach((room, index) => {
      const roomError = {};
      
      if (!room.number.trim()) {
        roomError.number = 'Room number is required';
      }
      
      if (!room.capacity) {
        roomError.capacity = 'Capacity is required';
      } else if (isNaN(room.capacity) || Number.parseInt(room.capacity) <= 0) {
        roomError.capacity = 'Capacity must be a positive number';
      }
      
      if (!room.price) {
        roomError.price = 'Price is required';
      } else if (isNaN(room.price) || Number.parseFloat(room.price) <= 0) {
        roomError.price = 'Price must be a positive number';
      }
      
      if (Object.keys(roomError).length > 0) {
        roomErrors[index] = roomError;
      }
    });
    
    if (roomErrors.length > 0) {
      newErrors.rooms = roomErrors;
    }
    
    if (imageFiles.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Create FormData object for file upload
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('location', formData.location);
      formDataObj.append('university', formData.university);
      formDataObj.append('distance_to_university', formData.distance_to_university);
      formDataObj.append('gender_type', formData.gender_type);
      formDataObj.append('price', formData.price);
      formDataObj.append('beds_per_room', formData.beds_per_room);
      
      // Append amenities
      formData.amenities.forEach(amenity => {
        formDataObj.append('amenities', amenity);
      });
      
      // Append rooms
      formDataObj.append('rooms', JSON.stringify(rooms));
      
      // Append images
      imageFiles.forEach(file => {
        formDataObj.append('images', file);
      });
      
      const response = await fetch(`${API_URL}/hostels/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formDataObj,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add hostel');
      }
      
      const data = await response.json();
      toast.success('Hostel added successfully!');
      navigate(`/hostels/${data.id}`);
    } catch (error) {
      console.error('Error adding hostel:', error);
      toast.error(error.message || 'Failed to add hostel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Hostel</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            </div>
            
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
                className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="mixed">Mixed</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
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
                className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            {/* Location Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Location Information</h2>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select a location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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
                className={`w-full p-2 border rounded-md ${errors.university ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select a university</option>
                {universities.map(university => (
                  <option key={university.id} value={university.id}>{university.name}</option>
                ))}
              </select>
              {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
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
                step="0.1"
                min="0"
                className={`w-full p-2 border rounded-md ${errors.distance_to_university ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.distance_to_university && <p className="text-red-500 text-sm mt-1">{errors.distance_to_university}</p>}
            </div>
            
            {/* Pricing and Capacity */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Pricing and Capacity</h2>
            </div>
            
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
                min="0"
                className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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
                className={`w-full p-2 border rounded-md ${errors.beds_per_room ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.beds_per_room && <p className="text-red-500 text-sm mt-1">{errors.beds_per_room}</p>}
            </div>
            
            {/* Amenities */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['WiFi', 'TV', 'Kitchen', 'Bathroom', 'Study Room', 'Security', 'Water', 'Electricity', 'Fan'].map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      name="amenities"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rooms */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Rooms</h2>
              
              {rooms.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Room {index + 1}</h3>
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoom(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor={`room-${index}-number`} className="block text-sm font-medium text-gray-700 mb-1">
                        Room Number*
                      </label>
                      <input
                        type="text"
                        id={`room-${index}-number`}
                        name="number"
                        value={room.number}
                        onChange={(e) => handleRoomChange(index, e)}
                        className={`w-full p-2 border rounded-md ${errors.rooms && errors.rooms[index]?.number ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.rooms && errors.rooms[index]?.number && (
                        <p className="text-red-500 text-sm mt-1">{errors.rooms[index].number}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`room-${index}-capacity`} className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity*
                      </label>
                      <input
                        type="number"
                        id={`room-${index}-capacity`}
                        name="capacity"
                        value={room.capacity}
                        onChange={(e) => handleRoomChange(index, e)}
                        min="1"
                        className={`w-full p-2 border rounded-md ${errors.rooms && errors.rooms[index]?.capacity ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.rooms && errors.rooms[index]?.capacity && (
                        <p className="text-red-500 text-sm mt-1">{errors.rooms[index].capacity}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`room-${index}-type`} className="block text-sm font-medium text-gray-700 mb-1">
                        Room Type*
                      </label>
                      <select
                        id={`room-${index}-type`}
                        name="room_type"
                        value={room.room_type}
                        onChange={(e) => handleRoomChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="standard">Standard</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor={`room-${index}-price`} className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₵)*
                      </label>
                      <input
                        type="number"
                        id={`room-${index}-price`}
                        name="price"
                        value={room.price}
                        onChange={(e) => handleRoomChange(index, e)}
                        min="0"
                        className={`w-full p-2 border rounded-md ${errors.rooms && errors.rooms[index]?.price ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.rooms && errors.rooms[index]?.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.rooms[index].price}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addRoom}
                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50"
              >
                Add Another Room
              </button>
            </div>
            
            {/* Images */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-4">Images</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images* (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>
              
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md mr-4 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Add Hostel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHostel;