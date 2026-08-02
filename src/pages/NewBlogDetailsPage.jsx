import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare, Heart, Bookmark, ChevronRight } from 'lucide-react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import { Helmet } from 'react-helmet-async';
import config from '../config';

const detailedBlogContent = {
  'industrial-iot': {
    title: 'Unlocking Industrial IoT: Bridging Physical Devices with Cloud Telemetry',
    category: 'IoT & Industry 4.0',
    date: 'Aug 1, 2026',
    author: 'Suresh Nair',
    role: 'Principal IoT Solutions Architect',
    readTime: '5 min read',
    image: '/assets/images/new-home/blog_iot.png',
    body: (
      <div className="space-y-6 text-slate-700 dark:text-gray-350 text-sm leading-relaxed">
        <p className="text-[15px] font-medium text-slate-900 dark:text-white leading-relaxed">
          The convergence of operational technology (OT) and information technology (IT) has unlocked unprecedented efficiencies on the factory shop floor. But how do we securely bridge physical devices with cloud telemetry at scale?
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. Edge Device Ingestion & Firmware Protocols</h3>
        <p>
          At the physical layer, industrial ESP32 controllers and PLC terminals interface directly with machinery sensors via Modbus RTU or OPC Unified Architecture (OPC UA). Modbus RTU, operating over RS-485, remains a robust standard for legacy sensors. However, OPC UA provides semantic metadata structures, making it the preferred standard for modern cyber-physical systems.
        </p>

        <div className="bg-[#07041a] p-4 rounded-xl border border-purple-900/30 text-emerald-400 font-mono text-xs overflow-x-auto">
          {`// Sample MQTT Payload formatted for AWS IoT Core broker
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

        <blockquote className="border-l-4 border-purple-500 pl-4 py-1.5 my-6 bg-purple-500/5 text-slate-800 dark:text-gray-200 font-medium italic rounded-r-lg">
          "By implementing TLS 1.3 client certificate authorization directly at the microcontroller firmware layer, we eliminate the threat of machine spoofing and unauthorized data injection."
        </blockquote>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Cloud Rule Engines & Real-time Dashboards</h3>
        <p>
          Upon reaching AWS IoT Core or Azure IoT Hub, the payloads are evaluated by SQL-like rule engines. Critical alerts are routed immediately to SMS/Email notification brokers (SNS/SES), while warm telemetry is piped into Timestream databases for real-time dashboard visualizations. Historical aggregates are stored in S3 datalakes to train machinery anomaly detection models.
        </p>
      </div>
    )
  },
  'future-of-erp': {
    title: 'The Future of ERP: Scalable Cloud Architecture and AI-Powered Automation',
    category: 'Enterprise SaaS',
    date: 'Jul 28, 2026',
    author: 'Deepak Sharma',
    role: 'VP of Enterprise Solutions',
    readTime: '7 min read',
    image: '/assets/images/new-home/blog_erp.png',
    body: (
      <div className="space-y-6 text-slate-700 dark:text-gray-350 text-sm leading-relaxed">
        <p className="text-[15px] font-medium text-slate-900 dark:text-white leading-relaxed">
          Legacy monolithic ERP installations are rapidly being replaced by distributed, event-driven SaaS architectures. Today’s competitive landscape demands real-time material replenishment and automated workflows.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. Monolith to Distributed Cloud Microservices</h3>
        <p>
          Traditional ERPs operated on single database instances, causing scaling bottlenecks during peak order runs. Modern cloud-native ERPs deploy modular microservices running in Docker containers orchestrated by Kubernetes. This ensures the Purchase module can scale independently from HR, Asset Management, or General Ledger accounting without impacting the core system.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. Automated Procurement with 3-Way Inward Match</h3>
        <p>
          Procurement processes often suffer from manual entry bottlenecking. Modern ERP automation triggers purchase requisitions the second stock levels breach minimum reorder thresholds. The system releases digital RFQs to suppliers, processes received bids, issues POs, and executes a 3-way invoice match:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Purchase Order Verification:</strong> Verifies requested item codes, quantities, and agreed prices.</li>
          <li><strong>Goods Received Note (GRN):</strong> Scans barcodes or RFID chips at the dock to confirm actual physical arrival.</li>
          <li><strong>Supplier Invoice:</strong> Automatically matches invoice totals against the PO and GRN logs.</li>
        </ul>

        <div className="bg-[#07041a] p-4 rounded-xl border border-purple-900/30 text-emerald-400 font-mono text-xs overflow-x-auto my-4">
          {`// Automated 3-Way Match Verification logic
const verifyThreeWayMatch = (po, grn, invoice) => {
  const quantityMatch = po.quantity === grn.receivedQuantity;
  const priceMatch = po.unitPrice === invoice.unitPrice;
  return quantityMatch && priceMatch;
};`}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. AI Insights and Financial Ledger Synchronization</h3>
        <p>
          Once matched, the invoice is auto-released to accounts payable. General ledger entries are compiled instantly using double-entry booking standards and formatted for local tax filing guidelines (e.g. GST/VAT e-way billing). Executive dashboards leverage predictive forecasting to audit cashflow margins and project future inventory needs.
        </p>
      </div>
    )
  },
  'crm-conversions': {
    title: 'Unlocking CRM Conversions: Leveraging AI Intent Scoring & Smart Funnels',
    category: 'Sales Tech',
    date: 'Jul 24, 2026',
    author: 'Meera Iyer',
    role: 'CRM Solutions Director',
    readTime: '4 min read',
    image: '/assets/images/new-home/blog_crm.png',
    body: (
      <div className="space-y-6 text-slate-700 dark:text-gray-350 text-sm leading-relaxed">
        <p className="text-[15px] font-medium text-slate-900 dark:text-white leading-relaxed">
          High traffic is meaningless if sales agents are wasting valuable hours on cold leads. Modern CRMs solve this problem through real-time lead grading and automation.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">1. Multi-Channel Lead Ingestion & Profile Deduplication</h3>
        <p>
          Leads stream into CRM tables from Facebook ads, Google webforms, email drips, and live chats. To keep database records clean, an ingestion deduplication engine matches emails, phone hashes, and cookies, merging profiles into a single contact timeline to prevent overlapping outreach.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. AI Intent Scoring Model</h3>
        <p>
          Every prospect action (opening an email, viewing a pricing page, downloading a whitepaper) adds points to their intent score (1 to 100). The scoring model evaluates their profile fit (industry size, country, revenue bracket) against historical customer profiles to predict closing probability.
        </p>

        <blockquote className="border-l-4 border-purple-500 pl-4 py-1.5 my-6 bg-purple-500/5 text-slate-800 dark:text-gray-200 font-medium italic rounded-r-lg">
          "When a lead score breaches 85 points, the CRM automatically flags them as high-intent and executes real-time routing to sales representatives."
        </blockquote>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Round-Robin Routing and E-Signature CPQ Quotes</h3>
        <p>
          To maintain high speed-to-lead times, high-intent contacts are dispatched to active reps via skill-based round-robin algorithms. Representatives utilize configure-price-quote (CPQ) templates to instantly generate digital quotes with built-in discount safety rails, allowing clients to sign contract terms on mobile web portals immediately.
        </p>
      </div>
    )
  }
};

// Fallback metadata for other blog posts
const getFallbackPost = (id) => ({
  title: id ? id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Tech Insights',
  category: 'Web Engineering',
  date: 'Jul 15, 2026',
  author: 'Codigix Tech Team',
  role: 'Engineering Contributors',
  readTime: '6 min read',
  image: '/assets/images/service/web_dev_dashboard.webp',
  body: (
    <div className="space-y-6 text-slate-700 dark:text-gray-350 text-sm leading-relaxed">
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
            image: data.image ? (data.image.startsWith('http') || data.image.startsWith('data:') ? data.image : `/assets/images/blog/${data.image}${data.image.includes('.') ? '' : '.jpg'}`) : '/assets/images/service/web_dev_dashboard.webp',
            body: data.body || 'No content written yet.'
          });
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        setPost(null);
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
      <div className="bg-theme-bg min-h-screen font-sans flex flex-col items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
        <NewHomeNav />
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-650 rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase font-extrabold tracking-widest text-slate-500">Retrieving Insight Details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-theme-bg min-h-screen font-sans flex flex-col items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
        <NewHomeNav />
        <p className="text-sm font-bold uppercase tracking-wider text-rose-500 mb-2">Blog post not found</p>
        <Link to="/blog" className="text-xs text-purple-650 hover:underline">Back to Blog list</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Codigix Blog</title>
      </Helmet>

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Navigation */}
        <NewHomeNav />

        {/* Article Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          
          {/* Back button & Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-400 tracking-wide uppercase font-bold">
              <span>Home</span>
              <ChevronRight size={10} />
              <span>Blog</span>
              <ChevronRight size={10} />
              <span className="text-purple-600 dark:text-purple-400 truncate max-w-[200px]">{post.title}</span>
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
                <div className="flex items-center gap-4 border-y border-slate-100 dark:border-gray-800/80 py-4 mt-6">
                  <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                    {post.author.split(' ').map(n => n[0]).join('')}
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
              <div className="w-full h-[380px] rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-gray-800 shadow-md">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Dynamic Article Body */}
              <article className="prose prose-slate dark:prose-invert max-w-none mb-14 text-left">
                {typeof post.body === 'string' ? (
                  <div className="whitespace-pre-line text-slate-750 dark:text-gray-300 text-[15px] leading-relaxed space-y-4">
                    {post.body}
                  </div>
                ) : (
                  post.body
                )}
              </article>

              {/* Article Interaction Row */}
              <div className="flex items-center gap-6 border-t border-slate-100 dark:border-gray-800/80 pt-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 rounded-xl border ${
                    hasLiked 
                    ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-600'
                    : 'bg-white dark:bg-[#07041c] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-400 hover:border-rose-400 hover:text-rose-500'
                  }`}
                >
                  <Heart size={14} className={hasLiked ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{likes} Likes</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 bg-white dark:bg-[#07041c] border border-slate-200 dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-400 hover:border-purple-400 hover:text-purple-500">
                  <MessageSquare size={14} />
                  <span>Write Comment</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-bold transition-all px-4 py-2.5 bg-white dark:bg-[#07041c] border border-slate-200 dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-400 hover:border-purple-400 hover:text-purple-500 ml-auto">
                  <Share2 size={14} />
                  <span>Share Article</span>
                </button>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:w-[30%]">
              <div className="sticky top-28 space-y-8 text-left">
                
                {/* Recent Articles Widget */}
                <div className="bg-white dark:bg-[#07041c] border border-slate-200 dark:border-purple-900/30 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-gray-800/80">
                    Recent Articles
                  </h3>

                  <div className="space-y-4">
                    <Link to="/blog/industrial-iot" className="group block">
                      <span className="text-[9px] uppercase font-bold text-purple-600 dark:text-purple-400">IoT & Industry 4.0</span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2 mt-1">Unlocking Industrial IoT: Bridging Physical Devices with Cloud Telemetry</h4>
                    </Link>

                    <Link to="/blog/future-of-erp" className="group block">
                      <span className="text-[9px] uppercase font-bold text-purple-600 dark:text-purple-400">Enterprise SaaS</span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2 mt-1">The Future of ERP: Scalable Cloud Architecture and AI-Powered Automation</h4>
                    </Link>

                    <Link to="/blog/crm-conversions" className="group block">
                      <span className="text-[9px] uppercase font-bold text-purple-600 dark:text-purple-400">Sales Tech</span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2 mt-1">Unlocking CRM Conversions: Leveraging AI Intent Scoring & Smart Funnels</h4>
                    </Link>
                  </div>
                </div>

                {/* Newsletter Subscribe Card */}
                <div className="bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-[#07041c] border border-purple-900/40 rounded-2xl p-5 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <Bookmark className="text-purple-600 dark:text-purple-400 mb-3" size={24} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Subscribe to Tech Journal</h3>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                    Get weekly hardware, cloud, and engineering insights directly in your inbox. No spam.
                  </p>
                  
                  <input
                    type="email"
                    placeholder="Enter email address..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-black/40 text-xs font-semibold placeholder-slate-400 dark:placeholder-gray-500 mb-2 focus:outline-none focus:border-purple-500"
                  />
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
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
