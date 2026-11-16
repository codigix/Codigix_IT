import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlogs, blogPath, blogImage, blogExcerpt, blogDate } from '../../utils/blogs';

// The 3 newest published posts from the admin panel
const BlogSection = () => {
  const navigate = useNavigate();
  const { posts } = useBlogs();
  const combinedPosts = posts.slice(0, 3).map((post) => ({
    id: String(post.id),
    title: post.title,
    excerpt: blogExcerpt(post),
    category: post.category,
    date: blogDate(post),
    author: post.author || 'Codigix Tech Team',
    readTime: post.readTime || '5 min read',
    image: blogImage(post),
    imageAlt: post.image_alt || post.title,
    link: blogPath(post)
  }));

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-black/10 border-t border-slate-200/60 dark:border-gray-800/40">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-750 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <span>💡 Insights & Knowledge</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-4"
          >
            Latest News & Tech Articles
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 max-w-xl font-normal leading-relaxed mt-2"
          >
            Stay updated with codigix engineering insights, industry case projects, and technical updates from our software architects.
          </motion.p>
        </div>

        {combinedPosts.length === 0 ? (
          <div data-prerender-omit className="text-center py-16 bg-white dark:bg-[#07041c] border border-dashed border-slate-200 dark:border-purple-900/30 rounded-2xl p-8 max-w-md mx-auto shadow-xs">
            <span className="text-3xl mb-3 block">✍️</span>
            <p className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wide">No articles published yet</p>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-2 uppercase tracking-widest leading-relaxed">Check back soon! Our engineering team will be sharing fresh technical articles shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combinedPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group flex flex-col justify-between h-full bg-white dark:bg-[#07041c] border border-slate-200/90 dark:border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(124,58,237,0.06)] dark:hover:shadow-[0_8px_30px_rgba(124,58,237,0.12)] transition-all duration-300"
              >
                {/* Image Frame */}
                <div className="h-52 overflow-hidden relative bg-slate-100 dark:bg-[#0c082b] flex items-center justify-center">
                  <div className="absolute inset-0 bg-purple-900/5 group-hover:bg-purple-900/0 transition-colors z-10 pointer-events-none" />
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />

                  {/* Category Badge on top of image */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] font-extrabold uppercase bg-purple-600 text-white px-3 py-1 rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-1 text-left">
                  <div>
                    {/* Tags Info */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-4">
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

                    <p className="text-xs text-slate-650 dark:text-gray-400 leading-relaxed font-normal mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-gray-800/80">
                    <Link
                      to={post.link}
                      className="inline-flex items-center gap-1 text-[11.5px] font-bold text-purple-700 dark:text-purple-300 group-hover:gap-2 transition-all"
                    >
                      Read Full Article
                      <ArrowRight size={13} className="text-purple-600 dark:text-purple-400" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-purple-50 dark:bg-purple-600/20 hover:bg-purple-600 text-purple-750 dark:text-purple-300 hover:text-white text-xs font-bold rounded-xl border border-purple-200 dark:border-purple-500/40 shadow-sm hover:shadow-md transition-all"
          >
            Browse All Blog Articles →
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
