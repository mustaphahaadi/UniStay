"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { LANGUAGES, APP_NAME } from "../config"

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("language")

    if (savedLanguage) {
      return savedLanguage
    }

    // Check browser language
    const browserLang = navigator.language.split("-")[0]
    const isSupported = LANGUAGES.some((lang) => lang.code === browserLang)

    return isSupported ? browserLang : "en"
  }

  const [language, setLanguage] = useState(getInitialLanguage)
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would load translations from a file or API
        // For this example, we'll simulate loading translations
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Mock translations
        const mockTranslations = {
          en: {
            "app.name": APP_NAME,
            "nav.home": "Home",
            "nav.hostels": "Hostels",
            "nav.search": "Search",
            "nav.dashboard": "Dashboard",
            "nav.login": "Login",
            "nav.register": "Register",
            "nav.logout": "Logout",
            "nav.help": "Help",
            // Add more translations as needed
          },
          fr: {
            "app.name": APP_NAME,
            "nav.home": "Accueil",
            "nav.hostels": "Auberges",
            "nav.search": "Rechercher",
            "nav.dashboard": "Tableau de bord",
            "nav.login": "Connexion",
            "nav.register": "S'inscrire",
            "nav.logout": "Déconnexion",
            "nav.help": "Aide",
            // Add more translations as needed
          },
          // Add more languages as needed
        }

        setTranslations(mockTranslations)
      } catch (error) {
        console.error("Failed to load translations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  const changeLanguage = (code) => {
    if (LANGUAGES.some((lang) => lang.code === code)) {
      setLanguage(code)
      localStorage.setItem("language", code)
    }
  }

  const t = (key, params = {}) => {
    if (isLoading || !translations[language]) {
      return key
    }

    const translation = translations[language][key] || translations.en?.[key] || key

    // Replace parameters in translation
    return Object.entries(params).reduce((str, [param, value]) => str.replace(`{{${param}}}`, value), translation)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        isLoading,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
