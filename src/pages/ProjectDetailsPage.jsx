import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectDetailsPage() {
  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(/assets/images/bg/pheader-bg.webp)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Project Details</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Project Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-project-details-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="project-details-content">
                <div className="project-details-img">
                  <img src="/assets/images/project/project-details.webp" alt="Project" />
                </div>
                <h2 className="title">AI-Powered Analytics Platform</h2>
                
                <h3>Project Overview</h3>
                <p>We developed a comprehensive AI-powered analytics platform that helps enterprises make data-driven decisions in real-time. The platform integrates machine learning algorithms with advanced visualization tools to provide actionable insights from complex datasets.</p>

                <h3>Project Goals</h3>
                <ul>
                  <li><span><i class="tji-check-2"></i></span>Reduce data processing time by 80%</li>
                  <li><span><i class="tji-check-2"></i></span>Improve prediction accuracy to 95%+</li>
                  <li><span><i class="tji-check-2"></i></span>Enable real-time decision making</li>
                  <li><span><i class="tji-check-2"></i></span>Scale to handle billions of data points</li>
                  <li><span><i class="tji-check-2"></i></span>Provide intuitive user interface for non-technical users</li>
                </ul>

                <h3>Technology Stack</h3>
                <p>The solution was built using cutting-edge technologies including Python, TensorFlow, Apache Spark, and React. We leveraged cloud infrastructure for scalability and implemented advanced security measures to protect sensitive business data.</p>

                <h3>Results & Impact</h3>
                <p>The platform has successfully helped our client process over 500 million data points, resulting in a 40% improvement in operational efficiency and $5M in cost savings. The solution has become a critical tool for strategic decision-making across all business units.</p>
              </div>
               {/* <div className="row mt-4">
            <div className="col-12"> */}
              <h3 className="mb-3">Project Gallery</h3>
              <div className="row row-gap-3">
                <div className="col-md-6 col-lg-12">
                  <img src="/assets/images/project/project-gallery-1.webp" alt="Gallery 1" className="img-fluid image-box " />
                </div>
                <div className="col-md-6 col-lg-6">
                  <img src="/assets/images/project/project-gallery-2.webp" alt="Gallery 2" className="img-fluid image-box "  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <img src="/assets/images/project/project-gallery-3.webp" alt="Gallery 3" className="img-fluid image-box "  />
                </div>
             
              {/* </div>
            </div> */}
          </div>
          <div class="tj-post__navigation mt-4">
                <div class="tj-nav__post previous">
                  <div class="tj-nav-post__nav prev_post">
                    <a href="blog-details.html"><span><i class="tji-arrow-left"></i></span>Previous</a>
                  </div>
                </div>
                <div class="tj-nav-post__grid">
                  <a href="blog.html"><i class="tji-window"></i></a>
                </div>
              <div class="tj-nav__post next">
                  <div class="tj-nav-post__nav next_post">
                    <a href="blog-details.html">Next<span><i class="tji-arrow-right"></i></span></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="project-sidebar">
                <div className="project-sidebar-box">
                  <h4 className="title">Project Details</h4>
                  {/* <ul className="details-list">
                    <li><strong>Client:</strong> Fortune 500 Enterprise</li>
                    <li><strong>Timeline:</strong> 6 Months</li>
                    <li><strong>Team Size:</strong> 12 Experts</li>
                    <li><strong>Status:</strong> Completed</li>
                    <li><strong>ROI:</strong> 300%+</li>
                  </ul> */}
                  <div class="infos-item">
                  <div class="project-icons">
                    <i class="tji-user"></i>
                  </div>
                  <div class="project-text">
                    <span>Clients</span>
                    <h6 class="title">Innovate Interiors Group</h6>
                  </div>
                </div>
                <div class="infos-item">
                  <div class="project-icons">
                    <i class="tji-user"></i>
                  </div>
                  <div class="project-text">
                    <span>Budget</span>
                    <h6 class="title">$100M USD</h6>
                  </div>
                </div>
                <div class="infos-item">
                  <div class="project-icons">
                    <i class="tji-user"></i>
                  </div>
                  <div class="project-text">
                    <span>Clients</span>
                    <h6 class="title">Innovate Interiors Group</h6>
                  </div>
                </div>
                </div>

                <div className="project-sidebar-box">
                  <h4 className="title">More Projects</h4>
                  <ul className="project-list">
                    <li><Link to="/projects">Machine Learning Platform</Link></li>
                    <li><Link to="/projects">Smart Solutions</Link></li>
                    <li><Link to="/projects">Data Intelligence Hub</Link></li>
                  </ul>
                </div>

                <div className="project-sidebar-box">
                  <h4 className="title">Start Your Project</h4>
                  <p>Ready to build your own AI solution?</p>
                  <Link className="tj-primary-btn" to="/contact">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                      <span className="btn-text">Get Started</span>
                      <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </section>
    </>
  );
}
