import React from "react";
import { Link } from "react-router-dom";

export default function NewFooter() {
  return (
    <footer>
      {/* CTA SECTION */}
      <section className="tj-cta-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
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
                    alt="AI Technology and Business Transformation"
                    width="500"
                    height="300"
                    loading="lazy"
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
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4 justify-between">

              {/* Logo & About */}
              <div className="xl:w-1/4 px-4 md:w-1/2">
                <div className="footer-widget footer-col-1">
                  <div className="footer-logo">
                    <Link to="/">
                      <img
                        src="/assets/images/logos/logo.webp"
                        alt="Codigix Logo"
                        width="160"
                        height="60"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  <div className="footer-text">
                    <p>
                      Understanding client needs, defining goals, and designing
                      tailored AI crafting solutions.
                    </p>
                  </div>
                  <div className="footer-contact" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <p style={{ color: '#a3a3a3', marginBottom: '10px' }}>
                      <i className="tji-envelop-2" style={{ marginRight: '10px' }}></i>
                      <a href="mailto:info@codigixinfotech.com" style={{ color: '#a3a3a3' }}>info@codigixinfotech.com</a>
                    </p>
                    <p style={{ color: '#a3a3a3' }}>
                      <i className="tji-phone-2" style={{ marginRight: '10px' }}></i>
                      <a href="tel:+919112706604" style={{ color: '#a3a3a3' }}>+91 9112706604</a>
                    </p>
                  </div>

                  <div className="social-links style-2">
                    <ul>
                      <li><a href="https://www.facebook.com/codigix.infotech" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><i className="tji-facebook"></i></a></li>
                      <li><a href="https://www.linkedin.com/company/codigix-infotech" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><i className="tji-linkedin"></i></a></li>
                      <li><a href="https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><i className="tji-instagram"></i></a></li>
                      <li><a href="https://x.com/CodigixI2994" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)"><i className="tji-x-twitter"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="2xl:w-1/6 px-4 xl:w-1/4 md:w-1/2">
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
              <div className="xl:w-1/4 px-4 md:w-1/2">
                <div className="footer-widget widget-nav-menu footer-col-3">
                  <h5 className="title">Our Services</h5>
                  <ul>
                    <li><Link to="/ai-powered-solutions">AI-Powered Solutions</Link></li>
                    <li><Link to="/custom-technology">Custom Technology</Link></li>
                    <li><Link to="/predictive-analytics">Predictive Analytics</Link></li>
                    <li><Link to="/machine-learning">Machine Learning</Link></li>
                    <li><Link to="/language-processing">Language Processing</Link></li>
                    <li><Link to="/computer-vision">Computer Vision</Link></li>
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="2xl:w-1/3 px-4 xl:w-1/4 md:w-1/2">
                <div className="footer-widget widget-subscribe footer-col-4">
                  <h3 className="title">Subscribe to Our Newsletter</h3>

                  <form className="subscribe-form">
                    <input type="email" placeholder="Enter email*" aria-label="Email for newsletter" required />
                    <button type="submit" aria-label="Subscribe to newsletter">
                      <i className="tji-plane"></i>
                    </button>

                    <label htmlFor="agree">
                      <input id="agree" type="checkbox" required /> Agree to our{" "}
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
          <div className="container mx-auto px-4">
            <div className="copyright-content-area">
              <p>
                © 2026 Codigix. All rights reserved.
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
