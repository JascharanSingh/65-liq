import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At <span className="font-semibold text-gray-900">65 Liquor Store</span>, we respect your privacy and are committed
              to protecting the limited information you share with us. This policy outlines how
              we collect, use, and safeguard basic details for order processing and communication.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We only collect essential data necessary to fulfill your order or respond to inquiries. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Contact information (e.g., email or phone)</li>
                <li>Delivery address (if applicable)</li>
                <li>Order and payment details (processed securely)</li>
                <li>Location verification for legal compliance (age 21+)</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-600 font-semibold text-sm">2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Age Verification</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 21 years old to purchase from 65 Liquor Store. We may request proof of age
                or use third-party verification tools to comply with local alcohol laws.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">3</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Information</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To process orders and send confirmation</li>
                <li>To handle pickup coordination or delivery</li>
                <li>To respond to customer service requests</li>
                <li>To meet legal or regulatory obligations</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-sm">4</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We use industry-standard encryption and secure payment processing. Your data is not shared with
                advertisers or unauthorized third parties.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">5</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You may contact us to access or delete any personal data we've stored. We respect your right
                to transparency and data removal.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 text-sm font-medium">
                Last Updated: August 4, 2025
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;