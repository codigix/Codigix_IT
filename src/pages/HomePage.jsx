import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import {
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
  FreeMode,
} from "swiper/modules";

import config from "../config";

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
    if (loading || slides.length === 0) return;

    const heroSlider = new Swiper(".hero-slider", {
      modules: [Pagination, Navigation, EffectFade, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      effect: "fade",
      loop: true,
      speed: 1400,
      autoplay: {
        delay: 4000,
      },
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + '">' + "0" + (index + 1) + "</span>"
          );
        },
      },
    });

    const clientSlider = new Swiper(".client-slider", {
      modules: [Autoplay],
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: true,
      speed: 10000,
      allowTouchMove: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
    });

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
      heroSlider.destroy();
      clientSlider.destroy();
    };
  }, [loading, slides, clients]);

  if (loading) {
    return (
      <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Banner Slider */}
      <section className="tj-slider-section">
        <div className="swiper hero-slider">
          <div className="swiper-wrapper">
            {slides.map((slide) => (
              <div className="swiper-slide tj-slider-item" key={slide.id}>
                <div
                  className="slider-bg-image"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
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
                      <Link className="tj-primary-btn home-button"  to="/contact">
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
            ))}
          </div>
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
          <div className="swiper-pagination hero-pagination"></div>
        </div>
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
              <div className="swiper client-slider">
                <div className="swiper-wrapper">
                  {clients.map((client) => (
                    <div className="swiper-slide client-item" key={client.id}>
                      <div className="client-logo">
                        <img src={client.image} alt="Brand" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  <h2 className="sec-title title-highlight">
                    Driving Innovations Through Our and Technology, Delivering
                    Our Expert Solutions are Best that Transform Businesses.
                  </h2>
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
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s">
                  <i className="tji-subtitle-2"></i>Our Best Services
                </span>
                <h2 className="sec-title text-anim">Explore Our Services</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {services.map((service, idx) => (
                <div
                  className="service-wrapper mb-40 wow fadeInUp"
                  data-wow-delay=".4s"
                  key={service.id}
                >
                  <div className="service-item style-3 service-stack">
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
                    </div>
                    <span className="item-count">{service.num}.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> 

      {/* Project Section */}
      <section className="tj-project-section section-gap">
        <div className="container">
          <div className="row align-items-center mb-15">
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
                        <Link to="/projects/details">{project.title}</Link>
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
      <section className="tj-pricing-section-2 section-gap">
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
              ))}
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
