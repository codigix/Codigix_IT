import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CrmSidebar from '../components/new-crm-solutions/CrmSidebar';
import CrmHero from '../components/new-crm-solutions/CrmHero';
import CrmModules from '../components/new-crm-solutions/CrmModules';
import CrmHowItWorksAndBenefits from '../components/new-crm-solutions/CrmHowItWorksAndBenefits';
import CrmIndustryTabs from '../components/new-crm-solutions/CrmIndustryTabs';
import CrmTechLogos from '../components/new-crm-solutions/CrmTechLogos';
import CrmBottomCta from '../components/new-crm-solutions/CrmBottomCta';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import '../components/new-crm-solutions/crm-solutions.css';

const NewCrmSolutionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'Sales CRM');

  useEffect(() => {
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Layout Container */}
      <div className="crm-layout-container max-w-[1600px] mx-auto">
        
        {/* Main Content Area (Left Side) */}
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-gray-800/50">
          <CrmHero activeTab={activeTab} />
          <CrmModules activeTab={activeTab} setActiveTab={handleTabChange} />
          <CrmHowItWorksAndBenefits activeTab={activeTab} />
          <CrmIndustryTabs activeTab={activeTab} />
          <CrmTechLogos activeTab={activeTab} />
          <CrmBottomCta activeTab={activeTab} />
        </div>
        
        {/* Sticky Sidebar (Right Side) */}
        <CrmSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        
      </div>
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 mt-12 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewCrmSolutionsPage;
