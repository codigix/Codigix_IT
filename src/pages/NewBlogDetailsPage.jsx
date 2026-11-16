import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare, Heart, Bookmark, ChevronRight, Sparkles, CheckCircle2, Search, Facebook, Linkedin, Twitter, Link as LinkIcon, Eye } from 'lucide-react';
import * as Icons from 'lucide-react';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import SEO from '../components/SEO';
import config from '../config';
import { fetchBlog, useBlogs, blogPath, blogImage, getBlogSeo } from '../utils/blogs';

// AI image spots like "[INSERT CONTENT IMAGE 1 HERE – ERP Dashboard]" that were never
// filled in the admin are hidden from visitors (whole paragraph when that's all it holds).
const PLACEHOLDER = String.raw`\[\s*INSERT\s+(?:CONTENT\s+)?IMAGE[^\]]*\]`;
const PLACEHOLDER_BLOCK_RE = new RegExp(
  String.raw`<(p|div|h[1-6])\b[^>]*>\s*(?:<(?:strong|b|em|i|span|u)\b[^>]*>\s*)*${PLACEHOLDER}\s*(?:<\/(?:strong|b|em|i|span|u)>\s*)*<\/\1>`,
  'gi'
);
const PLACEHOLDER_RE = new RegExp(PLACEHOLDER, 'gi');
const stripImagePlaceholders = (html) =>
  typeof html === 'string' ? html.replace(PLACEHOLDER_BLOCK_RE, '').replace(PLACEHOLDER_RE, '') : html;

const NewBlogDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, message: '', type: '' });

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      // 1. Check for Preview Mode
      if (id === 'preview') {
        const previewStr = localStorage.getItem('blog_preview_data');
        if (previewStr) {
          const data = JSON.parse(previewStr);
          setPost({
            title: data.title || 'Untitled Preview',
            category: data.category || 'Preview',
            sub_category: data.sub_category || '',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            author: 'Preview Author',
            role: 'Codigix Tech Team',
            readTime: '0 min read',
            image: data.image || '/assets/images/blog/blog_web_engineering.webp',
            image_alt: data.image_alt || '',
            image_caption: data.image_caption || '',
            image_credit: data.image_credit || '',
            excerpt: data.excerpt || '',
            body: data.body || 'No content written yet.',
            ai_summary: data.ai_summary || '',
            key_takeaways: data.key_takeaways || [],
            faqs: data.faqs || [],
            cta_heading: data.cta_heading || '',
            cta_description: data.cta_description || '',
            cta_button_text: data.cta_button_text || '',
            cta_button_url: data.cta_button_url || '',
            tags: data.tags || '',
            content_blocks: data.content_blocks || []
          });
          setLoading(false);
          return;
        }
      }

      // 2. Published post from the database (admin → Blogs), by slug or id
      setLoadError(false);
      try {
        const data = await fetchBlog(id);
        if (data) {
          setPost({
            id: data.id,
            slug: data.slug || '',
            image_alt: data.image_alt || '',
            title: data.title,
            category: data.category,
            sub_category: data.sub_category || '',
            date: data.date,
            author: data.author || 'Codigix Tech Team',
            role: data.role || 'Engineering Contributor',
            readTime: data.readTime || '5 min read',
            publication_time: data.publication_time || '',
            image: blogImage(data),
            image_caption: data.image_caption || '',
            image_credit: data.image_credit || '',
            excerpt: data.excerpt || '',
            body: data.body || 'No content written yet.',
            views: data.views || 0,
            likes: data.likes || 0,
            ai_summary: data.ai_summary || '',
            key_takeaways: data.key_takeaways ? (typeof data.key_takeaways === 'string' ? JSON.parse(data.key_takeaways) : data.key_takeaways) : [],
            faqs: data.faqs ? (typeof data.faqs === 'string' ? JSON.parse(data.faqs) : data.faqs) : [],
            cta_heading: data.cta_heading || '',
            cta_description: data.cta_description || '',
            cta_button_text: data.cta_button_text || '',
            cta_button_url: data.cta_button_url || '',
            tags: data.tags || '',
            content_blocks: data.content_blocks ? (typeof data.content_blocks === 'string' ? JSON.parse(data.content_blocks) : data.content_blocks) : [],
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
            seo_keywords: data.seo_keywords || '',
            social_image: data.social_image || ''
          });
          setLikes(data.likes || 0);

          // Track view
          fetch(`${config.API_BASE_URL}/blogs/${data.id}/view`, { method: 'PUT' }).catch(console.error);

          // Fetch Comments
          {
            try {
              const commentRes = await fetch(`${config.API_BASE_URL}/blogs/${data.id}/comments`);
              if (commentRes.ok) {
                const commentData = await commentRes.json();
                setComments(commentData);
              }
            } catch (err) {
              console.error("Error fetching comments", err);
            }
          }

        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        setPost(null);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const { posts: allBlogs } = useBlogs();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const handleLike = async () => {
    if (!hasLiked && id !== 'preview') {
      try {
        await fetch(`${config.API_BASE_URL}/blogs/${post.id}/like`, { method: 'PUT' });
        setLikes(l => l + 1);
        setHasLiked(true);
      } catch (err) {
        console.error("Error toggling like:", err);
      }
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus({ loading: true, message: '', type: '' });
    try {
      const response = await fetch(`${config.API_BASE_URL}/newsletters/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newsletterEmail })
      });

      const data = await response.json();
      if (response.ok) {
        setNewsletterStatus({ loading: false, message: 'Subscribed successfully!', type: 'success' });
        setNewsletterEmail('');
      } else {
        setNewsletterStatus({ loading: false, message: data.error || 'Failed to subscribe', type: 'error' });
      }
    } catch (err) {
      console.error("Newsletter error", err);
      setNewsletterStatus({ loading: false, message: 'Something went wrong', type: 'error' });
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim() || id === 'preview') return;
    setIsSubmittingComment(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/blogs/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCommentName, comment: newCommentText })
      });
      if (response.ok) {
        const addedComment = await response.json();
        setComments([addedComment, ...comments]);
        setNewCommentName('');
        setNewCommentText('');
      }
    } catch (err) {
      console.error("Error adding comment", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'Check out this article');
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
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
        <SEO title="Article Not Found | Codigix Blog" exactTitle={true} robots="noindex, follow" description="This article is not available." />
        <NewHomeNav />
        <h1 className="text-2xl font-bold mb-4">{loadError ? 'Article could not be loaded' : 'Article Not Found'}</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">{loadError ? 'Please try again in a moment.' : 'It may have been moved or removed.'}</p>
        <Link to="/blog" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  // Use real backend blogs exclusively
  const availableBlogs = allBlogs;
  // Old numeric URLs (/blog/16) move to the slug URL
  if (id !== 'preview' && /^\d+$/.test(id) && post.slug) return <Navigate to={blogPath(post)} replace />;

  const filteredAvailable = availableBlogs.filter(p => String(p.id) !== String(post.id));

  // Recent 4 posts
  const recentPosts = filteredAvailable.slice(0, 4);
  // Popular posts (just slice the next 4)
  const popularPosts = filteredAvailable.length > 4 ? filteredAvailable.slice(4, 8) : filteredAvailable.slice(0, 4);

  // Compute category counts dynamically from backend blogs
  const categoryCounts = availableBlogs.reduce((acc, curr) => {
    const cat = curr.category || 'General';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const dynamicCategories = [
    { name: 'All Categories', count: availableBlogs.length, active: !post.category },
    ...Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
      active: name === post.category
    }))
  ];

  const renderSidebarCategories = () => (
    <div className="mb-10">
      <h3 className="text-[15px] font-black text-slate-900 dark:text-white mb-4">Categories</h3>
      <ul className="space-y-3">
        {dynamicCategories.map((cat, i) => (
          <li key={i} className="flex items-center justify-between group cursor-pointer">
            <span className={`text-sm font-semibold transition-colors ${cat.active ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-gray-400 group-hover:text-purple-600'}`}>{cat.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${cat.active ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-slate-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
              {cat.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTagsCloud = () => {
    if (!post.tags) return null;
    return (
      <div className="mb-10">
        <h3 className="text-[15px] font-black text-slate-900 dark:text-white mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.split(',').map((tag, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-slate-50 dark:bg-[#0c0828] text-slate-600 dark:text-gray-300 text-[11px] font-bold rounded flex items-center gap-1 border border-slate-200 dark:border-gray-800 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors cursor-pointer">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderDynamicBlocks = () => {
    if (!post.content_blocks || post.content_blocks.length === 0) return null;

    return post.content_blocks.map((block) => {
      if (block.type === 'workflow') {
        return (
          <div key={block.id} className="mb-14">
            {block.title && <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{block.title}</h3>}
            <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 sm:p-4 shadow-sm overflow-x-auto">
              <div className="flex items-center min-w-max gap-4 sm:gap-8 justify-between">
                {block.items.map((item, idx) => {
                  const IconComp = item.icon ? Icons[item.icon] : Icons.Server;
                  return (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center text-center max-w-[120px]">
                        <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-3">
                          {IconComp && <IconComp size={24} strokeWidth={1.5} />}
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
                        {item.subtitle && <p className="text-[9px] text-slate-500 mt-1">{item.subtitle}</p>}
                      </div>
                      {idx < block.items.length - 1 && (
                        <div className="flex-shrink-0 text-slate-300 dark:text-gray-600">
                          <Icons.ArrowRight size={20} strokeWidth={1.5} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      if (block.type === 'feature_grid') {
        return (
          <div key={block.id} className="mb-14">
            {block.title && <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{block.title}</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {block.items.map((item, idx) => {
                const IconComp = item.icon ? Icons[item.icon] : Icons.CheckCircle;
                return (
                  <div key={idx} className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        {IconComp && <IconComp size={16} strokeWidth={2} />}
                      </div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight pt-1">{item.title}</h4>
                    </div>
                    {item.description && <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed font-medium">{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  // Title max 60 / description max 160 characters (admin SEO fields, else title and excerpt)
  const seo = getBlogSeo(post);
  // Social previews need an image URL; inline (data:) images can't be shared
  const shareableImage = [post.social_image, post.image].find((src) => src && !String(src).startsWith('data:'));
  const ogImage = shareableImage
    ? (shareableImage.startsWith('http') ? shareableImage : `https://codigixinfotech.com${shareableImage}`)
    : 'https://codigixinfotech.com/assets/images/service/erp_dash.webp';

  return (
    <>
      <SEO
        title={seo.title}
        exactTitle={true}
        description={seo.description}
        keywords={post.seo_keywords || "Codigix blog, tech insights"}
        canonical={seo.canonical}
        robots={id === 'preview' ? 'noindex, nofollow' : undefined}
        ogType="article"
        ogImage={ogImage}
      />

      <div className="bg-white dark:bg-[#030014] min-h-screen font-sans text-slate-900 dark:text-white transition-colors duration-300">
        <NewHomeNav />

        <div id="main-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-36 pb-20">

          {/* Top Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/blog" className="hover:text-purple-600 transition-colors">Blog</Link>
            <ChevronRight size={10} />
            {post.category && (
              <>
                <Link to="/blog" className="hover:text-purple-600 transition-colors">{post.category}</Link>
                <ChevronRight size={10} />
              </>
            )}
            <span className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* ---------------- LEFT COLUMN (MAIN CONTENT) ---------------- */}
            <div className="lg:col-span-8 xl:col-span-9">

              {/* Featured Image (blogs.image) */}
              <figure className="mb-8">
                <div className="w-full h-[350px] md:h-[450px] xl:h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 shadow-sm bg-slate-100 dark:bg-[#0c0828]">
                  <img
                    src={post.image}
                    alt={post.image_alt || post.title}
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/blog/blog_web_engineering.webp';
                    }}
                  />
                </div>
                {(post.image_caption || post.image_credit) && (
                  <figcaption className="mt-2 text-center text-[11px] text-slate-500 dark:text-gray-400">
                    {post.image_caption}
                    {post.image_caption && post.image_credit && ' · '}
                    {post.image_credit && <span className="italic">Image: {post.image_credit}</span>}
                  </figcaption>
                )}
              </figure>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.category && <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-sm border border-purple-600">{post.category}</span>}
                {post.sub_category && <span className="px-3 py-1 bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold rounded-sm border border-slate-200 dark:border-gray-700">{post.sub_category}</span>}
              </div>

              {/* Title & Excerpt */}
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-slate-200 dark:border-gray-800/80 py-5 mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {post.author ? post.author.charAt(0) : 'C'}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">{post.author}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400">{post.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
                  {post.publication_time && <span className="flex items-center gap-1.5"><Clock size={13} /> {post.publication_time}</span>}
                  <span className="flex items-center gap-1.5"><Bookmark size={13} /> {post.readTime}</span>
                  <span className="flex items-center gap-1.5"><Eye size={13} /> {post.views || 0} Views</span>
                </div>
              </div>

              {/* Social Share Row */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-gray-800/50">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400">Share:</span>
                  <div className="flex gap-4 text-slate-400 dark:text-gray-500">
                    <Facebook onClick={() => handleShare('facebook')} size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                    <Linkedin onClick={() => handleShare('linkedin')} size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                    <Twitter onClick={() => handleShare('twitter')} size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                    <LinkIcon onClick={() => handleShare('copy')} size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-5 text-[11px] font-bold text-slate-500 dark:text-gray-400">
                  <span onClick={handleLike} className="flex items-center gap-1.5 cursor-pointer hover:text-rose-500 transition-colors">
                    <Heart size={15} className={hasLiked ? 'fill-rose-500 text-rose-500' : ''} /> {likes}
                  </span>
                  <a href="#comments-section" className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-500 transition-colors">
                    <MessageSquare size={15} /> {comments.length}
                  </a>
                  <Bookmark size={15} className="cursor-pointer hover:text-purple-600 transition-colors ml-2" />
                </div>
              </div>

              {/* AI Summary Block */}
              {post.ai_summary && (
                <div className="bg-indigo-50/80 dark:bg-[#07041c] border-l-4 border-indigo-500 p-5 rounded-r-xl mb-10 text-slate-700 dark:text-gray-300 shadow-sm">
                  <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles size={14} /> AI Search Summary
                  </h4>
                  <p className="text-[13px] leading-relaxed font-medium">{post.ai_summary}</p>
                </div>
              )}

              {/* Dynamic Article Body */}
              <article className="prose prose-slate dark:prose-invert max-w-none mb-10 text-left">
                {typeof post.body === 'string' ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: stripImagePlaceholders(post.body) }}
                    className="text-slate-700 dark:text-gray-300 text-[15px] leading-relaxed space-y-4 font-normal [&_img]:block [&_img]:mx-auto [&_img]:w-auto [&_img]:max-w-full! [&_img]:h-auto! [&_img]:max-h-[420px] md:[&_img]:max-h-[480px] [&_img]:object-contain [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200 dark:[&_img]:border-gray-800 [&_img]:shadow-sm [&_img]:my-8 [&_figure]:my-10 [&_figure_img]:my-0 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-slate-500 dark:[&_figcaption]:text-gray-400"
                  />
                ) : (
                  post.body
                )}
              </article>

              {/* Dynamic Structured Blocks (Workflows, Grids, etc) */}
              {renderDynamicBlocks()}

              {/* Key Takeaways */}
              {post.key_takeaways && post.key_takeaways.length > 0 && (
                <div className="bg-slate-50 dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 mb-14 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Key Takeaways</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.key_takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[13px] text-slate-700 dark:text-gray-300 bg-white dark:bg-[#07041a] p-4 rounded-xl border border-slate-100 dark:border-gray-800 shadow-sm">
                        <CheckCircle2 size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                        <span className="leading-relaxed font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mb-14 pt-8 border-t border-slate-200 dark:border-gray-800/80">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className={`bg-slate-50 dark:bg-[#07041c] border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${activeFaqIndex === idx ? 'border-purple-300 dark:border-purple-900/50 bg-purple-50/30 dark:bg-[#0c0828]' : 'border-slate-200 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900/30'}`}>
                        <button
                          onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                        >
                          <h4 className={`text-sm font-bold transition-colors ${activeFaqIndex === idx ? 'text-purple-700 dark:text-purple-400' : 'text-slate-900 dark:text-white group-hover:text-purple-600'}`}>{faq.question}</h4>
                          <Icons.ChevronDown size={18} className={`transition-transform duration-300 shrink-0 ${activeFaqIndex === idx ? 'rotate-180 text-purple-600 dark:text-purple-400' : 'text-slate-400 group-hover:text-purple-400'}`} />
                        </button>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaqIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="p-5 pt-0 text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom CTA Banner (Inline) */}
              {post.cta_heading && (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-14 shadow-xl">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{post.cta_heading}</h3>
                    <p className="text-purple-100 text-sm leading-relaxed max-w-lg">{post.cta_description}</p>
                  </div>
                  {post.cta_button_text && (
                    <a href={post.cta_button_url || '#'} className="whitespace-nowrap px-6 py-3 bg-white text-indigo-700 text-sm font-bold rounded-xl shadow-md hover:bg-slate-50 hover:shadow-lg transition-all flex items-center gap-2">
                      {post.cta_button_text} <ChevronRight size={16} />
                    </a>
                  )}
                </div>
              )}

              {/* About Author Box */}
              <div className="bg-slate-50 dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start mb-14 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-purple-900 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                  {post.author ? post.author.charAt(0) : 'C'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">About Author</h4>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{post.author}</h3>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mb-3">{post.role}</p>
                  <p className="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
                    We build innovative AI, IoT and ERP solutions that help businesses automate processes, improve efficiency and drive digital transformation.
                  </p>
                  <div className="flex items-center gap-4 text-slate-400 dark:text-gray-500">
                    <Linkedin size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                    <Twitter size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                    <MessageSquare size={15} className="hover:text-purple-600 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div id="comments-section" className="mb-14 border-t border-slate-200 dark:border-gray-800/80 pt-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Discussion ({comments.length})</h3>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="bg-slate-50 dark:bg-[#07041c] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 mb-4">Leave a Comment</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="w-full bg-white dark:bg-[#030014] border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <textarea
                      placeholder="Your Thoughts *"
                      required
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full bg-white dark:bg-[#030014] border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingComment}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
                    >
                      {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                  ) : (
                    comments.map(comment => (
                      <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex items-center justify-center font-bold shrink-0">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="bg-slate-50 dark:bg-[#0c0828] border border-slate-100 dark:border-gray-800 p-4 rounded-2xl rounded-tl-none w-full shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-[13px] font-bold text-slate-900 dark:text-white">{comment.name}</h5>
                            <span className="text-[10px] text-slate-400 dark:text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line">{comment.comment}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Related Articles Row */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentPosts.length === 0 ? (
                    <div className="col-span-full py-8 text-center bg-slate-50 dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-xl">
                      <p className="text-sm text-slate-500 dark:text-gray-400 font-medium italic">No related articles available at this time.</p>
                    </div>
                  ) : (
                    recentPosts.map(rp => (
                      <Link key={rp.id} to={blogPath(rp)} className="group flex flex-col">
                        <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 border border-slate-200 dark:border-gray-800 bg-slate-100">
                          <img src={blogImage(rp)} alt={rp.image_alt || rp.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wider mb-1">{rp.category}</span>
                        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 transition-colors line-clamp-3 mb-2">{rp.title}</h4>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-auto"><Clock size={10} /> {rp.readTime}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>

            </div>


            {/* ---------------- RIGHT COLUMN (SIDEBAR) ---------------- */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-12 lg:sticky lg:top-32">

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041c] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 shadow-sm"
                />
                <button aria-label="Search" className="absolute right-1 top-1 bottom-1 w-10 bg-purple-600 text-white flex items-center justify-center rounded-lg hover:bg-purple-700 transition-colors">
                  <Search size={16} />
                </button>
              </div>

              {/* Categories */}
              {renderSidebarCategories()}

              {/* Popular Posts */}
              <div>
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white mb-5">Popular Posts</h3>
                <div className="space-y-4">
                  {popularPosts.length === 0 ? (
                    <div className="py-6 text-center bg-slate-50 dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-gray-400 font-medium italic">No popular posts available.</p>
                    </div>
                  ) : (
                    popularPosts.map((pp, idx) => (
                      <Link key={idx} to={blogPath(pp)} className="group flex gap-4 items-center">
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-gray-800">
                          <img src={blogImage(pp)} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pp.image_alt || pp.title} />
                        </div>
                        <div>
                          <h4 className="text-[12px] font-bold text-slate-800 dark:text-gray-200 leading-snug group-hover:text-purple-600 line-clamp-2 mb-1.5">{pp.title}</h4>
                          <span className="text-[9px] text-slate-500 flex items-center gap-1"><Calendar size={9} /> {pp.date}</span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Tags Cloud */}
              {renderTagsCloud()}

              {/* Newsletter Sub */}
              <div className="bg-slate-50 dark:bg-[#0c0828] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[15px] font-black text-slate-900 dark:text-white mb-2">Newsletter</h3>
                <p className="text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed font-medium mb-4">
                  Get the latest insights on AI, IoT, ERP and digital transformation straight to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#07041a] text-sm mb-3 focus:outline-none focus:border-purple-600"
                  />
                  <button 
                    type="submit" 
                    disabled={newsletterStatus.loading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-md transition-colors mb-3 disabled:opacity-70 flex justify-center"
                  >
                    {newsletterStatus.loading ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : 'Subscribe'}
                  </button>
                  {newsletterStatus.message && (
                    <p className={`text-[11px] mb-3 text-center font-semibold ${newsletterStatus.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {newsletterStatus.message}
                    </p>
                  )}
                </form>
                <p className="text-[9px] text-slate-400 text-center">We respect your privacy. Unsubscribe anytime.</p>
              </div>

            </div>

          </div>
        </div>

        {/* Global Footer Fallback (if no custom CTA, or just the standard footer) */}
        {!post.cta_heading && (
          <div className="pt-12 border-t border-slate-200 dark:border-gray-800/30 bg-slate-50/50 dark:bg-black/20 mt-10">
            <CtaFooterSection />
          </div>
        )}
      </div>
    </>
  );
};

export default NewBlogDetailsPage;
