import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Redefining Intelligence for Tomorrow Tech',
      category: 'AI Horizon',
      image: 'https://via.placeholder.com/500x400?text=Project+1',
    },
    {
      id: 2,
      title: 'Elevating Possibilities with Intelligence',
      category: 'Quantum',
      image: 'https://via.placeholder.com/500x400?text=Project+2',
    },
    {
      id: 3,
      title: 'Intelligence for Modern Challenges',
      category: 'Quantum',
      image: 'https://via.placeholder.com/500x400?text=Project+3',
    },
    {
      id: 4,
      title: 'Transforming Businesses with Intelligence',
      category: 'Innovate',
      image: 'https://via.placeholder.com/500x400?text=Project+4',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-gap bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-16"
        >
          <div>
            <p className="sub-title mb-4">
              <span>💡</span>
              Proud Projects
            </p>
            <h2 className="sec-title">Breaking Boundaries, Building Dreams.</h2>
          </div>
          <Link 
            to="/projects"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span>→</span>
            Explore More
            <span>→</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white relative z-10">
                <h4 className="text-xl font-bold mb-4">
                  <Link to="/projects/details" className="hover:text-orange-500 transition-colors">
                    {project.title}
                  </Link>
                </h4>
                <Link 
                  to="/projects/details"
                  className="inline-flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  →
                </Link>
              </div>
              <span className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur rounded-lg text-sm font-semibold">
                <Link to="/projects/details" className="hover:text-orange-500">
                  {project.category}
                </Link>
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="lg:hidden text-center mt-12">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span>→</span>
            Explore More
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
