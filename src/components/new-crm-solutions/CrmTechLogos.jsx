import React from 'react';

const CrmTechLogos = () => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 text-left">
      <h4 className="text-[13px] font-bold text-white shrink-0">Technologies & Integrations</h4>
      
      <div className="flex-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-blue-500 text-lg tracking-tighter">salesforce</span>
         </div>
         
         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-orange-500 text-lg">HubSpot</span>
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
           <span className="font-bold text-teal-500 text-lg tracking-tight">pipedrive</span>
         </div>

         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-yellow-500 text-lg tracking-tight">mailchimp</span>
         </div>

         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-red-500 text-lg tracking-tight">twilio</span>
         </div>

         <div className="flex items-center gap-1.5 cursor-pointer group relative">
           <span className="nh-led-active bg-emerald-500 shadow-[0_0_8px_#10b981] opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="font-bold text-orange-500 text-lg">zapier</span>
         </div>

         <div className="px-3 py-0.5 bg-[#0c0830] rounded border border-gray-700 text-gray-300 font-mono text-[11px] font-bold cursor-pointer group relative">
           API
         </div>
      </div>
    </div>
  );
};

export default CrmTechLogos;
