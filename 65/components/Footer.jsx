// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="footer-glass-wrapper mt-auto position-relative">
      {/* Background Image */}
      <img
        src="/footer-img.jpg"
        alt="footer background"
        className="footer-bg-img"
      />

      {/* Glass Overlay */}
      <div className="footer-glass-content">
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            {/* About */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-heading">About</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Our Company</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>

            {/* Store */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-heading">Store</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Store Locator</a></li>
                <li><a href="#" className="footer-link">Gift Cards</a></li>
                <li><a href="#" className="footer-link">Events</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-heading">Legal</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider mt-4" />

          <div className="text-center small text-light mt-3">
            © 2025 65 Liquor Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;