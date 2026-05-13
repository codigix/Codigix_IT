import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        if (response.ok) {
          const data = await response.json();
          setTestimonials(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  return (
    <section className="tj-testimonial-section section-gap section-gap-x">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="content-wrap">
              <div className="sec-heading">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                  <i className="tji-subtitle"></i>Innovating Together
                </span>
                <h2 className="sec-title text-anim">Trusted Collaborations Leading Innovators</h2>
              </div>
              <p className="desc wow fadeInUp" data-wow-delay=".3s">
                Specialize in delivering AI-powered solution revolutionize the way businesses operate. By leveraging the latest.
              </p>
              
              <div className="rating-box wow fadeInUp" data-wow-delay=".3s">
                <h2 className="title">4.8</h2>
                <div className="rating-area">
                  <div className="star-ratings">
                    <div className="fill-ratings" style={{ width: '100%' }}>
                      <span>★★★★★</span>
                    </div>
                    <div className="empty-ratings">
                      <span>★★★★★</span>
                    </div>
                  </div>
                  <span className="rating-text">(80+ Clients Reviews)</span>
                </div>
              </div>

              <div className="slider-navigation d-lg-inline-flex d-none wow fadeInUp" data-wow-delay=".3s">
                <div ref={prevRef} className="slider-prev">
                  <span className="anim-icon">
                    <i className="tji-arrow-left"></i>
                    <i className="tji-arrow-left"></i>
                  </span>
                </div>
                <div ref={nextRef} className="slider-next">
                  <span className="anim-icon">
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="testimonial-wrapper wow fadeInUp" data-wow-delay=".5s">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{
                  clickable: true,
                  el: '.pagination-1',
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                speed={1500}
                className="testimonial-slider"
              >
                <span className="quote-icon"><i className="tji-quote"></i></span>
                
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="testimonial-item">
                      <div className="desc">
                        <p>{testimonial.quote || testimonial.content}</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-inner">
                          <div className="author-img">
                            <img 
                              src={getImageUrl(testimonial.image, 'assets/images/testimonial')} 
                              alt={testimonial.author || testimonial.name} 
                            />
                          </div>
                          <div className="author-header">
                            <h4 className="title">{testimonial.author || testimonial.name}</h4>
                            <span className="designation">{testimonial.designation || testimonial.position}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="pagination-1"></div>
              </Swiper>
            </div>

            <div className="mobile-navigation">
              <div className="slider-navigation d-inline-flex d-lg-none">
                <div className="slider-prev">
                  <span className="anim-icon">
                    <i className="tji-arrow-left"></i>
                    <i className="tji-arrow-left"></i>
                  </span>
                </div>
                <div className="slider-next">
                  <span className="anim-icon">
                    <i className="tji-arrow-right"></i>
                    <i className="tji-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
