import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import {
  ChevronRight,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// --- Shared UI Components ---
const SectionCard = ({ number, title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
    {title && (
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wide flex items-center gap-2">
          {number && <span>{number}.</span>} {title}
        </h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const SidebarCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
        {title}
      </h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const InputField = ({ label, required, placeholder, value, onChange, maxLength, type = "text", disabled }) => (
  <div className="mb-4 w-full">
    <div className="flex justify-between items-center mb-1.5">
      <label className="text-xs font-bold text-slate-800">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    </div>
    <div className="relative">
      <input
        type={type}
        disabled={disabled}
        value={value || ''}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className={`w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${disabled ? 'bg-slate-100 text-slate-400' : 'bg-slate-50/50'} placeholder:text-slate-400`}
      />
      {maxLength && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
          {(value || '').length}/{maxLength}
        </span>
      )}
    </div>
  </div>
);

const TextAreaField = ({ label, required, placeholder, value, onChange, maxLength, rows = 3 }) => (
  <div className="mb-4 w-full">
    <div className="flex justify-between items-center mb-1.5">
      <label className="text-xs font-bold text-slate-800">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    </div>
    <div className="relative">
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 placeholder:text-slate-400 resize-none"
      />
      {maxLength && (
        <div className="text-right mt-1">
          <span className="text-[10px] text-slate-400">
            {(value || '').length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  </div>
);

const SelectField = ({ label, required, value, onChange, options, placeholder }) => (
  <div className="mb-4 w-full">
    <label className="block text-xs font-bold text-slate-800 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 appearance-none"
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt, i) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return <option key={i} value={val}>{lbl}</option>;
        })}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

const ToggleField = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between mb-4">
    <label className="text-xs font-bold text-slate-800">{label}</label>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

const ImageUploaderAdvanced = ({ value, onChange, compact = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.url) onChange(data.url);
      else alert('Upload failed: ' + (data.error || 'Unknown error'));
    } catch (err) {
      alert('Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`w-full border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-center cursor-pointer relative group flex flex-col items-center justify-center ${compact ? 'p-4 min-h-[120px]' : 'p-8 min-h-[260px]'}`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} />
      
      {value ? (
        <div className="absolute inset-0 p-1">
          <img src={value} alt="Preview" className="w-full h-full object-cover rounded-lg border border-slate-200 shadow-sm" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
             <span className="text-white text-xs font-bold bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2">
                <UploadCloud size={16} /> Replace Image
             </span>
          </div>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-3">
             <ImageIcon size={24} className="text-slate-400" />
          </div>
          {!compact && (
            <>
              <p className="text-xs font-bold text-slate-700 mb-1">Drag & Drop your image here</p>
              <p className="text-[10px] text-slate-500 mb-3">or</p>
              <button type="button" className="bg-indigo-600 text-white text-[11px] font-bold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Browse Image
              </button>
              <p className="text-[10px] text-slate-400 mt-4 max-w-[200px]">JPG, PNG, WEBP. Recommended: 1200 x 630 px. Max: 2MB.</p>
            </>
          )}
          {compact && (
            <p className="text-[10px] font-bold text-slate-500">Upload Image</p>
          )}
        </>
      )}
      
      {isUploading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-indigo-100">
           <Loader2 size={24} className="animate-spin text-indigo-600 mb-2" />
           <span className="text-[10px] font-bold text-slate-600">Uploading...</span>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPasteBox, setShowPasteBox] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef(null);
  const [services, setServices] = useState([]);
  
  // Editor Config
  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Write your blog content here...',
    height: 400,
    toolbarSticky: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false
  }), []);

  // Complex Form State mapping to all requested fields
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    excerpt: '',
    category: '',
    sub_category: '',
    blog_type: '',
    // Image
    image: '',
    image_alt: '',
    image_caption: '',
    image_credit: '',
    // Content
    body: '',
    // AI Summary
    ai_summary: '',
    key_takeaways: [''], // Array of strings
    faqs: [{ question: '', answer: '' }], // Array of objects
    // Related
    service_id: '',
    related_industries: '',
    related_blogs: '',
    // CTA
    cta_heading: '',
    cta_description: '',
    cta_button_text: '',
    cta_button_url: '',
    // Publishing (Sidebar)
    author: '',
    author_designation: 'Auto filled',
    date: new Date().toISOString().split('T')[0],
    publication_time: '10:30',
    status: 'Draft',
    is_featured: false,
    allow_comments: true,
    // SEO
    seo_title: '',
    seo_description: '',
    slug: '',
    focus_keyword: '',
    secondary_keywords: '',
    // Social
    social_title: '',
    social_description: '',
    social_image: '',
    // Settings
    tags: '',
    // Dynamic Blocks
    content_blocks: []
  });

  useEffect(() => {
    // Fetch options (services)
    fetch(`${API_BASE}/services`).then(r=>r.json()).then(d => setServices(Array.isArray(d) ? d : []));

    if (isEditing) {
      fetch(`${API_BASE}/blogs/${id}`).then(r=>r.json()).then(data => {
        setFormData({
          title: data.title || '',
          excerpt: data.excerpt || '',
          category: data.category || '',
          sub_category: data.sub_category || '',
          blog_type: data.blog_type || '',
          image: data.image || '',
          image_alt: data.image_alt || '',
          image_caption: data.image_caption || '',
          image_credit: data.image_credit || '',
          body: data.body || '',
          ai_summary: data.ai_summary || '',
          key_takeaways: data.key_takeaways ? (typeof data.key_takeaways === 'string' ? JSON.parse(data.key_takeaways) : data.key_takeaways) : [''],
          faqs: data.faqs ? (typeof data.faqs === 'string' ? JSON.parse(data.faqs) : data.faqs) : [{ question: '', answer: '' }],
          service_id: data.service_id || '',
          related_industries: data.related_industries ? (typeof data.related_industries === 'string' ? JSON.parse(data.related_industries) : data.related_industries) : '',
          related_blogs: data.related_blogs ? (typeof data.related_blogs === 'string' ? JSON.parse(data.related_blogs) : data.related_blogs) : '',
          cta_heading: data.cta_heading || '',
          cta_description: data.cta_description || '',
          cta_button_text: data.cta_button_text || '',
          cta_button_url: data.cta_button_url || '',
          author: data.author || '',
          author_designation: data.author_designation || 'Auto filled',
          date: data.date || new Date().toISOString().split('T')[0],
          publication_time: data.publication_time || '10:30',
          status: data.status || 'Draft',
          is_featured: !!data.is_featured,
          allow_comments: data.allow_comments !== false, // default true
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          slug: data.slug || '',
          focus_keyword: data.focus_keyword || '',
          secondary_keywords: data.secondary_keywords || '',
          social_title: data.social_title || '',
          social_description: data.social_description || '',
          social_image: data.social_image || '',
          tags: data.tags || '',
          content_blocks: data.content_blocks ? (typeof data.content_blocks === 'string' ? JSON.parse(data.content_blocks) : data.content_blocks) : []
        });
        setLoading(false);
      }).catch(() => {
        alert('Error loading blog.');
        navigate('/admin/blogs');
      });
    }
  }, [id, navigate]);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  // Array Handlers
  const handleArrayChange = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    updateField(field, newArr);
  };
  const addArrayItem = (field, emptyVal) => updateField(field, [...formData[field], emptyVal]);
  const removeArrayItem = (field, index) => updateField(field, formData[field].filter((_, i) => i !== index));

  const handleFaqChange = (index, key, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][key] = value;
    updateField('faqs', newFaqs);
  };

  // Content Blocks Handlers
  const addContentBlock = (type) => {
    let newBlock = { id: Date.now().toString(), type, title: '', items: [] };
    if (type === 'workflow') {
      newBlock.items = [{ icon: '', title: '', subtitle: '' }];
    } else if (type === 'feature_grid') {
      newBlock.items = [{ icon: '', title: '', description: '' }];
    }
    updateField('content_blocks', [...formData.content_blocks, newBlock]);
  };

  const removeContentBlock = (index) => {
    updateField('content_blocks', formData.content_blocks.filter((_, i) => i !== index));
  };

  const updateContentBlock = (index, key, value) => {
    const blocks = [...formData.content_blocks];
    blocks[index][key] = value;
    updateField('content_blocks', blocks);
  };

  const addBlockItem = (blockIndex) => {
    const blocks = [...formData.content_blocks];
    const type = blocks[blockIndex].type;
    const newItem = type === 'workflow' ? { icon: '', title: '', subtitle: '' } : { icon: '', title: '', description: '' };
    blocks[blockIndex].items.push(newItem);
    updateField('content_blocks', blocks);
  };

  const removeBlockItem = (blockIndex, itemIndex) => {
    const blocks = [...formData.content_blocks];
    blocks[blockIndex].items = blocks[blockIndex].items.filter((_, i) => i !== itemIndex);
    updateField('content_blocks', blocks);
  };

  const updateBlockItem = (blockIndex, itemIndex, key, value) => {
    const blocks = [...formData.content_blocks];
    blocks[blockIndex].items[itemIndex][key] = value;
    updateField('content_blocks', blocks);
  };

  const handleAnalyzeDocument = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    const formDataPayload = new FormData();
    formDataPayload.append('document', file);

    try {
      const res = await fetch(`${API_BASE}/analyze-blog-doc`, {
        method: 'POST',
        body: formDataPayload
      });
      if (!res.ok) throw new Error('Analysis request failed');
      const data = await res.json();
      
      // Merge AI data deeply with existing formData to not overwrite user's manual unsaved changes for fields not touched by AI
      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        excerpt: data.excerpt || prev.excerpt,
        category: data.category || prev.category,
        sub_category: data.sub_category || prev.sub_category,
        body: data.body || prev.body,
        ai_summary: data.ai_summary || prev.ai_summary,
        key_takeaways: data.key_takeaways?.length ? data.key_takeaways : prev.key_takeaways,
        faqs: data.faqs?.length ? data.faqs : prev.faqs,
        content_blocks: data.content_blocks?.length ? data.content_blocks : prev.content_blocks,
        seo_title: data.seo_title || prev.seo_title,
        seo_description: data.seo_description || prev.seo_description,
        slug: data.slug || prev.slug,
        focus_keyword: data.focus_keyword || prev.focus_keyword,
        secondary_keywords: data.secondary_keywords || prev.secondary_keywords,
        social_title: data.social_title || prev.social_title,
        social_description: data.social_description || prev.social_description,
        tags: data.tags || prev.tags
      }));
      
      alert('Document analyzed successfully! Fields have been auto-populated.');
    } catch (err) {
      alert('Error analyzing document: ' + err.message);
    } finally {
      setIsAnalyzing(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAnalyzeText = async () => {
    if (!pastedText.trim()) return alert("Please paste some text first.");
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_BASE}/analyze-blog-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pastedText })
      });
      if (!res.ok) throw new Error('Analysis request failed');
      const data = await res.json();
      
      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        excerpt: data.excerpt || prev.excerpt,
        category: data.category || prev.category,
        sub_category: data.sub_category || prev.sub_category,
        body: data.body || prev.body,
        ai_summary: data.ai_summary || prev.ai_summary,
        key_takeaways: data.key_takeaways?.length ? data.key_takeaways : prev.key_takeaways,
        faqs: data.faqs?.length ? data.faqs : prev.faqs,
        content_blocks: data.content_blocks?.length ? data.content_blocks : prev.content_blocks,
        seo_title: data.seo_title || prev.seo_title,
        seo_description: data.seo_description || prev.seo_description,
        slug: data.slug || prev.slug,
        focus_keyword: data.focus_keyword || prev.focus_keyword,
        secondary_keywords: data.secondary_keywords || prev.secondary_keywords,
        social_title: data.social_title || prev.social_title,
        social_description: data.social_description || prev.social_description,
        tags: data.tags || prev.tags
      }));
      
      alert('Text analyzed successfully! Fields have been auto-populated.');
      setShowPasteBox(false);
      setPastedText('');
    } catch (err) {
      alert('Error analyzing text: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveBlog = async (saveStatus) => {
    if (!formData.title.trim()) return alert('Please enter a blog title.');

    setSaving(true);
    try {
      const payload = { 
        ...formData,
        status: saveStatus || formData.status,
        key_takeaways: JSON.stringify(formData.key_takeaways.filter(k => k.trim())),
        faqs: JSON.stringify(formData.faqs.filter(f => f.question.trim() || f.answer.trim())),
        related_industries: JSON.stringify(formData.related_industries),
        related_blogs: JSON.stringify(formData.related_blogs),
        service_id: formData.service_id ? parseInt(formData.service_id, 10) : null,
        content_blocks: JSON.stringify(formData.content_blocks)
      };

      const res = await fetch(isEditing ? `${API_BASE}/blogs/${id}` : `${API_BASE}/blogs`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to save blog');
      navigate('/admin/blogs');
    } catch (err) {
      alert('Error saving blog.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 size={32} className="animate-spin text-indigo-600" /></div>;
  }

  return (
    <div className="bg-[#f8f9fc] min-h-screen font-sans text-slate-800 -m-6 p-6 sm:p-8">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <Link to="/admin" className="hover:text-indigo-600">Dashboard</Link>
            <ChevronRight size={12} />
            <Link to="/admin/blogs" className="hover:text-indigo-600">Blogs</Link>
            <ChevronRight size={12} />
            <span className="text-slate-600">{isEditing ? 'Edit Blog' : 'Add New Blog'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Blog' : 'Add New Blog'}</h1>
              <p className="text-xs text-slate-500">Create and publish engaging content for your audience</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              localStorage.setItem('blog_preview_data', JSON.stringify(formData));
              window.open('/blog/preview', '_blank');
            }}
            className="px-5 py-2.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Preview
          </button>
          <div className="flex rounded-lg shadow-sm overflow-hidden border border-indigo-600">
            <button 
              onClick={() => handleSaveBlog('Published')}
              className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              Publish
            </button>
            <div className="bg-indigo-700 w-[1px]"></div>
            <button className="px-3 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* AI Analysis Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <Sparkles size={120} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300" /> Auto-Fill via AI Document Analysis
          </h3>
          <p className="text-indigo-100 text-[13px] leading-relaxed max-w-2xl">
            Upload a Word Document (.docx), PDF, or Text file. Our AI will automatically extract the content, write summaries, generate key takeaways, and build structured dynamic pipelines and grids for you.
          </p>
        </div>
        <div className="relative z-10 flex-shrink-0 flex flex-col gap-2">
          <input type="file" accept=".pdf,.txt,.doc,.docx" className="hidden" ref={fileInputRef} onChange={handleAnalyzeDocument} />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="whitespace-nowrap px-6 py-2.5 bg-white text-indigo-700 text-sm font-bold rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Upload Document
          </button>
          <button
            type="button"
            onClick={() => setShowPasteBox(!showPasteBox)}
            disabled={isAnalyzing}
            className="whitespace-nowrap px-6 py-2 bg-indigo-700/50 border border-indigo-400/30 text-white text-xs font-bold rounded-xl hover:bg-indigo-700/80 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            or Paste Text
          </button>
        </div>
      </div>

      {showPasteBox && (
        <div className="bg-white rounded-xl shadow-md border border-indigo-200 p-6 mb-8 transform transition-all relative z-10">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Paste your blog content</h4>
          <textarea
            className="w-full h-40 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Paste your raw text, article draft, or document content here..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowPasteBox(false)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAnalyzeText}
              disabled={isAnalyzing || !pastedText.trim()}
              className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
            </button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Content (Spans 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <SectionCard number="1" title="BASIC INFORMATION">
            <InputField label="Blog Title" required maxLength={150} placeholder="Enter blog title here..." value={formData.title} onChange={v => updateField('title', v)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <TextAreaField label="Short Description / Excerpt" required maxLength={250} placeholder="Enter a short description..." value={formData.excerpt} onChange={v => updateField('excerpt', v)} rows={4} />
              <div className="space-y-4">
                <SelectField label="Blog Category" required options={['Technology', 'Business', 'Marketing']} placeholder="Select category" value={formData.category} onChange={v => updateField('category', v)} />
                <SelectField label="Sub Category" options={['Web Dev', 'SEO', 'Cloud']} placeholder="Select sub category" value={formData.sub_category} onChange={v => updateField('sub_category', v)} />
                <SelectField label="Blog Type" required options={['Article', 'Case Study', 'News']} placeholder="Select blog type" value={formData.blog_type} onChange={v => updateField('blog_type', v)} />
              </div>
            </div>
          </SectionCard>

          <SectionCard number="2" title="FEATURED IMAGE">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-5/12">
                <ImageUploaderAdvanced value={formData.image} onChange={url => updateField('image', url)} />
              </div>
              <div className="w-full md:w-7/12">
                <InputField label="Image Alt Text" required placeholder="Enter image alt text" value={formData.image_alt} onChange={v => updateField('image_alt', v)} />
                <TextAreaField label="Image Caption" placeholder="Enter image caption" rows={2} value={formData.image_caption} onChange={v => updateField('image_caption', v)} />
                <InputField label="Image Credit" placeholder="Enter image credit (optional)" value={formData.image_credit} onChange={v => updateField('image_credit', v)} />
              </div>
            </div>
          </SectionCard>

          <SectionCard number="3" title="CONTENT">
            <div className="rounded-xl border border-slate-200 overflow-hidden mb-2 shadow-inner">
              <JoditEditor value={formData.body} config={editorConfig} onBlur={newContent => updateField('body', newContent)} onChange={() => {}} />
            </div>
          </SectionCard>

          <SectionCard number="3.5" title="DYNAMIC STRUCTURED BLOCKS">
            {formData.content_blocks.map((block, bIdx) => (
              <div key={block.id} className="mb-6 p-5 border border-slate-200 bg-slate-50 rounded-xl relative">
                <button type="button" onClick={() => removeContentBlock(bIdx)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-700 bg-rose-50 p-2 rounded-md"><Trash2 size={16}/></button>
                <h4 className="text-sm font-bold text-slate-800 mb-4 capitalize">{block.type.replace('_', ' ')} Block</h4>
                
                <div className="mb-4">
                  <InputField label="Block Title (Optional)" value={block.title} onChange={v => updateContentBlock(bIdx, 'title', v)} placeholder="e.g. Benefits of Industrial IoT" />
                </div>
                
                <div className="space-y-4">
                  {block.items.map((item, iIdx) => (
                    <div key={iIdx} className="p-4 bg-white border border-slate-100 rounded-lg flex flex-col md:flex-row gap-4 items-start relative shadow-sm">
                      <button type="button" onClick={() => removeBlockItem(bIdx, iIdx)} className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"><Trash2 size={14}/></button>
                      <div className="w-full md:w-1/3">
                        <InputField label="Icon Name (Lucide)" value={item.icon} onChange={v => updateBlockItem(bIdx, iIdx, 'icon', v)} placeholder="e.g. Server, Activity" />
                        <p className="text-[10px] text-slate-400 mt-1">Leave blank to use default style.</p>
                      </div>
                      <div className="w-full md:w-2/3 space-y-3">
                        <InputField label="Title" value={item.title} onChange={v => updateBlockItem(bIdx, iIdx, 'title', v)} />
                        {block.type === 'workflow' ? (
                           <InputField label="Subtitle" value={item.subtitle} onChange={v => updateBlockItem(bIdx, iIdx, 'subtitle', v)} />
                        ) : (
                           <TextAreaField label="Description" rows={2} value={item.description} onChange={v => updateBlockItem(bIdx, iIdx, 'description', v)} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => addBlockItem(bIdx)} className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100">
                  <Plus size={14} /> Add Item
                </button>
              </div>
            ))}
            
            <div className="flex flex-wrap gap-4 mt-6">
              <button type="button" onClick={() => addContentBlock('workflow')} className="flex items-center gap-2 text-[11px] font-bold bg-white border border-indigo-200 text-indigo-700 px-4 py-2.5 rounded-lg hover:bg-indigo-50 shadow-sm">
                <Plus size={14} /> Add Workflow Pipeline
              </button>
              <button type="button" onClick={() => addContentBlock('feature_grid')} className="flex items-center gap-2 text-[11px] font-bold bg-white border border-indigo-200 text-indigo-700 px-4 py-2.5 rounded-lg hover:bg-indigo-50 shadow-sm">
                <Plus size={14} /> Add Feature Grid
              </button>
            </div>
          </SectionCard>

          <SectionCard number="4" title="AI SUMMARY & KEY TAKEAWAYS (GEO)">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <TextAreaField label="AI Search Summary" maxLength={500} rows={5} placeholder="Enter a short summary for AI search engines..." value={formData.ai_summary} onChange={v => updateField('ai_summary', v)} />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-bold text-slate-800 mb-3">Key Takeaways</label>
                {formData.key_takeaways.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-3">
                    <GripVertical size={16} className="text-slate-400 cursor-grab" />
                    <input type="text" value={item} onChange={e => handleArrayChange('key_takeaways', idx, e.target.value)} placeholder={`Key takeaway point ${idx+1}`} className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 bg-slate-50/50" />
                    <button type="button" onClick={() => removeArrayItem('key_takeaways', idx)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('key_takeaways', '')} className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors mt-2">
                  <Plus size={14} /> Add More
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-800 mb-3">FAQ Section</label>
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-3">
                  <GripVertical size={16} className="text-slate-400 cursor-grab mt-3" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" value={faq.question} onChange={e => handleFaqChange(idx, 'question', e.target.value)} placeholder="Enter question" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 bg-slate-50/50" />
                    <input type="text" value={faq.answer} onChange={e => handleFaqChange(idx, 'answer', e.target.value)} placeholder="Enter answer" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 bg-slate-50/50" />
                  </div>
                  <button type="button" onClick={() => removeArrayItem('faqs', idx)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg mt-1.5 transition-colors"><Trash2 size={16}/></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('faqs', {question: '', answer: ''})} className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors mt-2">
                <Plus size={14} /> Add FAQ
              </button>
            </div>
          </SectionCard>

          <SectionCard number="5" title="RELATED CONTENT">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField label="Related Services" options={services.map(s => ({label: s.title, value: s.id}))} placeholder="Select services" value={formData.service_id} onChange={v => updateField('service_id', v)} />
              <SelectField label="Related Industries" options={['Healthcare', 'Finance', 'Manufacturing']} placeholder="Select industries" value={formData.related_industries} onChange={v => updateField('related_industries', v)} />
              <SelectField label="Related Blogs" options={['Blog 1', 'Blog 2']} placeholder="Search and select blogs" value={formData.related_blogs} onChange={v => updateField('related_blogs', v)} />
            </div>
          </SectionCard>

          <SectionCard number="6" title="CALL TO ACTION (CTA)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="CTA Heading" placeholder="Enter CTA heading" value={formData.cta_heading} onChange={v => updateField('cta_heading', v)} />
              <InputField label="CTA Description" placeholder="Enter CTA description" value={formData.cta_description} onChange={v => updateField('cta_description', v)} />
              <InputField label="Button Text" placeholder="Enter button text" value={formData.cta_button_text} onChange={v => updateField('cta_button_text', v)} />
              <InputField label="Button URL" placeholder="Enter button URL" value={formData.cta_button_url} onChange={v => updateField('cta_button_url', v)} />
            </div>
          </SectionCard>

        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          
          <SidebarCard title="PUBLISHING">
            <SelectField label="Author" required options={['John Doe', 'Jane Smith', 'Codigix Tech Team']} placeholder="Select author" value={formData.author} onChange={v => updateField('author', v)} />
            <InputField label="Author Designation" value={formData.author_designation} onChange={v => updateField('author_designation', v)} disabled />
            <InputField label="Publication Date" required type="date" value={formData.date} onChange={v => updateField('date', v)} />
            <InputField label="Publication Time" type="time" value={formData.publication_time} onChange={v => updateField('publication_time', v)} />
            <SelectField label="Status" options={['Draft', 'Published', 'Scheduled']} value={formData.status} onChange={v => updateField('status', v)} />
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <ToggleField label="Featured Blog" checked={formData.is_featured} onChange={v => updateField('is_featured', v)} />
              <ToggleField label="Allow Comments" checked={formData.allow_comments} onChange={v => updateField('allow_comments', v)} />
            </div>
          </SidebarCard>

          <SidebarCard title="SEO SETTINGS">
            <InputField label="SEO Title" maxLength={60} placeholder="Enter SEO title" value={formData.seo_title} onChange={v => updateField('seo_title', v)} />
            <TextAreaField label="Meta Description" maxLength={160} rows={4} placeholder="Enter meta description" value={formData.seo_description} onChange={v => updateField('seo_description', v)} />
            <InputField label="URL Slug" placeholder="enter-url-slug" value={formData.slug} onChange={v => updateField('slug', v)} />
            <InputField label="Focus Keyword" placeholder="Enter focus keyword" value={formData.focus_keyword} onChange={v => updateField('focus_keyword', v)} />
            <TextAreaField label="Secondary Keywords" placeholder="Add keywords and press enter..." rows={2} value={formData.secondary_keywords} onChange={v => updateField('secondary_keywords', v)} />
          </SidebarCard>

          <SidebarCard title="SOCIAL SHARING">
            <InputField label="Social Title" maxLength={60} placeholder="Enter social title" value={formData.social_title} onChange={v => updateField('social_title', v)} />
            <TextAreaField label="Social Description" maxLength={160} rows={3} placeholder="Enter social description" value={formData.social_description} onChange={v => updateField('social_description', v)} />
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-800 mb-2">Social Image</label>
              <ImageUploaderAdvanced compact value={formData.social_image} onChange={url => updateField('social_image', url)} />
            </div>
          </SidebarCard>

          <SidebarCard title="BLOG SETTINGS">
            <TextAreaField label="Tags" placeholder="Add tags and press enter..." rows={2} value={formData.tags} onChange={v => updateField('tags', v)} />
            <InputField label="Reading Time (Auto)" placeholder="0 min read" value="" onChange={()=>{}} disabled />
            <InputField label="Word Count (Auto)" placeholder="0 words" value="" onChange={()=>{}} disabled />
          </SidebarCard>
          
        </div>

      </div>
      
      {/* Bottom Sticky Action Bar (optional for long pages) */}
      <div className="mt-4 flex justify-center md:justify-end gap-3 pb-12">
        <button className="px-6 py-2.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
          Save Draft
        </button>
        <button className="px-6 py-2.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
          Schedule
        </button>
        <div className="flex rounded-lg shadow-sm overflow-hidden border border-indigo-600">
            <button 
              onClick={() => handleSaveBlog('Published')}
              className="px-8 py-2.5 bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              {saving ? 'Publishing...' : 'Publish'}
            </button>
            <div className="bg-indigo-700 w-[1px]"></div>
            <button className="px-3 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <ChevronDown size={14} />
            </button>
          </div>
      </div>

    </div>
  );
};

export default AdminBlogEditor;
