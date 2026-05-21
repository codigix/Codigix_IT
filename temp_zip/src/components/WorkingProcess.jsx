import React from 'react';
import { motion } from 'framer-motion';

const WorkingProcess = () => {
  const processes = [
    {
      id: 1,
      icon: '🔍',
      title: 'Discovery & Strategy',
      description: 'Understanding client needs, defining goals, and designing tailored our AI solutions. Building, training deploying into existing.',
      step: 'Step 01.',
    },
    {
      id: 2,
      icon: '💻',
      title: 'Development & Integration',
      description: 'Understanding client needs, defining goals, and designing tailored our AI solutions. Building, training deploying into existing.',
      step: 'Step 02.',
    },
    {
      id: 3,
      icon: '✨',
      title: 'Optimization & Support',
      description: 'Understanding client needs, defining goals, and designing tailored our AI solutions. Building, training deploying into existing.',
      step: 'Step 03.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-gap bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="sub-title justify-center mb-4">
            <span>💡</span>
            How Its Work
          </p>
          <h2 className="sec-title">Building Success, One Step at a Time</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {processes.map((process) => (
            <motion.div
              key={process.id}
              variants={itemVariants}
              className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">
                <div className="text-5xl mb-4">{process.icon}</div>
                <h4 className="text-2xl font-bold mb-4">{process.title}</h4>
                <p className="text-gray-600">{process.description}</p>
              </div>
              <div className="absolute top-6 right-6 text-4xl font-bold text-gray-200">
                {process.step}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkingProcess;
