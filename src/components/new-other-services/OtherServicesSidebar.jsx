import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, PenTool, Cloud, Infinity } from 'lucide-react';
import './other-services.css';

const sidebarItems = [
  { name: 'Web Development', id: 'web-development', icon: Monitor },
  { name: 'Mobile Apps', id: 'mobile-apps', icon: Smartphone },
  { name: 'UI/UX Design', id: 'ui-ux-design', icon: PenTool },
  { name: 'Cloud Solutions', id: 'cloud-solutions', icon: Cloud },
  { name: 'DevOps', id: 'devops', icon: Infinity },
];

const OtherServicesSidebar = ({ activeSection, setActiveSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="services-sidebar hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar pt-24 pb-12 self-start">
      <div className="px-6 mb-6">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-widest">Other Services</h3>
      </div>
      
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`services-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            <div className="services-sidebar-icon-wrap flex justify-center">
              <item.icon size={16} className={activeSection === item.id ? "text-indigo-400" : "text-gray-400"} />
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-300">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServicesSidebar;
