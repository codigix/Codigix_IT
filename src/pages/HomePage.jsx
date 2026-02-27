import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Register right after imports
gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = config.API_BASE_URL;
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
        setClients(Array.isArray(clientsData) ? clientsData : []);
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
            scale: 0.92 - index * 0.01,
            opacity: 0.3,
            scrollTrigger: {
              trigger: cards[index + 1],
              start: `top ${100 + index * 40}px`,
              end: "top 100px",
              scrub: 1.5,
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
    <div className="service-inner">
      <div className="service-content">
        <h3 className="title">
          <Link to="/services/details">{service.title}</Link>
        </h3>

        <p className="desc">{service.desc}</p>

        <ul className="list-style-2">
          <li>Personalized Experience</li>
          <li>Process Automation</li>
          <li>Predictive Analytics</li>
        </ul>

        <Link className="tj-primary-btn" to="/services/details">
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

      <div className="service-img">
        <img
          src={`assets/images/service/${service.image}.jpg`}
          alt={service.title}
        />
      </div>

      <span className="item-count">{service.num}.</span>
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
      {/* Banner Slider */}

      <section className="tj-slider-section">
       
        <Swiper
          modules={[Pagination, Navigation, EffectFade, Autoplay]}
            freeMode={true}
          freeModeMomentum={false}
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
                    src={slide.image}
                    alt="Hero"
                    className="hero-image"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />
                </div>

                <div className="slider-wrapper">
                  <div className="slider-content">
                    <div className="slider-title-area">
                      <span className="sub-title">
                        <i className="tji-subtitle-2"></i>
                        {slide.subtitle}
                      </span>

                      <h1 className="slider-title">{slide.title}</h1>
                    </div>

                    <div className="slider-desc">{slide.description}</div>

                    <div className="slider-btn">
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
                  <span className="client-numbers">2000+</span> Trusted Client
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
                allowTouchMove={false}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                className="client-slider"
              >
                {clients.map((client) => (
                  <SwiperSlide
                    key={client.id}
                    className="client-item"
                    style={{ width: "auto" }}
                  >
                    <div className="client-logo">
                      <img src={client.image} alt="Brand" />
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
                      <span className="counter">13</span>
                      <sup>+</sup>
                    </div>
                    <h6 className="experience-text">
                      We have 10+ Years of working Experiences.
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
                  <img src="assets/images/about/about-img-3.webp" alt="About" />
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
      <section className="tj-project-section section-gap">
        <div className="container">
          <div className="row align-items-center mb-5">
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
          <div className="row row-gap-4">
            {projects.slice(0, 4).map((project, idx) => (
              <div className="col-lg-6" key={project.id}>
                <div
                  className="project-item style-3 wow fadeInUp"
                  data-wow-delay={`.${3 + idx}s`}
                >
                  <div className="project-img">
                    <img
                      src={
                        project.image.startsWith("assets")
                          ? project.image
                          : `assets/images/project/${project.image}.webp`
                      }
                      alt={project.title}
                    />
                  </div>
                  <div className="project-content">
                    <div className="project-desc">
                      <span className="category">{project.category}</span>
                      <h4 className="title">
                        <Link to="/projects/details" style={{ textTransform: 'capitalize' }}>{project.title}</Link>
                      </h4>
                    </div>
                    <Link className="icon-btn" to="/projects/details">
                      <i className="tji-arrow-right"></i>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="tj-pricing-section-2 section-gap section-gap-x section-separator">
        <div className="container">
          <div className="row row-gap-4">
            <div className="col-lg-5">
              <div className="content-wrap sticky-lg-top">
                <div className="sec-heading style-3">
                  <span
                    className="sub-title wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <i className="tji-subtitle-2"></i>Our Pricing
                  </span>
                  <h2 className="sec-title text-anim">
                    Flexible Pricing, Powerful Tangible Results
                  </h2>
                </div>
                <p className="desc">
                  Specialize in delivering AI-powered solution <br />{" "}
                  revolutionize the businesses.
                </p>
                <div className="pricing-tab wow fadeInUp" data-wow-delay="0.3s">
                  <button className="nav-link monthly active">monthly</button>
                  <button className="nav-link yearly">yearly</button>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              {/* {[
                {
                  name: "Basic",
                  price: "20",
                  yearPrice: "30",
                  badge: "50% off",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
                {
                  name: "Pro Plan",
                  price: "60",
                  yearPrice: "90",
                  badge: "Popular",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                  active: true,
                },
                {
                  name: "Premium",
                  price: "90",
                  yearPrice: "120",
                  badge: "Essential",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
              ].map((pricing, idx) => (
                <div
                  className={`pricing-box style-2 ${pricing.active ? "active" : ""} wow fadeInUp`}
                  data-wow-delay={`.${3 + idx}s`}
                  key={idx}
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
                        <span
                          className="price-number"
                          data-year-price={pricing.yearPrice}
                          data-month-price={pricing.price}
                        >
                          {pricing.price}
                        </span>
                        <span
                          className="package-period"
                          data-year-period="/year"
                          data-month-period="/month"
                        >
                          /month
                        </span>
                      </div>
                      <div className="package-desc">
                        <p>{pricing.desc}</p>
                      </div>
                      <div className="pricing-btn">
                        <Link className="text-btn" to="/contact">
                          <span className="btn-text">
                            <span>Chose Package</span>
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
                        <li>
                          <i className="tji-check"></i>AI-powered tools for
                          businesses
                        </li>
                        <li>
                          <i className="tji-check"></i>10 hours of tech support
                        </li>
                        <li>
                          <i className="tji-check"></i>Basic data analysis
                        </li>
                        <li>
                          <i className="tji-check"></i>Email support
                        </li>
                        <li>
                          <i className="tji-check"></i>Access to online
                          resources
                        </li>
                        <li>
                          <i className="tji-check"></i>Reporting & Tutorials
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))} */}
         {isMobile ? (
  <Swiper
    modules={[Pagination]}
    slidesPerView={1}
    spaceBetween={20}
    pagination={{ clickable: true }}
  >{[
                {
                  name: "Basic",
                  price: "20",
                  yearPrice: "30",
                  badge: "50% off",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
                {
                  name: "Pro Plan",
                  price: "60",
                  yearPrice: "90",
                  badge: "Popular",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                  active: true,
                },
                {
                  name: "Premium",
                  price: "90",
                  yearPrice: "120",
                  badge: "Essential",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
              ].map((pricing, idx) => (
      <SwiperSlide key={idx}>
        <PricingCard pricing={pricing} idx={idx} />
      </SwiperSlide>
    ))}
  </Swiper>
) : (
  <div>
    {[
                {
                  name: "Basic",
                  price: "20",
                  yearPrice: "30",
                  badge: "50% off",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
                {
                  name: "Pro Plan",
                  price: "60",
                  yearPrice: "90",
                  badge: "Popular",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                  active: true,
                },
                {
                  name: "Premium",
                  price: "90",
                  yearPrice: "120",
                  badge: "Essential",
                  desc: "Specialize in delivering AI-powered solution revolutionize.",
                },
              ].map((pricing, idx) => (
    
      <div key={idx} className="mb-4">
        <PricingCard pricing={pricing} idx={idx} />
      </div>
    ))}
  </div>
)}
            </div>
          </div>
        </div>
      </section>

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
                        src={
                          blog.image.startsWith("assets")
                            ? blog.image
                            : `assets/images/blog/${blog.image}.webp`
                        }
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
