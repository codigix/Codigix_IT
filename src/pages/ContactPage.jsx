import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    cfName: '',
    cfEmail: '',
    cfPhone: '',
    cfSubject: '0',
    cfMessage: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          cfName: '',
          cfEmail: '',
          cfPhone: '',
          cfSubject: '0',
          cfMessage: ''
        });
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: 'tji-location', title: 'Our Location', content: 'Office No: 514, 3rd Floor, Brahma Sky Uzuri, Pimpri-Chinchwad, Pune-18' },
    { icon: 'tji-envelop', title: 'Email us', links: [{ label: 'support@codigix.com', href: 'mailto:support@codigix.com' }, { label: 'info@codigix.com', href: 'mailto:info@codigix.com' }] },
    { icon: 'tji-phone', title: 'Call us', links: [{ label: '  70665 56768', href: 'tel:  70665 56768' }]},
    { icon: 'tji-chat', title: 'Live chat', links: [{ label: 'livechat@codigix.com', href: 'mailto:livechat@codigix.com' }, { label: 'Need help?', href: '#' }] }
  ];

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Codigix for AI-powered solutions, software engineering services, or to visit our location in Pune, India."
        keywords="contact, reach out, office location, support, AI solutions"
      />
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
                {success && <div className="alert alert-success mb-4 p-3 rounded" style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }}>Message sent successfully! We will get back to you soon.</div>}
                {error && <div className="alert alert-danger mb-4 p-3 rounded" style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>{error}</div>}
                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="text" name="cfName" placeholder="Full Name *" value={formData.cfName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="email" name="cfEmail" placeholder="Email Address *" value={formData.cfEmail} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input type="tel" name="cfPhone" placeholder="Phone number" value={formData.cfPhone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <div className="tj-nice-select-box">
                          <div className="tj-select">
                            <select name="cfSubject" value={formData.cfSubject} onChange={handleChange}>
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
                        <textarea name="cfMessage" id="message" placeholder="Type message *" value={formData.cfMessage} onChange={handleChange} required></textarea>
                      </div>
                    </div>
                    <div className="submit-btn">
                      <button className="tj-primary-btn" type="submit" disabled={submitting}>
                        <div className="btn-inner">
                          <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                          <span className="btn-text">{submitting ? 'Sending...' : 'Submit Now'}</span>
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
                 src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d12621.027783472839!2d73.73581225!3d18.64597255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bc2b95ac32be0ad%3A0x79aa58776507f0a9!2sCodigix%20Infotech%20-%20Marketing%20Agency%20in%20Pune%20%7C%20Digital%20Marketing%20for%20Hospitals%20%26%20Clinics%20%7C%20Healthcare%20Marketing%20Agency%2C%20Office%20No%3A%20514%2C%205th%20Floor%2C%20JRG3%2BPQG%2C%20Brahma%20Sky%20Uzuri%2C%20MIDC%2C%20Pimpri%20Colony%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411018!3m2!1d18.6268125!2d73.80443749999999!5e1!3m2!1sen!2sin!4v1772190821998!5m2!1sen!2sin"
                 style={{width: '100%', height: '100%', border: 0}}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                {/* <iframe
                  title="Google Maps"
                  src="https://maps.app.goo.gl/fvaiSihLMs6peDR87"
                  style={{width: '100%', height: '100%', border: 0}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe> */}
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
