import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import '../components/new-ai-solutions/ai-solutions.css';

const NewAiSolutionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'AI Overview');

  useEffect(() => {
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  const isDefaultOverview = activeTab === 'AI Overview';
  const pageTitle = isDefaultOverview
    ? "AI Development Services & Machine Learning Solutions | Codigix Infotech"
    : `${activeTab} Services & Engineering Solutions | Codigix Infotech`;

  const metaDescription = `Codigix Infotech provides enterprise AI development services, including ${activeTab}, custom LLM integration, Generative AI agents, computer vision, voice AI, and predictive analytics.`;

  const canonicalUrl = `https://codigixinfotech.com/ai-solutions${isDefaultOverview ? '' : `?tab=${encodeURIComponent(activeTab)}`}`;

  // Structured JSON-LD Data for AI Solutions
  const aiSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": `${activeTab} - Enterprise AI Engineering`,
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
          "name": "AI Solutions",
          "item": "https://codigixinfotech.com/ai-solutions"
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
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={`AI solutions, ${activeTab}, Generative AI, custom LLM integration, AI chatbots, computer vision engineering, voice AI agents, predictive analytics, Codigix Infotech`}
        canonical={canonicalUrl}
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
            <AiHero activeTab={activeTab} />
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
