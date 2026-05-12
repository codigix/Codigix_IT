import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setSuccess(false);
    setError(null);
  };

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append('job_id', selectedJob.id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('cover_letter', formData.cover_letter);
    data.append('resume', formData.resume);

    try {
      const response = await fetch(`${API_BASE_URL}/jobs/apply`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', cover_letter: '', resume: null });
        setTimeout(() => setShowModal(false), 3000);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to submit application');
      }
    } catch (err) {
      setError('An error occurred during submission');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <SEO 
        title="Careers" 
        description="Join the Codigix team! Explore our current job openings and career opportunities in AI, software engineering, and technology."
        keywords="careers, jobs, AI jobs, software engineering careers, hiring, join the team"
      />
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: "url(https://res.cloudinary.com/foodfantacy/image/upload/v1778340863/0015_lf398t.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Career Opportunities</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Careers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-career-section section-gap section-gap-x">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered">
                <span className="sub-title"><i className="tji-subtitle-2"></i>Join Our Team</span>
                <h2 className="sec-title">Exciting Job Openings</h2>
              </div>
            </div>
          </div>

          <div className="row row-gap-4 mt-5">
            {jobs.length === 0 ? (
              <div className="col-12 text-center">
                <p>No job openings at the moment. Please check back later!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div className="col-12" key={job.id}>
                  <div className="career-item-horizontal shadow-sm transition-all border border-light p-3 rounded-4">
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h3 className=" mb-0 text-lg" style={{ color: 'var(--tj-color-heading-primary)' }}>{job.title}</h3>
                          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 small">New</span>
                        </div>



                        {job.experience && (
                          <p className="mb-3 text-sm text-muted">{job.experience}</p>
                        )}

                        <p className="line-clamp-2 text-xs text-muted mb-3" style={{ maxWidth: '90%' }}>
                          {job.description}
                        </p>

                        {job.skills && (
                          <div className="skills-container mb-0">
                            <h6 className="small  mb-2" style={{ color: 'var(--tj-color-heading-primary)' }}>Key Skills:</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {job.skills.split(/[,\n•]/).filter(s => s.trim()).slice(0, 8).map((skill, i) => (
                                <span key={i} className="skill-tag-alt p-1 text-xs bg-gray-100 rounded-pill border text-xs"
                                  style={{ borderColor: 'var(--tj-color-border-1)', color: 'var(--tj-color-text-body)' }}>
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 text-lg-end mt-4 mt-lg-0">
                        <div className="d-flex flex-wrap justify-end gap-2 text-muted small mb-3">
                          <span className="d-flex gap-1 text-xs align-items-center"><i className="tji-home mr-2 text-primary"></i>{job.company || 'Codigix Infotech Pvt. Ltd.'}</span>
                          <span className="d-flex gap-1 text-xs align-items-center"><i className="tji-location mr-2 text-primary"></i>{job.location}</span>
                          <span className="d-flex gap-1 text-xs align-items-center"><i className="tji-clock mr-2 text-primary"></i>{job.type}</span>
                        </div>
                        
                        <Link
                          className="tj-primary-btn home-button"
onClick={() => handleApply(job)}
                        >
                          <div className="btn-inner">
                            <span className="btn-icon h-icon">
                              <i className="tji-arrow-right"></i>
                            </span>
                            <span className="btn-text">Apply Now</span>
                            <span className="btn-icon">
                              <i className="tji-arrow-right"></i>
                            </span>
                          </div>
                        </Link>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="modal-content-custom bg-white p-2 rounded shadow-lg position-relative" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="position-absolute border-0 bg-transparent" style={{ top: '20px', right: '20px', fontSize: '24px' }} onClick={() => setShowModal(false)}>×</button>

            <h2 className="h4 mb-2">Apply for {selectedJob?.title}</h2>

            <div className="job-details-mini mb-2 pb-4 border-bottom">
              <div className="row mb-3">
                <div className="col-6">
                  <span className="text-muted small d-block">Experience</span>
                  <span className="">{selectedJob?.experience || 'N/A'}</span>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Location</span>
                  <span className="">{selectedJob?.location}</span>
                </div>
              </div>

              {selectedJob?.responsibilities && (
                <div className="mb-2">
                  <h6 className="small   tracking-wider">Key Responsibilities:</h6>
                  <p className="small text-xs text-muted" style={{ whiteSpace: 'pre-line' }}>{selectedJob.responsibilities}</p>
                </div>
              )}

              {selectedJob?.skills && (
                <div className="mb-2">
                  <h6 className="small   tracking-wider">Required Skills:</h6>
                  <p className="small text-xs text-muted" style={{ whiteSpace: 'pre-line' }}>{selectedJob.skills}</p>
                </div>
              )}

              {selectedJob?.qualifications && (
                <div className="mb-0">
                  <h6 className="small   tracking-wider">Qualifications:</h6>
                  <p className="small text-muted" style={{ whiteSpace: 'pre-line' }}>{selectedJob.qualifications}</p>
                </div>
              )}
            </div>

            {success ? (
              <div className="alert alert-success">
                Your application has been submitted successfully! We will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small  ">Full Name</label>
                  <input type="text" name="name" className="form-control p-2 bg-light border-0" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small  ">Email Address</label>
                    <input type="email" name="email" className="form-control p-2 bg-light border-0" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small  ">Phone Number</label>
                    <input type="tel" name="phone" className="form-control p-2 bg-light border-0" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
               
                <div className="mb-4">
                  <label className="form-label small  ">Resume (PDF, DOC, DOCX)</label>
                  <input type="file" name="resume" className="form-control p-2 bg-light border-0" onChange={handleChange} accept=".pdf,.doc,.docx" required />
                </div>

                {error && <div className="alert alert-danger mb-4 small">{error}</div>}

                <button type="submit" className="tj-primary-btn text-center" disabled={submitting}>
                  <div className="btn-inner">
                    <span className="btn-text">{submitting ? 'Submitting...' : 'Submit Application'}</span>
                    <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay { animation: fadeIn 0.3s ease-out; }
        .modal-content-custom { animation: slideUp 0.3s ease-out; color: #1a1c2e; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .career-item-horizontal {
          transition: all 0.3s ease;
          background-color: var(--tj-color-theme-dark);
        }
        .career-item-horizontal:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
          border-color: var(--tj-color-theme-primary) !important;
        }
        
        .apply-btn-alt {
          background: transparent !important;
          padding: 0 !important;
        }
        .apply-btn-alt .btn-inner {
          transition: all 0.3s ease;
        }
        .apply-btn-alt:hover .btn-inner {
          background-color: var(--tj-color-theme-primary);
          color: white !important;
        }
        .apply-btn-alt:hover .btn-inner .btn-text {
          color: white !important;
        }
        .apply-btn-alt:hover .btn-icon {
          background-color: white !important;
          color: var(--tj-color-theme-primary) !important;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .light .career-item-horizontal {
          background-color: #ffffff !important;
        }
      `}</style>
    </>
  );
}
