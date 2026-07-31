import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const DigitalPipelineSimulator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { log: '[WEBPACK] Bundling client assets... OK. index.js: 214 kB.' },
    { log: '[ESLINT] Scanning codebase. Warnings: 0, Errors: 0.' },
    { log: '[TEST] Executing 42 unit specs. Passed: 42/42. Coverage: 96.8%.' },
    { log: '[VERCEL] Deploying production bundle. Live URL synchronized.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-[#EE001C] font-bold uppercase tracking-wider">SERVICES_BUILD_PIPELINE</span>
        <span className="nh-led-active bg-[#EE001C] shadow-[0_0_8px_#ef4444]"></span>
      </div>
      
      <div className="space-y-1.5 h-[50px] flex flex-col justify-center">
        <div className="text-gray-500">// active CI/CD logger</div>
        <div className="text-white font-bold leading-normal">{steps[activeStep].log}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-gray-800/60">
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">Page Speed</span>
          <span className="text-xs font-bold text-green-400">99 / 100</span>
        </div>
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">LCP Speed</span>
          <span className="text-xs font-bold text-cyan-400">0.8s</span>
        </div>
      </div>
    </div>
  );
};

const OtherServicesHero = () => {
  return (
    <div className="relative pt-12 pb-16 border-b border-gray-800/50">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-8 tracking-wide uppercase font-bold text-left">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <ChevronRight size={12} />
        <span className="hover:text-white cursor-pointer transition-colors">Services</span>
        <ChevronRight size={12} />
        <span className="text-[#EE001C] font-medium">Other Services</span>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left text */}
        <div className="lg:w-[55%] z-10 text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-white leading-[1.15] mb-6"
          >
            Powering Digital Transformation <span className="services-text-gradient">Beyond Boundaries</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[13px] text-gray-300 leading-relaxed mb-10 max-w-lg"
          >
            From modern web platforms to mobile apps, cloud solutions, UI/UX design, and DevOps – we deliver end-to-end digital solutions that help your business innovate, scale, and lead.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="px-4 py-2 bg-[#0c0820] border border-gray-800 rounded-lg flex items-center gap-2 text-[11px] font-medium text-gray-300">
              <Cpu size={14} className="text-[#EE001C]" /> Future-Ready Solutions
            </div>
            <div className="px-4 py-2 bg-[#0c0820] border border-gray-800 rounded-lg flex items-center gap-2 text-[11px] font-medium text-gray-300">
              <ShieldCheck size={14} className="text-[#EE001C]" /> Scalable & Secure
            </div>
            <div className="px-4 py-2 bg-[#0c0820] border border-gray-800 rounded-lg flex items-center gap-2 text-[11px] font-medium text-gray-300">
              <Zap size={14} className="text-[#EE001C]" /> Agile & Efficient
            </div>
            <div className="px-4 py-2 bg-[#0c0820] border border-gray-800 rounded-lg flex items-center gap-2 text-[11px] font-medium text-gray-300">
              <TrendingUp size={14} className="text-[#EE001C]" /> Result-Driven Approach
            </div>
          </motion.div>
        </div>

        {/* Right Service Dashboard Preview */}
        <div className="lg:w-[45%] relative w-full flex items-center justify-center">
          <DigitalPipelineSimulator />
        </div>

      </div>

    </div>
  );
};

export default OtherServicesHero;
