// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-4">
        <div className="row gy-4">
          {/* About Us */}
          <div className="col-sm-6 col-md-3">
            <h6>About Us</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Our Company</a></li>
              <li><a href="#" className="text-light text-decoration-none">Community Impact</a></li>
              <li><a href="#" className="text-light text-decoration-none">Social Responsibility</a></li>
              <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-light text-decoration-none">For the Media</a></li>
              <li><a href="#" className="text-light text-decoration-none">For the Trade</a></li>
            </ul>
          </div>

          {/* Store */}
          <div className="col-sm-6 col-md-3">
            <h6>Store</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Store Locator</a></li>
              <li><a href="#" className="text-light text-decoration-none">Classes & Events</a></li>
              <li><a href="#" className="text-light text-decoration-none">Book Our Room</a></li>
              <li><a href="#" className="text-light text-decoration-none">Gift Cards</a></li>
              <li><a href="#" className="text-light text-decoration-none">Weddings</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-sm-6 col-md-3">
            <h6>Customer Service</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Order Status</a></li>
              <li><a href="#" className="text-light text-decoration-none">Delivery</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-light text-decoration-none">Returns</a></li>
              <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          {/* Legal / App / Social */}
          <div className="col-sm-6 col-md-3">
            <h6>Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Terms & Conditions</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Accessibility Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-light mt-4" />

        <div className="text-center small text-muted">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;