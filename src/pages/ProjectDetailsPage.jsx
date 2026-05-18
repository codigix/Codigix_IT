import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="react-preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  if (!project) {
    return (
      <div className="container section-gap text-center">
        <h2>Project not found</h2>
        <Link to="/projects" className="tj-primary-btn">Back to Projects</Link>
      </div>
    );
  }

  const galleryImages = project.gallery ? project.gallery.split(',').map(img => img.trim()) : [];
  const goals = project.goals ? project.goals.split('\n').filter(goal => goal.trim() !== '') : [];

  return (
    <>
      <SEO 
        title={`${project.title} | Codigix Infotech Case Study`}
        description={project.overview || `Case study: ${project.title}. Discover how Codigix Infotech delivered this successful project using advanced technologies and AI solutions.`}
        keywords={`${project.title}, project case study, AI development, software portfolio, ${project.category}, Codigix Infotech`}
        ogImage={getImageUrl(project.image, "assets/images/project")}
      />
      <style>
        {`
          .tj-project-details-section {
            background-color: var(--tj-color-theme-bg) !important;
          }
          .project-sidebar-box:not(.project-cta-box) {
            background-color: var(--tj-color-theme-dark) !important;
            border: 1px solid var(--tj-color-border-1) !important;
          }
          .project-sidebar-box:not(.project-cta-box) .title {
            color: var(--tj-color-heading-primary) !important;
          }
          .project-cta-box {
            background-color: #6c56b6 !important;
            color: #ffffff !important;
            border: none !important;
          }
          .project-cta-box .title, .project-cta-box p {
            color: #ffffff !important;
          }
          .project-cta-box .tj-primary-btn.btn-light {
            background-color: #ffffff !important;
            border-color: #ffffff !important;
          }
          .project-cta-box .tj-primary-btn.btn-light .btn-text {
            color: #6c56b6 !important;
          }
          .project-cta-box .tj-primary-btn.btn-light .btn-icon {
            background-color: #6c56b6 !important;
            color: #ffffff !important;
          }
          .project-cta-box .tj-primary-btn.btn-light:hover {
             background-color: #060129 !important;
          }
          .project-cta-box .tj-primary-btn.btn-light:hover .btn-text {
             color: #ffffff !important;
          }
          .project-cta-box .tj-primary-btn.btn-light:hover .btn-icon {
             background-color: #ffffff !important;
             color: #060129 !important;
          }
          .project-text span {
            color: var(--tj-color-text-body) !important;
            opacity: 0.8;
          }
          .project-text .title {
            color: var(--tj-color-heading-primary) !important;
          }
          .project-details-content .title, 
          .project-details-content h3 {
            color: var(--tj-color-heading-primary) !important;
          }
          .project-details-content p, 
          .project-details-content li {
            color: var(--tj-color-text-body) !important;
          }
          .tj-post__navigation {
             border-top: 1px solid var(--tj-color-border-1) !important;
          }
          .tj-nav-post__nav a, .tj-nav-post__grid a i {
            color: var(--tj-color-heading-primary) !important;
          }
          .infos-item .project-icons {
            background-color: var(--tj-color-theme-bg) !important;
            color: var(--tj-color-theme-primary) !important;
            border: 1px solid var(--tj-color-border-1) !important;
          }
        `}
      </style>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: `url(${getImageUrl(project.image, "assets/images/project")})`}}>
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

      <section className="tj-project-details-section section-gap bg-white dark:bg-[#18133b]">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="project-details-content">
                <div className="project-details-img">
                  <img src={getImageUrl(project.image, "assets/images/project")} alt={project.title} />
                </div>
                <h2 className="title text-gray-900 dark:text-white">{project.title}</h2>
                
                {project.overview && (
                  <>
                    <h3 className="text-gray-900 dark:text-white">Project Overview</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.overview}</p>
                  </>
                )}

                {goals.length > 0 && (
                  <>
                    <h3 className="text-gray-900 dark:text-white">Project Goals</h3>
                    <ul className="text-gray-600 dark:text-gray-400">
                      {goals.map((goal, index) => (
                        <li key={index}><span className="text-indigo-600 dark:text-indigo-400"><i className="tji-check-2"></i></span>{goal}</li>
                      ))}
                    </ul>
                  </>
                )}

                {project.technology_stack && (
                  <>
                    <h3 className="text-gray-900 dark:text-white">Technology Stack</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.technology_stack}</p>
                  </>
                )}

                {project.results && (
                  <>
                    <h3 className="text-gray-900 dark:text-white">Results & Impact</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.results}</p>
                  </>
                )}
              </div>

              {galleryImages.length > 0 && (
                <>
                  <h3 className="mb-3 text-gray-900 dark:text-white">Project Gallery</h3>
                  <div className="row row-gap-3">
                    {galleryImages.map((img, index) => (
                      <div key={index} className={index === 0 ? "col-md-6 col-lg-12" : "col-md-6 col-lg-6"}>
                        <img src={getImageUrl(img, "assets/images/project")} alt={`Gallery ${index + 1}`} className="img-fluid image-box rounded-xl" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="tj-post__navigation mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="tj-nav__post previous">
                  <div className="tj-nav-post__nav prev_post">
                    <Link to="/projects" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      <span><i className="tji-arrow-left"></i></span>Previous
                    </Link>
                  </div>
                </div>
                <div className="tj-nav-post__grid">
                  <Link to="/projects" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                    <i className="tji-window"></i>
                  </Link>
                </div>
                <div className="tj-nav__post next">
                  <div className="tj-nav-post__nav next_post">
                    <Link to="/projects" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      Next<span><i className="tji-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="project-sidebar">
                <div className="project-sidebar-box bg-gray-50 dark:bg-[#252841]/60 border border-gray-100 dark:border-slate-800/30 rounded-2xl p-6">
                  <h4 className="title text-gray-900 dark:text-white mb-4">Project Details</h4>
                  
                  {project.client && (
                    <div className="infos-item flex items-center gap-3 mb-4">
                      <div className="project-icons w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <i className="tji-user"></i>
                      </div>
                      <div className="project-text">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Clients</span>
                        <h6 className="title text-sm font-bold text-gray-900 dark:text-white leading-none mt-1">{project.client}</h6>
                      </div>
                    </div>
                  )}


                  {project.category && (
                    <div className="infos-item flex items-center gap-3">
                      <div className="project-icons w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <i className="tji-tag"></i>
                      </div>
                      <div className="project-text">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</span>
                        <h6 className="title text-sm font-bold text-gray-900 dark:text-white leading-none mt-1">{project.category}</h6>
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-sidebar-box project-cta-box bg-indigo-600 rounded-2xl p-6 text-white mt-6">
                  <h4 className="title text-white mb-2">Start Your Project</h4>
                  <p className="text-white/80 text-sm mb-4">Ready to build your own AI solution?</p>
                  <Link className="tj-primary-btn btn-light" to="/contact">
                    <div className="btn-inner flex items-center justify-center gap-2">
                      <span className="btn-text">Get Started</span>
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
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
