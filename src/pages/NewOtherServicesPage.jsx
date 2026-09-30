import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OtherServicesSidebar from '../components/new-other-services/OtherServicesSidebar';
import OtherServicesHero from '../components/new-other-services/OtherServicesHero';
import OtherServicesList from '../components/new-other-services/OtherServicesList';
import OtherServicesPricing from '../components/new-other-services/OtherServicesPricing';
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
        'DevOps': 'devops',
        'Pricing Plans': 'pricing'
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
      const sections = ['web-development', 'mobile-apps', 'ui-ux-design', 'cloud-solutions', 'devops', 'pricing'];
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

  const pageTitle = "Software Development Services in Pune | AI, ERP & IoT";
  const metaDescription = "Explore Codigix software development services in Pune, including AI, ERP, Industrial IoT, CRM, web & mobile apps, cloud, DevOps and business automation.Call Now.";
  const canonicalUrl = "https://codigixinfotech.com/services";

  // Structured JSON-LD Data for Services Page
  const customProductsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#ai-solutions",
        "name": "AI Solutions",
        "description": "AI development and artificial intelligence solutions for business automation, analytics, intelligent applications and enterprise operations.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "AI Software Solutions",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#industrial-iot",
        "name": "Industrial IoT Solutions",
        "description": "Industrial IoT and Industry 4.0 solutions for connected manufacturing, machine monitoring, production visibility and industrial automation.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "Industrial IoT Software",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#erp-solutions",
        "name": "ERP Solutions",
        "description": "Custom ERP software solutions for manufacturing and business operations, including production, inventory, finance and process management.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "ERP Software",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#crm-solutions",
        "name": "CRM Solutions",
        "description": "Custom CRM software solutions designed to manage leads, customers, sales processes and business relationships.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "CRM Software",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#custom-software",
        "name": "Custom Software Development",
        "description": "Custom software development solutions built around specific business processes, workflows, integrations and operational requirements.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "Custom Software",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#web-development",
        "name": "Web Development",
        "description": "Custom web development solutions for business websites, web applications, portals and enterprise platforms.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "Web Development",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      },
      {
        "@type": "Product",
        "@id": "https://codigixinfotech.com/services#mobile-app-development",
        "name": "Mobile App Development",
        "description": "Custom mobile application development for Android, iOS and business applications.",
        "brand": {
          "@type": "Brand",
          "name": "Codigix"
        },
        "manufacturer": {
          "@id": "https://codigixinfotech.com/#organization"
        },
        "category": "Mobile Application Development",
        "areaServed": {
          "@type": "City",
          "name": "Pune"
        }
      }
    ]
  };

  const servicesSchemas = [
    customProductsSchema,
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
        exactTitle={true}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords="software development services Pune, software development company Pune, AI solutions Pune, AI development services Pune, Industrial IoT solutions Pune, IoT development Pune, ERP solutions Pune, CRM solutions Pune, custom software development Pune, web development Pune, mobile app development Pune, cloud solutions Pune, DevOps services Pune, API integration Pune, business automation Pune"
        canonical={canonicalUrl}
        ogTitle="Software Development Services in Pune | AI, ERP & IoT | Codigix"
        ogDescription="From AI and Industrial IoT to ERP, CRM, cloud, mobile apps and business automation, Codigix delivers custom technology solutions. Contact us for a free consultation."
        twitterDescription="AI, ERP, Industrial IoT, CRM, custom software, cloud, DevOps and automation services from Codigix. Get a free consultation today."
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={servicesSchemas}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <div className="services-layout-container mx-auto pt-32 lg:pt-36">

          {/* Main Content Area (Left Side) */}
          <main id="main-content" className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:border-r border-slate-200 dark:border-gray-800/50">
            <OtherServicesHero />
            <OtherServicesList />
            <OtherServicesPricing />
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
