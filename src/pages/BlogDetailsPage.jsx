import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // Fetch current blog
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
        const data = await response.json();
        setBlog(data);

        // Fetch recent blogs for sidebar
        const recentResponse = await fetch(`${API_BASE_URL}/blogs`);
        const recentData = await recentResponse.json();
        setRecentBlogs(Array.isArray(recentData) ? recentData.slice(0, 3) : []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 section-gap text-center">
        <h2>Blog post not found</h2>
        <Link to="/blog" className="tj-primary-btn">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${blog.title} | Codigix Infotech Blog`}
        description={blog.summary || blog.content?.substring(0, 160) || "Read the latest insights and trends in AI and technology from Codigix Infotech."}
        keywords={`${blog.category}, AI, technology, Codigix, ${blog.title}`}
        ogImage={getImageUrl(blog.image, "assets/images/blog")}
      />
      <section className="tj-page-header section-gap-x" style={{ backgroundImage: `url(${getImageUrl("https://res.cloudinary.com/foodfantacy/image/upload/v1778340863/0015_lf398t.jpg")})` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-full px-4">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">Blog Details</h1>
                <div className="tj-page-link">
                  <span><i className="tji-home"></i></span>
                  <span><Link to="/">Home</Link></span>
                  <span>/</span>
                  <span>Blog Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-blog-details-section section-gap">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              <div className="blog-details-content post-details-wrapper">
                <div className="blog-details-img blog-images">
                  <img src={getImageUrl(blog.image, "assets/images/blog")} alt={blog.title} loading="lazy" />
                </div>
                <h2 className="title">{blog.title}</h2>
                <div className="blog-category-two ">
                  <div className="category-item">
                    <div className="cate-images">
                      <img src={getImageUrl("assets/images/blog/author.webp")} alt="Author" loading="lazy" />
                    </div>
                    <div className="cate-text">
                      <span className="degination">Authored by</span>
                      <h6 className="title">{blog.author || 'Admin'}</h6>
                    </div>
                  </div>
                  <div className="category-item">
                    <div className="cate-icons">
                      <i className="tji-calendar"></i>
                    </div>
                    <div className="cate-text">
                      <span className="degination">Date Released</span>
                      <h6 className="text">{blog.date}</h6>
                    </div>
                  </div>
                  <div className="category-item">
                    <div className="cate-icons">
                      <i className="tji-comment"></i>
                    </div>
                    <div className="cate-text">
                      <span className="degination">Category</span>
                      <h6 className="text">{blog.category}</h6>
                    </div>
                  </div>
                </div>
                <div className='blog-text' dangerouslySetInnerHTML={{ __html: blog.content }}>
                </div>
                
                <div className="blog-tags tj-tags-post" >
                  <div className="tagcloud">
                    <span>Tags:</span>
                    <Link to="/blog">{blog.category}</Link>
                    <Link to="/blog">AI</Link>
                    <Link to="/blog">Technology</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <div className="blog-sidebar">
                <div className="blog-sidebar-box">
                  <h3 className="title">Recent Posts</h3>
                  <ul>
                    {recentBlogs.map((recent) => (
                      <li key={recent.id}>
                        <div className="post-thumb">
                          <Link to={`/blog/details/${recent.id}`}> 
                            <img src={getImageUrl(recent.image, "assets/images/blog")} alt={recent.title} loading="lazy" />
                          </Link>
                        </div>
                        <div className="post-content">
                          <h6 className="post-title">
                            <Link to={`/blog/details/${recent.id}`}>{recent.title}</Link>
                          </h6>
                          <div className="blog-meta">
                            <ul>
                              <li>{recent.date}</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div> 

                <div className="blog-sidebar-box">
                  <h3 className="title">Categories</h3>
                  <ul className="categories">
                    <li><Link to="/blog">Artificial Intelligence</Link></li>
                    <li><Link to="/blog">Machine Learning</Link></li>
                    <li><Link to="/blog">Data Analytics</Link></li>
                    <li><Link to="/blog">Business</Link></li>
                    <li><Link to="/blog">Technology</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
