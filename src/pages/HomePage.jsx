import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SEO from "../components/SEO";
import TestimonialSection from "../components/TestimonialSection";
import {
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/free-mode";


import config from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Register right after imports
gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function HomePage() {


  const [slides, setSlides] = useState([]);
  const [clients, setClients] = useState([]);
  const [workingProcess, setWorkingProcess] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          slidesRes,
          clientsRes,
          processRes,
          servicesRes,
          projectsRes,
          blogsRes,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/slides`),
          fetch(`${API_BASE_URL}/clients`),
          fetch(`${API_BASE_URL}/workingProcess`),
          fetch(`${API_BASE_URL}/services`),
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/blogs`),
        ]);

        const slidesData = slidesRes.ok ? await slidesRes.json() : [];
        const clientsData = clientsRes.ok ? await clientsRes.json() : [];
        const processData = processRes.ok ? await processRes.json() : [];
        const servicesData = servicesRes.ok ? await servicesRes.json() : [];
        const projectsData = projectsRes.ok ? await projectsRes.json() : [];
        const blogsData = blogsRes.ok ? await blogsRes.json() : [];

        setSlides(Array.isArray(slidesData) ? slidesData : []);

        // Use only logos from projects table as requested (remove locally fetched images)
        const projectClients = Array.isArray(projectsData)
          ? projectsData
            .filter(p => p.client_logo)
            .map(p => ({ id: `p-${p.id}`, image: p.client_logo }))
          : [];

        setClients(projectClients);
        setWorkingProcess(Array.isArray(processData) ? processData : []);
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (window.SplitText && document.querySelector(".title-highlight")) {

        const highlightText = new window.SplitText(".title-highlight", {
          type: "lines",
          linesClass: "line",
        });

        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: ".title-highlight",
            scrub: 1,
            start: "top 80%",
            end: "bottom center",
          },
        });

        tl.to(".line", {
          "--highlight-offset": "100%",
          stagger: 0.4,
        });

        window.ScrollTrigger.refresh();

        return () => {
          highlightText.revert();
        };
      }
    }, 500);
  }, []);

  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Safe screen detection (No window error)
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  ///Service-stack
  // old code
  //   const containerRef = useRef(null);
  useGSAP(() => {
    if (!isDesktop || loading || services.length === 0 || !containerRef.current)
      return;

    const cards = gsap.utils.toArray(".service-stack");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 100px",
            endTrigger: cards[cards.length - 1],
            end: "top 100px",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            refreshPriority: 1,
          });

          gsap.to(card, {
            scale: 0.95 - index * 0.01,
            opacity: 1,
            scrollTrigger: {
              trigger: cards[index + 1],
              start: `top ${120 + index * 40}px`,
              end: "top 100px",
              scrub: 1,
            },
          });
        }
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearTimeout(refreshTimer);
    };
  }, { dependencies: [services, loading, isDesktop] });



  useEffect(() => {
    if (loading || slides.length === 0) return;


    const initCounter = () => {
      if (window.jQuery && window.jQuery.fn.counterUp) {
        const counters = window.jQuery(".counter");
        if (counters.length > 0) {
          counters.counterUp({
            delay: 10,
            time: 1000,
          });
        }
      } else {
        setTimeout(initCounter, 100);
      }
    };

    const timer = setTimeout(initCounter, 500);

    return () => {
      clearTimeout(timer);
      // heroSlider.destroy();
      // clientSlider.destroy();
    };
  }, [loading, slides, clients]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint
    };

    handleResize(); // check on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeQuarter, setActiveQuarter] = useState("roadmap-2023-Q1");
  const roadmapRef = useRef(null);
  const cardsParentRef = useRef(null);

  useGSAP(() => {
    if (loading || !roadmapRef.current || isMobile) return;

    const cards = gsap.utils.toArray(".roadmap-card");

    // Pin the left side content
    ScrollTrigger.create({
      trigger: ".content-wrap",
      start: "top 100px",
      endTrigger: ".roadmap-scroll-content",
      end: "bottom 100%",
      pin: true,
      pinSpacing: false,
    });

    // Animate progress line
    gsap.to(".timeline-progress-line", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".roadmap-timeline-nav",
        start: "top 100px",
        endTrigger: ".roadmap-scroll-content",
        end: "bottom 100%",
        scrub: true,
      }
    });

    // Track which card is active and sync nav
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 25%",
        end: "bottom 25%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveQuarter(card.id);

            const navItems = document.querySelectorAll(".quarter-pill");
            const targetNav = navItems[index];
            const navContainer = document.querySelector(".roadmap-timeline-nav");
            const navInner = document.querySelector(".roadmap-nav-inner");
            const parentGroup = targetNav?.closest('.year-nav-group');

            if (targetNav && navContainer && navInner) {
              const navRect = navContainer.getBoundingClientRect();
              const targetRect = targetNav.getBoundingClientRect();
              const innerRect = navInner.getBoundingClientRect();
              
              // Calculate relative offset of the pill from the top of the inner container
              const relativeOffset = targetRect.top - innerRect.top;
              
              // Center the pill in the container:
              // targetY = -(relativeOffset - containerHeight/2 + pillHeight/2)
              const targetY = -(relativeOffset - (navRect.height / 2) + (targetRect.height / 2));
              
              // Don't scroll beyond the top
              const finalY = Math.min(0, targetY);
              navInner.style.transform = `translateY(${finalY}px)`;
            }
          }
        }
      });
    });

    ScrollTrigger.refresh();

  }, { dependencies: [loading, isMobile] });

  const roadmapData = [
    {
      year: "2023",
      quarters: [
        { q: "Q1", title: "Company Launch & Web Services", items: ["Started company operations with Website Design & Development services", "Developed responsive websites using HTML, CSS, JavaScript, and Bootstrap", "Focused on modern UI/UX and business branding websites", "Built foundational development and support team"], icon: "tji-target", counter: "1", plus: "st", dates: "Jan - Mar 2023", color: "blue" },
        { q: "Q2", title: "CMS & WordPress Development", items: ["Expanded services into WordPress and CMS Development", "Developed dynamic business and portfolio websites", "Started eCommerce website development solutions", "Improved hosting, domain, and website maintenance support"], icon: "tji-development", counter: "10", plus: "+", dates: "Apr - Jun 2023", color: "teal" },
        { q: "Q3", title: "UI/UX & Custom Web Solutions", items: ["Added professional UI/UX Designing services", "Built interactive and mobile-friendly web interfaces", "Enhanced frontend performance and responsive architecture", "Started custom website functionality development"], icon: "tji-innovation", counter: "25", plus: "+", dates: "Jul - Sep 2023", color: "yellow" },
        { q: "Q4", title: "eCommerce & Advanced Web Platforms", items: ["Delivered eCommerce and business management websites", "Implemented payment gateway and API integrations", "Strengthened website security and optimization", "Prepared transition toward enterprise software solutions"], icon: "tji-add-cart", counter: "50", plus: "+", dates: "Oct - Dec 2023", color: "purple" }
      ]
    },
    {
      year: "2024",
      quarters: [
        { q: "Q1", title: "ERP Development Journey", items: ["Started ERP Solution Development using React JS and Node.js", "Developed Admin, Sales, Inventory, and HR modules", "Improved backend APIs and database architecture", "Team upgraded skills in MERN stack technologies"], icon: "tji-technology", counter: "100", plus: "+", dates: "Jan - Mar 2024", color: "blue" },
        { q: "Q2", title: "CRM & Business Automation", items: ["Entered CRM Development and workflow automation", "Built customer management and lead tracking systems", "Integrated role-based access and dashboard analytics", "Improved cloud deployment and server management"], icon: "tji-integration", counter: "15", plus: "+", dates: "Apr - Jun 2024", color: "teal" },
        { q: "Q3", title: "Mobile Application Development", items: ["Started Android and iOS Mobile Application Development", "Developed scalable APIs for mobile ecosystems", "Enhanced cross-platform application architecture", "Improved real-time reporting and notification systems"], icon: "tji-phone", counter: "25", plus: "+", dates: "Jul - Sep 2024", color: "yellow" },
        { q: "Q4", title: "Enterprise Software Expansion", items: ["Expanded ERP into Procurement and Production systems", "Developed customized business management solutions", "Strengthened QA testing and DevOps deployment", "Started AI research for automation solutions"], icon: "tji-home", counter: "50", plus: "+", dates: "Oct - Dec 2024", color: "purple" }
      ]
    },
    {
      year: "2025",
      quarters: [
        { q: "Q1", title: "AI-Based Module Development", items: ["Introduced AI-powered business modules", "Developed intelligent analytics and reporting systems", "Implemented automation-based workflows", "Enhanced data-driven decision systems"], icon: "tji-ai", counter: "5", plus: "+", dates: "Jan - Mar 2025", color: "blue" },
        { q: "Q2", title: "Smart CRM & Automation", items: ["Added AI-powered CRM intelligence systems", "Built chatbot and smart customer engagement platforms", "Developed automated document and process management", "Team upgraded skills in AI/ML technologies"], icon: "tji-chat", counter: "10", plus: "+", dates: "Apr - Jun 2025", color: "teal" },
        { q: "Q3", title: "IoT & Smart Device Integration", items: ["Started IoT Device-Based Solution Development", "Integrated ERP systems with smart sensors and devices", "Developed real-time monitoring dashboards", "Implemented smart automation systems"], icon: "tji-signal", counter: "2", plus: "+", dates: "Jul - Sep 2025", color: "yellow" },
        { q: "Q4", title: "AI + IoT Ecosystem", items: ["Combined AI and IoT technologies for intelligent business solutions", "Developed smart manufacturing and tracking systems", "Improved predictive analytics and automation", "Expanded R&D and innovation department"], icon: "tji-innovation", counter: "100", plus: "%", dates: "Oct - Dec 2025", color: "purple" }
      ]
    },
    {
      year: "2026",
      quarters: [
        { q: "Q1", title: "Intelligent Enterprise Platforms", items: ["Advanced AI-integrated ERP ecosystem", "Smart workflow automation systems", "Real-time business intelligence dashboards", "Cloud-native scalable application architecture"], icon: "tji-plane-3", counter: "200", plus: "+", dates: "Jan - Mar 2026", color: "blue" },
        { q: "Q2", title: "SaaS & Enterprise Expansion", items: ["Development of scalable SaaS platforms", "AI-driven enterprise automation solutions", "Multi-platform mobile and web ecosystems", "Advanced cybersecurity and DevOps implementation"], icon: "tji-plane", counter: "15", plus: "K+", dates: "Apr - Jun 2026", color: "teal" },
        { q: "Q3", title: "Future Technology Solutions", items: ["AI Agents for business process automation", "Intelligent ERP and CRM ecosystems", "Industry-specific smart technology solutions", "Advanced cloud and microservice infrastructure"], icon: "tji-robot", counter: "50", plus: "+", dates: "Jul - Sep 2026", color: "yellow", upcoming: true },
        { q: "Q4", title: "Global Digital Transformation Vision", items: ["Expansion into global IT solution markets", "Next-generation AI-powered platforms", "Smart automation and digital transformation services", "Innovation-driven enterprise technology ecosystem"], icon: "tji-rocket", counter: "100", plus: "%", dates: "Oct - Dec 2026", color: "purple", upcoming: true }
      ]
    }
  ];

  const futureScopeData = [
    {
      title: "Website & Digital Experience",
      items: [
        "Advanced interactive business websites",
        "Progressive Web Applications (PWA)",
        "High-performance enterprise portals"
      ],
      icon: "tji-desktop"
    },
    {
      title: "ERP & CRM Solutions",
      items: [
        "Industry-specific ERP ecosystems",
        "AI-powered CRM intelligence systems",
        "Fully automated business workflow platforms"
      ],
      icon: "tji-gear"
    },
    {
      title: "Mobile & Application Development",
      items: [
        "Enterprise mobile ecosystems",
        "Cross-platform scalable applications",
        "Cloud-integrated mobile architecture"
      ],
      icon: "tji-mobile"
    },
    {
      title: "AI & Smart Automation",
      items: [
        "Generative AI integrations",
        "AI Agents and intelligent assistants",
        "Predictive analytics and smart recommendations",
        "Intelligent business process automation"
      ],
      icon: "tji-brain"
    },
    {
      title: "IoT & Smart Technology",
      items: [
        "Smart factory and manufacturing solutions",
        "IoT-integrated ERP systems",
        "Real-time monitoring and tracking systems",
        "Sensor-based automation ecosystems"
      ],
      icon: "tji-lightbulb"
    },
    {
      title: "Team & Technology Growth",
      items: [
        "Continuous technical skill enhancement",
        "AI/ML and cloud certification programs",
        "Innovation-focused development culture",
        "Vertical and horizontal technology expansion"
      ],
      icon: "tji-team"
    }
  ];

  const longTermVision = [
    "Become a leading AI-driven IT solutions company",
    "Deliver scalable digital transformation solutions",
    "Build intelligent enterprise ecosystems",
    "Create innovative platforms for global industries"
  ];

  if (loading) {
    return (
      <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  // Common Card Component to keep code DRY
  const ServiceCard = ({ service }) => (
    <div className="service-inner bg-white dark:bg-[#18133b]">
      <div className="service-content">
        <h3 className="title">
          <Link to={`/services/details/${service.id}`} className="text-gray-900 text-lg dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-bold">{service.title}</Link>
        </h3>

        <p className="desc text-gray-700 dark:text-gray-300 font-medium">{service.desc}</p>

        <ul className="list-style-2 text-gray-800 dark:text-gray-200">
          <li>Personalized Experience</li>
          <li>Process Automation</li>
          <li>Predictive Analytics</li>
        </ul>

        <Link className="tj-primary-btn" to={`/services/details/${service.id}`}>
          <div className="btn-inner">
            <span className="btn-icon h-icon">
              <i className="tji-arrow-right"></i>
            </span>
            <span className="btn-text">Learn More</span>
            <span className="btn-icon">
              <i className="tji-arrow-right"></i>
            </span>
          </div>
        </Link>
      </div>

      <div className="service-img rounded-xl overflow-hidden shadow-lg ">
        <img
          src={getImageUrl(service.image, "assets/images/service")}
          alt={service.title}
          className="w-full h-64 object-cover"
        />
      </div>

      <span className="item-count text-gray-400 dark:text-gray-500">{service.num}.</span>
    </div>
  );
  const PricingCard = ({ pricing, idx }) => (
    <div
      className={`pricing-box style-2 ${pricing.active ? "active" : ""}`}
    >
      <div className="pricing-box-inner">
        <div className="pricing-badge">
          <span>
            <span>{pricing.badge}</span>
          </span>
        </div>

        <div className="pricing-header">
          <h6 className="package-name">{pricing.name}</h6>

          <div className="package-price">
            <span className="package-currency">$</span>
            <span className="price-number">{pricing.price}</span>
            <span className="package-period">/month</span>
          </div>

          <div className="package-desc">
            <p>{pricing.desc}</p>
          </div>

          <div className="pricing-btn">
            <Link className="text-btn" to="/contact">
              <span className="btn-text">
                <span>Choose Package</span>
              </span>
              <span className="btn-icon">
                <i className="tji-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>

        <div className="list-style-3">
          <h6 className="title">Included:</h6>
          <ul>
            <li><i className="tji-check"></i>AI-powered tools</li>
            <li><i className="tji-check"></i>10 hours support</li>
            <li><i className="tji-check"></i>Basic data analysis</li>
            <li><i className="tji-check"></i>Email support</li>
          </ul>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <SEO
        title="Home"
        description="Empowering businesses with AI-powered solutions. Codigix offers custom software engineering, machine learning, and predictive analytics."
        keywords="home, AI solutions, software engineering, digital transformation"
      />
      <style>
        {`
          .service-item.style-3 .service-inner {
            background-color: #ffffff !important;
          }
          .dark .service-item.style-3 .service-inner {
            background-color: #07022a !important;
          }
          .list-style-2 li {
            color: var(--tj-color-text-body) !important;
            opacity: 1 !important;
            font-weight: 500;
          }
          .list-style-2 li::before {
            background-color: var(--tj-color-theme-primary) !important;
            opacity: 1 !important;
          }
          .service-item.style-3 .item-count {
            background-color: #f8f7ff !important;
            color: #6c56b6 !important;
           
            font-weight: bold;
          }
          .dark .service-item.style-3 .item-count {
            background-color: #18133b !important;
            color: #6c56b6 !important;
          }
        `}
      </style>
      {/* Banner Slider */}

      <section className="tj-slider-section">

        <Swiper
          modules={[Pagination, Navigation, EffectFade, Autoplay]}
          slidesPerView={1}
          spaceBetween={0}
          effect="fade"
          loop={true}
          speed={1400}
          autoplay={false}
          navigation={{
            nextEl: ".slider-next",
            prevEl: ".slider-prev",
          }}
          pagination={{
            el: ".hero-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">0${index + 1}</span>`;
            },
          }}
          className="hero-slider"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="tj-slider-item">
                <div className="slider-bg-image">
                  <img
                    src={getImageUrl(slide.image)}
                    alt="Hero"
                    className="hero-image"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />
                </div>

                <div className="slider-wrapper">
                  <div className="slider-content grid grid-cols-3">
                    <div className="col-span-3">
                      <div className="slider-title-area text-center ">
                        <span className="sub-title">
                          <i className="tji-subtitle-2"></i>
                          {slide.subtitle}
                        </span>

                        <h1 className="slider-title text-center">{slide.title}</h1>
                      </div>

                      <div className="slider-desc text-center">{slide.description}</div>

                      <div className="slider-btn text-center">
                        <Link
                          className="tj-primary-btn home-button"
                          to="/contact"
                        >
                          <div className="btn-inner">
                            <span className="btn-icon h-icon">
                              <i className="tji-arrow-right"></i>
                            </span>
                            <span className="btn-text">Learn More</span>
                            <span className="btn-icon">
                              <i className="tji-arrow-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation */}
          <div className="hero-navigation">
            <div className="slider-prev">
              <span className="anim-icon">
                <i className="tji-arrow-left-long"></i>
                <i className="tji-arrow-left-long"></i>
              </span>
            </div>

            <div className="slider-next">
              <span className="anim-icon">
                <i className="tji-arrow-right-long"></i>
                <i className="tji-arrow-right-long"></i>
              </span>
            </div>
          </div>

          {/* Pagination */}
          <div className="swiper-pagination hero-pagination"></div>
        </Swiper>
      </section>



      {/* Client Section */}
      <section
        id="client"
        className="tj-client-section section-gap wow fadeInUp"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="client-content wow fadeInUp" data-wow-delay=".3s">
                <h5 className="sec-title">
                  <span className="client-numbers">10+</span> Trusted Client
                  over the World
                </h5>
              </div>

              <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView="auto"
                spaceBetween={30}
                loop={true}
                speed={8000}
                freeMode={true}
                freeModeMomentum={false}
                allowTouchMove={true}
                grabCursor={true}
                watchSlidesProgress={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="client-slider"
              >
                {[...clients, ...clients, ...clients].map((client, index) => (
                  <SwiperSlide
                    key={`${client.id}-${index}`}
                    className="client-item"
                    style={{ width: "auto" }}
                  >
                    <div className="client-logo">
                      <img
                        src={getImageUrl(client.image)}
                        alt="Brand"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      <div className="tj-working-process-2 section-gap section-gap-x">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered style-3">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                  <i className="tji-subtitle-2"></i>How Its Work
                </span>
                <h2 className="sec-title text-anim">
                  Building Success, One Step at a Time
                </h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {workingProcess.map((process, idx) => (
              <div className="col-lg-4" key={process.id}>
                <div
                  className="process-item-wrap style-2 wow fadeInUp"
                  data-wow-delay={`${0.3 + idx * 0.1}s`}
                >
                  <div className="process-item">
                    <div className="process-icon">
                      <span>
                        <i className={process.icon}></i>
                      </span>
                    </div>
                    <div className="process-content">
                      <h4 className="title">{process.title}</h4>
                      <p className="desc">{process.desc}</p>
                    </div>
                    <div className="process-step">
                      <span>Step {process.step}.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="tj-about-section-3 section-gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="about-content-area style-3">

                <div className="sec-heading style-3">
                  <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                    <i className="tji-subtitle-2"></i>About our Company
                  </span>
                  <h2 className="sec-title title-highlight" >
                    Driving Innovations Through Our and Technology, Delivering
                    Our Expert Solutions are Best that Transform Businesses.
                  </h2>
                  {/* <TitleHighlight>
  Driving Innovations Through Our and Technology, Delivering Our Expert
  Solutions are Best that Transform Businesses.
</TitleHighlight> */}

                </div>
                <div className="about-bottom-area-3">
                  <div className="experience-wrap">
                    <div className="experience-year">
                      <span className="counter">3</span>
                      <sup>+</sup>
                    </div>
                    <h6 className="experience-text">
                      We have 3+ Years of working Experiences.
                    </h6>
                  </div>
                  <div className="about-content">
                    <p className="desc">
                      Our team of experts combines innovation, and strategy to
                      deliver custom AI-driven tools and services empower
                      transformation.
                    </p>
                    <ul className="list-style-1 home-list-style text-white">
                      <li>Artificial Intelligence</li>
                      <li>Identity Management</li>
                      <li>Local Insights</li>
                      <li>Business Analytics</li>
                    </ul>
                    <Link className="tj-primary-btn" to="/about">
                      <div className="btn-inner">
                        <span className="btn-icon h-icon">
                          <i className="tji-arrow-right"></i>
                        </span>
                        <span className="btn-text">Read More</span>
                        <span className="btn-icon">
                          <i className="tji-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-img-area-2">
                <div
                  className="about-img wow fadeInLeft"
                  data-wow-delay=".3s"
                  data-wow-duration="0.8s"
                >
                  <img src="https://res.cloudinary.com/foodfantacy/image/upload/v1778322898/person-working-with-ai-robot_ytu1wo.jpg" alt="About" />
                </div>
                <div className="video-wrap">
                  <a
                    className="video-btn video-popup"
                    data-autoplay="true"
                    data-vbtype="video"
                    data-maxwidth="1200px"
                    href="https://www.youtube.com/watch?v=MLpWrANjFbI&ab_channel=eidelchteinadvogados"
                  >
                    <span className="video-text">Let's See How we did it.</span>
                    <span className="video-icon">
                      <i className="tji-play"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="tj-service-section section-gap section-gap-x">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered style-3">
                <span className="sub-title">
                  <i className="tji-subtitle-2"></i>Our Best Services
                </span>
                <h2 className="sec-title">Explore Our Services</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="service-wrapper-main mb-40" ref={containerRef}>

                {isDesktop ? (
                  //  DESKTOP – GSAP STACK
                  services.map((service) => (
                    <div
                      className="service-item style-3 service-stack"
                      key={service.id}
                    >
                      <ServiceCard service={service} />
                    </div>
                  ))
                ) : (
                  //  MOBILE/TABLET – SWIPER
                  <div className="swiper-container-wrapper">
                    <Swiper
                      modules={[Pagination, Navigation, Autoplay]}
                      spaceBetween={20}
                      slidesPerView={1}
                      loop={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      pagination={{
                        clickable: true,
                        el: ".swiper-pagination-custom",
                      }}
                      navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                      }}
                      breakpoints={{
                        768: { slidesPerView: 2 },
                      }}
                      className="service-swiper"
                    >
                      {services.map((service) => (
                        <SwiperSlide key={service.id}>
                          <div className="service-item style-3">
                            <ServiceCard service={service} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="swiper-controls">
                      <div className="swiper-button-prev-custom">
                        <i className="tji-arrow-left"></i>
                      </div>
                      <div className="swiper-pagination-custom"></div>
                      <div className="swiper-button-next-custom">
                        <i className="tji-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        <div className="service-bottom-btn">
          <Link className="text-btn" to="/services">
            <span className="btn-text">
              <span>More Services</span>
            </span>
            <span className="btn-icon">
              <span>
                <i className="tji-arrow-down"></i>
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* Project Section */}
      <section className="tj-project-section section-gap ">
        <div className="">
          <div className="row align-items-center mb-5 container m-auto">
            <div className="col-lg-7">
              <div className="sec-heading style-3">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                  <i className="tji-subtitle-2"></i>PROUD PROJECTS
                </span>
                <h2 className="sec-title text-anim">
                  Breaking Boundaries, Building Dreams.
                </h2>
              </div>
            </div>
            <div className="col-lg-5">
              <div
                className="slider-btn text-lg-end wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <Link className="tj-primary-btn" to="/projects">
                  <div className="btn-inner">
                    <span className="btn-icon h-icon">
                      <i className="tji-arrow-right"></i>
                    </span>
                    <span className="btn-text">Explore More</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={6000}
            freeMode={true}
            freeModeMomentum={false}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="project-slider pb-50"
          >
            {[...projects, ...projects, ...projects].map((project, idx) => (
              <SwiperSlide key={`${project.id}-${idx}`}>
                <div class="project-item">
                  <div class="project-img">
                    <img
                      src={getImageUrl(project.image, "assets/images/project")}
                      alt={project.title}
                      className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div class="project-content">
                    <h4 class="title">
                      <Link to={`/projects/details/${project.id}`}>{project.title}</Link>
                    </h4>
                    <p className="line-clamp-2">
                      {project.overview || 'Specialize in delivering AI-powered solution revolutionize the way businesses operate by leveraging the latest technology.'}
                    </p>
                    <Link to={`/projects/details/${project.id}`} class="icon-btn" >
                      <i class="tji-arrow-right-long"></i>
                    </Link>
                  </div>
                  <span class="categories">
                    <Link to={`/projects/details/${project.id}`}>{project.category || 'Software'}</Link>
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Roadmap Section */}
      <section ref={roadmapRef} className="tj-roadmap-section section-gap section-gap-x section-separator">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered style-3 mb-10">
                <span
                  className="sub-title wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <i className="tji-subtitle-2"></i>Our Roadmap
                </span>
                <h2 className="sec-title text-anim">
                  Evolution of Excellence: Our Journey
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <div className="content-wrap">
                <div className="roadmap-timeline-nav wow fadeInUp" data-wow-delay="0.4s">
                  <div className="timeline-progress-line"></div>
                  <div className="roadmap-nav-inner">
                    {roadmapData.map((yearGroup) => (
                      <div key={yearGroup.year} className="year-nav-group relative ">
                        <div className="year-badge-wrap flex items-center mb-6">
                          <div className={`year-badge-circle ${['2024', '2026'].includes(yearGroup.year) ? 'teal' : 'blue'} border-1 border mb-3 text-xl flex items-center justify-center rounded w-20 h-20 bg-white dark:bg-gray-900 z-10`}>
                            {yearGroup.year}
                          </div>
                          {/* <div className="year-line-horizontal h-[2px] w-8 bg-gray-200 dark:bg-gray-700 ml-[-2px]"></div> */}
                        </div>

                        <div className="quarter-nav-list flex flex-col gap-7 relative">
                          <div className="year-line-vertical absolute left-[39px] top-[-30px] bottom-[-20px] w-[3px] bg-[#312e81]"></div>

                          {yearGroup.quarters.map((q) => (
                            <div key={`${yearGroup.year}-${q.q}`} className="pill-item-wrap relative flex items-center">
                              {/* <div className="pill-connector-line h-[2px] w-10 bg-[#312e81] absolute left-[40px]"></div> */}
                              <a
                                href={`#roadmap-${yearGroup.year}-${q.q}`}
                                className={`quarter-pill relative flex items-center gap-3 p-1 pr-6 rounded transition-all duration-300 ml-20 ${activeQuarter === `roadmap-${yearGroup.year}-${q.q}` ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const cardId = `roadmap-${yearGroup.year}-${q.q}`;
                                  setActiveQuarter(cardId);
                                  const target = document.getElementById(cardId);
                                  if (target) {
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = target.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - 100;

                                    window.scrollTo({
                                      top: offsetPosition,
                                      behavior: 'smooth'
                                    });
                                  }
                                }}
                              >
                                <div className="pill-q-circle w-12 h-12 rounded flex items-center justify-center transition-transform duration-300">
                                  {q.q}
                                </div>
                                <div className="pill-text flex flex-col">
                                  <span className="pill-title leading-tight">{q.dates}</span>
                                  <span className="pill-dates text-xs opacity-70"> Quarter {q.q.replace('Q', '')}</span>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="roadmap-scroll-content">
                {roadmapData.map((yearGroup) => (
                  <div key={yearGroup.year} className="year-content-group mb-4">
                    {yearGroup.quarters.map((q) => (
                      <div
                        key={`${yearGroup.year}-${q.q}`}
                        id={`roadmap-${yearGroup.year}-${q.q}`}
                        className={`roadmap-card grid grid-cols-1 gap-5  countup-item-wrap style-2 ${activeQuarter === `roadmap-${yearGroup.year}-${q.q}` ? 'active' : ''}`}
                      >
                        <div className="countup-item style-1 relative">
                          {q.upcoming && (
                            <div className="upcoming-badge absolute top-4 left-4 w-fit right-4 bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                              Upcoming
                            </div>
                          )}
                          <div className="inline-content">
                            <span className="counter">{q.counter}</span>
                            <span className="count-plus">{q.plus}</span>
                          </div>
                          <span className="count-text">{q.title}</span>

                          {q.items && (
                            <ul className="roadmap-specs-list space-y-2 mt-4 text-left">
                              {q.items.map((item, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <i className="tji-check text-indigo-500 mt-1 flex-shrink-0"></i>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <span className="count-icon">
                            <i className={q.icon}></i>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
           <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered style-3 mb-50">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                  <i className="tji-subtitle-2"></i>Future Scope & Vision
                </span>
                <h2 className="sec-title text-anim">
                  Innovating for Tomorrow
                </h2>
              </div>
            </div>
          </div>

          <div className="row mt-50">
            <div className="col-12">
              <div className="vision-box-wrap wow fadeInUp" data-wow-delay="0.4s">
                <div className="vision-box-inner">
                  <div className="vision-left-content">
                    <div className="vision-label">Our Philosophy</div>
                    <h3 className="vision-title">Long-Term Vision</h3>
                    <p className="vision-subtitle">Pioneering the future of digital intelligence with sustainable and scalable innovation.</p>
                  </div>
                  <div className="vision-right-items">
                    <div className="vision-items-grid">
                      {longTermVision.map((vision, idx) => (
                        <div key={idx} className="vision-card">
                          <div className="vision-card-icon">
                            <i className="tji-stars"></i>
                          </div>
                          <span className="vision-card-text">{vision}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Blog Section */}
      <section className="tj-blog-section-3 section-gap section-separator">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered style-3">
                <span className="sub-title">
                  <i className="tji-subtitle-2"></i>Recent Blogs
                </span>
                <h2 className="sec-title">The Minds Behind Blog and News</h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {blogs.map((blog, idx) => (
              <div className="col-xl-4 col-md-6" key={blog.id}>
                <div
                  className="blog-item style-3 wow fadeInUp"
                  data-wow-delay={`.${3 + idx}s`}
                >
                  <div className="blog-thumb">
                    <Link to="/blog/details">
                      <img
                        src={getImageUrl(blog.image, "assets/images/blog")}
                        alt="Blog"
                      />
                    </Link>
                    <span className="categories">
                      <Link to="/blog/details">{blog.category}</Link>
                    </span>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>
                        By{" "}
                        <Link to="/blog/details">{blog.author || "Admin"}</Link>
                      </span>
                      <span>{blog.date}</span>
                    </div>
                    <h4 className="title">
                      <Link to="/blog/details">{blog.title}</Link>
                    </h4>
                    <Link className="text-btn" to="/blog/details">
                      <span className="btn-text">
                        <span>Read More</span>
                      </span>
                      <span className="btn-icon">
                        <span>
                          <i className="tji-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
