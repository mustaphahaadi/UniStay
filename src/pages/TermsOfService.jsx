import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using UniStay, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To use certain features of our service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Booking and Payments</h2>
            <p className="text-gray-600 dark:text-gray-300">
              When making a booking through UniStay:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>You agree to pay all fees and charges</li>
              <li>Payment is processed securely through our payment providers</li>
              <li>Cancellation policies vary by hostel and booking type</li>
              <li>Refunds are subject to the hostel's cancellation policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You agree not to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Violate any laws or regulations</li>
              <li>Impersonate others or provide false information</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Harass, abuse, or harm others</li>
              <li>Post unauthorized commercial content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300">
              All content on UniStay, including but not limited to text, graphics, logos, and software, is the property of UniStay
              or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              UniStay shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from
              your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or
              through the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4">
              <Link
                to="/contact"
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Contact Support
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 