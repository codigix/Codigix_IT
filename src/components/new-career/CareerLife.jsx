import React, { useState } from 'react';
import { CheckCircle2, Heart, Sparkles, Trophy, PlayCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const checks = [
  "Inclusive and diverse work environment",
  "Encouragement for ideas and innovation",
  "Team bonding and knowledge sharing",
  "Celebrations, events and team outings",
  "Employee wellness and well-being programs"
];

const CareerLife = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Life at Codigix</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left: Photo Grid */}
        <div className="lg:w-1/3 grid grid-cols-2 grid-rows-2 gap-3 h-[400px]">
           <div className="rounded-xl overflow-hidden relative col-span-2 row-span-1 border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-none">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Team Collaboration" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
           <div className="rounded-xl overflow-hidden relative border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-none">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80" alt="Team Discussion" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
           <div className="rounded-xl overflow-hidden relative border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-none">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-60 z-10"></div>
             <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80" alt="Office Culture" className="w-full h-full object-cover filter brightness-90 contrast-110" />
           </div>
        </div>

        {/* Center: Text & Checks */}
        <div className="lg:w-1/3 flex flex-col justify-center py-4 px-2 text-left">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">More Than Just a Workplace</h3>
          <p className="text-[12px] text-slate-500 dark:text-gray-400 leading-relaxed mb-8">
            We are a team of thinkers, builders, and doers. We celebrate success, learn from failures, and grow together.
          </p>
          
          <div className="flex flex-col gap-4">
            {checks.map((check, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="text-[12px] text-slate-700 dark:text-gray-300">{check}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: High-Quality Team Office Photo with Glassmorphism Overlay & Video Trigger */}
        <div 
          onClick={() => setIsVideoOpen(true)}
          className="lg:w-1/3 rounded-xl overflow-hidden relative flex flex-col justify-between p-6 border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#090526] min-h-[380px] shadow-sm dark:shadow-2xl group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
            alt="Life at Codigix Team" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 z-0" 
          />

          {/* Center Play Button Overlay */}
          <div className="relative z-20 my-auto mx-auto flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300 shadow-xl">
              <PlayCircle size={36} className="text-white fill-white/20" />
            </div>
            <span className="text-xs font-bold text-white tracking-wider uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Watch Video</span>
          </div>

          <div className="relative z-20 text-left">
            <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider w-fit mb-2 backdrop-blur-sm">
              Work & Win Together
            </div>
            <h4 className="text-base font-bold text-white mb-1">Empowering Environment</h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">Fostering creativity, innovation, and long-term career growth.</p>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-purple-500/40"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X size={20} />
              </button>

              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0"
                title="Life at Codigix - Workplace & Culture"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerLife;
