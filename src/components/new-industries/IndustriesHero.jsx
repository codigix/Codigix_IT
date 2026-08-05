import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Cpu, ShieldCheck, TrendingUp, Rocket, Building2, CheckCircle2, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const heroContentByIndustry = {
  'Manufacturing': {
    badge: 'Manufacturing & Smart Factory',
    headline: 'Smart Manufacturing & IIoT Solutions',
    highlight: 'Real-World Production Impact.',
    description: 'Digitize your shop floor, eliminate machine downtime, automate inventory BOMs, and boost production yield with our enterprise IIoT, ERP, and AI analytics platforms.',
    pills: [
      { text: 'IIoT Machine Telemetry', icon: Settings },
      { text: 'Smart Shopfloor ERP', icon: Cpu },
      { text: 'Predictive Maintenance', icon: ShieldCheck },
      { text: 'ISO Quality Audits', icon: TrendingUp }
    ],
    simulatorIndex: 0
  },
  'Healthcare': {
    badge: 'Healthcare & Life Sciences',
    headline: 'Digital Health & Hospital Platforms',
    highlight: 'HIPAA-Compliant Patient Care.',
    description: 'Empower clinicians, streamline patient intake, automate EHR/EMR workflows, and connect pharmacy LIMS systems with secure, cloud-native healthcare software.',
    pills: [
      { text: 'EHR/EMR Integration', icon: ShieldCheck },
      { text: 'Telemedicine Portals', icon: Cpu },
      { text: 'Pharmacy LIMS Sync', icon: Settings },
      { text: 'HIPAA Data Vaults', icon: TrendingUp }
    ],
    simulatorIndex: 1
  },
  'Retail': {
    badge: 'Retail & E-Commerce',
    headline: 'Omnichannel Commerce & POS Engines',
    highlight: 'Seamless Customer Journeys.',
    description: 'Unify physical stores and digital storefronts. Control real-time multi-location inventory, automate customer loyalty, and deliver sub-second online checkout.',
    pills: [
      { text: 'Cloud POS & Checkout', icon: Cpu },
      { text: 'Omnichannel Inventory WMS', icon: Settings },
      { text: 'AI Loyalty Engines', icon: TrendingUp },
      { text: 'Multi-Store Analytics', icon: ShieldCheck }
    ],
    simulatorIndex: 2
  },
  'Finance': {
    badge: 'Banking & Financial Technology',
    headline: 'Fintech & Automated Financial Engines',
    highlight: 'Audit-Proof Financial Speed.',
    description: 'Build secure core banking interfaces, automated ledger reconciliation, instant quotation CPQ engines, and AI fraud prevention systems engineered for high concurrency.',
    pills: [
      { text: 'Core Banking Portals', icon: Cpu },
      { text: 'Automated Reconciliation', icon: Settings },
      { text: 'Fraud Detection AI', icon: ShieldCheck },
      { text: 'Multi-Currency Ledger', icon: TrendingUp }
    ],
    simulatorIndex: 3
  },
  'Real Estate': {
    badge: 'Real Estate & Property Tech',
    headline: 'Property Tech & Real Estate ERPs',
    highlight: 'Automated Property Lifecycles.',
    description: 'Streamline property listings, automate lead assignment, manage tenant leases, track maintenance requests, and deliver immersive 3D virtual tour experiences.',
    pills: [
      { text: 'Real Estate Lead CRM', icon: Cpu },
      { text: 'Property Portals', icon: Settings },
      { text: '3D Virtual Tours', icon: TrendingUp },
      { text: 'Lease & Contract Automation', icon: ShieldCheck }
    ],
    simulatorIndex: 0
  }
};

