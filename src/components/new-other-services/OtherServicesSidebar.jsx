import React from 'react';
import { Monitor, Smartphone, PenTool, Cloud, Infinity as DevOpsIcon, CreditCard } from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const servicesItems = [
  { id: 'web-development', name: 'Web Development', subtitle: 'Modern, fast & responsive web apps', icon: Monitor },
  { id: 'mobile-apps', name: 'Mobile Apps', subtitle: 'Native & cross-platform mobile apps', icon: Smartphone },
  { id: 'ui-ux-design', name: 'UI/UX Design', subtitle: 'Intuitive user interface & experience', icon: PenTool },
  { id: 'cloud-solutions', name: 'Cloud Solutions', subtitle: 'AWS, Azure & cloud architecture', icon: Cloud },
  { id: 'devops', name: 'DevOps Services', subtitle: 'CI/CD pipelines & infrastructure', icon: DevOpsIcon },
  { id: 'pricing', name: 'Pricing Plans', subtitle: 'Flexible engagement models', icon: CreditCard },
];

const OtherServicesSidebar = ({ activeSection, setActiveSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    } else {
      setActiveSection(id);
    }
  };

  return (
    <SolutionSidebar
      title="Digital Services"
      searchPlaceholder="Search services..."
      items={servicesItems}
      activeTab={activeSection}
      setActiveTab={scrollToSection}
      ctaTitle="Looking for Custom Software?"
      ctaText="We build full-stack web, mobile & cloud platforms tailored for your business growth."
      ctaButtonText="Get Free Proposal"
    />
  );
};

export default OtherServicesSidebar;
