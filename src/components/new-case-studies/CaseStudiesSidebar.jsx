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
      <div className="bg-[#050112] border border-gray-800/80 rounded-2xl py-6 px-4 mb-6 shadow-xl">
        <h3 className="text-[12px] font-bold text-white uppercase tracking-widest mb-6 px-2">Case Study Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div 
                key={cat.id} 
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                  isActive 
                    ? 'bg-[#150a30] border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                    : 'border-transparent hover:bg-gray-800/30'
                }`}
              >
                <div className={`flex items-center justify-center ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                  <cat.icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                <span className={`text-[13px] font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Box */}
      <div className="bg-transparent border border-gray-800/80 rounded-2xl p-6 shadow-xl">
        <h4 className="text-white font-bold text-[14px] mb-2">Have a similar challenge?</h4>
        <p className="text-gray-400 text-[12px] leading-relaxed mb-6">
          Let's build a solution that works for your business.
        </p>
        <button 
          onClick={() => navigate('/new-contact')}
          className="px-5 py-2.5 bg-transparent border border-purple-500/40 hover:border-purple-500 hover:bg-purple-500/10 text-purple-300 text-[12px] font-medium rounded-lg transition-all flex items-center gap-2"
        >
          Contact Us <ArrowRight size={14} />
        </button>
      </div>
      
    </div>
  );
};

export default CaseStudiesSidebar;
