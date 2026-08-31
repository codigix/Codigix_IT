import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import config from '../config';
import { ShieldCheck, FileText, Scale, AlertTriangle, CheckCircle2, Lock, HelpCircle } from 'lucide-react';

const TermsConditionsPage = () => {
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/terms-conditions`;

  const pageTitle = "Terms & Conditions | Codigix Infotech";
  const metaDescription = "Review the official Terms and Conditions of Codigix Infotech Pvt. Ltd. Learn about our service agreements, intellectual property policy, user responsibilities, and legal guidelines.";

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "url": siteUrl
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
        "name": "Terms & Conditions",
        "item": canonicalUrl
      }
    ]
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: CheckCircle2,
      content: `By accessing, browsing, or using the website and services of Codigix Infotech Pvt. Ltd. ("Codigix", "we", "us", or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must immediately discontinue the use of our site and services.`
    },
    {
      id: "services",
      title: "2. Services Offered",
      icon: FileText,
      content: `Codigix Infotech provides software engineering, Artificial Intelligence (AI) development, Industrial IoT solution integration, Enterprise Resource Planning (ERP), Customer Relationship Management (CRM) platforms, and IT consulting services. Any proposal, Statement of Work (SOW), or contractual agreement entered into with Codigix shall supplement these Terms.`
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      icon: ShieldCheck,
      content: `All original contents, features, logos, graphics, source code, UI/UX designs, trademarks, and documentation on this site are the exclusive intellectual property of Codigix Infotech Pvt. Ltd., protected by applicable copyright, trademark, and proprietary rights laws. Custom software deliverables created for clients are governed by explicit master service agreements (MSAs) executed between Codigix and the client.`
    },
    {
      id: "user-obligations",
      title: "4. User Obligations & Conduct",
      icon: Lock,
      content: `When utilizing our website or submitting inquiries, you agree not to:
- Engage in unauthorized access, scraping, or data mining of our website systems.
- Transmit malicious code, viruses, or disruptive software scripts.
- Use our communication channels to send spam, fraudulent inquiries, or unlawful content.
- Misrepresent your identity or corporate affiliation.`
    },
    {
      id: "limitation-liability",
      title: "5. Limitation of Liability",
      icon: AlertTriangle,
      content: `To the maximum extent permitted by applicable law, Codigix Infotech Pvt. Ltd. and its officers, directors, employees, or partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your access to, or inability to access, our website or services, including but not limited to loss of data, loss of business revenue, or operational disruptions.`
    },
    {
      id: "warranties-disclaimer",
      title: "6. Disclaimer of Warranties",
      icon: Scale,
      content: `Our website and information are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive to maintain accurate, up-to-date, and secure information, we do not warrant that our website will be error-free, uninterrupted, or completely secure from external cyber threats.`
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Jurisdiction",
      icon: Scale,
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any legal disputes, claims, or proceedings arising out of or related to these Terms or our services shall fall under the exclusive jurisdiction of the competent courts in Pune, Maharashtra, India.`
    },
    {
      id: "modifications",
      title: "8. Modifications to Terms",
      icon: HelpCircle,
      content: `We reserve the right to modify, amend, or update these Terms & Conditions at any time without prior notice. Any updates will be published on this page with an updated revision date. Your continued use of our website following any revisions constitutes your acceptance of the revised Terms.`
    }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords="Terms and Conditions, Codigix Infotech legal terms, software services agreement, IT consulting terms, client agreement, Codigix terms of service"
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/logos/logo.webp`}
        schemaData={[termsSchema, breadcrumbSchema]}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation Header */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-36 pb-20">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <Link to="/" className="hover:text-purple-600 dark:hover:text-white transition-colors">Home</Link>
            <span className="mx-1 text-slate-400 dark:text-gray-600">›</span>
            <span className="text-slate-900 dark:text-gray-300 font-bold">Terms & Conditions</span>
          </nav>

          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/40 border border-purple-500/20 p-8 md:p-12 mb-12 shadow-xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck size={14} /> Legal Documentation
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Terms & Conditions
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                Please read these Terms & Conditions carefully before using our website or engaging with Codigix Infotech's custom software engineering, AI, IoT, ERP, and CRM services.
              </p>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                Last updated: <span className="text-purple-600 dark:text-purple-400 font-semibold">August 7, 2026</span>
              </div>
            </div>
          </div>

          {/* Quick Nav / Table of Contents */}
          <div className="bg-slate-100 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 rounded-xl p-6 mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-xs text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span className="text-purple-500">•</span> {sec.title.split('. ')[1]}
                </a>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {sections.map((sec) => {
              const IconComp = sec.icon;
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-32 bg-white dark:bg-[#0c0824]/60 border border-slate-200 dark:border-gray-800/80 rounded-xl p-6 md:p-8 transition-all duration-200 hover:border-purple-500/40 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                      <IconComp size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {sec.content}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Have Questions About Our Terms?</h3>
            <p className="text-slate-600 dark:text-gray-300 text-sm max-w-xl mx-auto mb-6">
              If you have any questions, concerns, or legal inquiries regarding our Terms & Conditions, our legal compliance team is here to assist you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-purple-600/30"
            >
              Contact Legal Team &rarr;
            </Link>
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

export default TermsConditionsPage;
