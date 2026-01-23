import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="preloader"><div className="loading-container"><div className="loading"></div></div></div>;
  }

  return (
    <>
      <section className="tj-page-header section-gap-x" style={{backgroundImage: "url(assets/images/bg/pheader-bg.webp)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Blog</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Blog</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-blog-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-centered">
                <span className="sub-title wow fadeInUp" data-wow-delay="0.3s"><i className="tji-subtitle-2"></i>Our Latest Articles</span>
                <h2 className="sec-title text-anim">AI & Technology Insights</h2>
              </div>
            </div>
          </div>
          <div className="row row-gap-4">
            {blogs.map((blog, idx) => (
              <div className="col-xl-4 col-md-6" key={blog.id}>
                <div className="blog-item style-3 wow fadeInUp" data-wow-delay={`.${3 + idx}s`}>
                  <div className="blog-thumb">
                    <Link to="/blog/details"><img src={blog.image.startsWith('assets') ? blog.image : `assets/images/blog/blog-${(idx % 3) + 1}.webp`} alt="Blog" /></Link>
                    <span className="categories"><Link to="/blog/details">{blog.category}</Link></span>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>By <Link to="/blog/details">{blog.author || 'Admin'}</Link></span>
                      <span>{blog.date}</span>
                    </div>
                    <h4 className="title"><Link to="/blog/details">{blog.title}</Link></h4>
                    <Link className="text-btn" to="/blog/details">
                      <span className="btn-text"><span>Read More</span></span>
                      <span className="btn-icon"><span><i className="tji-arrow-right"></i></span></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tj-pagination d-flex justify-content-center">
            <ul>
              <li><span aria-current="page" className="page-numbers current">1</span></li>
              <li><a className="page-numbers" href="#">2</a></li>
              <li><a className="page-numbers" href="#">3</a></li>
              <li><a className="next page-numbers" href="#"><i className="tji-arrow-right"></i></a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* <section className="tj-cta-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-area wow fadeInUp" data-wow-delay=".3s">
                <div className="cta-content">
                  <h2 className="title">Stay Updated with Latest AI Trends</h2>
                  <Link className="tj-primary-btn btn-light" to="/contact">
                    <div className="btn-inner">
                      <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                      <span className="btn-text">Subscribe Now</span>
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
