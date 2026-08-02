import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import AboutHero from '../components/new-about/AboutHero';
import AboutStats from '../components/new-about/AboutStats';
import AboutStory from '../components/new-about/AboutStory';
import AboutFutureRoadmap from '../components/new-about/AboutFutureRoadmap';
import AboutMissionVision from '../components/new-about/AboutMissionVision';
import AboutLeadership from '../components/new-about/AboutLeadership';
import AboutTechExpertise from '../components/new-about/AboutTechExpertise';
import AboutPartnersCertifications from '../components/new-about/AboutPartnersCertifications';
import AboutBottomCta from '../components/new-about/AboutBottomCta';
import AboutFaq, { aboutFaqs } from '../components/new-about/AboutFaq';
import config from '../config';
import '../components/new-about/about.css';

const NewAboutPage = () => {
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/about`;
  
  const pageTitle = "About Codigix Infotech | AI Solutions, IoT & Software Engineering Company";
  const metaDescription = "Discover Codigix Infotech—a global IT services & digital engineering leader delivering AI solutions, Industrial IoT automation, custom ERP systems, and enterprise software engineering.";

  // JSON-LD Schemas for Corporate SEO
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "legalName": "Codigix Infotech",
      "foundingDate": "2023-07-01",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/images/logos/logo.webp`,
      "description": "Codigix Infotech delivers cutting-edge AI solutions, Industrial IoT automation, custom ERP systems, and enterprise software engineering.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Industrial IoT Automation",
        "Enterprise ERP Systems",
        "Sales CRM Development",
        "Custom Software Engineering",
        "Cloud Architecture"
      ]
    }
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
        "name": "About Us",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFaqs.map(faq => ({
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
        keywords="About Codigix Infotech, IT company Pune, AI engineering company, Industrial IoT solutions company, software development firm India, enterprise IT consulting, Codigix story, Codigix leadership"
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/logos/logo.webp`}
        schemaData={[aboutPageSchema, breadcrumbSchema, faqSchema, organizationSchema]}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Content Area */}
        <main className="mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <span className="mx-1 text-gray-600">›</span>
            <span className="text-slate-900 dark:text-white font-medium">About Us</span>
          </nav>

          {/* Top Section: Hero & Stats */}
          <div className="mb-16">
            <AboutHero />
            <AboutStats />
          </div>

          {/* Full Width Sections */}
          <div className="space-y-12 md:space-y-20 mt-12">
            <AboutStory />
            <AboutFutureRoadmap />
            <AboutMissionVision />
            <AboutLeadership />
            <AboutTechExpertise />
            <AboutPartnersCertifications />
            <AboutFaq />
            <AboutBottomCta />
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

export default NewAboutPage;
