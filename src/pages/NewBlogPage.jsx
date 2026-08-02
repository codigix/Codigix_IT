import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search, Tag, BookOpen } from 'lucide-react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import { Helmet } from 'react-helmet-async';
import config from '../config';

import { blogPostsData } from '../data/blogData';

const blogCategories = [
  'All',
  'AI & Automation',
  'IoT & Industry 4.0',
  'Enterprise ERP',
  'Sales Tech & CRM',
  'Web Engineering',
  'Mobile Engineering',
  'Cloud & DevOps',
  'Smart Manufacturing',
  'Healthcare Tech',
  'Retail & E-Commerce',
  'Fintech & Banking',
  'Construction Tech',
  'Automotive Tech',
  'EdTech'
];

const NewBlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbBlogs = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/blogs`);
        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result) && result.length > 0) {
            const formatted = result.map(post => ({
              id: post.id.toString(),
              title: post.title,
              excerpt: post.body ? (post.body.slice(0, 150) + (post.body.length > 150 ? '...' : '')) : 'No excerpt provided.',
              category: post.category,
              date: post.date,
              author: post.author || 'Codigix Tech Team',
              readTime: post.readTime || '5 min read',
              image: post.image ? (post.image.startsWith('http') || post.image.startsWith('data:') || post.image.startsWith('/') ? post.image : `/assets/images/service/${post.image}${post.image.includes('.') ? '' : '.webp'}`) : '/assets/images/service/web_dev_dashboard.webp',
              link: `/blog/${post.id}`
            }));
            setDbPosts(formatted);
          }
        }
      } catch (err) {
        console.error("Error loading db blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDbBlogs();
  }, []);

  // Merge DB posts with static master posts (deduping by title or ID)
  const combinedPosts = [...dbPosts];
  blogPostsData.forEach(staticPost => {
    if (!combinedPosts.some(p => p.id === staticPost.id || p.title === staticPost.title)) {
      combinedPosts.push(staticPost);
    }
  });

  const filteredPosts = combinedPosts.filter(post => {
    const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <Helmet>
        <title>Tech Insights & News | Codigix</title>
      </Helmet>

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Navigation */}
        <NewHomeNav />

        {/* Blog Banner Hero */}
        <div className="pt-32 pb-16 border-b border-slate-200 dark:border-gray-800/40 relative overflow-hidden bg-slate-50/50 dark:bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-750 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <span>📚 Codigix Technical Journal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[44px] font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 max-w-2xl"
            >
              Insights from our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Digital Engineers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 max-w-lg font-normal leading-relaxed mt-2"
            >
              Deep dives into IoT firmware orchestration, scalable cloud database structures, conversion-focused CRM workflows, and DevOps pipeline architectures.
            </motion.p>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-b border-slate-200/60 dark:border-gray-800/40 pb-8 mb-10">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {blogCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-[#07041c] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-400 hover:border-purple-400 dark:hover:border-gray-600 hover:text-purple-600 dark:hover:text-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search articles, authors or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041c] text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-1 focus:ring-purple-500/20 transition-all shadow-xs"
              />
            </div>

          </div>

          {/* Cards Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col justify-between h-full bg-white dark:bg-[#07041c] border border-slate-200/90 dark:border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(124,58,237,0.06)] dark:hover:shadow-[0_8px_30px_rgba(124,58,237,0.12)] transition-all duration-300"
                >
                  {/* Image Frame */}
                  <div className="h-52 overflow-hidden relative bg-slate-100 dark:bg-[#0c082b] flex items-center justify-center">
                    <div className="absolute inset-0 bg-purple-900/5 group-hover:bg-purple-900/0 transition-colors z-10 pointer-events-none" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="text-[10px] font-extrabold uppercase bg-purple-600 text-white px-3 py-1 rounded-full shadow-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-1 text-left">
                    <div>
                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-3.5 text-[11px] text-slate-500 dark:text-gray-400 font-semibold mb-3.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-purple-600 dark:text-purple-400" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-purple-600 dark:text-purple-400" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-purple-600 dark:text-purple-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-normal mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-gray-800/80">
                      <a 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-[11.5px] font-bold text-purple-700 dark:text-purple-300 group-hover:gap-2 transition-all"
                      >
                        Read Full Article
                        <ArrowRight size={13} className="text-purple-600 dark:text-purple-400" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-[#07041c] rounded-2xl border border-dashed border-slate-200 dark:border-gray-800 mt-6">
              <BookOpen size={40} className="text-slate-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">No Articles Found</h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 max-w-xs mx-auto">Try refining your search keyword or selecting a different tech category pill.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </div>

      </div>
    </>
  );
};

export default NewBlogPage;
