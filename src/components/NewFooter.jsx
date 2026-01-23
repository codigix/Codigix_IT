import React from "react";
import { Link } from "react-router-dom";

export default function NewFooter() {
  return (
    <footer>
      {/* CTA SECTION */}
      <section className="tj-cta-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-area wow fadeInUp" data-wow-delay=".3s">
                <div className="cta-content">
                  <h2 className="title">
                    Ready to Elevate Your Business with AI?
                  </h2>

                  <Link to="/contact" className="tj-primary-btn btn-light">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon">
                        <i className="tji-arrow-right"></i>
                      </span>
                      <span className="btn-text">Get Started Today</span>
                      <span className="btn-icon">
                        <i className="tji-arrow-right"></i>
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="cta-img">
                  <img
                    src="/assets/images/cta/cta-bg.webp"
                    alt="CTA"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="tj-footer-section footer-1 section-gap-x">
        <div className="footer-top-shape"></div>

        <div className="footer-main-area">
          <div className="container">
            <div className="row justify-content-between">

              {/* Logo & About */}
              <div className="col-xl-3 col-md-6">
                <div className="footer-widget footer-col-1">
                  <div className="footer-logo">
                    <Link to="/">
                      <img
                        src="/assets/images/logos/logo.png"
                        alt="Codigix Logo"
                      />
                    </Link>
                  </div>

                  <div className="footer-text">
                    <p>
                      Understanding client needs, defining goals, and designing
                      tailored AI crafting solutions.
                    </p>
                  </div>

                  <div className="social-links style-2">
                    <ul>
                      <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="tji-facebook"></i></a></li>
                      <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><i className="tji-linkedin"></i></a></li>
                      <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="tji-instagram"></i></a></li>
                      <li><a href="https://x.com/" target="_blank" rel="noreferrer"><i className="tji-x-twitter"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-xxl-2 col-xl-3 col-md-6">
                <div className="footer-widget widget-nav-menu footer-col-2">
                  <h5 className="title">Quick Links</h5>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/projects">Portfolio</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                  </ul>
                </div>
              </div>

              {/* Services */}
              <div className="col-xl-3 col-md-6">
                <div className="footer-widget widget-nav-menu footer-col-3">
                  <h5 className="title">Our Services</h5>
                  <ul>
                    <li><Link to="/services/details">AI-Powered Solutions</Link></li>
                    <li><Link to="/services/details">Custom Technology</Link></li>
                    <li><Link to="/services/details">Predictive Analytics</Link></li>
                    <li><Link to="/services/details">Machine Learning</Link></li>
                    <li><Link to="/services/details">Language Processing</Link></li>
                    <li><Link to="/services/details">Computer Vision</Link></li>
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="col-xxl-4 col-xl-3 col-md-6">
                <div className="footer-widget widget-subscribe footer-col-4">
                  <h3 className="title">Subscribe to Our Newsletter</h3>

                  <form className="subscribe-form">
                    <input type="email" placeholder="Enter email*" />
                    <button type="submit">
                      <i className="tji-plane"></i>
                    </button>

                    <label htmlFor="agree">
                      <input id="agree" type="checkbox" /> Agree to our{" "}
                      <Link to="/terms">Terms & Condition</Link>
                    </label>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="tj-copyright-area">
          <div className="container">
            <div className="copyright-content-area">
              <p>
                © 2025 Codigix. All rights reserved.
              </p>

              <ul className="copyright-menu">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Condition</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
