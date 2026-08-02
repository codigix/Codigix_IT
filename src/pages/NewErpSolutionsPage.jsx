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
import ErpFaqSection, { erpFaqData } from '../components/new-erp-solutions/ErpFaqSection';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
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

  const isDefaultOverview = activeTab === 'Manufacturing ERP';
  const pageTitle = isDefaultOverview
    ? "Custom ERP Software Development & Enterprise ERP Systems | Codigix Infotech"
    : `${activeTab} Solutions & Custom ERP Systems | Codigix Infotech`;

  const metaDescription = `Codigix Infotech engineers custom Enterprise Resource Planning (ERP) software, including ${activeTab}, Bill of Materials (BOM) automation, production planning, inventory tracking, financial accounting, and HR management.`;

  const canonicalUrl = `https://codigixinfotech.com/erp-solutions${isDefaultOverview ? '' : `?tab=${encodeURIComponent(activeTab)}`}`;

  // Structured JSON-LD Data for ERP Solutions Page
  const erpSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": `${activeTab} - Custom ERP Software Development`,
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
          "name": "ERP Solutions",
          "item": "https://codigixinfotech.com/erp-solutions"
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
      "mainEntity": erpFaqData.map(item => ({
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
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={`Custom ERP Software, ${activeTab}, ERP system development, inventory management ERP, production planning software, enterprise ERP, manufacturing ERP, cloud ERP, Codigix Infotech`}
        canonical={canonicalUrl}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.png"
        schemaData={erpSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="erp-layout-container mx-auto pt-20 lg:pt-20">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-slate-200 dark:border-gray-800/50">
            <ErpHero activeTab={activeTab} />
            <ErpModules activeTab={activeTab} setActiveTab={handleTabChange} />
            <ErpIntegrationsBanner activeTab={activeTab} />
            <ErpHowItWorksAndBenefits activeTab={activeTab} />
            <ErpIndustryTabs activeTab={activeTab} setActiveTab={handleTabChange} />
            <ErpTechLogos activeTab={activeTab} />
            <ErpFaqSection />
            <ErpBottomCta activeTab={activeTab} />
          </main>

          {/* Sticky Sidebar (Right Side) */}
          <aside aria-label="ERP Modules Selector">
            <ErpSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
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

export default NewErpSolutionsPage;
