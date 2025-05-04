"use client"

import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../contexts/AuthContext"

const DashboardLayout = () => {
  const { user, isManager } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isManager={isManager()} />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.first_name || "User"}</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
