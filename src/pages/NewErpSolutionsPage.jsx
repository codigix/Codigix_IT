import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErpSidebar from '../components/new-erp-solutions/ErpSidebar';
import ErpHero from '../components/new-erp-solutions/ErpHero';
import ErpModules from '../components/new-erp-solutions/ErpModules';
import ErpIntegrationsBanner from '../components/new-erp-solutions/ErpIntegrationsBanner';
import ErpHowItWorksAndBenefits from '../components/new-erp-solutions/ErpHowItWorksAndBenefits';
import ErpIndustryTabs from '../components/new-erp-solutions/ErpIndustryTabs';
import ErpTechLogos from '../components/new-erp-solutions/ErpTechLogos';
import ErpBottomCta from '../components/new-erp-solutions/ErpBottomCta';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import '../components/new-erp-solutions/erp-solutions.css';

const NewErpSolutionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'Manufacturing ERP');

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
    <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

      {/* Navigation */}
      <NewHomeNav />

      {/* Main Layout Container */}
      <div className="erp-layout-container  mx-auto pt-20 lg:pt-20">

        {/* Main Content Area (Left Side) */}
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-slate-200 dark:border-gray-800/50">
          <ErpHero activeTab={activeTab} />
          <ErpModules activeTab={activeTab} setActiveTab={handleTabChange} />
          <ErpIntegrationsBanner activeTab={activeTab} />
          <ErpHowItWorksAndBenefits activeTab={activeTab} />
          <ErpIndustryTabs activeTab={activeTab} setActiveTab={handleTabChange} />
          <ErpTechLogos activeTab={activeTab} />
          <ErpBottomCta activeTab={activeTab} />
        </div>

        {/* Sticky Sidebar (Right Side) */}
        <ErpSidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewErpSolutionsPage;
