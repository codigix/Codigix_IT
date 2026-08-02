import React from 'react';
import { getDefaultData } from './iotTabData';

const IotTechAndIntegrations = ({ activeTab }) => {
  const data = getDefaultData(activeTab);
  const technologies = data.technologies || [];
  const integrations = data.integrations || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
      {/* Technologies We Use */}
      <div className="bg-white dark:bg-[#090624]/30 border border-slate-200 dark:border-gray-800/60 rounded-xl p-6 hover:border-slate-350 dark:hover:border-gray-700/80 transition-colors text-left shadow-sm dark:shadow-none">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Protocols & Technologies We Use</h4>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800/60 px-3 py-1.5 rounded-xl hover:border-rose-500/30 transition-all cursor-pointer group relative shadow-sm dark:shadow-none">
              {/* LED Active Beacon */}
              <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-60 group-hover:opacity-100 transition-opacity"></span>
              <span className={`text-[12px] font-bold tracking-wide transition-colors ${tech.color || 'text-rose-600 dark:text-rose-400'} group-hover:text-slate-900 dark:group-hover:text-white`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white dark:bg-[#090624]/30 border border-slate-200 dark:border-gray-800/60 rounded-xl p-6 hover:border-slate-350 dark:hover:border-gray-700/80 transition-colors text-left shadow-sm dark:shadow-none">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Enterprise & System Integrations</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {integrations.map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800/50 rounded-xl flex flex-col justify-center items-center py-3 px-2 hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer group relative overflow-hidden shadow-sm dark:shadow-none">
              {/* LED Active Beacon */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
              </div>
              <span className="text-[11px] text-slate-700 dark:text-gray-300 font-bold truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default IotTechAndIntegrations;
