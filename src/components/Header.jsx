import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPopup from './SearchPopup';
import HamburgerMenu from './HamburgerMenu';
import ThemeToggle from './ThemeToggle';
import config from '../config';

const getImageUrl = config.getImageUrl;

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isHome) {
    return (
      <>
        <header className="header-area header-3 header-absolute">
          {/* <div className='top-gap-75'> */}
          <div className="header-top style-2">
            <div className="w-full px-4">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="header-top-content">
                    <p className="topbar-text"><i className="tji-idea"></i>Innovating Tomorrow, Today <Link to="/contact" aria-label="Contact us to learn more about our innovations" className="text-white hover:text-gray-200 underline">Contact Us</Link></p>
                    <div className="header-info">
                      <div className="info-item">
                        <span><i className="tji-envelop-2"></i></span>
                        <a href="mailto:info@codigixinfotech.com" aria-label="Send us an email at info@codigixinfotech.com">info@codigixinfotech.com</a>
                      </div>
                      <div className="info-item">
                        <span><i className="tji-phone-2"></i></span>
                        <a href="tel:+91 9112706604" aria-label="Call us at +91 9112706604">+91 9112706604</a>
                      </div>
                      <div className="info-item">
                        <div className="social-links">
                          <ul>
                            <li><a href="https://www.facebook.com/codigix.infotech" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">FB</a></li>
                            <li><a href="https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">IN</a></li>
                            <li><a href="https://www.linkedin.com/company/codigix-infotech" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">LN</a></li>
                            <li><a href="https://x.com/CodigixI2994" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)">TW</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="header-bottom">
            <div className="w-full px-4">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="header-wrapper">
                    <div className="site_logo">
                      <Link className="logo" to="/"><img src={getImageUrl("/assets/images/logos/logo.png")} alt="Codigix Logo" width="160" height="60" loading="lazy" /></Link>
                    </div>

                    <div className="menu-area hidden lg:inline-flex items-center">
                      <nav id="mobile-menu" className="mainmenu">
                        <ul>
                          <li className="current-menu-ancestor"><Link to="/">Home</Link></li>
                          <li><Link to="/about">About Us</Link></li>
                          {/* <li className="has-dropdown"><Link to="/services">Services</Link> */}
                          <li ><Link to="/services">Services</Link>
                            {/* <ul className="sub-menu">
                              <li><Link to="/services">Services</Link></li>
                              <li><Link to="/services/details">Services Details</Link></li>
                            </ul> */}
                          </li>
                          {/* <li className="has-dropdown"><Link to="/projects">Projects</Link> */}
                          <li><Link to="/projects">Projects</Link>
                            {/* <ul className="sub-menu">
                              <li><Link to="/projects">Projects</Link></li>
                              <li><Link to="/projects/details">Project Details</Link></li>
                            </ul> */}
                          </li>
                          <li><Link to="/blog">Blog</Link></li>
                          <li><Link to="/careers">Careers</Link></li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                      </nav>
                    </div>

                    <div className="header-right-item lg:inline-flex hidden">
                      <ThemeToggle className="mr-3" />
                      <div
                        className="menu_bar menu_offcanvas lg:inline-flex hidden"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open offcanvas menu"
                        role="button"
                        tabIndex="0"
                      >
                        <span></span>
                        <span></span>
                      </div>
                    </div>

                    <ThemeToggle className="lg:hidden mr-2" />
                    <div
                      className="menu_bar mobile_menu_bar lg:hidden"
                      onClick={() => setMenuOpen(true)}
                      aria-label="Open mobile menu"
                      role="button"
                      tabIndex="0"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <header className={`header-area header-3 header-duplicate header-sticky ${isSticky ? 'sticky' : ''}`}>
          <div className="w-full px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src={getImageUrl("assets/images/logos/logo.png")} alt="Logo" width="160" height="60" loading="lazy" /></Link>
                  </div>

                  <div className="menu-area hidden lg:inline-flex items-center">
                    <nav className="mainmenu">
                      <ul>
                        <li className="current-menu-ancestor"><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        {/* <li className="has-dropdown"><Link to="/services"></Link>
                          <ul className="sub-menu">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/services/details">Services DServicesetails</Link></li>
                          </ul>
                        </li> */}
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        {/* <li className="has-dropdown"><Link to="/projects">Projects</Link>
                          <ul className="sub-menu">
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/projects/details">Project Details</Link></li>
                          </ul>
                        </li> */}
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item hidden lg:inline-flex">
                    <ThemeToggle className="mr-3" />

                    <div
                      className="menu_bar menu_offcanvas lg:inline-flex hidden"
                      onClick={() => setMenuOpen(true)}
                      aria-label="Open offcanvas menu"
                      role="button"
                      tabIndex="0"
                    >
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <div className="menu_bar mobile_menu_bar lg:hidden"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open mobile menu"
                  role="button"
                  tabIndex="0">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* ===== SEARCH POPUP ===== */}
        <SearchPopup
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
        <HamburgerMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </>

    );
  }

  return (
    <>
      <header className="header-area header-2">
        <div className="header-bottom">
          <div className="w-full px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src={getImageUrl("assets/images/logos/logo.png")} alt="Logo" width="160" height="60" loading="lazy" /></Link>
                  </div>

                  <div className="menu-area hidden lg:inline-flex items-center">
                    <nav id="mobile-menu" className="mainmenu">
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        {/* <li className="has-dropdown"><Link to="/services">Services</Link>
                          <ul className="sub-menu">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/services/details">Services Details</Link></li>
                          </ul>
                        </li> */}
                        {/* <li className="has-dropdown"><Link to="/projects">Projects</Link>
                          <ul className="sub-menu">
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/projects/details">Project Details</Link></li>
                          </ul>
                        </li> */}
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                       <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item hidden lg:inline-flex">
                    <ThemeToggle className="mr-3" />
                    <div className="header-button">
                      <Link className="tj-primary-btn" to="/contact">
                        <div className="btn-inner">
                          <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                          <span className="btn-text">Get In Touch</span>
                          <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="menu_bar mobile_menu_bar lg:hidden"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open mobile menu"
                  role="button"
                  tabIndex="0">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className={`header-area header-2 header-duplicate header-sticky ${isSticky ? 'sticky' : ''}`}>
        <div className="header-bottom">
          <div className="w-full px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src="/assets/images/logos/logo.png" alt="Codigix Logo" width="160" height="60" loading="lazy" /></Link>
                  </div>

                  <div className="menu-area hidden lg:inline-flex items-center">
                    <nav className="mainmenu">
                      <ul>
                        {/* <li className="has-dropdown"><Link to="/">Home</Link>
                          <ul className="sub-menu">
                            <li><Link to="/">Home 01</Link></li>
                            <li><a href="#">Home 02</a></li>
                            <li><a href="#">Home 03</a></li>
                            <li><a href="#">Home 04</a></li>
                            <li><a href="#">Home 05</a></li>
                            <li><a href="#">Home 06</a></li>
                            <li><a href="#">Home 07</a></li>
                            <li><a href="#">Home 08</a></li>
                          </ul>
                        </li> */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        {/* <li className="has-dropdown"><Link to="/about">Pages</Link>
                          <ul className="sub-menu">
                            <li><Link to="/about">About Us</Link></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Team Details</a></li>
                            <li><a href="#">Faq</a></li>
                            <li><a href="#">Pricing Page</a></li>
                            <li><a href="#">Error 404</a></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><Link to="/services">Services</Link>
                          <ul className="sub-menu">
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/services/details">Services Details</Link></li>
                          </ul>
                        </li>
                        <li className="has-dropdown"><Link to="/projects">Projects</Link>
                          <ul className="sub-menu">
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/projects/details">Project Details</Link></li>
                          </ul>
                        </li> */}
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item hidden lg:inline-flex">
                    <ThemeToggle className="mr-3" />
                    <div className="header-button">
                      <Link className="tj-primary-btn" to="/contact">
                        <div className="btn-inner">
                          <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                          <span className="btn-text">Get In Touch</span>
                          <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* <div
                    className="menu_bar menu_offcanvas lg:inline-flex hidden"
                    onClick={() => setMenuOpen(true)}
                  >
                    <span></span>
                    <span></span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* ===== SEARCH POPUP ===== */}
      <SearchPopup
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
