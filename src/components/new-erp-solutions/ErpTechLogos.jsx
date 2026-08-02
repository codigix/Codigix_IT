import React from 'react';
import { Cloud, Database } from 'lucide-react';

const ErpTechLogos = () => {
  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-gray-800/50 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 text-left">
      <h4 className="text-[13px] font-bold text-slate-900 dark:text-white shrink-0">Technologies & Integrations</h4>
      
      <div className="flex-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Styled text representations */}
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-blue-500 text-lg tracking-tighter">SAP</span>
         </div>
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-red-500 text-lg">ORACLE</span>
         </div>
         <div className="flex items-center gap-1.5 font-semibold text-blue-400 text-sm cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <div className="grid grid-cols-2 gap-[1px]">
              <div className="w-1.5 h-1.5 bg-orange-500"></div><div className="w-1.5 h-1.5 bg-green-500"></div>
              <div className="w-1.5 h-1.5 bg-blue-500"></div><div className="w-1.5 h-1.5 bg-yellow-500"></div>
           </div>
           Dynamics 365
         </div>
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-purple-600 text-lg tracking-tighter">odoo</span>
         </div>
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-orange-400 text-lg">aws</span>
         </div>
         <div className="flex items-center gap-1.5 font-bold text-blue-400 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <Cloud size={16}/> Azure
         </div>
         <div className="flex items-center gap-1.5 font-bold text-slate-750 dark:text-gray-300 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <Cloud size={16}/> Google Cloud
         </div>
         <div className="flex items-center gap-1.5 font-bold text-yellow-500 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <Database size={16}/> Power BI
         </div>
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-indigo-450 dark:text-indigo-400">tableau</span>
         </div>
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-orange-500">zapier</span>
         </div>
         <div className="px-2 py-0.5 bg-slate-100 dark:bg-gray-800/60 rounded border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-400 font-mono text-[10px] cursor-pointer group relative">
           &lt;/&gt;
         </div>
      </div>
    </div>
  );
};

export default ErpTechLogos;
