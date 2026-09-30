import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CrmSidebar from '../components/new-crm-solutions/CrmSidebar';
import CrmHero from '../components/new-crm-solutions/CrmHero';
import CrmModules from '../components/new-crm-solutions/CrmModules';
import CrmHowItWorksAndBenefits from '../components/new-crm-solutions/CrmHowItWorksAndBenefits';
import CrmIndustryTabs from '../components/new-crm-solutions/CrmIndustryTabs';
import CrmTechLogos from '../components/new-crm-solutions/CrmTechLogos';
import CrmBottomCta from '../components/new-crm-solutions/CrmBottomCta';
import CrmFaqSection, { crmFaqData } from '../components/new-crm-solutions/CrmFaqSection';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
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

  const isDefaultOverview = activeTab === 'Sales CRM';
  const pageTitle = isDefaultOverview
    ? "CRM Solutions Company in Pune | Custom CRM Software | Codigix"
    : `${activeTab} Solutions & Custom CRM Software | Codigix Infotech`;

  const metaDescription = isDefaultOverview
    ? "Codigix is a CRM solutions company in Pune offering custom CRM software for sales, leads, customer management and business automation. Get a consultation today."
    : `Codigix Infotech engineers custom CRM software solutions, including ${activeTab}, lead scoring automation, sales pipeline tracking, customer support ticketing, WhatsApp integration, and AI deal forecasting.`;

  const canonicalUrl = `https://codigixinfotech.com/crm-solutions${isDefaultOverview ? '' : `?tab=${encodeURIComponent(activeTab)}`}`;

  // Structured JSON-LD Data for CRM Solutions Page
  const crmSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": `${activeTab} - Custom CRM Software Development`,
      "provider": {
        "@type": "Organization",
        "name": "Codigix Infotech",
        "url": "https://codigixinfotech.com/"
      },
      "areaServed": "Global",
      "description": metaDescription
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://codigixinfotech.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "CRM Solutions",
          "item": "https://codigixinfotech.com/crm-solutions"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": activeTab,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": crmFaqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        exactTitle={isDefaultOverview}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={isDefaultOverview ? "CRM solutions company Pune, CRM software company Pune, custom CRM software Pune, CRM development company Pune, CRM software development Pune, CRM solutions Pune, custom CRM development Pune, sales CRM software Pune, customer management software Pune, business CRM software Pune" : `Custom CRM Software, ${activeTab}, lead management system, sales pipeline automation, customer support CRM, WhatsApp CRM integration, AI lead scoring, Codigix Infotech`}
        canonical={canonicalUrl}
        ogTitle={isDefaultOverview ? "CRM Solutions Company in Pune | Custom CRM Software | Codigix" : undefined}
        ogDescription={isDefaultOverview ? "Custom CRM software for lead management, sales, customer relationships and business automation. Talk to Codigix experts in Pune for a free consultation." : undefined}
        twitterDescription={isDefaultOverview ? "Build a custom CRM solution with Codigix for leads, sales, customer management and business automation. Get a free consultation today." : undefined}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={crmSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="crm-layout-container mx-auto pt-32 lg:pt-36">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-slate-200 dark:border-gray-800/50">
            <CrmHero activeTab={activeTab} />
            <CrmModules activeTab={activeTab} setActiveTab={handleTabChange} />
            <CrmHowItWorksAndBenefits activeTab={activeTab} />
            <CrmIndustryTabs activeTab={activeTab} setActiveTab={handleTabChange} />
            <CrmTechLogos activeTab={activeTab} />
            <CrmFaqSection />
            <CrmBottomCta activeTab={activeTab} />
          </main>

          {/* Sticky Sidebar (Right Side) */}
          <aside aria-label="CRM Modules Selector">
            <CrmSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          </aside>

        </div>

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewCrmSolutionsPage;
