import React from 'react';
import { motion } from 'framer-motion';
import { aiSolutionsData } from '../../data/aiSolutionsData';
import './ai-solutions.css';

const AiProcess = ({ activeTab }) => {
  const data = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];
  const processSteps = data.process || [];

  return (
    <section className="py-16 border-t border-purple-200/70 dark:border-gray-800/50 relative">
      <div className="mb-12 text-left">
        <span className="block text-xs font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-widest mb-2">Implementation Roadmap</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">How We Deploy {activeTab}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
        {/* Background Flow Track (Desktop Only) */}
        <div className="hidden lg:block absolute top-[24px] left-[8%] w-[84%] h-[2px] pointer-events-none z-0">
          <svg width="100%" height="2" viewBox="0 0 100 2" fill="none" preserveAspectRatio="none" className="w-full">
            <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="0" cy="1" r="1.5" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)">
              <animate attributeName="cx" values="0;100" dur="5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {processSteps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <motion.div 
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="ai-process-step flex flex-col relative z-10 group text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:border-purple-500 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-all duration-300 shadow-sm">
                <StepIcon size={22} className="group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-xs font-extrabold text-purple-700 dark:text-purple-400 mb-1">{step.num}. {step.name}</h3>
              <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed pr-2 font-normal">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AiProcess;
