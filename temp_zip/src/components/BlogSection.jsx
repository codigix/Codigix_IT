import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: 'Unlocking the Power of Data for Business Success.',
      category: 'Quantum',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      image: 'https://via.placeholder.com/400x300?text=Blog+1',
    },
    {
      id: 2,
      title: 'The Future of Work: Embracing Digital Transformation.',
      category: 'Innovate',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      image: 'https://via.placeholder.com/400x300?text=Blog+2',
    },
    {
      id: 3,
      title: 'How AI is Revolutionizing Business and Industry Today.',
      category: 'Smart',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      image: 'https://via.placeholder.com/400x300?text=Blog+3',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-gap bg-white border-t border-gray-200">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="sub-title justify-center mb-4">
            <span>💡</span>
            Recent Blogs
          </p>
          <h2 className="sec-title">The Minds Behind Blog and News</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 border-b pb-4">
                  <span>By <a href="/blog" className="hover:text-orange-500">{blog.author}</a></span>
                  <span>{blog.date}</span>
                </div>

                <h4 className="text-xl font-bold mb-4 line-clamp-2">
                  <Link to="/blog/details" className="hover:text-orange-500 transition-colors">
                    {blog.title}
                  </Link>
                </h4>

                <Link 
                  to="/blog/details"
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-4 transition-all"
                >
                  Read More
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
