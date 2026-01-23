import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

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
    return <div className="preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(assets/images/bg/pheader-bg.webp)"}}>
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

      <section className="tj-service-section-2 section-gap">
        <div className="container">
          <div className="row row-gap-4">
            {services.map((service, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="service-item style-2 wow fadeInUp" data-wow-delay={service.delay}>
                  <div className="service-inner">
                    <div className="service-content">
                      <h4 className="title"><Link to="/services/details">{service.title}</Link></h4>
                      <p className="desc">{service.desc}</p>
                    </div>
                    <div className="service-img">
                      <img src={`assets/images/service/${service.image}.jpg`} alt={service.title} />
                      <Link className="text-btn" to="/services/details">
                        <span className="btn-text"><span>Learn More</span></span>
                        <span className="btn-icon"><span><i className="tji-arrow-right"></i></span></span>
                      </Link>
                    </div>
                  </div>
                  <span className="item-count">{service.num}.</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tj-pagination d-flex justify-content-center">
            <ul>
              <li><span aria-current="page" className="page-numbers current">1</span></li>
              <li><a className="page-numbers" href="#">2</a></li>
              <li><a className="page-numbers" href="#">3</a></li>
              <li><a className="next page-numbers" href="#"><i className="tji-arrow-right"></i></a></li>
            </ul>
          </div>
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
