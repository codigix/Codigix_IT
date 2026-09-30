import React, { useState, useEffect } from 'react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import HeroSection from '../components/new-home/HeroSection';
import TrustedBySection from '../components/new-home/TrustedBySection';
import SolutionsGrid from '../components/new-home/SolutionsGrid';
import WorkflowSection from '../components/new-home/WorkflowSection';
import AiSolutionsGrid from '../components/new-home/AiSolutionsGrid';
import IotDevicesSection from '../components/new-home/IotDevicesSection';
import FaqSection, { faqData } from '../components/new-home/FaqSection';
import BlogSection from '../components/new-home/BlogSection';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/new-home/new-home.css';

const NewHomePage = () => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Structured JSON-LD Data for Google Rich Snippets & Knowledge Graph
  const homeSchemas = [
    {
      "@context": "https://schema.org",
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
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://codigixinfotech.com/#website",
      "url": "https://codigixinfotech.com/",
      "name": "Codigix Infotech",
      "publisher": {
        "@id": "https://codigixinfotech.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
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
      "@context": "https://schema.org",
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
  ];

  return (
    <>
      <SEO
        title="Software Development Company in Pune | Codigix"
        exactTitle={true}
        description="Codigix is a software development company in Pune offering AI, ERP, Industrial IoT, CRM & custom software solutions. Get a consultation today."
        keywords="software development company Pune, custom software development Pune, AI development company Pune, AI solutions Pune, Industrial IoT solutions Pune, IoT development company Pune, ERP software development Pune, manufacturing ERP Pune, custom ERP software Pune, Industry 4.0 solutions Pune, business automation Pune, CRM software development Pune"
        canonical="https://codigixinfotech.com/"
        ogTitle="Software Development Company in Pune | Codigix"
        ogDescription="AI, ERP, Industrial IoT, CRM and custom software solutions for businesses. Talk to Codigix experts today for a consultation."
        twitterDescription="AI, ERP, Industrial IoT, CRM and custom software solutions. Get a free consultation from Codigix Infotech."
        ogImage="https://codigixinfotech.com/assets/images/logos/logo.webp"
        schemaData={homeSchemas}
      />

      <div className="home-wrapper relative min-h-screen">
        {/* Custom Cursor Glow (Desktop Only) */}
        {cursorVisible && (
          <div
            className="cursor-glow hidden lg:block"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`
            }}
          />
        )}

        <header>
          <NewHomeNav />
        </header>

        <main id="main-content">
          <HeroSection />
          <TrustedBySection />
          <SolutionsGrid />
          <WorkflowSection />
          <AiSolutionsGrid />
          <IotDevicesSection />
          <FaqSection />
          <BlogSection />
        </main>

        <footer>
          <CtaFooterSection />
        </footer>

        {/* Circular Scroll progress Back-to-top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#0a0620] border border-gray-800 rounded-full flex items-center justify-center text-white hover:border-purple-500/50 hover:text-purple-400 shadow-[0_5px_25px_rgba(0,0,0,0.8)] transition-all duration-300 group"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  stroke="url(#progress-gradient)"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={2 * Math.PI * 19 * (1 - scrollProgress / 100)}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <ArrowUp size={16} className="relative z-10 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NewHomePage;
