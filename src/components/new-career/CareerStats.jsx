import React from 'react';
import { Users, Star, Rocket, ShieldCheck, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CareerStats = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#050112] border border-gray-800/80 rounded-2xl p-6 shadow-xl w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-800 mb-16"
    >
      <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
        <Users size={24} className="text-purple-500 shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-white">150+</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Team Members</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
        <Star size={24} className="text-purple-500 shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-white">10+</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Years of Excellence</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
        <Rocket size={24} className="text-purple-500 shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-white">250+</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Projects Delivered</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
        <ShieldCheck size={24} className="text-purple-500 shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-white">98%</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Client Retention</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
        <Globe2 size={24} className="text-purple-500 shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-white">5+</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Countries Served</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerStats;
