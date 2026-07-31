import React from 'react';
import { Share2, Puzzle } from 'lucide-react';

const ErpIntegrationsBanner = () => {
  return (
    <div className="relative mt-12 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0d0a25] to-[#0f0931] border border-gray-800/60 p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-[0_5px_30px_rgba(0,0,0,0.3)] group">
      
      {/* Background glow */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-xl text-purple-400 shrink-0">
        <Share2 size={32} />
      </div>

      <div className="flex-1 z-10 text-center md:text-left">
        <h4 className="text-[15px] font-bold text-white mb-2 tracking-wide">ERP Integrations</h4>
        <p className="text-[12px] text-gray-400 leading-relaxed max-w-2xl">
          Seamlessly integrate with third-party applications, IoT devices, payment gateways, CRM, eCommerce, and other business-critical systems.
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2 z-10 text-purple-500/50 group-hover:text-purple-400/80 transition-colors">
        <Puzzle size={40} className="drop-shadow-[0_0_10px_currentColor]" />
        <Puzzle size={30} className="drop-shadow-[0_0_10px_currentColor] -ml-4 mt-4" />
      </div>

    </div>
  );
};

export default ErpIntegrationsBanner;
