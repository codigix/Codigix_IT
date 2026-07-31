import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Successful Projects' },
  { value: '20+', label: 'Enterprise Clients' },
  { value: '10+', label: 'Industries Served' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '24x7', label: 'Expert Support' },
  { value: '100%', label: 'Custom Solutions' }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#050117]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h4 className="text-gray-400 text-sm tracking-[0.2em] uppercase font-semibold mb-12">
          Powering Digital Transformation
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-2 border-r border-gray-800 last:border-0"
            >
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
