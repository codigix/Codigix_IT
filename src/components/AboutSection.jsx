import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const features = [
    'Artificial Intelligence',
    'Identity Management',
    'Local Insights',
    'Business Analytics',
  ];

  return (
    <section className="section-gap bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="sub-title mb-4">
              <span>💡</span>
              About our Company
            </p>
            <h2 className="sec-title mb-8">
              Driving Innovations Through Our and Technology, Delivering Our Expert Solutions are Best that Transform Businesses.
            </h2>

            {/* Experience */}
            <div className="mb-8 flex items-start gap-6">
              <div className="text-5xl font-bold text-orange-500">
                13<sup className="text-2xl">+</sup>
              </div>
              <p className="text-lg text-gray-700">We have 10+ Years of working Experiences.</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              Our team of experts combines innovation, and strategy to deliver custom AI-driven tools and services empower transformation.
            </p>

            {/* Features */}
            <ul className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-orange-500">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              <span>→</span>
              Read More
              <span>→</span>
            </Link>
          </motion.div>

          {/* Image and Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src="https://via.placeholder.com/500x400?text=About+Image" 
              alt="About Us"
              className="rounded-lg shadow-lg w-full"
            />
            
            {/* Video Button */}
            {!showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full text-white text-3xl"
                >
                  ▶
                </motion.div>
                <p className="absolute bottom-8 left-0 right-0 text-center text-white font-semibold">
                  Let's See How we did it.
                </p>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/MLpWrANjFbI"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
