// src/App.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WineAndSpirits from '../components/WineAndSpirits';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container py-5">
          <h1 className="text-center mb-4">Welcome to Bootstrap + Vite</h1>
          <p className="text-center">This is your homepage layout.</p>

          {/* Wine & Spirits Section */}
          <WineAndSpirits />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;