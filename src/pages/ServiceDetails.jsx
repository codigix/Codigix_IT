import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceDetails = () => {
  return (
    <main className="pt-20">
      <section className="section-gap py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Service Details</h1>
            <p className="text-xl text-gray-300">
              Comprehensive information about our service offerings.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://via.placeholder.com/800x400?text=Service+Details" 
              alt="Service"
              className="w-full rounded-lg shadow-lg mb-12"
            />

            <h2 className="sec-title mb-8">AI-Powered Solutions</h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 mb-6">
                Our AI-powered solutions are designed to transform your business operations and unlock new opportunities 
                for growth and innovation.
              </p>

              <h3 className="text-3xl font-bold mt-10 mb-6">Key Features</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500 font-bold">✓</span>
                  Advanced Machine Learning Algorithms
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500 font-bold">✓</span>
                  Real-time Data Processing
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500 font-bold">✓</span>
                  Customizable Dashboards
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500 font-bold">✓</span>
                  24/7 Support and Monitoring
                </li>
              </ul>

              <h3 className="text-3xl font-bold mt-10 mb-6">Benefits</h3>
              <p className="text-gray-600 mb-6">
                Experience significant improvements in efficiency, cost reduction, and decision-making with our 
                comprehensive AI solutions.
              </p>
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get Started
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;
