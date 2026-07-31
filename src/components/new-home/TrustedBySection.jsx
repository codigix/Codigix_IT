import React from 'react';
import { motion } from 'framer-motion';
const IconManufacturing = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16M5 20V9l4-3v4l4-3v4l4-3v12M15 15v5M9 15v5" />
    <circle cx="15" cy="8" r="2" />
    <path d="M12 4V2M15 5V3M9 6V4" opacity="0.6" />
  </svg>
);

const IconHealthcare = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    <path d="M3 12h4l2 4l3-8l2 4h7" />
  </svg>
);

const IconAutomobile = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10l3-5h12l3 5v8h-2v2a2 2 0 0 1-4 0v-2H9v2a2 2 0 0 1-4 0v-2H3v-8z" />
    <path d="M4 10h16" />
    <circle cx="7.5" cy="14.5" r="1.5" />
    <circle cx="16.5" cy="14.5" r="1.5" />
    <path d="M10 14h4" opacity="0.5" />
  </svg>
);

const IconRetail = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h4l2 11h11l3-9H7" />
    <circle cx="9" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M10 14V8M14 14V7" opacity="0.6" />
  </svg>
);

const IconConstruction = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10L22 4" />
    <path d="M16 20H4a2 2 0 01-2-2V8l4-4h8l4 4v10a2 2 0 01-2 2z" />
    <path d="M8 20V12H4M16 20V12h-4" />
    <path d="M22 4l-4 4" />
    <path d="M20 6v6l-2 2" />
  </svg>
);

const IconEducation = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4l10 5l-10 5l-10 -5z" />
    <path d="M6 9v6a6 3 0 0 0 12 0v-6" />
    <path d="M22 9v7l-2 2" />
  </svg>
);

const IconEngineering = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    <path d="M15 15l4 4" />
  </svg>
);

const IconChemical = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v6L3 19a2 2 0 002 3h14a2 2 0 002-3l-7-11V2" />
    <path d="M8 2h8" />
    <path d="M6 14h12" />
    <circle cx="12" cy="18" r="1" opacity="0.6" />
    <circle cx="10" cy="16" r="0.5" opacity="0.6" />
  </svg>
);

const IconFood = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18h16" />
    <path d="M20 18a8 8 0 00-16 0" />
    <path d="M12 10V6M10 6h4" />
    <path d="M18 4h3v14h-3V4z" opacity="0.6" />
  </svg>
);

const IconLogistics = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V9l9-5l9 5v12" />
    <path d="M9 21v-8h6v8" />
    <path d="M9 13v4h6v-4H9z" />
    <path d="M12 17h.01" />
  </svg>
);

const industries = [
  { name: 'Manufacturing', icon: IconManufacturing },
  { name: 'Healthcare', icon: IconHealthcare },
  { name: 'Automobile', icon: IconAutomobile },
  { name: 'Retail', icon: IconRetail },
  { name: 'Construction', icon: IconConstruction },
  { name: 'Education', icon: IconEducation },
  { name: 'Engineering', icon: IconEngineering },
  { name: 'Chemical', icon: IconChemical },
  { name: 'Food & Beverages', icon: IconFood },
  { name: 'Logistics', icon: IconLogistics },
];

const TrustedBySection = () => {
  return (
    <section className="py-12 border-t border-gray-800/50 bg-[#070320] relative">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="trust-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
            <stop offset="50%" stopColor="#d946ef" /> {/* Fuchsia 500 */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue 500 */}
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[11px] font-bold tracking-widest text-gray-300 uppercase mb-12">
          Trusted by Industries Worldwide
        </h3>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 lg:justify-between items-center opacity-85 hover:opacity-100 transition-opacity duration-500">
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-3.5 group cursor-pointer"
            >
              <div className="relative">
                {/* Background soft glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-blue-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-125" />
                <industry.icon
                  className="w-14 h-14 relative z-10 transition-all duration-300 group-hover:-translate-y-1.5 filter group-hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                  style={{ stroke: 'url(#trust-gradient)' }}
                  strokeWidth={1.3}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-400 group-hover:text-white font-bold transition-colors tracking-wider uppercase">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
