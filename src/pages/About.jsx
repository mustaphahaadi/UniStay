import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">About UniStay</h1>
            <p className="mt-4 text-xl">
              Connecting students with their perfect home away from home
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              UniStay was born from a simple observation: finding the right accommodation as a student can be overwhelming.
              We saw students struggling to find safe, affordable, and convenient places to stay near their universities.
              That's why we created UniStay - a platform that makes student housing simple, transparent, and accessible.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We're on a mission to transform the student housing experience. We believe every student deserves:
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-600">✓</span>
                <span className="ml-3 text-gray-600 dark:text-gray-300">Safe and secure accommodation options</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-600">✓</span>
                <span className="ml-3 text-gray-600 dark:text-gray-300">Transparent pricing and booking processes</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-600">✓</span>
                <span className="ml-3 text-gray-600 dark:text-gray-300">A supportive community of fellow students</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-600">✓</span>
                <span className="ml-3 text-gray-600 dark:text-gray-300">Easy access to essential amenities and services</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Trust & Safety</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We verify all accommodations and maintain strict safety standards to ensure peace of mind for our users.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We foster a supportive environment where students can connect, share experiences, and build lasting relationships.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously improve our platform to provide the best possible experience for students and hostel managers.
              </p>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Whether you're a student looking for accommodation or a hostel manager wanting to list your property,
            we'd love to have you join our growing community.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 