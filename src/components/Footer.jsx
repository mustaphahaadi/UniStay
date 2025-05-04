import { Link } from "react-router-dom"
import { Building, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import { APP_NAME, APP_DOMAIN } from "../config"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">{APP_NAME}</span>
            </div>
            <p className="text-gray-300 text-sm">
              Find the perfect student accommodation near universities across Ghana.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hostels" className="text-gray-300 hover:text-white">
                  Hostels
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Universities</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">University of Ghana</li>
              <li className="text-gray-300">Kwame Nkrumah University of Science and Technology</li>
              <li className="text-gray-300">University of Cape Coast</li>
              <li className="text-gray-300">Ghana Institute of Management and Public Administration</li>
              <li className="text-gray-300">Ashesi University</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                Accra, Ghana
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2" />
                +233 20 123 4567
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2" />
                info@{APP_DOMAIN}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
