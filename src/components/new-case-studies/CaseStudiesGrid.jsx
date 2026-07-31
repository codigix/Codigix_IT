import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from './CaseStudiesSidebar';

const caseStudiesData = [
  {
    id: 1,
    category: 'ERP',
    catName: 'ERP SOLUTIONS',
    title: 'Manufacturing ERP for Sterling Techno Systems',
    desc: 'Implemented a comprehensive ERP solution to streamline production, inventory, finance, and quality management.',
    image: '/assets/images/service/erp_dash.png',
    stats: [
      { value: '35%', label: 'Increase in Productivity' },
      { value: '28%', label: 'Reduction in Operating Cost' },
      { value: '99%', label: 'Data Accuracy Achieved' }
    ]
  },
  {
    id: 2,
    category: 'CRM',
    catName: 'CRM SOLUTIONS',
    title: 'Sales CRM for Vastra Bhushan',
    desc: 'Built a robust CRM to automate sales, improve lead conversion, and enhance customer engagement.',
    image: '/assets/images/service/crm_dash.png',
    stats: [
      { value: '40%', label: 'Increase in Sales' },
      { value: '60%', label: 'Improvement in Lead Conversion' },
      { value: '95%', label: 'Customer Retention' }
    ]
  },
  {
    id: 3,
    category: 'IoT',
    catName: 'IOT SOLUTIONS',
    title: 'IIoT Implementation for Nobel Casting',
    desc: 'Connected machines and deployed IoT sensors to monitor real-time production and machine performance.',
    image: '/assets/images/service/iot_robot.png',
    stats: [
      { value: '30%', label: 'Reduction in Downtime' },
      { value: '25%', label: 'Increase in OEE' },
      { value: '100%', label: 'Real-time Monitoring' }
    ]
  },
  {
    id: 4,
    category: 'Web',
    catName: 'WEB DEVELOPMENT',
    title: 'Corporate Website for Codigix Infotech',
    desc: 'Developed a modern, responsive website that showcases services and improves online presence.',
    image: '/assets/images/service/web_dev_dashboard.webp',
    stats: [
      { value: '3X', label: 'Increase in Traffic' },
      { value: '50%', label: 'More User Engagement' },
      { value: '100%', label: 'Mobile Responsive' }
    ]
  },
  {
    id: 5,
    category: 'Mobile',
    catName: 'MOBILE APPS',
    title: 'Mobile App for Healthcare Provider',
    desc: 'Built a cross-platform mobile app for appointment booking, patient management, and real-time notifications.',
    image: '/assets/images/service/mobile_app.png',
    stats: [
      { value: '45%', label: 'More App Downloads' },
      { value: '70%', label: 'Increase in User Engagement' },
      { value: '4.8', label: 'Average App Rating' }
    ]
  },
  {
    id: 6,
    category: 'AI',
    catName: 'AI SOLUTIONS',
    title: 'AI Analytics for Retail Business',
    desc: 'Implemented AI-powered analytics to forecast demand, optimize inventory, and personalize marketing.',
    image: '/assets/images/service/ai_brain.png',
    stats: [
      { value: '32%', label: 'Increase in Revenue' },
      { value: '20%', label: 'Inventory Cost Reduced' },
      { value: '90%', label: 'Forecast Accuracy' }
    ]
  }
];

const CaseStudiesGrid = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();
  const filteredStudies = activeCategory === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(study => study.category === activeCategory);

  // Top 6 categories for the horizontal filter bar
  const filterTabs = categories.slice(0, 6);

  return (
    <div id="case-studies-grid" className="py-8 scroll-mt-24 text-left">
      
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full hide-scrollbar">
           {filterTabs.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveCategory(tab.id)}
               className={`case-studies-filter-btn shrink-0 ${activeCategory === tab.id ? 'active' : ''}`}
             >
               {tab.id === 'All' ? 'All' : tab.name}
             </button>
           ))}
        </div>

        <div className="shrink-0 flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md text-[11px] text-gray-400 cursor-pointer hover:border-gray-500 transition-colors">
          Sort by: Latest <ChevronDown size={14} />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStudies.map((study) => (
            <motion.div
              layout
              key={study.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/new-case-studies/${study.id}`)}
              className="bg-[#050112] border border-gray-800/85 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-purple-500/50 transition-all duration-300 cursor-pointer relative"
            >
              {/* Spotlight background hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* LED Active Beacon */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity z-20">
                <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
              </div>

              {/* Image Area */}
              <div className="h-48 overflow-hidden relative">
                 <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                 <img 
                   src={study.image} 
                   alt={study.title} 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-125"
                 />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 relative z-20 bg-gradient-to-t from-[#050112] via-[#050112] to-transparent">
                 <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 inline-block self-start px-2 py-1 rounded border border-purple-500/20 mb-3">
                   {study.catName}
                 </span>
                 <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                   {study.title}
                 </h3>
                 <p className="text-[11px] text-gray-400 leading-relaxed mb-6 flex-1">
                   {study.desc}
                 </p>

                 {/* Stats */}
                 <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-4 mb-4">
                    {study.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-lg font-bold text-purple-300 mb-1">{stat.value}</span>
                        <span className="text-[9px] text-gray-500 leading-tight">{stat.label}</span>
                      </div>
                    ))}
                 </div>

                 <div className="flex items-center gap-2 text-purple-400 text-[11px] font-medium group-hover:text-purple-300 transition-colors mt-auto">
                   View Case Study <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default CaseStudiesGrid;
