import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Store = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12M9 7h6" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Store Information
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Visit us in Middle Village, Queens for premium wines and spirits
            </p>
          </div>

          {/* Store Rating */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">65 St Wine & Liquor</h2>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">4.9</span>
                <span className="text-gray-500">(48 reviews)</span>
              </div>
            </div>
            <p className="text-center text-gray-600">Premium Liquor Store • Wine Specialists</p>
          </div>

          {/* Store Details */}
          <div className="space-y-8">
            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900"> Location</h2>
              </div>
              <div className="space-y-3">
                <p className="text-lg text-gray-800 font-medium">64-30 Metropolitan Ave</p>
                <p className="text-lg text-gray-800 font-medium">Middle Village, NY 11379</p>
                <div className="flex items-center space-x-4 pt-4">
                  <a
                    href="tel:(718) 559-0105"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (718) 559-0105
                  </a>
                  <a
                    href="https://www.google.com/maps/place/65+St+Wine+%26+Liquor/@40.7123443,-73.8960677,17z/data=!4m6!3m5!1s0x89c25f57ca3f0825:0x3e28bf19985b5d7a!8m2!3d40.7123443!4d-73.8960677!16s%2Fg%2F11y2j_cznk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900"> Hours of Operation</h2>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">Open • Closes 10 PM</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Monday - Thursday</span>
                    <span className="text-gray-600">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Friday - Saturday</span>
                    <span className="text-gray-600">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-900">Sunday</span>
                    <span className="text-gray-600">11:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

          {/* Services */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
  <div className="flex items-start space-x-4 mb-6">
    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0v.01M8 6v6h8V6M8 12v6h8v-6" />
      </svg>
    </div>
    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Services</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[
      { icon: "🏪", title: "In-Store Pickup", desc: "Order online and conveniently pick up in store." },
      { icon: "💒", title: "Weddings & Events", desc: "Curated selections for unforgettable celebrations." },
      { icon: "🏢", title: "Corporate Gifting", desc: "Custom packages for clients, staff, and partners." },
      { icon: "🍷", title: "Expert Recommendations", desc: "Personalized advice from wine & spirit specialists." }
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


          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Store;