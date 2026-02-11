import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null;

  return (
    <section className="section-gap bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="sub-title justify-center mb-4">
            <span>💡</span>
            Client Testimonials
          </p>
          <h2 className="sec-title">Proven Impact Through Testimonial</h2>
        </motion.div>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            1024: { slidesPerView: 1 },
          }}
          className="testimonial-slider"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-8 md:p-12 shadow-lg max-w-2xl mx-auto"
              >
                <div className="text-5xl text-orange-500 mb-6">"</div>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image && testimonial.image.startsWith('assets') ? testimonial.image : testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.designation}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination {
          position: relative;
          margin-top: 40px;
        }

        .swiper-pagination-bullet {
          background: #D1D5DB;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: #FF6B35;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
