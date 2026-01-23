import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  return (
    <main className="pt-20">
      <section className="section-gap py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog Article</h1>
            <p className="text-xl text-gray-300">
              Insights and perspectives on technology and innovation.
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
              src="https://via.placeholder.com/800x400?text=Blog+Article" 
              alt="Blog"
              className="w-full rounded-lg shadow-lg mb-8"
            />

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-300">
              <span className="text-gray-600">By Brandon</span>
              <span className="text-gray-600">Jan 10, 2025</span>
              <span className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg">
                Quantum
              </span>
            </div>

            <h2 className="sec-title mb-8">Unlocking the Power of Data for Business Success</h2>
            
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="mb-6">
                In today's digital-first world, data has become the most valuable asset for businesses of all sizes. 
                Organizations that effectively leverage their data are seeing unprecedented growth, improved decision-making, 
                and enhanced customer experiences.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Data Revolution</h3>
              <p className="mb-6">
                The amount of data generated globally continues to grow exponentially. Companies now have access to vast amounts 
                of information about their operations, customers, and markets. However, raw data alone is not valuable—it's what 
                you do with that data that matters.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Key Insights</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">1.</span>
                  <span>Data-driven organizations are 5% more productive than their competitors</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">2.</span>
                  <span>Companies using AI for analytics report 40% improvement in decision-making</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">3.</span>
                  <span>Proper data management can reduce operational costs by up to 30%</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Getting Started</h3>
              <p>
                To unlock the power of data for your business, start by assessing your current data infrastructure, 
                identifying key metrics, and investing in the right tools and talent. Consider partnering with a 
                technology provider who can help you navigate this journey.
              </p>
            </div>

            <div className="text-center mt-16">
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Back to Blog
                <span>←</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
