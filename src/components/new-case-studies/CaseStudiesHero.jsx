import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Rocket, Building2, CheckCircle2, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImpactTelemetrySimulator = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { client: 'Sterling Techno Systems', result: '35% Productivity Gain', log: '[ERP] Work order scheduling automated. Throughput optimized.' },
    { client: 'Vastra Bhushan', result: '60% Lead Conversion Lift', log: '[CRM] Dynamic sales routing enabled. Lead leakage zeroed.' },
    { client: 'Nobel Casting IIoT', result: '30% Downtime Reduction', log: '[IIOT] Machine vibration sensors streaming telemetry. OK' },
    { client: 'Codigix Infotech', result: '3X User Web Traffic Boost', log: '[WEB] Next.js SSR pipeline live. Average LCP speed: 0.8s.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric(m => (m + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] rounded-2xl p-4 shadow-sm dark:shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-2">
        <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">PROJECT_IMPACT_LOGGER</span>
        <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
      </div>
      
      <div className="space-y-1.5 h-[50px] flex flex-col justify-center">
        <div className="text-slate-400 dark:text-gray-500">// active client validation</div>
        <div className="text-purple-600 dark:text-purple-300 font-bold">{metrics[activeMetric].client}</div>
        <div className="text-slate-900 dark:text-white text-[9px] leading-relaxed truncate">{metrics[activeMetric].log}</div>
      </div>

      <div className="border-t border-slate-200 dark:border-gray-800/60 pt-2.5 text-center">
        <span className="text-slate-400 dark:text-gray-500 block text-[8px] uppercase">Verified Business Outcome</span>
        <span className="text-xs font-bold text-green-600 dark:text-green-400 tracking-wide">{metrics[activeMetric].result}</span>
      </div>
    </div>
  );
};

const CaseStudiesHero = () => {
  const navigate = useNavigate();
  const handleDownload = () => {
    // 1. Trigger instant download of Case Studies Portfolio document
    const link = document.createElement('a');
    link.href = '/assets/docs/Codigix_Enterprise_Case_Studies_Portfolio.txt';
    link.download = 'Codigix_Enterprise_Case_Studies_Portfolio.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Smooth scroll down to the Case Studies grid
    const grid = document.getElementById('case-studies-grid');
    if (grid) {
      const yOffset = -90;
      const y = grid.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      
      {/* Top Part: Text & Graphic */}
      <div className="flex flex-col xl:flex-row gap-8 mb-12">
        
        {/* Text */}
        <div className="xl:w-1/2 z-10 flex flex-col justify-center text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#EE001C] font-bold uppercase tracking-widest text-[11px] mb-4"
          >
            Case Studies
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.15] mb-6"
          >
            Real Challenges.<br/>
            <span className="case-studies-text-gradient">Proven Solutions.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md"
          >
            Explore how Codigix has empowered businesses across industries with innovative digital solutions that drive efficiency, growth, and measurable results.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:from-[#d30018] hover:to-[#6b1fb0] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Discuss Your Project <ArrowRight size={14} />
            </button>
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-slate-350 dark:border-gray-700 hover:border-purple-500 text-slate-800 dark:text-white text-[12px] font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-500/10"
            >
              Download Case Studies <Download size={14} />
            </button>
          </motion.div>
        </div>

        {/* Graphic Area -> Live Telemetry Simulator */}
        <div className="xl:w-1/2 relative flex justify-center items-center min-h-[300px] w-full">
          <ImpactTelemetrySimulator />
        </div>

      </div>

      {/* Stats Row (Unified Container) */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-gray-800 mt-auto text-left"
      >
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Rocket size={24} className="text-purple-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white">150+</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Projects Completed</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Building2 size={24} className="text-purple-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white">55+</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Industries Served</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <CheckCircle2 size={24} className="text-purple-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white">98.5%</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Client Satisfaction</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Headphones size={24} className="text-orange-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white">July 2023</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Company Founded</p>
            </div>
         </div>
      </motion.div>

    </div>
  );
};

export default CaseStudiesHero;
