import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { caseStudyClient, caseStudyResults } from '../../utils/caseStudies';

// Results reported in the published case studies, taken round-robin so every
// client is represented (max 6)
const pickResults = (studies) => {
  const lists = studies.map((study) => caseStudyResults(study).map((result) => ({ ...result, client: caseStudyClient(study) })));
  const picked = [];
  for (let round = 0; picked.length < 6 && lists.some((list) => list[round]); round++) {
    for (const list of lists) if (list[round] && picked.length < 6) picked.push(list[round]);
  }
  return picked;
};

const CaseStudiesImpact = ({ studies = [] }) => {
  const impactStats = pickResults(studies);
  if (!impactStats.length) return null;

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 text-left">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Results Our Clients Reported</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {impactStats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-3 bg-white dark:bg-[#050117] border border-slate-200 dark:border-gray-800/80 p-5 rounded-2xl hover:border-purple-500/30 transition-all duration-300 relative group overflow-hidden shadow-sm dark:shadow-none"
          >
            {/* Spotlight background hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* LED Active Beacon */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </div>

            <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-900/10 flex items-center justify-center text-purple-650 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="heading-text text-lg font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-1">{stat.client}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesImpact;
