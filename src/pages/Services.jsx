import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { icon: '🤖', title: 'AI Solutions', desc: 'Custom AI-powered solutions for your business' },
    { icon: '💻', title: 'Web Development', desc: 'Modern web applications with cutting-edge technology' },
    { icon: '📊', title: 'Data Analytics', desc: 'Transform raw data into actionable insights' },
    { icon: '🔐', title: 'Security', desc: 'Enterprise-grade security solutions' },
    { icon: '☁️', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and services' },
    { icon: '🚀', title: 'Optimization', desc: 'Performance and efficiency improvements' },
  ];

  return (
    <main className="pt-20">
      <section className="section-gap py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 hover:border-orange-500 transition-all"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Link to="/services/details" className="text-orange-500 font-semibold hover:gap-4 inline-flex items-center gap-2">
                  Learn More <span>→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start Your Project
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
