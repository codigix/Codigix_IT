import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    { id: 1, title: 'AI Horizon', category: 'AI', image: 'https://via.placeholder.com/400x300?text=Project+1' },
    { id: 2, title: 'Quantum Computing', category: 'Tech', image: 'https://via.placeholder.com/400x300?text=Project+2' },
    { id: 3, title: 'Smart Analytics', category: 'Data', image: 'https://via.placeholder.com/400x300?text=Project+3' },
    { id: 4, title: 'Cloud Initiative', category: 'Cloud', image: 'https://via.placeholder.com/400x300?text=Project+4' },
    { id: 5, title: 'AI Integration', category: 'AI', image: 'https://via.placeholder.com/400x300?text=Project+5' },
    { id: 6, title: 'Data Pipeline', category: 'Data', image: 'https://via.placeholder.com/400x300?text=Project+6' },
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-300">
              Explore the innovative projects we've delivered for our clients.
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
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    <Link to="/projects/details" className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-4 transition-all">
                      View Project <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
