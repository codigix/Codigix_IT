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

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        
        // Fetch all services first to have the sidebar and a fallback if id is missing
        const allServicesResponse = await fetch(`${API_BASE_URL}/services`);
        const allServicesData = await allServicesResponse.json();
        setServices(allServicesData);

        let serviceId = id;
        if (!serviceId && allServicesData.length > 0) {
          serviceId = allServicesData[0].id;
        }

        if (serviceId) {
          // Fetch current service details
          const serviceResponse = await fetch(`${API_BASE_URL}/services/${serviceId}`);
          const serviceData = await serviceResponse.json();
          setService(serviceData);
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

  return (
    <>
      <SEO 
        title={service.title}
        description={service.overview || service.desc || `Expert ${service.title} services at Codigix. We provide high-quality AI-powered solutions.`}
        keywords={`${service.title}, AI solutions, IT services, ${service.title} company`}
        ogImage={getImageUrl(service.image, "assets/images/service")}
      />
      <section className="tj-page-header section-gap-x" style={{backgroundImage: `url(${getImageUrl(service.image, "assets/images/service")})`}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">{service.title}</h1>
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
                  <img src={getImageUrl(service.image, "assets/images/service")} alt={service.title} />
                </div>
                <h2 className="title">{service.title}</h2>
                <p className="desc">{service.desc || service.overview || 'No description available.'}</p>
                
                {/* {service.key_features && (
                  <>
                    <h3>Key Features</h3>
                    <ul className=" service-list-ul">
                      {JSON.parse(service.key_features).map((feature, index) => (
                        <li key={index}><span><i class="tji-check-2"></i></span>{feature}</li>
                      ))}
                    </ul>
                  </>
                )} */}

                {/* {service.how_it_works && (
                  <>
                    <h3>How It Works</h3>
                    <p>{service.how_it_works}</p>
                  </>
                )} */}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-sidebar">
                <div className="service-sidebar-box">
                  <h3 className="title">Other Services</h3>
                  <ul className="service-list">
                    {services.filter(s => s.id !== (service ? service.id : null)).map((s) => (
                      <li key={s.id}>
                        <Link to={`/services/details/${s.id}`}>{s.title}</Link>
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
