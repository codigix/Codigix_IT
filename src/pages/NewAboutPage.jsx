import React from 'react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import AboutHero from '../components/new-about/AboutHero';
import AboutStats from '../components/new-about/AboutStats';
import AboutStory from '../components/new-about/AboutStory';
import AboutFutureRoadmap from '../components/new-about/AboutFutureRoadmap';
import AboutMissionVision from '../components/new-about/AboutMissionVision';
import AboutLeadership from '../components/new-about/AboutLeadership';
import AboutTechExpertise from '../components/new-about/AboutTechExpertise';
import AboutPartnersCertifications from '../components/new-about/AboutPartnersCertifications';
import AboutBottomCta from '../components/new-about/AboutBottomCta';
import '../components/new-about/about.css';

const NewAboutPage = () => {
  return (
    <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

      {/* Navigation */}
      <NewHomeNav />

      {/* Main Content Area */}
      <div className=" mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-slate-900 dark:text-white font-medium">About Us</span>
        </div>

        {/* Top Section: Hero & Stats */}
        <div className="mb-16">
          <AboutHero />
          <AboutStats />
        </div>

        {/* Full Width Sections */}
        <div className="space-y-12 md:space-y-20 mt-12">
          <AboutStory />
          <AboutFutureRoadmap />
          <AboutMissionVision />
          <AboutLeadership />
          <AboutTechExpertise />
          <AboutPartnersCertifications />
          <AboutBottomCta />
        </div>

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewAboutPage;
