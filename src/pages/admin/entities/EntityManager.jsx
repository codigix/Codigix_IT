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
  MoreHorizontal,
  FileText,
  Filter,
  Download,
  Database,
  RefreshCw,
  ExternalLink,
  LayoutGrid,
  List
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_BASE_URL}/${entity}/${editingItem.id}` 
      : `${API_BASE_URL}/${entity}`;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchData();
        setEditingItem(null);
        setFormData({});
        setShowForm(false);
        setNotification({ type: 'success', message: `${title.slice(0, -1)} ${editingItem ? 'updated' : 'created'} successfully!` });
      } else if (response.status === 401 || response.status === 403) {
        navigate('/admin/login');
      } else {
        setNotification({ type: 'error', message: `Failed to save ${title.toLowerCase()}.` });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setNotification({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
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
        fetchData();
        setNotification({ type: 'success', message: `${title.slice(0, -1)} deleted successfully!` });
      } else {
        setNotification({ type: 'error', message: 'Failed to delete record.' });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setNotification({ type: 'error', message: 'An error occurred while deleting.' });
    } finally {
      setDeleteConfirmId(null);
    }
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
              ? 'bg-[#00D1FF]/90 border-[#00D1FF]/50 text-white shadow-[#00D1FF]/20' 
              : 'bg-[#FF1F8B]/90 border-[#FF1F8B]/50 text-white shadow-[#FF1F8B]/20'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/20">
              {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
               <p className="text-[10px]  uppercase tracking-[0.1em]">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-[#252841]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/30 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF1F8B]/10 flex items-center justify-center text-[#FF1F8B] border border-[#FF1F8B]/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl  text-white tracking-tight uppercase">{title}</h2>
            <p className="text-slate-500 text-[9px]  uppercase tracking-[0.2em] mt-1">{data.length} Total Records</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#FF1F8B] transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH RECORDS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-60 bg-[#1A1C2E] border border-slate-800/30 rounded-xl pl-10 pr-4 py-2 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-[#FF1F8B]/40 transition-all"
            />
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({});
              setShowForm(!showForm);
            }}
            className={`px-6 py-2 rounded-xl  text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
              showForm 
              ? 'bg-[#1A1C2E] text-slate-300' 
              : 'bg-[#FF1F8B] text-white hover:bg-[#FF1F8B]/90 shadow-[#FF1F8B]/20'
            }`}
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? 'Close Editor' : `Add New`}
          </button>
        </div>
      </div>

      {/* Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#252841]/60 backdrop-blur-md border border-slate-800/30 rounded-2xl p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.name} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                    <label className="block text-[9px]  text-slate-500 uppercase tracking-[0.2em] px-1">
                      {field.label || field.name}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`ENTER ${field.label || field.name.toUpperCase()}...`}
                        className="w-full bg-[#1A1C2E] border border-slate-800/30 rounded-xl px-4 py-4 text-[11px] font-bold text-white focus:border-[#FF1F8B]/40 focus:outline-none transition-all min-h-[120px] resize-none uppercase tracking-wide"
                        required={field.required !== false}
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`ENTER ${field.label || field.name.toUpperCase()}...`}
                        className="w-full bg-[#1A1C2E] border border-slate-800/30 rounded-xl px-4 py-4 text-[11px] font-bold text-white focus:border-[#FF1F8B]/40 focus:outline-none transition-all uppercase tracking-wide"
                        required={field.required !== false}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-800/20">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-xl  text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#FF1F8B] text-white px-8 py-3 rounded-xl  text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF1F8B]/90 shadow-lg shadow-[#FF1F8B]/20 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  {editingItem ? 'Update Record' : 'Create Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Section */}
      <div className="bg-[#252841]/40 backdrop-blur-md border border-slate-800/30 rounded-2xl overflow-hidden mb-12">
        <div className="p-6 border-b border-slate-800/30 bg-[#252841]/20 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-[#00D1FF]" />
              <span className="text-[10px]  text-white uppercase tracking-[0.2em]">Records List</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="flex bg-[#1A1C2E] p-1 rounded-xl border border-slate-800/30 mr-2">
                <button 
                  onClick={() => setCurrentView('grid')}
                  className={`p-1.5 rounded-lg transition-all ${currentView === 'grid' ? 'bg-[#FF1F8B] text-white shadow-lg shadow-[#FF1F8B]/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setCurrentView('table')}
                  className={`p-1.5 rounded-lg transition-all ${currentView === 'table' ? 'bg-[#FF1F8B] text-white shadow-lg shadow-[#FF1F8B]/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
              <button onClick={fetchData} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-[#FF1F8B] transition-all"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
              <button onClick={handleExport} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-[#00D1FF] transition-all"><Download className="w-4 h-4" /></button>
           </div>
        </div>
        
        {loading ? (
          <div className="p-24 text-center">
            <div className="w-12 h-12 border-4 border-[#FF1F8B]/20 border-t-[#FF1F8B] rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-slate-400  text-[10px] uppercase tracking-[0.2em]">Synchronizing Database Cloud...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-24 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-[#1A1C2E] flex items-center justify-center text-slate-700 text-3xl border border-slate-800/30 rotate-3">
              <FileText className="w-10 h-10" />
            </div>
            <div className="max-w-xs mx-auto">
              <p className="text-white  text-lg tracking-tight uppercase">No matching records</p>
              <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-wider">We couldn't find any entries matching your current filter criteria.</p>
            </div>
            <button onClick={() => setSearchQuery('')} className="text-[#FF1F8B] text-[10px]  uppercase tracking-[0.2em] hover:underline">Clear all filters</button>
          </div>
        ) : currentView === 'grid' ? (
          <div className="p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-[#1A1C2E] rounded-3xl overflow-hidden border border-slate-800/30 hover:border-[#FF1F8B]/30 transition-all duration-500 shadow-2xl"
              >
                {/* Image Preview */}
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  {getImageUrl(item) ? (
                    <img 
                      src={getImageUrl(item)} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <Database className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C2E] via-[#1A1C2E]/20 to-transparent opacity-80" />
                  
                  {/* Actions Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FF1F8B] hover:border-[#FF1F8B] transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-rose-600 hover:border-rose-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-6">
                    <div className="flex items-center gap-2 text-[8px]  uppercase tracking-[0.2em] text-[#00D1FF] bg-[#00D1FF]/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#00D1FF]/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></div>
                      Live Preview
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[9px] text-[#FF1F8B]  uppercase tracking-[0.2em] block mb-1">
                      {item.subtitle || 'ENTITY RECORD'}
                    </span>
                    <h3 className="text-lg  text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#FF1F8B] transition-colors">
                      {item.title || item.name || 'Untitled Entry'}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed line-clamp-3 h-[45px]">
                    {item.description || item.desc || 'No description provided for this record.'}
                  </p>

                  <div className="pt-4 border-t border-slate-800/30 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500  uppercase tracking-[0.2em]">ID: #{item.id}</span>
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#1A1C2E] flex items-center justify-center text-[8px] font-bold text-slate-500">
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
                <tr className="bg-[#1A1C2E]/50 border-b border-slate-800/30">
                  <th className="pl-8 pr-6 py-5 text-[9px]  text-slate-500 uppercase tracking-[0.2em]">Resource Preview</th>
                  <th className="px-6 py-5 text-[9px]  text-slate-500 uppercase tracking-[0.2em]">Entry Details</th>
                  <th className="px-6 py-5 text-[9px]  text-slate-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="pl-6 pr-8 py-5 text-[9px]  text-slate-500 uppercase tracking-[0.2em] text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/20">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FF1F8B]/5 transition-all group/row">
                    <td className="pl-8 pr-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#1A1C2E] border border-slate-800/30 overflow-hidden flex items-center justify-center text-slate-600 shrink-0 group-hover/row:border-[#FF1F8B]/30 transition-colors">
                          {getImageUrl(item) ? (
                            <img 
                              src={getImageUrl(item)} 
                              alt="" 
                              className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full w-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image w-5 h-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>';
                              }}
                            />
                          ) : (
                            <Database className="w-6 h-6 opacity-20" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-white  text-xs uppercase tracking-wide group-hover/row:text-[#FF1F8B] transition-colors">
                            {item.title || item.author || item.name || 'Untitled Entry'}
                           </span>
                           <span className="text-[9px] text-slate-500  uppercase tracking-[0.2em]">ID: #{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="max-w-xs">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed line-clamp-2">
                          {item.description || item.desc || item.quote || item.image || 'No additional details provided.'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex items-center gap-2 text-[8px]  uppercase tracking-[0.2em] text-[#00D1FF] bg-[#00D1FF]/5 px-2.5 py-1.5 rounded-lg w-fit border border-[#00D1FF]/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse"></div>
                          Verified
                       </div>
                    </td>
                    <td className="pl-6 pr-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-2 group-hover/row:translate-x-0">
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-9 h-9 rounded-xl bg-[#1A1C2E] border border-slate-800/30 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF1F8B] hover:border-[#FF1F8B] transition-all"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="w-9 h-9 rounded-xl bg-[#1A1C2E] border border-slate-800/30 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all"
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
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-[#0a0f1d]/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-[#1A1C2E] border border-slate-800/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
              
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6 border border-rose-500/20">
                <AlertCircle className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl  text-white mb-2 tracking-tight uppercase">Confirm Deletion</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-8 leading-relaxed">
                This action is irreversible. The selected record will be permanently purged from the production database.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 rounded-xl  text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 bg-rose-600 text-white px-4 py-3 rounded-xl  text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-rose-600/20 hover:bg-rose-500"
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
