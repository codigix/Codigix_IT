// import React, { useEffect } from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import NewFooter from './NewFooter';
// import SearchPopup from './SearchPopup';
// import HamburgerMenu from './HamburgerMenu';

// export default function Layout({ children }) {
//   useEffect(() => {
//     if (window.jQuery) {
//       window.jQuery(document).ready(function() {
//         window.jQuery(document).trigger('reset');
//       });
//     }

//     // Initialize CounterUp for counter elements
//     if (window.jQuery && window.jQuery.fn.counterUp) {
//       setTimeout(() => {
//         window.jQuery('.counter').counterUp({
//           delay: 10,
//           time: 1000,
//         });
//       }, 100);
//     }

//     // Re-initialize WOW.js animations
//     if (window.WOW) {
//       new window.WOW().init();
//     }
//   }, [children]);

//   return (
//     <>
//       <div className="body-overlay"></div>

//       <div className="preloader">
//         <div className="loading-container">
//           <div className="loading"></div>
//           <div id="loading-icon"><img src="assets/images/logos/logo-icon.webp" alt="Loading" /></div>
//         </div>
//       </div>

//       <div className="back-to-top-wrapper">
//         <button id="back_to_top" type="button" className="back-to-top-btn">
//           <span><i className="tji-rocket"></i></span>
//         </button>
//       </div>

//       <SearchPopup />
//       <HamburgerMenu />
//       <Header />

//       <main id="primary" className="site-main">
//         {children}
//       </main>

//       <Footer />
//     </>
//   );
// }
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NewFooter from "./NewFooter";
import SearchPopup from "./SearchPopup";
import HamburgerMenu from "./HamburgerMenu";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
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
  }, [children]);

  return (
    <>
      <div className="body-overlay"></div>

      <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-icon">
            <img
              src="/assets/images/logos/logo-icon.webp"
              alt="Loading"
            />
          </div>
        </div>
      </div>

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
  );
}
