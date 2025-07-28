// src/App.jsx
import React from "react";
import Footer from "../components/Footer";
import WineAndSpirits from "../components/WineAndSpirits";
import Header from "../components/Header";
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Header />
        <WineAndSpirits />
      </div>
      <Footer />
    </div>
  );
}

export default App;