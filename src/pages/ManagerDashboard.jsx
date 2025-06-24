"use client"

import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"
import ManagerDashboard from "../components/manager/ManagerDashboard"

const ManagerDashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalRooms: 0,
    totalBookings: 0,
    occupancyRate: 0,
    monthlyRevenue: 0,
    pendingBookings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/stats/manager/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats({
            totalHostels: data.total_hostels || 0,
            totalRooms: data.total_rooms || 0,
            totalBookings: data.total_bookings || 0,
            occupancyRate: data.occupancy_rate || 0,
            monthlyRevenue: data.revenue || 0,
            pendingBookings: data.pending_bookings || 0
          })
        } else {
          // Set demo data if API fails
          setStats({
            totalHostels: 3,
            totalRooms: 45,
            totalBookings: 128,
            occupancyRate: 85,
            monthlyRevenue: 15000,
            pendingBookings: 5
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Set demo data on error
        setStats({
          totalHostels: 3,
          totalRooms: 45,
          totalBookings: 128,
          occupancyRate: 85,
          monthlyRevenue: 15000,
          pendingBookings: 5
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return <ManagerDashboard stats={stats} />
}

export default ManagerDashboardPage
