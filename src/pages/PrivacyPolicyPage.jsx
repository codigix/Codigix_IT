import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import config from '../config';
import { ShieldCheck, Database, Lock, Eye, Cookie, UserCheck, Mail, RefreshCw } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/privacy-policy`;

  const pageTitle = "Privacy Policy | Codigix Infotech";
  const metaDescription = "Read the Privacy Policy of Codigix Infotech Pvt. Ltd. Learn how we collect, protect, process, and safeguard your personal data and privacy when using our website and services.";

  const privacySchema = {
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
        "name": "Privacy Policy",
        "item": canonicalUrl
      }
    ]
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: ShieldCheck,
      content: `At Codigix Infotech Pvt. Ltd. ("Codigix", "we", "our", or "us"), we are committed to respecting and protecting the privacy of our visitors, clients, and partners. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website (https://codigixinfotech.com), interact with our services, or communicate with us.`
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      icon: Database,
      content: `We collect information directly from you when you submit inquiry forms, schedule consultations, subscribe to newsletters, or apply for career opportunities. The types of personal information collected include:
- Personal Identifiers: Full Name, Business Email Address, Phone Number, Corporate Designation, and Company Name.
- Communication Data: Message inquiries, proposal requests, and consultation details submitted through our contact forms.
- Technical & Usage Data: IP address, browser type, device information, operating system, referring URLs, and website navigation metrics via analytics cookies.`
    },
    {
      id: "use-of-information",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We utilize the information collected for legitimate business operations, including:
- Responding to your inquiries, scheduling consultations, and delivering requested project proposals.
- Developing and maintaining custom AI, IoT, ERP, CRM, and software engineering services.
- Improving website performance, user experience, and content strategy through anonymous web analytics.
- Sending important administrative notifications, technological updates, or marketing communications (with your consent).
- Complying with applicable legal obligations and enforcing our Terms & Conditions.`
    },
    {
      id: "data-security",
      title: "4. Data Security & Protection",
      icon: Lock,
      content: `We implement robust physical, technical, and organizational security measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. Our website utilizes SSL/TLS encryption, firewall protection, and restricted data access protocols. However, no electronic transmission or cloud storage system can be guaranteed to be 100% secure.`
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking Technologies",
      icon: Cookie,
      content: `We use essential and performance cookies to enhance your browsing experience, analyze site traffic, and understand user interaction patterns. You can manage or disable cookie preferences directly through your web browser settings. Disabling essential cookies may impact certain interactive features of our site.`
    },
    {
      id: "third-party-sharing",
      title: "6. Information Sharing & Third Parties",
      icon: UserCheck,
      content: `Codigix Infotech does not sell, rent, or trade your personal information to third parties for marketing purposes. We may share data only with:
- Trusted cloud hosting providers and analytics partners operating under strict confidentiality agreements.
- Regulatory bodies, legal authorities, or court orders where required by applicable law.`
    },
    {
      id: "user-rights",
      title: "7. Your Rights & Choices",
      icon: Mail,
      content: `Depending on your location, you have rights regarding your personal data, including:
- The right to request access to the personal data we hold about you.
- The right to request correction or updating of inaccurate personal data.
- The right to request erasure or deletion of your personal information.
- The right to opt-out of marketing communications at any time by clicking the unsubscribe link or contacting us directly.`
    },
    {
      id: "policy-updates",
      title: "8. Updates to This Privacy Policy",
      icon: RefreshCw,
      content: `We may update this Privacy Policy periodically to reflect changes in our operational practices or legal requirements. The updated date at the top of this page will indicate when changes take effect. We encourage you to review this policy periodically.`
    }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords="Privacy Policy, Codigix Infotech privacy, data protection, privacy guidelines, user data security, GDPR compliance, privacy commitment"
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/logos/logo.webp`}
        schemaData={[privacySchema, breadcrumbSchema]}
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
            <span className="text-slate-900 dark:text-gray-300 font-bold">Privacy Policy</span>
          </nav>

          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/40 border border-purple-500/20 p-8 md:p-12 mb-12 shadow-xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Lock size={14} /> Data Protection & Privacy
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                Learn how Codigix Infotech collects, processes, and protects your personal data when you use our website, consult with our team, or utilize our enterprise services.
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

          {/* Privacy Officer Contact */}
          <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Data Privacy Inquiries</h3>
            <p className="text-slate-600 dark:text-gray-300 text-sm max-w-xl mx-auto mb-6">
              If you have any questions regarding this Privacy Policy or wish to exercise your data protection rights, please reach out to our Privacy Officer.
            </p>
            <a
              href="mailto:info@codigixinfotech.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-purple-600/30"
            >
              Email Privacy Officer &rarr;
            </a>
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

export default PrivacyPolicyPage;
