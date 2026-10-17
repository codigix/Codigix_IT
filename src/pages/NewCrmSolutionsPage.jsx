import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { getSectionSeo, getTabPath, getSectionHubPath, toCanonical } from '../utils/seo';
import '../components/new-crm-solutions/crm-solutions.css';

const NewCrmSolutionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seo = getSectionSeo('crm', location.pathname);
  const activeTab = seo.tab;
  const isDefaultOverview = Boolean(seo.overview);

  const handleTabChange = (name) => {
    navigate(getTabPath('crm', name));
  };

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
      "description": seo.description
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
          "item": toCanonical(getSectionHubPath('crm'))
        },
        ...(isDefaultOverview ? [] : [{
          "@type": "ListItem",
          "position": 3,
          "name": activeTab,
          "item": seo.canonical
        }])
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
        title={seo.title}
        exactTitle={true}
        description={seo.description}
        keywords={`${seo.keyword}, custom CRM development, CRM software, lead management CRM, sales CRM software, Codigix Infotech`}
        canonical={seo.canonical}
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
            <CrmHero activeTab={activeTab} seo={seo} />
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
