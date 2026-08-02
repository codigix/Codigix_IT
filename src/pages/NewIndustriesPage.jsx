import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import IndustriesSidebar from '../components/new-industries/IndustriesSidebar';
import IndustriesHero from '../components/new-industries/IndustriesHero';
import IndustriesGrid from '../components/new-industries/IndustriesGrid';
import IndustryHighlight from '../components/new-industries/IndustryHighlight';
import IndustriesApproach from '../components/new-industries/IndustriesApproach';
import IndustriesLogos from '../components/new-industries/IndustriesLogos';
import IndustriesBottomCta from '../components/new-industries/IndustriesBottomCta';
import '../components/new-industries/industries.css';

const NewIndustriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeIndustry, setActiveIndustry] = useState(tabQuery || 'Manufacturing');

  useEffect(() => {
    if (tabQuery) {
      setActiveIndustry(tabQuery);
    }
  }, [tabQuery]);

  const handleIndustryChange = (name) => {
    setActiveIndustry(name);
    setSearchParams({ tab: name });
  };

  return (
    <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

      {/* Navigation */}
      <NewHomeNav />

      {/* Main Layout Container */}
      <div className=" mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1">›</span>
          <span className="text-purple-600 dark:text-purple-400 font-medium">Industries</span>
          <span className="mx-1">›</span>
          <span className="text-slate-900 dark:text-white font-medium">{activeIndustry}</span>
        </div>

        {/* 2-Column Main Layout: Left Side (Scrollable Content), Right Side (Sticky Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">

          {/* Left Main Content */}
          <div className="flex-1 min-w-0 space-y-12">
            <IndustriesHero activeIndustry={activeIndustry} />
            <IndustriesGrid setActiveIndustry={handleIndustryChange} />
            <IndustryHighlight activeIndustry={activeIndustry} />
            <IndustriesApproach activeIndustry={activeIndustry} />
            <IndustriesLogos activeIndustry={activeIndustry} />
            <IndustriesBottomCta activeIndustry={activeIndustry} />
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30">
            <IndustriesSidebar activeIndustry={activeIndustry} setActiveIndustry={handleIndustryChange} />
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewIndustriesPage;
