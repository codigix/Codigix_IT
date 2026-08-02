import React from 'react';
import { Search, PenTool, Code2, Rocket, LineChart, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

const approachSteps = [
  { name: 'Discover', icon: Search, desc: 'Understand your business and industry challenges' },
  { name: 'Design', icon: PenTool, desc: 'Plan and design tailored solutions for your needs' },
  { name: 'Develop', icon: Code2, desc: 'Build and integrate powerful, scalable solutions' },
  { name: 'Deploy', icon: Rocket, desc: 'Seamless deployment with minimal disruption' },
  { name: 'Optimize', icon: LineChart, desc: 'Continuous support and performance optimization' },
];

const reasons = [
  'Deep Industry Expertise', 'Cost-Effective Approach',
  'Customized & Scalable Solutions', 'End-to-End Support',
  'Advanced Technologies', 'Future-Ready Innovation',
  'Proven Track Record', 'High ROI & Measurable Impact'
];

const IndustriesApproach = () => {
  return (
    <div className="py-12 flex flex-col xl:flex-row gap-6 text-left">
      
      {/* Our Approach */}
      <div className="xl:w-3/5 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl relative">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Our Approach</h3>
        
        <div className="approach-line-container flex justify-between items-start mt-12 relative z-10 px-4 overflow-x-auto pb-4 hide-scrollbar">
          {/* Background Live Data Flow Path (Desktop Only) */}
          <div className="hidden sm:block absolute top-[24px] left-[8%] w-[84%] h-[2px] pointer-events-none z-0">
            <svg width="100%" height="2" viewBox="0 0 100 2" fill="none" preserveAspectRatio="none" className="w-full">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="1" r="1.5" fill="#a855f7" filter="drop-shadow(0 0 3px #a855f7)">
                <animate attributeName="cx" values="0;100" dur="5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {approachSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center w-28 relative bg-slate-50 dark:bg-[#050112] group shrink-0 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#0a0520] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:bg-purple-900/40 group-hover:scale-110 transition-all z-10 relative shadow-[0_0_15px_rgba(168,85,247,0.05)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/20">
                <step.icon size={20} />
              </div>
              <h4 className="text-[12px] font-bold text-slate-900 dark:text-white mb-2">{step.name}</h4>
              <p className="text-[9px] text-slate-550 dark:text-gray-500 leading-tight pr-1">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Businesses Choose Codigix */}
      <div className="xl:w-2/5 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Why Businesses Choose Codigix</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white dark:bg-[#050117] p-2.5 border border-slate-200 dark:border-gray-800/80 rounded-xl hover:border-purple-500/30 transition-colors relative group overflow-hidden shadow-sm dark:shadow-none">
              {/* Spotlight background hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* LED Active Beacon */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </div>

              <Hexagon size={14} className="text-purple-500 shrink-0 mt-0.5 fill-purple-900/30 relative z-10" />
              <span className="text-[11px] text-slate-700 dark:text-gray-300 leading-tight relative z-10">{reason}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default IndustriesApproach;
