import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const getSolutionPath = (title) => {
  switch (title) {
    case 'AI Development':
      return '/ai-solutions';
    case 'Industrial IoT':
      return '/iot-solutions';
    case 'ERP Development':
      return '/erp-solutions';
    case 'CRM Development':
      return '/crm-solutions';
    default:
      return '/services';
  }
};

const solutions = [
  {
    title: 'AI Development',
    features: ['Generative AI', 'Chatbots & Assistants', 'Computer Vision', 'Voice AI', 'LLM Integration', 'AI Automation', 'Predictive Analytics'],
    imageLight: '/assets/images/new-home/sol_ai_light.webp',
    imageDark: '/assets/images/new-home/sol_ai_dark.webp'
  },
  {
    title: 'Industrial IoT',
    features: ['PLC Integration', 'Machine Monitoring', 'OEE Dashboard', 'Predictive Maintenance', 'Sensor Networks', 'SCADA Integration', 'Industry 4.0'],
    imageLight: '/assets/images/new-home/sol_iot_light.webp',
    imageDark: '/assets/images/new-home/sol_iot_dark.webp'
  },
  {
    title: 'ERP Development',
    features: ['Manufacturing ERP', 'Inventory Management', 'Production Planning', 'Purchase & Procurement', 'Quality Management', 'Finance & Accounts', 'HR & Asset Management'],
    imageLight: '/assets/images/new-home/sol_erp_light.webp',
    imageDark: '/assets/images/new-home/sol_erp_dark.webp'
  },
  {
    title: 'CRM Development',
    features: ['Lead Management', 'Sales Automation', 'Marketing Automation', 'Customer Support', 'Service Management', 'Quotation & Invoice', 'Reports & Analytics'],
    imageLight: '/assets/images/new-home/sol_crm_light.webp',
    imageDark: '/assets/images/new-home/sol_crm_dark.webp'
  },
  {
    title: 'Custom Software',
    features: ['Web Applications', 'Enterprise Solutions', 'Cloud Platforms', 'SaaS Products', 'Workflow Automation', 'API Integrations', 'Legacy Modernization'],
    imageLight: '/assets/images/new-home/sol_custom_light.webp',
    imageDark: '/assets/images/new-home/sol_custom_dark.webp'
  },
  {
    title: 'Mobile App Dev',
    features: ['Android & iOS', 'Flutter Development', 'React Native', 'PWA Development', 'Offline Applications', 'Push Notifications'],
    imageLight: '/assets/images/new-home/sol_mobile_light.webp',
    imageDark: '/assets/images/new-home/sol_mobile_dark.webp'
  }
];

