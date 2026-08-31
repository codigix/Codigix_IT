import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  RefreshCw,
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Globe,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';
import config from '../../../config';

const API_BASE_URL = config.API_BASE_URL;

const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`);
      const data = await response.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;
    
    setDeletingId(id);
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setInquiries(inquiries.filter(inq => inq.id !== id));
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
    setDeletingId(null);
  };

  const handleUpdateStatus = async (inq, newStatus) => {
    setUpdatingId(inq.id);
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/${inq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setInquiries(inquiries.map(i => i.id === inq.id ? { ...i, status: newStatus } : i));
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
    setUpdatingId(null);
  };

  const filteredInquiries = inquiries.filter(inq =>
    inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (inq.subject && inq.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    // Sort pending first
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (b.status === 'pending' && a.status !== 'pending') return 1;
    return new Date(b.submitted_at) - new Date(a.submitted_at);
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[9px] uppercase font-black tracking-widest shadow-sm shrink-0">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-[9px] uppercase font-black tracking-widest shadow-sm shrink-0">
            <Send className="w-3 h-3" /> Contacted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-[9px] uppercase font-black tracking-widest shadow-sm shrink-0 animate-pulse">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full max-w-[1600px] mx-auto">
      
      {/* 1. Header / Search Bar */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 group/header">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/header:bg-cyan-500/20 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Global Communications
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              {inquiries.length} Active Inquiries Monitored
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative group/search flex-1 sm:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="SCAN COMMUNICATIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500 backdrop-blur-md"
            />
          </div>
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="px-5 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center backdrop-blur-md shrink-0 cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Main Data Grid */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center animate-pulse mb-6 shadow-inner">
              <RefreshCw className="w-8 h-8 text-cyan-500 animate-spin" />
            </div>
            <p className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest">Intercepting Communications...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
              <div className="w-24 h-24 relative rounded-3xl bg-white dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-600 shadow-xl border border-slate-200 dark:border-slate-800 rotate-[5deg] hover:rotate-0 transition-transform duration-500">
                <Inbox className="w-10 h-10" />
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Transmissions Found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-2 leading-relaxed">
                Incoming contact forms and demo requests will appear in this ledger securely.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 sm:p-8">
            <AnimatePresence>
              {filteredInquiries.map((inq, index) => (
                <motion.div 
                  key={inq.id} 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group/card relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border ${inq.status === 'pending' || !inq.status ? 'border-amber-500/30 dark:border-amber-500/30' : 'border-slate-200 dark:border-slate-800'} hover:border-cyan-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />
                  
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 flex items-start justify-between relative z-10 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-sm uppercase shrink-0 border border-white/10 text-lg">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-wide group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400 transition-colors line-clamp-1">{inq.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-widest mt-0.5 line-clamp-1">
                          {inq.company || 'Individual Client'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(inq.status)}
                  </div>

                  <div className="p-5 flex-1 flex flex-col gap-4 relative z-10">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors">
                        <div className="w-6 h-6 rounded-md bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs line-clamp-1">{inq.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-semibold group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors">
                        <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs">{inq.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800/50 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
                        <MessageSquare className="w-4 h-4 text-cyan-500" />
                        <h4 className="text-xs font-black uppercase tracking-wider line-clamp-1">
                          {inq.subject || 'Demo Request'}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic line-clamp-3">
                        "{inq.message || 'No message attached.'}"
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{new Date(inq.submitted_at || new Date()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-slate-200 dark:border-slate-800">
                        <a 
                          href={`tel:${inq.phone}`} 
                          className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all cursor-pointer"
                          title="Call Client"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a 
                          href={`https://wa.me/${(inq.phone || '').replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all cursor-pointer"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="relative group/actions">
                        <button disabled={updatingId === inq.id} className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/30 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all cursor-pointer disabled:opacity-50">
                          {updatingId === inq.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all flex flex-col overflow-hidden z-20">
                          <button onClick={() => handleUpdateStatus(inq, 'pending')} className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-700 text-amber-600">Mark Pending</button>
                          <button onClick={() => handleUpdateStatus(inq, 'contacted')} className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600">Mark Contacted</button>
                          <button onClick={() => handleUpdateStatus(inq, 'resolved')} className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-700 text-emerald-600">Mark Resolved</button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        disabled={deletingId === inq.id}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all cursor-pointer disabled:opacity-50"
                        title="Delete Record"
                      >
                        {deletingId === inq.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
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

export default InquiriesAdmin;
