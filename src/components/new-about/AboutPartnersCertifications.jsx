import React from 'react';
import { ShieldCheck, Lock, FileCheck, Sparkles } from 'lucide-react';

const partners = [
  { 
    name: 'Microsoft Partner', 
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg' 
  },
  { 
    name: 'AWS Partner', 
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' 
  },
  { 
    name: 'Google Cloud', 
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' 
  },
  { 
    name: 'Odoo', 
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@9.20.0/icons/odoo.svg',
    isSvgBrand: true 
  },
  { 
    name: 'Zoho', 
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@9.20.0/icons/zoho.svg',
    isSvgBrand: true 
  },
  { 
    name: 'HubSpot', 
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@9.20.0/icons/hubspot.svg',
    isSvgBrand: true 
  },
];

const AboutPartnersCertifications = () => {
  return (
    <div id="about-partners" className="flex flex-col lg:flex-row gap-6 items-stretch mb-12 text-left scroll-mt-24">
      
      {/* Left: Certifications (With Clean Semi-Transparent Dark Overlay) */}
      <div className="lg:w-1/3 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl flex flex-col relative overflow-hidden group">
        
        {/* Semi-Transparent Overlay */}
        <div className="absolute inset-0 bg-black/75 z-25 flex flex-col items-center justify-center text-center p-4 select-none pointer-events-none">
          <div className="absolute w-28 h-28 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="relative z-30 flex flex-col items-center gap-2">
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/95 dark:bg-purple-950/95 border border-purple-500/50 text-purple-300 text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-purple-500/25 animate-pulse">
                <Sparkles size={12} className="text-purple-400" /> Coming Soon
             </div>
             <span className="text-[11px] font-semibold text-white tracking-wide">Certification Audits Underway</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Certifications</h3>
        
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 flex-1">
          {/* ISO 9001 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-purple-300 dark:border-purple-500/40 flex flex-col items-center justify-center mb-3 bg-purple-50/50 dark:bg-purple-950/20 shadow-inner">
               <ShieldCheck size={24} className="text-purple-600 dark:text-purple-400 mb-1" />
               <span className="text-[9px] font-bold text-slate-755 dark:text-gray-300">ISO</span>
            </div>
            <div className="text-[10px] font-bold text-slate-755 dark:text-gray-300">ISO 9001:2015</div>
            <div className="text-[8px] text-slate-500 dark:text-gray-500">Quality Management</div>
          </div>

          {/* ISO 27001 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-purple-300 dark:border-purple-500/40 flex flex-col items-center justify-center mb-3 bg-purple-50/50 dark:bg-purple-950/20 shadow-inner">
               <Lock size={24} className="text-purple-600 dark:text-purple-400 mb-1" />
               <span className="text-[9px] font-bold text-slate-755 dark:text-gray-300">ISO</span>
            </div>
            <div className="text-[10px] font-bold text-slate-755 dark:text-gray-300">ISO 27001:2013</div>
            <div className="text-[8px] text-slate-500 dark:text-gray-500">Information Security</div>
          </div>

          {/* GDPR */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-purple-300 dark:border-purple-500/40 flex flex-col items-center justify-center mb-3 bg-purple-50/50 dark:bg-purple-950/20 shadow-inner">
               <FileCheck size={24} className="text-purple-600 dark:text-purple-400 mb-1" />
               <span className="text-[9px] font-bold text-slate-755 dark:text-gray-300">GDPR</span>
            </div>
            <div className="text-[10px] font-bold text-slate-755 dark:text-gray-300">GDPR</div>
            <div className="text-[8px] text-slate-500 dark:text-gray-500">Compliant</div>
          </div>
        </div>
      </div>

      {/* Right: Trusted Partners */}
      <div className="lg:w-2/3 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl flex flex-col text-left">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Our Trusted Partners</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {partners.map((partner, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 flex items-center justify-center bg-white dark:bg-black/20 hover:border-purple-500/30 transition-colors group shadow-sm dark:shadow-none">
              <img 
                src={partner.img} 
                alt={partner.name} 
                className={`h-6 sm:h-8 max-w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all ${
                  partner.isSvgBrand ? 'dark:invert dark:brightness-200 dark:group-hover:invert-0 dark:group-hover:brightness-100' : ''
                }`} 
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPartnersCertifications;
