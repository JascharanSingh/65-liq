import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Wedding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12M9 7h6"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Weddings & Special Events
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Celebrate your love story with the perfect selection of premium wines and spirits.
            </p>
          </div>
          
          {/* How It Works Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Seamless Planning Process
              </h2>
              <p className="text-lg text-gray-700">
                Planning your event's beverage menu is easy with our three-step approach.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book a Consultation</h3>
                <p className="text-sm text-gray-600">
                  Let’s discuss your vision, budget, and guest preferences in a quick, personal meeting.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Your Package</h3>
                <p className="text-sm text-gray-600">
                  Our experts will help you select the perfect drinks, from rare wines to signature cocktails.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">On-Time Delivery</h3>
                <p className="text-sm text-gray-600">
                  We ensure all your selections are delivered fresh and on time, ready for your celebration.
                </p>
              </div>
            </div>
          </div>
          
          {/* Featured Services Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Event Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "🍷", title: "Customized Wine & Spirit Lists", desc: "Craft a unique beverage menu tailored to your event's theme and taste." },
                { icon: "📦", title: "Bulk & Case Discounts", desc: "Get special pricing on large orders to stay within your budget." },
                { icon: "🚚", title: "Guaranteed On-Time Delivery", desc: "Enjoy stress-free planning with reliable and punctual delivery." },
                { icon: "🏷️", title: "Personalized Labeling", desc: "Add a unique touch with custom labels for a memorable experience." },
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-5 bg-gray-50 rounded-xl hover:shadow-sm transition">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">{service.title}</h3>
                    <p className="text-sm text-gray-700 leading-snug mt-1">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What Our Clients Say</h2>
            </div>
            <blockquote className="space-y-4 text-center">
              <p className="text-lg text-gray-700 font-medium leading-relaxed italic">
                “65 St Wine & Liquor made our wedding planning so much easier. The team was incredibly helpful and the selection was perfect. Our guests loved the wine pairings!”
              </p>
              <footer className="text-gray-500">
                — Jessica & Mark, Queens, NY
              </footer>
            </blockquote>
          </div>
          
          {/* Final CTA Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-rose-50 to-red-50 p-8 rounded-2xl border border-rose-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Start Planning Your Dream Event Today
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Ready to create an unforgettable celebration? Get in touch with our event specialists for a free, no-obligation consultation.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 16v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2a4 4 0 004 4h10a4 4 0 004-4z"
                />
              </svg>
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wedding;