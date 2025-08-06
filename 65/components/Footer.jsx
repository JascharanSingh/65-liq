import React from "react";
import ScrollToTopLink from "./ScrollToTopLink";

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
                  <ScrollToTopLink to="/store" className="footer-link">
                    Our Store
                  </ScrollToTopLink>
                </li>
                <li className="mb-2">
                  <ScrollToTopLink to="/contact" className="footer-link">
                    Contact
                  </ScrollToTopLink>
                </li>
                <li className="mb-2">
                  <ScrollToTopLink to="/weddings" className="footer-link">
                    Weddings
                  </ScrollToTopLink>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <h5 className="footer-heading mb-3 text-uppercase">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <ScrollToTopLink to="/privacy-policy" className="footer-link">
                    Privacy Policy
                  </ScrollToTopLink>
                </li>
                <li className="mb-2">
                  <ScrollToTopLink to="/terms" className="footer-link">
                    Terms & Conditions
                  </ScrollToTopLink>
                </li>
              </ul>
            </div>

            {/* Visit Us Section */}
            <div className="col-12 col-md-4 col-lg-6">
              <h5 className="footer-heading mb-3 text-uppercase">Visit Us</h5>
              <p className="footer-desc mb-1">
                <a  href="https://www.google.com/maps/place/65+St+Wine+%26+Liquor/@40.7123443,-73.8960677,17z/data=!4m6!3m5!1s0x89c25f57ca3f0825:0x3e28bf19985b5d7a!8m2!3d40.7123443!4d-73.8960677!16s%2Fg%2F11y2j_cznk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                >
                         <strong>Address:</strong> 64-30 Metropolitan Ave, Middle Village, NY 11379
                </a>
         
              </p>
              <p className="footer-desc mb-1">
                <strong>Phone:</strong>{" "}
                <a href="tel:+17185590105" className="footer-link">
                  (718) 559-0105
                </a>
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
