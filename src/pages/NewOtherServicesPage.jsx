import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OtherServicesSidebar from '../components/new-other-services/OtherServicesSidebar';
import OtherServicesHero from '../components/new-other-services/OtherServicesHero';
import OtherServicesList from '../components/new-other-services/OtherServicesList';
import OtherServicesBottomCta from '../components/new-other-services/OtherServicesBottomCta';
import ServicesFaqSection, { servicesFaqData } from '../components/new-other-services/ServicesFaqSection';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
import '../components/new-other-services/other-services.css';

const NewOtherServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('web-development');

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      const idMap = {
        'Web Development': 'web-development',
        'Mobile Apps': 'mobile-apps',
        'UI/UX Design': 'ui-ux-design',
        'Cloud Solutions': 'cloud-solutions',
        'DevOps': 'devops'
      };
      const sectionId = idMap[tabFromUrl];
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['web-development', 'mobile-apps', 'ui-ux-design', 'cloud-solutions', 'devops'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.pageYOffset;
          const absoluteBottom = bottom + window.pageYOffset;

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageTitle = "Custom Web, Mobile App, Cloud & DevOps Engineering Services | Codigix Infotech";
  const metaDescription = "Codigix Infotech delivers end-to-end digital engineering services: React/Next.js web app development, iOS & Android mobile apps, Figma UI/UX design systems, AWS/Azure cloud architecture, and DevOps CI/CD automation.";
  const canonicalUrl = "https://codigixinfotech.com/services";

  // Structured JSON-LD Data for Services Page
  const servicesSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechService",
      "name": "Software Engineering & Digital Transformation Services",
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
          "name": "Services",
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": servicesFaqData.map(item => ({
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
        keywords="Custom Web Development, Mobile App Development, UI UX Design Systems, AWS Cloud Architecture, DevOps CI CD Automation, React Next.js Node.js, Codigix Infotech"
        canonical={canonicalUrl}
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={servicesSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="services-layout-container mx-auto pt-20 lg:pt-20">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-slate-200 dark:border-gray-800/50">
            <OtherServicesHero />
            <OtherServicesList />
            <ServicesFaqSection />
            <OtherServicesBottomCta />
          </main>

          {/* Sticky Sidebar (Right Side) */}
          <aside aria-label="Software Services Navigation Menu">
            <OtherServicesSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
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

export default NewOtherServicesPage;
