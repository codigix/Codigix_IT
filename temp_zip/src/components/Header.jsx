import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <>
        <header className="header-area header-3 header-absolute">
          <div className="header-top style-2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="header-top-content">
                    <p className="topbar-text"><i className="tji-idea"></i>Innovating Tomorrow, Today <Link to="/contact">Click here</Link></p>
                    <div className="header-info">
                      <div className="info-item">
                        <span><i className="tji-envelop-2"></i></span>
                        <a href="mailto:hello@codigix.com">hello@codigix.com</a>
                      </div>
                      <div className="info-item">
                        <span><i className="tji-phone-2"></i></span>
                        <a href="tel:8089091313">808-909-1313</a>
                      </div>
                      <div className="info-item">
                        <div className="social-links">
                          <ul>
                            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">FB</a></li>
                            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">IN</a></li>
                            <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LN</a></li>
                            <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer">TW</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="header-wrapper">
                    <div className="site_logo">
                      <Link className="logo" to="/"><img src="assets/images/logos/logo.png" alt="Codigix Logo" /></Link>
                    </div>

                    <div className="menu-area d-none d-lg-inline-flex align-items-center">
                      <nav id="mobile-menu" className="mainmenu">
                        <ul>
                          <li className="current-menu-ancestor"><Link to="/">Home</Link></li>
                          <li><Link to="/about">About Us</Link></li>
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
                          </li>
                          <li className="has-dropdown"><Link to="/blog">Blog</Link>
                            <ul className="sub-menu">
                              <li><Link to="/blog">Blog</Link></li>
                              <li><Link to="/blog/details">Blog Details</Link></li>
                            </ul>
                          </li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                      </nav>
                    </div>

                    <div className="header-right-item d-lg-inline-flex d-none">
                      <div className="header-search">
                        <button className="search">
                          <i className="tji-search"></i> Search
                        </button>
                      </div>
                      <div className="menu_bar menu_offcanvas d-lg-inline-flex d-none">
                        <span></span>
                        <span></span>
                      </div>
                    </div>

                    <div className="menu_bar mobile_menu_bar d-lg-none">
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

        <header className="header-area header-3 header-duplicate header-sticky">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src="/assets/images/logos/logo.png" alt="Logo" /></Link>
                  </div>

                  <div className="menu-area d-none d-lg-inline-flex align-items-center">
                    <nav className="mainmenu">
                      <ul>
                     <li className="current-menu-ancestor"><Link to="/">Home</Link></li>
                      <li><Link to="/about">About Us</Link></li>
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
                        </li>
                        <li className="has-dropdown"><Link to="/blog">Blog</Link>
                          <ul className="sub-menu">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/blog/details">Blog Details</Link></li>
                          </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item d-none d-lg-inline-flex">
                    <div className="header-search">
                      <button className="search">
                        <i className="tji-search"></i> Search
                      </button>
                    </div>
                    <div className="menu_bar menu_offcanvas d-lg-inline-flex d-none">
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <div className="menu_bar mobile_menu_bar d-lg-none">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <header className="header-area header-2">
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src="/assets/images/logos/logo.png" alt="Logo" /></Link>
                  </div>

                  <div className="menu-area d-none d-lg-inline-flex align-items-center">
                    <nav id="mobile-menu" className="mainmenu">
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
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
                        </li>
                        <li className="has-dropdown"><Link to="/blog">Blog</Link>
                          <ul className="sub-menu">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/blog/details">Blog Details</Link></li>
                          </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item d-none d-lg-inline-flex">
                    <div className="header-search">
                      <button className="search">
                        <i className="tji-search"></i> Search
                      </button>
                    </div>
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

                  <div className="menu_bar mobile_menu_bar d-lg-none">
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

      <header className="header-area header-2 header-duplicate header-sticky">
        <div className="header-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="header-wrapper">
                  <div className="site_logo">
                    <Link className="logo" to="/"><img src="assets/images/logos/logo.png" alt="Codigix Logo" /></Link>
                  </div>

                  <div className="menu-area d-none d-lg-inline-flex align-items-center">
                    <nav className="mainmenu">
                      <ul>
                        <li className="has-dropdown"><Link to="/">Home</Link>
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
                        </li>
                        <li className="has-dropdown"><Link to="/about">Pages</Link>
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
                        </li>
                        <li className="has-dropdown"><Link to="/blog">Blog</Link>
                          <ul className="sub-menu">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/blog/details">Blog Details</Link></li>
                          </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="header-right-item d-none d-lg-inline-flex">
                    <div className="header-search">
                      <button className="search">
                        <i className="tji-search"></i> Search
                      </button>
                    </div>
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

                  <div className="menu_bar mobile_menu_bar d-lg-none">
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
    </>
  );
}
