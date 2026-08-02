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
        <span className="block text-xs font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-widest mb-2">Key Capabilities & Benefits</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">How {activeTab} Adds Value to Your Business</h2>
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
              className="bg-white dark:bg-[#090624]/90 border border-slate-200/90 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)] hover:border-purple-400 dark:hover:border-purple-500/40 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* LED Active Beacon */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
              </div>

              {/* Radial spotlight backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
                <PropIcon size={22} className="text-purple-600 dark:text-purple-400 group-hover:text-rose-500 transition-colors" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 relative z-10">{prop.title}</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed relative z-10 font-normal">{prop.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AiValueProps;
