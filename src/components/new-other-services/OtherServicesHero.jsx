import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

const DigitalPipelineSimulator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { log: '[WEBPACK] Bundling client React & Next.js assets... OK. 184 kB.' },
    { log: '[ESLINT] Scanning codebase. Warnings: 0, Errors: 0.' },
    { log: '[TEST] Executing 54 unit specs. Passed: 54/54. Coverage: 98.2%.' },
    { log: '[AWS/VERCEL] Deploying production bundle. Live URL synchronized.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] rounded-2xl p-5 shadow-lg dark:shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-2">
        <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">SERVICES_BUILD_PIPELINE</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
      </div>

      <div className="space-y-1.5 h-[45px] flex flex-col justify-center">
        <div className="text-slate-400 dark:text-gray-500">// active CI/CD logger</div>
        <div className="text-slate-900 dark:text-white font-bold leading-normal text-[11px] truncate">{steps[activeStep].log}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-200 dark:border-gray-800/60">
        <div className="border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] p-2 rounded-lg">
          <span className="text-slate-500 dark:text-gray-400 text-[8px] block uppercase font-bold">Lighthouse Score</span>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">99 / 100</span>
        </div>
        <div className="border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] p-2 rounded-lg">
          <span className="text-slate-500 dark:text-gray-400 text-[8px] block uppercase font-bold">LCP Speed</span>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">0.8s</span>
        </div>
      </div>
    </div>
  );
};

const OtherServicesHero = () => {
  return (
    <div className="relative border-b border-slate-200 dark:border-gray-800/50 pb-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold text-left">
        <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Home</span>
        <ChevronRight size={12} />
        <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Services</span>
        <ChevronRight size={12} />
        <span className="text-purple-600 dark:text-purple-400 font-extrabold">Digital & Engineering Services</span>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* Left text */}
        <div className="lg:w-[55%] z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6"
          >
            Powering Digital Engineering <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Beyond Boundaries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg font-normal"
          >
            From modern web platforms to cross-platform mobile apps, cloud infrastructure, UI/UX design systems, and DevOps pipelines – we deliver end-to-end digital solutions tailored for your business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="px-3.5 py-2 bg-white dark:bg-[#0c0820] border border-slate-200 dark:border-gray-800 rounded-xl flex items-center gap-2 text-[11px] font-bold text-slate-800 dark:text-gray-200 shadow-xs">
              <Cpu size={14} className="text-purple-600 dark:text-purple-400" /> Future-Ready Tech
            </div>
            <div className="px-3.5 py-2 bg-white dark:bg-[#0c0820] border border-slate-200 dark:border-gray-800 rounded-xl flex items-center gap-2 text-[11px] font-bold text-slate-800 dark:text-gray-200 shadow-xs">
              <ShieldCheck size={14} className="text-purple-600 dark:text-purple-400" /> Enterprise Security
            </div>
            <div className="px-3.5 py-2 bg-white dark:bg-[#0c0820] border border-slate-200 dark:border-gray-800 rounded-xl flex items-center gap-2 text-[11px] font-bold text-slate-800 dark:text-gray-200 shadow-xs">
              <Zap size={14} className="text-purple-600 dark:text-purple-400" /> High Performance
            </div>
            <div className="px-3.5 py-2 bg-white dark:bg-[#0c0820] border border-slate-200 dark:border-gray-800 rounded-xl flex items-center gap-2 text-[11px] font-bold text-slate-800 dark:text-gray-200 shadow-xs">
              <TrendingUp size={14} className="text-purple-600 dark:text-purple-400" /> Agile Delivery
            </div>
          </motion.div>
        </div>

        {/* Right Service Dashboard Preview */}
        <div className="lg:w-[45%] relative w-full flex flex-col justify-center gap-4">
          <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#060318] shadow-md dark:shadow-2xl">
            <div className="bg-slate-100/90 dark:bg-[#0d0728] px-4 py-2 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-gray-400 tracking-wider bg-white/80 dark:bg-black/40 px-3 py-0.5 rounded border border-slate-200/60 dark:border-gray-800">
                codigix.services/digital-suite
              </div>
              <div className="w-8"></div>
            </div>
            <div className="p-2 relative h-[170px] overflow-hidden bg-slate-50 dark:bg-[#090422] flex items-center justify-center">
              <img 
                src="/assets/images/service/custom_software_dashboard.webp" 
                alt="Digital Engineering Showcase Light" 
                className="block dark:hidden w-full h-full object-cover rounded-xl shadow-xs" 
              />
              <img 
                src="/assets/images/new-iot-solutions/software_wireframe_dark.png" 
                alt="Digital Engineering Showcase Dark" 
                className="hidden dark:block w-full h-full object-contain filter contrast-125 brightness-110" 
              />
            </div>
          </div>
          
          <DigitalPipelineSimulator />
        </div>

      </div>

    </div>
  );
};

export default OtherServicesHero;
