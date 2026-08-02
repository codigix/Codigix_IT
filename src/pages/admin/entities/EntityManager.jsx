import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Image as ImageIcon,
  FileText,
  Filter,
  Download,
  Database,
  RefreshCw,
  LayoutGrid,
  List
} from 'lucide-react';

import config from '../../../config';

const API_BASE_URL = config.API_BASE_URL;

const EntityManager = ({ entity, title, fields, viewType = 'table' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState(viewType);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    fetchData();
  }, [entity]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${entity}`);
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaste = async (e, fieldName) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, [fieldName]: event.target.result }));
          setNotification({ type: 'success', message: 'Image pasted successfully!' });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleMultiImagePaste = async (e, fieldName) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let imagesAdded = 0;

    let existingImages = [];
    try {
      const currentVal = formData[fieldName];
      if (currentVal) {
        if (typeof currentVal === 'string' && currentVal.startsWith('[')) {
          existingImages = JSON.parse(currentVal);
        } else if (Array.isArray(currentVal)) {
          existingImages = currentVal;
        } else if (typeof currentVal === 'string' && currentVal.includes(',')) {
          existingImages = currentVal.split(',').map(s => s.trim());
        } else {
          existingImages = [currentVal];
        }
      }
    } catch (err) {
      existingImages = [];
    }

    const newImages = [...existingImages];

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          imagesAdded++;
          setFormData(prev => ({ ...prev, [fieldName]: JSON.stringify(newImages) }));
          setNotification({ type: 'success', message: `Gallery image added!` });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, [fieldName]: event.target.result }));
        setNotification({ type: 'success', message: 'Image selected successfully!' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultiFileChange = (e, fieldName) => {
    const files = Array.from(e.target.files);
    let loadedCount = 0;
    
    let existingImages = [];
    try {
      const currentVal = formData[fieldName];
      if (currentVal) {
        if (typeof currentVal === 'string' && currentVal.startsWith('[')) {
          existingImages = JSON.parse(currentVal);
        } else if (Array.isArray(currentVal)) {
          existingImages = currentVal;
        } else if (typeof currentVal === 'string' && currentVal.includes(',')) {
          existingImages = currentVal.split(',').map(s => s.trim());
        } else {
          existingImages = [currentVal];
        }
      }
    } catch (err) {
      existingImages = [];
    }

    const newImages = [...existingImages];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setFormData(prev => ({ ...prev, [fieldName]: JSON.stringify(newImages) }));
          setNotification({ type: 'success', message: `${files.length} image(s) added to gallery!` });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const parseTechList = (value) => {
    if (!value) return [];
    try {
      if (typeof value === 'string' && value.trim().startsWith('[')) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.error("Failed to parse tech list:", e);
    }

    if (typeof value === 'string') {
      const lines = value.split('\n').filter(l => l.trim());
      const categories = [];
      let currentCategory = null;

      lines.forEach(line => {
        if (line.includes(':')) {
          currentCategory = {
            name: line.replace(':', '').trim(),
            items: []
          };
          categories.push(currentCategory);
        } else if (currentCategory) {
          currentCategory.items.push(line.trim());
        } else {
          currentCategory = { name: "Technologies", items: [line.trim()] };
          categories.push(currentCategory);
        }
      });
      return categories;
    }

    return [];
  };

  const handleTechListChange = (fieldName, techGroups) => {
    setFormData(prev => ({ ...prev, [fieldName]: JSON.stringify(techGroups) }));
  };

  const handleAddTechGroup = (fieldName) => {
    const currentVal = parseTechList(formData[fieldName]);
    const newVal = [...currentVal, { name: '', items: [] }];
    handleTechListChange(fieldName, newVal);
  };

  const handleUpdateTechGroupName = (fieldName, groupIndex, name) => {
    const currentVal = parseTechList(formData[fieldName]);
    currentVal[groupIndex].name = name;
    handleTechListChange(fieldName, currentVal);
  };

  const handleAddTechItem = (fieldName, groupIndex) => {
    const currentVal = parseTechList(formData[fieldName]);
    currentVal[groupIndex].items.push('');
    handleTechListChange(fieldName, currentVal);
  };

  const handleUpdateTechItem = (fieldName, groupIndex, itemIndex, value) => {
    const currentVal = parseTechList(formData[fieldName]);
    currentVal[groupIndex].items[itemIndex] = value;
    handleTechListChange(fieldName, currentVal);
  };

  const handleRemoveTechGroup = (fieldName, groupIndex) => {
    const currentVal = parseTechList(formData[fieldName]);
    const newVal = currentVal.filter((_, i) => i !== groupIndex);
    handleTechListChange(fieldName, newVal);
  };

  const handleRemoveTechItem = (fieldName, groupIndex, itemIndex) => {
    const currentVal = parseTechList(formData[fieldName]);
    currentVal[groupIndex].items = currentVal[groupIndex].items.filter((_, i) => i !== itemIndex);
    handleTechListChange(fieldName, currentVal);
  };

  const handleRemoveMultiImage = (fieldName, index) => {
    let images = [];
    try {
      const currentVal = formData[fieldName];
      if (typeof currentVal === 'string' && currentVal.startsWith('[')) {
        images = JSON.parse(currentVal);
      } else if (Array.isArray(currentVal)) {
        images = currentVal;
      }
    } catch (e) {
      images = [];
    }

    const newImages = images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [fieldName]: JSON.stringify(newImages) }));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/${entity}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Record deleted successfully!' });
        setData(data.filter(item => item.id !== id));
      } else {
        const errData = await response.json();
        setNotification({ type: 'error', message: errData.error || 'Failed to delete record.' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Network error deleting record.' });
    }
    setDeleteConfirmId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('adminToken');

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_BASE_URL}/${entity}/${editingItem.id}` 
      : `${API_BASE_URL}/${entity}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setNotification({ 
          type: 'success', 
          message: editingItem ? 'Record updated successfully!' : 'Record created successfully!' 
        });
        setShowForm(false);
        setFormData({});
        setEditingItem(null);
        fetchData();
      } else {
        const errData = await response.json();
        setNotification({ type: 'error', message: errData.error || 'Failed to save record.' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Network error saving record.' });
    }
    setIsSaving(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${entity}_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotification({ type: 'success', message: 'Data exported successfully!' });
  };

  const getImageUrl = (item) => {
    if (!item.image) return null;
    if (item.image.startsWith('http') || item.image.startsWith('data:')) return item.image;
    const folderMap = {
      'services': 'service',
      'projects': 'project',
      'blogs': 'blog',
      'slides': 'hero',
      'testimonials': 'testimonial',
      'clients': 'client',
      'team': 'team'
    };
    const folder = folderMap[entity] || entity;
    const imageName = item.image.includes('.') ? item.image : `${item.image}.jpg`;
    return `/assets/images/${folder}/${imageName}`;
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col gap-8 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-8 left-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-xl min-w-[320px] ${
              notification.type === 'success'
                ? 'bg-purple-600 border-purple-500/35 text-white shadow-purple-500/25'
                : 'bg-rose-600 border-rose-500/35 text-white shadow-rose-500/25'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase font-extrabold tracking-wider">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Actions Container */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-white dark:bg-[#0c0828]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-purple-900/30 gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-550/10 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl text-slate-900 dark:text-white font-extrabold tracking-tight uppercase">{title}</h2>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">{data.length} Total Records</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH RECORDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-60 bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-purple-650 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({});
              setShowForm(!showForm);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 ${
              showForm
                ? 'bg-slate-100 dark:bg-[#1A1C2E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-purple-900/30'
                : 'bg-purple-600 dark:bg-purple-800 text-white hover:bg-purple-750 dark:hover:bg-purple-900 shadow-md shadow-purple-600/20'
            }`}
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? 'Close Editor' : `Add New`}
          </button>
        </div>
      </div>

      {/* Editor Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-[#0c0828]/60 backdrop-blur-md border border-slate-200 dark:border-purple-900/30 rounded-2xl p-6 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.name} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                    <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider px-1">
                      {field.label || field.name}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`ENTER ${field.label || field.name.toUpperCase()}...`}
                        className="w-full bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-purple-650 focus:outline-none transition-all min-h-[120px] resize-none placeholder:text-slate-400"
                        required={field.required !== false}
                      />
                    ) : field.type === 'tech-list' ? (
                      <div className="space-y-4">
                        {parseTechList(formData[field.name]).map((group, groupIndex) => (
                          <div key={groupIndex} className="bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-4">
                              <input
                                type="text"
                                value={group.name}
                                onChange={(e) => handleUpdateTechGroupName(field.name, groupIndex, e.target.value)}
                                placeholder="CATEGORY NAME (E.G. FRONTEND)"
                                className="flex-1 bg-white dark:bg-[#252841] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-xs font-bold text-slate-950 dark:text-white focus:border-purple-650 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveTechGroup(field.name, groupIndex)}
                                className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {group.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="relative group">
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleUpdateTechItem(field.name, groupIndex, itemIndex, e.target.value)}
                                    placeholder="ITEM NAME"
                                    className="w-full bg-white dark:bg-[#252841] border border-slate-200 dark:border-slate-800 rounded-lg pl-4 pr-10 py-2 text-xs font-bold text-slate-950 dark:text-white focus:border-purple-650 outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTechItem(field.name, groupIndex, itemIndex)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-655 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => handleAddTechItem(field.name, groupIndex)}
                                className="col-span-2 py-2 border border-dashed border-slate-300 dark:border-slate-700 hover:border-purple-500 rounded-lg text-slate-500 text-xs font-bold transition-all"
                              >
                                + Add Item
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddTechGroup(field.name)}
                          className="w-full py-3 border border-dashed border-slate-300 dark:border-slate-750 hover:border-purple-500 rounded-xl text-slate-600 dark:text-slate-400 text-xs font-bold transition-all"
                        >
                          + Add Category Group
                        </button>
                      </div>
                    ) : field.type === 'image' ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            onPaste={(e) => handlePaste(e, field.name)}
                            placeholder="PASTE IMAGE DATA OR TYPE PATH..."
                            className="flex-1 bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-purple-650 focus:outline-none transition-all placeholder:text-slate-400"
                          />
                          <label className="px-4 py-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-500/15 text-purple-600 dark:text-purple-400 rounded-xl text-xs font-bold cursor-pointer hover:bg-purple-100/50 transition-all flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Browse
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, field.name)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider px-1">Tip: Click browse or paste image data directly inside the textbox</p>
                        {formData[field.name] && (
                          <div className="relative w-32 aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-purple-900/20 bg-slate-100">
                            <img
                              src={formData[field.name].startsWith('data:') || formData[field.name].startsWith('http') 
                                ? formData[field.name] 
                                : `/assets/images/${field.folder || (entity === 'services' ? 'service' : entity)}/${formData[field.name]}${formData[field.name].includes('.') ? '' : '.jpg'}`}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ) : field.type === 'multi-image' ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            placeholder="PASTE IMAGES OR CHOOSE FILES..."
                            onPaste={(e) => handleMultiImagePaste(e, field.name)}
                            className="flex-1 bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-purple-650 focus:outline-none transition-all placeholder:text-slate-400"
                          />
                          <label className="px-4 py-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-500/15 text-purple-600 dark:text-purple-400 rounded-xl text-xs font-bold cursor-pointer hover:bg-purple-100/50 transition-all flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Upload Gallery
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => handleMultiFileChange(e, field.name)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider px-1">Tip: Paste images or use the icon to upload individually</p>
                        
                        {formData[field.name] && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {(() => {
                              try {
                                let images = [];
                                const val = formData[field.name];
                                if (typeof val === 'string' && val.startsWith('[')) {
                                  images = JSON.parse(val);
                                } else if (Array.isArray(val)) {
                                  images = val;
                                } else if (typeof val === 'string' && val.trim()) {
                                  images = val.split(',').map(s => s.trim());
                                }

                                return images.map((img, idx) => (
                                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-purple-900/30 bg-slate-100 group/img">
                                    <img
                                      src={img.startsWith('data:') || img.startsWith('http')
                                        ? img
                                        : `/assets/images/${field.folder || (entity === 'services' ? 'service' : entity)}/${img}${img.includes('.') ? '' : '.jpg'}`}
                                      alt={`Gallery ${idx}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveMultiImage(field.name, idx)}
                                      className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-lg backdrop-blur-md opacity-0 group-hover/img:opacity-100 transition-all"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ));
                              } catch (e) {
                                return <p className="text-rose-500 text-[10px]">Error loading gallery</p>;
                              }
                            })()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`ENTER ${field.label || field.name.toUpperCase()}...`}
                        className="w-full bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:border-purple-650 focus:outline-none transition-all placeholder:text-slate-400"
                        required={field.required !== false}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-purple-900/20">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-purple-600 dark:bg-purple-800 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-purple-750 dark:hover:bg-purple-900 shadow-md shadow-purple-600/25 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  {editingItem ? 'Update Record' : 'Create Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid/Table Records Section */}
      <div className="bg-white dark:bg-[#0c0828]/40 backdrop-blur-md border border-slate-200 dark:border-purple-900/30 rounded-2xl overflow-hidden mb-5 shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-purple-900/20 bg-slate-50 dark:bg-[#0c0828]/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-[10px] text-slate-900 dark:text-white uppercase font-bold tracking-widest">Records List</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-[#1A1C2E] p-1 rounded-xl border border-slate-250 dark:border-purple-900/30 mr-2">
              <button
                onClick={() => setCurrentView('grid')}
                className={`p-1.5 rounded-lg transition-all ${currentView === 'grid' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('table')}
                className={`p-1.5 rounded-lg transition-all ${currentView === 'table' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
            <button onClick={fetchData} className="p-2 hover:bg-slate-105 rounded-lg text-slate-400 hover:text-purple-650 transition-all"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
            <button onClick={handleExport} className="p-2 hover:bg-slate-105 rounded-lg text-slate-400 hover:text-purple-650 transition-all"><Download className="w-4 h-4" /></button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin mx-auto mb-5"></div>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">Synchronizing Database Cloud...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-[#1A1C2E] flex items-center justify-center text-slate-400 text-3xl border border-slate-200 dark:border-purple-900/30 rotate-3">
              <FileText className="w-15 h-15" />
            </div>
            <div className="max-w-xs mx-auto">
              <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight uppercase">No matching records</p>
              <p className="text-slate-500 dark:text-gray-450 text-[10px] mt-2 font-bold uppercase tracking-wider leading-relaxed">We couldn't find any entries matching your current filter criteria.</p>
            </div>
            <button onClick={() => setSearchQuery('')} className="text-purple-650 dark:text-purple-400 text-xs font-bold uppercase tracking-wider hover:underline">Clear all filters</button>
          </div>
        ) : currentView === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-white dark:bg-[#1A1C2E] rounded-3xl overflow-hidden border border-slate-200 dark:border-purple-900/30 hover:border-purple-600/30 dark:hover:border-purple-500/30 transition-all duration-500 shadow-md hover:shadow-lg"
              >
                {/* Image Preview */}
                <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {getImageUrl(item) ? (
                    <img
                      src={getImageUrl(item)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <Database className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1A1C2E] via-white/25 dark:via-[#1A1C2E]/20 to-transparent opacity-80" />

                  {/* Actions Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-white hover:bg-purple-600 dark:hover:bg-purple-750 hover:text-white transition-all shadow-sm"
                    >
                      <Edit3 className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-750 dark:text-white hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-6">
                    <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/40 px-2.5 py-1.5 rounded-lg border border-purple-500/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse"></div>
                      Live Preview
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-1">
                      {item.subtitle || 'ENTITY RECORD'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 group-hover:text-purple-650 dark:group-hover:text-purple-400 transition-colors">
                      {item.title || item.name || 'Untitled Entry'}
                    </h3>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium leading-relaxed line-clamp-3 h-[45px]">
                    {item.description || item.desc || 'No description provided for this record.'}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-purple-900/20 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">ID: #{item.id}</span>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-[#1A1C2E] flex items-center justify-center text-[8px] font-bold text-slate-500">
                        {item.id % 9}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1A1C2E]/50 border-b border-slate-200 dark:border-purple-900/30">
                  <th className="pl-8 pr-6 py-5 text-[10px] text-slate-500 uppercase tracking-widest">Resource Preview</th>
                  <th className="px-6 py-5 text-[10px] text-slate-500 uppercase tracking-widest">Entry Details</th>
                  <th className="px-6 py-5 text-[10px] text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="pl-6 pr-8 py-5 text-[10px] text-slate-500 uppercase tracking-widest text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/10">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-purple-950/15 transition-all group/row border-b border-slate-100 dark:border-purple-900/10">
                    <td className="pl-8 pr-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 overflow-hidden flex items-center justify-center text-slate-655 shrink-0 group-hover/row:border-purple-500/30 transition-colors">
                          {getImageUrl(item) ? (
                            <img
                              src={getImageUrl(item)}
                              alt=""
                              className="w-full h-full object-cover group-hover/row:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentElement.innerHTML = '<div className="flex items-center justify-center h-full w-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 opacity-40"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>';
                              }}
                            />
                          ) : (
                            <Database className="w-6 h-6 opacity-20" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide group-hover/row:text-purple-650 dark:group-hover:text-purple-450 transition-colors">
                            {item.title || item.author || item.name || 'Untitled Entry'}
                          </span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">ID: #{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="max-w-xs">
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed line-clamp-2">
                          {item.description || item.desc || item.quote || item.image || 'No additional details provided.'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-purple-600 bg-purple-50 px-2.5 py-1.5 rounded-lg w-fit border border-purple-500/10 dark:text-purple-400 dark:bg-purple-950/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse"></div>
                        Verified
                      </div>
                    </td>
                    <td className="pl-6 pr-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-2 group-hover/row:translate-x-0">
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-9 h-9 rounded-xl bg-white dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 flex items-center justify-center text-slate-500 hover:text-white hover:bg-purple-600 dark:hover:bg-purple-750 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="w-9 h-9 rounded-xl bg-white dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 flex items-center justify-center text-slate-500 hover:text-white hover:bg-rose-600 dark:hover:bg-rose-500 transition-all shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-[#0a0f1d]/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />

              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-5 border border-rose-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight uppercase">Confirm Deletion</h3>
              <p className="text-slate-550 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 leading-relaxed">
                This action is irreversible. The selected record will be permanently purged from the production database.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 bg-rose-600 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-rose-600/20 hover:bg-rose-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntityManager;
