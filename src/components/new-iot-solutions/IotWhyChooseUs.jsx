import React from 'react';
import { motion } from 'framer-motion';
import { getDefaultData } from './iotTabData';

const IotWhyChooseUs = ({ activeTab }) => {
  const data = getDefaultData(activeTab);
  const reasons = data.reasons || [];

  return (
    <div className="py-12 border-t border-gray-800/50 mt-8">
      <div className="text-center mb-10">
        <h3 className="text-xl font-bold text-white">
          Why Choose Our <span className="text-rose-500">{data.whyTitle || activeTab}?</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {reasons.map((item, index) => {
          const ReasonIcon = item.icon;
          return (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center text-center p-6 bg-[#090624]/30 border border-gray-800/60 rounded-xl hover:bg-[#0c0830] hover:border-rose-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* LED Active Beacon */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
              </div>

              {/* Spotlight Glow background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`p-4 rounded-full ${item.bg || 'bg-rose-500/10'} ${item.color || 'text-rose-500'} mb-5 shadow-[0_0_15px_currentColor] opacity-90 transition-transform duration-300 group-hover:scale-110 relative z-10`}>
                <ReasonIcon size={22} className="relative z-10" />
              </div>
              <h4 className="text-[13px] font-bold text-white mb-2 leading-tight relative z-10">{item.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed relative z-10">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IotWhyChooseUs;
