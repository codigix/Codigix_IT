import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
