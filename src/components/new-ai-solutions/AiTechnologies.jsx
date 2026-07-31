import React from 'react';
import { motion } from 'framer-motion';
import { aiSolutionsData } from '../../data/aiSolutionsData';
import './ai-solutions.css';

const AiTechnologies = ({ activeTab }) => {
  const data = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];
  const technologies = data.technologies || [];

  return (
    <section className="py-16 border-t border-gray-800/30">
      <div className="mb-8 text-left">
        <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">Technology Stack</h3>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Frameworks & Tools Powering {activeTab}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {technologies.map((tech, index) => {
          const TechIcon = tech.icon;
          return (
            <motion.div 
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center text-center group relative cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex items-center justify-center mb-3 group-hover:border-purple-500 group-hover:bg-purple-900/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] relative">
                {/* Active Indicator LED */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                </div>

                <TechIcon size={24} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h4 className="text-[13px] font-bold text-white mb-1 leading-tight">{tech.name}</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed truncate w-full px-2">{tech.desc}</p>
              
              {/* Tooltip detail tag */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-purple-950 border border-purple-500/40 text-purple-300 font-mono text-[7px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider font-bold">
                READY
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AiTechnologies;
