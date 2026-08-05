import React from 'react';
import { Cloud, Database, Cpu, ShieldCheck, Layers, Server, Code2, Sparkles, Globe, Zap } from 'lucide-react';

const techPartners = [
  { name: 'AWS Cloud', category: 'Cloud Infrastructure', color: 'text-amber-500', icon: Cloud },
  { name: 'Microsoft Azure', category: 'Enterprise Cloud', color: 'text-blue-500', icon: Server },
  { name: 'Google Cloud', category: 'AI & Data Analytics', color: 'text-rose-500', icon: Globe },
  { name: 'Oracle', category: 'Enterprise Database', color: 'text-red-600', icon: Database },
  { name: 'SAP Integration', category: 'Industrial ERP', color: 'text-sky-500', icon: Layers },
  { name: 'Salesforce', category: 'CRM Ecosystem', color: 'text-blue-400', icon: Zap },
  { name: 'Docker & K8s', category: 'DevOps & Containers', color: 'text-cyan-500', icon: Cpu },
  { name: 'Python AI / ML', category: 'Predictive Analytics', color: 'text-emerald-500', icon: Sparkles },
  { name: 'React & Node.js', category: 'Full-Stack Web', color: 'text-purple-500', icon: Code2 },
  { name: 'PostgreSQL / Redis', category: 'Data Architecture', color: 'text-indigo-400', icon: ShieldCheck }
];

const IndustriesLogos = ({ activeIndustry = 'Manufacturing' }) => {
  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/60 border-b border-slate-200 dark:border-gray-800/60 my-8 space-y-10 text-center">
      
      {/* 1. Industry Clients & Enterprise Partners */}
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-purple-500" />
            <span>Enterprise Clients</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Trusted by Enterprises & Innovators in <span className="text-purple-600 dark:text-purple-400">{activeIndustry}</span>
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-500 text-slate-700 dark:text-gray-300">
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-purple-500 transition-colors">
             <span className="text-purple-500 text-xl">❖</span> STERLING
           </div>
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-blue-500 transition-colors">
             <span className="text-blue-500 text-xl">◎</span> NOBEL TECH
           </div>
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-green-500 transition-colors">
             <span className="text-green-500 text-xl">△</span> THINK7
           </div>
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-orange-500 transition-colors">
             <span className="text-orange-500 text-xl">◇</span> VASTRA GLOBAL
           </div>
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-red-500 transition-colors">
             <span className="text-red-500 text-xl">⬡</span> CROWN INFRA
           </div>
           <div className="font-bold text-base sm:text-lg tracking-widest uppercase flex items-center gap-2 hover:text-teal-500 transition-colors">
             <span className="text-teal-500 text-xl">◭</span> APEX HEALTH
           </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="w-24 h-[1px] bg-slate-200 dark:bg-gray-800 mx-auto" />

      {/* 2. Global Technology & Cloud Partners */}
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Globe size={13} className="text-blue-500" />
            <span>Tech Stack & Ecosystem</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Technology & Cloud Partners</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-lg mx-auto mt-1 font-normal">
            We partner with leading cloud providers, database platforms, and IT frameworks to power scalable enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-5xl mx-auto px-2">
          {techPartners.map((partner, idx) => {
            const PartnerIcon = partner.icon;
            return (
              <div 
                key={idx} 
                className="group p-3 bg-white dark:bg-[#050117] border border-slate-200 dark:border-gray-800/80 rounded-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col items-center text-center shadow-xs hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-purple-950/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <PartnerIcon size={16} className={partner.color} />
                </div>
                <h4 className="text-[12px] font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-tight">
                  {partner.name}
                </h4>
                <span className="text-[9px] text-slate-500 dark:text-gray-400 font-normal mt-0.5">
                  {partner.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default IndustriesLogos;
