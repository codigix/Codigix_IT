import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: "url(assets/images/bg/pheader-bg.webp)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Projects</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-project-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered d-none">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s"><i className="tji-subtitle-2"></i>Featured Work</span>
                <h2 className="sec-title text-anim">Award Winning Projects</h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {projects.map((project, idx) => (
              <div className="col-lg-6 col-md-6" key={project.id}>
                <div className="project-item wow fadeInUp" data-wow-delay={`.${3 + idx}s`}>
                  <div className="project-img">
                    <img src={project.image.startsWith('assets') ? project.image : `assets/images/project/${project.image}.webp`} alt={project.title} />
                  </div>

                  <span className="project-no"><span>0{idx + 1}</span></span>
                  <div className="project-content">
                    <div className='project-desc'>
                      <h4 className="title  mb-2"><Link to="/projects/details">{project.title}</Link></h4>
                      <p className="desc">{project.category || 'Specialize in delivering AI-powered solution revolutionize the way businesses operate by leveraging the latest technology.'}</p>
                    </div>
                    <Link className="icon-btn" to="/projects/details">
                      <i className="tji-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tj-pagination d-flex justify-content-center">
            <ul>
              <li><span aria-current="page" className="page-numbers current">1</span></li>
              <li><a className="page-numbers" href="#">2</a></li>
              <li><a className="page-numbers" href="#">3</a></li>
              <li><a className="next page-numbers" href="#"><i className="tji-arrow-right"></i></a></li>
            </ul>
          </div>
        </div>
      </section>
{/* 
      <section className="tj-cta-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-area wow fadeInUp" data-wow-delay=".3s">
                <div className="cta-content">
                  <h2 className="title">Ready to Transform Your Ideas Into Success?</h2>
                  <Link className="tj-primary-btn btn-light" to="/contact">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                      <span className="btn-text">Start Your Project</span>
                      <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div className="cta-img">
                  <img src="assets/images/cta/cta-bg.webp" alt="CTA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
