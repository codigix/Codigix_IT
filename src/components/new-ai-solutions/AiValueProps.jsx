import React from 'react';
import { motion } from 'framer-motion';
import { aiSolutionsData } from '../../data/aiSolutionsData';
import './ai-solutions.css';

const AiValueProps = ({ activeTab }) => {
  const data = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];
  const valueProps = data.valueProps || [];

  return (
    <section className="py-16">
      <div className="mb-8 text-left">
        <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">Key Capabilities & Benefits</h3>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">How {activeTab} Adds Value to Your Business</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((prop, index) => {
          const PropIcon = prop.icon;
          return (
            <motion.div 
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="ai-feature-card flex flex-col items-center text-center group hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* LED Active Beacon */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
              </div>

              {/* Radial spotlight backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="ai-icon-box mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
                <PropIcon size={24} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 relative z-10">{prop.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed relative z-10">{prop.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AiValueProps;
