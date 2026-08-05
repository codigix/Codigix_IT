import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare, Heart, Bookmark, ChevronRight } from 'lucide-react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import { Helmet } from 'react-helmet-async';
import config from '../config';
import { getBlogById, blogPostsData } from '../data/blogData';

const detailedBlogContent = {
  'industrial-iot-architecture': {
    title: 'Unlocking Industrial IoT: Bridging Physical Devices with Cloud Telemetry',
    category: 'IoT & Industry 4.0',
    date: 'Aug 1, 2026',
    author: 'Suresh Nair',
    role: 'Principal IoT Solutions Architect',
    readTime: '6 min read',
    image: '/assets/images/blog/blog_iiot_architecture.webp',
    body: (
      <div className="space-y-6 text-slate-700 dark:text-gray-300 text-sm leading-relaxed">
        <p className="text-[15px] font-medium text-slate-900 dark:text-white leading-relaxed">
          The convergence of operational technology (OT) and information technology (IT) has unlocked unprecedented efficiencies on the factory shop floor. But how do we securely bridge physical devices with cloud telemetry at scale?
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. Edge Device Ingestion & Firmware Protocols</h3>
        <p>
          At the physical layer, industrial ESP32 microcontrollers and PLC terminals interface directly with machinery sensors via Modbus RTU or OPC Unified Architecture (OPC UA). Modbus RTU, operating over RS-485, remains a robust standard for legacy sensors. However, OPC UA provides semantic metadata structures, making it the preferred standard for modern cyber-physical systems.
        </p>

        <div className="bg-[#0c0828] dark:bg-[#07041a] p-4 rounded-xl border border-purple-900/40 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner my-4">
          {`// Sample MQTT Telemetry Payload formatted for AWS IoT Core broker
{
  "client_id": "plc_workstation_14B",
  "timestamp": 1785579600,
  "telemetry": {
    "temperature_celsius": 42.85,
    "vibration_velocity_mms": 2.45,
    "oee_active_lines": 18,
    "cycle_count": 14850
  }
}`}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. MQTT Broker Telemetry Pipeline</h3>
        <p>
          Once compiled at the edge, telemetry payloads are transmitted over TLS-encrypted TCP sockets to cloud MQTT brokers. Message Queuing Telemetry Transport (MQTT) is highly efficient due to its publisher-subscriber model and lightweight header overhead. We configure Quality of Service (QoS) Level 1 to guarantee at-least-once delivery for critical operational logs.
        </p>

        <blockquote className="border-l-4 border-purple-600 pl-4 py-2 my-6 bg-purple-50 dark:bg-purple-950/30 text-slate-800 dark:text-gray-200 font-medium italic rounded-r-lg">
          "By implementing TLS 1.3 client certificate authorization directly at the microcontroller firmware layer, we eliminate the threat of machine spoofing and unauthorized data injection."
        </blockquote>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Cloud Rule Engines & Real-time Dashboards</h3>
        <p>
          Upon reaching AWS IoT Core or Azure IoT Hub, payloads are evaluated by SQL-like rule engines. Critical alerts are routed immediately to notification brokers (SNS/SES), while warm telemetry is piped into Timestream databases for real-time OEE dashboard visualizations. Historical aggregates are stored in S3 datalakes to train machinery anomaly detection models.
        </p>
      </div>
    )
  }
};

detailedBlogContent['industrial-iot'] = detailedBlogContent['industrial-iot-architecture'];

// Fallback metadata for other blog posts
const getFallbackPost = (id) => ({
  title: id ? id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Tech Insights',
  category: 'Web Engineering',
  date: 'Jul 15, 2026',
  author: 'Codigix Tech Team',
  role: 'Engineering Contributors',
  readTime: '6 min read',
  image: '/assets/images/blog/blog_web_engineering.webp',
  body: (
    <div className="space-y-6 text-slate-700 dark:text-gray-300 text-sm leading-relaxed">
      <p>This tech article covers advanced engineering practices, scalable software architecture solutions, database tuning strategies, and DevOps methodologies implemented at Codigix.</p>
      <p>Learn how our engineering squads design responsive frontends, implement secure REST APIs, deploy containerized Kubernetes environments, and optimize cloud infrastructure costs.</p>
    </div>
  )
});

const NewBlogDetailsPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      // 1. Check detailed content or master blog posts data
      const masterPost = detailedBlogContent[id] || getBlogById(id);
      if (masterPost) {
        setPost({
          title: masterPost.title,
          category: masterPost.category,
          date: masterPost.date,
          author: masterPost.author,
          role: masterPost.role || 'Senior Technical Lead',
          readTime: masterPost.readTime || '6 min read',
          image: masterPost.image,
          body: masterPost.body || masterPost.content || masterPost.excerpt
        });
        setLoading(false);
        return;
      }

      // 2. Fetch from backend API
      try {
        const response = await fetch(`${config.API_BASE_URL}/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost({
            title: data.title,
            category: data.category,
            date: data.date,
            author: data.author || 'Codigix Tech Team',
            role: data.role || 'Engineering Contributor',
            readTime: data.readTime || '5 min read',
            image: data.image ? (data.image.startsWith('http') || data.image.startsWith('data:') || data.image.startsWith('/') ? data.image : `/assets/images/blog/${data.image}${data.image.includes('.') ? '' : '.webp'}`) : '/assets/images/blog/blog_web_engineering.webp',
            body: data.body || 'No content written yet.'
          });
        } else {
          setPost(getFallbackPost(id));
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        setPost(getFallbackPost(id));
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(l => l - 1);
      setHasLiked(false);
    } else {
      setLikes(l => l + 1);
      setHasLiked(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#030014] min-h-screen font-sans flex flex-col items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
        <NewHomeNav />
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase font-extrabold tracking-widest text-slate-500 dark:text-gray-400">Retrieving Insight Details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white dark:bg-[#030014] min-h-screen font-sans flex flex-col items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
        <NewHomeNav />
        <p className="text-sm font-bold uppercase tracking-wider text-rose-500 mb-2">Blog post not found</p>
        <Link to="/blog" className="text-xs text-purple-600 dark:text-purple-400 hover:underline">Back to Blog list</Link>
      </div>
    );
  }

  // Get recent 3 posts for sidebar excluding current post
  const recentPosts = blogPostsData.filter(p => p.id !== id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Codigix Blog</title>
      </Helmet>

      <div className="bg-white dark:bg-[#030014] min-h-screen font-sans text-slate-900 dark:text-white transition-colors duration-300">

        {/* Navigation */}
        <NewHomeNav />

        {/* Article Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-20">

          {/* Back button & Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-400 tracking-wide uppercase font-bold">
              <Link to="/" className="hover:text-purple-600 dark:hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link to="/blog" className="hover:text-purple-600 dark:hover:text-white transition-colors">Blog</Link>
              <ChevronRight size={10} />
              <span className="text-purple-600 dark:text-purple-400 truncate max-w-[200px] sm:max-w-[300px]">{post.title}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left/Center Main Article Area */}
            <div className="lg:w-[70%] text-left">

              {/* Immersive Article Header */}
              <div className="mb-8">
                <span className="text-[10px] font-extrabold uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 px-3.5 py-1 rounded-full mb-4 inline-block">
                  {post.category}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Author Info Row */}
                <div className="flex items-center gap-4 border-y border-slate-200 dark:border-gray-800/80 py-4 mt-6">
                  <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                    {post.author ? post.author.split(' ').map(n => n[0]).join('') : 'C'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400">{post.role}</p>
                  </div>

                  <div className="ml-auto flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-purple-600 dark:text-purple-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-purple-600 dark:text-purple-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Large Immersive Banner Image */}
              <div className="w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-gray-800 shadow-lg bg-slate-100 dark:bg-[#0c0828]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/blog/blog_web_engineering.webp';
                  }}
                />
              </div>

              {/* Dynamic Article Body */}
              <article className="prose prose-slate dark:prose-invert max-w-none mb-14 text-left">
                {typeof post.body === 'string' ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.body }}
                    className="text-slate-700 dark:text-gray-300 text-[15px] leading-relaxed space-y-4 font-normal"
                  />
                ) : (
                  post.body
                )}
              </article>

              {/* Article Interaction Row */}
              <div className="flex items-center gap-4 sm:gap-6 border-t border-slate-200 dark:border-gray-800/80 pt-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 rounded-xl border ${hasLiked
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-600'
                      : 'bg-slate-50 dark:bg-[#07041c] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:border-rose-400 hover:text-rose-600'
                    }`}
                >
                  <Heart size={14} className={hasLiked ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{likes} Likes</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 bg-slate-50 dark:bg-[#07041c] border border-slate-200 dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600">
                  <MessageSquare size={14} />
                  <span>Write Comment</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 bg-slate-50 dark:bg-[#07041c] border border-slate-200 dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600 ml-auto">
                  <Share2 size={14} />
                  <span>Share Article</span>
                </button>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:w-[30%]">
              <div className="sticky top-28 space-y-8 text-left">

                {/* Recent Articles Widget */}
                <div className="bg-slate-50/80 dark:bg-[#07041c] border border-slate-200 dark:border-purple-900/30 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-gray-800/80">
                    Recent Articles
                  </h3>

                  <div className="space-y-4">
                    {recentPosts.map((recPost) => (
                      <Link key={recPost.id} to={`/blog/${recPost.id}`} className="group block">
                        <span className="text-[9px] uppercase font-bold text-purple-600 dark:text-purple-400">{recPost.category}</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2 mt-1">
                          {recPost.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Subscribe Card */}
                <div className="bg-gradient-to-br from-purple-100/90 via-indigo-50 to-purple-50 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-[#07041c] border border-purple-200 dark:border-purple-900/40 rounded-2xl p-5 text-left relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                  <Bookmark className="text-purple-600 dark:text-purple-400 mb-3" size={24} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Subscribe to Tech Journal</h3>
                  <p className="text-[11px] text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                    Get weekly hardware, cloud, and engineering insights directly in your inbox. No spam.
                  </p>

                  <input
                    type="email"
                    placeholder="Enter email address..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-gray-800 bg-white dark:bg-black/40 text-slate-900 dark:text-white text-xs font-semibold placeholder-slate-400 dark:placeholder-gray-500 mb-2 focus:outline-none focus:border-purple-600"
                  />
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
                    Subscribe
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </div>

      </div>
    </>
  );
};

export default NewBlogDetailsPage;
