import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const getImageUrl = config.getImageUrl;

export default function Footer() {
  return (
    <footer className="tj-footer-section footer-3 section-gap-top section-gap-x">
      <div className="footer-top-area">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="footer-cta">
                <div className="sec-heading style-3 wow fadeInUp" data-wow-delay=".5s">
                <span className="sub-title"><i className="tji-subtitle-2"></i>Get Started</span>
                <div className='main-sec'>
                <h2 className="sec-title">Let’s Launch AI-Powered </h2>
                <h2 className="sec-title-1 sec-title" > Project <img src={getImageUrl("assets/images/shape/hand.webp")} alt="Start your AI project with Codigix Infotech" width="40" height="40" loading="lazy" />
                  Here.
                </h2>
                </div>
              </div>
                <div className="circle-text-wrap wow fadeInUp" data-wow-delay=".7s">
                  <span className="circle-text" style={{backgroundImage: `url(${getImageUrl("assets/images/cta/circle-text.webp")})`}}></span>
                  <Link className="circle-icon" to="/contact" aria-label="Contact us to start your project"><span><i className="tji-plane-2"></i></span></Link>
                </div>
                <div className="cta-bg wow fadeIn" data-wow-delay=".3s"><img src={getImageUrl("assets/images/cta/line-pattern.webp")} alt="Abstract background pattern" width="500" height="200" loading="lazy" /></div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="footer-main-area style-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 justify-between">
            <div className="xl:w-1/4 px-4 md:w-1/2">
              <div className="footer-widget footer-col-1">
                <div className="footer-logo">
                  <Link to="/"><img src={getImageUrl("assets/images/logos/logo.png")} alt="Codigix Infotech - AI & Software Solutions Logo" width="160" height="60" loading="lazy" /></Link>
                </div>
                <div className="footer-text">
                  <p>Understanding client needs, defining goals, and designing tailored AI crafting's solutions.</p>
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
            <div className="2xl:w-1/6 px-4 xl:w-1/4 md:w-1/2">
              <div className="footer-widget widget-nav-menu footer-col-2">
                <h5 className="title">Quick Links</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/projects">Portfolio</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="xl:w-1/4 px-4 md:w-1/2">
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
            <div className="2xl:w-1/3 px-4 xl:w-1/4 md:w-1/2">
              <div className="footer-widget widget-subscribe footer-col-4">
                <h3 className="title">Subscribe to Our Newsletter.</h3>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="email" name="email" placeholder="Enter email*" aria-label="Email for newsletter" required />
                    <button type="submit" aria-label="Subscribe to newsletter"><i className="tji-plane"></i></button>
                    <label htmlFor="agree"><input id="agree" type="checkbox" required />Agree to our <a href="#">Terms & Condition?</a></label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tj-copyright-area-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="copyright-content-area">
                <div className="copyright-text">
                  <p>&copy; 2026 <a href="https://themeforest.net/user/theme-junction/portfolio" target="_blank" rel="noopener noreferrer">Codigix</a> All right reserved</p>
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
