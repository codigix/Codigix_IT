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
  const pageTitle = "About Codigix | Software Development Company in Pune";
  const metaDescription = "Learn about Codigix, a Pune-based software development company delivering AI, ERP, Industrial IoT, CRM and custom software solutions. Talk to our experts today.";
  const canonicalUrl = `${siteUrl}/about-us`;

  // JSON-LD Schemas for Corporate SEO
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://codigixinfotech.com/#organization",
        "name": "Codigix Infotech",
        "url": "https://codigixinfotech.com/",
        "description": "Software development company in Pune providing AI, ERP, Industrial IoT, CRM, custom software, cloud, DevOps and business automation solutions.",
        "areaServed": [
          "Pune",
          "PCMC",
          "Chakan",
          "Bhosari",
          "Talegaon",
          "Ranjangaon",
          "Tathawade",
          "Hadapsar"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://codigixinfotech.com/#website",
        "url": "https://codigixinfotech.com/",
        "name": "Codigix Infotech",
        "publisher": {
          "@id": "https://codigixinfotech.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://codigixinfotech.com/#webpage",
        "url": "https://codigixinfotech.com/",
        "name": "Software Development Company in Pune | Codigix",
        "isPartOf": {
          "@id": "https://codigixinfotech.com/#website"
        },
        "about": {
          "@id": "https://codigixinfotech.com/#organization"
        }
      },
      {
        "@type": "Service",
        "name": "Software Development Services",
        "provider": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "areaServed": "Pune, Maharashtra, India",
        "serviceType": [
          "AI Solutions",
          "Industrial IoT Solutions",
          "ERP Solutions",
          "CRM Solutions",
          "Custom Software Development",
          "Web Development",
          "Mobile App Development",
          "Cloud Solutions",
          "DevOps",
          "API & System Integration",
          "Business Automation"
        ]
      }
    ]
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
        exactTitle={true}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords="about Codigix, software development company Pune, IT company Pune, AI company Pune, custom software development Pune, ERP solutions Pune, Industrial IoT company Pune, IoT solutions Pune, software company PCMC"
        canonical={canonicalUrl}
        ogTitle="About Codigix | Software Development Company in Pune"
        ogDescription="Discover Codigix's expertise in AI, ERP, Industrial IoT, CRM and custom software development. Connect with our Pune team for your next technology project."
        twitterDescription="Meet Codigix, a Pune-based technology company specializing in AI, ERP, Industrial IoT, CRM and custom software solutions."
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
