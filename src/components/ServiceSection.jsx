import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { generateSlug } from '../utils/slugify';

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      title: 'AI-Powered Solutions',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses operate be leveraging the our latest.',
      features: ['Personalized Experience', 'Process Automation', 'Predictive Analytics'],
      image: 'https://via.placeholder.com/400x300?text=Service+1',
    },
    {
      id: 2,
      title: 'Custom Technology',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses operate be leveraging the our latest.',
      features: ['Personalized Experience', 'Process Automation', 'Predictive Analytics'],
      image: 'https://via.placeholder.com/400x300?text=Service+2',
    },
    {
      id: 3,
      title: 'Predictive Analytics',
      description: 'Specialize in delivering AI-powered solution revolutionize the businesses operate be leveraging the our latest.',
      features: ['Personalized Experience', 'Process Automation', 'Predictive Analytics'],
      image: 'https://via.placeholder.com/400x300?text=Service+3',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] // smooth cubic-bezier
      },
    },
  };

  return (
    <section className="section-gap bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="sub-title justify-center mb-5">
            <span>💡</span>
            Our Best Services
          </p>
          <h2 className="sec-title">Explore Our Services</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`relative flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-5">
                  <Link to={`/${generateSlug(service.title)}`} className="hover:text-orange-500">
                    {service.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <ul className="mb-5 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-orange-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/${generateSlug(service.title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  aria-label={`Learn More about ${service.title}`}
                >
                  <span>→</span>
                  Learn More
                  <span>→</span>
                </Link>
              </div>
              <div className="flex-1">
                <img 
                  src={service.image} 
                  alt={service.title}
                  loading="lazy"
                  width="400"
                  height="300"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="absolute -top-6 left-0 text-8xl font-bold text-gray-200/50 -z-10 select-none pointer-events-none">
                {String(service.id).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
