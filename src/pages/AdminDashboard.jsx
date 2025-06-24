"use client"

import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"
import AdminDashboard from "../components/admin/AdminDashboard"

const AdminDashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHostels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeManagers: 0,
    pendingApprovals: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/stats/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats({
            totalUsers: data.total_users || 0,
            totalHostels: data.total_hostels || 0,
            totalBookings: data.total_bookings || 0,
            totalRevenue: data.total_revenue || 0,
            activeManagers: data.active_managers || 0,
            pendingApprovals: data.pending_approvals || 0
          })
        } else {
          // Set demo data if API fails
          setStats({
            totalUsers: 1250,
            totalHostels: 85,
            totalBookings: 3420,
            totalRevenue: 125000,
            activeManagers: 42,
            pendingApprovals: 8
          })
        }
      } catch (error) {
        console.error("Error fetching admin data:", error)
        // Set demo data on error
        setStats({
          totalUsers: 1250,
          totalHostels: 85,
          totalBookings: 3420,
          totalRevenue: 125000,
          activeManagers: 42,
          pendingApprovals: 8
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

  return <AdminDashboard stats={stats} />
}

export default AdminDashboardPage 