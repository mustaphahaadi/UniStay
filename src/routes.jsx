import { Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HostelListing from './pages/HostelListing';
import HostelDetails from './pages/HostelDetails';
import AddHostel from './pages/AddHostel';
import EditHostel from './pages/EditHostel';
import UserDashboard from './pages/UserDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerAnalytics from './pages/ManagerAnalytics';
import Bookings from './pages/Bookings';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
import Community from './pages/Community';
import ForumTopics from './pages/ForumTopics';
import TopicPosts from './pages/TopicPosts';
import MaintenanceRequests from './pages/MaintenanceRequests';
import Help from './pages/Help';
import EnhancedBooking from './pages/EnhancedBooking';
import { ROLES } from './config';

// Routes configuration - no protection for development
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/hostels',
    element: <HostelListing />,
  },
  {
    path: '/hostels/:id',
    element: <HostelDetails />,
  },
  {
    path: '/add-hostel',
    element: <AddHostel />,
  },
  {
    path: '/edit-hostel/:id',
    element: <EditHostel />,
  },
  {
    path: '/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/manager-dashboard',
    element: <ManagerDashboard />,
  },
  {
    path: '/analytics',
    element: <ManagerAnalytics />,
  },
  {
    path: '/bookings',
    element: <Bookings />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/messages',
    element: <Messages />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/forum/:category',
    element: <ForumTopics />,
  },
  {
    path: '/topic/:id',
    element: <TopicPosts />,
  },
  {
    path: '/maintenance',
    element: <MaintenanceRequests />,
  },
  {
    path: '/help',
    element: <Help />,
  },
  {
    path: '/book/:hostelId',
    element: <EnhancedBooking />,
  },
  {
    path: '/unauthorized',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            You don't have permission to access this page.
          </p>
          <Link to="/dashboard" className="inline-block px-6 py-2 bg-teal-600 text-white rounded-md">
            Go to Dashboard
          </Link>
        </div>
      </div>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;