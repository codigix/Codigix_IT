import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  Plus,
  Edit3,
  Trash2,
  Globe,
  Building2,
  Image as ImageIcon,
  CheckCircle,
  X,
  RefreshCw,
  Award
} from 'lucide-react';
import config from '../../../config';

const API_BASE_URL = config.API_BASE_URL;

const ClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    image: ''
  });

  // UI State
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clients`);
      const data = await response.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
    setLoading(false);
  };

  const showNotify = (msg, type = 'success') => {
    setNotification({ message: msg, type });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target.result }));
        showNotify('Logo imported successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, image: event.target.result }));
          showNotify('Pasted logo processed!');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const openNewForm = () => {
    setEditingClient(null);
    setFormData({ name: '', industry: '', website: '', image: '' });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditForm = (client) => {
    setEditingClient(client);
    setFormData({ ...client });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('adminToken');
    const method = editingClient ? 'PUT' : 'POST';
    const url = editingClient 
      ? `${API_BASE_URL}/clients/${editingClient.id}` 
      : `${API_BASE_URL}/clients`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showNotify(editingClient ? 'Partner updated successfully!' : 'Partner created successfully!');
        setShowForm(false);
        fetchClients();
      } else {
        const err = await response.json();
        showNotify(err.error || 'Failed to save partner.', 'error');
      }
    } catch (error) {
      showNotify('Network error.', 'error');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this partner permanently?')) return;
    setDeletingId(id);
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setClients(clients.filter(c => c.id !== id));
        showNotify('Partner removed.');
      }
    } catch (error) {
      showNotify('Failed to delete.', 'error');
    }
    setDeletingId(null);
  };

  const filteredClients = clients.filter(c =>
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.industry || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    return `/assets/images/client/${image}${image.includes('.') ? '' : '.jpg'}`;
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full max-w-[1600px] mx-auto relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-8 left-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-xl min-w-[320px] ${
              notification.type === 'success'
                ? 'bg-amber-600/90 border-amber-500/35 text-white shadow-amber-500/25'
                : 'bg-rose-600/90 border-rose-500/35 text-white shadow-rose-500/25'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
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

      {/* 1. Header Area */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 group/header">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/header:bg-amber-500/20 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-[1px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Enterprise Partners
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              {clients.length} Registered Business Entities
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative group/search flex-1 sm:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-amber-400 transition-colors" />
            <input
              type="text"
              placeholder="SCAN PARTNERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500 backdrop-blur-md"
            />
          </div>
          <button
            onClick={showForm ? () => setShowForm(false) : openNewForm}
            className={`px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg backdrop-blur-md shrink-0 active:scale-95 ${
              showForm 
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' 
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border border-amber-400/50 hover:shadow-amber-500/25'
            }`}
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Close Engine' : 'Onboard Partner'}
          </button>
        </div>
      </div>

      {/* 2. Editor Form Modal/Inline */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-amber-900/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {editingClient ? 'Modify Partner Profile' : 'Initialize Partner Entity'}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-1">Entity Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ENTER PARTNER NAME..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
                      required
                    />
                  </div>
                  {/* Industry */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-1">Industry Sector</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="E.G. TECHNOLOGY, FINANCE..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                  {/* Website */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-1">Corporate Domain</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="HTTPS://WWW.DOMAIN.COM"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  {/* Logo Image */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-1">Brand Identity (Logo)</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        onPaste={handlePaste}
                        placeholder="PASTE IMAGE DATA OR TYPE DIRECTORY PATH..."
                        className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
                      />
                      <label className="px-6 py-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-100/50 transition-all flex items-center justify-center gap-2 shrink-0">
                        <ImageIcon className="w-4 h-4" />
                        Upload Asset
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                    </div>
                    {formData.image && (
                      <div className="mt-4 relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center p-4">
                        <img
                          src={getImageUrl(formData.image)}
                          alt="Brand Logo"
                          className="max-w-full max-h-full object-contain drop-shadow-md"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Abort Sequence
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {editingClient ? 'Commit Changes' : 'Initialize Partner'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Data Grid */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center animate-pulse mb-6 shadow-inner">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
            <p className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest">Compiling Roster...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <div className="w-24 h-24 relative rounded-3xl bg-white dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-600 shadow-xl border border-slate-200 dark:border-slate-800 rotate-[5deg] hover:rotate-0 transition-transform duration-500">
                <Building2 className="w-10 h-10" />
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Partners Indexed</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-2 leading-relaxed">
                You currently have no clients matching this sector. Add a new partner to build the roster.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-8 gap-4 p-6 sm:p-8">
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.div 
                  key={client.id} 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group/card relative bg-white dark:bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-1 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Actions Overlay */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 translate-x-2 group-hover/card:translate-x-0 transition-all duration-300">
                    <button
                      onClick={() => openEditForm(client)}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/50 shadow-sm transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      disabled={deletingId === client.id}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-rose-500 hover:border-rose-500/50 shadow-sm transition-all"
                    >
                      {deletingId === client.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Logo Container */}
                  <div className="aspect-[4/3] w-full p-8 flex items-center justify-center bg-slate-50/50 dark:bg-[#0c0818]/50 relative z-10 border-b border-slate-100 dark:border-slate-800/50 group-hover/card:bg-white dark:group-hover/card:bg-slate-900 transition-colors">
                    {client.image ? (
                      <img
                        src={getImageUrl(client.image)}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover/card:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Missing<br/>Identity</div>';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <Building2 className="w-8 h-8 opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col bg-white dark:bg-slate-950 relative z-10">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 group-hover/card:text-amber-500 transition-colors">
                      {client.name || 'Unknown Entity'}
                    </h3>
                    <div className="mt-2 flex flex-col gap-2">
                      {client.industry && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 text-[9px] uppercase font-black tracking-widest w-max max-w-full truncate">
                          <Briefcase className="w-3 h-3 shrink-0" />
                          <span className="truncate">{client.industry}</span>
                        </span>
                      )}
                      {client.website && (
                        <a 
                          href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 text-[9px] uppercase font-black tracking-widest w-max max-w-full truncate hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                        >
                          <Globe className="w-3 h-3 shrink-0" />
                          <span className="truncate">{client.website.replace(/^https?:\/\//, '')}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsAdmin;
