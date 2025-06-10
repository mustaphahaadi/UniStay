import { RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { NotificationProvider } from "./contexts/NotificationContext"
import { FavoritesProvider } from "./contexts/FavoritesContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import { MessagingProvider } from "./contexts/MessagingContext"
import { CommunityProvider } from "./contexts/CommunityContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import DevTools from "./components/DevTools"
import NotificationSystem from "./components/NotificationSystem"
import ErrorBoundary from "./components/ErrorBoundary"
import router from "./routes"

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <FavoritesProvider>
                <MessagingProvider>
                  <CommunityProvider>
                    <RouterProvider router={router} />
                    <Toaster position="top-right" />
                  </CommunityProvider>
                </MessagingProvider>
              </FavoritesProvider>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App