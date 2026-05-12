import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    return <div className="react-preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <SEO 
        title="Our Services" 
        description="Explore our range of AI-powered services including custom technology solutions, predictive analytics, machine learning, and more."
        keywords="services, AI solutions, machine learning, data analysis, custom technology"
      />
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: `url(${getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1778412018/samples/codigix%20infotech/businessman-typing-laptop-keyboard-late-evening_ldtqu3.jpg")})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div class="service-item style-2 wow fadeInUp" data-wow-delay=".1s" key={idx}>
                <div class="service-inner">
                  <div class="service-content">
                    <h4 class="title"><Link to={`/services/details/${service.id}`}>{service.title}</Link></h4>
                    <p class="desc">                      {service.overview || 'Specialize in delivering AI-powered solution revolutionize the way businesses operate by leveraging the latest technology.'}
                    </p>
                  </div>
                  <div class="service-img">
                    <img
                      src={getImageUrl(service.image, "assets/images/service")}
                      alt={service.title}
                      className="w-fit h-[150px] object-cover  transition-transform duration-500 group-hover:scale-110"
                    />
                    <Link to={`/services/details/${service.id}`} class="text-btn" >
                      <span class="btn-text"><span>Learn More</span></span>
                      <span class="btn-icon"><span><i class="tji-arrow-right"></i></span></span>
                    </Link>
                  </div>
                </div>
                <span class="item-count">01.</span>
              </div>


            ))}
            
          </div>

          {/* 
          <div className="tj-pagination d-flex justify-content-center">
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
