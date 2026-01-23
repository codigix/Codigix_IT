import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: 'Unlocking the Power of Data for Business Success',
      category: 'Quantum',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      excerpt: 'Learn how data analytics can drive your business forward and unlock new opportunities.',
      image: 'https://via.placeholder.com/400x300?text=Blog+1',
    },
    {
      id: 2,
      title: 'The Future of Work: Embracing Digital Transformation',
      category: 'Innovate',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      excerpt: 'Discover how digital transformation is reshaping the workplace and what you need to know.',
      image: 'https://via.placeholder.com/400x300?text=Blog+2',
    },
    {
      id: 3,
      title: 'How AI is Revolutionizing Business and Industry Today',
      category: 'Smart',
      author: 'Brandon',
      date: 'Jan 10, 2025',
      excerpt: 'Explore the latest AI trends and how they are transforming various industries.',
      image: 'https://via.placeholder.com/400x300?text=Blog+3',
    },
  ];

  return (
    <main className="pt-20">
      <section className="section-gap py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog & News</h1>
            <p className="text-xl text-gray-300">
              Stay updated with the latest insights and trends in technology.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
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
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 line-clamp-2">
                    <Link to="/blog/details" className="hover:text-orange-500 transition-colors">
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">{blog.excerpt}</p>

                  <Link 
                    to="/blog/details"
                    className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-4 transition-all"
                  >
                    Read More <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
