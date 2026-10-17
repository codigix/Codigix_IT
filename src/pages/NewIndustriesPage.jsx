import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import IndustriesSidebar from '../components/new-industries/IndustriesSidebar';
import IndustriesHero from '../components/new-industries/IndustriesHero';
import IndustriesGrid from '../components/new-industries/IndustriesGrid';
import IndustryHighlight from '../components/new-industries/IndustryHighlight';
import IndustriesApproach from '../components/new-industries/IndustriesApproach';
import IndustriesLogos from '../components/new-industries/IndustriesLogos';
import IndustriesBottomCta from '../components/new-industries/IndustriesBottomCta';
import IndustriesFaqSection, { industriesFaqData } from '../components/new-industries/IndustriesFaqSection';
import CaseStudiesTestimonials from '../components/new-case-studies/CaseStudiesTestimonials';
import SEO from '../components/SEO';
import { getSectionSeo, getTabPath, getSectionHubPath, toCanonical } from '../utils/seo';
import '../components/new-industries/industries.css';

const NewIndustriesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seo = getSectionSeo('industries', location.pathname);
  const activeIndustry = seo.tab;
  const isDefaultOverview = Boolean(seo.overview);

  const handleIndustryChange = (name) => {
    navigate(getTabPath('industries', name));
  };

  // Structured JSON-LD Data for Industries Page
  const industriesSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": `${activeIndustry} Software & Digital Transformation Solutions`,
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
          "name": "Industries",
          "item": toCanonical(getSectionHubPath('industries'))
        },
        ...(isDefaultOverview ? [] : [{
          "@type": "ListItem",
          "position": 3,
          "name": activeIndustry,
          "item": seo.canonical
        }])
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": industriesFaqData.map(item => ({
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
        keywords={`${seo.keyword}, industry-specific software solutions, manufacturing software, healthcare software, retail software, Codigix Infotech`}
        canonical={seo.canonical}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={industriesSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <span className="mx-1">›</span>
              </li>
              <li>
                <Link to={getSectionHubPath('industries')} className="text-purple-600 dark:text-purple-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">Industries</Link>
              </li>
              <li>
                <span className="mx-1">›</span>
              </li>
              <li className="text-slate-900 dark:text-white font-medium" aria-current="page">
                {activeIndustry}
              </li>
            </ol>
          </nav>

          {/* 2-Column Main Layout: Left Side (Scrollable Content), Right Side (Sticky Sidebar) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">

            {/* Left Main Content */}
            <main id="main-content" className="flex-1 min-w-0 space-y-12">
              <IndustriesHero activeIndustry={activeIndustry} seo={seo} />
              <IndustriesGrid activeIndustry={activeIndustry} setActiveIndustry={handleIndustryChange} />
              <IndustryHighlight activeIndustry={activeIndustry} />
              <IndustriesApproach activeIndustry={activeIndustry} />
              <IndustriesLogos activeIndustry={activeIndustry} />
              <CaseStudiesTestimonials />
              <IndustriesFaqSection />
              <IndustriesBottomCta activeIndustry={activeIndustry} />
            </main>

            {/* Right Sticky Sidebar */}
            <aside aria-label="Industries Selector" className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30">
              <IndustriesSidebar activeIndustry={activeIndustry} setActiveIndustry={handleIndustryChange} />
            </aside>

          </div>

        </div>

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewIndustriesPage;
