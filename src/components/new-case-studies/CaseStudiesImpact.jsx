import React from 'react';
import { Users, Rocket, Network, Target, Globe2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const impactStats = [
  { icon: Users, value: '250+', label: 'Happy Clients' },
  { icon: Rocket, value: '350+', label: 'Solutions Delivered' },
  { icon: Network, value: '500+', label: 'Systems Integrated' },
  { icon: Target, value: '98.5%', label: 'Project Success Rate' },
  { icon: Globe2, value: '10M+', label: 'Users Impacted' },
  { icon: Clock, value: '24/7', label: 'Support & Maintenance' },
];

const CaseStudiesImpact = () => {
  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 text-left">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Business Impact That Matters</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
              <stat.icon size={20} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h4>
              <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesImpact;
