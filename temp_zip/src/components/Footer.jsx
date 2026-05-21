import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="tj-footer-section footer-3 section-gap-top section-gap-x">
      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-cta">
                <div className="sec-heading style-3 wow fadeInUp" data-wow-delay=".5s">
                  <span className="sub-title"><i className="tji-subtitle-2"></i>Get Started</span>
                  <h2 className="sec-title">Let's Launch AI-Powered Project <img src="assets/images/shape/hand.webp" alt="" /> Here.</h2>
                </div>
                <div className="circle-text-wrap wow fadeInUp" data-wow-delay=".7s">
                  <span className="circle-text" style={{backgroundImage: "url(assets/images/cta/circle-text.webp)"}}></span>
                  <Link className="circle-icon" to="/contact"><span><i className="tji-plane-2"></i></span></Link>
                </div>
                <div className="cta-bg wow fadeIn" data-wow-delay=".3s"><img src="assets/images/cta/line-pattern.webp" alt="" /></div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="footer-main-area style-2">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-md-6">
              <div className="footer-widget footer-col-1">
                <div className="footer-logo">
                  <Link to="/"><img src="assets/images/logos/logo.png" alt="Codigix Logo" /></Link>
                </div>
                <div className="footer-text">
                  <p>Understanding client needs, defining goals, and designing tailored AI crafting's solutions.</p>
                </div>
                <div className="social-links style-2">
                  <ul>
                    <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="tji-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="tji-linkedin"></i></a></li>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="tji-instagram"></i></a></li>
                    <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer"><i className="tji-x-twitter"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
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
            <div className="col-xxl-4 col-xl-3 col-md-6">
              <div className="footer-widget widget-subscribe footer-col-4">
                <h3 className="title">Subscribe to Our Newsletter.</h3>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="email" name="email" placeholder="Enter email*" />
                    <button type="submit"><i className="tji-plane"></i></button>
                    <label htmlFor="agree"><input id="agree" type="checkbox" />Agree to our <a href="#">Terms & Condition?</a></label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tj-copyright-area-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright-content-area">
                <div className="copyright-text">
                  <p>&copy; 2025 <a href="https://themeforest.net/user/theme-junction/portfolio" target="_blank" rel="noopener noreferrer">Codigix</a> All right reserved</p>
                </div>
                <div className="copyright-menu">
                  <ul>
                    <li><Link to="/contact">Privacy Policy</Link></li>
                    <li><Link to="/contact">Terms & Condition</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
