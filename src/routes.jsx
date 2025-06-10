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
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import DevTools from "./components/DevTools"
import NotificationSystem from "./components/NotificationSystem"

const RootLayout = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <NotificationSystem />
    <main className="main-content">
      {children}
    </main>
    <Footer />
    <DevTools />
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Home />
      </RootLayout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (
      <RootLayout>
        <GuestOnlyRoute>
          <Login />
        </GuestOnlyRoute>
      </RootLayout>
    )
  },
  {
    path: "/register",
    element: (
      <RootLayout>
        <GuestOnlyRoute>
          <Register />
        </GuestOnlyRoute>
      </RootLayout>
    )
  },
  {
    path: "/forgot-password",
    element: (
      <RootLayout>
        <ForgotPassword />
      </RootLayout>
    )
  },
  {
    path: "/reset-password",
    element: (
      <RootLayout>
        <ResetPassword />
      </RootLayout>
    )
  },
  {
    path: "/hostels",
    element: (
      <RootLayout>
        <HostelListing />
      </RootLayout>
    )
  },
  {
    path: "/hostels/:id",
    element: (
      <RootLayout>
        <HostelDetails />
      </RootLayout>
    )
  },
  {
    path: "/privacy-policy",
    element: (
      <RootLayout>
        <PrivacyPolicy />
      </RootLayout>
    )
  },
  {
    path: "/terms-of-service",
    element: (
      <RootLayout>
        <TermsOfService />
      </RootLayout>
    )
  },
  {
    path: "/about",
    element: (
      <RootLayout>
        <About />
      </RootLayout>
    )
  },
  {
    path: "/contact",
    element: (
      <RootLayout>
        <Contact />
      </RootLayout>
    )
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
    element: (
      <RootLayout>
        <Search />
      </RootLayout>
    )
  },
  {
    path: "/community",
    element: (
      <RootLayout>
        <Community />
      </RootLayout>
    )
  },
  {
    path: "/forum/:category",
    element: (
      <RootLayout>
        <ForumTopics />
      </RootLayout>
    )
  },
  {
    path: "/topic/:id",
    element: (
      <RootLayout>
        <TopicPosts />
      </RootLayout>
    )
  },
  {
    path: "/maintenance",
    element: (
      <RootLayout>
        <MaintenanceRequests />
      </RootLayout>
    )
  },
  {
    path: "/help",
    element: (
      <RootLayout>
        <Help />
      </RootLayout>
    )
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <NotFound />
      </RootLayout>
    )
  }
])

export default router