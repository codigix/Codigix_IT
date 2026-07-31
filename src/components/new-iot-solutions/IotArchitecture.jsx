import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getDefaultData } from './iotTabData';

const IotArchitecture = ({ activeTab }) => {
  const data = getDefaultData(activeTab);
  const steps = data.architecture || [];

  return (
    <div className="py-12 border-t border-gray-800/50 mt-4 relative">
      <div className="text-center mb-10">
        <h3 className="text-xl font-bold text-white">
          End-to-End <span className="text-rose-500">{activeTab} Architecture</span>
        </h3>
      </div>

      <div className="relative z-10">
        {/* Background Live Data Flow Path (Desktop Only) */}
        <div className="hidden lg:block absolute top-[28px] left-[8%] w-[84%] h-[2px] pointer-events-none z-0">
          <svg width="100%" height="2" viewBox="0 0 100 2" fill="none" preserveAspectRatio="none" className="w-full">
            <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(244,63,94,0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="0" cy="1" r="1.5" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)">
              <animate attributeName="cx" values="0;100" dur="5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-2 relative z-10">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <React.Fragment key={`${activeTab}-${index}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center group w-24 relative z-10"
                >
                  <div className="w-14 h-14 bg-[#050117] border border-gray-700/80 rounded-xl flex items-center justify-center mb-4 group-hover:border-rose-500/50 group-hover:bg-[#090624] transition-all relative">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity blur-md bg-current ${step.color}`}></div>
                    <StepIcon size={24} className={`${step.color} relative z-10 group-hover:scale-110 transition-transform`} />
                  </div>
                  <h4 className="text-[11px] font-medium text-gray-300 text-center leading-tight">
                    {step.name}
                  </h4>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className="lg:hidden text-gray-600 my-2">
                    <ArrowRight size={20} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IotArchitecture;
