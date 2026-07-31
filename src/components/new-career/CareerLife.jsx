import React from 'react';
import { CheckCircle2, Heart, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const checks = [
  "Inclusive and diverse work environment",
  "Encouragement for ideas and innovation",
  "Team bonding and knowledge sharing",
  "Celebrations, events and team outings",
  "Employee wellness and well-being programs"
];

const CareerLife = () => {
  return (
    <div className="py-12 border-t border-gray-800/50 mt-8 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-white">Life at Codigix</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left: Photo Grid */}
        <div className="lg:w-1/3 grid grid-cols-2 grid-rows-2 gap-3 h-[400px]">
           <div className="rounded-xl overflow-hidden relative col-span-2 row-span-1 border border-purple-900/30">
             <div className="absolute inset-0 bg-gradient-to-t from-[#090526] via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Team Collaboration" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
           <div className="rounded-xl overflow-hidden relative border border-purple-900/30">
             <div className="absolute inset-0 bg-gradient-to-t from-[#090526] via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80" alt="Team Discussion" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
           <div className="rounded-xl overflow-hidden relative border border-purple-900/30">
             <div className="absolute inset-0 bg-gradient-to-t from-[#090526] via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80" alt="Office Culture" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
        </div>

        {/* Center: Text & Checks */}
        <div className="lg:w-1/3 flex flex-col justify-center py-4 px-2">
          <h3 className="text-xl font-bold text-white mb-3">More Than Just a Workplace</h3>
          <p className="text-[12px] text-gray-400 leading-relaxed mb-8">
            We are a team of thinkers, builders, and doers. We celebrate success, learn from failures, and grow together.
          </p>
          
          <div className="flex flex-col gap-4">
            {checks.map((check, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="text-[12px] text-gray-300">{check}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: High-Quality Team Office Photo with Glassmorphism Overlay */}
        <div className="lg:w-1/3 rounded-xl overflow-hidden relative flex flex-col justify-end p-6 border border-purple-900/40 bg-[#090526] min-h-[380px] shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#07031c] via-[#07031c]/50 to-transparent z-10"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
            alt="Life at Codigix Team" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 z-0" 
          />

          <div className="relative z-20">
            <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider w-fit mb-2 backdrop-blur-sm">
              Work & Win Together
            </div>
            <h4 className="text-base font-bold text-white mb-1">Empowering Environment</h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">Fostering creativity, innovation, and long-term career growth.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CareerLife;
