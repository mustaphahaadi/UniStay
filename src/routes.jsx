import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
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

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Routes configuration
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
    path: '/search',
    element: <Search />,
  },
  {
    path: '/help',
    element: <Help />,
  },
  
  // Protected routes - User
  {
    path: '/dashboard',
    element: <ProtectedRoute><UserDashboard /></ProtectedRoute>,
  },
  {
    path: '/bookings',
    element: <ProtectedRoute><Bookings /></ProtectedRoute>,
  },
  {
    path: '/favorites',
    element: <ProtectedRoute><Favorites /></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><Settings /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
  },
  {
    path: '/messages',
    element: <ProtectedRoute><Messages /></ProtectedRoute>,
  },
  {
    path: '/maintenance',
    element: <ProtectedRoute><MaintenanceRequests /></ProtectedRoute>,
  },
  
  // Protected routes - Community
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/community/forums/:forumId',
    element: <ForumTopics />,
  },
  {
    path: '/community/topics/:topicId',
    element: <TopicPosts />,
  },
  
  // Protected routes - Host/Manager
  {
    path: '/manager',
    element: <ProtectedRoute requiredRole="manager"><ManagerDashboard /></ProtectedRoute>,
  },
  {
    path: '/manager/analytics',
    element: <ProtectedRoute requiredRole="manager"><ManagerAnalytics /></ProtectedRoute>,
  },
  {
    path: '/add-hostel',
    element: <ProtectedRoute requiredRole="manager"><AddHostel /></ProtectedRoute>,
  },
  {
    path: '/edit-hostel/:id',
    element: <ProtectedRoute requiredRole="manager"><EditHostel /></ProtectedRoute>,
  },
  
  // Fallback route
  {
    path: '*',
    element: (
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    ),
  },
];

export default routes;