import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AiSidebar from '../components/new-ai-solutions/AiSidebar';
import AiHero from '../components/new-ai-solutions/AiHero';
import AiValueProps from '../components/new-ai-solutions/AiValueProps';
import AiIndustries from '../components/new-ai-solutions/AiIndustries';
import AiTechnologies from '../components/new-ai-solutions/AiTechnologies';
import AiProcess from '../components/new-ai-solutions/AiProcess';
import AiWhyChooseUs from '../components/new-ai-solutions/AiWhyChooseUs';
import AiFaqSection, { aiFaqData } from '../components/new-ai-solutions/AiFaqSection';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
import { getSectionSeo, getTabPath, getSectionHubPath, toCanonical } from '../utils/seo';
import '../components/new-ai-solutions/ai-solutions.css';

const NewAiSolutionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seo = getSectionSeo('ai', location.pathname);
  const activeTab = seo.tab;
  const isDefaultOverview = Boolean(seo.overview);

  const handleTabChange = (tabName) => {
    navigate(getTabPath('ai', tabName));
  };

  // Structured JSON-LD Data for AI Solutions
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://codigixinfotech.com/ai-solutions#product",
    "name": "AI Solutions",
    "url": "https://codigixinfotech.com/ai-solutions",
    "description": "AI solutions by Codigix for business automation, intelligent applications, Generative AI, data-driven decision making and enterprise AI transformation.",
    "category": "AI Software Solutions",
    "brand": {
      "@type": "Brand",
      "name": "Codigix"
    },
    "manufacturer": {
      "@type": "Organization",
      "@id": "https://codigixinfotech.com/#organization",
      "name": "Codigix Infotech",
      "url": "https://codigixinfotech.com/"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Pune"
      },
      {
        "@type": "Place",
        "name": "PCMC"
      },
      {
        "@type": "Place",
        "name": "Chakan"
      },
      {
        "@type": "Place",
        "name": "Bhosari"
      },
      {
        "@type": "Place",
        "name": "Talegaon"
      },
      {
        "@type": "Place",
        "name": "Ranjangaon"
      },
      {
        "@type": "Place",
        "name": "Tathawade"
      },
      {
        "@type": "Place",
        "name": "Hadapsar"
      }
    ]
  };

  const aiSchemas = [
    productSchema,
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
          "name": "AI Solutions",
          "item": toCanonical(getSectionHubPath('ai'))
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
      "mainEntity": aiFaqData.map(item => ({
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
        keywords={`${seo.keyword}, AI solutions, AI development services, Generative AI, Codigix Infotech`}
        canonical={seo.canonical}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={aiSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="ai-layout-container mx-auto pt-32 lg:pt-36">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 lg:border-r border-slate-200 dark:border-gray-800/50 py-12">
            <AiHero activeTab={activeTab} seo={seo} />
            <AiValueProps activeTab={activeTab} />
            <AiIndustries activeTab={activeTab} />
            <AiTechnologies activeTab={activeTab} />
            <AiProcess activeTab={activeTab} />
            <AiWhyChooseUs activeTab={activeTab} />
            <AiFaqSection />
          </main>

          {/* Sticky Sidebar (Right Side) */}
          <aside aria-label="AI Solutions Module Selector">
            <AiSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
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

export default NewAiSolutionsPage;
