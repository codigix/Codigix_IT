import React from 'react';
import { Factory, HeartPulse, ShoppingCart, Landmark, Home } from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const industriesList = [
  { id: 'Manufacturing', name: 'Manufacturing', subtitle: 'Smart factory, IIoT & ERP solutions', icon: Factory },
  { id: 'Healthcare', name: 'Healthcare', subtitle: 'Telemedicine, EHR & hospital ERP', icon: HeartPulse },
  { id: 'Retail', name: 'Retail & E-commerce', subtitle: 'Omnichannel retail CRM & POS', icon: ShoppingCart },
  { id: 'Finance', name: 'Finance & Banking', subtitle: 'Fintech portals & automated reporting', icon: Landmark },
  { id: 'Real Estate', name: 'Real Estate', subtitle: 'Property management & lead CRM', icon: Home },
];

const IndustriesSidebar = ({ activeIndustry, setActiveIndustry }) => {
  const handleSelect = (name) => {
    setActiveIndustry(name);
    const element = document.getElementById('industry-highlight');
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <SolutionSidebar
      title="Industries Served"
      searchPlaceholder="Search industries..."
      items={industriesList}
      activeTab={activeIndustry}
      setActiveTab={handleSelect}
      ctaTitle="Can't Find Your Industry?"
      ctaText="We build custom digital software tailored for specialized enterprise requirements."
      ctaButtonText="Talk to Experts"
    />
  );
};

export default IndustriesSidebar;
