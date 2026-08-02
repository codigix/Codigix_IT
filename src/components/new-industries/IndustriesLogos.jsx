import React from 'react';
import { motion } from 'framer-motion';

// Reusing logos from previous iterations if they exist, or using placeholders
const logos = [
  '/assets/images/brands/brand1.svg',
  '/assets/images/brands/brand2.svg',
  '/assets/images/brands/brand3.svg',
  '/assets/images/brands/brand4.svg',
  '/assets/images/brands/brand5.svg'
];

const IndustriesLogos = () => {
  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 border-b border-slate-200 dark:border-gray-800/50 my-8">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trusted by Businesses Across Industries</h3>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Render logos or fallback text if images aren't present */}
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-purple-500 text-2xl">❖</span> STERLING</div>
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-blue-500 text-2xl">◎</span> NOBEL</div>
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-green-500 text-2xl">△</span> THINK7</div>
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-orange-500 text-2xl">◇</span> VASTRA</div>
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-red-500 text-2xl">⬡</span> CROWN</div>
         <div className="font-bold text-xl tracking-widest uppercase flex items-center gap-2"><span className="text-teal-500 text-2xl">◭</span> APEX</div>
      </div>
    </div>
  );
};

export default IndustriesLogos;
