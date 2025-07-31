import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WineAndSpirits from "../components/WineAndSpirits";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin route without layout */}
        <Route path="/admin" element={<Admin />} />

        {/* All public routes wrapped with Header + Footer */}
        <Route
          path="*"
          element={
            <div className="d-flex flex-column min-vh-100">
              <div className="flex-grow-1">
                <Header />
                
                <WineAndSpirits />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;