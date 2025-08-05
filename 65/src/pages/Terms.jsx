import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services or making a purchase.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-gray-900">65 Liquor Store</span>. By accessing or using our website, you agree
              to be bound by the following terms and conditions. Please read them carefully.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Legal Drinking Age</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 21 years of age (or the legal drinking age in your jurisdiction) to purchase 
                or consume alcoholic beverages through our platform. We reserve the right to refuse service or 
                cancel orders if we suspect a violation of this policy.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">ID Verification</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Customers may be required to present a valid government-issued photo ID upon delivery or pickup 
                to verify age. Failure to provide appropriate identification will result in cancellation without refund.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Acceptance</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                All orders placed through our website are subject to acceptance and availability. We reserve the 
                right to limit quantities, cancel orders, or refuse service at our discretion.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">4</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Pricing & Payments</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Prices listed are in USD and subject to change without notice. We strive for accuracy but are not 
                responsible for typographical errors. Payments are processed securely. We do not store any card information.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">5</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Returns & Refunds</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Due to legal regulations and health standards, all alcohol sales are final. We do not accept returns 
                or offer refunds unless the product is defective or the wrong item was delivered.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-sm">6</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                65 Liquor Store shall not be liable for any damages arising from misuse of our website or products. 
                All services are provided "as is" without warranty of any kind.
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 font-semibold text-sm">7</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Please refer to our{" "}
                <a href="/privacy-policy" className="text-amber-600 hover:text-amber-700 underline font-medium">
                  Privacy Policy
                </a>{" "}
                for information on how we collect, use, and safeguard your data.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">8</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by the laws of the State of New York. Any disputes arising from your 
                use of our site shall be resolved in the courts of New York.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8 sm:p-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Questions About These Terms?</h3>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns regarding these Terms & Conditions, please contact our support team at{" "}
              <a href="mailto:support@65liquorstore.com" className="text-amber-600 hover:text-amber-700 font-medium">
                support@65liquorstore.com
              </a>
            </p>
          </div>

          {/* Last updated */}
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

export default Terms;