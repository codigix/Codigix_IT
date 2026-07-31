import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Settings, Cpu, ShieldCheck, TrendingUp, Rocket, Building2, CheckCircle2, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IndustryOperationsSimulator = () => {
  const [activeTab, setActiveTab] = useState(0);
  const industries = [
    { name: 'Manufacturing', yield: '99.4%', status: 'SHOPS_OEE: 94.2%', log: '[IIOT] Ingesting multi-channel nodes. Temp: 24.2C' },
    { name: 'Healthcare', yield: '98.4% Claims', status: 'BEDS_OCCUPY: 88%', log: '[EHR] Patient scheduling portals synced. HIPAA Vault secure.' },
    { name: 'Retail', yield: '99.1% Delivery', status: 'TURNOVER: 8.4x', log: '[WMS] Automated wave picking slips route generated.' },
    { name: 'Finance', yield: '99.98% Fraud Rate', status: 'AUDIT: COMPLIANT', log: '[FINTECH] Net Revenue ledger reconciliations compiled.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(t => (t + 1) % industries.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-[#EE001C] font-bold uppercase tracking-wider">INDUSTRY_OPS_HUB</span>
        <span className="nh-led-active bg-[#EE001C] shadow-[0_0_8px_#ef4444]"></span>
      </div>
      
      <div className="space-y-1.5 h-[50px] flex flex-col justify-center">
        <div className="text-gray-500">// active industry validation</div>
        <div className="text-rose-400 font-bold">{industries[activeTab].name} Solutions</div>
        <div className="text-white text-[9px] leading-relaxed truncate">{industries[activeTab].log}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-gray-800/60">
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">KPI Target</span>
          <span className="text-xs font-bold text-green-400">{industries[activeTab].yield}</span>
        </div>
        <div className="border border-gray-800 bg-[#050117] p-2 rounded-lg">
          <span className="text-gray-500 text-[8px] block uppercase">Capacity Load</span>
          <span className="text-xs font-bold text-cyan-400">{industries[activeTab].status}</span>
        </div>
      </div>
    </div>
  );
};

const IndustriesHero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">

      <div className="flex flex-col xl:flex-row gap-8 mb-16 items-center">
         
         <div className="xl:w-3/5 z-10 text-left">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#EE001C] font-bold uppercase tracking-widest text-[11px] mb-4"
            >
              Industries
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-white leading-[1.15] mb-6"
            >
              Industry-Focused Solutions.<br/>
              <span className="industries-text-gradient">Real-World Impact.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[13px] text-gray-300 leading-relaxed mb-8 max-w-lg"
            >
              At Codigix, we understand that every industry has unique challenges and opportunities. Our tailor-made digital solutions help businesses streamline operations, enhance efficiency, and drive sustainable growth.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
                <Settings size={14} className="text-[#EE001C]" /> Industry Expertise
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
                <Cpu size={14} className="text-[#EE001C]" /> Tailored Solutions
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
                <ShieldCheck size={14} className="text-[#EE001C]" /> Scalable & Future-Ready
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
                <TrendingUp size={14} className="text-[#EE001C]" /> Measurable Impact
              </div>
            </motion.div>
         </div>

         {/* Graphic Side -> Live Telemetry Simulator */}
         <div className="xl:w-2/5 flex justify-center xl:justify-end relative h-[300px] w-full">
           <IndustryOperationsSimulator />
         </div>
      </div>

      {/* Stats Row (Unified Container) */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="bg-[#050112] border border-gray-800/80 rounded-2xl p-6 shadow-xl w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-800 text-left"
      >
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Rocket size={24} className="text-blue-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-white">150+</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Projects Delivered</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Building2 size={24} className="text-purple-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-white">50+</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Industries Served</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <CheckCircle2 size={24} className="text-green-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-white">98.5%</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Client Satisfaction</p>
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
            <Headphones size={24} className="text-orange-500 shrink-0" />
            <div>
               <h4 className="text-xl font-bold text-white">24/7</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Support Available</p>
            </div>
         </div>
      </motion.div>

    </div>
  );
};

export default IndustriesHero;
