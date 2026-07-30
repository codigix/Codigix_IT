import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateSlug } from '../utils/slugify';
import { motion } from 'framer-motion';
import SEO from "../components/SEO";

import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`);
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Our Services | AI-Powered IT & Software Solutions"
        description="Explore Codigix Infotech's comprehensive range of AI-powered services: ERP/CRM development, machine learning, predictive analytics, and custom technology solutions."
        keywords="AI services, software development, ERP solutions, CRM development, machine learning services, custom IT solutions"
      />
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: `url(${getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1785386709/samples/codigix%20infotech/businessman-typing-laptop-keyboard-late-evening_ldtqu3.webp")})` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-full px-4">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Services</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-service-section-2 section-gap ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="service-item style-2"
                key={idx}
              >
                <div className="service-inner">
                  <div className="service-content">
                    <h4 className="title"><Link to={`/${generateSlug(service.title)}`}>{service.title}</Link></h4>
                    <p className="desc">                      {service.overview || 'Specialize in delivering AI-powered solution revolutionize the way businesses operate by leveraging the latest technology.'}
                    </p>
                  </div>
                  <div className="service-img bg-gray-50 dark:bg-[#0b0625] flex items-center justify-center p-4">
                    <img
                      src={getImageUrl(service.image, "assets/images/service", 800)}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-[150px] object-contain transition-transform duration-500 group-hover:scale-110"
                      width="400"
                      height="150"
                    />
                    <Link to={`/${generateSlug(service.title)}`} className="text-btn" aria-label={`Learn More about ${service.title}`}>
                      <span className="btn-text"><span>Learn More</span></span>
                      <span className="btn-icon"><span><i className="tji-arrow-right"></i></span></span>
                    </Link>
                  </div>
                </div>
                <span className="item-count">01.</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 
          <div className="tj-pagination flex justify-center">
            <ul>
              <li><span aria-current="page" className="page-numbers current">1</span></li>
              <li><a className="page-numbers" href="#">2</a></li>
              <li><a className="page-numbers" href="#">3</a></li>
              <li><a className="next page-numbers" href="#"><i className="tji-arrow-right"></i></a></li>
            </ul>
          </div> */}
        </div>
      </section>

      {/* <section className="tj-cta-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
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
