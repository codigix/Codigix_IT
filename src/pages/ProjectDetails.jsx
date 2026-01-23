import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
  return (
    <main className="pt-20">
      <section className="section-gap py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Project Details</h1>
            <p className="text-xl text-gray-300">
              Detailed information about our latest successful projects.
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
              src="https://via.placeholder.com/800x400?text=Project+Details" 
              alt="Project"
              className="w-full rounded-lg shadow-lg mb-12"
            />

            <h2 className="sec-title mb-8">Redefining Intelligence for Tomorrow Tech</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Category</h4>
                <p className="text-gray-600">AI Horizon</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Duration</h4>
                <p className="text-gray-600">6 Months</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Client</h4>
                <p className="text-gray-600">Fortune 500 Company</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-3xl font-bold mb-6">Project Overview</h3>
              <p className="text-gray-600 mb-6">
                This groundbreaking project involved implementing an advanced AI system to streamline operations 
                and enhance decision-making processes for a leading technology company.
              </p>

              <h3 className="text-3xl font-bold mt-10 mb-6">Challenges & Solutions</h3>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-700">
                  <strong>Challenge:</strong> Integration with legacy systems
                </li>
                <li className="text-gray-700">
                  <strong>Solution:</strong> Custom middleware and API development
                </li>
              </ul>

              <h3 className="text-3xl font-bold mt-10 mb-6">Results</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500">✓</span>
                  40% improvement in processing speed
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500">✓</span>
                  30% cost reduction
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-500">✓</span>
                  Enhanced accuracy in predictions
                </li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Start Your Project
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
