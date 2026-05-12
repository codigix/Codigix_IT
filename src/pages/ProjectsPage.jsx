import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";

import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  //  logic of pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // end

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
      <SEO 
        title="Our Projects" 
        description="Check out our portfolio of successful AI-driven projects and software engineering solutions that have helped businesses transform."
        keywords="projects, portfolio, AI projects, software development, case studies"
      />
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: `url(${getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1778412464/samples/codigix%20infotech/people-with-watercolor-technology-interfaces-laptops-concept-as-group-people-interacting-wi_akioev.jpg")})` }}>
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

      <section className="tj-project-section section-gap ">
        <div className="">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered d-none">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s"><i className="tji-subtitle-2"></i>Featured Work</span>
                <h2 className="sec-title text-anim">Award Winning Projects</h2>
              </div>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.slice(0, 4).map((project, idx) => (
                        <div className="col-span-1" key={project.id}>
                          
                          <div class="project-item">
                            <div class="project-img">
                              <img
                                src={getImageUrl(project.image, "assets/images/project")}
                                alt={project.title}
                                className="w-full h-[150px] object-cover  transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div class="project-content">
                              <h4 class="title"><Link to={`/projects/details/${project.id}`}>{project.title}</Link></h4>
                              <p className="line-clamp-2">{project.overview || 'Specialize in delivering AI-powered solution revolutionize the way businesses operate by leveraging the latest technology.'}
                              </p>
                              <Link to={`/projects/details/${project.id}`} class="icon-btn" >
                                <i class="tji-arrow-right-long"></i>
                              </Link>
                            </div>
                            <span class="categories"><Link to={`/projects/details/${project.id}`}>{project.category || 'Software'}</Link></span>
                          </div>
                        </div>
                      ))}
                    </div>

          {/* <div className="tj-pagination d-flex justify-content-center">
            <ul>
              <li><span aria-current="page" className="page-numbers current">1</span></li>
              <li><a className="page-numbers" href="#">2</a></li>
              <li><a className="page-numbers" href="#">3</a></li>
              <li><a className="next page-numbers" href="#"><i className="tji-arrow-right"></i></a></li>
            </ul>
          </div> */}
          {totalPages > 1 && (
            <div className="tj-pagination d-flex justify-content-center">
              <ul>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      className={`page-numbers ${currentPage === index + 1 ? "current" : ""
                        }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                {/* Next Button */}
                {currentPage < totalPages && (
                  <li>
                    <button
                      className="next page-numbers"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="tji-arrow-right"></i>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
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
