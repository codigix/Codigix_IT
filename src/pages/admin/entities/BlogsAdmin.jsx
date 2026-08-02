import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus,
  Trash2,
  Save,
  X,
  Edit,
  Image as ImageIcon,
  BookOpen,
  UploadCloud,
  Loader2,
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Clock,
  Tag,
  LayoutGrid,
  List,
  Sparkles,
  FileText,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

import { blogPostsData } from '../../../data/blogData';

const fallbackBlogPosts = blogPostsData.map((post, idx) => ({
  id: idx + 1,
  title: post.title,
  category: post.category,
  date: post.date,
  author: post.author,
  role: post.role || 'Technical Lead',
  readTime: post.readTime || '5 min read',
  image: post.image,
  body: post.excerpt || (typeof post.content === 'string' ? post.content.replace(/<[^>]+>/g, '').slice(0, 200) + '...' : 'Comprehensive technology insight article.')
}));

const ImageUploader = ({ label, value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Image upload failed. Please check network connection.');
    } finally {
      setIsUploading(false);
    }
  };

  const onPaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleUpload(file);
        e.preventDefault();
        break;
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">{label}</label>
      <div
        className="relative border-2 border-dashed border-purple-300 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 rounded-xl p-4 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={() => fileInputRef.current?.click()}
        onPaste={onPaste}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
          }
        }}
        tabIndex="0"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
        {value ? (
          <div className="relative w-full h-28 bg-slate-900/80 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity border border-purple-500/30">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold bg-purple-600/90 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                <UploadCloud size={14} /> Change Cover Image
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <ImageIcon size={30} className="text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform mx-auto mb-2" />
            <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold">Click, Drag, or Paste Cover Image</p>
            <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-1">PNG, JPG, WEBP or GIF supported</p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-2">
            <Loader2 size={24} className="animate-spin text-purple-400" />
            <span className="text-xs font-semibold">Uploading to Cloud...</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste external image URL directly..."
          className="w-full bg-white dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-lg p-2 focus:border-purple-500 focus:outline-none text-xs transition-colors"
        />
      </div>
    </div>
  );
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewBlog, setPreviewBlog] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'IoT & Industry 4.0',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: '',
    role: '',
    readTime: '5 min read',
    image: '',
    body: ''
  });

  const categories = [
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

  // Fetch blogs from DB
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogPosts);
        }
      } else {
        setBlogs(fallbackBlogPosts);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setBlogs(fallbackBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Form Handlers
  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      category: 'IoT & Industry 4.0',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Codigix Tech Team',
      role: 'Technology Lead',
      readTime: '5 min read',
      image: '',
      body: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      category: blog.category || 'IoT & Industry 4.0',
      date: blog.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: blog.author || '',
      role: blog.role || '',
      readTime: blog.readTime || '5 min read',
      image: blog.image || '',
      body: blog.body || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a blog title.');
      return;
    }

    try {
      if (editingBlog) {
        // PUT update
        const response = await fetch(`${API_BASE}/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Update failed');
      } else {
        // POST create
        const response = await fetch(`${API_BASE}/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Creation failed');
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      // Local optimistic fallback update if database table fails
      if (editingBlog) {
        setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...b, ...formData } : b));
      } else {
        setBlogs(prev => [{ id: Date.now(), ...formData }, ...prev]);
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE' });
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  // Filter & Search Logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.author || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.body || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate Metrics
  const totalArticles = blogs.length;
  const uniqueAuthors = new Set(blogs.map(b => b.author)).size;
  const uniqueCategories = new Set(blogs.map(b => b.category)).size;

  return (
    <div className="mx-auto min-h-screen text-slate-900 dark:text-slate-100">

      {/* 1. TOP HEADER & METRICS BAR */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <BookOpen size={20} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Blog Articles Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
            Publish, edit, and curate thought leadership articles & engineering blogs.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 shrink-0 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Create New Article
        </button>
      </div>

      {/* 2. STATS CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Articles</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalArticles}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Tag size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categories</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{uniqueCategories}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <User size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Authors</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{uniqueAuthors}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Read Time</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">5.5 Mins</h3>
          </div>
        </div>
      </div>

      {/* 3. FILTER & TOOLBAR ROW */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white pl-10 pr-4 py-2 rounded-xl focus:border-purple-500 focus:outline-none text-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 hidden sm:block" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white px-3 py-2 rounded-xl text-xs focus:border-purple-500 focus:outline-none"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07041a] p-1 rounded-xl border border-slate-200 dark:border-purple-900/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-purple-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* 4. CONTENT AREA: GRID OR TABLE */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="animate-spin text-purple-500" />
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Loading blog articles...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 p-8">
          <AlertCircle size={40} className="text-purple-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Blog Articles Found</h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new blog article to get started.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add First Blog Post
          </button>
        </div>
      ) : viewMode === 'grid' ? (

        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 overflow-hidden shadow-md dark:shadow-2xl hover:border-purple-500/50 transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image Container */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={blog.image || '/assets/images/service/web_dev_dashboard.webp'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/service/web_dev_dashboard.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-md">
                  {blog.category || 'General'}
                </div>

                {/* Read Time */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-gray-200 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
                  <Clock size={11} className="text-purple-400" />
                  {blog.readTime || '5 min read'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-purple-300 font-medium mb-2">
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {blog.body}
                  </p>
                </div>

                {/* Author Info & Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-purple-900/20 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 border border-purple-500/30">
                      {(blog.author || 'C')[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{blog.author || 'Author'}</p>
                      <p className="text-[10px] text-slate-400 dark:text-gray-500 truncate">{blog.role || 'Contributor'}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setPreviewBlog(blog)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                      title="Preview Article"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(blog)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                      title="Edit Article"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (

        /* TABLE VIEW */
        <div className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#07041a] border-b border-slate-200 dark:border-purple-900/30 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Title & Excerpt</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20 text-xs">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20 transition-colors">
                    <td className="p-4 w-20">
                      <img
                        src={blog.image || '/assets/images/service/web_dev_dashboard.webp'}
                        alt={blog.title}
                        className="w-14 h-10 object-cover rounded-lg border border-purple-500/20"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/service/web_dev_dashboard.webp';
                        }}
                      />
                    </td>
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{blog.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate mt-0.5">{blog.body}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[10px]">
                        {blog.category || 'General'}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 dark:text-gray-200">{blog.author || 'N/A'}</p>
                      <p className="text-[10px] text-slate-400 dark:text-gray-500">{blog.role || 'Author'}</p>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-gray-400 whitespace-nowrap">
                      {blog.date}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewBlog(blog)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                          title="Preview"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(blog)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CREATE / EDIT BLOG MODAL (PORTAL) */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-auto">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Fill in the details below to publish to your site.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-5">

              {/* Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Unlocking Industrial IoT: Bridging Physical Devices with Cloud Telemetry"
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors font-medium"
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. IoT & Industry 4.0"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Publication Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Aug 1, 2026"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Suresh Nair"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Author Role / Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Principal Solutions Architect"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Read Time & Image Uploader */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors mb-4"
                />
              </div>

              {/* Image Upload */}
              <ImageUploader
                label="Article Cover Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              {/* Body */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Blog Content / Body Paragraphs</label>
                <textarea
                  rows={8}
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Write or paste your full blog post content here..."
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs leading-relaxed transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-purple-900/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
                >
                  <Save size={16} /> Save Article
                </button>
              </div>

            </form>

          </div>
        </div>,
        document.body
      )}

      {/* 6. PREVIEW BLOG MODAL (PORTAL) */}
      {previewBlog && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-auto">

            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[10px]">
                  {previewBlog.category || 'Preview'}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {previewBlog.readTime || '5 min read'}</span>
              </div>
              <button
                onClick={() => setPreviewBlog(null)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Banner Image */}
            <div className="relative h-64 w-full bg-slate-900 rounded-xl overflow-hidden mb-6">
              <img
                src={previewBlog.image || '/assets/images/service/web_dev_dashboard.webp'}
                alt={previewBlog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/service/web_dev_dashboard.webp';
                }}
              />
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-snug">
              {previewBlog.title}
            </h1>

            {/* Author Meta */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/30 mb-6">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm">
                {(previewBlog.author || 'C')[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{previewBlog.author || 'Codigix Tech Team'}</p>
                <p className="text-[10px] text-slate-400 dark:text-gray-400">{previewBlog.role || 'Contributor'} • {previewBlog.date}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
              {previewBlog.body}
            </div>

            {/* Footer Close */}
            <div className="pt-6 border-t border-slate-200 dark:border-purple-900/30 mt-8 flex justify-end">
              <button
                onClick={() => setPreviewBlog(null)}
                className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl hover:bg-purple-500 transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default BlogsAdmin;
