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
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
