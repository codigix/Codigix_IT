import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OtherServicesSidebar from '../components/new-other-services/OtherServicesSidebar';
import OtherServicesHero from '../components/new-other-services/OtherServicesHero';
import OtherServicesList from '../components/new-other-services/OtherServicesList';
import OtherServicesBottomCta from '../components/new-other-services/OtherServicesBottomCta';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import '../components/new-other-services/other-services.css';

const NewOtherServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('web-development');

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      const idMap = {
        'Web Development': 'web-development',
        'Mobile Apps': 'mobile-apps',
        'UI/UX Design': 'ui-ux-design',
        'Cloud Solutions': 'cloud-solutions',
        'DevOps': 'devops'
      };
      const sectionId = idMap[tabFromUrl];
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['web-development', 'mobile-apps', 'ui-ux-design', 'cloud-solutions', 'devops'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.pageYOffset;
          const absoluteBottom = bottom + window.pageYOffset;
          
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Layout Container */}
      <div className="services-layout-container max-w-[1600px] mx-auto">
        
        {/* Main Content Area (Left Side) */}
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-gray-800/50">
          <OtherServicesHero />
          <OtherServicesList />
          <OtherServicesBottomCta />
        </div>
        
        {/* Sticky Sidebar (Right Side) */}
        <OtherServicesSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
      </div>
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 mt-12 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewOtherServicesPage;
