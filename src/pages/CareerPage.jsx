import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, ChevronRight, X, CheckCircle, Heart, Zap, Globe, Users } from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-15 h-15 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const perks = [
    { icon: <Heart className="w-6 h-6" />, title: "Health & Wellness", desc: "Comprehensive health coverage and wellness programs for you and your family." },
    { icon: <Globe className="w-6 h-6" />, title: "Remote Friendly", desc: "Work from anywhere with our flexible remote and hybrid work policies." },
    { icon: <Zap className="w-6 h-6" />, title: "Fast-Paced Growth", desc: "Accelerate your career with challenging projects and continuous learning." },
    { icon: <Users className="w-6 h-6" />, title: "Amazing Culture", desc: "Join a diverse, inclusive, and collaborative team that celebrates success." }
  ];

  return (
    <>
      <SEO
        title="Careers at Codigix Infotech | Join Our Innovation Team"
        description="Join Codigix Infotech and build the future of AI. Explore job openings for software engineers, AI researchers, and tech professionals in a dynamic environment."
        keywords="Codigix careers, AI jobs, software engineering opportunities, tech recruitment, join Codigix team, IT job openings"
      />

      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0b0625] dark:via-[#0F0721] dark:to-[#1a0b2e]">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-6"
            >
              Join Our Innovation Team
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI & Tech</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            >
              We're looking for passionate individuals who want to solve complex problems and create impactful solutions. Explore our open positions below.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 bg-white dark:bg-[#0F0721]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Join Codigix?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We offer more than just a job. We provide an environment where you can thrive, grow, and do your best work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-[#150a30] border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{perk.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0b0625]" id="openings">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Open Positions</h2>
              <p className="text-gray-600 dark:text-gray-400">Find the perfect role for your skills and aspirations.</p>
            </div>
            <div className="hidden md:block">
              <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">
                {jobs.length} {jobs.length === 1 ? 'Role' : 'Roles'} Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white dark:bg-[#150a30] rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No job openings at the moment. Please check back later!</p>
              </div>
            ) : (
              jobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#150a30] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-default"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Actively Hiring
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 flex-grow">
                    {job.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Briefcase className="w-4 h-4 mr-3 text-indigo-500" />
                      {job.experience || 'Experience Not Specified'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-3 text-indigo-500" />
                      {job.location}
                    </div>
                  </div>

                  {job.skills && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.split(/[,\n•]/).filter(s => s.trim()).slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-gray-700">
                          {skill.trim()}
                        </span>
                      ))}
                      {job.skills.split(/[,\n•]/).filter(s => s.trim()).length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium border border-gray-200 dark:border-gray-700">
                          +{job.skills.split(/[,\n•]/).filter(s => s.trim()).length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => handleApply(job)}
                    className="w-full mt-auto py-3 px-4 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:bg-indigo-900/30 dark:hover:bg-indigo-600 dark:text-indigo-400 dark:hover:text-white font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center cursor-pointer"
                  >
                    Apply for this role
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Modal (Framer Motion) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#150a30] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-[#0b0625]/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Apply for {selectedJob?.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedJob?.location} • {selectedJob?.type}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-15 h-15 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Thank you for applying to Codigix Infotech. Our team will review your application and get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column: Job Details Summary */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Role Overview</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                          {selectedJob?.description}
                        </p>
                      </div>

                      {selectedJob?.skills && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.skills.split(/[,\n•]/).filter(s => s.trim()).map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-lg">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedJob?.responsibilities && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Responsibilities</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {selectedJob.responsibilities}
                          </p>
                        </div>
                      )}

                      {selectedJob?.qualifications && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Qualifications</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {selectedJob.qualifications}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="bg-gray-50 dark:bg-[#0b0625] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 h-fit sticky top-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Your Details</h3>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                          <X className="w-5 h-5 shrink-0" />
                          <p>{error}</p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Resume / CV (PDF) *</label>
                          <div className="relative">
                            <input
                              type="file"
                              name="resume"
                              required
                              accept=".pdf,.doc,.docx"
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all outline-none cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cover Letter (Optional)</label>
                          <textarea
                            name="cover_letter"
                            rows="4"
                            value={formData.cover_letter}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none custom-scrollbar"
                            placeholder="Tell us why you're a great fit for this role..."
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Submitting...
                            </span>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
