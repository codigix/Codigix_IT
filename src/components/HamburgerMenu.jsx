// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function HamburgerMenu() {
//   return (
//     <>
//       <div className="tj-offcanvas-area d-none d-lg-block">
//         <div className="hamburger_bg" style={{backgroundImage: "url(assets/images/funfact/bg-funfact.webp)"}}></div>
//         <div className="hamburger_wrapper">
//           <div className="hamburger_inner">
//             <div className="hamburger_top d-flex align-items-center justify-content-between">
//               <div className="hamburger_logo">
//                 <Link to="/" className="mobile_logo">
//                   <img src="assets/images/logos/logo.png" alt="Codigix Logo" />
//                 </Link>
//               </div>
//               <div className="hamburger_close">
//                 <button className="hamburger_close_btn">
//                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="offcanvas-text">
//               <p>Developing personalize our customer journeys to increase satisfaction & loyalty of our expansion recognized by industry leaders.</p>
//             </div>
//             <div className="hamburger-search-area">
//               <h5 className="hamburger-title">Search Now!</h5>
//               <div className="hamburger_search">
//                 <form method="get" action="/">
//                   <button type="submit"><i className="tji-search"></i></button>
//                   <input type="search" autoComplete="off" name="s" defaultValue="" placeholder="Search here..." />
//                 </form>
//               </div>
//             </div>
//             <div className="hamburger-infos">
//               <h5 className="hamburger-title">Contact Info</h5>
//               <div className="contact-info">
//                 <div className="contact-item">
//                   <span className="subtitle">Phone</span>
//                   <a className="contact-link" href="tel:10095447818">+1 (009) 544-7818</a>
//                 </div>
//                 <div className="contact-item">
//                   <span className="subtitle">Email</span>
//                   <a className="contact-link" href="mailto:info@codigix.com">info@codigix.com</a>
//                 </div>
//                 <div className="contact-item">
//                   <span className="subtitle">Location</span>
//                   <span className="contact-link">993 Renner Burg, West Rond, MT 94251-030</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="hamburger-socials">
//             <h5 className="hamburger-title">Follow Us</h5>
//             <div className="social-links style-2">
//               <ul>
//                 <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="tji-facebook"></i></a></li>
//                 <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="tji-linkedin"></i></a></li>
//                 <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="tji-instagram"></i></a></li>
//                 <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer"><i className="tji-x-twitter"></i></a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="hamburger-area d-lg-none">
//         <div className="hamburger_bg" style={{backgroundImage: "url(assets/images/funfact/bg-funfact.webp)"}}></div>
//         <div className="hamburger_wrapper">
//           <div className="hamburger_inner">
//             <div className="hamburger_top d-flex align-items-center justify-content-between">
//               <div className="hamburger_logo">
//                 <Link to="/" className="mobile_logo">
//                   <img src="assets/images/logos/logo.png" alt="Codigix Logo" />
//                 </Link>
//               </div>
//               <div className="hamburger_close">
//                 <button className="hamburger_close_btn">
//                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="hamburger_menu">
//               <div className="mobile_menu"></div>
//             </div>
//             <div className="hamburger-infos">
//               <h5 className="hamburger-title">Contact Info</h5>
//               <div className="contact-info">
//                 <div className="contact-item">
//                   <span className="subtitle">Phone</span>
//                   <a className="contact-link" href="tel:8089091313">808-909-1313</a>
//                 </div>
//                 <div className="contact-item">
//                   <span className="subtitle">Email</span>
//                   <a className="contact-link" href="mailto:info@codigix.com">info@codigix.com</a>
//                 </div>
//                 <div className="contact-item">
//                   <span className="subtitle">Location</span>
//                   <span className="contact-link">993 Renner Burg, West Rond, MT 94251-030</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="hamburger-socials">
//             <h5 className="hamburger-title">Follow Us</h5>
//             <div className="social-links style-2">
//               <ul>
//                 <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="tji-facebook"></i></a></li>
//                 <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="tji-linkedin"></i></a></li>
//                 <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="tji-instagram"></i></a></li>
//                 <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer"><i className="tji-x-twitter"></i></a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function HamburgerMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });

      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });

      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });

      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className="hamburger-overlay"
        ref={overlayRef}
        onClick={onClose}
      ></div>

      {/* Offcanvas Menu */}
      <div className="tj-offcanvas-area" ref={menuRef}>
        <div className="hamburger_bg"
          style={{ backgroundImage: "url(assets/images/funfact/bg-funfact.webp)" }}>
        </div>

        <div className="hamburger_wrapper">
          <div className="hamburger_inner">
            <div className="hamburger_top d-flex align-items-center justify-content-between">
              <Link to="/" className="mobile_logo">
                <img src="assets/images/logos/logo.png" alt="Logo" />
              </Link>

              <button className="hamburger_close_btn" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="offcanvas-text">
              <p>
                Developing personalized customer journeys to increase satisfaction & loyalty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}