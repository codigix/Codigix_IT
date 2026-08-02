import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, ArrowRight, TrendingUp, Users, ShieldCheck, Zap, Smile } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getDefaultData } from './crmTabData';

// Sales CRM Simulator
const SalesCrmSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-purple-400 font-bold uppercase tracking-wider">SALES_PIPELINE_ENGINE</span>
        <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Pipeline Value MTD</span>
          <span className="text-white font-bold">$5,620,000.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Quarterly Win Rate</span>
          <span className="text-green-400 font-bold">38.4% (Target: 35%)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Average Deal Cycle</span>
          <span className="text-cyan-400 font-bold">18 Days</span>
        </div>
      </div>
    </div>
  );
};

// Lead Management Simulator
const LeadManagementSimulator = () => {
  const [score, setScore] = useState(89);

  useEffect(() => {
    const timer = setInterval(() => {
      setScore(s => (s <= 80 ? 98 : s - 2));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">LEAD_CONVERSION_MAT</span>
        <span className="nh-led-active bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between bg-[#050117] p-2 border border-gray-800 rounded-lg">
          <div>
            <span className="text-white font-bold block">Lead: Alex Rivera</span>
            <span className="text-[8px] text-gray-500">Source: Web Demo</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-white block">Score: {score}</span>
            <span className="text-[8px] text-green-400">HOT PROSPECT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Marketing Automation Simulator
const MarketingAutomationSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-pink-400 font-bold uppercase tracking-wider">MARKETING_BLAST_MONITOR</span>
        <span className="nh-led-active bg-pink-400 shadow-[0_0_8px_#f472b6]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Campaign: Summer Promo</span>
          <span className="text-white font-bold">85% Sent</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Email Open Rate</span>
          <span className="text-green-400 font-bold">24.2%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Click-Through (CTR)</span>
          <span className="text-cyan-400 font-bold">5.8%</span>
        </div>
      </div>
    </div>
  );
};

// Customer Support & Helpdesk Simulator
const CustomerSupportSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-rose-500 font-bold uppercase tracking-wider">HELPDESK_SUPPORT_BOARD</span>
        <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">CSAT Score MTD</span>
          <span className="text-green-400 font-bold">98.4% (Optimal)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Avg Resolution Time</span>
          <span className="text-white font-bold">14.2 Mins</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Queue Tickets</span>
          <span className="text-cyan-400 font-bold">2 Tickets Pending</span>
        </div>
      </div>
    </div>
  );
};

// Field Service & Service Management Simulator
const ServiceManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-orange-400 font-bold uppercase tracking-wider">FIELD_SERVICE_DISPATCH</span>
        <span className="nh-led-active bg-orange-400 shadow-[0_0_8px_#fb923c]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Assigned Techs</span>
          <span className="text-white font-bold">14 Dispatchers Active</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">First-Time Fix Rate</span>
          <span className="text-green-400 font-bold">92.5%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">SLA Violation Warnings</span>
          <span className="text-rose-400 font-bold">0 Violations</span>
        </div>
      </div>
    </div>
  );
};

// Quotation Management Contract Simulator
const QuotationManagementSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-emerald-400 font-bold uppercase tracking-wider">CONTRACT_QUOTE_ESIGN</span>
        <span className="nh-led-active bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
      </div>

      <div className="space-y-2 bg-[#050117] border border-gray-800 p-3 rounded-lg text-white font-bold">
        <div>QUOTE #Q-902-A2 STATUS: SIGNED</div>
        <div className="text-[8px] text-green-400">DESPATCH COMPLETED: ONGOING</div>
      </div>
    </div>
  );
};

// Default rotating dynamic wireframe
const DefaultCrmVisualizer = () => {
  return (
    <div className="w-full max-w-sm aspect-square relative flex items-center justify-center p-6">
      <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-purple-500/20 animate-spin-slow"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-blue-400/30 animate-spin-reverse"></div>

      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600/30 via-rose-600/20 to-blue-600/30 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(168,85,247,0.25)]">
        <div className="absolute w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />

        {/* Users Grid SVG Outline */}
        <svg className="w-10 h-10 text-white drop-shadow-[0_0_12px_#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>
  );
};

const renderCrmSandboxWidget = (tab) => {
  switch (tab) {
    case 'Sales CRM':
      return <SalesCrmSimulator />;
    case 'Lead Management':
      return <LeadManagementSimulator />;
    case 'Marketing Automation':
      return <MarketingAutomationSimulator />;
    case 'Customer Support':
    case 'Helpdesk':
      return <CustomerSupportSimulator />;
    case 'Service Management':
    case 'Field Service CRM':
      return <ServiceManagementSimulator />;
    case 'Quotation Management':
      return <QuotationManagementSimulator />;
    default:
      return <DefaultCrmVisualizer />;
  }
};

const CrmHero = ({ activeTab }) => {
  const navigate = useNavigate();
  const data = getDefaultData(activeTab);

  return (
    <div className="relative">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          </li>
          <li>
            <ChevronRight size={12} />
          </li>
          <li>
            <Link to="/crm-solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">CRM Solutions</Link>
          </li>
          <li>
            <ChevronRight size={12} />
          </li>
          <li className="text-purple-400 font-medium" aria-current="page">
            {activeTab}
          </li>
        </ol>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* Left text */}
        <div className="lg:w-1/2 z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeTab + "title"}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            {data.heroTitle} <span className="crm-text-gradient">{data.heroHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={activeTab + "desc"}
            className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-10 max-w-lg"
          >
            {data.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigate('/contact')}
              aria-label="Book a custom CRM software consultation"
              className="px-6 py-3 bg-[#9333ea] hover:bg-[#a855f7] text-white text-sm font-medium rounded-md shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              Book Consultation <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              aria-label="Request a live demonstration of Codigix CRM"
              className="px-6 py-3 bg-transparent border border-slate-300 dark:border-gray-600 hover:border-slate-500 dark:hover:border-gray-400 text-slate-900 dark:text-white text-sm font-medium rounded-md transition-all flex items-center gap-2 cursor-pointer"
            >
              Request Demo <Calendar size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right Content -> Dynamic Specific Visuals */}
        <div className="lg:w-1/2 relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`crm-sandbox-${activeTab}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full flex items-center justify-center"
            >
              {renderCrmSandboxWidget(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-16 text-left"
      >
        <div className="bg-white dark:bg-[#0c0830]/80 border border-slate-200 dark:border-gray-800/60 rounded-xl p-4 flex items-center gap-3 hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">3+</h3>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Happy<br />Customers</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0c0830]/80 border border-slate-200 dark:border-gray-800/60 rounded-xl p-4 flex items-center gap-3 hover:border-pink-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-2 bg-pink-500/10 rounded-lg text-pink-600 dark:text-pink-400 border border-pink-500/20">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">5+</h3>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Users<br />Empowered</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0c0830]/80 border border-slate-200 dark:border-gray-800/60 rounded-xl p-4 flex items-center gap-3 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">97.9%</h3>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">System<br />Uptime</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0c0830]/80 border border-slate-200 dark:border-gray-800/60 rounded-xl p-4 flex items-center gap-3 hover:border-fuchsia-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">30%+</h3>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Increase in<br />Productivity</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0c0830]/80 border border-slate-200 dark:border-gray-800/60 rounded-xl p-4 flex items-center gap-3 hover:border-teal-500/30 transition-colors shadow-sm dark:shadow-lg">
          <div className="p-2 bg-teal-500/10 rounded-lg text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <Smile size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">40%+</h3>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 leading-tight tracking-wide">Higher Customer<br />Satisfaction</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default CrmHero;
