import React from 'react';
import { Database, Settings, Share2, BarChart2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDefaultData } from './crmTabData';

const stepIcons = [Database, Settings, Share2, BarChart2, Rocket];
const stepColors = ['text-pink-400', 'text-rose-400', 'text-orange-400', 'text-green-400', 'text-blue-400'];
const stepBgs = ['bg-pink-500/10', 'bg-rose-500/10', 'bg-orange-500/10', 'bg-green-500/10', 'bg-blue-500/10'];

const CrmHowItWorksAndBenefits = ({ activeTab }) => {
  const data = getDefaultData(activeTab);
  const workflow = data.workflow || [];
  const benefits = data.benefits || [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16 border-t border-gray-800/50 pt-12 text-left">
      
      {/* How Our CRM Works */}
      <div className="relative">
        <div className="text-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wide">How {activeTab} Works</h3>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 relative z-10">
          {/* Background Live Data Flow Path (Desktop Only) */}
          <div className="hidden sm:block absolute top-[24px] left-[8%] w-[84%] h-[2px] pointer-events-none z-0">
            <svg width="100%" height="2" viewBox="0 0 100 2" fill="none" preserveAspectRatio="none" className="w-full">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="1" r="1.5" fill="#a855f7" filter="drop-shadow(0 0 3px #a855f7)">
                <animate attributeName="cx" values="0;100" dur="5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-2 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {workflow.map((step, index) => {
                const IconComponent = stepIcons[index] || Settings;
                const colorClass = stepColors[index] || 'text-purple-400';
                const bgClass = stepBgs[index] || 'bg-purple-500/10';

                return (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center group w-24 text-center z-10">
                      <div className={`w-12 h-12 rounded-full ${bgClass} ${colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative border border-purple-500/20`}>
                        <IconComponent size={20} />
                      </div>
                      <h4 className="text-[12px] font-bold text-white mb-1">{step.name}</h4>
                      <p className="text-[9px] text-gray-400 leading-tight pr-1">{step.desc}</p>
                    </div>

                    {index < workflow.length - 1 && (
                      <div className="sm:hidden text-gray-600 my-2 rotate-95">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Key Benefits */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wide">Key Benefits</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 col-span-2 w-full"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 bg-[#050117] p-2.5 border border-gray-800/80 rounded-xl hover:border-purple-500/30 transition-colors">
                  <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-[12px] text-gray-300 leading-tight">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default CrmHowItWorksAndBenefits;
