import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationSystem from './components/NotificationSystem';

// Routes
import routes from './routes.jsx';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { MessagingProvider } from './contexts/MessagingContext';
import { CommunityProvider } from './contexts/CommunityContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading UniStay...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <FavoritesProvider>
                <MessagingProvider>
                  <CommunityProvider>
                    <Router>
                      <div className="app-container">
                        <Navbar />
                        <NotificationSystem />
                        <main className="main-content">
                          <Routes>
                            {routes.map((route, index) => (
                              <Route 
                                key={index}
                                path={route.path}
                                element={route.element}
                              />
                            ))}
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    </Router>
                  </CommunityProvider>
                </MessagingProvider>
              </FavoritesProvider>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;