import React from 'react';
import { Factory, HeartPulse, ShoppingCart, Landmark, Home, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const industryCards = [
  {
    id: 'Manufacturing',
    title: 'Manufacturing',
    desc: 'Smart ERP, IoT, and automation solutions to optimize production, supply chain, and operations.',
    icon: Factory,
    image: '/assets/images/service/erp_dash.webp'
  },
  {
    id: 'Healthcare',
    title: 'Healthcare',
    desc: 'End-to-end hospital & clinic management systems to improve patient care and efficiency.',
    icon: HeartPulse,
    image: '/assets/images/service/ai_brain.webp'
  },
  {
    id: 'Retail',
    title: 'Retail',
    desc: 'POS, inventory, CRM, and analytics solutions to enhance customer experience and drive sales.',
    icon: ShoppingCart,
    image: '/assets/images/service/ecommerce_dashboard.webp'
  },
  {
    id: 'Finance',
    title: 'Finance',
    desc: 'Secure, compliant, and intelligent software for financial management, banking, and accounting.',
    icon: Landmark,
    image: '/assets/images/service/crm_dash.webp'
  },
  {
    id: 'Real Estate',
    title: 'Real Estate',
    desc: 'Property management, CRM, and project tracking solutions to streamline real estate operations.',
    icon: Home,
    image: '/assets/images/service/custom_soft.webp'
  }
];

const IndustriesGrid = ({ activeIndustry = 'Manufacturing', setActiveIndustry }) => {
  return (
    <div className="py-12 text-left">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Industries We Serve</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industryCards.map((card, idx) => {
          const isSelected = activeIndustry === card.id || 
            (card.id === 'Retail' && activeIndustry.includes('Retail')) ||
            (card.id === 'Finance' && activeIndustry.includes('Finance'));

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                if (setActiveIndustry) {
                  setActiveIndustry(card.id);
                }
                const element = document.getElementById('industry-highlight');
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`group relative h-[360px] bg-white dark:bg-[#050112] border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col shadow-sm dark:shadow-none ${
                isSelected 
                  ? 'border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20' 
                  : 'border-slate-200 dark:border-gray-800/60 hover:border-purple-500/50'
              }`}
            >
              {/* Spotlight background hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Selection Badge / Beacon */}
              <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
                {isSelected ? (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-purple-600 text-white rounded-full flex items-center gap-1 shadow-xs">
                    <Check size={10} /> Active
                  </span>
                ) : (
                  <span className="nh-led-active bg-purple-500/60 group-hover:bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
                )}
              </div>

              {/* Image Area */}
              <div className="h-[45%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050112] to-transparent z-10"></div>
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${
                    isSelected ? 'opacity-100 mix-blend-normal' : 'opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100'
                  }`}
                />
              </div>
              
              {/* Content Area */}
              <div className="flex-1 p-5 flex flex-col z-20 relative -mt-4 bg-white dark:bg-[#050112]">
                <div className="flex items-center gap-2 mb-3">
                  <card.icon size={16} className={isSelected ? "text-purple-600 dark:text-purple-400 font-bold" : "text-purple-600 dark:text-purple-400 group-hover:text-purple-500"} />
                  <h3 className={`text-[13px] font-bold transition-colors ${isSelected ? 'text-purple-600 dark:text-purple-300' : 'text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200'}`}>
                    {card.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-[11px] font-medium mt-4 group-hover:text-purple-500">
                  {isSelected ? 'Viewing Solution' : 'Explore Solutions'} <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustriesGrid;
