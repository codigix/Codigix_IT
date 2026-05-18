import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import NewFooter from "./NewFooter";
import SearchPopup from "./SearchPopup";
import HamburgerMenu from "./HamburgerMenu";
import config from "../config";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const siteUrl = config.SITE_URL;
  const siteName = config.SITE_NAME;

  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Loader timing control
  useEffect(() => {
    setLoading(true);
    setShowLoader(false);

    // Start loader after small delay (prevents logo flash issue)
    const startTimer = setTimeout(() => {
      setShowLoader(true);
    }, 200);

    // Stop loader after total time
    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname]);

  // Run animations after loader is removed
  useEffect(() => {
    if (!loading) {
      if (window.jQuery) {
        window.jQuery(document).ready(function () {
          window.jQuery(document).trigger("reset");
        });
      }

      if (window.jQuery && window.jQuery.fn.counterUp) {
        setTimeout(() => {
          window.jQuery(".counter").counterUp({
            delay: 10,
            time: 1000,
          });
        }, 100);
      }

      if (window.WOW) {
        new window.WOW().init();
      }
    }
  }, [loading]);

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
      {/* LOADER FIRST */}
      {loading ? (
        showLoader ? (
          <div className="preloader">
            <div className="loading-container">
              <div className="loading"></div>
              <div id="loading-icon">
                <img
                  src="/assets/images/logos/logo.png"
                  alt="Loading"
                />
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <>
          <div className="body-overlay"></div>

          <div className="back-to-top-wrapper">
            <button
              id="back_to_top"
              type="button"
              className="back-to-top-btn"
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
          {isHomePage ? <Footer /> : <NewFooter />}
        </>
      )}
    </>
  );
}
