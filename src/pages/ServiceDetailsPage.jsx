import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceDetailsPage() {
  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(/assets/images/bg/pheader-bg.webp)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Service Details</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Service Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-service-details-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="service-details-content">
                <div className="service-details-img">
                  <img src="/assets/images/service/service-details.webp" alt="Service Details" />
                </div>
                <h2 className="title">AI-Powered Solutions</h2>
                <p className="desc">Our AI-Powered Solutions are designed to revolutionize the way your business operates. We specialize in delivering cutting-edge artificial intelligence technologies that transform your business processes and enhance decision-making capabilities.</p>
                
                <h3>Key Features</h3>
                <ul className=" service-list-ul">
                  <li><span><i class="tji-check-2"></i></span>Advanced Machine Learning Algorithms</li>
                  <li><span><i class="tji-check-2"></i></span>Real-time Data Processing</li>
                  <li><span><i class="tji-check-2"></i></span>Scalable Cloud Infrastructure</li>
                  <li><span><i class="tji-check-2"></i></span>24/7 Technical Support</li>
                  <li><span><i class="tji-check-2"></i></span>Custom Integration Services</li>
                  <li><span><i class="tji-check-2"></i></span>Comprehensive Analytics Dashboard</li>
                </ul>

                <h3>How It Works</h3>
                <p>Our AI solutions leverage the latest deep learning technologies and machine learning models to provide intelligent automation and predictive analytics. We work closely with your team to understand your specific business needs and deliver customized solutions that drive measurable results.</p>

                <p>With our expertise in natural language processing, computer vision, and predictive analytics, we help you stay ahead of the competition and unlock new opportunities for growth.</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-sidebar">
                <div className="service-sidebar-box">
                  <h3 className="title">Other Services</h3>
                  <ul className="service-list">
                    <li><Link to="/services/details">Custom Technology Solutions</Link></li>
                    <li><Link to="/services/details">Predictive Analytics</Link></li>
                    <li><Link to="/services/details">Machine Learning</Link></li>
                    <li><Link to="/services/details">Computer Vision</Link></li>
                    <li><Link to="/services/details">Natural Language Processing</Link></li>
                  </ul>
                </div>

                {/* <div className="service-sidebar-box">
                  <h3 className="title">Get Started</h3>
                  <p>Ready to implement AI-powered solutions in your business?</p>
                  <Link className="tj-primary-btn" to="/contact">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                      <span className="btn-text">Contact Us</span>
                      <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                    </div>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
