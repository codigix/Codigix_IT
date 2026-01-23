import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const contactInfo = [
    { icon: 'tji-location', title: 'Our Location', content: '993 Renner Burg, West Rond, MT 94251-030' },
    { icon: 'tji-envelop', title: 'Email us', links: [{ label: 'support@codigix.com', href: 'mailto:support@codigix.com' }, { label: 'info@codigix.com', href: 'mailto:info@codigix.com' }] },
    { icon: 'tji-phone', title: 'Call us', links: [{ label: '+1 (009) 544-7818', href: 'tel:10095447818' }, { label: '+1 (009) 880-1810', href: 'tel:10098801810' }] },
    { icon: 'tji-chat', title: 'Live chat', links: [{ label: 'livechat@codigix.com', href: 'mailto:livechat@codigix.com' }, { label: 'Need help?', href: '#' }] }
  ];

  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(assets/images/bg/pheader-bg.webp)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Contact Us</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tj-contact-area section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading text-center">
                <span className="sub-title"><i className="tji-subtitle"></i>Contact info</span>
                <h2 className="sec-title">Reach Out To Us</h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {contactInfo.map((info, idx) => (
              <div className="col-xl-3 col-lg-6 col-sm-6" key={idx}>
                <div className="contact-item style-2">
                  <div className="contact-icon">
                    <i className={info.icon}></i>
                  </div>
                  <h3 className="contact-title">{info.title}</h3>
                  {info.content ? (
                    <p>{info.content}</p>
                  ) : (
                    <ul className="contact-list">
                      {info.links.map((link, linkIdx) => (
                        <li key={linkIdx}><a href={link.href}>{link.label}</a></li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="tj-contact-section-2 section-gap-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-form">
                <h3 className="title">Feel Free to Get in Touch or Visit our Location.</h3>
                <form id="contact-form">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="text" name="cfName" placeholder="Full Name *" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="email" name="cfEmail" placeholder="Email Address *" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="tel" name="cfPhone" placeholder="Phone number *" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <div className="tj-nice-select-box">
                          <div className="tj-select">
                            <select name="cfSubject">
                              <option value="0">Chose a option</option>
                              <option value="1">Custom Technology</option>
                              <option value="2">AI-Powered Solutions</option>
                              <option value="3">Predictive Analytics</option>
                              <option value="4">Machine Learning</option>
                              <option value="5">Computer Vision</option>
                              <option value="6">Language Processing</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-input message-input">
                        <textarea name="cfMessage" id="message" placeholder="Type message *"></textarea>
                      </div>
                    </div>
                    <div className="submit-btn">
                      <button className="tj-primary-btn" type="submit">
                        <div className="btn-inner">
                          <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                          <span className="btn-text">Submit Now</span>
                          <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="map-area">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d316440.5712687838!2d-74.01091796224334!3d40.67186885683901!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1745918398047!5m2!1sen!2sbd"
                  style={{width: '100%', height: '100%', border: 0}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="tj-cta-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-area wow fadeInUp" data-wow-delay=".3s">
                <div className="cta-content">
                  <h2 className="title">Ready to Elevate Your Business with AI?</h2>
                  <Link className="tj-primary-btn btn-light" to="/contact">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                      <span className="btn-text">Get Started Today</span>
                      <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div className="cta-img">
                  <img src="assets/images/cta/cta-bg.webp" alt="CTA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
