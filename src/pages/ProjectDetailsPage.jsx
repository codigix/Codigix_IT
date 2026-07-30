import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Calendar, Globe, Tag, CheckCircle2, Code2, ArrowUpRight } from 'lucide-react';
import SEO from "../components/SEO";
import config from '../config';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project not found</h2>
        <Link to="/projects" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-300">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages = (() => {
    if (!project.gallery) return [];
    try {
      if (typeof project.gallery === 'string' && project.gallery.trim().startsWith('[')) {
        return JSON.parse(project.gallery);
      }
    } catch (e) {
      console.error("Gallery JSON parse error:", e);
    }
    return project.gallery.split(',').map(img => img.trim()).filter(img => img !== '');
  })();
  
  const goals = project.goals ? project.goals.split('\n').filter(goal => goal.trim() !== '') : [];
  const techStack = project.technology_stack ? project.technology_stack.split(/[,\n]/).map(t => t.trim()).filter(t => t !== '') : [];

  return (
    <div key={id} className="bg-white dark:bg-[#0b0625] min-h-screen">
      <SEO 
        title={`${project.title} | Codigix Infotech Case Study`}
        description={project.overview || `Case study: ${project.title}. Discover how Codigix Infotech delivered this successful project using advanced technologies and AI solutions.`}
        keywords={`${project.title}, project case study, AI development, software portfolio, ${project.category}, Codigix Infotech`}
        ogImage={getImageUrl(project.image, "assets/images/project")}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getImageUrl(project.image, "assets/images/project")} 
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0625] via-[#0b0625]/80 to-[#0b0625]/60 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6"
            >
              <Tag className="w-4 h-4" />
              {project.category || 'Case Study'}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {project.title}
            </motion.h1>

            {project.description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
              >
                {project.description}
              </motion.p>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-gray-300 font-medium"
            >
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
              <span className="text-gray-500">/</span>
              <span className="text-indigo-400">{project.title}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            
            {/* Main Content Area (Left) */}
            <div className="w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
              
              {/* Featured Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-gray-100 dark:border-gray-800"
              >
                <img 
                  src={getImageUrl(project.image, "assets/images/project")} 
                  alt={project.title} 
                  className="w-full h-auto object-cover" 
                  loading="lazy" 
                />
              </motion.div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                
                {project.overview && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Overview</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-10">
                      {project.overview}
                    </p>
                  </motion.div>
                )}

                {goals.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      {goals.map((goal, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-[#150a30] border border-gray-100 dark:border-gray-800">
                          <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.results && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Results & Impact</h2>
                    <div className="p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 mb-10">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg m-0">
                        "{project.results}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Gallery Swiper */}
              {galleryImages.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="mt-16"
                >
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Project Gallery</h3>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                    <style>
                      {`
                        .custom-swiper .swiper-pagination-bullet {
                          background: #6366f1 !important;
                          width: 10px;
                          height: 10px;
                          opacity: 0.5;
                        }
                        .custom-swiper .swiper-pagination-bullet-active {
                          opacity: 1;
                          width: 24px;
                          border-radius: 5px;
                        }
                        .custom-swiper .swiper-button-next,
                        .custom-swiper .swiper-button-prev {
                          color: #6366f1 !important;
                          background: rgba(255, 255, 255, 0.9);
                          width: 48px;
                          height: 48px;
                          border-radius: 50%;
                          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        }
                        .dark .custom-swiper .swiper-button-next,
                        .dark .custom-swiper .swiper-button-prev {
                          background: rgba(30, 27, 75, 0.9);
                        }
                        .custom-swiper .swiper-button-next:after, 
                        .custom-swiper .swiper-button-prev:after {
                          font-size: 20px !important;
                          font-weight: bold;
                        }
                      `}
                    </style>
                    <Swiper
                      modules={[Autoplay, Pagination, Navigation]}
                      spaceBetween={0}
                      slidesPerView={1}
                      autoplay={{ delay: 4000, disableOnInteraction: false }}
                      pagination={{ clickable: true, dynamicBullets: true }}
                      navigation={true}
                      className="custom-swiper pb-14"
                    >
                      {galleryImages.map((img, index) => (
                        <SwiperSlide key={index}>
                          <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-[#0b0625] flex items-center justify-center">
                            <img 
                              src={getImageUrl(img, "assets/images/project")} 
                              alt={`Gallery ${index + 1}`} 
                              className="w-full h-full object-cover" 
                              loading="lazy" 
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </motion.div>
              )}

              {/* Navigation Links */}
              <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Link to="/projects" className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 font-semibold transition-colors">
                  <span className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </span>
                  Back to Projects
                </Link>
                {/* Add Next Project Link here if available in API */}
              </div>

            </div>

            {/* Sidebar Area (Right) */}
            <div className="w-full lg:w-1/3 px-4">
              <div className="sticky top-28 space-y-8">
                
                {/* Project Details Box */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-[#150a30] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">Project Details</h3>
                  
                  <div className="space-y-6">
                    {project.client && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Client</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{project.client}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.category && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Tag className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Category</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{project.category}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.duration && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{project.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.website && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Website</p>
                          <a href={project.website.startsWith('http') ? project.website : `https://${project.website}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 inline-block break-all">
                            {project.website.replace(/(^\w+:|^)\/\//, '')}
                            <ArrowUpRight className="w-4 h-4 inline" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Technology Stack Box */}
                {techStack.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-[#150a30] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <Code2 className="w-6 h-6 text-gray-900 dark:text-white" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <span key={index} className="px-4 py-2 rounded-xl bg-white dark:bg-[#0b0625] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Box */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to start your project?</h3>
                    <p className="text-indigo-100 mb-8">Let's discuss how we can help you build your next big idea.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg group">
                      Contact Us Today
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
