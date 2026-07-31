import React from 'react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import ContactHero from '../components/new-contact/ContactHero';
import ContactFormSection from '../components/new-contact/ContactFormSection';
import ContactMap from '../components/new-contact/ContactMap';
import ContactGlobalPresence from '../components/new-contact/ContactGlobalPresence';
import ContactFaq from '../components/new-contact/ContactFaq';
import ContactBottomCta from '../components/new-contact/ContactBottomCta';
import '../components/new-contact/contact.css';

const NewContactPage = () => {
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
          <span className="text-gray-300 font-medium">Contact Us</span>
        </div>

        {/* Top Section: Hero */}
        <div className="mb-8">
           <ContactHero />
        </div>

        {/* Full Width Sections */}
        <div className="space-y-4 md:space-y-8">
           <ContactFormSection />
           <ContactMap />
           <ContactGlobalPresence />
           <ContactFaq />
           <ContactBottomCta />
        </div>

      </div>
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewContactPage;
