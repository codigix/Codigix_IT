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
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-purple-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-gray-300 font-medium">About Us</span>
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
      <div className="pt-24 border-t border-gray-800/30 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewAboutPage;
