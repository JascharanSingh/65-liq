import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-glass-wrapper mt-auto position-relative">
      {/* Background Image */}
      <img
        src="/images/footer-img.jpg"
        loading="lazy"
        alt="footer background"
        className="footer-bg-img"
      />

      {/* Glass Content Overlay */}
      <div className="footer-glass-content">
        <div className="container py-5">
          <div className="row g-4 text-center text-md-start">
            {/* About Section */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <h5 className="footer-heading mb-3 text-uppercase">About</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/store" className="footer-link">Our Store</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="footer-link">Contact</Link>
                </li>
                <li className="mb-2">
                  <Link to="/weddings" className="footer-link">Weddings</Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <h5 className="footer-heading mb-3 text-uppercase">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="/terms" className="footer-link">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            {/* Visit Us Section */}
            <div className="col-12 col-md-4 col-lg-6">
              <h5 className="footer-heading mb-3 text-uppercase">Visit Us</h5>
              <p className="footer-desc mb-1">
                <strong>Address:</strong> 64-30 Metropolitan Ave, Middle Village, NY 11379
              </p>
              <p className="footer-desc mb-1">
                <strong>Phone:</strong>{" "}
                <a href="tel:+17185590105" className="footer-link">(718) 559-0105</a>
              </p>
              <p className="footer-desc mb-0">
                <strong>Hours:</strong> Mon–Sat: 10AM–10PM, Sun: 11AM–6PM
              </p>
            </div>
          </div>

          <hr className="footer-divider my-4" />

          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} <strong>65 Liquor Store</strong>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;