import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import CaseStudiesSidebar from '../components/new-case-studies/CaseStudiesSidebar';
import CaseStudiesHero from '../components/new-case-studies/CaseStudiesHero';
import CaseStudiesGrid from '../components/new-case-studies/CaseStudiesGrid';
import CaseStudiesImpact from '../components/new-case-studies/CaseStudiesImpact';
import CaseStudiesTestimonials from '../components/new-case-studies/CaseStudiesTestimonials';
import CaseStudiesBottomCta from '../components/new-case-studies/CaseStudiesBottomCta';
import '../components/new-case-studies/case-studies.css';

const NewCaseStudiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeCategory, setActiveCategory] = useState(tabQuery || 'All');

  useEffect(() => {
    if (tabQuery) {
      setActiveCategory(tabQuery);
    }
  }, [tabQuery]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams({ tab: catId });
  };

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-purple-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Layout Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-12">
        
        {/* Breadcrumb (Full Width at Top) */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-purple-400 font-medium">Case Studies</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-white font-medium">{activeCategory}</span>
        </div>

        {/* 2-Column Main Layout: Left Side (Scrollable Content), Right Side (Sticky Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
           
           {/* Left Main Content Area */}
           <div className="flex-1 min-w-0 space-y-12">
             <CaseStudiesHero activeCategory={activeCategory} />
             <CaseStudiesGrid activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
             <CaseStudiesImpact activeCategory={activeCategory} />
             <CaseStudiesTestimonials activeCategory={activeCategory} />
             <CaseStudiesBottomCta activeCategory={activeCategory} />
           </div>

           {/* Right Sticky Sidebar */}
           <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30">
             <CaseStudiesSidebar activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
           </div>

        </div>

      </div>
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewCaseStudiesPage;
