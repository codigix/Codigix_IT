import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-gap bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="sub-title justify-center mb-4">
            <span>💡</span>
            Our Best Services
          </p>
          <h2 className="sec-title">Explore Our Services</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">
                  <Link to="/services/details" className="hover:text-orange-500">
                    {service.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="mb-8 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-orange-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/services/details"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
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
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="absolute text-6xl font-bold text-gray-200 opacity-50">
                {String(service.id).padStart(2, '0')}.
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