const renderCardGraphic = (title) => {
  switch (title) {
    case 'AI Development':
      return (
        <div className="w-full h-10 border border-purple-300 dark:border-purple-500/20 bg-purple-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-center overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-purple-500/5" />
          <svg className="w-full h-8 px-4 opacity-75" viewBox="0 0 200 40">
            <line x1="20" y1="20" x2="60" y2="10" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="20" x2="60" y2="30" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="10" x2="110" y2="20" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="60" y1="30" x2="110" y2="20" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="110" y1="20" x2="160" y2="20" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 1" />
            <circle cx="20" cy="20" r="3" fill="#8b5cf6" />
            <circle cx="60" cy="10" r="3" fill="#8b5cf6" />
            <circle cx="60" cy="30" r="3" fill="#8b5cf6" />
            <circle cx="110" cy="20" r="4" fill="#dc2626" className="animate-pulse" />
            <circle cx="160" cy="20" r="3" fill="#3b82f6" />
          </svg>
          <span className="absolute bottom-1 right-2 text-[7px] font-bold text-rose-600 dark:text-rose-400 tracking-widest uppercase">MODEL_ACTIVE</span>
        </div>
      );
    case 'Industrial IoT':
      return (
        <div className="w-full h-10 border border-blue-300 dark:border-blue-500/20 bg-blue-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-between px-3 overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-blue-500/5" />
          <div className="text-[7.5px] font-mono text-slate-600 dark:text-gray-500 font-bold">Reg: 4001</div>
          <svg className="w-24 h-6 opacity-80" viewBox="0 0 100 30">
            <path d="M0,15 Q15,0 30,15 T60,15 T90,15" fill="none" stroke="#3b82f6" strokeWidth="1.5">
              <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="4s" repeatCount="indefinite" />
            </path>
          </svg>
          <div className="text-[8px] font-bold text-blue-600 dark:text-blue-400 animate-pulse">45.2 Hz</div>
        </div>
      );
    case 'ERP Development':
      return (
        <div className="w-full h-10 border border-green-300 dark:border-green-500/20 bg-green-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-around px-2 overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-green-500/5" />
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/5" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#22c55e" strokeWidth="3" strokeDasharray="92 8" strokeDashoffset="25" />
            </svg>
            <div className="text-left">
              <div className="text-[6.5px] text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider">OEE Efficient</div>
              <div className="text-[9px] font-extrabold text-slate-900 dark:text-white leading-none">92.4%</div>
            </div>
          </div>
          <div className="text-[7px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-800 px-1 py-0.5 rounded font-mono font-bold">SYS_OK</div>
        </div>
      );
    case 'CRM Development':
      return (
        <div className="w-full h-10 border border-orange-300 dark:border-orange-500/20 bg-orange-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-between px-3 overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-orange-500/5" />
          <div className="text-left">
            <div className="text-[6.5px] text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider">MRR Growth</div>
            <div className="text-[9px] font-extrabold text-slate-900 dark:text-white leading-none">+34.8%</div>
          </div>
          <svg className="w-16 h-6" viewBox="0 0 80 30">
            <path d="M0,25 L15,20 L30,12 L45,18 L60,8 L75,2" fill="none" stroke="#f97316" strokeWidth="1.5" />
            <circle cx="75" cy="2" r="2" fill="#f97316" />
          </svg>
        </div>
      );
    case 'Custom Software':
      return (
        <div className="w-full h-10 border border-cyan-300 dark:border-cyan-500/20 bg-cyan-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-between px-3 overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-cyan-500/5" />
          <div className="text-[8px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">git commit -m "deploy"</div>
          <div className="text-[7.5px] bg-cyan-100 dark:bg-[#0c2e3a] text-cyan-800 dark:text-cyan-300 px-1.5 py-0.5 rounded font-bold tracking-wider animate-pulse">BUILD_OK</div>
        </div>
      );
    case 'Mobile App Dev':
      return (
        <div className="w-full h-10 border border-rose-300 dark:border-rose-500/20 bg-rose-50/80 dark:bg-[#050117] rounded-lg relative flex items-center justify-around px-2 overflow-hidden mb-4 shrink-0">
          <div className="absolute inset-0 bg-rose-500/5" />
          <div className="flex gap-2">
            <div className="w-3.5 h-6 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-[2px] relative flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-slate-400 dark:bg-gray-500 rounded-full absolute top-[1px]" />
              <div className="w-2.5 h-4 bg-rose-500/15 dark:bg-rose-500/20 rounded-[1px] flex items-center justify-center">
                <span className="text-[4px] text-rose-600 dark:text-rose-400 font-bold">iOS</span>
              </div>
            </div>
            <div className="w-3.5 h-6 border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-[2px] relative flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-slate-400 dark:bg-gray-500 rounded-full absolute top-[1px]" />
              <div className="w-2.5 h-4 bg-blue-500/15 dark:bg-blue-500/20 rounded-[1px] flex items-center justify-center">
                <span className="text-[3px] text-blue-600 dark:text-blue-400 font-bold">ANDR</span>
              </div>
            </div>
          </div>
          <div className="text-[7px] text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider text-right">Cross-Platform<br /><span className="text-slate-900 dark:text-white font-extrabold">Active SDK</span></div>
        </div>
      );
    default:
      return null;
  }
};

const SolutionsGrid = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-purple-50/20 to-slate-50 dark:from-[#0d0b21] dark:via-[#0d0b21] dark:to-[#0d0b21] relative transition-colors duration-300">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="nh-section-subtitle text-rose-600 dark:text-rose-500 font-bold tracking-wider">What We Do</span>
          <h2 className="nh-section-title text-slate-900 dark:text-white font-extrabold">End-to-End Intelligent Solutions</h2>
        </div>

        <div className="nh-marquee-container py-4">
          <div className="nh-marquee-track">
            {[...solutions, ...solutions].map((sol, index) => (
              <div
                key={index}
                className="nh-solution-card group flex flex-col h-full w-[280px] md:w-[320px] lg:w-[350px] shrink-0 mr-4 xl:mr-6 hover:shadow-[0_12px_35px_rgba(139,92,246,0.18)] hover:border-purple-400 dark:hover:border-purple-500/30 transition-all duration-300"
              >

                {/* Theme-Aware Showcase Container */}
                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative shadow-inner">

                  {/* Light Theme Visual Frame */}
                  <div className="block dark:hidden w-full h-full bg-slate-50/80 border border-slate-200/80 relative">
                    <img
                      src={sol.imageLight}
                      alt={`Codigix ${sol.title} - Enterprise Engineering Solutions`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 relative z-10"
                      loading="lazy"
                    />
                  </div>

                  {/* Dark Theme Visual Frame */}
                  <div className="hidden dark:block w-full h-full bg-gradient-to-br from-[#0c0828] to-[#160d3d] border border-purple-900/30 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-purple-500/10 pointer-events-none" />
                    <img
                      src={sol.imageDark}
                      alt={`Codigix ${sol.title} - Industrial & Software Platform`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 relative z-10"
                      loading="lazy"
                    />
                  </div>

                </div>

                <h3 className="text-lg xl:text-xl font-extrabold text-slate-900 dark:text-white mb-4">{sol.title}</h3>

                {renderCardGraphic(sol.title)}

                <ul className="space-y-2.5 mb-6">
                  {sol.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-slate-700 dark:text-gray-400 text-xs md:text-sm flex items-center gap-2 group/item cursor-default hover:text-slate-900 dark:hover:text-white font-medium transition-colors duration-300">
                      <ChevronRight size={13} className="text-rose-600 dark:text-rose-500 shrink-0 group-hover/item:translate-x-0.5 transition-transform duration-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    to={getSolutionPath(sol.title)}
                    aria-label={`Explore details for Codigix ${sol.title}`}
                    className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
                  >
                    Explore Solutions <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