const IndustryOperationsSimulator = ({ activeIndustry }) => {
  const industries = [
    { name: 'Manufacturing', yield: '99.4%', status: 'SHOPS_OEE: 94.2%', log: '[IIOT] Ingesting multi-channel nodes. Temp: 24.2C' },
    { name: 'Healthcare', yield: '98.4% Claims', status: 'BEDS_OCCUPY: 88%', log: '[EHR] Patient scheduling portals synced. HIPAA Vault secure.' },
    { name: 'Retail', yield: '99.1% Delivery', status: 'TURNOVER: 8.4x', log: '[WMS] Automated wave picking slips route generated.' },
    { name: 'Finance', yield: '99.98% Fraud Rate', status: 'AUDIT: COMPLIANT', log: '[FINTECH] Net Revenue ledger reconciliations compiled.' }
  ];

  const currentHeroData = heroContentByIndustry[activeIndustry] || heroContentByIndustry['Manufacturing'];
  const [activeTab, setActiveTab] = useState(currentHeroData.simulatorIndex);

  useEffect(() => {
    setActiveTab(currentHeroData.simulatorIndex);
  }, [activeIndustry, currentHeroData.simulatorIndex]);

  return (
    <div className="w-full max-w-sm border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] rounded-2xl p-4 shadow-sm dark:shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-2">
        <span className="text-[#EE001C] font-bold uppercase tracking-wider">INDUSTRY_OPS_HUB</span>
        <span className="nh-led-active bg-[#EE001C] shadow-[0_0_8px_#ef4444]"></span>
      </div>

      <div className="space-y-1.5 h-[50px] flex flex-col justify-center">
        <div className="text-slate-400 dark:text-gray-500">// Active Selection: {activeIndustry}</div>
        <div className="text-rose-500 font-bold">{industries[activeTab].name} Solutions</div>
        <div className="text-slate-900 dark:text-white text-[9px] leading-relaxed truncate">{industries[activeTab].log}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-200 dark:border-gray-800/60">
        <div className="border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] p-2 rounded-lg">
          <span className="text-slate-400 dark:text-gray-500 text-[8px] block uppercase">KPI Target</span>
          <span className="text-xs font-bold text-green-600 dark:text-green-400">{industries[activeTab].yield}</span>
        </div>
        <div className="border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] p-2 rounded-lg">
          <span className="text-slate-400 dark:text-gray-500 text-[8px] block uppercase">Capacity Load</span>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{industries[activeTab].status}</span>
        </div>
      </div>
    </div>
  );
};

const IndustriesHero = ({ activeIndustry = 'Manufacturing' }) => {
  const navigate = useNavigate();

  const heroData = heroContentByIndustry[activeIndustry] || heroContentByIndustry['Manufacturing'];

  return (
    <div className="relative">
      <div className="flex flex-col xl:flex-row gap-8 mb-16 items-center">
        <div className="xl:w-3/5 z-10 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[#EE001C] dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={13} className="text-[#EE001C]" />
                <span>{heroData.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.15] mb-6">
                {heroData.headline}<br />
                <span className="industries-text-gradient">{heroData.highlight}</span>
              </h1>

              <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed mb-6 max-w-lg">
                {heroData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:from-[#d30018] hover:to-[#6b1fb0] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule Industry Audit</span> <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-transparent border border-slate-350 dark:border-gray-700 hover:border-purple-500 text-slate-800 dark:text-white text-[12px] font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-500/10"
                >
                  <span>Explore Solutions</span> <Sparkles size={14} />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {heroData.pills.map((pill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-800/40 text-[11px] font-medium text-slate-700 dark:text-gray-300">
                    <pill.icon size={14} className="text-[#EE001C]" /> {pill.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Graphic Side -> Live Telemetry Simulator */}
        <div className="xl:w-2/5 flex justify-center xl:justify-end relative h-[300px] w-full">
          <IndustryOperationsSimulator activeIndustry={activeIndustry} />
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-gray-800 text-left"
      >
        <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
          <Rocket size={24} className="text-blue-500 shrink-0" />
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">150+</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Projects Delivered</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
          <Building2 size={24} className="text-purple-500 shrink-0" />
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">10+</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Industries Served</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
          <CheckCircle2 size={24} className="text-green-500 shrink-0" />
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">98.5%</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Client Satisfaction</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 px-2">
          <Headphones size={24} className="text-orange-500 shrink-0" />
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">24/7</h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">Support Available</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IndustriesHero;
