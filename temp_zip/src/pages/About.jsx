import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Ainex</h1>
            <p className="text-xl text-gray-300">
              We are a team of AI experts dedicated to transforming businesses through innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="sec-title mb-8">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              At Ainex, we believe that artificial intelligence has the power to transform businesses and society. 
              Our mission is to make advanced AI solutions accessible, affordable, and impactful for companies of all sizes.
            </p>

            <h2 className="sec-title mb-8 mt-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Innovation', desc: 'We constantly push the boundaries of what is possible.' },
                { title: 'Integrity', desc: 'We maintain the highest standards of ethical conduct.' },
                { title: 'Impact', desc: 'We measure success by the positive impact we create.' },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-gray-50 rounded-lg shadow-lg"
                >
                  <h4 className="text-2xl font-bold mb-4">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get in Touch
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
