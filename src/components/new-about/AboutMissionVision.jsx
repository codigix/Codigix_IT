import React from 'react';
import { Gem, Rocket, Binoculars, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  "Integrity in everything we do",
  "Customer success is our priority",
  "Innovation with impact",
  "Collaboration and respect",
  "Excellence in delivery"
];

const AboutMissionVision = () => {
  return (
    <div className="py-12 border-t border-gray-800/50 mt-8 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-white">Our Values, Mission & Vision</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gem size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Our Values</h3>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {values.map((val, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="text-[12px] text-gray-300">{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col group hover:border-purple-500/50 transition-colors"
        >
          {/* Decorative Target SVG (Placeholder with CSS) */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 border-[1px] border-purple-500/20 rounded-full flex items-center justify-center opacity-100 group-hover:scale-110 transition-transform duration-700">
            <div className="w-32 h-32 border-[1px] border-purple-500/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-500/10 border-[1px] border-purple-500/40 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Rocket size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
          </div>
          <p className="text-[12px] text-gray-300 leading-relaxed relative z-10">
            To empower businesses with intelligent, innovative, and scalable digital solutions that drive growth, efficiency, and long-term value.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col group hover:border-purple-500/50 transition-colors"
        >
          {/* Decorative Mountain SVG (Placeholder with CSS) */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-100 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-none stroke-purple-500/40 stroke-[0.5]">
              <path d="M0 100 L30 50 L50 80 L80 30 L100 70 L100 100 Z" fill="rgba(168,85,247,0.05)" />
              <path d="M0 100 L20 70 L40 90 L70 40 L100 80 L100 100 Z" fill="rgba(168,85,247,0.1)" />
            </svg>
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Binoculars size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
          </div>
          <p className="text-[12px] text-gray-300 leading-relaxed relative z-10">
            To be a global leader in digital transformation, recognized for delivering exceptional solutions that create a better tomorrow.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutMissionVision;
