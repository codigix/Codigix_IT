import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
const Footer = React.lazy(() => import('./Footer'));
const NewFooter = React.lazy(() => import('./NewFooter'));
import SearchPopup from "./SearchPopup";
import HamburgerMenu from "./HamburgerMenu";
import config from "../config";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const siteUrl = config.SITE_URL;
  const siteName = config.SITE_NAME;

  // Run animations on route change
  useEffect(() => {
    // A small delay to ensure DOM is updated before running WOW animations
    const timer = setTimeout(() => {
      const wowElements = document.querySelectorAll('.wow');
      if (wowElements.length > 0 && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              el.style.visibility = 'visible';
              el.classList.add('animated');
              if (el.getAttribute('data-wow-delay')) {
                el.style.animationDelay = el.getAttribute('data-wow-delay');
              }
              if (el.getAttribute('data-wow-duration')) {
                el.style.animationDuration = el.getAttribute('data-wow-duration');
              }
              obs.unobserve(el);
            }
          });
        }, { threshold: 0.1 });

        wowElements.forEach((el) => {
          el.style.visibility = 'hidden';
          observer.observe(el);
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteName,
            "url": siteUrl,
            "logo": `${siteUrl}/assets/images/logos/logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-7066556768",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "en"
            },
            "sameAs": [
              "https://www.facebook.com/codigix.infotech",
              "https://www.linkedin.com/company/codigix-infotech",
              "https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==",
              "https://x.com/CodigixI2994"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <div className="body-overlay"></div>

      <div className="back-to-top-wrapper">
        <button
          id="back_to_top"
          type="button"
          className="back-to-top-btn"
          aria-label="Back to top"
        >
          <span>
            <i className="tji-rocket"></i>
          </span>
        </button>
      </div>

      <SearchPopup />
      <HamburgerMenu />
      <Header />

      <main id="primary" className="site-main">
        {children}
      </main>

      {/* FOOTER LOGIC */}
      <React.Suspense fallback={<div className="h-64"></div>}>
        {isHomePage ? <Footer /> : <NewFooter />}
      </React.Suspense>
    </>
  );
}
