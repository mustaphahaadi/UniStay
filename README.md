# UniStay

UniStay is a comprehensive accommodation platform designed specifically for university students, helping them find, book, and manage hostel accommodations near their campuses.

## 🏠 Features

- **Hostel Search & Booking**: Find and book student accommodations with an intuitive interface
- **User Profiles**: Personalized profiles for students and hostel managers
- **Interactive Maps**: Locate hostels and nearby services with integrated map views
- **Community Forum**: Connect with other students and share experiences
- **Booking Management**: Track and manage your accommodation bookings
- **Maintenance Requests**: Submit and track maintenance issues for your accommodation
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Real-time Notifications**: Stay updated with booking confirmations and messages
- **Favorites System**: Save and compare your preferred accommodations
- **Multi-language Support**: Access the platform in different languages

## 🚀 Tech Stack

- **Frontend**: React 19 with React Router for navigation
- **Styling**: TailwindCSS for responsive design
- **State Management**: React Context API
- **Charts & Analytics**: Recharts for data visualization
- **Notifications**: React Toastify
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint
- **PWA Support**: Service worker for offline capabilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd unistay
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Project Structure

```
unistay/
├── public/             # Static files
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── lib/            # Utility functions
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── .eslintrc.js        # ESLint configuration
├── index.html          # HTML template
├── postcss.config.cjs  # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

For any questions or feedback, please reach out.
