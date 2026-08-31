import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  RefreshCw,
  Search,
  Mail,
  Phone,
  Calendar,
  Inbox,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import config from '../../../config';

const API_BASE_URL = config.API_BASE_URL;

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 w-full max-w-[1600px] mx-auto">
      
      {/* 1. Header / Search Bar */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 group/header">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/header:bg-rose-500/20 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-[1px] shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-rose-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              ATS Resumes Hub
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {applications.length} Candidate Profiles Indexed
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative group/search flex-1 sm:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-rose-400 transition-colors" />
            <input
              type="text"
              placeholder="SCAN APPLICATIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500 backdrop-blur-md"
            />
          </div>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="px-5 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center backdrop-blur-md shrink-0 cursor-pointer"
            title="Reload Database"
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
              <RefreshCw className="w-8 h-8 text-rose-500 animate-spin" />
            </div>
            <p className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest">Querying ATS Database...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full" />
              <div className="w-24 h-24 relative rounded-3xl bg-white dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-600 shadow-xl border border-slate-200 dark:border-slate-800 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <Inbox className="w-10 h-10" />
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Profiles Match Query</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-2 leading-relaxed">
                Incoming job applications and resume uploads will be indexed and appear here dynamically.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                  <th className="pl-8 pr-6 py-5 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">Candidate Identity</th>
                  <th className="px-6 py-5 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">Contact Vector</th>
                  <th className="px-6 py-5 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">Role / Posting</th>
                  <th className="px-6 py-5 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">Timestamp</th>
                  <th className="pl-6 pr-8 py-5 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black text-right">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                <AnimatePresence>
                  {filteredApplications.map((app, index) => (
                    <motion.tr 
                      key={app.id} 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group/row"
                    >
                      <td className="pl-8 pr-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl blur-md opacity-40 group-hover/row:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-sm uppercase shrink-0 border border-white/20">
                              {app.name.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wide group-hover/row:text-rose-500 dark:group-hover/row:text-rose-400 transition-colors">{app.name}</p>
                            <span className="inline-flex mt-1 items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                              ID: {app.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 font-semibold group-hover/row:text-slate-900 dark:group-hover/row:text-white transition-colors">
                            <div className="w-6 h-6 rounded-md bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
                              <Mail className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs">{app.email}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 font-semibold group-hover/row:text-slate-900 dark:group-hover/row:text-white transition-colors">
                            <div className="w-6 h-6 rounded-md bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500">
                              <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs">{app.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20 text-[10px] uppercase font-black tracking-widest shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          Job ID: #{app.job_id}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover/row:text-rose-400 transition-colors" />
                          <span>{new Date(app.applied_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </td>
                      <td className="pl-6 pr-8 py-6 text-right">
                        <a
                          href={`${config.API_BASE_URL.replace('/api', '')}${app.resume_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-500 dark:hover:bg-rose-500 hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-rose-500/25 active:scale-95 group/btn"
                        >
                          <Download className="w-3.5 h-3.5 group-hover/btn:animate-bounce" />
                          Extract PDF
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApplicationsAdmin;
