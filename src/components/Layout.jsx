import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import NewFooter from "./NewFooter";
import SearchPopup from "./SearchPopup";
import HamburgerMenu from "./HamburgerMenu";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
        <title>Codigix - AI-Powered Solutions & Custom Technology</title>
        <meta name="description" content="Codigix provides cutting-edge AI-powered solutions, custom technology development, and predictive analytics to help businesses grow." />
        <link rel="canonical" href={`https://codigixinfotech.com${location.pathname}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://codigixinfotech.com${location.pathname}`} />
        <meta property="og:title" content="Codigix - AI-Powered Solutions & Custom Technology" />
        <meta property="og:description" content="Innovating Tomorrow, Today. Expert AI and Custom Technology Solutions for your Business." />
        <meta property="og:image" content="https://codigixinfotech.com/assets/images/logos/logo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://codigixinfotech.com${location.pathname}`} />
        <meta property="twitter:title" content="Codigix - AI-Powered Solutions & Custom Technology" />
        <meta property="twitter:description" content="Innovating Tomorrow, Today. Expert AI and Custom Technology Solutions for your Business." />
        <meta property="twitter:image" content="https://codigixinfotech.com/assets/images/logos/logo.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Codigix",
            "url": "https://codigixinfotech.com",
            "logo": "https://codigixinfotech.com/assets/images/logos/logo.png",
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
              "https://www.instagram.com/codigix",
              "https://x.com/CodigixI2994"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Codigix",
            "url": "https://codigixinfotech.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://codigixinfotech.com/search?q={search_term_string}",
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
