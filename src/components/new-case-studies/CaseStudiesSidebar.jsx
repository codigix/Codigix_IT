import React from 'react';
import { Layers, Building2, Users, Cpu, Code2, Smartphone, Cloud, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const categories = [
  { id: 'All', name: 'All Case Studies', icon: Layers },
  { id: 'ERP', name: 'ERP Solutions', icon: Building2 },
  { id: 'CRM', name: 'CRM Solutions', icon: Users },
  { id: 'IoT', name: 'IoT Solutions', icon: Cpu },
  { id: 'AI', name: 'AI Solutions', icon: Cpu },
  { id: 'Web', name: 'Web Development', icon: Code2 },
  { id: 'Mobile', name: 'Mobile Apps', icon: Smartphone },
  { id: 'Cloud', name: 'Cloud Solutions', icon: Cloud },
];

const CaseStudiesSidebar = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const handleSelect = (catId) => {
    setActiveCategory(catId);
    const element = document.getElementById('case-studies-grid');
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Categories Box */}
      <div className="bg-white dark:bg-[#0a0624]/60 border border-slate-200 dark:border-gray-800/80 rounded-2xl p-4 mb-6 shadow-sm dark:shadow-xl">
        <h3 className="text-[11px] font-bold text-slate-400 dark:text-gray-550 uppercase tracking-widest mb-4 px-2">Case Study Categories</h3>
        <div className="flex flex-col">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div 
                key={cat.id} 
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group mb-1 ${
                  isActive 
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md shadow-purple-500/10' 
                    : 'text-slate-655 dark:text-gray-400 hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'bg-slate-200/50 dark:bg-white/5 text-slate-400 dark:text-gray-550 group-hover:text-slate-600 dark:group-hover:text-gray-300'
                }`}>
                  <cat.icon size={15} />
                </div>
                <div>
                  <h4 className={`text-[11px] font-medium leading-none transition-colors ${
                    isActive ? 'font-semibold text-white' : 'text-slate-700 dark:text-gray-300'
                  }`}>{cat.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Box */}
      <div className="bg-white dark:bg-[#0a0624]/60 border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col gap-3">
        <h4 className="text-slate-900 dark:text-white font-bold text-sm">Have a similar challenge?</h4>
        <p className="text-slate-550 dark:text-gray-400 text-[12px] leading-relaxed">
          Let's build a solution that works for your business.
        </p>
        <button 
          onClick={() => navigate('/contact')}
          className="self-start mt-2 px-4 py-2 bg-purple-50 dark:bg-transparent border border-purple-200 dark:border-purple-500/30 hover:border-purple-500 hover:bg-purple-600 hover:text-white text-purple-750 dark:text-purple-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
        >
          Contact Us <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default CaseStudiesSidebar;
