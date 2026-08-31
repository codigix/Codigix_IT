import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from './CaseStudiesSidebar';
import config from '../../config';

const CaseStudiesGrid = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();
  const [caseStudiesData, setCaseStudiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/projects`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setCaseStudiesData(data);
        } else {
          setCaseStudiesData([]);
        }
      } catch (error) {
        console.error('Error fetching case studies from API:', error);
        setCaseStudiesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredStudies = activeCategory === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(study => study.category === activeCategory || study.catName === activeCategory);

  // Top 6 categories for the horizontal filter bar
  const filterTabs = categories.slice(0, 6);

  if (loading) return <div className="py-20 text-center text-slate-500">Loading Case Studies...</div>;

  return (
    <section id="case-studies-grid" className="py-8 scroll-mt-24 text-left" aria-label="Case Studies Portfolio Grid">
      
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full hide-scrollbar">
           {filterTabs.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveCategory(tab.id)}
               className={`px-4 py-2 text-[11px] font-medium rounded-lg border transition-all shrink-0 ${
                 activeCategory === tab.id 
                   ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20 font-semibold' 
                   : 'bg-slate-50 dark:bg-[#050117] border-slate-200 dark:border-gray-800 text-slate-550 dark:text-gray-400 hover:border-slate-400 dark:hover:border-gray-600 hover:text-slate-900 dark:hover:text-gray-250'
               }`}
             >
               {tab.id === 'All' ? 'All' : tab.name}
             </button>
           ))}
        </div>

        <div className="shrink-0 flex items-center gap-2 px-4 py-2 border border-slate-250 dark:border-gray-700 rounded-lg text-[11px] text-slate-500 dark:text-gray-400 cursor-pointer hover:border-slate-400 dark:hover:border-gray-500 transition-colors shadow-sm">
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
              onClick={() => navigate(`/case-studies/${study.id}`)}
              className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/85 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl flex flex-col group hover:border-purple-500/50 transition-all duration-300 cursor-pointer relative"
            >
              {/* Spotlight background hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* LED Active Beacon */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity z-20">
                <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
              </div>

              {/* Image Area */}
              <div className="h-48 overflow-hidden relative">
                 <div className="absolute inset-0 bg-purple-900/10 dark:bg-purple-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                 <img 
                   src={study.image || study.heroImage} 
                   alt={`${study.title} - ${study.catName || study.category} case study preview for ${study.clientName || study.client}`} 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-125"
                 />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 relative z-20 bg-white dark:bg-gradient-to-t dark:from-[#050112] dark:via-[#050112] dark:to-transparent">
                 <span className="text-[9px] font-bold text-purple-750 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-500/10 inline-block self-start px-2 py-1 rounded border border-purple-200 dark:border-purple-500/20 mb-3">
                   {study.catName || study.category}
                 </span>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-purple-650 dark:group-hover:text-purple-300 transition-colors">
                   {study.title}
                 </h3>
                 <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                   {study.subtitle || study.overview || study.desc}
                 </p>

                 {/* Stats */}
                 <div className="grid grid-cols-3 gap-2 border-t border-slate-200 dark:border-gray-800 pt-4 mb-4">
                    {(() => {
                       let stats = [];
                       try {
                         if (study.results_impact) {
                           let parsed = typeof study.results_impact === 'string' ? JSON.parse(study.results_impact) : study.results_impact;
                           stats = parsed.slice(0, 3).map(item => ({ value: item.val || item.value, label: item.title || item.label }));
                         } else if (study.results) {
                           stats = study.results.slice(0, 3).map(item => ({ value: item.val || item.value, label: item.title || item.label }));
                         } else if (study.stats) {
                           stats = study.stats;
                         }
                       } catch(e) {}
                       return stats.map((stat, idx) => (
                         <div key={idx} className="flex flex-col">
                           <span className="text-lg font-bold text-purple-600 dark:text-purple-300 mb-1">{stat.value}</span>
                           <span className="text-[9px] text-slate-500 dark:text-gray-500 leading-tight">{stat.label}</span>
                         </div>
                       ));
                    })()}
                 </div>

                 <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-[11px] font-medium group-hover:text-purple-500 transition-colors mt-auto">
                   View Case Study <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
};

export default CaseStudiesGrid;
