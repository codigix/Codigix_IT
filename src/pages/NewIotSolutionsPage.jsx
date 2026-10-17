import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IotSidebar from '../components/new-iot-solutions/IotSidebar';
import IotHero from '../components/new-iot-solutions/IotHero';
import IotWhyChooseUs from '../components/new-iot-solutions/IotWhyChooseUs';
import IotArchitecture from '../components/new-iot-solutions/IotArchitecture';
import IotCapabilitiesAndUseCases from '../components/new-iot-solutions/IotCapabilitiesAndUseCases';
import IotTechAndIntegrations from '../components/new-iot-solutions/IotTechAndIntegrations';
import IotBottomCta from '../components/new-iot-solutions/IotBottomCta';
import IotFaqSection, { iotFaqData } from '../components/new-iot-solutions/IotFaqSection';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
import { getSectionSeo, getTabPath, getSectionHubPath, toCanonical } from '../utils/seo';
import '../components/new-iot-solutions/iot-solutions.css';

const NewIotSolutionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seo = getSectionSeo('iot', location.pathname);
  const activeTab = seo.tab;
  const isDefaultOverview = Boolean(seo.overview);

  const handleTabChange = (name) => {
    navigate(getTabPath('iot', name));
  };

  // Structured JSON-LD Data for IoT Solutions
  const iotSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": `${activeTab} - Industrial IoT & Automation Engineering`,
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
          "name": "IoT Solutions",
          "item": toCanonical(getSectionHubPath('iot'))
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
      "mainEntity": iotFaqData.map(item => ({
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
        keywords={`${seo.keyword}, industrial IoT solutions, IIoT, machine monitoring, OEE software, predictive maintenance, Codigix Infotech`}
        canonical={seo.canonical}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={iotSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-rose-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="iot-layout-container mx-auto pt-32 lg:pt-36">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 lg:border-r border-slate-200 dark:border-gray-800/50 py-12">
            <IotHero activeTab={activeTab} seo={seo} />
            <IotWhyChooseUs activeTab={activeTab} />
            <IotArchitecture activeTab={activeTab} />
            <IotCapabilitiesAndUseCases activeTab={activeTab} />
            <IotTechAndIntegrations activeTab={activeTab} />
            <IotFaqSection />
            <IotBottomCta activeTab={activeTab} />
          </main>

          {/* Sticky Sidebar (Right Side) */}
          <aside aria-label="IoT Solutions Module Selector">
            <IotSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
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

export default NewIotSolutionsPage;
