import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';

const ClientSection = () => {
  const brands = [
    { id: 1, image: 'https://via.placeholder.com/180x80?text=Brand+1' },
    { id: 2, image: 'https://via.placeholder.com/180x80?text=Brand+2' },
    { id: 3, image: 'https://via.placeholder.com/180x80?text=Brand+3' },
    { id: 4, image: 'https://via.placeholder.com/180x80?text=Brand+4' },
    { id: 5, image: 'https://via.placeholder.com/180x80?text=Brand+5' },
    { id: 6, image: 'https://via.placeholder.com/180x80?text=Brand+6' },
  ];

  return (
    <section className="section-gap bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h5 className="sec-title inline">
            <span className="text-orange-500 font-bold text-4xl">2000+</span> Trusted Client over the World
          </h5>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          className="client-slider"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center py-8 px-4 bg-gray-100 rounded-lg"
              >
                <img 
                  src={brand.image} 
                  alt="Brand Logo" 
                  className="h-16 object-contain"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientSection;
