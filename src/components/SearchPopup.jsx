// import React from 'react';

// export default function SearchPopup() {
//   return (
//     <>
//       <div className="search_popup">
//         <div className="search_close">
//           <button type="button" className="search_close_btn">
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//         </div>
//         <div className="container">
//           <div className="row">
//             <div className="col-xxl-12">
//               <div className="tj_search_wrapper">
//                 <div className="search_form">
//                   <form action="#">
//                     <div className="search_input">
//                       <h4 className="title">Search Projects, Service or Blog.</h4>
//                       <div className="search-box">
//                         <input className="search-input-field" type="search" placeholder="Search here..." required />
//                         <button type="submit">
//                           <i className="tji-search"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="search-popup-overlay"></div>
//     </>
//   );
// }

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SearchPopup({ isOpen, onClose }) {
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (!popupRef.current || !overlayRef.current) return;
      document.body.style.overflow = "hidden";

      gsap.set([popupRef.current, overlayRef.current], {
        display: "block",
      });

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      gsap.fromTo(
        popupRef.current,
        { y: -60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      if (!popupRef.current || !overlayRef.current) return;
      document.body.style.overflow = "auto";

      gsap.to([popupRef.current, overlayRef.current], {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (popupRef.current && overlayRef.current) {
            gsap.set([popupRef.current, overlayRef.current], {
              display: "none",
            });
          }
        },
      });
    }
  }, [isOpen]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Search Popup */}
      <div className="search_popup" ref={popupRef}>
        <div className="search_close">
          <button
            type="button"
            className="search_close_btn"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="tj_search_wrapper">
                <div className="search_form">
                  <form action="#">
                    <div className="search_input">
                      <h4 className="title">
                        Search Projects, Service or Blog.
                      </h4>
                      <div className="search-box">
                        <input
                          className="search-input-field"
                          type="search"
                          placeholder="Search here..."
                          autoFocus
                          required
                        />
                        <button type="submit">
                          <i className="tji-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="search-popup-overlay"
        ref={overlayRef}
        onClick={onClose}
      ></div>
    </>
  );
}