import React, { useState } from 'react';
import { ArrowRight, Users, Lightbulb, Code2, Star, Flag, Rocket, Target, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const navPills = [
  { id: 'about-story', label: 'Our Story', icon: Flag },
  { id: 'about-roadmap', label: 'Future Roadmap', icon: Rocket },
  { id: 'about-mission', label: 'Mission & Vision', icon: Target },
  { id: 'about-leadership', label: 'Leadership', icon: Users },
  { id: 'about-tech', label: 'Tech Expertise', icon: Code2 },
  { id: 'about-partners', label: 'Partnerships', icon: ShieldCheck },
  { id: 'about-faq', label: 'FAQ', icon: HelpCircle }
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -90;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const AboutHero = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activePill, setActivePill] = useState('about-story');

  const getOverlayText = () => {
    switch (hoveredCard) {
      case 'innovation':
        return 'Pioneering custom AI algorithms & OEE optimizations.';
      case 'technology':
        return 'End-to-end cloud platforms & Modbus TCP gateways.';
      case 'success':
        return 'Upholding 99.9% SLAs and customer scaling benchmarks.';
      default:
        return 'Codigix Infotech — Innovating Today, Transforming Tomorrow.';
    }
  };

  const handlePillClick = (id) => {
    setActivePill(id);
    scrollToSection(id);
  };

  return (
    <div className="flex flex-col gap-10 mb-12">
      
      {/* Top Banner Row */}
      <div className="flex flex-col xl:flex-row gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="xl:w-2/5 z-10 flex flex-col justify-center text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#EE001C] font-bold uppercase tracking-widest text-[11px] mb-4"
          >
            About Codigix
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.15] mb-6"
          >
            Innovating Today.<br/>
            <span className="about-text-gradient">Transforming Tomorrow.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md"
          >
            Codigix Infotech Pvt. Ltd. is a technology-driven company focused on delivering intelligent, innovative, and integrated digital solutions that empower businesses to grow, scale, and stay ahead in a competitive world.
          </motion.p>
          
          {/* Banner Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={() => handlePillClick('about-story')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:from-[#d30018] hover:to-[#6b1fb0] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Our Story <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => handlePillClick('about-leadership')}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-slate-350 dark:border-gray-700 hover:border-purple-500 text-slate-800 dark:text-white text-[12px] font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-500/10"
            >
              Meet The Team <Users size={14} />
            </button>
          </motion.div>
        </div>

        {/* Right: Graphic & Interactive Connected Culture Nodes */}
        <div className="xl:w-3/5 relative flex justify-center items-center min-h-[360px] w-full select-none">
           <div className="absolute inset-0 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
           
           {/* Main Central Core Dashboard Panel */}
           <div className="relative z-10 w-[80%] aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-purple-500/20 shadow-sm dark:shadow-[0_0_40px_rgba(168,85,247,0.15)] bg-white dark:bg-[#090526] p-6 flex flex-col justify-between font-mono text-[10px] text-left">
              {/* Background Grid Map Graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(#1f1a4a_1px,transparent_1px)] [background-size:16px_16px] opacity-10 dark:opacity-35" />
              
              <div className="flex justify-between items-center z-10 border-b border-slate-200 dark:border-purple-500/20 pb-2">
                <span className="text-slate-400 dark:text-gray-400 font-bold uppercase tracking-wider">codigix_culture_core</span>
                <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
              </div>

              {/* Culture Core State Statement */}
              <div className="my-auto z-10 py-4 text-center space-y-2">
                <span className="text-[8px] text-slate-400 dark:text-gray-550 uppercase tracking-widest block">// Core Commitment</span>
                <p className="text-xs text-slate-900 dark:text-white max-w-sm mx-auto leading-relaxed h-12 flex items-center justify-center font-bold">
                  {getOverlayText()}
                </p>
              </div>

              <div className="z-10 border-t border-slate-200 dark:border-purple-500/20 pt-2 text-[8px] text-slate-400 dark:text-gray-550 text-right">
                State: <span className="text-purple-600 dark:text-purple-400 font-bold">ACTIVE // INTEGRATED</span>
              </div>
           </div>

           {/* Floating Node 1: Top Left */}
           <motion.div 
             onClick={() => handlePillClick('about-tech')}
             onMouseEnter={() => setHoveredCard('innovation')}
             onMouseLeave={() => setHoveredCard(null)}
             whileHover={{ scale: 1.05 }}
             className={`absolute top-0 left-2 z-20 bg-white/95 dark:bg-black/85 backdrop-blur-md border rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm dark:shadow-xl transition-colors ${
               hoveredCard === 'innovation' ? 'border-purple-500 text-purple-650 dark:text-purple-400' : 'border-slate-200 dark:border-gray-800 text-slate-500 dark:text-gray-400'
             }`}
           >
             <Lightbulb size={20} className={hoveredCard === 'innovation' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-gray-500'} />
             <div className="text-left">
               <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Innovation</div>
               <div className="text-[9px]">At Our Core</div>
             </div>
           </motion.div>

           {/* Floating Node 2: Top Right */}
           <motion.div 
             onClick={() => handlePillClick('about-roadmap')}
             onMouseEnter={() => setHoveredCard('technology')}
             onMouseLeave={() => setHoveredCard(null)}
             whileHover={{ scale: 1.05 }}
             className={`absolute top-6 right-2 z-20 bg-white/95 dark:bg-black/85 backdrop-blur-md border rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm dark:shadow-xl transition-colors ${
               hoveredCard === 'technology' ? 'border-purple-500 text-purple-650 dark:text-purple-400' : 'border-slate-200 dark:border-gray-800 text-slate-500 dark:text-gray-400'
             }`}
           >
             <Code2 size={20} className={hoveredCard === 'technology' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-gray-500'} />
             <div className="text-left">
               <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Technology</div>
               <div className="text-[9px]">For Impact</div>
             </div>
           </motion.div>

           {/* Floating Node 3: Bottom Left */}
           <motion.div 
             onClick={() => handlePillClick('about-leadership')}
             onMouseEnter={() => setHoveredCard('success')}
             onMouseLeave={() => setHoveredCard(null)}
             whileHover={{ scale: 1.05 }}
             className={`absolute bottom-2 left-6 z-20 bg-white/95 dark:bg-black/85 backdrop-blur-md border rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm dark:shadow-xl transition-colors ${
               hoveredCard === 'success' ? 'border-purple-500 text-purple-650 dark:text-purple-400' : 'border-slate-200 dark:border-gray-800 text-slate-500 dark:text-gray-400'
             }`}
           >
             <Star size={20} className={hoveredCard === 'success' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-gray-500'} />
             <div className="text-left">
               <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">Leadership</div>
               <div className="text-[9px]">Our Team</div>
             </div>
           </motion.div>
        </div>
      </div>

      {/* Quick Section Navigation Bar */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-gray-800/80">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-purple-500" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-gray-400">
            Quick Section Navigation:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navPills.map((pill) => {
            const IconComponent = pill.icon;
            const isSelected = activePill === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => handlePillClick(pill.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white border-purple-400/50 shadow-md shadow-purple-500/20'
                    : 'bg-white dark:bg-[#07031e] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/30'
                }`}
              >
                <IconComponent size={14} className={isSelected ? 'text-white' : 'text-purple-500'} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AboutHero;
