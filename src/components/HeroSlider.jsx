import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const swiperRef = useRef(null);

  const slides = [
    {
      image: 'https://via.placeholder.com/1920x800/FF6B35/ffffff?text=Slider+1',
      subtitle: 'AI transforms everything.',
      title: 'Explore Master Future Intelligence.',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses.',
    },
    {
      image: 'https://via.placeholder.com/1920x800/FF6B35/ffffff?text=Slider+2',
      subtitle: 'AI transforms everything.',
      title: 'Explore Master Future Intelligence.',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses.',
    },
    {
      image: 'https://via.placeholder.com/1920x800/FF6B35/ffffff?text=Slider+3',
      subtitle: 'AI transforms everything.',
      title: 'Explore Master Future Intelligence.',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses.',
    },
  ];

  return (
    <section className="relative h-screen md:h-[600px] overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundAttachment: 'fixed',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="container max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                  >
                    <div className="mb-6">
                      <p className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
                        <span>💡</span>
                        {slide.subtitle}
                      </p>
                      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 mb-8">
                        {slide.description}
                      </p>
                    </div>
                    <Link 
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <span>→</span>
                      Learn More
                      <span>→</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          background: rgba(255, 107, 53, 0.8);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #FF6B35;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
