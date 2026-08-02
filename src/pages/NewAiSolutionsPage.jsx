import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AiSidebar from '../components/new-ai-solutions/AiSidebar';
import AiHero from '../components/new-ai-solutions/AiHero';
import AiValueProps from '../components/new-ai-solutions/AiValueProps';
import AiIndustries from '../components/new-ai-solutions/AiIndustries';
import AiTechnologies from '../components/new-ai-solutions/AiTechnologies';
import AiProcess from '../components/new-ai-solutions/AiProcess';
import AiWhyChooseUs from '../components/new-ai-solutions/AiWhyChooseUs';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import '../components/new-ai-solutions/ai-solutions.css';

const NewAiSolutionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'AI Overview');

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
      <div className="ai-layout-container  mx-auto pt-20 lg:pt-20">

        {/* Main Content Area (Left Side) */}
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 lg:border-r border-slate-200 dark:border-gray-800/50 py-12">
          <>
            <AiHero activeTab={activeTab} />
            <AiValueProps activeTab={activeTab} />
            <AiIndustries activeTab={activeTab} />
            <AiTechnologies activeTab={activeTab} />
            <AiProcess activeTab={activeTab} />
            <AiWhyChooseUs activeTab={activeTab} />
          </>
        </div>

        {/* Sticky Sidebar (Right Side) */}
        <AiSidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewAiSolutionsPage;
