import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import CaseStudiesSidebar from '../components/new-case-studies/CaseStudiesSidebar';
import CaseStudiesHero from '../components/new-case-studies/CaseStudiesHero';
import CaseStudiesGrid from '../components/new-case-studies/CaseStudiesGrid';
import CaseStudiesImpact from '../components/new-case-studies/CaseStudiesImpact';
import CaseStudiesTestimonials from '../components/new-case-studies/CaseStudiesTestimonials';
import CaseStudiesBottomCta from '../components/new-case-studies/CaseStudiesBottomCta';
import CaseStudiesFaq, { caseStudyFaqs } from '../components/new-case-studies/CaseStudiesFaq';
import { caseStudiesData } from '../data/caseStudiesData';
import config from '../config';
import '../components/new-case-studies/case-studies.css';

const NewCaseStudiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeCategory, setActiveCategory] = useState(tabQuery || 'All');

  useEffect(() => {
    if (tabQuery) {
      setActiveCategory(tabQuery);
    }
  }, [tabQuery]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams({ tab: catId });
  };

  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/case-studies${activeCategory !== 'All' ? `?tab=${activeCategory}` : ''}`;
  
  const pageTitle = activeCategory === 'All'
    ? "Client Case Studies & Engineering Success Stories | Codigix Infotech"
    : `${activeCategory} Case Studies & Client Success Stories | Codigix Infotech`;

  const metaDescription = `Explore real-world case studies from Codigix Infotech showcasing enterprise AI solutions, Industrial IoT automation, custom ERP systems, and CRM implementations with proven ROI.`;

  // JSON-LD Structured Data Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/images/logos/logo.webp`
    },
    "hasPart": caseStudiesData.map(study => ({
      "@type": "CreativeWork",
      "name": study.title,
      "headline": `${study.title} for ${study.clientName}`,
      "description": study.subtitle,
      "url": `${siteUrl}/case-studies/${study.id}`,
      "about": study.catName,
      "provider": {
        "@type": "Organization",
        "name": "Codigix Infotech"
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": `${siteUrl}/case-studies`
      },
      ...(activeCategory !== 'All' ? [{
        "@type": "ListItem",
        "position": 3,
        "name": activeCategory,
        "item": canonicalUrl
      }] : [])
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": caseStudyFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codigix Infotech",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/images/logos/logo.webp`,
    "sameAs": [
      "https://www.linkedin.com/company/135144609/admin/",
      "https://www.facebook.com/codigix.infotech",
      "https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==",
      "https://x.com/CodigixI2994",
      "https://www.youtube.com/@codigixinfotech"
    ]
  };

  return (
    <>
      <SEO
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={`IT case studies, AI solutions case studies, Industrial IoT success stories, enterprise ERP case studies, CRM implementation results, custom software engineering, Codigix Infotech, ${activeCategory} case studies`}
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/service/erp_dash.webp`}
        schemaData={[collectionSchema, breadcrumbSchema, faqSchema, organizationSchema]}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <main className="mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

          {/* Breadcrumb (Full Width at Top) */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <span className="mx-1 text-gray-600">›</span>
            <Link to="/case-studies" className="text-purple-650 dark:text-purple-400 font-medium">Case Studies</Link>
            <span className="mx-1 text-gray-600">›</span>
            <span className="text-slate-900 dark:text-white font-medium">{activeCategory}</span>
          </nav>

          {/* 2-Column Main Layout: Left Side (Scrollable Content), Right Side (Sticky Sidebar) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">

            {/* Left Main Content Area */}
            <div className="flex-1 min-w-0 space-y-12">
              <CaseStudiesHero activeCategory={activeCategory} />
              <CaseStudiesGrid activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
              <CaseStudiesImpact activeCategory={activeCategory} />
              <CaseStudiesTestimonials activeCategory={activeCategory} />
              <CaseStudiesBottomCta activeCategory={activeCategory} />
              <CaseStudiesFaq />
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30" aria-label="Case Study Filters & Topics">
              <CaseStudiesSidebar activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
            </aside>

          </div>

        </main>

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewCaseStudiesPage;
