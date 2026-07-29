import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function AboutPage() {
  const [achievements, setAchievements] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, teamRes] = await Promise.all([
          fetch(`${API_BASE_URL}/achievements`),
          fetch(`${API_BASE_URL}/team`),
        ]);
        const [achData, teamData] = await Promise.all([
          achRes.json(),
          teamRes.json(),
        ]);
        setAchievements(Array.isArray(achData) ? achData : []);
        setTeam(Array.isArray(teamData) ? teamData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && window.Swiper) {
      new window.Swiper(".marquee-slider", {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        centeredSlides: true,
        loop: true,
        speed: 7000,
        allowTouchMove: false,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        exactTitle={true}
        title="About Codigix Infotech | Software Company in Pune & PCMC" 
        ogTitle="About Software Company in Pune | Codigix Infotech"
        description="Codigix Infotech is a Pune-based software development company in PCMC delivering AI ERP systems, CRM software, IoT solutions, custom web development services."
        keywords="software company in Pune, IT company PCMC, software development company Pimpri Chinchwad, ERP company Pune, CRM software company Pune, custom software company Pune, IT services Pune Hinjewadi"
        canonical="https://codigixinfotech.com/about"
        ogType="website"
      >
        <meta property="og:description" content="Learn about Codigix Infotech, a trusted software development company serving Pune, PCMC, Hinjewadi, Wakad & Baner." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://codigixinfotech.com/about#page",
            "url": "https://codigixinfotech.com/about",
            "name": "About Codigix Infotech",
            "description": "Learn about Codigix Infotech, a software development company in Pune & PCMC specializing in AI ERP, CRM software, IoT solutions, and web development.",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://codigixinfotech.com/#website"
            },
            "about": {
              "@type": "Organization",
              "name": "Codigix Infotech",
              "url": "https://codigixinfotech.com/"
            }
          })}
        </script>
      </SEO>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: `url(${getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1778342361/0015_lf398t.jpg")})`}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-full px-4">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">About Us</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-about-section-2 section-gap-top section-gap-x">
        <div className="about-wrapper">
          <div className="about-area">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="about-content-area style-2">
                    <div className="sec-heading style-2">
                      <span className="sub-title wow fadeInUp" data-wow-delay=".3s">Explore Our Services</span>
                      <h2 className="sec-title text-anim">Driving Innovation Through AI and New Technology, Delivering Tailored</h2>
                    </div>
                    <div className="about-bottom-area-2">
                      <div className="company-logo wow fadeInLeft" data-wow-delay=".3s">
                        <img src={getImageUrl("/assets/images/logos/logo.png")} alt="Codigix Logo" width="160" height="60" loading="lazy" />
                      </div>
                      <div className="mission-vision-wrap">
                        <div className="mission-vision-box wow fadeInRight" data-wow-delay=".5s">
                          <h4 className="title">Our Mission</h4>
                          <p className="desc">Revolutionize the way you work the our solutions designed to meet the unique challenges of today's business landscape revolutionize.</p>
                        </div>
                        <div className="mission-vision-box wow fadeInRight" data-wow-delay=".5s">
                          <h4 className="title">Our Vision</h4>
                          <p className="desc">Revolutionize the way you work the our solutions designed to meet the unique challenges of today's business landscape revolutionize.</p>
                        </div>
                        <Link className="tj-primary-btn style-2 wow fadeInUp" data-wow-delay=".5s" to="/about">
                          <div className="btn-inner">
                            <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                            <span className="btn-text">Read More</span>
                            <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-img-area">
              <div className="about-img wow fadeInLeft" data-wow-delay=".3s" data-wow-duration="0.8s">
                <img src={getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1778344039/doctor-from-future-concept_qvzulo.jpg")} alt="Innovation and Future Technology" width="600" height="500" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="marquee-area">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView="auto"
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              allowTouchMove={false}
              className="marquee-slider"
            >
              {['Redefining', 'Revolution', 'Intelligence', 'Redefining', 'Revolution', 'Intelligence', 'Redefining', 'Revolution', 'Intelligence', 'Redefining', 'Revolution', 'Intelligence'].map((text, idx) => (
                <SwiperSlide className="marquee-item" key={idx} style={{ width: 'auto' }}>
                  <h4 className="marquee-text">{text}</h4>
                  <div className="marquee-icon"><i className="tji-marquee-icon"></i></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="tj-achievement-section section-gap">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="sec-heading-wrap">
                <span className="sub-title wow fadeInUp" data-wow-delay=".3s"><i className="tji-subtitle-2"></i>Our Achievements</span>
                <div className="heading-wrap-content">
                  <div className="sec-heading">
                    <h2 className="sec-title text-anim">Empowering Solutions Optimization</h2>
                  </div>
                  <p className="desc wow fadeInUp" data-wow-delay=".3s">Our team of experts combines innovation, and strategy to deliver custom AI-driven tools and services empower transformation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 gap-y-4">
            <div className="w-full lg:w-1/2 px-4 order-2 lg:order-1">
              <div className="achievement-img wow fadeInLeft" data-wow-delay=".3s">
                <img src={getImageUrl("assets/images/achievement/achievement.webp")} alt="Codigix Achievements and Milestones" width="600" height="400" loading="lazy" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 order-1 lg:order-2">
              <div className="achievement-area wow fadeInRight" data-wow-delay=".3s">
                {achievements.map((achievement) => (
                  <div className="achievement-item" key={achievement.id}>
                    <div className="content">
                      <span className="no">{achievement.num}</span>
                      <h4 className="title">{achievement.title}</h4>
                    </div>
                    <span className="year">{achievement.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-team-section-2 section-gap section-gap-x mb-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="sec-heading sec-heading-centered">
                <span className="sub-title wow fadeInUp" data-wow-delay=".3s"><i className="tji-subtitle-2"></i>Passionate Innovators</span>
                <h2 className="sec-title text-anim">The Minds Behind the Innovation</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 gap-y-4">
            {team.map((member, idx) => (
              <div className="w-full lg:w-1/4 px-4 sm:w-1/2" key={member.id}>
                <div className="team-item wow fadeInUp" data-wow-delay={`.${3 + idx}s`}>
                  <div className="team-img">
                    <img src={getImageUrl(member.image, "assets/images/team")} alt={member.name} width="300" height="350" loading="lazy" />
                  </div>
                  <div className="team-content">
                    <h5 className="title"><a href="#">{member.name}</a></h5>
                    <span className="designation">{member.position}</span>
                  </div>
                  <div className="social-links style-2">
                    <span className="share-icon" aria-hidden="true"><i className="tji-share"></i></span>
                    <ul>
                      <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><i className="tji-facebook"></i></a></li>
                      <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><i className="tji-linkedin"></i></a></li>
                      <li><a href="https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><i className="tji-instagram"></i></a></li>
                      <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)"><i className="tji-x-twitter"></i></a></li>
                    </ul>
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
