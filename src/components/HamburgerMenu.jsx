import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function HamburgerMenu({ isOpen, onClose }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const overlayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  // Detect screen
  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Set initial position only once
  useEffect(() => {
    if (desktopRef.current)
      gsap.set(desktopRef.current, { x: "100%" });

    if (mobileRef.current)
      gsap.set(mobileRef.current, { x: "100%" });

    if (overlayRef.current)
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
  }, []);

  // Animation controller
useEffect(() => {
  const menu = isMobile ? mobileRef.current : desktopRef.current;
  if (!menu || !overlayRef.current) return;

  gsap.killTweensOf(menu);
  gsap.killTweensOf(overlayRef.current);

  if (isOpen) {
    // Overlay fade (quick)
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.25,
      pointerEvents: "auto",
      ease: "power2.out",
    });

    // Panel slide (smooth + fast)
    gsap.to(menu, {
      x: 0,
      duration: 0.55,
      ease: "expo.out",
    });

    document.body.style.overflow = "hidden";
  } else {
    // Panel close
    gsap.to(menu, {
      x: "100%",
      duration: 0.45,
      ease: "expo.inOut",
    });

    // Overlay fade out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      pointerEvents: "none",
    });

    document.body.style.overflow = "auto";
  }
}, [isOpen, isMobile]);

  return (
    <>
      {/* Overlay */}
      <div
        className="hamburger-overlay"
        ref={overlayRef}
        onClick={onClose}
      // style={{
      //   position: "fixed",
      //   inset: 0,
      //   background: "rgba(0,0,0,0.5)",
      //   opacity: 0,
      //   pointerEvents: "none",
      //   zIndex: 9998,
      //   backdropFilter: "blur(4px)",
      // }}
      />

      {/* ================= DESKTOP MENU ================= */}
      <div
        ref={desktopRef}
        className="tj-offcanvas-area"
      // style={{
      //   position: "fixed",
      //   top: 0,
      //   right: 0,
      //   height: "100vh",
      //   width: "420px",
      //   zIndex: 9999,
      // }}
      >

        <div className="hamburger_bg"
          style={{ backgroundImage: "url(assets/images/funfact/bg-funfact.webp)" }}>
        </div>
        <div className="hamburger_wrapper">
          <div className="hamburger_inner">

            <div className="hamburger_top d-flex align-items-center justify-content-between">
              <div className="hamburger_logo">
                <Link className="mobile_logo" to="/">
                  <img src="assets/images/logos/logo.png" alt="Codigix Logo" />
                </Link>
              </div>

              <div className="hamburger_close" >
                <button className="hamburger_close_btn" onClick={onClose}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 1L1 17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L17 17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="offcanvas-text">
              <p>
                Developing personalized customer journeys to increase satisfaction &amp;
                loyalty of our expansion recognized by industry leaders.
              </p>
            </div>

            <div className="hamburger-search-area">
              <h5 className="hamburger-title">Search Now!</h5>
              <div className="hamburger_search">
                <form method="get" action="index.html">
                  <button type="submit">
                    <i className="tji-search"></i>
                  </button>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search here..."
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>

            <div className="hamburger-infos">
              <h5 className="hamburger-title">Contact Info</h5>

              <div className="contact-info">

                <div className="contact-item">
                  <span className="subtitle">Phone</span>
                  <Link className="contact-link" to="tel:+10095447818">
                    +1 (009) 544-7818
                  </Link>
                </div>

                <div className="contact-item">
                  <span className="subtitle">Email</span>
                  <Link className="contact-link" to="mailto:info@ainex.com">
                    info@ainex.com
                  </Link>
                </div>

                <div className="contact-item">
                  <span className="subtitle">Location</span>
                  <span className="contact-link">
                    993 Renner Burg, West Rond, MT 94251-030
                  </span>
                </div>

              </div>
            </div>
            <div className="hamburger-socials">
              <h5 className="hamburger-title">Follow Us</h5>
              <div className="social-links style-2">
                <ul>
                  <li><Link to="https://www.facebook.com/" target="_blank"><i className="tji-facebook"></i></Link></li>
                  <li><Link to="https://www.linkedin.com/" target="_blank"><i className="tji-linkedin"></i></Link></li>
                  <li><Link to="https://www.instagram.com/" target="_blank"><i className="tji-instagram"></i></Link></li>
                  <li><Link to="https://x.com/" target="_blank"><i className="tji-x-twitter"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        ref={mobileRef}
        className="hamburger-area"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "100%",
          maxWidth: "360px",
          zIndex: 9999,
        }}
      >
        <div className="hamburger_bg"
          style={{ backgroundImage: "url(assets/images/funfact/bg-funfact.webp)" }}>
        </div>
        <div className="hamburger_wrapper">
          <div className="hamburger_inner">
            <div className="hamburger_top d-flex align-items-center justify-content-between">
              <div className="hamburger_logo">
                <Link to="/" className="mobile_logo">
                  <img src="/assets/images/logos/logo.png" alt="Logo" />
                </Link>
              </div>
              <div className="hamburger_close">
                <button className="hamburger_close_btn" onClick={onClose}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hamburger_menu">
              <div className="mobile_menu mean-container">
                <div className="mean-bar">
                  <nav className="mean-nav">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about" className="mean-last">About</Link>
                      </li>
                      <li><Link to="/services" className="mean-last">Services</Link></li>
                      <li><Link to="/projects" className="mean-last">Projects</Link></li>


                      <li className="has-dropdown">
                        <Link to="/blogs">Blog</Link>
                      </li>

                      <li className="mean-last">
                        <Link to="/contact">Contact</Link>
                      </li>

                    </ul>
                  </nav>

                </div>
              </div>
            </div>
            <div className="hamburger-infos">
              <h5 className="hamburger-title">Contact Info</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="subtitle">Phone</span>
                  <a className="contact-link" href="tel:8089091313">808-909-1313</a>
                </div>
                <div className="contact-item">
                  <span className="subtitle">Email</span>
                  <a className="contact-link" href="mailto:info@Ainex.com">info@ainex.com</a>
                </div>
                <div className="contact-item">
                  <span className="subtitle">Location</span>
                  <span className="contact-link">993 Renner Burg, West Rond, MT 94251-030</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hamburger-socials">
            <h5 className="hamburger-title">Follow Us</h5>
            <div className="social-links style-2">
              <ul>
                <li><Link to="https://www.facebook.com/" target="_blank"><i className="tji-facebook"></i></Link></li>
                <li><Link to="https://www.linkedin.com/" target="_blank"><i className="tji-linkedin"></i></Link></li>
                <li><Link to="https://www.instagram.com/" target="_blank"><i className="tji-instagram"></i></Link></li>
                <li><Link to="https://x.com/" target="_blank"><i className="tji-x-twitter"></i></Link></li>
              </ul>
            </div>
          </div>


        </div>
      </div>

    </>
  );
}