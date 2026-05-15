import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        
        // Fetch all services for sidebar and navigation
        const allServicesResponse = await fetch(`${API_BASE_URL}/services`);
        const allServicesData = await allServicesResponse.json();
        
        if (!allServicesResponse.ok) {
          console.error('All services fetch error:', allServicesData.error);
        }
        
        setServices(Array.isArray(allServicesData) ? allServicesData : []);

        let serviceId = id;
        if (!serviceId && Array.isArray(allServicesData) && allServicesData.length > 0) {
          serviceId = allServicesData[0].id;
        }

        if (serviceId) {
          // Fetch current service details
          const serviceResponse = await fetch(`${API_BASE_URL}/services/${serviceId}`);
          const serviceData = await serviceResponse.json();
          
          if (serviceResponse.ok) {
            setService(serviceData);
          } else {
            console.error('Service details fetch error:', serviceData.error);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  if (loading) {
    return <div className="react-preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  if (!service) {
    return <div className="text-center py-20">Service not found</div>;
  }

  const currentIndex = Array.isArray(services) ? services.findIndex(s => s.id === (service ? service.id : null)) : -1;
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex !== -1 && currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const faqs = [
    {
      question: "Are you licensed and insured?",
      answer: "Yes, absolutely. Our company is fully licensed and insured to operate in the AI and technology solutions sector. We comply with all industry standards and local regulations to ensure the safety, legality, and quality of our work."
    },
    {
      question: "Do you offer emergency services?",
      answer: "We offer priority support and emergency response for our enterprise clients. Our team is dedicated to ensuring your critical systems remain operational and any issues are addressed promptly."
    },
    {
      question: "How long will my project take?",
      answer: "Project timelines vary based on scope and complexity. A typical website development project takes 4-6 weeks, while more complex AI or ERP integrations may take 3-6 months. We provide detailed timelines during the strategy phase."
    },
    {
      question: "Do you handle smart home installations?",
      answer: "While our core focus is on enterprise AI and software solutions, we do provide smart automation and IoT integrations for commercial and high-end residential projects that require advanced technology stacks."
    },
    {
      question: "How can I schedule an appointment?",
      answer: "You can schedule a consultation by clicking the 'Get In Touch' button or filling out our contact form. Our team will reach out within 24 hours to discuss your project requirements."
    }
  ];

  const maintenanceServices = [
    {
      step: "01.",
      title: "Unmatched Precision in Every Build",
      desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
    },
    {
      step: "02.",
      title: "Sustainable Technical Practices",
      desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
    },
    {
      step: "03.",
      title: "Comprehensive Project Management",
      desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
    }
  ];

  const keyFeatures = service.key_features ? JSON.parse(service.key_features) : [
    "Discover our expertise",
    "Consultation and Discovery",
    "Journey and commitment to explained",
    "Routine Maintenance",
    "Meet our team and learn",
    "Troubleshooting",
    "Meet our team"
  ];

  return (
    <>
      <SEO 
        title={`${service.title} | Codigix Infotech`}
        description={service.overview || service.desc || `Expert ${service.title} services at Codigix Infotech. We provide specialized AI-powered solutions to transform your business.`}
        keywords={`${service.title}, AI solutions, IT services, Codigix Infotech, ${service.title} services`}
        ogImage={getImageUrl(service.image, "assets/images/service")}
      />
      
      <section className="tj-page-header section-gap-x" style={{backgroundImage: `url(${getImageUrl(service.image, "assets/images/service")})`}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Services Details</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Services Details</span>
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
                <div className="service-details-img mb-10">
                  <img 
                    src={getImageUrl(service.image, "assets/images/service")} 
                    alt={service.title} 
                    className="w-full rounded-2xl"
                  />
                </div>
                
                <h2 className="title mb-6">Empowering Innovation with Custom Technology Solutions.</h2>
                <p className="desc mb-6">
                  {service.desc || "We specialize in crafting bespoke technology solutions tailored to the unique needs of your business. From custom software development and IoT integration to AI-powered tools and cloud computing, we provide innovative systems that streamline processes, enhance productivity, and drive growth."}
                </p>
                <p className="desc mb-10">
                  Deep understanding of your business, we deliver powerful tools that not only solve your challenges but also empower you to stay ahead in an ever-evolving digital landscape. Ensure that our technology not only solves immediate challenges but also positions your business for long-term success in an ever-evolving digital world.
                </p>

                <div className="row mb-10">
                  <div className="col-lg-12">
                    <ul className="service-list-ul grid grid-cols-1 md:grid-cols-2 gap-4">
                      {keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-5 h-5 bg-[#6c56b6] rounded-full text-white text-[10px]">
                            <i className="tji-check-2"></i>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="row mb-12">
                  <div className="col-md-6 mb-4 md:mb-0">
                    <img src="/assets/images/service/service-details.webp" alt="Professional Service Maintenance" className="rounded-2xl w-full h-[300px] object-cover" />
                  </div>
                  <div className="col-md-6">
                    <img src="/assets/images/service/service-11.webp" alt="Advanced Technology Implementation" className="rounded-2xl w-full h-[300px] object-cover" />
                  </div>
                </div>

                <h2 className="title mb-6">Our Range of Maintenance Services</h2>
                <p className="desc mb-10">
                  We specialize in crafting bespoke technology solutions tailored to the unique needs of your business. From custom software development and IoT integration to AI-powered tools and cloud computing, we provide innovative systems that streamline processes, enhance productivity, and drive growth. Whether you're looking to modernize legacy systems, automate workflows, or build intelligent applications, our team of experts.
                </p>

                <div className="row mb-12">
                  {maintenanceServices.map((m, idx) => (
                    <div key={idx} className="col-lg-4 col-md-6 mb-6">
                      <div className="process-item-wrap style-2 bg-theme-dark p-8 rounded-2xl h-full transition-all duration-300 hover:border-[#6c56b6]">
                        <div className="process-item relative">
                          <div className="process-step mb-6">
                            <span className="text-white bg-[#e91e63] w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm">
                              {m.step}
                            </span>
                          </div>
                          <h4 className="title text-heading mb-4">{m.title}</h4>
                          <p className="text-body">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="faq-section mb-12">
                  <h2 className="title mb-8">Frequently asked questions</h2>
                  <div className="tj-faq">
                    {faqs.map((faq, index) => (
                      <div key={index} className={`accordion-item ${activeFaq === index ? 'active' : ''}`}>
                        <button 
                          className="faq-title"
                          onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                        >
                          {faq.question}
                        </button>
                        {activeFaq === index && (
                          <div className="accordion-body">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tj-post__navigation mt-12 pt-8 border-t border-border-1 mb-12">
                  <div className="row items-center justify-between">
                    <div className="col-4">
                      {prevService && (
                        <div className="tj-nav-post__nav prev_post">
                          <Link to={`/services/details/${prevService.id}`} className="flex items-center gap-2 text-heading hover:text-[#6c56b6]">
                            <span className="w-10 h-10 flex items-center justify-center border border-border-1 rounded-full">
                              <i className="tji-arrow-left"></i>
                            </span>
                            Previous
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="col-4 text-center">
                      <div className="tj-nav-post__grid">
                        <Link to="/services" className="text-heading hover:text-[#6c56b6] text-2xl">
                          <i className="tji-window"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-4 text-right">
                      {nextService && (
                        <div className="tj-nav-post__nav next_post">
                          <Link to={`/services/details/${nextService.id}`} className="flex items-center justify-end gap-2 text-heading hover:text-[#6c56b6] ml-auto">
                            Next
                            <span className="w-10 h-10 flex items-center justify-center border border-border-1 rounded-full">
                              <i className="tji-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <section className="tj-cta-section pb-12">
                  <div className="cta-area bg-[#6c56b6] rounded-2xl p-10 relative overflow-hidden">
                    <div className="cta-content relative z-10">
                      <h2 className="title text-white mb-6">Ready to Elevate Your Business with AI?</h2>
                      <Link className="tj-primary-btn btn-light" to="/contact">
                        <div className="btn-inner flex items-center gap-2 bg-white text-[#6c56b6] px-6 py-3 rounded-full font-bold">
                          <span className="btn-text">Get Started Today</span>
                          <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="col-lg-4 sticky top-24 h-fit">
              <div className="service-sidebar">
                <div className="service-sidebar-box">
                  <h3 className="title">Our Services</h3>
                  <ul className="service-list">
                    {services.map((s) => (
                      <li key={s.id}>
                        <Link 
                          className={service && service.id === s.id ? 'active' : ''} 
                          to={`/services/details/${s.id}`}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
