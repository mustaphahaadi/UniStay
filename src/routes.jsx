import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute, ManagerRoute, AdminRoute, GuestOnlyRoute } from "./utils/routeUtils.jsx"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import About from "./pages/About"
import Contact from "./pages/Contact"
import UserDashboard from "./pages/UserDashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import UserManagement from "./pages/admin/UserManagement"
import HostelManagement from "./pages/admin/HostelManagement"
import BookingManagement from "./pages/admin/BookingManagement"
import AdminAnalytics from "./pages/admin/AdminAnalytics"
import DashboardLayout from "./layouts/DashboardLayout"
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import HostelListing from './pages/HostelListing'
import HostelDetails from './pages/HostelDetails'
import AddHostel from './pages/AddHostel'
import EditHostel from './pages/EditHostel'
import ManagerAnalytics from './pages/ManagerAnalytics'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import Settings from './pages/Settings'
import UserProfile from './pages/UserProfile'
import Messages from './pages/Messages'
import Community from './pages/Community'
import ForumTopics from './pages/ForumTopics'
import TopicPosts from './pages/TopicPosts'
import MaintenanceRequests from './pages/MaintenanceRequests'
import Help from './pages/Help'
import ErrorPage from "./pages/ErrorPage"

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (
      <GuestOnlyRoute>
        <Login />
      </GuestOnlyRoute>
    )
  },
  {
    path: "/register",
    element: (
      <GuestOnlyRoute>
        <Register />
      </GuestOnlyRoute>
    )
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/hostels",
    element: <HostelListing />
  },
  {
    path: "/hostels/:id",
    element: <HostelDetails />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "messages",
        element: <Messages />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  },
  {
    path: "/manager",
    element: (
      <ManagerRoute>
        <DashboardLayout />
      </ManagerRoute>
    ),
    children: [
      {
        index: true,
        element: <ManagerDashboard />
      },
      {
        path: "analytics",
        element: <ManagerAnalytics />
      },
      {
        path: "add-hostel",
        element: <AddHostel />
      },
      {
        path: "edit-hostel/:id",
        element: <EditHostel />
      },
      {
        path: "messages",
        element: <Messages />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "users",
        element: <UserManagement />
      },
      {
        path: "hostels",
        element: <HostelManagement />
      },
      {
        path: "bookings",
        element: <BookingManagement />
      },
      {
        path: "analytics",
        element: <AdminAnalytics />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/community",
    element: <Community />
  },
  {
    path: "/forum/:category",
    element: <ForumTopics />
  },
  {
    path: "/topic/:id",
    element: <TopicPosts />
  },
  {
    path: "/maintenance",
    element: <MaintenanceRequests />
  },
  {
    path: "/help",
    element: <Help />
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router