import React from 'react';
import { Factory, HeartPulse, ShoppingCart, Landmark, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const industriesList = [
  { name: 'Manufacturing', icon: Factory },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Retail', icon: ShoppingCart },
  { name: 'Finance', icon: Landmark },
  { name: 'Real Estate', icon: Home },
];

const IndustriesSidebar = ({ activeIndustry, setActiveIndustry }) => {
  const navigate = useNavigate();

  const handleSelect = (name) => {
    setActiveIndustry(name);
    const element = document.getElementById('industry-highlight');
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#050112] border border-gray-800/80 rounded-xl p-4 mb-6 shadow-xl">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-widest mb-4 px-2">Industries</h3>
        <div className="flex flex-col">
          {industriesList.map((item, index) => {
            const isActive = activeIndustry === item.name;
            return (
              <div 
                key={index} 
                className={`industries-sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(item.name)}
              >
                <div className={`industries-sidebar-icon-wrap ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                  <item.icon size={16} />
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{item.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-transparent border border-gray-800/80 rounded-xl p-6 shadow-xl flex flex-col gap-3">
        <h4 className="text-white font-bold text-sm">Can't find your industry?</h4>
        <p className="text-gray-400 text-[12px] leading-relaxed">
          We deliver digital solutions customized for your business needs.
        </p>
        <button 
          onClick={() => navigate('/new-contact')}
          className="self-start mt-2 px-4 py-2 bg-transparent border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 text-purple-300 text-xs font-medium rounded-lg transition-all flex items-center gap-2"
        >
          Contact Us <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default IndustriesSidebar;
