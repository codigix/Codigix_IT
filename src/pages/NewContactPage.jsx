import React from 'react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import ContactHero from '../components/new-contact/ContactHero';
import ContactFormSection from '../components/new-contact/ContactFormSection';
import ContactMap from '../components/new-contact/ContactMap';
import ContactFaq from '../components/new-contact/ContactFaq';
import ContactBottomCta from '../components/new-contact/ContactBottomCta';
import '../components/new-contact/contact.css';

const NewContactPage = () => {
  return (
    <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

      {/* Navigation */}
      <NewHomeNav />

      {/* Main Content Area */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-12 pt-28 lg:pt-32 pb-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-purple-600 dark:hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1 text-slate-400 dark:text-gray-600">›</span>
          <span className="text-slate-900 dark:text-gray-300 font-bold">Contact Us</span>
        </div>

        {/* Top Section: Hero */}
        <div className="mb-8">
          <ContactHero />
        </div>

        <div className="space-y-6 md:space-y-10">
          <ContactFormSection />
          <ContactMap />
          <ContactFaq />
          <ContactBottomCta />
        </div>

      </div>

      {/* Footer */}
      <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 bg-slate-50/50 dark:bg-black/20">
        <CtaFooterSection />
      </div>

    </div>
  );
};

export default NewContactPage;
