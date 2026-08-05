import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import ContactHero from '../components/new-contact/ContactHero';
import ContactFormSection from '../components/new-contact/ContactFormSection';
import ContactMap from '../components/new-contact/ContactMap';
import ContactFaq, { contactFaqs } from '../components/new-contact/ContactFaq';
import ContactBottomCta from '../components/new-contact/ContactBottomCta';
import config from '../config';
import '../components/new-contact/contact.css';

const NewContactPage = () => {
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/contact`;

  const pageTitle = "Contact Us | Codigix Infotech - Free Consultation & IT Services Inquiry";
  const metaDescription = "Get in touch with Codigix Infotech for enterprise AI solutions, Industrial IoT automation, custom ERP/CRM engineering, and IT consulting. Contact our Pune office or schedule a meeting.";

  // JSON-LD Schemas for Local Business & Contact Point
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/images/logos/logo.webp`,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-1234567890",
          "contactType": "customer service",
          "email": "contact@codigixinfotech.com",
          "availableLanguage": ["English", "Hindi"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tech Park, Baner Road",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411045",
        "addressCountry": "IN"
      }
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
        "name": "Contact Us",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contactFaqs.map(faq => ({
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
        keywords="Contact Codigix Infotech, IT company Pune contact, software consultation, AI consulting inquiry, Industrial IoT development contact, custom software quote, Codigix email address, Codigix phone number"
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/logos/logo.webp`}
        schemaData={[contactPageSchema, breadcrumbSchema, faqSchema, organizationSchema]}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Content Area */}
        <main className="mx-auto px-4 sm:px-6 lg:px-12 pt-28 lg:pt-32 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <Link to="/" className="hover:text-purple-600 dark:hover:text-white transition-colors">Home</Link>
            <span className="mx-1 text-slate-400 dark:text-gray-600">›</span>
            <span className="text-slate-900 dark:text-gray-300 font-bold">Contact Us</span>
          </nav>

          {/* Top Section: Hero */}
          <div className="mb-8">
            <ContactHero />
          </div>

          <div className="space-y-6 md:space-y-10">
            <ContactFormSection />
            <ContactMap />
            <ContactFaq />
            <ContactBottomCta />
          </div>

        </main>

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewContactPage;
