import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

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
        setAchievements(achData);
        setTeam(teamData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(assets/images/bg/pheader-bg.webp)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="about-content-area style-2">
                    <div className="sec-heading style-2">
                      <span className="sub-title wow fadeInUp" data-wow-delay=".3s">Explore Our Services</span>
                      <h2 className="sec-title text-anim">Driving Innovation Through AI and New Technology, Delivering Tailored</h2>
                    </div>
                    <div className="about-bottom-area-2">
                      <div className="company-logo wow fadeInLeft" data-wow-delay=".3s">
                        <img src="assets/images/logos/logo-2.webp" alt="Codigix Logo" />
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
                <img src="assets/images/about/about-img-2.webp" alt="About" />
              </div>
            </div>
          </div>
          <div className="marquee-area">
            <div className="swiper marquee-slider">
              <div className="swiper-wrapper">
                {['Redefining', 'Revolution', 'Intelligence', 'Redefining', 'Revolution', 'Intelligence'].map((text, idx) => (
                  <div className="swiper-slide marquee-item" key={idx}>
                    <h4 className="marquee-text">{text}</h4>
                    <div className="marquee-icon"><i className="tji-marquee-icon"></i></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-achievement-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
          <div className="row row-gap-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="achievement-img wow fadeInLeft" data-wow-delay=".3s">
                <img src="assets/images/achievement/achievement.webp" alt="Achievement" />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="achievement-area wow fadeInRight" data-wow-delay=".3s">
                {achievements.map((achievement, idx) => (
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

      <section className="tj-team-section-2 section-gap section-gap-x">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered">
                <span className="sub-title wow fadeInUp" data-wow-delay=".3s"><i className="tji-subtitle-2"></i>Passionate Innovators</span>
                <h2 className="sec-title text-anim">The Minds Behind the Innovation</h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {team.map((member, idx) => (
              <div className="col-lg-3 col-sm-6" key={member.id}>
                <div className="team-item wow fadeInUp" data-wow-delay={`.${3 + idx}s`}>
                  <div className="team-img">
                    <img src={member.image && member.image.startsWith('assets') ? member.image : `assets/images/team/team-${member.num}.webp`} alt={member.name} />
                  </div>
                  <div className="team-content">
                    <h5 className="title"><a href="#">{member.name}</a></h5>
                    <span className="designation">{member.position}</span>
                  </div>
                  <div className="social-links style-2">
                    <span className="share-icon"><i className="tji-share"></i></span>
                    <ul>
                      <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="tji-facebook"></i></a></li>
                      <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="tji-linkedin"></i></a></li>
                      <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="tji-instagram"></i></a></li>
                      <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer"><i className="tji-x-twitter"></i></a></li>
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
