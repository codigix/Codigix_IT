import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Edit, 
  Quote, 
  Star, 
  Image as ImageIcon, 
  UploadCloud, 
  Loader2, 
  Search, 
  Filter, 
  Eye, 
  User, 
  Building2, 
  LayoutGrid, 
  List, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const fallbackTestimonials = [
  {
    id: 1,
    quote: "Codigix transformed our manufacturing operations with a powerful ERP solution. Their team understood our processes deeply and delivered beyond expectations.",
    author: "Vikram Patil",
    designation: "Director, Sterling Techno Systems",
    company: "Sterling Techno Systems",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    quote: "The CRM solution from Codigix has helped us improve our sales process and customer relationships significantly with real-time lead analytics.",
    author: "Ranjit Deshmukh",
    designation: "CEO, Vastra Bhushan",
    company: "Vastra Bhushan",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    quote: "Their IIoT implementation gave us real-time visibility into our machines. Downtime is reduced and shop-floor efficiency is at an all-time high.",
    author: "Sandeep Kulkarni",
    designation: "Plant Head, Nobel Casting",
    company: "Nobel Casting",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 4,
    quote: "The custom SCADA integration from Codigix allowed us to track production live. Efficiency went up by 18% in the first quarter alone.",
    author: "Aashish Mehta",
    designation: "VP Operations, Premier Pipes",
    company: "Premier Pipes",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=68"
  },
  {
    id: 5,
    quote: "Their cloud migration and DevOps setup secured our medical record database flawlessly. Compliance and system speed are top-tier.",
    author: "Dr. Anjali Sen",
    designation: "IT Head, Apex Healthcare Group",
    company: "Apex Healthcare",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=47"
  }
];

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
      alert('Avatar upload failed. Please check network connection.');
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
        className="relative border-2 border-dashed border-amber-300 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 rounded-xl p-4 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
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
          <div className="relative w-20 h-20 rounded-full bg-slate-900/80 overflow-hidden group-hover:opacity-75 transition-opacity border-2 border-amber-500 mx-auto">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <UploadCloud size={16} className="text-white" />
            </div>
          </div>
        ) : (
          <div className="py-2">
            <ImageIcon size={26} className="text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform mx-auto mb-1" />
            <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Click, Drag, or Paste Client Photo</p>
            <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">PNG, JPG, WEBP avatar format</p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-2">
             <Loader2 size={24} className="animate-spin text-amber-400" />
             <span className="text-xs font-semibold">Uploading Avatar...</span>
          </div>
        )}
      </div>
      <div className="mt-2">
         <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Or paste external avatar URL directly..."
            className="w-full bg-white dark:bg-[#07041a] border border-slate-200 dark:border-amber-900/40 text-slate-900 dark:text-white rounded-lg p-2 focus:border-amber-500 focus:outline-none text-xs transition-colors" 
         />
      </div>
    </div>
  );
};

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [previewTestimonial, setPreviewTestimonial] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    author: '',
    designation: '',
    company: '',
    quote: '',
    rating: 5,
    image: ''
  });

  // Fetch Testimonials from backend
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/testimonials`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Form Handlers
  const handleOpenCreateModal = () => {
    setEditingTestimonial(null);
    setFormData({
      author: '',
      designation: '',
      company: '',
      quote: '',
      rating: 5,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 60) + 1}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingTestimonial(item);
    setFormData({
      author: item.author || item.name || '',
      designation: item.designation || item.title || '',
      company: item.company || '',
      quote: item.quote || '',
      rating: item.rating || 5,
      image: item.image || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote.trim()) {
      alert('Please enter client name and testimonial quote.');
      return;
    }

    try {
      if (editingTestimonial) {
        // PUT update
        const response = await fetch(`${API_BASE}/testimonials/${editingTestimonial.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Update failed');
      } else {
        // POST create
        const response = await fetch(`${API_BASE}/testimonials`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Creation failed');
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      // Local optimistic fallback update
      if (editingTestimonial) {
        setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } : t));
      } else {
        setTestimonials(prev => [{ id: Date.now(), ...formData }, ...prev]);
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  // Filter Logic
  const filteredTestimonials = testimonials.filter(t => {
    const authorName = t.author || t.name || '';
    const desigText = t.designation || t.title || '';
    const matchesSearch = authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          desigText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.quote || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'All' || t.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  // Calculate Metrics
  const totalReviews = testimonials.length;
  const fiveStarReviews = testimonials.filter(t => (t.rating || 5) === 5).length;
  const uniqueCompanies = new Set(testimonials.map(t => t.company || t.designation)).size;

  return (
    <div className="p-4 sm:p-8 max-w-[1700px] mx-auto min-h-screen text-slate-900 dark:text-slate-100">
      
      {/* 1. TOP HEADER & METRICS BAR */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Quote size={20} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Reviews & Testimonials Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
            Publish client feedback, executive testimonials, and partner reviews.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 shrink-0 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Testimonial
        </button>
      </div>

      {/* 2. STATS CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Quote size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Testimonials</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalReviews}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Star size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">5-Star Reviews</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{fiveStarReviews}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Building2 size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client Companies</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{uniqueCompanies}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ThumbsUp size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Satisfaction Rate</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">100%</h3>
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
            placeholder="Search by client name, designation, or review quote..."
            className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white pl-10 pr-4 py-2 rounded-xl focus:border-amber-500 focus:outline-none text-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Rating Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 hidden sm:block" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white px-3 py-2 rounded-xl text-xs focus:border-amber-500 focus:outline-none"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
              <option value="4">4 Stars ⭐⭐⭐⭐</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07041a] p-1 rounded-xl border border-slate-200 dark:border-purple-900/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-amber-500 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
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
          <Loader2 size={32} className="animate-spin text-amber-500" />
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Loading client testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 p-8">
          <AlertCircle size={40} className="text-amber-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Testimonials Found</h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or add a new client review.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add First Testimonial
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => {
            const authorName = item.author || item.name || 'Client';
            const desigText = item.designation || item.title || 'Executive';
            const ratingCount = item.rating || 5;

            return (
              <div 
                key={item.id}
                className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 p-6 shadow-md dark:shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background Decorative Quote Watermark */}
                <Quote size={80} className="absolute -top-3 -right-3 text-amber-500/5 dark:text-purple-500/5 pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < ratingCount ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-gray-700"} 
                        />
                      ))}
                    </div>
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Quote size={14} />
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 italic leading-relaxed mb-6 relative z-10 line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>

                {/* Client Avatar & Details Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-purple-900/20 flex items-center justify-between gap-3 mt-auto">
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={item.image || `https://i.pravatar.cc/150?img=${(item.id % 50) + 1}`} 
                      alt={authorName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://i.pravatar.cc/150?img=11`;
                      }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{authorName}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-gray-400 truncate">{desigText}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setPreviewTestimonial(item)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
                      title="Preview Review"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
                      title="Edit Review"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(item.id)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        
        /* TABLE VIEW */
        <div className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#07041a] border-b border-slate-200 dark:border-purple-900/30 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Client</th>
                  <th className="p-4">Designation / Company</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review Quote</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20 text-xs">
                {filteredTestimonials.map((item) => {
                  const authorName = item.author || item.name || 'Client';
                  const desigText = item.designation || item.title || 'Executive';
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image || `https://i.pravatar.cc/150?img=${(item.id % 50) + 1}`} 
                            alt={authorName} 
                            className="w-8 h-8 rounded-full object-cover border border-amber-500/30 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://i.pravatar.cc/150?img=11`;
                            }}
                          />
                          <span className="font-bold text-slate-900 dark:text-white">{authorName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-gray-300 font-medium">
                        {desigText}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <span>{item.rating || 5}</span>
                          <Star size={12} className="fill-amber-400" />
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-gray-400 line-clamp-2 max-w-md italic">
                        "{item.quote}"
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewTestimonial(item)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
                            title="Preview"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(item.id)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CREATE / EDIT TESTIMONIAL MODAL (PORTAL) */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Quote size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {editingTestimonial ? 'Edit Client Review' : 'Add New Client Review'}
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

            <form onSubmit={handleSaveTestimonial} className="space-y-5">
              
              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Client Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Vikram Patil"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-amber-500 focus:outline-none text-xs transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Designation / Role & Company</label>
                  <input 
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Director, Sterling Techno Systems"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-amber-500 focus:outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Star Rating</label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 rounded-xl p-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 focus:outline-none hover:scale-125 transition-transform"
                    >
                      <Star 
                        size={22} 
                        className={star <= formData.rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-gray-700"} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700 dark:text-white">{formData.rating} out of 5 Stars</span>
                </div>
              </div>

              {/* Avatar Uploader */}
              <ImageUploader 
                label="Client Avatar Photo"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              {/* Quote */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Testimonial Quote / Review Text *</label>
                <textarea 
                  rows={5}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Enter the full quote or testimonial statement from the client..."
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-amber-500 focus:outline-none text-xs leading-relaxed transition-colors"
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
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2"
                >
                  <Save size={16} /> Save Review
                </button>
              </div>

            </form>

          </div>
        </div>,
        document.body
      )}

      {/* 6. PREVIEW TESTIMONIAL MODAL (PORTAL) */}
      {previewTestimonial && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl my-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <span className="text-xs font-extrabold uppercase text-amber-500 tracking-wider">Testimonial Card Preview</span>
              <button
                onClick={() => setPreviewTestimonial(null)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Rendered Preview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/30 dark:from-[#07041a] dark:to-[#130d3a] border border-amber-500/20 shadow-xl relative">
              <Quote size={60} className="absolute -top-2 -right-2 text-amber-500/10 pointer-events-none" />

              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(previewTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-200 italic leading-relaxed mb-6">
                "{previewTestimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-amber-500/10">
                <img 
                  src={previewTestimonial.image || `https://i.pravatar.cc/150?img=11`} 
                  alt={previewTestimonial.author || previewTestimonial.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {previewTestimonial.author || previewTestimonial.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">
                    {previewTestimonial.designation || previewTestimonial.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-6 border-t border-slate-200 dark:border-purple-900/30 mt-6 flex justify-end">
              <button
                onClick={() => setPreviewTestimonial(null)}
                className="px-5 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors"
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

export default TestimonialsAdmin;
