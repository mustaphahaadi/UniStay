"use client"

import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTheme } from "../contexts/ThemeContext"
import { APP_NAME } from "../config"

const MainLayout = () => {
  const { theme } = useTheme()
  const location = useLocation()

  // Update document title based on route
  useEffect(() => {
    const path = location.pathname
    let title = APP_NAME

    if (path !== "/") {
      // Convert path to title case
      const pageName = path
        .split("/")[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      title = `${pageName} | ${APP_NAME}`
    }

    document.title = title
  }, [location])

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Navbar />
      <main id="main-content" className="flex-grow bg-white dark:bg-gray-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
