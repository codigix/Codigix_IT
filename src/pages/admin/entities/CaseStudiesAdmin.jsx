import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, Save, X, Edit, Image as ImageIcon, Briefcase, UploadCloud, Loader2 } from 'lucide-react';
import { caseStudiesData } from '../../../data/caseStudiesData';


const API_BASE = 'http://localhost:5000/api';

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
      alert('Upload failed');
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
      <label className="block text-slate-700 font-medium text-xs mb-1">{label}</label>
      <div 
        className="relative border-2 border-dashed border-purple-300 bg-purple-50 hover:bg-purple-100 rounded-lg p-3 transition-colors text-center cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div className="relative w-full h-20 bg-white rounded overflow-hidden group-hover:opacity-60 transition-opacity">
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="py-4">
            <ImageIcon size={24} className="text-purple-400 group-hover:text-purple-600 transition-colors mx-auto mb-1" />
            <p className="text-xs text-purple-700 font-medium">Click, Drag, or Paste Image</p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          </div>
        )}
      </div>
      <div className="mt-1">
         <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Or enter URL directly..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-1.5 focus:border-purple-500 focus:outline-none text-xs" 
         />
      </div>
    </div>
  );
};

const CaseStudiesAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const docInputRef = useRef(null);

  const emptyForm = {
    title: '', slug: '', category: '', catName: '', client: '', subtitle: '', 
    objective: '', heroImage: '', image: '', businessChallengeDesc: '', 
    challenges: [], solutionDesc: '', solutionPoints: [], radialNodes: [], 
    keyFeatures: [], techStack: [], results_impact: [], solutionHighlights: [], 
    testimonial: { quote: '', author: '', designation: '', image: '', company: '' },
    sidebarSpecs: { duration: '', technologies: '', liveUrl: '' }
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      alert('Failed to load case studies');
    } finally {
      setLoading(false);
    }
  };

  const parseJSON = (data, fallback) => {
    if (!data) return fallback;
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      return fallback;
    }
  };

  const openAddModal = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setFormData({
      ...project,
      challenges: parseJSON(project.challenges, []),
      solutionPoints: parseJSON(project.solutionPoints, []),
      radialNodes: parseJSON(project.radialNodes, []),
      keyFeatures: parseJSON(project.keyFeatures, []),
      techStack: parseJSON(project.techStack, []),
      results_impact: parseJSON(project.results_impact, []),
      solutionHighlights: parseJSON(project.solutionHighlights, []),
      testimonial: parseJSON(project.testimonial, emptyForm.testimonial),
      sidebarSpecs: parseJSON(project.sidebarSpecs, emptyForm.sidebarSpecs)
    });
    setEditingId(project.id);
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this case study?')) {
      try {
        const response = await fetch(`${API_BASE}/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}` }
        });
        if (!response.ok) throw new Error('Failed to delete');
        alert('Deleted successfully');
        fetchProjects();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Stringify JSON fields before sending to backend to be safe with MySQL JSON columns
      const payload = {
        ...formData,
        challenges: JSON.stringify(formData.challenges),
        solutionPoints: JSON.stringify(formData.solutionPoints),
        radialNodes: JSON.stringify(formData.radialNodes),
        keyFeatures: JSON.stringify(formData.keyFeatures),
        techStack: JSON.stringify(formData.techStack),
        results_impact: JSON.stringify(formData.results_impact),
        solutionHighlights: JSON.stringify(formData.solutionHighlights),
        testimonial: JSON.stringify(formData.testimonial),
        sidebarSpecs: JSON.stringify(formData.sidebarSpecs)
      };

      if (editingId) {
        const response = await fetch(`${API_BASE}/projects/${editingId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to update');
        alert('Updated successfully');
      } else {
        const response = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to create');
        alert('Created successfully');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert('Failed to save case study');
      console.error(error);
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('document', file);

    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_BASE}/analyze-case-study`, {
        method: 'POST',
        body: formDataUpload,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const generatedData = await res.json();
      
      // Auto-populate form data with the generated JSON
      setFormData(prev => ({
        ...prev,
        title: generatedData.title || prev.title,
        slug: generatedData.slug || prev.slug,
        client: generatedData.client || prev.client,
        catName: generatedData.catName || prev.catName,
        category: generatedData.category || prev.category,
        subtitle: generatedData.subtitle || prev.subtitle,
        objective: generatedData.objective || prev.objective,
        businessChallengeDesc: generatedData.businessChallengeDesc || prev.businessChallengeDesc,
        challenges: generatedData.challenges?.length > 0 ? generatedData.challenges : prev.challenges,
        solutionPoints: generatedData.solutionPoints?.length > 0 ? generatedData.solutionPoints : prev.solutionPoints,
        radialNodes: generatedData.radialNodes?.length > 0 ? generatedData.radialNodes : prev.radialNodes,
        keyFeatures: generatedData.keyFeatures?.length > 0 ? generatedData.keyFeatures : prev.keyFeatures,
        techStack: generatedData.techStack?.length > 0 ? generatedData.techStack : prev.techStack,
        results_impact: generatedData.results?.length > 0 ? generatedData.results : prev.results_impact,
        solutionHighlights: generatedData.solutionHighlights?.length > 0 ? generatedData.solutionHighlights : prev.solutionHighlights,
        sidebarSpecs: {
          ...prev.sidebarSpecs,
          ...(generatedData.sidebarSpecs || {})
        },
        testimonial: generatedData.testimonial || prev.testimonial
      }));

      // Open modal automatically
      setEditingId(null);
      setIsModalOpen(true);
      setActiveTab('basic');
      
      // Reset input
      if (docInputRef.current) docInputRef.current.value = '';
    } catch (err) {
      alert(err.message || 'Error parsing document.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextUpload = async () => {
    if (!pasteText.trim()) return;
    setIsAnalyzing(true);
    setIsTextModalOpen(false);
    
    try {
      const res = await fetch(`${API_BASE}/analyze-case-study-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pasteText }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to analyze text');
      }

      const generatedData = await res.json();
      
      // Auto-populate form data with the generated JSON
      setFormData(prev => ({
        ...prev,
        title: generatedData.title || prev.title,
        slug: generatedData.slug || prev.slug,
        client: generatedData.client || prev.client,
        catName: generatedData.catName || prev.catName,
        category: generatedData.category || prev.category,
        subtitle: generatedData.subtitle || prev.subtitle,
        objective: generatedData.objective || prev.objective,
        businessChallengeDesc: generatedData.businessChallengeDesc || prev.businessChallengeDesc,
        challenges: generatedData.challenges?.length > 0 ? generatedData.challenges : prev.challenges,
        solutionPoints: generatedData.solutionPoints?.length > 0 ? generatedData.solutionPoints : prev.solutionPoints,
        radialNodes: generatedData.radialNodes?.length > 0 ? generatedData.radialNodes : prev.radialNodes,
        keyFeatures: generatedData.keyFeatures?.length > 0 ? generatedData.keyFeatures : prev.keyFeatures,
        techStack: generatedData.techStack?.length > 0 ? generatedData.techStack : prev.techStack,
        results_impact: generatedData.results?.length > 0 ? generatedData.results : prev.results_impact,
        solutionHighlights: generatedData.solutionHighlights?.length > 0 ? generatedData.solutionHighlights : prev.solutionHighlights,
        sidebarSpecs: {
          ...prev.sidebarSpecs,
          ...(generatedData.sidebarSpecs || {})
        },
        testimonial: generatedData.testimonial || prev.testimonial
      }));

      // Open modal automatically
      setEditingId(null);
      setIsModalOpen(true);
      setActiveTab('basic');
      setPasteText('');
      
    } catch (err) {
      alert(err.message || 'Error parsing text.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Dynamic Handlers
  const handleArrayChange = (field, index, subField, value) => {
    const newList = [...formData[field]];
    newList[index][subField] = value;
    setFormData({ ...formData, [field]: newList });
  };
  const handleStringArrayChange = (field, index, value) => {
    const newList = [...formData[field]];
    newList[index] = value;
    setFormData({ ...formData, [field]: newList });
  };
  const addArrayItem = (field, emptyObj) => {
    setFormData({ ...formData, [field]: [...formData[field], emptyObj] });
  };
  const removeArrayItem = (field, index) => {
    const newList = [...formData[field]];
    newList.splice(index, 1);
    setFormData({ ...formData, [field]: newList });
  };

  const handleAutoPopulate = async () => {
    if (!window.confirm('This will insert all default case studies into the database. Proceed?')) return;
    
    setLoading(true);
    let successCount = 0;
    
    for (const study of caseStudiesData) {
      try {
        const payload = {
          title: study.title,
          slug: study.slug,
          category: study.category,
          catName: study.catName,
          client: study.clientName,
          subtitle: study.overview,
          objective: study.objective || '',
          heroImage: study.heroImage || study.image,
          image: study.image,
          businessChallengeDesc: study.businessChallengeDesc || '',
          challenges: JSON.stringify(study.challenges || []),
          solutionDesc: study.solutionDesc || '',
          solutionPoints: JSON.stringify(study.solutionPoints || []),
          radialNodes: JSON.stringify(study.radialNodes || []),
          keyFeatures: JSON.stringify(study.keyFeatures || []),
          techStack: JSON.stringify(study.techStack || []),
          results_impact: JSON.stringify(study.results || []),
          solutionHighlights: JSON.stringify(study.solutionHighlights || []),
          testimonial: JSON.stringify(study.testimonial || {})
        };

        const response = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
          },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          successCount++;
        } else {
          console.error('Failed to insert:', study.title);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    alert(`Successfully added ${successCount} case studies!`);
    fetchProjects();
  };

  if (loading) return <div className="p-8 text-slate-900">Loading...</div>;

  return (
    <div className="p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="text-purple-500" /> Case Studies Management
        </h1>
        <div className="flex gap-3">
          
          <input 
            type="file" 
            ref={docInputRef} 
            onChange={handleDocumentUpload} 
            className="hidden" 
            accept=".pdf,.txt,.doc,.docx" 
          />
          <button 
            onClick={() => docInputRef.current?.click()} 
            disabled={isAnalyzing}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />} 
            {isAnalyzing ? 'Analyzing...' : 'Auto-Fill from Doc'}
          </button>

          <button 
            onClick={() => setIsTextModalOpen(true)} 
            disabled={isAnalyzing}
            className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Edit size={16} />} 
            Paste Text
          </button>
          
          <button onClick={openAddModal} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors">
            <Plus size={16} /> Add Case Study
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 overflow-hidden relative bg-slate-100">
              {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover" />}
              <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded">{p.catName || p.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-slate-900 font-bold mb-1 line-clamp-2">{p.title}</h3>
              <p className="text-slate-500 text-xs mb-4">{p.client}</p>
              <div className="mt-auto flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button onClick={() => openEditModal(p)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"><Edit size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-slate-900/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Case Study' : 'New Case Study'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex border-b border-slate-200 bg-white">
              {['basic', 'challenges', 'solutions', 'tech', 'results', 'testimonial'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  type="button"
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-50' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-sm">
              <form id="caseStudyForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* BASIC INFO TAB */}
                <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Slug</label>
                      <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Client Name</label>
                      <input type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Category Badge (e.g., ERP SOLUTIONS)</label>
                      <input type="text" value={formData.catName} onChange={e => setFormData({...formData, catName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Category (for filtering, e.g., ERP)</label>
                      <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-700 font-medium text-xs mb-1">Subtitle / Short Description</label>
                      <textarea rows="2" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-700 font-medium text-xs mb-1">Objective</label>
                      <textarea rows="2" value={formData.objective} onChange={e => setFormData({...formData, objective: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Duration</label>
                      <input type="text" value={formData.sidebarSpecs?.duration || ''} onChange={e => setFormData({...formData, sidebarSpecs: {...formData.sidebarSpecs, duration: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Technologies (Comma separated)</label>
                      <input type="text" value={formData.sidebarSpecs?.technologies || ''} onChange={e => setFormData({...formData, sidebarSpecs: {...formData.sidebarSpecs, technologies: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-700 font-medium text-xs mb-1">Live URL</label>
                      <input type="text" value={formData.sidebarSpecs?.liveUrl || ''} onChange={e => setFormData({...formData, sidebarSpecs: {...formData.sidebarSpecs, liveUrl: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <ImageUploader 
                        label="Hero Image" 
                        value={formData.heroImage} 
                        onChange={(url) => setFormData({...formData, heroImage: url})} 
                      />
                    </div>
                    <div>
                      <ImageUploader 
                        label="Thumbnail Image" 
                        value={formData.image} 
                        onChange={(url) => setFormData({...formData, image: url})} 
                      />
                    </div>
                  </div>
                </div>

                {/* CHALLENGES TAB */}
                <div className={activeTab === 'challenges' ? 'block' : 'hidden'}>
                  <div className="mb-6">
                    <label className="block text-slate-700 font-medium text-xs mb-1">Business Challenge Description</label>
                    <textarea rows="3" value={formData.businessChallengeDesc} onChange={e => setFormData({...formData, businessChallengeDesc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-slate-900 font-bold">Challenge Points</h3>
                      <button type="button" onClick={() => addArrayItem('challenges', {title:'', desc:'', icon:'AlertTriangle'})} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-xs transition-colors">+ Add Point</button>
                    </div>
                    <div className="space-y-3">
                      {formData.challenges.map((c, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded border border-slate-200">
                          <input type="text" placeholder="Title" value={c.title} onChange={e => handleArrayChange('challenges', i, 'title', e.target.value)} className="w-1/3 bg-white border border-slate-200 text-slate-900 rounded p-1.5 focus:border-purple-500 text-xs" />
                          <input type="text" placeholder="Description" value={c.desc} onChange={e => handleArrayChange('challenges', i, 'desc', e.target.value)} className="flex-1 bg-white border border-slate-200 text-slate-900 rounded p-1.5 focus:border-purple-500 text-xs" />
                          <input type="text" placeholder="Icon (e.g. Clock)" value={c.icon} onChange={e => handleArrayChange('challenges', i, 'icon', e.target.value)} className="w-24 bg-white border border-slate-200 text-slate-900 rounded p-1.5 focus:border-purple-500 text-xs" />
                          <button type="button" onClick={() => removeArrayItem('challenges', i)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={14}/></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SOLUTIONS & FEATURES TAB */}
                <div className={activeTab === 'solutions' ? 'block' : 'hidden'}>
                  <div className="mb-6">
                    <label className="block text-slate-700 font-medium text-xs mb-1">Solution Description</label>
                    <textarea rows="3" value={formData.solutionDesc} onChange={e => setFormData({...formData, solutionDesc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-slate-900 font-bold text-xs">Solution Points (Strings)</h3>
                        <button type="button" onClick={() => addArrayItem('solutionPoints', '')} className="text-purple-400 text-xs hover:text-slate-900">+ Add</button>
                      </div>
                      {formData.solutionPoints.map((sp, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={sp} onChange={e => handleStringArrayChange('solutionPoints', i, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded p-1.5 text-xs focus:border-purple-500 focus:outline-none" />
                          <button type="button" onClick={() => removeArrayItem('solutionPoints', i)} className="text-red-400"><Trash2 size={14}/></button>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-slate-900 font-bold text-xs">Radial Nodes (e.g. QUALITY)</h3>
                        <button type="button" onClick={() => addArrayItem('radialNodes', '')} className="text-purple-400 text-xs hover:text-slate-900">+ Add</button>
                      </div>
                      {formData.radialNodes.map((rn, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={rn} onChange={e => handleStringArrayChange('radialNodes', i, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded p-1.5 text-xs focus:border-purple-500 focus:outline-none" />
                          <button type="button" onClick={() => removeArrayItem('radialNodes', i)} className="text-red-400"><Trash2 size={14}/></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-slate-900 font-bold">Key Features</h3>
                      <button type="button" onClick={() => addArrayItem('keyFeatures', {title:'', desc:'', icon:'Cpu'})} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-xs transition-colors">+ Add Feature</button>
                    </div>
                    <div className="space-y-3">
                      {formData.keyFeatures.map((f, i) => (
                        <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded border border-slate-200">
                          <input type="text" placeholder="Title" value={f.title} onChange={e => handleArrayChange('keyFeatures', i, 'title', e.target.value)} className="w-1/3 bg-white border border-slate-200 text-slate-900 rounded p-1.5 text-xs focus:border-purple-500 focus:outline-none" />
                          <input type="text" placeholder="Description" value={f.desc} onChange={e => handleArrayChange('keyFeatures', i, 'desc', e.target.value)} className="flex-1 bg-white border border-slate-200 text-slate-900 rounded p-1.5 text-xs focus:border-purple-500 focus:outline-none" />
                          <input type="text" placeholder="Icon" value={f.icon} onChange={e => handleArrayChange('keyFeatures', i, 'icon', e.target.value)} className="w-24 bg-white border border-slate-200 text-slate-900 rounded p-1.5 text-xs focus:border-purple-500 focus:outline-none" />
                          <button type="button" onClick={() => removeArrayItem('keyFeatures', i)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={14}/></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TECH STACK & RESULTS TAB */}
                <div className={activeTab === 'tech' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-slate-900 font-bold">Technology Stack</h3>
                        <button type="button" onClick={() => addArrayItem('techStack', {name:'', color:'text-blue-500', bg:'bg-blue-500/10'})} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs">+ Add</button>
                      </div>
                      <div className="space-y-2">
                        {formData.techStack.map((t, i) => (
                          <div key={i} className="flex gap-2 bg-slate-50 p-2 rounded">
                            <input type="text" placeholder="Name (e.g. React)" value={t.name} onChange={e => handleArrayChange('techStack', i, 'name', e.target.value)} className="flex-1 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <input type="text" placeholder="Text Color" value={t.color} onChange={e => handleArrayChange('techStack', i, 'color', e.target.value)} className="w-24 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <input type="text" placeholder="BG Color" value={t.bg} onChange={e => handleArrayChange('techStack', i, 'bg', e.target.value)} className="w-24 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <button type="button" onClick={() => removeArrayItem('techStack', i)} className="text-red-400"><Trash2 size={14}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-slate-900 font-bold">Results & Impact</h3>
                        <button type="button" onClick={() => addArrayItem('results_impact', {val:'', title:'', icon:'TrendingUp'})} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs">+ Add</button>
                      </div>
                      <div className="space-y-2">
                        {formData.results_impact.map((r, i) => (
                          <div key={i} className="flex gap-2 bg-slate-50 p-2 rounded">
                            <input type="text" placeholder="Value (e.g. 32%)" value={r.val || r.value || ''} onChange={e => handleArrayChange('results_impact', i, 'val', e.target.value)} className="w-20 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <input type="text" placeholder="Title" value={r.title || r.label || ''} onChange={e => handleArrayChange('results_impact', i, 'title', e.target.value)} className="flex-1 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <input type="text" placeholder="Icon" value={r.icon} onChange={e => handleArrayChange('results_impact', i, 'icon', e.target.value)} className="w-20 bg-white border border-slate-200 text-slate-900 rounded p-1 text-xs focus:border-purple-500 focus:outline-none" />
                            <button type="button" onClick={() => removeArrayItem('results_impact', i)} className="text-red-400"><Trash2 size={14}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* TESTIMONIAL TAB */}
                <div className={activeTab === 'testimonial' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-2 gap-4 max-w-3xl">
                    <div className="col-span-2">
                      <label className="block text-slate-700 font-medium text-xs mb-1">Quote</label>
                      <textarea rows="3" value={formData.testimonial?.quote || ''} onChange={e => setFormData({...formData, testimonial: {...formData.testimonial, quote: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Author Name</label>
                      <input type="text" value={formData.testimonial?.author || ''} onChange={e => setFormData({...formData, testimonial: {...formData.testimonial, author: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Designation</label>
                      <input type="text" value={formData.testimonial?.designation || formData.testimonial?.title || ''} onChange={e => setFormData({...formData, testimonial: {...formData.testimonial, designation: e.target.value, title: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Company</label>
                      <input type="text" value={formData.testimonial?.company || ''} onChange={e => setFormData({...formData, testimonial: {...formData.testimonial, company: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium text-xs mb-1">Avatar Image URL</label>
                      <input type="text" value={formData.testimonial?.avatar || formData.testimonial?.image || ''} onChange={e => setFormData({...formData, testimonial: {...formData.testimonial, avatar: e.target.value, image: e.target.value}})} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-2 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm text-slate-700 font-medium hover:text-slate-900 transition-colors">Cancel</button>
              <button form="caseStudyForm" type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                <Save size={16} /> Save Case Study
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isTextModalOpen && createPortal(
        <div className="fixed inset-0 bg-slate-900/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Paste Document Text</h2>
              <button onClick={() => setIsTextModalOpen(false)} className="text-gray-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-3">Copy and paste the raw text from your document here. The AI will analyze it and auto-fill the form.</p>
              <textarea 
                rows="10"
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste project details here..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded p-3 focus:border-purple-500 focus:outline-none custom-scrollbar text-sm"
              />
            </div>
            
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsTextModalOpen(false)} className="px-5 py-2 text-sm text-slate-700 font-medium hover:text-slate-900 transition-colors">Cancel</button>
              <button onClick={handleTextUpload} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                <Loader2 size={16} className={isAnalyzing ? 'animate-spin' : 'hidden'} /> Analyze Text
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CaseStudiesAdmin;
